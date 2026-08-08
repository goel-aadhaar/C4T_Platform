import type { CSSProperties, ReactNode } from 'react'
import { Button } from '../core/Button'

export interface CtaBannerProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  /** Reassurance line under the buttons. */
  note?: string
  tone?: 'inverse' | 'brand' | 'sunken'
  style?: CSSProperties
  className?: string
}

/**
 * The full-width conversion band that closes most pages.
 *
 * PORT NOTES.
 *  - `onAction(label)` is replaced by `primaryHref` / `secondaryHref`, matching
 *    Hero. The CTAs are real links.
 *  - The `brand` tone filled with the raw `--coral-500`; it now uses
 *    `--surface-brand`, which resolves to the accent.
 *  - Two `rgb(255 255 255 / …)` values are mixed off `--ink-50` instead: rule 2
 *    bars pure white, rule 1 bars a raw channel triple. The opacities are the
 *    source's own.
 *
 * CTA labels must stay verb-first and concrete — "Book a demo", "Scope a
 * pilot". Never "Learn more" or "Get started".
 */
export function CtaBanner({
  eyebrow,
  title,
  description,
  primaryCta = 'Book a demo',
  primaryHref = '/contact',
  secondaryCta,
  secondaryHref,
  note,
  tone = 'inverse',
  style,
  className,
}: CtaBannerProps) {
  const inverse = tone === 'inverse'
  const brand = tone === 'brand'

  const bg = inverse
    ? 'var(--surface-inverse)'
    : brand
      ? 'var(--surface-brand)'
      : 'var(--surface-sunken)'
  const fg = inverse || brand ? 'var(--text-inverse)' : 'var(--text-primary)'
  const sub = inverse
    ? 'var(--text-inverse-muted)'
    : brand
      ? 'color-mix(in srgb, var(--ink-50) 85%, transparent)'
      : 'var(--text-secondary)'

  return (
    <section className={className} style={{ background: bg, color: fg, ...style }}>
      <div
        className="c4t-cta-grid"
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '72px var(--container-gutter)',
          display: 'grid',
          gridTemplateColumns: '1.2fr auto',
          gap: 'var(--space-9)',
          alignItems: 'center',
        }}
      >
        <div>
          {eyebrow ? (
            <span
              className="c4t-eyebrow"
              style={{
                color: brand
                  ? 'color-mix(in srgb, var(--ink-50) 80%, transparent)'
                  : 'var(--text-brand-inverse)',
              }}
            >
              {eyebrow}
            </span>
          ) : null}

          <h2
            style={{
              marginTop: 12,
              fontSize: 'var(--type-display-md-size)',
              lineHeight: 'var(--type-display-md-line)',
              letterSpacing: 'var(--type-display-md-tracking)',
              color: fg,
              maxWidth: 620,
              textWrap: 'balance',
            }}
          >
            {title}
          </h2>

          {description ? (
            <p
              style={{
                marginTop: 14,
                fontSize: 'var(--type-body-lg-size)',
                color: sub,
                maxWidth: 560,
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: 'stretch',
            minWidth: 220,
          }}
        >
          <Button
            size="lg"
            variant={brand ? 'inverse' : 'primary'}
            iconRight="arrow-right"
            href={primaryHref}
          >
            {primaryCta}
          </Button>

          {secondaryCta ? (
            <Button size="lg" variant="inverse-ghost" href={secondaryHref}>
              {secondaryCta}
            </Button>
          ) : null}

          {note ? (
            <span style={{ fontSize: 'var(--type-caption-size)', color: sub, textAlign: 'center' }}>
              {note}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  )
}
