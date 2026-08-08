import Image from 'next/image'
import type { CSSProperties } from 'react'

export interface SiteImageProps {
  /** Remote URL. Its host must be whitelisted in next.config.ts remotePatterns. */
  src: string
  /**
   * Real alt text describing what the photograph SHOWS. Never a filename,
   * never "image of". Pass "" only for a purely decorative plate, which then
   * renders aria-hidden.
   */
  alt: string
  width?: number
  height?: number
  /** Fill the parent instead of using intrinsic dimensions. Parent must be positioned and sized. */
  fill?: boolean
  /** CSS aspect-ratio applied to the wrapper when using `fill`, e.g. "4 / 3". */
  ratio?: string
  /** Above the fold — disables lazy loading and preloads. Use on the hero only. */
  priority?: boolean
  sizes?: string
  radius?: string
  /** Small mono caption rendered over the bottom-left corner. */
  caption?: string
  style?: CSSProperties
  className?: string
}

/**
 * THE single image wrapper. Every photograph on the site goes through it.
 *
 * WHY ONE WRAPPER (CLAUDE.md rule 6). The photography is hotlinked from
 * Unsplash rather than committed to the repo, which means a third-party
 * dependency: if a URL rots, the image 404s. Funnelling every image through one
 * component means swapping a host, adding a loader, or moving to self-hosted
 * assets is a single edit here plus a change to the URL list in the content
 * modules — not a hunt across forty pages.
 *
 * Always pass explicit `width`/`height`, or `fill` with a `ratio`. Without
 * dimensions the browser cannot reserve space and the page shifts as images
 * arrive, which is both a CLS penalty and visibly cheap.
 *
 * ⚠ LICENCE. Unsplash permits commercial use, but the handoff is explicit that
 * each photo must be verified individually before launch, and the
 * "Placeholder · Unsplash licence" captions removed once the final set is
 * chosen.
 */
export function SiteImage({
  src,
  alt,
  width,
  height,
  fill,
  ratio,
  priority,
  sizes,
  radius = 'var(--radius-media)',
  caption,
  style,
  className,
}: SiteImageProps) {
  const decorative = alt === ''

  const image = fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      // Without `sizes`, a filled image is served at the largest breakpoint to
      // every device. The default here is a reasonable full-bleed assumption;
      // pass a tighter value for grid cells.
      sizes={sizes ?? '(max-width: 900px) 100vw, 50vw'}
      aria-hidden={decorative || undefined}
      style={{ objectFit: 'cover' }}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      aria-hidden={decorative || undefined}
      style={{ width: '100%', height: 'auto' }}
    />
  )

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        aspectRatio: ratio,
        // A tinted floor so a slow or failed load shows a surface rather than
        // a transparent hole in the layout.
        background: 'var(--surface-sunken)',
        ...style,
      }}
    >
      {image}

      {caption ? (
        <span
          style={{
            position: 'absolute',
            left: 'var(--space-4)',
            bottom: 'var(--space-4)',
            padding: '4px var(--space-3)',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--surface-scrim)',
            color: 'var(--text-inverse)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {caption}
        </span>
      ) : null}
    </div>
  )
}
