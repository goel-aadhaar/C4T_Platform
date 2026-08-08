import { access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { indexableRoutes } from '../src/lib/seo/routes'

/**
 * Post-build assertion: every route in the registry actually produced HTML.
 *
 * The failure this guards against is quiet and expensive — a route added to
 * `routes.ts` with no `page.tsx` behind it still appears in sitemap.xml, so you
 * submit a URL to Google that serves a 404. Nothing in `next build` complains.
 *
 *   npx tsx scripts/verify-build.ts
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SERVER_APP = join(ROOT, '.next', 'server', 'app')

async function exists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

/**
 * A prerendered route lands as `<path>.html`; a dynamically rendered one only
 * has `<path>.js`. Either proves the page exists — this checks for a page, not
 * for a particular rendering strategy.
 */
async function wasBuilt(routePath: string): Promise<boolean> {
  const relative = routePath === '/' ? 'index' : routePath.replace(/^\//, '')
  for (const candidate of [`${relative}.html`, `${relative}.js`, join(relative, 'page.js')]) {
    if (await exists(join(SERVER_APP, candidate))) return true
  }
  return false
}

async function main() {
  if (!(await exists(SERVER_APP))) {
    console.error('No build output found. Run `npm run build` first.')
    process.exit(1)
  }

  const routes = indexableRoutes()
  const missing: string[] = []

  for (const route of routes) {
    if (!(await wasBuilt(route.path))) missing.push(route.path)
  }

  if (missing.length > 0) {
    console.error(`\n${missing.length} route(s) in the registry produced no page:\n`)
    for (const path of missing) console.error(`  ${path}`)
    console.error('\nEither add the page or remove the entry from src/lib/seo/routes.ts.')
    console.error('`npm run routes:generate` will scaffold anything missing.\n')
    process.exit(1)
  }

  console.log(`All ${routes.length} registry routes were built.`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
