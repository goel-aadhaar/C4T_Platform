import { type Prisma, TesterStatus, Role, UserStatus } from '@prisma/client'
import { prisma } from '../../lib/prisma.js'
import { NotFoundError, BadRequestError, ForbiddenError } from '../../lib/errors.js'
import { buildMeta, buildOrderBy, toSkipTake } from '../../lib/pagination.js'
import { TESTER_SORT_FIELDS, type ListTestersQuery } from './testers.schema.js'
import { createNotification } from '../notifications/notifications.service.js'

const profileSelect = {
  id: true,
  status: true,
  headline: true,
  bio: true,
  experienceYears: true,
  city: true,
  countryCode: true,
  ratingAverage: true,
  ratingCount: true,
  bugsReportedCount: true,
  bugsAcceptedCount: true,
  projectsCompletedCount: true,
  verifiedAt: true,
  rejectionReason: true,
  ndaAcceptedAt: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      avatarFileId: true,
    },
  },
  devices: true,
  skills: { select: { skill: { select: { id: true, name: true, slug: true } } } },
  languages: { select: { code: true, proficiency: true } },
} satisfies Prisma.TesterProfileSelect

/** §2.2 Crowd Tester Management — the admin-facing pool list. */
export async function listTesters(query: ListTestersQuery) {
  const where: Prisma.TesterProfileWhereInput = {
    user: { deletedAt: null },
    ...(query.status ? { status: query.status } : {}),
    ...(query.countryCode ? { countryCode: query.countryCode } : {}),
    ...(query.minRating !== undefined ? { ratingAverage: { gte: query.minRating } } : {}),
    ...(query.deviceType ? { devices: { some: { type: query.deviceType } } } : {}),
    ...(query.languages?.length ? { languages: { some: { code: { in: query.languages } } } } : {}),
    // Every requested skill must be present, so one AND clause per slug.
    ...(query.skills?.length
      ? { AND: query.skills.map((slug) => ({ skills: { some: { skill: { slug } } } })) }
      : {}),
    ...(query.search
      ? {
          OR: [
            { user: { email: { contains: query.search, mode: 'insensitive' } } },
            { user: { firstName: { contains: query.search, mode: 'insensitive' } } },
            { user: { lastName: { contains: query.search, mode: 'insensitive' } } },
            { headline: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {}),
  }

  const [items, total] = await Promise.all([
    prisma.testerProfile.findMany({
      where,
      select: profileSelect,
      orderBy: buildOrderBy(query.sort, query.order, TESTER_SORT_FIELDS, 'createdAt'),
      ...toSkipTake(query),
    }),
    prisma.testerProfile.count({ where }),
  ])

  return { items, meta: buildMeta(query, total) }
}

export async function getTesterById(id: string) {
  const profile = await prisma.testerProfile.findUnique({ where: { id }, select: profileSelect })
  if (!profile) throw new NotFoundError('Tester')
  return profile
}

/** §2.3 — the tester's own profile. */
export async function getMyProfile(userId: string) {
  const profile = await prisma.testerProfile.findUnique({
    where: { userId },
    select: profileSelect,
  })
  if (!profile) throw new NotFoundError('Tester profile')
  return profile
}

async function requireOwnProfile(userId: string) {
  const profile = await prisma.testerProfile.findUnique({
    where: { userId },
    select: { id: true, status: true },
  })
  if (!profile) throw new NotFoundError('Tester profile')
  return profile
}

export async function updateMyProfile(userId: string, input: Record<string, unknown>) {
  const profile = await requireOwnProfile(userId)
  return prisma.testerProfile.update({
    where: { id: profile.id },
    data: input,
    select: profileSelect,
  })
}

/**
 * §2.2 — Admin moves a tester through the onboarding pipeline.
 * Suspending a tester also suspends the underlying user account, so their
 * session is cut off at the next request (see authenticate middleware).
 */
export async function changeTesterStatus(
  actorId: string,
  testerProfileId: string,
  status: TesterStatus,
  reason?: string,
) {
  const profile = await prisma.testerProfile.findUnique({
    where: { id: testerProfileId },
    select: { id: true, status: true, userId: true },
  })
  if (!profile) throw new NotFoundError('Tester')

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.testerProfile.update({
      where: { id: testerProfileId },
      data: {
        status,
        verifiedAt: status === TesterStatus.VERIFIED ? new Date() : null,
        verifiedById: status === TesterStatus.VERIFIED ? actorId : null,
        rejectionReason: status === TesterStatus.REJECTED ? (reason ?? null) : null,
      },
      select: profileSelect,
    })

    if (status === TesterStatus.SUSPENDED) {
      await tx.user.update({
        where: { id: profile.userId },
        data: { status: UserStatus.SUSPENDED },
      })
    } else if (profile.status === TesterStatus.SUSPENDED) {
      // Reinstating: return the account to ACTIVE only if it was suspended.
      await tx.user.updateMany({
        where: { id: profile.userId, status: UserStatus.SUSPENDED },
        data: { status: UserStatus.ACTIVE },
      })
    }

    return result
  })

  await createNotification({
    userId: profile.userId,
    type: 'TESTER_STATUS_CHANGED',
    title: `Your tester status is now ${status.toLowerCase().replace('_', ' ')}`,
    body: reason ?? undefined,
    link: '/app/tester/profile',
  })

  return updated
}

// ─── Devices ─────────────────────────────────────────────────────────────────

export async function addDevice(
  userId: string,
  input: Omit<Prisma.TesterDeviceUncheckedCreateInput, 'id' | 'testerProfileId' | 'createdAt'>,
) {
  const profile = await requireOwnProfile(userId)

  return prisma.$transaction(async (tx) => {
    // Only one device can be primary, so clear the flag before setting a new one.
    if (input.isPrimary === true) {
      await tx.testerDevice.updateMany({
        where: { testerProfileId: profile.id },
        data: { isPrimary: false },
      })
    }
    return tx.testerDevice.create({
      data: { ...input, testerProfileId: profile.id },
    })
  })
}

export async function removeDevice(userId: string, deviceId: string) {
  const profile = await requireOwnProfile(userId)
  const device = await prisma.testerDevice.findUnique({
    where: { id: deviceId },
    select: { testerProfileId: true },
  })
  if (!device) throw new NotFoundError('Device')
  if (device.testerProfileId !== profile.id) {
    throw new ForbiddenError('That device belongs to another tester')
  }
  await prisma.testerDevice.delete({ where: { id: deviceId } })
}

// ─── Skills & languages ──────────────────────────────────────────────────────

/** Replaces the tester's skill set, creating any skill that does not yet exist. */
export async function setSkills(userId: string, slugs: string[]) {
  const profile = await requireOwnProfile(userId)
  const normalised = [...new Set(slugs.map((s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')))]

  return prisma.$transaction(async (tx) => {
    const skills = await Promise.all(
      normalised.map((slug) =>
        tx.skill.upsert({
          where: { slug },
          create: { slug, name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) },
          update: {},
          select: { id: true },
        }),
      ),
    )

    await tx.testerSkill.deleteMany({ where: { testerProfileId: profile.id } })
    if (skills.length > 0) {
      await tx.testerSkill.createMany({
        data: skills.map((s) => ({ testerProfileId: profile.id, skillId: s.id })),
      })
    }

    return tx.testerProfile.findUnique({ where: { id: profile.id }, select: profileSelect })
  })
}

export async function setLanguages(
  userId: string,
  languages: { code: string; proficiency: string }[],
) {
  const profile = await requireOwnProfile(userId)

  return prisma.$transaction(async (tx) => {
    await tx.testerLanguage.deleteMany({ where: { testerProfileId: profile.id } })
    if (languages.length > 0) {
      await tx.testerLanguage.createMany({
        data: languages.map((l) => ({ ...l, testerProfileId: profile.id })),
      })
    }
    return tx.testerProfile.findUnique({ where: { id: profile.id }, select: profileSelect })
  })
}

export async function acceptNda(userId: string) {
  const profile = await requireOwnProfile(userId)
  return prisma.testerProfile.update({
    where: { id: profile.id },
    data: { ndaAcceptedAt: new Date() },
    select: { id: true, ndaAcceptedAt: true },
  })
}

/**
 * Recomputes the denormalised counters on a tester profile. Called after bug
 * and rating writes rather than on read, because the admin pool list sorts on
 * these columns.
 */
export async function refreshTesterAggregates(userId: string): Promise<void> {
  const profile = await prisma.testerProfile.findUnique({
    where: { userId },
    select: { id: true },
  })
  if (!profile) return

  const [bugStats, acceptedCount, ratingStats, completedCount] = await Promise.all([
    prisma.bug.count({ where: { reportedById: userId, deletedAt: null } }),
    prisma.bug.count({
      where: {
        reportedById: userId,
        deletedAt: null,
        status: { in: ['CONFIRMED', 'FIXED', 'VERIFIED'] },
      },
    }),
    prisma.rating.aggregate({
      where: { subjectUserId: userId, subjectType: 'TESTER', isVisible: true },
      _avg: { score: true },
      _count: { score: true },
    }),
    prisma.projectAssignment.count({ where: { testerId: userId, status: 'COMPLETED' } }),
  ])

  await prisma.testerProfile.update({
    where: { id: profile.id },
    data: {
      bugsReportedCount: bugStats,
      bugsAcceptedCount: acceptedCount,
      ratingAverage: ratingStats._avg.score ?? null,
      ratingCount: ratingStats._count.score,
      projectsCompletedCount: completedCount,
    },
  })
}

/**
 * Guard used before assigning a tester to a project (§2.2 Project Management).
 * Only a verified tester who has accepted the NDA may be assigned work.
 */
export async function assertAssignable(testerUserId: string): Promise<void> {
  const profile = await prisma.testerProfile.findUnique({
    where: { userId: testerUserId },
    select: { status: true, ndaAcceptedAt: true, user: { select: { role: true, status: true } } },
  })

  if (!profile) throw new BadRequestError('That user is not a tester')
  if (profile.user.role !== Role.TESTER) throw new BadRequestError('That user is not a tester')
  if (profile.status !== TesterStatus.VERIFIED) {
    throw new BadRequestError('Only verified testers can be assigned to a project')
  }
  if (profile.user.status !== UserStatus.ACTIVE) {
    throw new BadRequestError('That tester account is not active')
  }
  if (!profile.ndaAcceptedAt) {
    throw new BadRequestError('That tester has not accepted the NDA yet')
  }
}
