'use client'

import Script from 'next/script'
import { isProduction } from '@/lib/env'
import { useConsent } from '@/lib/analytics/useConsent'

/**
 * The analytics loader. Renders nothing unless consent was granted, so a visitor
 * who chose "Essential only" never receives the script.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠ NO VENDOR IS CONFIGURED, AND THAT IS A DECISION FOR THE CLIENT.
 *
 * Nothing in the Service Agreement, the handoff README or content.md names an
 * analytics provider. Picking one unilaterally would commit the client to a
 * third-party processor they then have to name in their privacy policy and DPA —
 * their call, not a developer's, and exactly what a GDPR/DPDPA-aligned trust page
 * has to be able to answer.
 *
 * So the gate, the banner, the cookie contract and this loader are all built and
 * testable; only the snippet is absent. Wiring one is:
 *
 *   1. add `NEXT_PUBLIC_ANALYTICS_ID` to `lib/env.ts`
 *   2. drop the vendor's tag below, keeping it inside this component
 *   3. add the provider to the privacy policy and the sub-processor list
 *
 * Step 3 is not optional and is the reason this is not already done.
 *
 * WHAT TO PREFER. A cookieless, first-party-proxied provider (Plausible, Fathom,
 * self-hosted Umami) keeps this simple and keeps the Trust page honest. GA4 works
 * too but drags Consent Mode, a longer sub-processor list and an ad-tech
 * conversation into a site that is otherwise clean.
 *
 * WHY A CLIENT COMPONENT. It was a Server Component reading `cookies()`, which
 * opted every page out of static generation. See `lib/analytics/useConsent.ts`.
 * ──────────────────────────────────────────────────────────────────────────
 */
export function Analytics() {
  const { consent, decided } = useConsent()

  // Never in development or preview — local page views polluting production
  // numbers is the classic way analytics stops being trusted.
  if (!isProduction) return null

  // `decided === null` is pre-hydration: no decision has been READ yet, which is
  // not the same as no decision existing. Loading here would fire before consent
  // is known, which is the entire thing this component exists to prevent.
  if (decided !== true || !consent?.analytics) return null

  const measurementId = process.env.NEXT_PUBLIC_ANALYTICS_ID
  if (!measurementId) return null

  return (
    <Script
      // Placeholder path. Replace with the chosen vendor's endpoint; with the env
      // var unset this branch never runs, so nothing loads today.
      src="/_vendor/analytics.js"
      data-site={measurementId}
      strategy="afterInteractive"
    />
  )
}
