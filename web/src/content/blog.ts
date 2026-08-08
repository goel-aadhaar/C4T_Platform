import type { ResourceType } from '@/components/ds'

/**
 * The blog collection.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * NO POST BODIES EXIST YET, AND NONE ARE INVENTED HERE.
 *
 * `content.md` §12.2 gives the blog's page copy, a note that the grid shows
 * "title, category, read time, date, excerpt", and a suggested twelve-post launch
 * calendar — TITLES ONLY. There is not a paragraph of article prose anywhere in
 * the handoff, and writing some would mean publishing claims and opinions in the
 * company's voice that nobody at the company has approved. CLAUDE.md is explicit:
 * all text comes from content.md.
 *
 * So this module ships the pipeline and the metadata, and `status` decides what
 * is real:
 *
 *   published — has a body, appears in the index, the sitemap and search
 *   draft     — metadata only; visible on preview so it can be reviewed, absent
 *               from production entirely, `noindex` wherever it renders
 *
 * Every entry is currently `draft`. The moment a body is written and the status
 * flipped, the post gets a route, an index card and a sitemap entry with no other
 * change. See `publishedPosts()` and `visiblePosts()` below for the split.
 *
 * content.md §12.2 also lists a twelve-post launch calendar. That is an editorial
 * plan, not site content, so it is not held here — it belongs in whatever tracks
 * the work.
 *
 * WHY TYPED OBJECTS AND NOT MDX. The handoff README allows either, and says MDX
 * only "if long-form authoring matters". Adding an MDX toolchain before a single
 * paragraph exists is infrastructure for a use case nobody has exercised. `body`
 * is an array of paragraphs; when a real post needs headings, pull-quotes and
 * code, that is the moment to swap this field for MDX — the rest of the module
 * and both routes stay as they are.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface BlogPost {
  slug: string
  title: string
  /** Drives the card's plate icon. Same union as ResourceCard. */
  type: ResourceType
  /** One or two sentences on the index card and in the meta description. */
  excerpt: string
  /** ISO date. Absent on a draft — an unpublished post has no publication date. */
  date?: string
  readTime?: string
  author?: string
  /**
   * Paragraphs. Absent on a draft; a `published` post without one is a build
   * error, asserted in `assertPublishedPostsHaveBodies()`.
   */
  body?: readonly string[]
  status: 'draft' | 'published'
}

/**
 * The four resources that already appear on the homepage carousel, promoted to
 * blog entries. Titles and excerpts are transcribed from content.md §4.15 — they
 * are the only resource copy in the handoff that has both.
 */
const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'ultimate-guide-to-testing-ai-applications',
    title: 'The Ultimate Guide to Testing AI Applications',
    type: 'Guide',
    excerpt: 'A practical framework for validating LLMs, agents and RAG systems.',
    status: 'draft',
  },
  {
    slug: 'state-of-ai-quality-2026',
    title: 'The State of AI Quality 2026',
    type: 'Report',
    excerpt: 'What 1,200 engineering teams told us about testing AI in production.',
    status: 'draft',
  },
  {
    slug: 'genai-testing-checklist',
    title: 'GenAI Testing Checklist',
    type: 'Article',
    excerpt: '45 checks to run before you ship an AI feature.',
    status: 'draft',
  },
  {
    slug: 'crowd-testing-vs-in-house-qa',
    title: 'Crowd Testing vs. In-House QA: The Real Cost',
    type: 'Article',
    excerpt: 'An honest cost model, including the parts vendors leave out.',
    status: 'draft',
  },
]

/* ─── Page copy ────────────────────────────────────────────────────────────── */

/** Transcribed from content.md §12.2. */
export const BLOG_INDEX = {
  eyebrow: 'Blog',
  title: 'Learn how modern QA actually works.',
  /** The deck from §12.2's body line. */
  description: "What we're learning from testing AI and software at scale.",
  /**
   * Shown when nothing is published. UI text, not marketing copy — there is
   * nothing in content.md to transcribe for an empty blog, and the alternative
   * is a heading over blank space.
   */
  emptyState: 'The first posts are being written. Check back shortly.',
} as const

/* ─── Selection ────────────────────────────────────────────────────────────── */

/** Real posts: routed, indexed, in the sitemap. */
export function publishedPosts(): readonly BlogPost[] {
  return BLOG_POSTS.filter((p) => p.status === 'published')
}

/**
 * What a given environment should route and list.
 *
 * On preview and locally this includes drafts, so the client can review a post
 * and the template before it goes live. In production it is `publishedPosts()`
 * exactly — a draft is not reachable, not linked and not in the sitemap.
 *
 * The caller passes `includeDrafts` rather than reading env here, so the rule
 * lives at the route level where it is visible.
 */
export function visiblePosts(includeDrafts: boolean): readonly BlogPost[] {
  return includeDrafts ? BLOG_POSTS : publishedPosts()
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

/**
 * Fails the build if a post claims to be published without a body or a date.
 *
 * The status field is the only thing standing between a draft and the live site,
 * so flipping it must not be able to ship an empty page. Called from the index
 * route, which every blog URL loads through.
 */
export function assertPublishedPostsHaveBodies(): void {
  const broken = publishedPosts()
    .filter((p) => !p.body?.length || !p.date)
    .map((p) => p.slug)

  if (broken.length > 0) {
    throw new Error(
      `Blog posts marked published with no body or no date: ${broken.join(', ')}.\n` +
        `Add both, or set status back to 'draft'.`,
    )
  }
}
