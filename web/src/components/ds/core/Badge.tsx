import type { CSSProperties, ReactNode } from 'react'
import { Icon } from './Icon'

export interface BadgeProps {
  children?: ReactNode
  tone?: 'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'inverse'
  /** Lucide icon name rendered at 12px before the label. */
  icon?: string
  /** Renders a 6px status dot before the label. */
  dot?: boolean
  /** Default true — badges are uppercase mono. Set false for sentence-case labels. */
  uppercase?: boolean
  style?: CSSProperties
  className?: string
}

const TONES = {
  neutral: { background: 'var(--surface-muted)', color: 'var(--text-secondary)' },
  brand: { background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)' },
  accent: { background: 'var(--surface-accent-subtle)', color: 'var(--text-accent)' },
  success: { background: 'var(--status-success-bg)', color: 'var(--status-success-fg)' },
  warning: { background: 'var(--status-warning-bg)', color: 'var(--status-warning-fg)' },
  error: { background: 'var(--status-error-bg)', color: 'var(--status-error-fg)' },
  info: { background: 'var(--status-info-bg)', color: 'var(--status-info-fg)' },
  /* PORT NOTE: the source used rgb(255 255 255 / 0.1). CLAUDE.md rule 2 bars
     pure white from composition, and rule 1 bars a raw channel triple, so the
     wash is mixed off --ink-50 at the source's own opacity. */
  inverse: {
    background: 'color-mix(in srgb, var(--ink-50) 10%, transparent)',
    color: 'var(--text-inverse)',
  },
} as const satisfies Record<NonNullable<BadgeProps['tone']>, CSSProperties>

/**
 * A small mono-uppercase pill — plan labels, card categories, section markers.
 *
 * The uppercase mono treatment is the one sanctioned exception to the
 * sentence-case copy rule.
 */
export function Badge({
  children,
  tone = 'neutral',
  icon,
  dot,
  uppercase = true,
  style,
  className,
}: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 24,
        padding: '0 10px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: uppercase ? '0.08em' : 0,
        textTransform: uppercase ? 'uppercase' : 'none',
        whiteSpace: 'nowrap',
        ...TONES[tone],
        ...style,
      }}
    >
      {dot ? (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 'var(--radius-full)',
            background: 'currentColor',
          }}
        />
      ) : null}
      {/* 12px is below the 16/20/24/32 icon scale, and deliberate in the source. */}
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  )
}
