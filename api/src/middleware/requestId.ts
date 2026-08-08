import crypto from 'node:crypto'
import type { Request, Response, NextFunction } from 'express'

/**
 * Correlation id for every request. Echoed in the response header and in every
 * error body, so a user reporting "I got an error" can be traced to one log line.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header('x-request-id')
  req.requestId = incoming && /^[\w-]{8,64}$/.test(incoming) ? incoming : crypto.randomUUID()
  res.setHeader('x-request-id', req.requestId)
  next()
}
