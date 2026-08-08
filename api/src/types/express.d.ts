import type { Role } from '@prisma/client'

declare global {
  namespace Express {
    interface AuthenticatedUser {
      id: string
      role: Role
      /** Permission codes. Populated for SUB_ADMIN; ADMIN bypasses checks. */
      permissions: string[]
    }

    interface Request {
      /** Present only after the `authenticate` middleware has run. */
      user?: AuthenticatedUser
      /** Id of the `sessions` row backing this request. Set alongside `user`. */
      sessionId?: string
      /** Correlation id, set by the requestId middleware and echoed to clients. */
      requestId: string
    }
  }
}

export {}
