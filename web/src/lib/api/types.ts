/**
 * Response envelope contract with the Express API.
 *
 * Kept hand-written and minimal on purpose. The API is a separate service, so
 * these types are a *claim* about its shape, not a guarantee — parse anything
 * security-relevant with Zod at the call site rather than trusting the cast.
 *
 * TODO: when the API grows an OpenAPI spec, generate this file instead.
 */

export interface ApiSuccess<T> {
  data: T
  meta?: PageMeta & Record<string, unknown>
}

export interface ApiFailure {
  error: {
    code: string
    message: string
    details?: unknown
  }
  requestId: string
}

export interface PageMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ValidationDetail {
  field: string
  message: string
  code: string
}

// ─── Domain types ────────────────────────────────────────────────────────────
// Mirrors the API's Prisma enums. Kept as unions rather than importing from the
// backend so the two services stay independently deployable.

export type Role = 'USER' | 'CUSTOMER' | 'TESTER' | 'ADMIN' | 'SUB_ADMIN'

export type UserStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED'

/** Shape returned by GET /v1/auth/me. */
export interface SessionUser {
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

export interface ActiveSession {
  id: string
  userAgent: string | null
  ipAddress: string | null
  createdAt: string
  lastUsedAt: string
  absoluteExpiresAt: string
  idleExpiresAt: string
  isCurrent: boolean
}

/** Which landing page each role belongs on after sign-in. */
export const ROLE_HOME: Readonly<Record<Role, string>> = {
  ADMIN: '/app/admin',
  SUB_ADMIN: '/app/admin',
  CUSTOMER: '/app',
  TESTER: '/app/tester',
  USER: '/app/onboarding',
}
