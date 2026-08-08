import { Role, UserStatus, OrgMemberRole, OrganisationStatus, TesterStatus } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'
import { hashPassword, verifyPassword, needsRehash } from '../../lib/password.js'
import {
  signAccessToken,
  generateRefreshToken,
  generateOpaqueToken,
  hashToken,
  SESSION_ABSOLUTE_TTL_MS,
  SESSION_IDLE_TTL_MS,
  PASSWORD_RESET_TTL_MS,
  EMAIL_VERIFY_TTL_MS,
} from '../../lib/tokens.js'
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../lib/errors.js'
import { sendMail, verificationEmail, passwordResetEmail } from '../../lib/mailer.js'
import { logger } from '../../lib/logger.js'
import type { RegisterInput, LoginInput } from './auth.schema.js'

const MAX_FAILED_LOGINS = 8
const LOCKOUT_MS = 15 * 60 * 1000

export interface SessionTokens {
  accessToken: string
  refreshToken: string
  sessionId: string
  refreshExpiresAt: Date
}

/** Reasons a session can be torn down. Stored for support and audit. */
export type RevokeReason =
  | 'logout'
  | 'logout_all'
  | 'token_reuse'
  | 'password_changed'
  | 'password_reset'
  | 'account_suspended'
  | 'account_deleted'
  | 'admin'

export interface PublicUser {
  id: string
  email: string
  role: Role
  status: UserStatus
  firstName: string | null
  lastName: string | null
  emailVerified: boolean
  permissions: string[]
  organisationId: string | null
  testerProfileId: string | null
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** Loads the role, permissions and scope needed for a token and for /me. */
async function loadPublicUser(userId: string): Promise<PublicUser> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      firstName: true,
      lastName: true,
      emailVerifiedAt: true,
      permissions: { select: { permission: { select: { code: true } } } },
      orgMemberships: { select: { organisationId: true }, take: 1 },
      testerProfile: { select: { id: true } },
    },
  })
  if (!user) throw new NotFoundError('User')

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    firstName: user.firstName,
    lastName: user.lastName,
    emailVerified: user.emailVerifiedAt !== null,
    permissions: user.permissions.map((p) => p.permission.code),
    organisationId: user.orgMemberships[0]?.organisationId ?? null,
    testerProfileId: user.testerProfile?.id ?? null,
  }
}

/**
 * Opens a new session row and mints the first token pair for it.
 *
 * The access token is only a pointer: it names this session, and every request
 * re-reads the row. Nothing about the user's role or permissions is baked in.
 */
async function openSession(
  user: PublicUser,
  context: { userAgent?: string; ipAddress?: string },
): Promise<SessionTokens> {
  const { raw, hash } = generateRefreshToken()
  const now = Date.now()
  const absoluteExpiresAt = new Date(now + SESSION_ABSOLUTE_TTL_MS)
  const idleExpiresAt = new Date(now + SESSION_IDLE_TTL_MS)

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      refreshTokenHash: hash,
      absoluteExpiresAt,
      idleExpiresAt,
      userAgent: context.userAgent?.slice(0, 512) ?? null,
      ipAddress: context.ipAddress ?? null,
    },
    select: { id: true },
  })

  const accessToken = signAccessToken({
    userId: user.id,
    sessionId: session.id,
    role: user.role,
  })

  return {
    accessToken,
    refreshToken: raw,
    sessionId: session.id,
    // The refresh cookie should not outlive the session itself.
    refreshExpiresAt: absoluteExpiresAt < idleExpiresAt ? absoluteExpiresAt : idleExpiresAt,
  }
}

// ─── Registration ────────────────────────────────────────────────────────────

