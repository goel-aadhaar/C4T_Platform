import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '@/components/ds'
import s from './sections.module.css'

/**
 * The three layout blocks the hub and detail pages share, ported from the local
 * helpers in `design/site/pages.jsx` (`NumberedRows`, `ChecklistGrid`) and
 * `design/site/detail.jsx` (the numbered chip grid).
 *
 * They live here rather than in `components/ds/` because they are page
 * compositions, not design-system components — none of them appears in the
 * handoff's `ds_components/` folder or has a `.d.ts` contract. Keeping the DS
 * folder to what the kit actually ships means the next kit update is a clean
 * re-copy.
 *
 * All three are Server Components.
 */

/* ─── Numbered rows ────────────────────────────────────────────────────────── */

export interface NumberedRow {
  /** Mono label in the left column — "01", or a stage name like "Generate". */
  n: string
  title?: string
  body: string
}

export interface NumberedRowsProps {
  items: readonly NumberedRow[]
  tone?: 'default' | 'inverse'
}

/**
 * A hairline table of stages. Used for the AI method (numbered) and the platform
 * pipeline (named stages, no title column).
 *
 * The responsive collapse lives in `sections.module.css` under `.numRow`; the
 * prototype's `c4t-numrow` class had no rule behind it. See the note there.
 */
export function NumberedRows({ items, tone = 'default' }: NumberedRowsProps) {
  const inverse = tone === 'inverse'
  const hairline = inverse ? 'var(--border-inverse)' : 'var(--border-default)'

  return (
    // `numRows` establishes the containment context the rows' @container
    // queries measure against — see the note in sections.module.css. Without it
    // the queries fall back to the nearest ancestor container, or the viewport.
    <div
      className={s.numRows}
      style={{ display: 'grid', gap: 0, marginTop: 48, borderTop: `1px solid ${hairline}` }}
    >
      {items.map((row) => (
        <div key={row.n} className={s.numRow} style={{ borderBottom: `1px solid ${hairline}` }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-caption-size)',
              lineHeight: 'var(--type-caption-line)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--type-eyebrow-tracking)',
              textTransform: 'uppercase',
              color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-brand)',
            }}
          >
            {row.n}
          </div>

          {/* Rendered even when empty so the three columns stay aligned down the
              table — the platform pipeline has no per-stage title. */}
          <div
            className="c4t-heading-sm"
            style={{ color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)' }}
          >
            {row.title ?? ''}
          </div>

          <p
            className="c4t-body-md"
            style={{
              margin: 0,
              color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
            }}
          >
            {row.body}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ─── Checklist grid ───────────────────────────────────────────────────────── */

export interface ChecklistItem {
  label: string
  /** Second line under the label. The AI coverage list uses it; others don't. */
  detail?: string
}

export interface ChecklistGridProps {
  items: readonly ChecklistItem[]
  columns?: number
  tone?: 'default' | 'inverse'
}

/**
 * Ticked items in two or three columns, each with an underline.
 *
 * PORT NOTE: the source accepted either a string or a `[head, tail]` tuple and
 * branched with `Array.isArray`. A tuple carrying two different meanings by
 * position is the kind of thing that reads fine until someone adds a third
 * element, so this takes `{ label, detail }` and the content modules do the
 * shaping.
 */
export function ChecklistGrid({ items, columns = 2, tone = 'default' }: ChecklistGridProps) {
  const inverse = tone === 'inverse'

  return (
    <div
      className={columns >= 3 ? 'c4t-grid-3' : 'c4t-grid-2'}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '20px 48px',
        marginTop: 44,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            paddingBottom: 20,
            borderBottom: `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-subtle)'}`,
          }}
        >
          <Icon
            name="check"
            size={20}
            style={{
              color: inverse ? 'var(--text-brand-inverse)' : 'var(--accent-base)',
              flex: 'none',
            }}
          />
          <div>
            <div
              className="c4t-heading-sm"
              style={{ color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)' }}
            >
              {item.label}
            </div>
            {item.detail ? (
              <p
                className="c4t-body-sm"
                style={{
                  margin: '6px 0 0',
                  color: inverse ? 'var(--text-inverse-muted)' : 'var(--text-secondary)',
                }}
              >
                {item.detail}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Numbered chip grid ───────────────────────────────────────────────────── */

export interface ChipGridProps {
  /** Capability names. Rendered 01, 02, 03… in source order. */
  items: readonly string[]
  style?: CSSProperties
}

/**
 * The capability grid on every detail page: up to four across, each cell a
 * two-digit ordinal over a short heading.
 *
 * The column count follows the item count up to four, so three chips make three
 * columns rather than three-quarters of a row plus a gap.
 */
export function ChipGrid({ items, style }: ChipGridProps) {
  if (items.length === 0) return null

  return (
    <div
      className="c4t-grid-4"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
        gap: 'var(--space-grid-gap)',
        marginTop: 48,
        ...style,
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            background: 'var(--surface-sunken)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-card)',
            padding: 'var(--space-card-padding)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-eyebrow-size)',
              lineHeight: 'var(--type-eyebrow-line)',
              fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--type-eyebrow-tracking)',
              color: 'var(--text-brand)',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <div
            className="c4t-heading-sm"
            style={{ marginTop: 16, color: 'var(--text-primary)', textWrap: 'balance' }}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Ticked list ──────────────────────────────────────────────────────────── */

export interface TickListProps {
  items: readonly string[]
  tone?: 'default' | 'inverse'
  style?: CSSProperties
}

/** A plain ticked list, no rules. Used inside panels. */
export function TickList({ items, tone = 'default', style }: TickListProps) {
  const inverse = tone === 'inverse'

  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, ...style }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon
            name="check"
            size={20}
            style={{
              color: inverse ? 'var(--text-brand-inverse)' : 'var(--accent-base)',
              flex: 'none',
            }}
          />
          <span
            className="c4t-body-md"
            style={{ color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)' }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ─── Closing band ─────────────────────────────────────────────────────────── */

export interface ClosingCtaProps {
  children: ReactNode
}

/**
 * The dark closing band. A wrapper rather than a component with props, because
 * the only thing it adds is the `.deep` treatment and a transparent CtaBanner
 * inside it — the banner keeps its own API.
 */
export function DeepBand({ children }: ClosingCtaProps) {
  return (
    <div className={s.deep} style={{ position: 'relative' }}>
      {children}
    </div>
  )
}
