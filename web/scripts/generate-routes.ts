import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTES, slugsUnder } from '../src/lib/seo/routes'

/**
 * Generates a page.tsx for every route in the registry that does not have one.
 *
 *   npm run routes:generate            create anything missing
 *   npm run routes:generate -- --force overwrite (destroys hand-edits)
 *
 * Existing files are skipped by default, so this stays safe to re-run once real
 * pages start replacing the scaffolds.
 *
 * Families whose pages share a template get a single `[slug]/page.tsx` with
 * `generateStaticParams`, rather than one file per child. Everything else gets
 * its own file because those pages are genuinely different from one another.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP = join(ROOT, 'src', 'app', '(marketing)')

/** Prefixes rendered through a shared `[slug]` template. */
const TEMPLATED = ['/ai-testing', '/services', '/platform', '/industries', '/solutions', '/legal']

const force = process.argv.includes('--force')
let created = 0
let skipped = 0

async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function emit(relativePath: string, contents: string): Promise<void> {
  const full = join(APP, relativePath)
  if (!force && (await exists(full))) {
    skipped++
    return
  }
  await mkdir(dirname(full), { recursive: true })
  await writeFile(full, contents, 'utf8')
  created++
  console.log(`  + ${relativePath}`)
}

/** A single page whose path is known at build time. */
function staticPage(path: string): string {
  return `import type { Metadata } from 'next'
import { Scaffold } from '@/components/scaffold'
import { buildMetadata } from '@/lib/seo/metadata'

const PATH = '${path}'

export const metadata: Metadata = buildMetadata(PATH)

export default function Page() {
  return <Scaffold path={PATH} />
}
`
}

/** A `[slug]` template covering every child of a prefix. */
function templatePage(prefix: string): string {
  return `import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Scaffold } from '@/components/scaffold'
import { fromRoute } from '@/lib/seo/metadata'
import { getRoute, slugsUnder } from '@/lib/seo/routes'

const PREFIX = '${prefix}'

/**
 * Fully prerendered at build time from the route registry. \`dynamicParams\`
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
  const route = getRoute(\`\${PREFIX}/\${slug}\`)
  if (!route) return {}
  return fromRoute(route)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const path = \`\${PREFIX}/\${slug}\`
  if (!getRoute(path)) notFound()
  return <Scaffold path={path} />
}
`
}

async function main() {
  console.log('Generating route scaffolds…\n')

  const templated = new Set<string>()

  for (const prefix of TEMPLATED) {
    const slugs = slugsUnder(prefix)
    if (slugs.length === 0) continue

    await emit(join(prefix.slice(1), '[slug]', 'page.tsx'), templatePage(prefix))
    for (const slug of slugs) templated.add(`${prefix}/${slug}`)
  }

  for (const route of ROUTES) {
    if (templated.has(route.path)) continue
    // The homepage lives outside the (marketing) group, at src/app/page.tsx.
    if (route.path === '/') continue
    await emit(join(route.path.slice(1), 'page.tsx'), staticPage(route.path))
  }

  console.log(
    `\n${created} file(s) created, ${skipped} skipped (already present).` +
      (skipped && !force ? '\nRe-run with --force to overwrite.' : ''),
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
