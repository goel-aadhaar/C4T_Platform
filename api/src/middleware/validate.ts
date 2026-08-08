import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodTypeAny } from 'zod'
import { ValidationError } from '../lib/errors.js'

interface Schemas {
  body?: ZodTypeAny
  query?: ZodTypeAny
  params?: ZodTypeAny
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || '(root)',
    message: issue.message,
    code: issue.code,
  }))
}

/**
 * Validates and REPLACES req.body / req.query / req.params with the parsed
 * result, so handlers receive coerced, typed values and never see unknown keys.
 *
 * Express 5 note: req.query is a getter with no setter, so the parsed query is
 * written to res.locals.query instead. Handlers read it via `validatedQuery(res)`.
 */
export function validate(schemas: Schemas) {
  return function validator(req: Request, res: Response, next: NextFunction): void {
    try {
      if (schemas.params) req.params = schemas.params.parse(req.params)
      if (schemas.query) res.locals.query = schemas.query.parse(req.query)
      if (schemas.body) req.body = schemas.body.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(formatZodError(error))
      }
      throw error
    }
  }
}

/** Typed accessor for the parsed query set by `validate({ query })`. */
export function validatedQuery<T>(res: Response): T {
  return res.locals.query as T
}
