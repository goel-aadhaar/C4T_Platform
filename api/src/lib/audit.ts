import type { Request } from 'express'
import { prisma } from './prisma.js'
import { logger } from './logger.js'

/**
 * Append-only trail for admin-sensitive actions: status changes, permission
 * grants, verifications, deletions, transaction edits.
 *
 * Never throws. An audit write failing must not roll back the business action
 * that succeeded — it is logged loudly instead.
 */
export async function recordAudit(params: {
  req: Request
  action: string
  entityType: string
  entityId?: string
  before?: unknown
  after?: unknown
}): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: params.req.user?.id ?? null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        before: (params.before ?? null) as never,
        after: (params.after ?? null) as never,
        ipAddress: params.req.ip ?? null,
        userAgent: params.req.header('user-agent')?.slice(0, 512) ?? null,
      },
    })
  } catch (error) {
    logger.error(
      {
        err: error,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
      },
      'Failed to write audit log entry',
    )
  }
}
