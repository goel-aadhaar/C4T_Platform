import type { IconName } from '@/components/ds'
import { STATS } from './stats'
import {
  AI_SERVICES,
  PLATFORM_MODULES,
  QA_SERVICES,
  STEPS,
  type AiService,
  type PlatformModule,
  type QaService,
  type Result,
} from './home'
import { AI_TESTING_PAGE, SERVICES_PAGE, type Faq } from './pages'

/**
 * The three templated detail-page families, ported from `design/site/detail.jsx`
 * (`FAMILIES`, `DETAIL_INDEX`, `detailFor`) and `design/site/detaildata.js`
 * (`window.C4TD.ai` / `.qa` / `.platform`).
 *
 * CLAUDE.md rule 5: ONE `[slug]` template per family. All 33 detail pages are
 * generated from the records below via `generateStaticParams`. Never hand-write
 * a page file for an individual service.
 *
 * HOW THIS DIFFERS FROM THE PROTOTYPE. `detail.jsx` had no URLs, so it matched
 * a clicked nav LABEL against an item TITLE through a 32-entry `alias` table
 * ("Chatbot Testing" → "Chatbot & Conversational AI", "AI Test Generation" →
 * "AI Test Case Generator"). Next routes by path, so each item instead carries
 * its own `slug` — declared next to the item in `content/home.ts` for the ones
 * the homepage also shows, and here for the rest. The alias table is gone: a
 * title can be reworded without breaking a URL, and `assertFamiliesMatchRoutes`
 * below fails the build if a slug ever drifts from the README route map.
 *
 * WHERE THE ITEMS COME FROM. Each family is the homepage list plus the
 * detail-only entries the homepage has no room for. The concatenation order is
 * the prototype's, and it is load-bearing: `content/media.ts` rotates the photo
 * pool by item index, so reordering reshuffles the imagery on every page.
 */

/* ─── Detail-only items ────────────────────────────────────────────────────── */

/** The AI service that has a detail page but no homepage card. */
const AI_EXTRA: readonly AiService[] = [
  {
    icon: 'database',
    eyebrow: 'Data',
    title: 'AI Data Collection',
    slug: 'ai-data-collection',
    description:
      "Synthetic data can't reproduce a regional dialect, a clinician's phrasing, or the way a real person mumbles a wake word. Our community can.",
    points: [
      'Speech & audio',
      'Text & instruction data',
      'Image & video capture',
      'Preference & RLHF data',
    ],
  },
]

const QA_EXTRA: readonly QaService[] = [
  {
    icon: 'smartphone',
    title: 'Mobile App Testing',
    slug: 'mobile-app-testing',
    description:
      'Emulators miss battery drain, thermal throttling, permission dialogs, notification behaviour and everything that happens on a three-year-old phone with 400 apps installed.',
    meta: 'iOS · Android · Tablets · Foldables',
  },
  {
    icon: 'monitor',
    title: 'Web App Testing',
    slug: 'web-app-testing',
    description:
      'Browser versions, screen sizes, extensions, zoom levels, corporate proxies and ad blockers all change how your app behaves.',
    meta: 'Chrome · Safari · Firefox · Edge · Core Web Vitals',
  },
  {
    icon: 'webhook',
    title: 'API Testing',
    slug: 'api-testing',
    description:
      'Most integration failures happen below the interface. We test the contract directly.',
    meta: 'REST · GraphQL · gRPC · WebSocket · Webhooks',
  },
  {
    icon: 'eye',
    title: 'Usability Testing',
    slug: 'usability-testing',
    description:
      "Watch someone fail at the thing you thought was obvious. It's uncomfortable and it's the fastest product feedback you'll ever get.",
    meta: 'Moderated · Unmoderated · Card sorting · SUS scoring',
  },
  {
    icon: 'layout-grid',
    title: 'Compatibility & Device Testing',
    slug: 'compatibility-testing',
    description:
      'The top ten devices are easy. Your bugs are in the next two hundred. We build the matrix from your analytics, not a generic device list.',
    meta: 'Devices · OS versions · Browsers · Screen sizes',
  },
  {
    icon: 'gamepad-2',
    title: 'Game Testing',
    slug: 'game-testing',
    description:
      "Someone who has never played a competitive shooter won't notice that the netcode feels wrong. We match testers by platform and genre.",
    meta: 'Gameplay · Multiplayer · Performance · Store compliance',
  },
  {
    icon: 'cpu',
    title: 'IoT, AR & VR Testing',
    slug: 'iot-and-ar-vr-testing',
    description:
      "Some things can only be tested in a real house — wifi dead spots, competing devices, unusual room layouts and people who don't read the manual.",
    meta: 'Pairing · Connectivity · Sensors · Comfort · Safety',
  },
]

