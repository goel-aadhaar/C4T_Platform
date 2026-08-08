import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '../core/Icon'

export interface MediaProps {
  /** CSS aspect-ratio, e.g. "16 / 9". */
  ratio?: string
  /** Placeholder caption. */
  label?: string
  /** Lucide icon shown in the plate. */
  icon?: string
  tone?: 'sunken' | 'brand' | 'accent' | 'inverse'
  radius?: string
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

const TONES = {
  sunken: {
    background: 'var(--surface-sunken)',
    /**
     * ⚠ WAS `--text-disabled` (ink-400). axe measured 2.62:1 against
     * `--surface-sunken` — WCAG 1.4.3 wants 4.5:1 for 11px text, so the plate's
     * label failed on every ResourceCard and CaseStudyCard on the site.
     *
     * `--text-disabled` was the wrong role anyway: this label is not a disabled
     * control, it is the only text in the plate. `--text-secondary` (ink-700)
     * measures 7.4:1 here.
     */
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-subtle)',
  },
  brand: {
    background: 'var(--surface-brand-subtle)',
    // PORT NOTE: was --coral-400 / --coral-100, the accent-on-dark and faint
    // accent hairline roles. Renamed semantically in step 1.
    color: 'var(--text-brand-inverse)',
    border: '1px solid var(--border-brand-subtle)',
  },
  accent: {
    background: 'var(--surface-accent-subtle)',
    color: 'var(--teal-500)',
    border: '1px solid var(--teal-100)',
  },
  inverse: {
    background: 'var(--surface-inverse-raised)',
    color: 'var(--text-inverse-muted)',
    border: '1px solid var(--border-inverse)',
  },
} as const satisfies Record<NonNullable<MediaProps['tone']>, CSSProperties>

/**
 * A photography PLACEHOLDER plate — an aspect-ratio box with an icon and a
 * caption, used wherever a real asset has not been chosen yet.
 *
 * This is not the image component. Real photography goes through `SiteImage`
 * (next/image over the remote Unsplash URLs). Pass a `<SiteImage>` as
 * `children`, or to a Hero's `media` prop, once the asset is settled.
 */
export function Media({
  ratio = '16 / 9',
  label = 'Image',
  icon = 'image',
  tone = 'sunken',
  radius = 'var(--radius-media)',
  children,
  style,
  className,
}: MediaProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        aspectRatio: ratio,
        width: '100%',
        borderRadius: radius,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...TONES[tone],
        ...style,
      }}
    >
      {children ?? (
        <>
          <Icon name={icon} size={20} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        </>
      )}
    </div>
  )
}
