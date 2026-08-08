import type { CSSProperties, MouseEvent } from 'react'
import Link from 'next/link'
import { Icon } from './Icon'

export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string
  /** Required accessible label — icon-only controls must be named. */
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline' | 'filled'
  disabled?: boolean
  href?: string
  onClick?: (e: MouseEvent) => void
  style?: CSSProperties
  className?: string
}

/** Square control box. Ported verbatim — see the note in Button.tsx. */
const SIZES = { sm: 32, md: 40, lg: 48 } as const
/** Glyph size per box size. Note md is 18, not the 20 the icon scale suggests. */
const GLYPH = { sm: 16, md: 18, lg: 22 } as const

const SURFACES = {
  ghost: { background: 'transparent', border: '1px solid transparent' },
  outline: { background: 'var(--surface-canvas)', border: '1px solid var(--border-default)' },
  filled: { background: 'var(--surface-sunken)', border: '1px solid transparent' },
} as const satisfies Record<NonNullable<IconButtonProps['variant']>, CSSProperties>

/**
 * An icon-only control. `label` is required and becomes `aria-label` — an
 * unnamed icon button is invisible to a screen reader.
 *
 * Used for the carousel arrows and the mobile nav toggle.
 */
export function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'ghost',
  disabled,
  href,
  onClick,
  style,
  className,
}: IconButtonProps) {
  const box = SIZES[size]

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: box,
    height: box,
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'var(--transition-control)',
    ...SURFACES[variant],
    ...style,
  }

  const classes = ['c4t-iconbtn', className].filter(Boolean).join(' ')
  const glyph = <Icon name={icon} size={GLYPH[size]} />

  if (href) {
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    const shared = {
      className: classes,
      style: base,
      'aria-label': label,
      // See the note in Button.tsx — false must become undefined.
      'aria-disabled': disabled ? true : undefined,
      onClick: disabled ? undefined : onClick,
    }

    return isInternal ? (
      <Link href={href} {...shared}>
        {glyph}
      </Link>
    ) : (
      <a href={href} {...shared}>
        {glyph}
      </a>
    )
  }

  return (
    <button
      className={classes}
      type="button"
      aria-label={label}
      aria-disabled={disabled ? true : undefined}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={base}
    >
      {glyph}
    </button>
  )
}