const PLATFORM_EXTRA: readonly PlatformModule[] = [
  {
    icon: 'smartphone',
    title: 'Device Cloud',
    slug: 'device-cloud',
    description:
      "Data-centre device farms give you a phone in a rack on a fast connection. That isn't the same as a phone in a user's hand on a congested network in Jakarta.",
  },
  {
    icon: 'plug',
    title: 'Integrations',
    slug: 'integrations',
    description:
      "Results go where your team already is, with two-way sync. Close a bug in Jira and it's closed here, so retest scheduling happens automatically.",
  },
  {
    icon: 'lock',
    title: 'Security & Compliance',
    slug: 'security',
    description:
      "You're giving an external partner access to unreleased software. Certifications, tester vetting, platform controls and product protection — documented.",
  },
]

/* ─── Family shape ─────────────────────────────────────────────────────────── */

/** What the shared detail template needs from any family's item. */
export interface DetailItem {
  icon: IconName
  title: string
  slug: string
  description: string
  /** Capability chips. Derived from `points` or a split `meta`. */
  chips: readonly string[]
  eyebrow?: string
  badge?: string
}

export type FamilyKey = 'ai' | 'services' | 'platform'

export interface DetailFamily {
  key: FamilyKey
  /** URL prefix, no trailing slash. */
  base: string
  /** Mono eyebrow above every hero in the family. */
  eyebrow: string
  /** Link back to the hub, at the top of the "Related" section. */
  hubCta: string
  /** Stat band under the hero. */
  stats: readonly Result[]
  coverTitle: string
  coverDescription: string
  relatedTitle: string
  items: readonly DetailItem[]
}

/**
 * The prototype's `chipsOf`. `points` wins; otherwise the middot-separated
 * `meta` string is split. Items with neither render no chip grid at all —
 * the platform modules are the case that hits.
 */
