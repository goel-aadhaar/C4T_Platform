import argon2 from 'argon2'

/**
 * Argon2id with OWASP-recommended parameters (19 MiB, 2 iterations, 1 lane).
 * Deliberately not configurable via env — a weakened cost factor should require
 * a code change and a review.
 */
const OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 19_456,
  timeCost: 2,
  parallelism: 1,
}

export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, OPTIONS)
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain)
  } catch {
    // A malformed hash in the DB (e.g. a bad MySQL migration row) must read as
    // "wrong password", never as a crash.
    return false
  }
}

/**
 * True when a stored hash was produced with weaker parameters than we now use,
 * so the caller can transparently re-hash on next successful login. Relevant
 * for users migrated from the legacy MySQL platform (§2.8).
 */
export function needsRehash(hash: string): boolean {
  try {
    return argon2.needsRehash(hash, OPTIONS)
  } catch {
    return true
  }
}
