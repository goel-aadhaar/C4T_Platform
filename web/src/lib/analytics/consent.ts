/**
 * Cookie consent — the storage contract, shared by the banner and the loader.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY CONSENT IS THE GATE AND NOT A NOTICE
 *
 * content.md §3.4 offers three choices — Accept all, Essential only, Manage
 * preferences — and the copy says "You choose." That only means anything if
 * analytics genuinely does not load until someone chooses. Under GDPR and the
 * India DPDPA, an analytics cookie is not strictly necessary, so it needs prior
 * consent; a banner that announces tracking already underway is the pattern
 * regulators have been fining. On a site whose Trust page claims GDPR and DPDPA
 * alignment, getting this wrong is a contradiction a prospect can screenshot.
 *
 * So: `analytics` defaults to false, nothing loads until the visitor decides,
 * and "Essential only" is a real outcome rather than a dismissal.
 *
 * WHY A COOKIE AND NOT localStorage. The value has to be readable on the server
 * so the layout can decide whether to render the analytics loader at all,
 * instead of shipping it and having it opt out of itself in the browser.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const CONSENT_COOKIE = 'c4t-consent'

/**
 * Six months. Long enough not to nag, short enough that consent is periodically
 * renewed — which the ICO's guidance expects.
 */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182

export interface ConsentState {
  /** Always true. Kept explicit so the shape reads as a full record. */
  essential: true
  analytics: boolean
  /** ISO date. Evidence of WHEN consent was given, which is the part audits ask for. */
  decidedAt: string
}

/**
 * Parses the cookie value. Returns null when there is no decision yet — which
 * is what makes the banner appear, so it must NOT fall back to a default.
 *
 * Tolerates malformed values by treating them as "no decision". A visitor with a
 * corrupted cookie gets asked again; the alternative is silently assuming
 * consent, which is the one outcome that is never acceptable here.
 */
export function parseConsent(raw: string | undefined): ConsentState | null {
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw))
    if (typeof parsed !== 'object' || parsed === null) return null

    const value = parsed as Record<string, unknown>
    if (typeof value.decidedAt !== 'string') return null

    return {
      essential: true,
      analytics: value.analytics === true,
      decidedAt: value.decidedAt,
    }
  } catch {
    return null
  }
}

export function serialiseConsent(analytics: boolean): string {
  const state: ConsentState = {
    essential: true,
    analytics,
    decidedAt: new Date().toISOString(),
  }
  return encodeURIComponent(JSON.stringify(state))
}
