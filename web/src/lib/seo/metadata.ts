import type { Metadata } from 'next'
import { env } from '@/lib/env'
import { requireRoute, type RouteDef } from './routes'

export const SITE_NAME = 'Crowd4Test'
/**
 * Appended by the root layout's `title.template`, never by a page. Exported so
 * the layout is the single place that knows the shape.
 */
export const TITLE_SUFFIX = ` | ${SITE_NAME}`

/**
 * Builds a page's Metadata from the route registry.
 *
 * Used as a plain `export const metadata` on the fixed routes rather than
 * `generateMetadata`. There is nothing per-request to resolve, so a static
 * object is both simpler and free at runtime. `generateMetadata` is reserved for
 * the templated families, where the path is only known from `params`.
 */
export function buildMetadata(path: string, overrides: Partial<Metadata> = {}): Metadata {
  const route = requireRoute(path)
  return fromRoute(route, overrides)
}

export function fromRoute(route: RouteDef, overrides: Partial<Metadata> = {}): Metadata {
  const url = new URL(route.path, env.NEXT_PUBLIC_SITE_URL).toString()

  return {
    /**
     * The bare title. The root layout declares
     * `title.template = '%s | Crowd4Test'`, which appends the suffix — doing it
     * here as well produced "Pricing | Crowd4Test | Crowd4Test".
     */
    title: route.title,
    description: route.description,
    alternates: { canonical: url },
    ...(route.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      // og:title drops the suffix — the site name is already a separate field.
      title: route.title,
      description: route.description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      images: [OG_IMAGE.url],
    },
    ...overrides,
  }
}

/**
 * The generated share card, referenced explicitly.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY THIS IS NOT LEFT TO THE FILE CONVENTION
 *
 * `app/opengraph-image.tsx` is supposed to attach `og:image` to every route
 * beneath it. It does — until a page exports its own `openGraph` object, and
 * every page here does, via `fromRoute`. Next resolves `openGraph` by
 * REPLACEMENT, not deep merge: the nearest definition wins whole, so declaring
 * `title`/`description`/`url` silently drops the inherited `images`.
 *
 * Measured, not assumed: with `images` omitted, all 50 routes served zero
 * `og:image` tags — including `/`, in the same segment as the file. Every share
 * would have unfurled as a bare text link.
 *
 * So the file generates the card and this points at it. `metadataBase` in the
 * root layout resolves the relative path to an absolute URL, which OG requires.
 *
 * If a segment later gets its own `opengraph-image.tsx`, pass an `overrides`
 * object with the new `openGraph.images` — adding the file alone will not be
 * enough, for the reason above.
 * ──────────────────────────────────────────────────────────────────────────
 */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Crowd4Test — AI-powered digital quality engineering',
} as const
