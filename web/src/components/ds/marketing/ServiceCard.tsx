import type { CSSProperties } from 'react'
import { Badge } from '../core/Badge'
import { Icon } from '../core/Icon'
import type { IconName } from '../core/icon-registry'

export interface ServiceCardProps {
  icon?: IconName
  /** Mono category above the title. */
  eyebrow?: string
  title: string
  description?: string
  /** Ticked capability list. */
  points?: readonly string[]
  /** Label on the trailing link row. */
  cta?: string
  badge?: string
  href: string
  style?: CSSProperties
  className?: string
}

/**
 * The richer of the two service cards: icon, eyebrow, ticked points and a link
 * row pinned to the bottom. Used for the AI Testing grid, where each card has to
 * carry four capability bullets. `FeatureCard` is the plainer sibling.
 *
 * PORT NOTES.
 *  - `onClick`/`href="#"` became a required `href`. Every one of these cards
 *    points at a real detail page, and a card that looks like a link but is not
 *    one is a bug in a marketing site.
 *  - The icon was `--coral-500` and the tick `--teal-500`, both raw ramp
 *    references. Both now use `--accent-base`.
 *  - `marginTop: 'auto'` on the CTA row is what aligns the link across a grid
 *    row of cards with different amounts of copy. Keep it.
 */
export function ServiceCard({
  icon,
  eyebrow,
  title,
  description,
  points = [],
  cta = 'Explore',
  badge,
  href,
  style,
  className,
}: ServiceCardProps) {
  return (
    <a
      href={href}
      className={['c4t-card-hover', className].filter(Boolean).join(' ')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-card-padding-lg)',
        background: 'var(--surface-canvas)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-card)',
        textDecoration: 'none',
        color: 'inherit',
        height: '100%',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {icon ? <Icon name={icon} size={24} style={{ color: 'var(--accent-base)' }} /> : null}
        {eyebrow ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-eyebrow-size)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--type-eyebrow-tracking)',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        {badge ? (
          <span style={{ marginLeft: 'auto' }}>
            <Badge tone="brand">{badge}</Badge>
          </span>
        ) : null}
      </div>

      <h3
        style={{
          fontSize: 'var(--type-heading-md-size)',
          lineHeight: 'var(--type-heading-md-line)',
          letterSpacing: 'var(--type-heading-md-tracking)',
        }}
      >
        {title}
      </h3>

      {description ? (
        <p
          style={{
            marginTop: 10,
            fontSize: 'var(--type-body-sm-size)',
            lineHeight: 'var(--type-body-sm-line)',
            color: 'var(--text-secondary)',
          }}
        >
          {description}
        </p>
      ) : null}

      {points.length ? (
        <ul
          style={{
            listStyle: 'none',
            margin: '18px 0 0',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {points.map((p) => (
            <li
              key={p}
              style={{
                display: 'flex',
                gap: 8,
                fontSize: 'var(--type-body-sm-size)',
                color: 'var(--text-secondary)',
              }}
            >
              <Icon
                name="check"
                size={16}
                style={{ color: 'var(--accent-base)', marginTop: 3, flex: 'none' }}
              />
              {p}
            </li>
          ))}
        </ul>
      ) : null}

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 'auto',
          paddingTop: 'var(--space-6)',
          fontSize: 'var(--type-body-sm-size)',
          fontWeight: 'var(--fw-medium)',
          color: 'var(--text-brand)',
        }}
      >
        {cta} <Icon name="arrow-right" size={15} />
      </span>
    </a>
  )
}
