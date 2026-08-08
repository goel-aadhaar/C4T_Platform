import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'
import { indexableRoutes } from '@/lib/seo/routes'
import { publishedCaseStudies, publishedPosts } from '@/content'

/**
 * Generated from the route registry, so a new page appears here automatically
 * and a `noindex` one cannot leak in.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE TRAILING SLASH MATTERS. `new URL('/', origin)` yields `https://host/`,
 * but Next normalises `alternates.canonical` to `https://host` because
 * `trailingSlash` is false. That left the homepage advertising one URL in its
 * canonical and a different one in the sitemap.
 *
 * Google treats the two root forms as equivalent, so nothing was broken — but a
 * sitemap that disagrees with the canonical it points at is the first thing an
 * SEO audit flags, and the fix is one line. `canonicalUrl` below matches Next's
 * normalisation exactly, so the two can never drift.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * COLLECTIONS. Blog posts and case studies are not in the route registry — that
 * holds the fixed IA — so they are appended from the content modules. Only
 * PUBLISHED entries: a draft is `noindex` and does not exist in production, so
 * listing one would advertise a URL that 404s. Both collections are entirely
 * draft today, which is why this currently returns the registry alone.
 */
function canonicalUrl(path: string): string {
  const url = new URL(path, env.NEXT_PUBLIC_SITE_URL).toString()
  // Strip the trailing slash except on the origin-only case, where there is
  // nothing left to strip.
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp for the fixed pages. A per-page date would be fiction — nothing
  // tracks when a section's copy last changed. Blog posts DO have a real date and
  // use it below, which is the only place `lastmod` means anything.
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = indexableRoutes().map((route) => ({
    url: canonicalUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency ?? 'monthly',
    priority: route.priority ?? 0.6,
  }))

  const posts: MetadataRoute.Sitemap = publishedPosts().map((post) => ({
    url: canonicalUrl(`/company/blog/${post.slug}`),
    // `assertPublishedPostsHaveBodies` guarantees a date on anything published.
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  const studies: MetadataRoute.Sitemap = publishedCaseStudies().map((study) => ({
    url: canonicalUrl(`/company/case-studies/${study.slug}`),
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...pages, ...posts, ...studies]
}
