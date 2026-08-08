import type { NextConfig } from 'next'
import { legacyRedirects } from './src/lib/seo/redirects'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Cache Components (Partial Prerendering) is deliberately NOT enabled.
   *
   * It is the direction Next.js is heading and will eventually be the default,
   * but turning it on makes every uncached data read inside an otherwise
   * prerenderable route a build error until it is explicitly cached or marked
   * dynamic. For a marketing site that is fully static and a dashboard that is
   * fully dynamic, it buys little today and costs a learning curve.
   *
   * Revisit when the dashboard needs a static shell with data streaming behind
   * Suspense. Enable with:  cacheComponents: true
   */
  // cacheComponents: true,

  images: {
    /**
     * Next 16 changed four next/image defaults that bite silently:
     *   - `qualities` defaults to [75] ONLY; other values are coerced
     *   - `minimumCacheTTL` went from 60s to 4 hours
     *   - 16 was removed from `imageSizes`
     *   - `images.domains` is deprecated in favour of `remotePatterns`
     */
    qualities: [75, 90],
    remotePatterns: [
      // Placeholder imagery during design. Agreement §5 makes sourcing real
      // media the Client's responsibility — remove this before launch.
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.crowd4test.com' },
    ],
  },

  /**
   * Single-origin API access.
   *
   * The browser never talks to the Express service directly — it calls
   * /api/v1/* on this origin and Next forwards it. That removes CORS entirely
   * and lets the auth cookies be same-origin, which is far less fragile than
   * coordinating COOKIE_DOMAIN across two hostnames.
   *
   * IMPORTANT: the API issues its refresh cookie with Path=/v1/auth. When
   * proxied through here the browser sees the path as /api/v1/auth, so the API
   * must be started with REFRESH_COOKIE_PATH=/api/v1/auth or the refresh cookie
   * will never be sent back. See web/README.md.
   */
  async rewrites() {
    const origin = process.env.API_ORIGIN ?? 'http://localhost:4000'
    return [{ source: '/api/v1/:path*', destination: `${origin}/v1/:path*` }]
  },

  async redirects() {
    return legacyRedirects()
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ]
  },

  /**
   * Type errors fail the build. Next 16 dropped the built-in `eslint` config
   * key along with `next lint`, so linting is a separate step — `npm run check`
   * locally and the CI job.
   */
  typescript: { ignoreBuildErrors: false },

  poweredByHeader: false,
}

export default nextConfig
