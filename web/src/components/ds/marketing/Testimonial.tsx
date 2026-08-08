import type { CSSProperties } from 'react'
import { Icon } from '../core/Icon'

export interface TestimonialProps {
  quote: string
  name: string
  role?: string
  company?: string
  /** Optional headline figure pulled out of the quote. */
  metric?: string
  metricLabel?: string
  tone?: 'canvas' | 'inverse'
  /** `feature` drops the card chrome and enlarges the quote. */
  variant?: 'card' | 'feature'
  style?: CSSProperties
  className?: string
}

/**
 * A customer quote.
 *
 * ⚠ ONLY REAL, ATTRIBUTABLE QUOTES WITH WRITTEN CONSENT. An invented quote
 * attributed to an invented person is a fabricated endorsement, and on a page
 * that also makes compliance claims it is the kind of thing a buyer's legal
 * team notices. The homepage currently passes the handoff's visible placeholder
 * ("Testimonial quote goes here…" / "Name" / "Title") — that reads as a
 * placeholder to anyone looking at it, which is the point. Replace, do not
 * embellish. See TESTIMONIAL in content/home.ts.
 *
 * PORT NOTES.
 *  - The quote glyph was `--coral-500`; on the inverse band that ramp is barely
 *    visible, so it follows the accent and inverts with the tone.
 *  - `rgb(255 255 255 / 0.1)` on the avatar became a mix off `--ink-50` —
 *    CLAUDE.md rules 1 and 2.
 *  - The metric was a raw 32px; it uses `--type-heading-lg-size` (28px), the
 *    nearest token.
 *  - Initials come from `name.split(" ")`, which produced `undefined` for a
 *    trailing space. Now filtered.
 */
export function Testimonial({
  quote,
  name,
  role,
  company,
  metric,
  metricLabel,
  tone = 'canvas',
  variant = 'card',
  style,
  className,
}: TestimonialProps) {
  const inverse = tone === 'inverse'
  const isFeature = variant === 'feature'

  const fg = inverse ? 'var(--text-inverse)' : 'var(--text-primary)'
  const muted = inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)'
  const hairline = inverse ? 'var(--border-inverse)' : 'var(--border-subtle)'

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <figure
      className={className}
      style={{
        margin: 0,
        padding: isFeature ? 0 : 'var(--space-card-padding-lg)',
        background: isFeature
          ? 'transparent'
          : inverse
            ? 'var(--surface-inverse-raised)'
            : 'var(--surface-canvas)',
        border: isFeature
          ? 'none'
          : `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-card)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...style,
      }}
    >
      <Icon
        name="quote"
        size={isFeature ? 28 : 20}
        style={{
          color: inverse ? 'var(--text-brand-inverse)' : 'var(--accent-base)',
          marginBottom: 16,
        }}
      />

      <blockquote
        style={{
          margin: 0,
          fontSize: isFeature ? 'var(--type-heading-md-size)' : 'var(--type-body-md-size)',
          lineHeight: isFeature ? 'var(--type-heading-md-line)' : 'var(--type-body-md-line)',
          letterSpacing: isFeature ? 'var(--type-heading-md-tracking)' : 0,
          color: fg,
          textWrap: 'pretty',
        }}
      >
        {quote}
      </blockquote>

      {metric ? (
        <div
          style={{
            marginTop: 'var(--space-6)',
            paddingTop: 20,
            borderTop: `1px solid ${hairline}`,
          }}
        >
          <div
            style={{
              fontSize: 'var(--type-heading-lg-size)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--type-heading-lg-tracking)',
              color: fg,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {metric}
          </div>
          <div style={{ fontSize: 'var(--type-caption-size)', color: muted, marginTop: 2 }}>
            {metricLabel}
          </div>
        </div>
      ) : null}

      <figcaption
        style={{
          marginTop: 'auto',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            flex: 'none',
            borderRadius: 999,
            background: inverse
              ? 'color-mix(in srgb, var(--ink-50) 10%, transparent)'
              : 'var(--surface-muted)',
            color: inverse ? 'var(--text-inverse)' : 'var(--text-secondary)',
            fontSize: 'var(--type-body-sm-size)',
            fontWeight: 'var(--fw-semibold)',
          }}
        >
          {initials}
        </span>
        <span>
          <span
            style={{
              display: 'block',
              fontSize: 'var(--type-body-sm-size)',
              fontWeight: 'var(--fw-medium)',
              color: fg,
            }}
          >
            {name}
          </span>
          <span style={{ display: 'block', fontSize: 'var(--type-caption-size)', color: muted }}>
            {role}
            {company ? `, ${company}` : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
