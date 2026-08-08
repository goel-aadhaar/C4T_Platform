import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { env } from '@/lib/env'
import { BRAND_COLORS } from '@/styles/brand'
import '@/styles/globals.css'

/**
 * Instrument Sans carries display, UI and body. Weight 600 is the display
 * weight — the design never uses 700 for headings, so it is not loaded.
 * 500 is present for buttons and labels.
 */
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

/** JetBrains Mono carries eyebrows, badges, metadata and table keys only. */
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'AI Testing & Crowd Testing Services | Crowd4Test',
    template: '%s | Crowd4Test',
  },
  description:
    'Validate AI apps, web, mobile and APIs with AI agents plus a vetted global community of expert testers. Real devices, real users, 120+ countries. Book a demo.',
  applicationName: 'Crowd4Test',
  formatDetection: { telephone: false, address: false, email: false },
  // Preview and staging deployments must never be indexed.
  robots:
    env.NEXT_PUBLIC_ENVIRONMENT === 'production'
      ? { index: true, follow: true }
      : { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximum-scale — suppressing pinch-zoom fails WCAG 1.4.4, and this
  // company sells accessibility testing.
  // Browser chrome only — read as a literal before any stylesheet loads, so it
  // cannot reference --ink-50 directly. See styles/brand.ts.
  themeColor: [{ media: '(prefers-color-scheme: light)', color: BRAND_COLORS.ink50 }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
