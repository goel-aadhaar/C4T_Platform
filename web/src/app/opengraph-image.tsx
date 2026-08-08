import { ImageResponse } from 'next/og'
import { BRAND_COLORS } from '@/styles/brand'

/**
 * The site-wide Open Graph card, rendered at build time.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE REPLACES A STATIC PNG
 *
 * `lib/seo/metadata.ts` pointed every page's `og:image` at `/og/default.png`,
 * which did not exist — so every share on LinkedIn, Slack or X unfurled with a
 * broken image. Generating it means the card cannot rot and stays in step with
 * the tokens.
 *
 * Placed at the app root, so Next uses it as the fallback for every route that
 * does not define its own. Per-page cards can be added later as
 * `opengraph-image.tsx` inside a segment; that is a step-10 refinement, not a
 * blocker.
 *
 * TWO CONSTRAINTS THIS FILE HAS TO RESPECT.
 *
 *  1. It runs in the Edge/OG runtime, NOT the browser. There is no CSS cascade,
 *     no custom properties and no stylesheet — Satori resolves a small subset of
 *     flexbox from inline styles only. That is why the colours are literals from
 *     `styles/brand.ts` rather than `var(--ink-950)`: a custom property here
 *     resolves to nothing and renders a black box.
 *  2. Fonts must be fetched as binary and handed over explicitly. Instrument
 *     Sans is NOT loaded here — `next/font` does not apply in this runtime, and
 *     fetching a webfont at build time on every deploy is a network dependency
 *     for a decorative asset. The card uses the runtime's default sans, which is
 *     close enough at 72px for a share preview. Ship the real face by committing
 *     the .ttf and reading it with `fs` if the difference matters.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const alt = 'Crowd4Test — AI-powered digital quality engineering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // The ink floor and the teal accent, matching the site's dark bands.
        backgroundColor: BRAND_COLORS.ink950,
        padding: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 34,
          fontWeight: 600,
          color: BRAND_COLORS.ink50,
          letterSpacing: -0.5,
        }}
      >
        Crowd
        <span style={{ color: BRAND_COLORS.teal100 }}>4</span>
        Test
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: BRAND_COLORS.teal100,
            marginBottom: 28,
          }}
        >
          AI-Powered Digital Quality Engineering
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2.5,
            color: BRAND_COLORS.ink50,
            maxWidth: 900,
          }}
        >
          Ship AI and software your users can trust.
        </div>
      </div>

      {/* A hairline, not a border on the container — Satori draws borders on
            the parent's edges, which would frame the whole card. */}
      <div
        style={{
          display: 'flex',
          borderTop: `1px solid ${BRAND_COLORS.ink800}`,
          paddingTop: 28,
          fontSize: 22,
          color: BRAND_COLORS.ink300,
        }}
      >
        AI agents at machine speed. Human testers for judgment.
      </div>
    </div>,
    size,
  )
}
