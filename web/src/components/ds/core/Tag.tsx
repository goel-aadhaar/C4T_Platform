import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import Link from 'next/link'

export interface TagProps {
  children?: ReactNode
  /** Selected state — ink fill, inverse label. */
  active?: boolean
  /** Surface the tag sits on. `inverse` for the dark bands. */
  tone?: 'canvas' | 'inverse'
  href?: string
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
  className?: string
}

/**
 * A pill for filters and taxonomy chips.
 *
 * Renders as a link when `href` is set, a button when `onClick` is, and an
 * inert span otherwise — the source picks the element from the props rather
 * than making everything a button.
 *
 * PORT NOTES.
 *  - The source filled the active state with the raw `--ink-950` ramp step.
 *    That is `--surface-inverse` semantically, which is what this uses.
 *  - `tone="inverse"` replaces the local `Chip` helper that `Home.jsx` defined
 *    twice to put the same pill on a dark band. One component with a tone beats
 *    a near-duplicate per page, and it matches how Badge, StatBlock and
 *    Testimonial already handle the inverse surface.
 */
export function Tag({
  children,
  active,
  tone = 'canvas',
  href,
  onClick,
  style,
  className,
}: TagProps) {
  const inverse = tone === 'inverse'

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height: 32,
    padding: '0 14px',
    borderRadius: 'var(--radius-full)',
    border: `1px solid ${
      active
        ? 'var(--surface-inverse)'
        : inverse
          ? 'var(--border-inverse)'
          : 'var(--border-default)'
    }`,
    background: active
      ? 'var(--surface-inverse)'
      : inverse
        ? 'var(--surface-inverse-raised)'
        : 'var(--surface-canvas)',
    color: active
      ? 'var(--text-inverse)'
      : inverse
        ? 'var(--text-inverse-muted)'
        : 'var(--text-secondary)',
    fontSize: 'var(--type-body-sm-size)',
    fontWeight: 'var(--fw-medium)',
    lineHeight: 1,
    textDecoration: 'none',
    cursor: href || onClick ? 'pointer' : 'default',
    transition: 'var(--transition-control)',
    ...style,
  }

  if (href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    return isInternal ? (
      <Link href={href} className={className} style={base} onClick={onClick}>
        {children}
      </Link>
    ) : (
      <a href={href} className={className} style={base} onClick={onClick}>
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" className={className} style={base} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <span className={className} style={base}>
      {children}
    </span>
  )
}
