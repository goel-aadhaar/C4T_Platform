import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import { Icon } from '../core/Icon'

export interface FeatureCardProps {
  /** Lucide icon name, shown in an accent tile. */
  icon?: string
  title: ReactNode
  description?: ReactNode
  /** Mono footnote under a hairline — metrics, coverage counts. */
  meta?: ReactNode
  href?: string
  tone?: 'canvas' | 'inverse'
  style?: CSSProperties
  className?: string
}

/**
 * A bordered card with an optional accent icon tile.
 *
 * `.c4t-card-hover` supplies the 2px lift, `--shadow-md` and border darken from
 * tokens/interactions.css. When `href` is set the whole card is the click
 * target, which is what the design intends.
 *
 * PORT NOTE: `onClick` is dropped in favour of `href` — a card that navigates
 * should be a link, so it keeps middle-click, right-click and keyboard focus,
 * and the card stays a Server Component.
 */
export function FeatureCard({
  icon,
  title,
  description,
  meta,
  href,
  tone = 'canvas',
  style,
  className,
}: FeatureCardProps) {
  const inverse = tone === 'inverse'

  const base: CSSProperties = {
    display: 'block',
    padding: 'var(--space-card-padding)',
    background: inverse ? 'var(--surface-inverse-raised)' : 'var(--surface-canvas)',
    border: `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-default)'}`,
    borderRadius: 'var(--radius-card)',
    textDecoration: 'none',
    color: 'inherit',
    cursor: href ? 'pointer' : 'default',
    ...style,
  }

  const body = (
    <>
      {icon ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-sm)',
            // PORT NOTE: was rgb(255 255 255 / 0.07). Rule 2 bars pure white and
            // rule 1 bars a raw channel triple, so it is mixed off --ink-50.
            background: inverse
              ? 'color-mix(in srgb, var(--ink-50) 7%, transparent)'
              : 'var(--surface-brand-subtle)',
            // Teal-500 on ink-950 is under 3:1; the inverse glyph steps up to
            // the on-dark accent, same as the inverse eyebrow in Hero.
            color: inverse ? 'var(--text-brand-inverse)' : 'var(--accent-base)',
            marginBottom: 18,
          }}
        >
          <Icon name={icon} size={22} />
        </span>
      ) : null}

      <h3
        style={{
          fontSize: 'var(--type-heading-sm-size)',
          lineHeight: 'var(--type-heading-sm-line)',
          letterSpacing: 'var(--type-heading-sm-tracking)',
          color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
        }}
      >
        {title}
      </h3>

      {description ? (
        <p
          style={{
            marginTop: 8,
            fontSize: 'var(--type-body-sm-size)',
            lineHeight: 'var(--type-body-sm-line)',
            color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
          }}
        >
          {description}
        </p>
      ) : null}

      {meta ? (
        <div
          style={{
            marginTop: 'var(--space-5)',
            paddingTop: 14,
            borderTop: `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-subtle)'}`,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
          }}
        >
          {meta}
        </div>
      ) : null}
    </>
  )

  const classes = ['c4t-card-hover', className].filter(Boolean).join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} style={base}>
        {body}
      </Link>
    )
  }

  return (
    <div className={classes} style={base}>
      {body}
    </div>
  )
}