function chipsOf(item: { points?: readonly string[]; meta?: string }): readonly string[] {
  if (item.points) return item.points
  if (item.meta) {
    return item.meta
      .split('·')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function toDetailItems(
  items: readonly (AiService | QaService | PlatformModule)[],
): readonly DetailItem[] {
  return items.map((item) => ({
    icon: item.icon,
    title: item.title,
    slug: item.slug,
    description: item.description,
    chips: chipsOf(item as { points?: readonly string[]; meta?: string }),
    eyebrow: 'eyebrow' in item ? item.eyebrow : undefined,
    badge: 'badge' in item ? item.badge : undefined,
  }))
}

export const FAMILIES = {
  ai: {
    key: 'ai',
    base: '/ai-testing',
    eyebrow: 'AI Quality',
    hubCta: 'All AI testing',
    stats: AI_TESTING_PAGE.stats,
    coverTitle: 'The failure modes we test for.',
    coverDescription:
      'Scoped to your product, graded against a rubric your domain experts wrote — not a generic checklist.',
    relatedTitle: 'Other AI quality services.',
    items: toDetailItems([...AI_SERVICES, ...AI_EXTRA]),
  },
  services: {
    key: 'services',
    base: '/services',
    eyebrow: 'Quality Engineering',
    hubCta: 'All services',
    // The prototype indexed the homepage stat band as [0], [1], [2].
    stats: [
      { value: STATS.testers, label: 'Vetted testers' },
      { value: STATS.countries, label: 'Countries' },
      { value: STATS.devices, label: 'Real devices' },
    ],
    coverTitle: "What's in scope.",
    coverDescription:
      'Coverage agreed up front, executed on real devices in the markets you actually serve.',
    relatedTitle: 'Other QA services.',
    items: toDetailItems([...QA_SERVICES, ...QA_EXTRA]),
  },
  platform: {
    key: 'platform',
    base: '/platform',
    eyebrow: 'The Platform',
    hubCta: 'Platform overview',
    // The prototype used [3], [2], [4] here — clients, devices, years.
    stats: [
      { value: STATS.clients, label: 'Enterprise clients' },
      { value: STATS.devices, label: 'Real devices' },
      { value: '11 years', label: 'Delivering quality' },
    ],
    coverTitle: 'How the module works.',
    coverDescription:
      'Every automated step has a human checkpoint before anything reaches your backlog.',
    relatedTitle: 'Other platform modules.',
    items: toDetailItems([...PLATFORM_MODULES, ...PLATFORM_EXTRA]),
  },
} as const satisfies Record<FamilyKey, DetailFamily>

/* ─── Shared blocks ────────────────────────────────────────────────────────── */

/** The three-step engagement, rendered on every detail page. */
export const DELIVERY = STEPS

/** "What you receive" — the same list as the Services hub. */
export const INCLUDED = SERVICES_PAGE.included

/** The same four questions on all 33 detail pages, per the prototype. */
export const DETAIL_FAQS: readonly Faq[] = [
  {
    q: 'How quickly can we start?',
    a: 'A scoping call, then a written test strategy and fixed-price pilot scope, usually within a week. Execution starts once you sign off the scope.',
  },
  {
    q: 'Who runs the work?',
    a: 'A named QA lead owns your engagement end to end. You talk to the person doing the work, not an account manager relaying messages.',
  },
  {
    q: 'Where do findings land?',
    a: 'In your tracker — Jira, Linear, GitHub, GitLab or Azure DevOps — triaged, deduplicated and prioritised, with video, logs and reproduction steps attached.',
  },
  {
    q: 'Do we have to commit up front?',
    a: 'No. Start with a two-week pilot on one release: fixed scope, fixed price. Annual commitments come with better rates and are a choice, not a requirement.',
  },
]

export const DETAIL_SECTIONS = {
  cover: { eyebrow: 'What we cover' },
  delivery: {
    eyebrow: 'How we work',
    title: 'Scope, execute, decide.',
    description:
      'The same three-step engagement on every programme. No discovery phase that bills for three months before anything gets tested.',
  },
  received: { eyebrow: 'What you receive', title: 'Evidence, not a status update.' },
  integrations: {
    eyebrow: 'Integrations',
    title: 'Results land where your team already works.',
    description:
      'No new dashboard to check. Bugs go to your tracker, runs trigger from your pipeline.',
  },
  related: { eyebrow: 'Related' },
  faq: { eyebrow: 'FAQ', title: 'Questions we get asked.' },
} as const

/* ─── Lookup ───────────────────────────────────────────────────────────────── */

const BY_SLUG: Record<FamilyKey, Map<string, DetailItem>> = {
  ai: new Map(FAMILIES.ai.items.map((i) => [i.slug, i])),
  services: new Map(FAMILIES.services.items.map((i) => [i.slug, i])),
  platform: new Map(FAMILIES.platform.items.map((i) => [i.slug, i])),
}

/** Every slug in a family, for `generateStaticParams`. */
export function familySlugs(key: FamilyKey): string[] {
  return FAMILIES[key].items.map((i) => i.slug)
}

/** The item at a slug, or undefined so the page can call `notFound()`. */
export function getDetail(key: FamilyKey, slug: string): DetailItem | undefined {
  return BY_SLUG[key].get(slug)
}

/** Position in the family — drives which photo the page opens with. */
export function detailIndex(key: FamilyKey, slug: string): number {
  return FAMILIES[key].items.findIndex((i) => i.slug === slug)
}

/** Up to six other pages in the same family, for the "Related" grid. */
export function siblingsOf(key: FamilyKey, slug: string, limit = 6): readonly DetailItem[] {
  return FAMILIES[key].items.filter((i) => i.slug !== slug).slice(0, limit)
}

/**
 * Fails the build if a family's slugs stop matching the handoff README's route
 * map. The map is the contract with the client and with `redirects.ts`, whose
 * destinations are these exact paths — a silent rename would 404 legacy traffic
 * that currently ranks, which is the one failure mode nobody notices in review.
 *
 * Called from `lib/seo/routes.ts`, which builds its family entries from here.
 */
export function assertFamiliesMatchRoutes(expected: Record<FamilyKey, readonly string[]>): void {
  const problems: string[] = []

  for (const key of Object.keys(FAMILIES) as FamilyKey[]) {
    const actual = familySlugs(key)
    const want = expected[key]

    const missing = want.filter((s) => !actual.includes(s))
    const extra = actual.filter((s) => !want.includes(s))
    const dupes = actual.filter((s, i) => actual.indexOf(s) !== i)

    if (missing.length) problems.push(`  ${key}: missing ${missing.join(', ')}`)
    if (extra.length) problems.push(`  ${key}: not in the route map — ${extra.join(', ')}`)
    if (dupes.length) problems.push(`  ${key}: duplicate slug ${dupes.join(', ')}`)
  }

  if (problems.length) {
    throw new Error(
      `content/details.ts has drifted from the README route map:\n${problems.join('\n')}`,
    )
  }
}
