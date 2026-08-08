import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ds'
import { MarketingShell } from '@/components/sections/MarketingShell'
import { NOT_FOUND_PAGE } from '@/content'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

/**
 * 404. Copy from content.md §3.6, verbatim.
 *
 * It renders inside `MarketingShell` rather than bare. This file lives at the app
 * root because that is where Next looks for an unmatched URL, which means the
 * `(marketing)` layout does not apply — so the shell is pulled in explicitly. A
 * 404 with no navigation strands the one visitor guaranteed to need it.
 *
 * `<main>` comes from the shell; there must not be a second one here.
 */
export default function NotFound() {
  return (
    <MarketingShell>
      <div
        className="c4t-container"
        style={{ paddingBlock: 'var(--space-13)', maxWidth: 'var(--container-prose)' }}
      >
        <h1 className="c4t-display-md" style={{ marginBottom: 'var(--space-5)' }}>
          {NOT_FOUND_PAGE.title}
        </h1>

        <p
          className="c4t-body-lg"
          style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-9)' }}
        >
          {NOT_FOUND_PAGE.description}
        </p>

        <nav aria-label="Suggested pages" style={{ marginBottom: 'var(--space-10)' }}>
          <p
            className="c4t-body-md"
            style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}
          >
            {NOT_FOUND_PAGE.suggestionsLabel}
          </p>
          <ul
            className="c4t-body-md"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-3) var(--space-6)',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {NOT_FOUND_PAGE.suggestions.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button variant="primary" size="lg" iconRight="arrow-right" href="/">
          {NOT_FOUND_PAGE.cta}
        </Button>
      </div>
    </MarketingShell>
  )
}
