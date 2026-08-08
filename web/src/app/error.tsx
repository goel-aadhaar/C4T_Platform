'use client'

import { useEffect } from 'react'

/**
 * Route-level error boundary. Must be a Client Component — React needs the
 * boundary on the client to recover via `reset()`.
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
        Something broke on our side.
      </h1>
      <p
        className="c4t-body-lg"
        style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-9)' }}
      >
        Not your fault. Our team has been notified and is on it. Try again in a moment, or email{' '}
        <a href="mailto:admin@crowd4test.com">admin@crowd4test.com</a> if it&rsquo;s urgent.
      </p>

      {error.digest ? (
        <p
          style={{
            marginBottom: 'var(--space-9)',
            color: 'var(--text-muted)',
            font: 'var(--fw-medium) var(--type-mono-sm-size)/1.5 var(--font-mono)',
          }}
        >
          Reference: {error.digest}
        </p>
      ) : null}

      <button
        type="button"
        onClick={reset}
        className="c4t-btn c4t-btn--primary"
        style={{
          // 48px — the spec's primary-CTA touch target. Replaced by the ported
          // <Button size="md"> in build step 2.
          minHeight: 'var(--space-10)',
          padding: '0 var(--space-6)',
          border: 'none',
          borderRadius: 'var(--radius-button)',
          background: 'var(--action-primary-bg)',
          color: 'var(--text-on-brand)',
          font: 'var(--fw-medium) var(--type-button-md-size)/1 var(--font-sans)',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </main>
  )
}
