import type { CSSProperties } from 'react'
import { ICON_REGISTRY, isIconName } from './icon-registry'

export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "check-circle-2", "bot", "users". */
  name: string
  /** Square px size. 16 inline, 20 default UI, 24 nav, 32 feature. */
  size?: number
  /** CSS color; defaults to currentColor. */
  color?: string
  style?: CSSProperties
  className?: string
  /** Accessible name. Omit for decorative icons (renders aria-hidden). */
  label?: string
}

/**
 * The only icon primitive in the system — never hand-roll an SVG.
 *
 * PORT NOTE. The prototype rendered each glyph as a CSS mask pulled from a
 * lucide-static CDN, so it inherited `currentColor` and any name worked. This
 * renders a real `lucide-react` component instead: no network dependency, no
 * flash of an unmasked block, proper tree-shaking, and the SVG carries its own
 * accessibility semantics.
 *
 * `strokeWidth` is pinned to 2 — the design system's only stroke weight.
 *
 * `name` stays `string` to match the shipped .d.ts, so content data can supply
 * it freely. Unknown names render nothing and warn in development rather than
 * throwing; import `IconName` from ./icon-registry where you want the compiler
 * to check the value instead.
 */
export function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  className,
  label,
}: IconProps) {
  if (!isIconName(name)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[Icon] "${name}" is not in the icon registry. Add it to ` +
          `src/components/ds/core/icon-registry.ts — an unregistered name renders nothing.`,
      )
    }
    return null
  }

  // `isIconName` above is a type guard, so `name` is already narrowed here.
  const Glyph = ICON_REGISTRY[name]

  return (
    <Glyph
      className={className}
      width={size}
      height={size}
      color={color}
      strokeWidth={2}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable={false}
      style={{ flex: 'none', verticalAlign: 'middle', ...style }}
    />
  )
}
