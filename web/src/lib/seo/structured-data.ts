import { env } from '@/lib/env'
import { SITE_NAME } from './metadata'
import { getRoute, type RouteDef } from './routes'

/**
 * JSON-LD builders.
 *
 * `FAQPage` and `BreadcrumbList` are the two that reliably earn rich results
 * for a site shaped like this one. `Review` / `AggregateRating` is deliberately
 * absent — marking up reviews you cannot substantiate gets sites penalised, and
 * content.md already flags every testimonial as unverified.
 */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: env.NEXT_PUBLIC_SITE_URL,
    logo: new URL('/logo.png', env.NEXT_PUBLIC_SITE_URL).toString(),
    description:
      'AI-powered digital quality engineering combining AI agents with a vetted global community of expert testers.',
    foundingDate: '2015',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '556, 14th Main, Sector 3, HSR Layout',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560102',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'admin@crowd4test.com',
        telephone: '+91-96323-53367',
        availableLanguage: ['English'],
      },
    ],
    // ⚠ UNVERIFIED. `sameAs` is how Google reconciles this entity with its
    // social profiles; pointing at an account that is not the company's — or at
    // a dead URL — is worse than omitting the field. Confirm both before launch.
    sameAs: ['https://www.linkedin.com/company/crowd4test', 'https://www.facebook.com/Crowd4Test'],
  }
}

/**
 * ⚠ DELIBERATELY ABSENT: `aggregateRating`, `Review`, and any `award` or
 * `hasCredential` entry for the ISO / SOC 2 claims.
 *
 * Structured data is a machine-readable assertion. Google's guidelines treat
 * markup for content that is not visible, or not substantiable, as spam — and
 * the certification and testimonial claims on this site are exactly the ones
 * flagged unverified in `content/home.ts`. Marking them up would turn a copy
 * problem into a manual-action risk on the whole domain. Add them only once the
 * evidence exists AND the claim is visible on the page.
 */

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: env.NEXT_PUBLIC_SITE_URL,
  }
}

export function serviceJsonLd(route: RouteDef) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: route.title,
    description: route.description,
    url: new URL(route.path, env.NEXT_PUBLIC_SITE_URL).toString(),
    provider: { '@type': 'Organization', name: SITE_NAME, url: env.NEXT_PUBLIC_SITE_URL },
    areaServed: 'Worldwide',
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, env.NEXT_PUBLIC_SITE_URL).toString(),
    })),
  }
}

/**
 * Derives a breadcrumb trail from a path using the route registry.
 *
 * `/services/crowd-testing` → Home › Services › Crowd Testing Services. Only
 * segments that are REGISTERED routes become crumbs, so a path with an
 * unbuilt intermediate segment yields a shorter trail rather than a crumb
 * pointing at a 404 — which is what Google penalises breadcrumb markup for.
 *
 * `leafName` overrides the last crumb. Registry titles are SEO titles ("Crowd
 * Testing Services — Real Users, Real Devices"), which are too long for a
 * breadcrumb; pass the item's own name instead.
 */
export function breadcrumbFor(path: string, leafName?: string) {
  const segments = path.split('/').filter(Boolean)
  const trail: { name: string; path: string }[] = [{ name: 'Home', path: '/' }]

  let accumulated = ''
  for (const segment of segments) {
    accumulated += `/${segment}`
    const route = getRoute(accumulated)
    if (route) trail.push({ name: route.title, path: accumulated })
  }

  const last = trail.at(-1)
  if (leafName && last?.path === path) last.name = leafName

  return breadcrumbJsonLd(trail)
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
