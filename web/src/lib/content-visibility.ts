import { isProduction } from '@/lib/env'

/**
 * Whether draft content is routed and listed.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * Blog posts and case studies carry a `status` of `draft` or `published`. Drafts
 * exist so the client can review a page — its layout, its metadata, the template
 * itself — before the copy is signed off. That review has to happen somewhere
 * reachable, and it must not be the live site.
 *
 * So: drafts are routed, listed and `noindex`ed on preview and locally; in
 * production they do not exist. No route, no index card, no sitemap entry, no
 * link. A production build with an unfinished case study in the repo cannot serve
 * it, which is the guarantee that matters — `content/case-studies.ts` holds
 * placeholder client names and "00%" metrics today.
 *
 * ⚠ THIS IS FIXED AT BUILD TIME. `NEXT_PUBLIC_ENVIRONMENT` is inlined by Next
 * during the build, so the flag reflects how the bundle was built, not where it
 * happens to be running. A preview deployment built with production env would
 * hide its own drafts — which is safe, just unhelpful. The production pipeline
 * must set `NEXT_PUBLIC_ENVIRONMENT=production`; `robots.ts` depends on the same
 * variable for the same reason.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const INCLUDE_DRAFTS = !isProduction

/**
 * Metadata additions for a draft page. Merged over `buildMetadata`'s output.
 *
 * `noindex, nofollow` on every draft, belt and braces: production does not serve
 * them at all, but a preview deployment is a real public URL and Google has
 * indexed plenty of them.
 */
export const DRAFT_METADATA = {
  robots: { index: false, follow: false },
} as const
