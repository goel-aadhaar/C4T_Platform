import type { CSSProperties } from 'react'

export interface Stat {
  value: string
  label: string
  detail?: string
}

export interface StatBlockProps {
  stats?: readonly Stat[]
  tone?: 'canvas' | 'inverse'
  /** Defaults to stats.length capped at 4. */
  columns?: number
  /** Hairline rules between cells. Default true. */
  divided?: boolean
  align?: 'left' | 'center'
  style?: CSSProperties
  className?: string
}

/**
 * A row of metrics separated by hairlines.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * THE DIVIDER ALIGNMENT. The handoff README flags this as "a real defect
 * twice", so the rule is written out rather than left implicit:
 *
 *   Every cell gets SYMMETRIC 32px horizontal padding, and the first cell's
 *   LEFT padding is removed. That is what makes each hairline sit optically
 *   centred in the gap between two figures instead of hugging the one on its
 *   right. Take away the symmetry and every divider drifts.
 *
 * The responsive half of the rule does NOT live here. When the grid reflows,
 * whichever cell starts a row must lose its left border and left padding, and
 * that depends on the column count — so it ships as `.c4t-stats-5` with the
 * section that uses it, applied through `className`. `.c4t-stat-grid` (from
 * tokens/interactions.css) separately drops to two columns under 900px.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Figures render with `font-variant-numeric: tabular-nums` so digits align
 * across cells — a copy rule, not a detail.
 */
export function StatBlock({
  stats = [],
  tone = 'canvas',
  columns,
  divided = true,
  align = 'left',
  style,
  className,
}: StatBlockProps) {
  const inverse = tone === 'inverse'
  const cols = columns ?? Math.min(stats.length, 4) ?? 1

  return (
    <div
      className={['c4t-stat-grid', className].filter(Boolean).join(' ')}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
        gap: divided ? 0 : 'var(--space-8)',
        textAlign: align,
        ...style,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            padding: divided ? '8px 32px' : 0,
            borderLeft:
              divided && i > 0
                ? `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-default)'}`
                : 'none',
            // Only the first cell loses its left padding — see the note above.
            paddingLeft: divided && i === 0 ? 0 : undefined,
          }}
        >
          <div
            className="c4t-stat-value"
            style={{
              fontSize: 'var(--type-metric-size)',
              lineHeight: 'var(--type-metric-line)',
              letterSpacing: 'var(--type-metric-tracking)',
              fontWeight: 'var(--fw-semibold)',
              fontVariantNumeric: 'tabular-nums',
              color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
            }}
          >
            {s.value}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 'var(--type-body-sm-size)',
              fontWeight: 'var(--fw-medium)',
              color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
            }}
          >
            {s.label}
          </div>

          {s.detail ? (
            <div
              style={{
                marginTop: 4,
                fontSize: 'var(--type-caption-size)',
                color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-muted)',
              }}
            >
              {s.detail}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
