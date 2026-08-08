import type { CSSProperties, ReactNode } from 'react'

export interface SectionProps {
  tone?: 'canvas' | 'sunken' | 'inverse' | 'brand'
  /** 64px instead of 96px vertical rhythm. */
  compact?: boolean
  /** Hairline rule on the top edge. */
  divider?: boolean
  id?: string
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

const TONES = {
  canvas: { background: 'var(--surface-canvas)', color: 'var(--text-primary)' },
  sunken: { background: 'var(--surface-sunken)', color: 'var(--text-primary)' },
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)' },
  brand: { background: 'var(--surface-brand-subtle)', color: 'var(--text-primary)' },
} as const satisfies Record<NonNullable<SectionProps['tone']>, CSSProperties>

/**
 * The page-rhythm primitive: a full-bleed band with a centred 1200px container.
 *
 * Dark and light sections alternate deliberately to create pace. Pass the
 * `.c4t-deep` / `.c4t-airy` classes through `className` to add the glow and
 * grid layers — those ship as CSS Modules with the sections that use them, not
 * from here.
 */
export function Section({
  tone = 'canvas',
  compact,
  divider,
  id,
  children,
  style,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingBlock: compact ? 'var(--space-section-y-compact)' : 'var(--space-section-y)',
        borderTop: divider ? '1px solid var(--border-subtle)' : undefined,
        ...TONES[tone],
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          paddingInline: 'var(--container-gutter)',
        }}
      >
        {children}
      </div>
    </section>
  )
}