export async function register(
  input: RegisterInput,
  context: { userAgent?: string; ipAddress?: string },
): Promise<{ user: PublicUser; tokens: SessionTokens }> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  })
  if (existing) {
    // Registration is not an account-enumeration oracle we can fully close
    // (the UX requires telling people their email is taken), but we say no more
    // than that.
    throw new ConflictError('An account with this email already exists')
  }

  const passwordHash = await hashPassword(input.password)

  const userId = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: input.email,
        passwordHash,
        role: input.intendedRole,
        status: UserStatus.PENDING_VERIFICATION,
        firstName: input.firstName,
        lastName: input.lastName ?? null,
        phone: input.phone ?? null,
        countryCode: input.countryCode ?? null,
      },
      select: { id: true },
    })

    // A CUSTOMER registration also creates the organisation and makes the
    // registrant its owner (§2.4).
    if (input.intendedRole === Role.CUSTOMER && input.organisationName) {
      const base = slugify(input.organisationName) || 'org'
      let slug = base
      for (
        let i = 2;
        await tx.organisation.findUnique({ where: { slug }, select: { id: true } });
        i++
      ) {
        slug = `${base}-${i}`
      }

      const org = await tx.organisation.create({
        data: {
          name: input.organisationName,
          slug,
          status: OrganisationStatus.PENDING,
          contactEmail: input.email,
        },
        select: { id: true },
      })

      await tx.organisationMember.create({
        data: {
          organisationId: org.id,
          userId: user.id,
          orgRole: OrgMemberRole.OWNER,
          joinedAt: new Date(),
        },
      })
    }

    // A TESTER registration opens an application for Admin review (§2.2).
    if (input.intendedRole === Role.TESTER) {
      await tx.testerProfile.create({
        data: {
          userId: user.id,
          status: TesterStatus.APPLIED,
          countryCode: input.countryCode ?? null,
        },
      })
    }

    return user.id
  })

  await sendVerificationEmail(userId, input.email)

  const user = await loadPublicUser(userId)
  const tokens = await openSession(user, context)
  return { user, tokens }
}

// ─── Login ───────────────────────────────────────────────────────────────────

export async function login(
  input: LoginInput,
  context: { userAgent?: string; ipAddress?: string },
): Promise<{ user: PublicUser; tokens: SessionTokens }> {
  const record = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      passwordHash: true,
      status: true,
      deletedAt: true,
      failedLoginCount: true,
      lockedUntil: true,
    },
  })

  // Uniform failure message and a real hash comparison on the miss path, so
  // response timing does not reveal whether the account exists.
  if (!record || record.deletedAt) {
    await verifyPassword(
      '$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHRzb21lc2FsdA$0000000000000000000000000000000000000000000',
      input.password,
    )
    throw new UnauthorizedError('Incorrect email or password')
  }

  if (record.lockedUntil && record.lockedUntil > new Date()) {
    throw new ForbiddenError('Too many failed attempts. Try again in a few minutes.')
  }

  const valid = await verifyPassword(record.passwordHash, input.password)

  if (!valid) {
    const nextCount = record.failedLoginCount + 1
    await prisma.user.update({
      where: { id: record.id },
      data: {
        failedLoginCount: nextCount,
        lockedUntil: nextCount >= MAX_FAILED_LOGINS ? new Date(Date.now() + LOCKOUT_MS) : null,
      },
    })
    throw new UnauthorizedError('Incorrect email or password')
  }

  if (record.status === UserStatus.SUSPENDED) throw new ForbiddenError('This account is suspended')
  if (record.status === UserStatus.DEACTIVATED)
    throw new ForbiddenError('This account is deactivated')

  // Users migrated from the legacy MySQL platform (§2.8) may carry a weaker
  // hash. Upgrade transparently on a successful login.
  const rehash = needsRehash(record.passwordHash) ? await hashPassword(input.password) : undefined

  await prisma.user.update({
    where: { id: record.id },
    data: {
      failedLoginCount: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
      ...(rehash ? { passwordHash: rehash } : {}),
    },
  })

  const user = await loadPublicUser(record.id)
  const tokens = await openSession(user, context)
  return { user, tokens }
}

// ─── Refresh (with rotation + reuse detection) ───────────────────────────────

/**
 * Rotates the refresh token in place on its session and mints a fresh access
 * token. The session id never changes, so "sign out this device" keeps working
 * across an arbitrary number of rotations.
 *
 * Reuse detection: the superseded hash is retained in `previousTokenHash`.
 * Presenting it means the token was captured and replayed, so the session is
 * destroyed rather than rotated — the attacker and the legitimate holder both
 * lose access, and the user re-authenticates.
 */
