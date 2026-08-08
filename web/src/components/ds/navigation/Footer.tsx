import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Logo } from '../core/Logo'
import { Button } from '../core/Button'
import { Input } from '../forms/Input'
import type { FooterColumn } from '@/content/nav'

export interface FooterProps {
  columns: FooterColumn[]
  /** Show the email capture in the brand column. Default true. */
  newsletter?: boolean
  style?: CSSProperties
  className?: string
}

/**
 * The site footer.
 *
 * PORT NOTES — three deliberate omissions, each flagged for the client:
 *
 *  1. NO SOCIAL ICON ROW. The prototype renders linkedin/github/youtube/rss
 *     marks through the icon component. Lucide has dropped brand icons —
 *     `Rss` still exists but `Linkedin`, `Github` and `Youtube` do not — and
 *     CLAUDE.md forbids hand-rolling an SVG. Brand marks are trademarked
 *     artwork that should come from each platform's own asset kit, the same
 *     open item as the missing Crowd4Test logo. Restore once assets exist.
 *
 *  2. NO "SOC 2 Type II · ISO 27001" STRIP. content.md marks both as ⚠ VERIFY.
 *     Publishing a certification the company does not hold is a
 *     misrepresentation, not a placeholder. Add it back only against evidence.
 *
 *  3. THE NEWSLETTER FORM HAS NO DESTINATION YET. It renders and validates the
 *     email type, but submitting does nothing — subscriptions need somewhere to
 *     go (the same open decision as the contact form). Wire it to a server
 *     action once that is settled.
 *
 * `onNavigate` is gone: every link carries a real href and renders next/link.
 */
export function Footer({ columns, newsletter = true, style, className }: FooterProps) {
  return (
    <footer
      className={className}
      style={{ background: 'var(--surface-inverse)', color: 'var(--text-inverse)', ...style }}
    >
      <div
        style={{
          maxWidth: 'var(--container-wide)',
          margin: '0 auto',
          padding: 'var(--space-11) var(--container-gutter) var(--space-8)',
        }}
      >
        <div
          className="c4t-footer-top"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 1fr) 3fr',
            gap: 'var(--space-10)',
          }}
        >
          <div>
            <Logo size={22} tone="inverse" href="/" />
            <p
              style={{
                marginTop: 'var(--space-5)',
                maxWidth: 300,
                fontSize: 'var(--type-body-sm-size)',
                color: 'var(--text-inverse-muted)',
              }}
            >
              Digital quality engineering that pairs AI agents with a vetted global testing
              community.
            </p>

            {newsletter ? (
              <form
                style={{
                  marginTop: 'var(--space-7)',
                  display: 'flex',
                  gap: 'var(--space-3)',
                  maxWidth: 340,
                }}
              >
                <label className="c4t-visually-hidden" htmlFor="footer-newsletter-email">
                  Work email
                </label>
                <Input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Work email"
                  style={{
                    background: 'var(--surface-inverse-raised)',
                    border: '1px solid var(--border-inverse)',
                    color: 'var(--text-inverse)',
                    minHeight: 44,
                  }}
                />
                <Button type="submit" variant="inverse" size="md">
                  Subscribe
                </Button>
              </form>
            ) : null}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {columns.map((col) => (
              <div key={col.title}>
                <div
                  className="c4t-eyebrow"
                  style={{ color: 'var(--text-inverse-muted)', marginBottom: 14 }}
                >
                  {col.title}
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="c4t-inverse-link"
                        style={{
                          fontSize: 'var(--type-body-sm-size)',
                          color: 'var(--text-inverse-muted)',
                          textDecoration: 'none',
                        }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 'var(--space-10)',
            paddingTop: 'var(--space-7)',
            borderTop: '1px solid var(--border-inverse)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-5)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              fontSize: 'var(--type-caption-size)',
              color: 'var(--text-inverse-muted)',
            }}
          >
            {/* TODO: confirm the registered entity name. The prototype says
                "Crowd4Test Ltd."; the service agreement names an India-based
                company, where "Ltd." is unlikely to be the correct suffix. */}
            <span>© 2026 Crowd4Test</span>
            <Link href="/legal/privacy" className="c4t-inverse-link" style={{ color: 'inherit' }}>
              Privacy
            </Link>
            <Link href="/legal/terms" className="c4t-inverse-link" style={{ color: 'inherit' }}>
              Terms
            </Link>
            <Link
              href="/legal/accessibility-statement"
              className="c4t-inverse-link"
              style={{ color: 'inherit' }}
            >
              Accessibility statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
