import type { Metadata } from 'next'

export const metadata: Metadata = {
  // Sign-in flows must never be indexed.
  robots: { index: false, follow: false },
}

/**
 * Shell for the credential screens. Placeholder until the auth screens are
 * designed — the marketing site is the current deliverable.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100dvh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-11) var(--space-7)',
      }}
    >
      <main id="main" style={{ width: '100%', maxWidth: 'var(--container-form)' }}>
        {children}
      </main>
    </div>
  )
}
