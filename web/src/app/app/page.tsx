import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/session'
import { ROLE_HOME } from '@/lib/api/types'

/**
 * /app is a router, not a page. Each persona has a different home, so send
 * people to theirs rather than rendering a lowest-common-denominator dashboard.
 */
export default async function AppIndexPage() {
  const user = await requireUser('/app')
  const home = ROLE_HOME[user.role]

  // CUSTOMER's home is /app itself; rendering their dashboard here avoids a loop.
  if (home !== '/app') redirect(home)

  return (
    <div
      className="c4t-container"
      style={{ paddingBlock: 'var(--space-11)', maxWidth: 'var(--container-prose)' }}
    >
      <p
        className="c4t-eyebrow"
        style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}
      >
        Scaffold · design pending
      </p>
      <h1 className="c4t-display-md" style={{ marginBottom: 'var(--space-3)' }}>
        Customer dashboard
      </h1>
      <p className="c4t-body-md" style={{ color: 'var(--text-secondary)' }}>
        Projects, bugs and release health, from <code>GET /v1/stats/customer</code>.
      </p>
    </div>
  )
}
