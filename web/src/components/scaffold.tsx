import Link from 'next/link'
import { requireRoute } from '@/lib/seo/routes'

/**
 * TEMPORARY — replaced route by route as the real sections land.
 *
 * A placeholder body so every registered URL resolves, redirects can be tested
 * and the sitemap is real. Styled entirely from tokens, so it inherits the site
 * floor and type scale rather than looking like a different site.
 */
export function Scaffold({ path }: { path: string }) {
  const route = requireRoute(path)

  return (
    // The marketing layout owns <main id="main">; this must not nest another.
    <div
      className="c4t-container"
      style={{ paddingBlock: 'var(--space-13)', maxWidth: 'var(--container-prose)' }}
    >
      <p
        className="c4t-eyebrow"
        style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}
      >
        Scaffold · design pending
      </p>

      <h1 className="c4t-display-md" style={{ marginBottom: 'var(--space-5)' }}>
        {route.title}
      </h1>

      <p
        className="c4t-body-lg"
        style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-10)' }}
      >
        {route.description}
      </p>

      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 'var(--space-7)',
          rowGap: 'var(--space-3)',
          borderTop: '1px solid var(--border-default)',
          paddingTop: 'var(--space-7)',
          marginBottom: 'var(--space-10)',
          font: 'var(--fw-medium) var(--type-mono-sm-size)/1.5 var(--font-mono)',
        }}
      >
        <dt style={{ color: 'var(--text-muted)' }}>Route</dt>
        <dd style={{ margin: 0 }}>{route.path}</dd>
        <dt style={{ color: 'var(--text-muted)' }}>Group</dt>
        <dd style={{ margin: 0 }}>{route.group}</dd>
      </dl>

      <p className="c4t-body-sm" style={{ color: 'var(--text-muted)' }}>
        Copy for this page is written and waiting in the handoff content.md.
      </p>

      <Link
        href="/"
        className="c4t-body-sm"
        style={{ display: 'inline-block', marginTop: 'var(--space-9)' }}
      >
        &larr; Back to homepage
      </Link>
    </div>
  )
}
