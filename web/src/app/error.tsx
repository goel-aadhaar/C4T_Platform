'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ds'
import { ERROR_PAGE } from '@/content'

/**
 * Route-level error boundary. Must be a Client Component — React needs the
 * boundary on the client to recover via `reset()`.
 *
 * Copy comes from content.md §3.7 via `ERROR_PAGE`. It used to be inline here,
 * which meant the site had one page whose words lived outside `content/` and
 * could drift from the source without anyone noticing.
 *
 * The shell is deliberately NOT used. If the error came from rendering the nav
 * or the footer, wrapping the error page in them renders the same fault again
 * and the boundary loops. A bare page always renders.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: forward to an error tracker rather than the console. `digest` is
    // the server-side correlation id for this render.
    console.error('Unhandled route error', { digest: error.digest, message: error.message })
  }, [error])

  return (
    <main
      id="main"
      className="c4t-container"
      style={{ paddingBlock: 'var(--space-13)', maxWidth: 'var(--container-prose)' }}
    >
      <h1 className="c4t-display-md" style={{ marginBottom: 'var(--space-5)' }}>
        {ERROR_PAGE.title}
      </h1>

      <p
        className="c4t-body-lg"
        style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-9)' }}
      >
        {ERROR_PAGE.description} <a href={`mailto:${ERROR_PAGE.email}`}>{ERROR_PAGE.email}</a>{' '}
        {ERROR_PAGE.emailSuffix}
      </p>

      {error.digest ? (
        <p
          style={{
            marginBottom: 'var(--space-9)',
            color: 'var(--text-muted)',
            font: 'var(--fw-medium) var(--type-mono-sm-size)/1.5 var(--font-mono)',
          }}
        >
          {ERROR_PAGE.referenceLabel} {error.digest}
        </p>
      ) : null}

      {/* Was a hand-rolled <button> carrying a stale note about being replaced
          by the ported Button "in build step 2". It is step 2's Button now. */}
      <Button variant="primary" size="lg" onClick={reset}>
        {ERROR_PAGE.cta}
      </Button>
    </main>
  )
}
