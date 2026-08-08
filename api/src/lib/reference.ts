import { prisma } from './prisma.js'

/**
 * Human-facing reference numbers: C4T-2026-0142, BUG-2026-00417, TXN-2026-00318.
 *
 * Implemented with a Postgres sequence per entity per year rather than
 * count()+1, which races under concurrent inserts and would eventually collide
 * on the unique index.
 */

type Entity = 'project' | 'bug' | 'transaction'

const CONFIG: Record<Entity, { prefix: string; pad: number }> = {
  project: { prefix: 'C4T', pad: 4 },
  bug: { prefix: 'BUG', pad: 5 },
  transaction: { prefix: 'TXN', pad: 5 },
}

export async function nextReference(entity: Entity, now = new Date()): Promise<string> {
  const { prefix, pad } = CONFIG[entity]
  const year = now.getUTCFullYear()
  const sequenceName = `ref_${entity}_${year}`

  // CREATE SEQUENCE IF NOT EXISTS is idempotent and cheap after the first call.
  // Identifiers cannot be parameterised, so the name is built from a closed set
  // of entity keys plus a numeric year — never from user input.
  await prisma.$executeRawUnsafe(`CREATE SEQUENCE IF NOT EXISTS "${sequenceName}" START 1`)
  const rows = await prisma.$queryRawUnsafe<{ nextval: bigint }[]>(
    `SELECT nextval('"${sequenceName}"') AS nextval`,
  )

  const value = Number(rows[0]?.nextval ?? 1)
  return `${prefix}-${year}-${String(value).padStart(pad, '0')}`
}
