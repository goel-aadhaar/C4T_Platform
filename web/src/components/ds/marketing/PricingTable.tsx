import type { CSSProperties } from 'react'
import { Badge } from '../core/Badge'
import { Button } from '../core/Button'
import { Icon } from '../core/Icon'

export interface PricingPlan {
  name: string
  description: string
  /** "Fixed", "Scoped", "Custom" — a word, not a number. See the note below. */
  price: string
  period: string
  cta: string
  href: string
  badge?: string
  /** Ink fill and the only `--shadow-lg` on the page. */
  highlighted?: boolean
  featuresLabel: string
  features: readonly string[]
}

export interface PricingTableProps {
  plans?: readonly PricingPlan[]
  /** Line under the table explaining why there are no figures. */
  note?: string
  style?: CSSProperties
  className?: string
}

/**
 * The plan comparison.
 *
 * NO NUMBERS, BY DESIGN. `price` holds "Fixed" / "Scoped" / "Custom" and the
 * page's own FAQ explains why: a two-market mobile regression cycle and a
 * multilingual red-team engagement cost very different amounts, so any figure
 * would be wrong for almost everyone. Do not put a "from ₹x" in here without
 * the client's sign-off — it changes the commercial position, not just the copy.
 *
 * PORT NOTES.
 *  - `onSelect(planName)` became a required `href` per plan, so the CTAs are
 *    real links and the table stays a Server Component.
 *  - The 40px price and 11px mono label had no tokens. They use
 *    `--type-display-md-size` (36px) and `--type-eyebrow-size` (12px), the
 *    nearest steps — CLAUDE.md rule 1.
 *  - The tick on the highlighted plan was `--coral-400`; it follows the
 *    accent-on-dark alias now.
 *  - `minHeight` on the name row and the description is load-bearing: it keeps
 *    the price, the button and the feature list on a shared baseline across three
 *    cards whose descriptions run to different lengths. Remove it and the
 *    columns stagger.
 */
export function PricingTable({ plans = [], note, style, className }: PricingTableProps) {
  return (
    <div
      className={['c4t-pricing-grid', className].filter(Boolean).join(' ')}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${plans.length || 1}, minmax(0,1fr))`,
        gap: 20,
        alignItems: 'stretch',
        ...style,
      }}
    >
      {plans.map((plan) => {
        const hot = plan.highlighted === true

        return (
          <div
            key={plan.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-card-padding-lg)',
              background: hot ? 'var(--surface-inverse)' : 'var(--surface-canvas)',
              color: hot ? 'var(--text-inverse)' : 'var(--text-primary)',
              border: `1px solid ${hot ? 'var(--surface-inverse)' : 'var(--border-default)'}`,
              borderRadius: 'var(--radius-panel)',
              boxShadow: hot ? 'var(--shadow-lg)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 26 }}>
              <span
                style={{
                  fontSize: 'var(--type-heading-sm-size)',
                  fontWeight: 'var(--fw-semibold)',
                }}
              >
                {plan.name}
              </span>
              {plan.badge ? <Badge tone={hot ? 'inverse' : 'brand'}>{plan.badge}</Badge> : null}
            </div>

            <p
              style={{
                marginTop: 8,
                fontSize: 'var(--type-body-sm-size)',
                lineHeight: 'var(--type-body-sm-line)',
                color: hot ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
                minHeight: 44,
              }}
            >
              {plan.description}
            </p>

            <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  fontSize: 'var(--type-display-md-size)',
                  lineHeight: 'var(--type-display-md-line)',
                  letterSpacing: 'var(--type-display-md-tracking)',
                  fontWeight: 'var(--fw-semibold)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {plan.price}
              </span>
              {plan.period ? (
                <span
                  style={{
                    fontSize: 'var(--type-body-sm-size)',
                    color: hot ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
                  }}
                >
                  {plan.period}
                </span>
              ) : null}
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button variant={hot ? 'inverse' : 'secondary'} fullWidth href={plan.href}>
                {plan.cta}
              </Button>
            </div>

            <div
              style={{
                marginTop: 'var(--space-6)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--type-eyebrow-size)',
                fontWeight: 'var(--fw-semibold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: hot ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
              }}
            >
              {plan.featuresLabel}
            </div>

            <ul
              style={{
                listStyle: 'none',
                margin: '14px 0 0',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  style={{
                    display: 'flex',
                    gap: 10,
                    fontSize: 'var(--type-body-sm-size)',
                    lineHeight: 'var(--type-body-sm-line)',
                    color: hot ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
                  }}
                >
                  <Icon
                    name="check"
                    size={16}
                    style={{
                      color: hot ? 'var(--text-brand-inverse)' : 'var(--accent-base)',
                      marginTop: 3,
                      flex: 'none',
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )
      })}

      {note ? (
        <p
          style={{
            gridColumn: '1 / -1',
            marginTop: 8,
            fontSize: 'var(--type-caption-size)',
            color: 'var(--text-muted)',
            textAlign: 'center',
          }}
        >
          {note}
        </p>
      ) : null}
    </div>
  )
}
