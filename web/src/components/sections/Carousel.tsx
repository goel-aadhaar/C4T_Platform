'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '@/components/ds'

export interface CarouselProps {
  /**
   * The slides, already rendered.
   *
   * NOT a `renderItem` callback, which is how `Home.jsx` did it. A function
   * cannot cross the server/client boundary — React refuses to serialise it —
   * and the callback would drag every card component into the client bundle
   * with it. Rendering the cards on the server and passing the elements down
   * keeps CaseStudyCard and ResourceCard as Server Components; only the
   * transform maths ships to the browser.
   */
  slides: readonly ReactNode[]
  /**
   * `coverflow` rotates side cards in 3D and shows arrows plus dots — the
   * resources strip. `deck` is the flatter case-study stack with an "01 / 03"
   * counter.
   */
  variant?: 'coverflow' | 'deck'
  /** Names the carousel for assistive technology, e.g. "Resources". */
  label: string
  /** Singular noun for the arrow labels, e.g. "resource". */
  itemNoun: string
  slideWidth?: number
  height?: number
}

/**
 * The one carousel. CLAUDE.md rule 7 sanctions a single client-side carousel,
 * so the resources coverflow and the case-study deck — two nearly identical
 * components in `design/site/Home.jsx` — are the same component with two
 * transform profiles.
 *
 * THE OFFSET MATH. `rel(k)` returns each slide's position relative to the active
 * one, wrapped to the shorter way round the ring: with 4 items and the active at
 * 0, slide 3 is at −1, not +3. That is what makes the loop continuous instead of
 * whipping back through the middle.
 *
 * ACCESSIBILITY — TWO DELIBERATE CHANGES FROM THE PROTOTYPE.
 *  1. The source put `aria-hidden` on side slides while leaving them clickable.
 *     Hiding an interactive element from the accessibility tree while it still
 *     takes clicks and focus is precisely the pattern screen-reader users hit as
 *     a dead end. Side slides are `inert` instead — out of the tree, out of the
 *     tab order, and not clickable. Navigation is the arrows, the dots and the
 *     arrow keys, all of which are real controls.
 *  2. Consequently click-to-advance on a side card is gone. It was a nice
 *     affordance; the dots do the same job and can be reached by keyboard.
 *
 * The transitions run on `--duration-base`, which `prefers-reduced-motion`
 * already zeroes.
 */
export function Carousel({
  slides,
  variant = 'coverflow',
  label,
  itemNoun,
  slideWidth,
  height,
}: CarouselProps) {
  const [active, setActive] = useState(0)
  const n = slides.length
  const coverflow = variant === 'coverflow'

  const width = slideWidth ?? (coverflow ? 340 : 540)
  const trackHeight = height ?? (coverflow ? 420 : 540)

  function step(dir: number) {
    setActive((v) => (v + dir + n) % n)
  }

  /** Shortest signed distance from the active slide, wrapped. */
  function rel(k: number) {
    let r = k - active
    if (r > n / 2) r -= n
    if (r < -n / 2) r += n
    return r
  }

  const transition = [
    'transform var(--duration-base) var(--ease-standard)',
    'opacity var(--duration-base) var(--ease-standard)',
    'filter var(--duration-base) var(--ease-standard)',
  ].join(', ')

  return (
    <div style={{ marginTop: 48 }}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            step(1)
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            step(-1)
          }
        }}
        style={{
          position: 'relative',
          height: trackHeight,
          perspective: coverflow ? 1700 : undefined,
          overflow: 'hidden',
          padding: coverflow ? '0 64px' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {slides.map((slide, k) => {
          const offset = rel(k)
          const distance = Math.abs(offset)
          const isActive = offset === 0

          const transform = coverflow
            ? `translateX(${offset * 255}px) rotateY(${offset * -38}deg) scale(${1 - distance * 0.14})`
            : `translateX(${offset * 235}px) scale(${1 - distance * 0.11})`

          return (
            <div
              key={k}
              role="group"
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}`}
              inert={!isActive}
              style={{
                position: 'absolute',
                width,
                maxWidth: '100%',
                transformStyle: coverflow ? 'preserve-3d' : undefined,
                transform,
                opacity: distance > 2 ? 0 : 1 - distance * (coverflow ? 0.28 : 0.55),
                zIndex: 10 - distance,
                filter: coverflow && distance ? 'brightness(0.82)' : undefined,
                pointerEvents: distance > 2 ? 'none' : 'auto',
                transition,
              }}
            >
              {slide}
            </div>
          )
        })}

        {coverflow ? (
          <>
            <Arrow dir={-1} noun={itemNoun} onClick={() => step(-1)} />
            <Arrow dir={1} noun={itemNoun} onClick={() => step(1)} />
          </>
        ) : null}
      </div>

      {coverflow ? (
        /**
         * ⚠ THE DOTS ARE 24×24 TARGETS THAT LOOK 8×8.
         *
         * The prototype's dots were the button: 8×8, or 22×8 when active. axe
         * flagged all four under WCAG 2.2 AA 2.5.8 (target size, minimum) —
         * "8px by 8px, should be at least 24px by 24px" — and on a site that
         * sells accessibility testing that is not a detail to wave through.
         *
         * The fix keeps the design exactly: the BUTTON is a transparent 24×24 hit
         * area, and the visible pill is an inner span at the original dimensions.
         * Nothing moves; the tappable region grows to meet the rule.
         */
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          {slides.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Show ${itemNoun} ${k + 1} of ${n}`}
              aria-current={k === active}
              onClick={() => setActive(k)}
              style={{
                width: 24,
                height: 24,
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: k === active ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: k === active ? 'var(--accent-base)' : 'var(--ink-300)',
                  transition: `width var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard)`,
                }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginTop: 28,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--type-caption-size)',
            fontWeight: 'var(--fw-semibold)',
            letterSpacing: 'var(--type-eyebrow-tracking)',
            // ⚠ Was `--text-muted` (ink-500): 4.09:1 on the sunken band, just
            // under the 4.5:1 the 13px counter needs. ink-700 measures 7.4:1.
            color: 'var(--text-secondary)',
          }}
        >
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={`Previous ${itemNoun}`}
            style={deckNav}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <span>
            <span style={{ color: 'var(--text-primary)' }}>
              {String(active + 1).padStart(2, '0')}
            </span>{' '}
            / {String(n).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label={`Next ${itemNoun}`}
            style={deckNav}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

const deckNav: CSSProperties = {
  width: 32,
  height: 32,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  border: '1px solid var(--border-default)',
  background: 'var(--surface-canvas)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  padding: 0,
}

function Arrow({ dir, noun, onClick }: { dir: -1 | 1; noun: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${dir < 0 ? 'Previous' : 'Next'} ${noun}`}
      style={{
        position: 'absolute',
        [dir < 0 ? 'left' : 'right']: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: 48,
        height: 48,
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-canvas)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-md)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
      }}
    >
      <Icon name={dir < 0 ? 'chevron-left' : 'chevron-right'} size={20} />
    </button>
  )
}
