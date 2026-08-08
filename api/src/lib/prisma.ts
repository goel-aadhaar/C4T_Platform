import { PrismaClient } from '@prisma/client'
import { env, isProduction } from '../config/env.js'

/**
 * Single Prisma instance for the process. On EC2 this is a long-lived Node
 * process, so one client with the default pool is correct — do not instantiate
 * per request.
 */
export const prisma = new PrismaClient({
  log: isProduction
    ? [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ]
    : [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'query' },
      ],
  datasources: { db: { url: env.DATABASE_URL } },
})

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect()
}

/**
 * BigInt does not survive JSON.stringify. Transactions store minor units as
 * BigInt, so register a serialiser once at boot.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(BigInt.prototype as any).toJSON = function toJSON(this: bigint) {
  return this.toString()
}
