import type { Request, Response, NextFunction } from 'express'
import { Role } from '@prisma/client'
import { ForbiddenError, UnauthorizedError } from '../lib/errors.js'
import type { PermissionCode } from '../config/permissions.js'

/**
 * §2.1 role-based access control.
 *
 * Three layers, applied in this order:
 *   1. requireRole      — coarse gate by role
 *   2. requirePermission— fine gate for ADMIN / SUB_ADMIN feature areas
 *   3. ownership checks — inside services, for CUSTOMER and TESTER scoping
 *
 * Layer 3 is deliberately NOT middleware. Whether a Customer may read a given
 * project depends on a database lookup that the service is about to do anyway;
 * doing it twice would be wasteful and would drift out of sync.
 */

export const ADMIN_ROLES: Role[] = [Role.ADMIN, Role.SUB_ADMIN]

export function requireRole(...roles: Role[]) {
  return function roleGuard(req: Request, _res: Response, next: NextFunction): void {
    if (!req.user) throw new UnauthorizedError()
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Your role does not have access to this resource')
    }
    next()
  }
}

/**
 * ADMIN always passes. SUB_ADMIN must hold the code. Everyone else is refused —
 * Customer and Tester access never routes through the permission table.
 */
export function requirePermission(...codes: PermissionCode[]) {
  return function permissionGuard(req: Request, _res: Response, next: NextFunction): void {
    if (!req.user) throw new UnauthorizedError()

    if (req.user.role === Role.ADMIN) return next()

    if (req.user.role !== Role.SUB_ADMIN) {
      throw new ForbiddenError('Your role does not have access to this resource')
    }

    const held = new Set(req.user.permissions)
    const missing = codes.filter((c) => !held.has(c))
    if (missing.length > 0) {
      throw new ForbiddenError(
        `Missing required permission${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`,
      )
    }

    next()
  }
}

/** Passes if the caller holds ANY of the given codes. */
export function requireAnyPermission(...codes: PermissionCode[]) {
  return function anyPermissionGuard(req: Request, _res: Response, next: NextFunction): void {
    if (!req.user) throw new UnauthorizedError()
    if (req.user.role === Role.ADMIN) return next()
    if (req.user.role !== Role.SUB_ADMIN) {
      throw new ForbiddenError('Your role does not have access to this resource')
    }
    const held = new Set(req.user.permissions)
    if (!codes.some((c) => held.has(c))) {
      throw new ForbiddenError(`Requires one of: ${codes.join(', ')}`)
    }
    next()
  }
}

/** Non-throwing check, for branching inside a service. */
export function hasPermission(user: Express.AuthenticatedUser, code: PermissionCode): boolean {
  if (user.role === Role.ADMIN) return true
  if (user.role !== Role.SUB_ADMIN) return false
  return user.permissions.includes(code)
}

export function isAdminSide(user: Express.AuthenticatedUser): boolean {
  return user.role === Role.ADMIN || user.role === Role.SUB_ADMIN
}
