import { MarketingShell } from '@/components/sections/MarketingShell'

/**
 * The marketing shell for every public page.
 *
 * The shell itself is `components/sections/MarketingShell` so that
 * `app/not-found.tsx` — which sits outside this route group and cannot inherit a
 * group layout — renders with the same navigation. See the note there.
 *
 * The active-section underline is still unwired: it needs the current pathname,
 * which belongs in TopNav via `usePathname` rather than here, since this is a
 * Server Component.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <MarketingShell>{children}</MarketingShell>
}
