import type { Result } from './home'

/**
 * The case-study collection.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠ EVERY ENTRY HERE IS A PLACEHOLDER, AND THE HANDOFF IS EMPHATIC ABOUT WHY.
 *
 * content.md §12.3 gives a template and then this warning, verbatim:
 *
 *   "Every metric in a case study must be traceable to delivery data, and every
 *    named client must have written approval for the write-up. Anonymised case
 *    studies ('a top-5 Indian fintech') are fine and still persuasive."
 *
 * A case study is the most load-bearing claim a B2B site makes — it names a
 * customer and attaches numbers to them. Inventing either is not a copy problem,
 * it is a misrepresentation with a named third party attached.
 *
 * So the three entries below carry the same visible placeholders already
 * rendering in the homepage carousel — "Case study one", "00%" — extended into
 * the four-part structure §12.3 specifies. They are unmistakably provisional,
 * they let the template be built and reviewed, and `status: 'draft'` keeps every
 * one of them out of production and out of the sitemap.
 *
 * BEFORE ANY OF THESE GOES LIVE: the metric must trace to delivery data, and the
 * client must hold written approval for the name and the quote. Anonymise rather
 * than wait, if waiting is the blocker.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface CaseStudyQuote {
  text: string
  name: string
  role: string
}

export interface CaseStudy {
  slug: string
  /** Client name, or an anonymised descriptor per §12.3. */
  client: string
  industry: string
  /** Services used, for the meta row and future filtering. */
  services: readonly string[]
  /** One line with a number in it. Used as the index card headline. */
  headline: string
  /** §12.3: "2-3 sentences on the problem in their words". */
  challenge: readonly string[]
  /** §12.3: "the approach, scoped and specific". */
  approach: readonly string[]
  /** §12.3: "3 metrics with real numbers". */
  results: readonly Result[]
  /** §12.3: "one line from the client, attributed with permission". */
  quote?: CaseStudyQuote
  status: 'draft' | 'published'
}

export const CASE_STUDY_ENTRIES: readonly CaseStudy[] = [
  {
    slug: 'case-study-one',
    client: 'Case study one',
    industry: 'Industry',
    services: ['Service used', 'Service used'],
    headline: 'Headline result — e.g. cut regression from 3 days to 6 hours',
    challenge: [
      'The challenge, in the client’s own words — two or three sentences on what was going wrong before the engagement.',
    ],
    approach: [
      'What we did: the approach, scoped and specific. Which services, over what period, against which part of the release process.',
    ],
    results: [
      { value: '00%', label: 'Result metric one' },
      { value: '00×', label: 'Result metric two' },
      { value: '00', label: 'Result metric three' },
    ],
    // No quote: a quote needs a real person who gave permission. Better absent
    // than shaped as "Name, Title" — see TESTIMONIAL in content/home.ts.
    status: 'draft',
  },
  {
    slug: 'case-study-two',
    client: 'Case study two',
    industry: 'Industry',
    services: ['Service used'],
    headline: 'Headline result — one line, with a number in it',
    challenge: ['The challenge, in the client’s own words.'],
    approach: ['What we did, scoped and specific.'],
    results: [
      { value: '00%', label: 'Result metric one' },
      { value: '00', label: 'Result metric two' },
    ],
    status: 'draft',
  },
  {
    slug: 'case-study-three',
    client: 'Case study three',
    industry: 'Industry',
    services: ['Service used'],
    headline: 'Headline result — one line, with a number in it',
    challenge: ['The challenge, in the client’s own words.'],
    approach: ['What we did, scoped and specific.'],
    results: [
      { value: '00%', label: 'Result metric one' },
      { value: '00', label: 'Result metric two' },
    ],
    status: 'draft',
  },
]

/* ─── Page copy ────────────────────────────────────────────────────────────── */

/** Transcribed from content.md §12.3 and the prototype's `CaseStudiesPage`. */
export const CASE_STUDIES_INDEX = {
  eyebrow: 'Proof',
  title: 'Results, not adjectives.',
  /** The deck from §12.3's body line. */
  description: 'What we did, and what changed as a result.',
  emptyState: 'The first written-up engagements are being approved for publication.',
} as const

/** Section headers on a case-study detail page, from §12.3's template labels. */
export const CASE_STUDY_SECTIONS = {
  challenge: { eyebrow: 'The challenge', title: 'What was going wrong.' },
  approach: { eyebrow: 'What we did', title: 'The engagement.' },
  results: { eyebrow: 'The result', title: 'What changed.' },
} as const

/* ─── Selection ────────────────────────────────────────────────────────────── */

export function publishedCaseStudies(): readonly CaseStudy[] {
  return CASE_STUDY_ENTRIES.filter((c) => c.status === 'published')
}

/** See the note on `visiblePosts` in content/blog.ts — same rule. */
export function visibleCaseStudies(includeDrafts: boolean): readonly CaseStudy[] {
  return includeDrafts ? CASE_STUDY_ENTRIES : publishedCaseStudies()
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDY_ENTRIES.find((c) => c.slug === slug)
}

/**
 * Fails the build if a case study is published while still carrying the
 * handoff's placeholder values.
 *
 * This is the guard that matters most in this module. `status: 'published'` is one
 * word away from putting "00%" and "Case study one" in front of a buyer, and the
 * check costs nothing.
 */
export function assertPublishedCaseStudiesAreReal(): void {
  const placeholder = /^0+[%×]?$|^Case study |^Industry$|Headline result —|Result metric /i

  const broken = publishedCaseStudies()
    .filter(
      (c) =>
        placeholder.test(c.client) ||
        placeholder.test(c.industry) ||
        placeholder.test(c.headline) ||
        c.results.some((r) => placeholder.test(r.value) || placeholder.test(r.label)),
    )
    .map((c) => c.slug)

  if (broken.length > 0) {
    throw new Error(
      `Case studies marked published but still holding placeholder copy: ${broken.join(', ')}.\n` +
        `content.md §12.3: every metric must trace to delivery data and every named ` +
        `client needs written approval. Replace the values or set status back to 'draft'.`,
    )
  }
}
