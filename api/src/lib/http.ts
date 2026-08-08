import type { Request } from 'express'
import { BadRequestError } from './errors.js'

/**
 * Express 5 types `req.params` values as `string | string[]`, because a path
 * pattern can bind a parameter more than once. Every route here binds each
 * parameter exactly once and validates it with Zod first, so this helper
 * narrows to `string` and fails loudly if that assumption is ever broken.
 */
export function param(req: Request, name: string): string {
  const value = req.params[name]
  if (typeof value !== 'string' || value.length === 0) {
    throw new BadRequestError(`Missing or invalid route parameter: ${name}`)
  }
  return value
}
