import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

const shared = {
  standardHeaders: 'draft-7' as const,
  legacyHeaders: false,
  message: {
    error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests. Please try again shortly.' },
  },
}

/** Broad limit applied to the whole API. */
export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  ...shared,
})

/**
 * Tight limit for credential endpoints. Keyed on IP + email so one attacker
 * cannot lock out every account from a single address, and one account cannot
 * be brute-forced from rotating addresses without hitting the per-account cap.
 */
export const authLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX,
  keyGenerator: (req) => {
    // req.body is `any`; narrow it explicitly rather than trusting the shape.
    const body: unknown = req.body
    const email =
      typeof body === 'object' && body !== null && 'email' in body && typeof body.email === 'string'
        ? body.email.toLowerCase()
        : ''
    return `${req.ip ?? 'unknown'}:${email}`
  },
  skipSuccessfulRequests: true,
  ...shared,
})

/** Uploads are expensive; presign requests get their own budget. */
export const uploadLimiter = rateLimit({
  windowMs: 60_000,
  max: 30,
  ...shared,
})

/**
 * The public lead form.
 *
 * ⚠ THIS IS THE ONLY UNAUTHENTICATED WRITE ON THE API, so it is the only one an
 * anonymous attacker can use to create rows. `globalLimiter` allows 300 requests
 * per window across the whole API, which is far too generous for a form a human
 * submits once.
 *
 * Five per hour per IP is roughly "a genuine visitor who mistyped their email a
 * few times" and nowhere near enough to be worth scripting. `skipFailedRequests`
 * is deliberately NOT set: a validation failure still costs a database round trip
 * and is exactly what a probing script generates.
 */
export const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  ...shared,
})
