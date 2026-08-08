import { prisma } from '../src/lib/prisma.js'
import { pruneExpiredSessions } from '../src/modules/auth/auth.service.js'

/**
 * Delete session rows that can no longer authenticate anything.
 *
 *   npm run sessions:prune
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 *
 * `pruneExpiredSessions` was written with a doc comment saying "safe to run from
 * a cron", and then nothing ever called it — no scheduler, no job runner, no
 * script. Auth here is STATEFUL: every sign-in writes a row, and every refresh
 * rotation writes another. Nothing removed them, so the `sessions` table grew
 * without bound.
 *
 * That is not merely untidy. The table is on the hot path — `authenticate` looks
 * a session up on every single request — and it is billed by storage on Neon.
 * An unbounded table on the hot path gets slower and more expensive forever.
 *
 * A `pg-boss` dependency was installed, presumably for exactly this, and never
 * imported. Rather than stand up a job queue for one periodic delete, this is a
 * plain script an external scheduler calls. Fewer moving parts, and it works the
 * same under PM2, systemd, GitHub Actions or a Neon scheduled job.
 *
 *   # crontab: every night at 03:15
 *   15 3 * * *  cd /srv/c4t-api && npm run sessions:prune >> /var/log/c4t-prune.log 2>&1
 *
 * WHAT IT KEEPS. Rows revoked within the grace period (30 days by default) are
 * left alone, so support can still answer "why was I signed out?". Only rows past
 * their absolute expiry, or revoked longer ago than the grace period, are deleted
 * — neither can authenticate a request.
 * ──────────────────────────────────────────────────────────────────────────
 */

const graceDays = Number(process.env.SESSION_PRUNE_GRACE_DAYS ?? 30)

if (!Number.isFinite(graceDays) || graceDays < 0) {
  console.error(`SESSION_PRUNE_GRACE_DAYS must be a non-negative number, got "${graceDays}"`)
  process.exit(1)
}

try {
  const before = await prisma.session.count()
  const deleted = await pruneExpiredSessions(graceDays)
  const after = await prisma.session.count()

  console.log(
    `Pruned ${deleted} session row${deleted === 1 ? '' : 's'} ` +
      `(${before} → ${after}, keeping revoked rows for ${graceDays} days).`,
  )
} catch (error) {
  // Exit non-zero so a scheduler surfaces the failure instead of logging a
  // success it never had.
  console.error('Session prune failed:', error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