export async function refresh(
  rawToken: string,
  context: { userAgent?: string; ipAddress?: string },
): Promise<{ user: PublicUser; tokens: SessionTokens }> {
  const tokenHash = hashToken(rawToken)

  const session = await prisma.session.findFirst({
    where: { OR: [{ refreshTokenHash: tokenHash }, { previousTokenHash: tokenHash }] },
    select: {
      id: true,
      userId: true,
      refreshTokenHash: true,
      previousTokenHash: true,
      rotationCount: true,
      revokedAt: true,
      absoluteExpiresAt: true,
      idleExpiresAt: true,
      user: { select: { status: true, deletedAt: true } },
    },
  })

  if (!session) throw new UnauthorizedError('Invalid refresh token')

  // Replay of an already-rotated token.
  if (session.previousTokenHash === tokenHash) {
    await revokeSessionById(session.id, 'token_reuse')
    logger.warn(
      { sessionId: session.id, userId: session.userId, rotationCount: session.rotationCount },
      'Refresh token reuse detected — session destroyed',
    )
    throw new UnauthorizedError(
      'This session was ended for security reasons. Please sign in again.',
    )
  }

  if (session.revokedAt) throw new UnauthorizedError('Session has been signed out')

  const now = new Date()
  if (session.absoluteExpiresAt <= now) throw new UnauthorizedError('Session expired')
  if (session.idleExpiresAt <= now)
    throw new UnauthorizedError('Session timed out through inactivity')

  if (!session.user || session.user.deletedAt)
    throw new UnauthorizedError('Account no longer exists')
  if (session.user.status === UserStatus.SUSPENDED)
    throw new ForbiddenError('This account is suspended')
  if (session.user.status === UserStatus.DEACTIVATED)
    throw new ForbiddenError('This account is deactivated')

  const user = await loadPublicUser(session.userId)
  const { raw, hash } = generateRefreshToken()

  // Extend the idle window, but never past the absolute ceiling.
  const nextIdle = new Date(now.getTime() + SESSION_IDLE_TTL_MS)
  const idleExpiresAt = nextIdle < session.absoluteExpiresAt ? nextIdle : session.absoluteExpiresAt

  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshTokenHash: hash,
      previousTokenHash: session.refreshTokenHash,
      rotationCount: { increment: 1 },
      lastUsedAt: now,
      idleExpiresAt,
      userAgent: context.userAgent?.slice(0, 512) ?? undefined,
      ipAddress: context.ipAddress ?? undefined,
    },
  })

  const accessToken = signAccessToken({
    userId: user.id,
    sessionId: session.id,
    role: user.role,
  })

  return {
    user,
    tokens: {
      accessToken,
      refreshToken: raw,
      sessionId: session.id,
      refreshExpiresAt: idleExpiresAt,
    },
  }
}

// ─── Session management ──────────────────────────────────────────────────────

async function revokeSessionById(sessionId: string, reason: RevokeReason): Promise<void> {
  await prisma.session.updateMany({
    where: { id: sessionId, revokedAt: null },
    data: { revokedAt: new Date(), revokedReason: reason },
  })
}

export async function logout(rawToken: string | undefined): Promise<void> {
  if (!rawToken) return
  await prisma.session.updateMany({
    where: { refreshTokenHash: hashToken(rawToken), revokedAt: null },
    data: { revokedAt: new Date(), revokedReason: 'logout' },
  })
}

/**
 * Ends every session for a user.
 * `exceptSessionId` keeps the caller's current session alive, which is what you
 * want for "sign out my other devices".
 */
export async function revokeAllSessions(
  userId: string,
  reason: RevokeReason,
  exceptSessionId?: string,
): Promise<number> {
  const result = await prisma.session.updateMany({
    where: {
      userId,
      revokedAt: null,
      ...(exceptSessionId ? { id: { not: exceptSessionId } } : {}),
    },
    data: { revokedAt: new Date(), revokedReason: reason },
  })
  return result.count
}

export async function logoutAll(userId: string, exceptSessionId?: string): Promise<number> {
  return revokeAllSessions(userId, 'logout_all', exceptSessionId)
}

/** The user's own device list, for a "where you're signed in" screen. */
export async function listSessions(userId: string, currentSessionId?: string) {
  const sessions = await prisma.session.findMany({
    where: { userId, revokedAt: null, absoluteExpiresAt: { gt: new Date() } },
    select: {
      id: true,
      userAgent: true,
      ipAddress: true,
      createdAt: true,
      lastUsedAt: true,
      absoluteExpiresAt: true,
      idleExpiresAt: true,
    },
    orderBy: { lastUsedAt: 'desc' },
  })
  return sessions.map((s) => ({ ...s, isCurrent: s.id === currentSessionId }))
}

/** Ends one specific session. Users may only end their own. */
export async function revokeSession(userId: string, sessionId: string): Promise<void> {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, userId },
    select: { id: true },
  })
  if (!session) throw new NotFoundError('Session')
  await revokeSessionById(sessionId, 'logout')
}

