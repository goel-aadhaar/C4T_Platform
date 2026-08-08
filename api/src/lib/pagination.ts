import { z } from 'zod'

/**
 * Offset pagination. The admin panel needs page numbers and total counts, which
 * cursor pagination cannot give cheaply, and no admin list here is large enough
 * for deep-offset cost to matter.
 */
export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
})

export type PaginationQuery = z.infer<typeof paginationQuery>

export interface PageMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function toSkipTake(q: Pick<PaginationQuery, 'page' | 'limit'>) {
  return { skip: (q.page - 1) * q.limit, take: q.limit }
}

export function buildMeta(q: Pick<PaginationQuery, 'page' | 'limit'>, total: number): PageMeta {
  const totalPages = Math.max(1, Math.ceil(total / q.limit))
  return {
    page: q.page,
    limit: q.limit,
    total,
    totalPages,
    hasNext: q.page < totalPages,
    hasPrev: q.page > 1,
  }
}

/**
 * Whitelisted sort builder. Never interpolate a client-supplied field name into
 * an orderBy without checking it against an allow-list.
 */
export function buildOrderBy<T extends string>(
  sort: string | undefined,
  order: 'asc' | 'desc',
  allowed: readonly T[],
  fallback: T,
): Record<string, 'asc' | 'desc'> {
  const field = sort && (allowed as readonly string[]).includes(sort) ? sort : fallback
  return { [field]: order }
}
