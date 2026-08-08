'use client'

import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '../core/Icon'

export interface FaqItem {
  q: string
  a: ReactNode
}

export interface FaqAccordionProps {
  items?: FaqItem[]
  /** Index open on mount; -1 for all closed. */
  defaultOpen?: number
  style?: CSSProperties
  className?: string
}

/**
 * Single-open accordion.
 *
 * PORT NOTES.
 *  - The prototype toggled the panel by conditional render, so it appeared
 *    instantly. The README specifies a 200ms height transition, so the panel is
 *    always mounted and animates via `grid-template-rows: 0fr → 1fr` — the one
 *    technique that animates to CONTENT height without hardcoding a max-height
 *    that clips long answers. The duration comes from `--duration-base`, which
 *    `prefers-reduced-motion` already zeroes.
 *  - Keeping the panel mounted also means `aria-controls` always points at a
 *    real element, and in-page search finds closed answers.
 *
 * One of the five sanctioned client components.
 */
export function FaqAccordion({ items = [], defaultOpen = 0, style, className }: FaqAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className={className} style={{ borderTop: '1px solid var(--border-default)', ...style }}>
      {items.map((item, i) => {
        const on = open === i
        const panelId = `${baseId}-panel-${i}`
        const triggerId = `${baseId}-trigger-${i}`

        return (
          <div key={item.q} style={{ borderBottom: '1px solid var(--border-default)' }}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={triggerId}
                className="c4t-faq-trigger"
                aria-expanded={on}
                aria-controls={panelId}
                onClick={() => setOpen(on ? -1 : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-7)',
                  padding: '22px var(--space-4) 22px 0',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--type-heading-sm-size)',
                  fontWeight: 'var(--fw-medium)',
                  letterSpacing: '-0.1px',
                  color: 'var(--text-primary)',
                  transition: 'var(--transition-control)',
                }}
              >
                {item.q}
                <Icon
                  name={on ? 'minus' : 'plus'}
                  size={20}
                  style={{ color: 'var(--text-muted)', flex: 'none' }}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              // The animated wrapper. Only grid-template-rows transitions;
              // the inner element supplies overflow:hidden so the content clips
              // cleanly while the row collapses.
              style={{
                display: 'grid',
                gridTemplateRows: on ? '1fr' : '0fr',
                transition: `grid-template-rows var(--duration-base) var(--ease-standard)`,
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '0 60px var(--space-7) 0',
                    fontSize: 'var(--type-body-md-size)',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    maxWidth: 760,
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
