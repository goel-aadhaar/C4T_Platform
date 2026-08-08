import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DetailPage } from '@/components/sections/DetailPage'
import { familySlugs, getDetail } from '@/content'
import { fromRoute } from '@/lib/seo/metadata'
import { getRoute } from '@/lib/seo/routes'

const PREFIX = '/services'
const FAMILY = 'services' as const

/**
 * Services detail pages.
 *
 * One file for 15 routes — CLAUDE.md rule 5. The body is
 * `components/sections/DetailPage`, shared with the other two families; the copy
 * comes from `content/details.ts`. There is deliberately nothing here to
 * customise per service: if a single service needs a bespoke section, it goes in
 * the template behind a content flag, not in a hand-written page file.
 *
 * `dynamicParams = false` so an unregistered slug 404s instead of rendering an
 * empty shell that Google would index as a soft 404.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return familySlugs(FAMILY).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const route = getRoute(`${PREFIX}/${slug}`)
  return route ? fromRoute(route) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getDetail(FAMILY, slug)) notFound()
  return <DetailPage family={FAMILY} slug={slug} />
}
