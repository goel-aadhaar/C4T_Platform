import { config } from 'dotenv'

/**
 * Loads .env.test BEFORE anything imports src/config/env.ts, which validates
 * the environment at module load and exits the process if it is wrong.
 *
 * `override: true` matters — a developer's .env is already in the shell for
 * most of these keys, and pointing the suite at the development database would
 * truncate real data.
 */
config({ path: '.env.test', override: true })

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error(
    'DATABASE_URL is not set.\n\n' +
      'Create .env.test from .env.test.example and point it at a Neon branch\n' +
      'reserved for testing, then apply the schema:\n\n' +
      '  DIRECT_DATABASE_URL="<test branch direct url>" npx prisma migrate deploy\n',
  )
}

/**
 * A blunt guard, on purpose.
 *
 * The suite truncates every table between files. Requiring the word "test"
 * somewhere in the connection string will not stop a determined mistake, but it
 * does stop the common one: running `npm test` with a shell that still has the
 * development or production URL exported.
 *
 * Set ALLOW_DESTRUCTIVE_TESTS=yes-i-am-sure to bypass it — spelled out so
 * nobody sets it by reflex.
 */
const looksLikeTest = /test/i.test(url)
const overridden = process.env.ALLOW_DESTRUCTIVE_TESTS === 'yes-i-am-sure'

if (!looksLikeTest && !overridden) {
  // Show the host and database, never the credentials.
  let redacted = url
  try {
    const parsed = new URL(url)
    redacted = `${parsed.hostname}${parsed.pathname}`
  } catch {
    redacted = '<unparseable connection string>'
  }

  throw new Error(
    `Refusing to run tests against "${redacted}".\n\n` +
      'This suite TRUNCATES every table. The connection string must contain\n' +
      '"test" — name the Neon branch or the database accordingly.\n\n' +
      'If you are certain, set ALLOW_DESTRUCTIVE_TESTS=yes-i-am-sure.\n',
  )
}

// Prisma reads this straight from the environment for migrations. Without it
// the client fails to initialise with a message that does not name the cause.
process.env.DIRECT_DATABASE_URL ??= url
