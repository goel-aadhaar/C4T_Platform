import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Scaffold } from '@/components/scaffold'
import { fromRoute } from '@/lib/seo/metadata'
import { getRoute, slugsUnder } from '@/lib/seo/routes'

const PREFIX = '/legal'

/**
 * Fully prerendered at build time from the route registry. `dynamicParams`
 * is false so an unregistered slug 404s rather than rendering an empty shell —
 * a stray URL should not become a soft-404 that Google indexes.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return slugsUnder(PREFIX).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const route = getRoute(`${PREFIX}/${slug}`)
  if (!route) return {}
  return fromRoute(route)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const path = `${PREFIX}/${slug}`
  if (!getRoute(path)) notFound()
  return <Scaffold path={path} />
}
