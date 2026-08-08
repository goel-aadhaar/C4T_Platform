import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign in' }

/**
 * Scaffold only. When built:
 *   - POST /api/v1/auth/login via the browser client so cookies are set
 *   - honour `?next=`, but validate it is a same-origin relative path first —
 *     an open redirect here is a phishing vector
 *   - route by role using ROLE_HOME from @/lib/api/types
 */
export default function LoginPage() {
  return (
    <div>
      <p
        className="c4t-eyebrow"
        style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}
      >
        Scaffold · design pending
      </p>
      <h1 className="c4t-heading-lg" style={{ marginBottom: 'var(--space-3)' }}>
        Welcome back
      </h1>
      <p className="c4t-body-sm" style={{ color: 'var(--text-secondary)' }}>
        Sign-in form pending design.
      </p>
    </div>
  )
}
