import { ImageResponse } from 'next/og'
import { BRAND_COLORS } from '@/styles/brand'

/**
 * The favicon, generated at build time.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS. `/favicon.ico` returned 404 on every page — the one console
 * error present on every single route through the whole build. Browsers request
 * it whether or not you declare it, so the only way to stop the 404 is to serve
 * something.
 *
 * WHAT IT IS. The accented "4" from the wordmark on the ink floor: the smallest
 * fragment of the mark that is still recognisably Crowd4Test at 32px. The full
 * wordmark is unreadable at that size, and a generic glyph would be worse than
 * either.
 *
 * ⚠ PLACEHOLDER, LIKE THE LOGO ITSELF. `Logo.tsx` says the mark is the wordmark
 * set in the display face because no real logotype was supplied — "Real brand
 * assets replace this". The same applies here: when the client provides the
 * logotype, replace this file with the supplied icon set (and add `apple-icon.tsx`
 * for the 180px touch icon, which this does not cover).
 *
 * Same runtime constraints as `opengraph-image.tsx`: no CSS custom properties, no
 * stylesheet, colours as literals from `styles/brand.ts`.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: BRAND_COLORS.ink950,
        // A 6px radius at 32px reads as the same shape language as the site's
        // controls without looking like a squircle.
        borderRadius: 6,
        color: BRAND_COLORS.teal100,
        fontSize: 22,
        fontWeight: 600,
      }}
    >
      4
    </div>,
    size,
  )
}
