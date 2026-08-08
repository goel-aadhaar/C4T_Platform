import type { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { AppError, NotFoundError } from '../lib/errors.js'
import { logger } from '../lib/logger.js'
import { isProduction } from '../config/env.js'

export function notFoundHandler(req: Request, _res: Response, _next: NextFunction): void {
  throw new NotFoundError(`Route ${req.method} ${req.path}`)
}

/**
 * Terminal error handler. Express 5 forwards rejected promises from async
 * handlers here automatically, so no asyncHandler wrapper is needed.
 */
export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) return next(error)

  const mapped = mapError(error)

  const logPayload = {
    err: error,
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    userId: req.user?.id,
    statusCode: mapped.statusCode,
  }

  if (mapped.statusCode >= 500) {
    logger.error(logPayload, mapped.message)
  } else {
    logger.warn(logPayload, mapped.message)
  }

  res.status(mapped.statusCode).json({
    error: {
      code: mapped.code,
      // Never leak an internal message to the client in production.
      message: mapped.statusCode >= 500 && isProduction ? 'Something went wrong' : mapped.message,
      ...(mapped.details !== undefined ? { details: mapped.details } : {}),
    },
    requestId: req.requestId,
  })
}

interface MappedError {
  statusCode: number
  code: string
  message: string
  details?: unknown
}

function mapError(error: unknown): MappedError {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      code: error.code,
      message: error.message,
      details: error.details,
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        const target = (error.meta?.target as string[] | undefined)?.join(', ')
        return {
          statusCode: 409,
          code: 'CONFLICT',
          message: target
            ? `A record with this ${target} already exists`
            : 'A record with these details already exists',
        }
      }
      case 'P2025':
        return { statusCode: 404, code: 'NOT_FOUND', message: 'Resource not found' }
      case 'P2003':
        return {
          statusCode: 409,
          code: 'FOREIGN_KEY_CONSTRAINT',
          message: 'This record is referenced by other data and cannot be changed',
        }
      case 'P2014':
        return {
          statusCode: 409,
          code: 'RELATION_VIOLATION',
          message: 'This change would break a required relationship',
        }
      default:
        return {
          statusCode: 400,
          code: `PRISMA_${error.code}`,
          message: 'Database request could not be completed',
        }
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return { statusCode: 400, code: 'BAD_REQUEST', message: 'Malformed database query' }
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return { statusCode: 400, code: 'MALFORMED_JSON', message: 'Request body is not valid JSON' }
  }

  return {
    statusCode: 500,
    code: 'INTERNAL_ERROR',
    message: error instanceof Error ? error.message : 'Unknown error',
  }
}