/**
 * Housekeeping: drop rows that can no longer authenticate anything. Safe to run
 * from a cron. Revoked rows are kept for a grace period so support can still
 * answer "why was I signed out?".
 */
export async function pruneExpiredSessions(revokedGraceDays = 30): Promise<number> {
  const now = new Date()
  const graceCutoff = new Date(now.getTime() - revokedGraceDays * 86_400_000)
  const result = await prisma.session.deleteMany({
    where: {
      OR: [{ absoluteExpiresAt: { lt: now } }, { revokedAt: { lt: graceCutoff } }],
    },
  })
  return result.count
}

// ─── Email verification ──────────────────────────────────────────────────────

export async function sendVerificationEmail(userId: string, email: string): Promise<void> {
  const { raw, hash } = generateOpaqueToken()
  await prisma.emailVerificationToken.create({
    data: { userId, tokenHash: hash, expiresAt: new Date(Date.now() + EMAIL_VERIFY_TTL_MS) },
  })
  await sendMail(verificationEmail(email, raw))
}

export async function resendVerification(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, emailVerifiedAt: true },
  })
  // Silent no-op on unknown or already-verified addresses: this endpoint must
  // not confirm whether an email is registered.
  if (!user || user.emailVerifiedAt) return
  await sendVerificationEmail(user.id, user.email)
}

export async function verifyEmail(rawToken: string): Promise<PublicUser> {
  const stored = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash: hashToken(rawToken) },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  })

  if (!stored || stored.usedAt)
    throw new BadRequestError('This verification link is invalid or already used')
  if (stored.expiresAt < new Date()) throw new BadRequestError('This verification link has expired')

  await prisma.$transaction([
    prisma.emailVerificationToken.update({
      where: { id: stored.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: stored.userId },
      data: { emailVerifiedAt: new Date() },
    }),
    // Promote out of PENDING_VERIFICATION only. updateMany lets us filter on
    // status, so verifying an old link can never resurrect a suspended or
    // deactivated account.
    prisma.user.updateMany({
      where: { id: stored.userId, status: UserStatus.PENDING_VERIFICATION },
      data: { status: UserStatus.ACTIVE },
    }),
  ])

  return loadPublicUser(stored.userId)
}

// ─── Password reset ──────────────────────────────────────────────────────────

export async function forgotPassword(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, deletedAt: true },
  })
  // Always returns success to the caller regardless — see the controller.
  if (!user || user.deletedAt) return

  // Invalidate any outstanding reset tokens so only the newest link works.
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  })

  const { raw, hash } = generateOpaqueToken()
  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hash,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
    },
  })

  await sendMail(passwordResetEmail(user.email, raw))
}

export async function resetPassword(rawToken: string, newPassword: string): Promise<void> {
  const stored = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(rawToken) },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  })

  if (!stored || stored.usedAt)
    throw new BadRequestError('This reset link is invalid or already used')
  if (stored.expiresAt < new Date()) throw new BadRequestError('This reset link has expired')

  const passwordHash = await hashPassword(newPassword)

  await prisma.$transaction([
    prisma.passwordResetToken.update({ where: { id: stored.id }, data: { usedAt: new Date() } }),
    prisma.user.update({
      where: { id: stored.userId },
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null },
    }),
    // A password reset ends every existing session. Because auth is stateful,
    // this takes effect immediately rather than at token expiry — which is the
    // whole point when the reset was triggered by a suspected compromise.
    prisma.session.updateMany({
      where: { userId: stored.userId, revokedAt: null },
      data: { revokedAt: new Date(), revokedReason: 'password_reset' },
    }),
  ])
}

/**
 * `keepSessionId` lets the caller stay signed in on the device they changed the
 * password from, while every other session is ended.
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
  keepSessionId?: string,
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  })
  if (!user) throw new NotFoundError('User')

  const valid = await verifyPassword(user.passwordHash, currentPassword)
  if (!valid) throw new UnauthorizedError('Current password is incorrect')

  const passwordHash = await hashPassword(newPassword)

  await prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
    prisma.session.updateMany({
      where: {
        userId,
        revokedAt: null,
        ...(keepSessionId ? { id: { not: keepSessionId } } : {}),
      },
      data: { revokedAt: new Date(), revokedReason: 'password_changed' },
    }),
  ])
}

export { loadPublicUser }
