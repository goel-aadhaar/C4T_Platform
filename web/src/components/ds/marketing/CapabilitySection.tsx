'use client'

import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '../core/Icon'
import type { IconName } from '../core/icon-registry'
import { Media } from './Media'

export interface Capability {
  icon?: IconName
  title: string
  description?: string
}

export interface CapabilitySectionProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  capabilities?: readonly Capability[]
  /** Replaces the default product plate. */
  media?: ReactNode
  tone?: 'canvas' | 'sunken' | 'inverse'
  /** Puts the list on the right. */
  reverse?: boolean
  style?: CSSProperties
  className?: string
}

/**
 * The platform explainer band: a rail of capabilities, one open at a time,
 * beside a product plate.
 *
 * WHY THIS IS A CLIENT COMPONENT. CLAUDE.md rule 7 sanctions `Tabs`, and this is
 * that pattern under another name — a single-select list of triggers driving one
 * panel. It is implemented with the ARIA tabs roles rather than the source's
 * bare `<button>`s so that arrow keys work and screen readers announce it as a
 * tablist. If you would rather it stayed on the server, the fallback is
 * rendering every description expanded; say so and it is a small change.
 *
 * PORT NOTES.
 *  - The active marker and icon were `--coral-500` — now `--accent-base`, or
 *    `--text-brand-inverse` on the dark band where teal-500 fails contrast.
 *  - The source hid inactive descriptions with `{on && …}`. They now stay
 *    mounted with `hidden`, so in-page search finds them and the panel does not
 *    reflow the rail as you click down it.
 *  - `direction: rtl` was used to flip the columns for `reverse`. That also
 *    reverses punctuation order in any text that inherits it, so the flip is
 *    done with `order` instead.
 */
export function CapabilitySection({
  eyebrow,
  title,
  description,
  capabilities = [],
  media,
  tone = 'sunken',
  reverse,
  style,
  className,
}: CapabilitySectionProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()

  const inverse = tone === 'inverse'
  const bg = inverse
    ? 'var(--surface-inverse)'
    : tone === 'sunken'
      ? 'var(--surface-sunken)'
      : 'var(--surface-canvas)'
  const fg = inverse ? 'var(--text-inverse)' : 'var(--text-primary)'
  const muted = inverse ? 'var(--text-inverse-muted)' : 'var(--text-secondary)'
  const accent = inverse ? 'var(--text-brand-inverse)' : 'var(--accent-base)'
  const current = capabilities[active]

  // Roving arrow-key selection, as the tabs pattern requires.
  function onKeyDown(e: React.KeyboardEvent) {
    const last = capabilities.length - 1
    if (last < 0) return
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? (active + 1) % capabilities.length
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? (active + last) % capabilities.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : -1
    if (next < 0) return
    e.preventDefault()
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <section
      className={className}
      style={{ background: bg, color: fg, paddingBlock: 'var(--space-section-y)', ...style }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          paddingInline: 'var(--container-gutter)',
        }}
      >
        <div style={{ maxWidth: 700 }}>
          {eyebrow ? (
            <span
              className="c4t-eyebrow"
              style={{ color: inverse ? 'var(--text-brand-inverse)' : 'var(--text-brand)' }}
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            style={{
              marginTop: 14,
              fontSize: 'var(--type-display-md-size)',
              lineHeight: 'var(--type-display-md-line)',
              letterSpacing: 'var(--type-display-md-tracking)',
              color: fg,
              textWrap: 'balance',
            }}
          >
            {title}
          </h2>
          {description ? (
            <p style={{ marginTop: 14, fontSize: 'var(--type-body-lg-size)', color: muted }}>
              {description}
            </p>
          ) : null}
        </div>

        <div
          className="c4t-capability-grid"
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: reverse ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Platform capabilities"
            onKeyDown={onKeyDown}
            style={{ display: 'flex', flexDirection: 'column', order: reverse ? 2 : 1 }}
          >
            {capabilities.map((c, i) => {
              const on = i === active
              return (
                <button
                  key={c.title}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderLeft: `2px solid ${
                      on ? accent : inverse ? 'var(--border-inverse)' : 'var(--border-default)'
                    }`,
                    padding: '18px 0 18px 20px',
                    cursor: 'pointer',
                    transition: 'var(--transition-control)',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 'var(--type-heading-sm-size)',
                      fontWeight: 'var(--fw-semibold)',
                      letterSpacing: 'var(--type-heading-sm-tracking)',
                      color: on ? fg : inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
                    }}
                  >
                    {c.icon ? (
                      <Icon
                        name={c.icon}
                        size={18}
                        style={{ color: on ? accent : 'currentColor' }}
                      />
                    ) : null}
                    {c.title}
                  </span>
                  {c.description ? (
                    <span
                      hidden={!on}
                      style={{
                        display: on ? 'block' : 'none',
                        marginTop: 8,
                        fontSize: 'var(--type-body-sm-size)',
                        lineHeight: 'var(--type-body-sm-line)',
                        color: muted,
                        maxWidth: 420,
                      }}
                    >
                      {c.description}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            style={{ order: reverse ? 1 : 2 }}
          >
            {media ?? (
              <Media
                ratio="4 / 3"
                label={current?.title ?? 'Product view'}
                icon={current?.icon ?? 'monitor'}
                tone={inverse ? 'inverse' : 'sunken'}
                style={{ background: inverse ? undefined : 'var(--surface-canvas)' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
