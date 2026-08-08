import type { Metadata } from 'next'
import { requireUser } from '@/lib/auth/session'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/**
 * Authenticated shell for both personas.
 *
 * `requireUser()` here is THE authorization boundary for everything under
 * /app — it asks the API whether the session is live, which is the only thing
 * that can answer for stateful auth. `proxy.ts` merely spares signed-out
 * visitors the round trip; it proves nothing.
 *
 * A layout does not re-run on client-side navigation within its segment, so
 * every Server Action and Route Handler under /app must call `requireUser()`
 * itself rather than assuming this layout vouched for the caller.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser('/app')

  return (
    <div style={{ minHeight: '100dvh' }}>
      {/* TODO(design): <AppSidebar role={user.role} /> — nav differs per persona */}
      {/* TODO(design): <AppTopBar user={user} /> — notifications, account menu */}
      <main id="main">{children}</main>
      <span className="c4t-visually-hidden">Signed in as {user.email}</span>
    </div>
  )
}
