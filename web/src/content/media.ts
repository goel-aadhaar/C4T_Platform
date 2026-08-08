/**
 * Every photograph on the site, in one list.
 *
 * The prototype scattered the same six Unsplash URLs across `Home.jsx`,
 * `detail.jsx` and `pages.jsx`, each copy carrying its own alt text. Collecting
 * them here means a rotted URL is one edit, and it pairs with `<SiteImage>`
 * being the only component allowed to render an image (CLAUDE.md rule 6).
 *
 * ⚠ PLACEHOLDERS. Service Agreement §5 makes sourcing real media the Client's
 * responsibility. Until that happens every photo carries the
 * "Placeholder · Unsplash licence" caption, and `next.config.ts` whitelists
 * `images.unsplash.com`. Before launch: swap the URLs for `cdn.crowd4test.com`
 * assets, drop the captions, remove the Unsplash host, and delete this warning.
 *
 * ALT TEXT. Each photo has one default `alt` describing what it SHOWS. Where the
 * prototype used a different phrasing for the same image in a different context,
 * the caller passes its own — alt text describes the picture in its setting, so
 * it is a property of the use, not only of the file.
 */

export interface Photo {
  /** Remote URL. Host must be whitelisted in next.config.ts remotePatterns. */
  src: string
  /** Default alt text: what the photograph shows. */
  alt: string
}

const UNSPLASH = 'https://images.unsplash.com'

/** Caption rendered over every placeholder. Delete with the placeholders. */
export const PLACEHOLDER_CREDIT = 'Placeholder · Unsplash licence'

export const PHOTOS = {
  deviceTesting: {
    src: `${UNSPLASH}/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3`,
    alt: 'An engineer running tests on a real device',
  },
  triage: {
    src: `${UNSPLASH}/photo-1551434678-e076c223a692?ixlib=rb-4.0.3`,
    alt: 'Engineers triaging test results on screen',
  },
  scoping: {
    src: `${UNSPLASH}/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3`,
    alt: 'A QA lead mapping a release process with the team',
  },
  hardware: {
    src: `${UNSPLASH}/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3`,
    alt: 'A tester validating a build on real hardware',
  },
  dashboard: {
    src: `${UNSPLASH}/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3`,
    alt: 'Release readiness metrics on a dashboard',
  },
  team: {
    src: `${UNSPLASH}/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3`,
    alt: 'A quality engineering team reviewing findings together',
  },
} as const satisfies Record<string, Photo>

export type PhotoKey = keyof typeof PHOTOS

/**
 * The rotation `detail.jsx` walked with `DPHOTOS[index % DPHOTOS.length]`, so
 * that adjacent detail pages in a family don't open with the same picture.
 * Order is load-bearing — changing it reshuffles every detail page.
 */
const PHOTO_ROTATION: readonly PhotoKey[] = [
  'deviceTesting',
  'triage',
  'scoping',
  'hardware',
  'dashboard',
  'team',
]

/** The nth photo in the rotation, wrapping. */
export function rotatedPhoto(index: number): Photo {
  const key = PHOTO_ROTATION[index % PHOTO_ROTATION.length]
  // The modulo above cannot miss, but the index signature does not know that.
  return PHOTOS[key ?? 'deviceTesting']
}
