import type { CSSProperties } from 'react'
import Link from 'next/link'

export interface LogoProps {
  /** Cap height in px. 22 in nav, 20 in footer, 40+ in hero lockups. */
  size?: number
  tone?: 'default' | 'inverse'
  /** Link target; pass null or "" to render a plain span. */
  href?: string | null
  style?: CSSProperties
  className?: string
}

/**
 * The wordmark.
 *
 * NO LOGO ARTWORK EXISTS. The handoff is explicit that none was supplied, so
 * the mark is the wordmark set in the display face with an accented "4". Real
 * files are needed before launch — see the handoff README's Assets section.
 *
 * PORT NOTE: the source reached for `--coral-500` / `--coral-400` directly.
 * Those are the two accent roles the step-1 token work named: `--accent-base`
 * on light surfaces and `--text-brand-inverse` (a pale tint) on dark, because
 * the accent at full strength is unreadable against `--ink-950`.
 */
export function Logo({ size = 22, tone = 'default', href = '/', style, className }: LogoProps) {
  const color = tone === 'inverse' ? 'var(--text-inverse)' : 'var(--text-primary)'
  const accent = tone === 'inverse' ? 'var(--text-brand-inverse)' : 'var(--accent-base)'

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--fw-semibold)',
    fontSize: size,
    // Tracking scales with the cap height rather than being a fixed step.
    letterSpacing: size * -0.038,
    lineHeight: 1,
    color,
    textDecoration: 'none',
    ...style,
  }

  const mark = (
    <>
      Crowd<span style={{ color: accent }}>4</span>Test
    </>
  )

  if (!href) {
    return (
      <span className={className} style={base} aria-label="Crowd4Test">
        {mark}
      </span>
    )
  }

  return (
    <Link href={href} className={className} style={base} aria-label="Crowd4Test">
      {mark}
    </Link>
  )
}
