/**
 * The handful of design values needed OUTSIDE CSS.
 *
 * CLAUDE.md rule 1 says components must never carry a raw hex. These are not
 * component styles — they are browser-chrome and social-card metadata that the
 * platform reads as literal strings before any stylesheet exists, so a
 * `var(--ink-50)` reference cannot work.
 *
 * Keeping them here means the duplication is in exactly one place, named after
 * the token it mirrors. If a ramp value changes in colors.css, change it here
 * too — the pairing is asserted in the comment on each line.
 *
 * Do NOT import this into a component to style something. If you find yourself
 * reaching for it, the value belongs in CSS.
 */
export const BRAND_COLORS = {
  /** mirrors --ink-50 — the page floor, used for the mobile browser chrome */
  ink50: '#faf8f5',
  /** mirrors --ink-300 — muted text on the dark OG card */
  ink300: '#c9c3bc',
  /** mirrors --ink-800 — the hairline on the dark OG card */
  ink800: '#332b23',
  /** mirrors --ink-950 — the darkest surface */
  ink950: '#17130f',
  /** mirrors --accent-base (--teal-500) — the shipped accent */
  accent: '#0b7a6e',
  /** mirrors --accent-faint (--teal-100) — the accent ON DARK, per colors.css */
  teal100: '#cfe9e3',
} as const
