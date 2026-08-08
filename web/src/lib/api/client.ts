import { env } from '@/lib/env'
import type { ApiFailure, ApiSuccess } from './types'

/**
 * Typed fetch wrapper for the Express API.
 *
 * Everything goes through /api/v1/* on this origin, which Next rewrites to the
 * API (see next.config.ts). Same-origin means no CORS and no cross-domain
 * cookie coordination.
 */

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown
  readonly requestId?: string

  constructor(status: number, body: Partial<ApiFailure>) {
    super(body.error?.message ?? `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.code = body.error?.code ?? 'UNKNOWN'
    this.details = body.error?.details
    this.requestId = body.requestId
  }

  /** True when refreshing the session could plausibly fix this. */
  get isRetryableAuthFailure(): boolean {
    // Only an expired access token is worth retrying. A revoked, expired or
    // reused session will fail again — see the 401 table in api/docs/API.md.
    return this.status === 401 && this.code === 'UNAUTHORIZED'
  }

  get isValidationError(): boolean {
    return this.status === 422
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  /** Appended as a query string; undefined and null values are dropped. */
  query?: Record<string, string | number | boolean | undefined | null>
  /** Skip the automatic refresh-and-retry on a 401. */
  noRetry?: boolean
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const base = env.NEXT_PUBLIC_API_BASE.replace(/\/$/, '')
  const url = `${base}/${path.replace(/^\//, '')}`
  if (!query) return url

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  }
  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

async function parse<T>(response: Response): Promise<T> {
  // 204 and other empty bodies are legitimate successes.
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T
  }

  const text = await response.text()
  if (!text) return undefined as T

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    if (!response.ok) {
      throw new ApiError(response.status, {
        error: { code: 'MALFORMED_RESPONSE', message: text.slice(0, 300) },
      })
    }
    throw new Error('API returned a non-JSON success response')
  }

  if (!response.ok) throw new ApiError(response.status, json as Partial<ApiFailure>)

  return (json as ApiSuccess<T>).data
}

/**
 * Browser-side request.
 *
 * On a 401 with a genuinely expired access token, refreshes once and replays.
 * Concurrent 401s share a single refresh so a dashboard firing six requests at
 * once does not rotate the refresh token six times — which the API would treat
 * as replay and kill the session.
 */
let inFlightRefresh: Promise<boolean> | null = null

async function refreshSession(): Promise<boolean> {
  inFlightRefresh ??= (async () => {
    try {
      const response = await fetch(buildUrl('/auth/refresh'), {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: '{}',
      })
      return response.ok
    } catch {
      return false
    } finally {
      // Cleared on the next tick so callers awaiting this promise all see the
      // same result before a new refresh can start.
      queueMicrotask(() => {
        inFlightRefresh = null
      })
    }
  })()

  return inFlightRefresh
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, noRetry, headers, ...rest } = options

  const send = () =>
    fetch(buildUrl(path, query), {
      ...rest,
      credentials: 'include',
      headers: {
        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })

  let response = await send()

  if (response.status === 401 && !noRetry) {
    const parsedBody = (await response
      .clone()
      .json()
      .catch(() => null)) as Partial<ApiFailure> | null

    if (parsedBody?.error?.code === 'UNAUTHORIZED' && (await refreshSession())) {
      response = await send()
    }
  }

  return parse<T>(response)
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'POST', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
}
