import type { Redirect } from 'next/dist/lib/load-custom-routes'

/**
 * 301/308 map from the old crowd4test.com to the rebuilt site.
 *
 * These are not housekeeping. The old URLs carry whatever search ranking the
 * current site has accumulated since 2015; losing them means starting from zero
 * on Google the day you cut over.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * TWO THINGS ABOUT NEXT'S MATCHING, LEARNED THE HARD WAY
 *
 * 1. Redirect `source` matching is CASE-INSENSITIVE, but filesystem routing is
 *    CASE-SENSITIVE. That asymmetry is a trap. A rule `/Pricing → /pricing`
 *    also matches `/pricing`, so the destination redirects to itself and the
 *    browser reports ERR_TOO_MANY_REDIRECTS. There is no `caseSensitive`
 *    option on the Redirect type to opt out.
 *
 *    So case-only differences are NOT handled here. `proxy.ts` canonicalises
 *    them, where the comparison can be exact. Only genuine path CHANGES live in
 *    this map, and `assertNoSelfRedirect` below fails the build if one sneaks
 *    back in.
 *
 * 2. Because matching is case-insensitive, one entry covers every casing —
 *    `/aboutus`, `/Aboutus` and `/ABOUTUS` all match the `/Aboutus` rule. An
 *    earlier version generated explicit lowercase variants; they were redundant
 *    and were what produced the loop.
 *
 * `permanent: true` emits 308, not 301. Google treats them identically for
 * ranking and 308 additionally preserves the HTTP method. If an audit demands a
 * literal 301, swap `permanent` for `statusCode: 301` — they are mutually
 * exclusive and passing both throws.
 * ──────────────────────────────────────────────────────────────────────────
 */
const LEGACY_REDIRECTS: Readonly<Record<string, string>> = {
  '/Aboutus': '/company/about',
  '/Compatibility': '/services/compatibility-testing',
  '/Game': '/services/game-testing',
  '/Localization': '/services/localization-testing',
  '/AI': '/ai-testing',
  '/Accessibility': '/services/accessibility-testing',
  '/PaymentBased': '/services/payment-testing',
  '/API': '/services/api-testing',
  '/Performance': '/services/performance-testing',
  '/Security': '/services/security-testing',
  '/Automation': '/services/test-automation',
  '/Mobile': '/services/mobile-app-testing',
  '/Website': '/services/web-app-testing',
  '/Desktop': '/services/functional-testing',
  '/Iot': '/services/iot-and-ar-vr-testing',
  '/Arvr': '/services/iot-and-ar-vr-testing',
  '/ChatBots': '/ai-testing/chatbot-testing',
  '/Webinar': '/company/blog',
  '/Owncrowd': '/contact',
  '/Termsandcontion': '/legal/terms',
  '/Privacy': '/legal/privacy',
  '/Faq': '/company/about',
  // NOT here, deliberately — see note 1. `/Pricing` and `/Contact` differ from
  // their destinations only by case, so proxy.ts canonicalises them.
}

/**
 * Paths that content.md's sitemap gave their own page but the handoff README's
 * route map does not (see the scope note in `lib/seo/routes.ts`).
 *
 * These are NOT legacy URLs — nothing links to them from the old site. They are
 * here because the copy, the CTAs and content.md all name them, so somebody will
 * type one. A redirect costs nothing and beats a 404 on `/book-a-demo`.
 *
 * If the client reinstates any of these sections, delete the entry and add the
 * route back to the registry — in that order, or the rule will shadow the page.
 */
const UNBUILT_SECTION_REDIRECTS: Readonly<Record<string, string>> = {
  '/book-a-demo': '/contact',
  '/start-a-pilot': '/contact',
  '/trust': '/company/trust',
  '/company': '/company/about',
  '/resources': '/company/blog',
  '/resources/blog': '/company/blog',
  '/resources/case-studies': '/company/case-studies',
  // Cut from the navigation late in design. CLAUDE.md rule 10 bars /industries
  // and /solutions; the tester section and the remaining resources pages are
  // absent from the README map. All land on the nearest page that does exist.
  '/industries': '/services',
  '/solutions': '/services',
  '/testers': '/contact',
  '/bring-your-own-crowd': '/contact',
}

/**
 * Guards note 1 at build time. A case-only entry produces a redirect loop that
 * only shows up when someone visits the destination, which is exactly the kind
 * of bug that ships.
 */
function assertNoSelfRedirect(): void {
  const offenders = Object.entries({
    ...LEGACY_REDIRECTS,
    ...UNBUILT_SECTION_REDIRECTS,
  }).filter(([from, to]) => from.toLowerCase() === to.toLowerCase())
  if (offenders.length > 0) {
    throw new Error(
      `Redirect loop in LEGACY_REDIRECTS. Next matches \`source\` case-insensitively, ` +
        `so these rules would also match their own destination:\n` +
        offenders.map(([f, t]) => `  ${f} → ${t}`).join('\n') +
        `\nLet proxy.ts canonicalise case instead.`,
    )
  }
}

export function legacyRedirects(): Redirect[] {
  assertNoSelfRedirect()

  const rules: Redirect[] = Object.entries({
    ...LEGACY_REDIRECTS,
    ...UNBUILT_SECTION_REDIRECTS,
  }).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  }))

  // The old blog lived at /blog/*; it now sits under /company.
  rules.push({
    source: '/blog/:slug*',
    destination: '/company/blog/:slug*',
    permanent: true,
  })

  // Everything UNDER the cut sections, not just their index pages — content.md
  // named about twenty child pages across the four. Kept separate from the map
  // above because a wildcard cannot be self-checked the same way: `:path*` never
  // equals its own source string.
  //
  // Order matters. These are pushed last, so the specific rules above still win:
  // `/resources/case-studies` reaches its own destination rather than being
  // swallowed by the `/resources/:path*` catch-all.
  const CUT_SECTIONS: Readonly<Record<string, string>> = {
    '/industries': '/services',
    '/solutions': '/services',
    '/testers': '/contact',
    '/resources': '/company/blog',
  }

  for (const [prefix, destination] of Object.entries(CUT_SECTIONS)) {
    rules.push({ source: `${prefix}/:path*`, destination, permanent: true })
  }

  return rules
}
