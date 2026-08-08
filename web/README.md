# Crowd4Test Platform — Web

Next.js 16 frontend: the public marketing site plus the authenticated Customer, Tester and Admin portals.

**Status: scaffolded. No design implemented yet.**

Every route resolves, every redirect works, metadata and sitemap are generated, and the auth plumbing is wired. What's missing on purpose is the visual layer — that arrives from Claude Design and replaces `src/components/scaffold.tsx`.

---

## Quick start

```bash
cd web
cp .env.example .env        # defaults work for local development
npm install
npm run dev                 # http://localhost:3000
```

The API must be running for anything under `/app`:

```bash
cd ../api && npm run dev    # http://localhost:4000
```

---

## Stack

| Concern    | Choice                                   | Note                                                                                     |
| ---------- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.3, App Router                 | `middleware.ts` is now `proxy.ts` — see below                                            |
| React      | 19.2                                     |                                                                                          |
| Styling    | Tailwind CSS 4                           | CSS-first. **There is no `tailwind.config.js`** — the theme is `@theme` in `globals.css` |
| Language   | TypeScript, strict                       |                                                                                          |
| API access | `fetch` wrapper over the Express service | Same-origin via a rewrite                                                                |

---

## Two things that will bite you

### 1. `proxy.ts` is not the auth boundary

Next 16 renamed `middleware.ts` to `proxy.ts` and moved it to the Node runtime. More importantly, Next's own docs say a matcher change can silently remove coverage and that auth must be verified inside each layout, page and Server Function regardless.

For this platform there's a second, stronger reason: **auth is stateful**. A signed token proves only that the API minted it — never that the session behind it is still live. Only the API can answer that.

So:

- `src/proxy.ts` does a **cookie-presence check only**, purely to spare signed-out visitors a pointless round trip. It decodes nothing and proves nothing.
- `requireUser()` in [src/lib/auth/session.ts](src/lib/auth/session.ts) is the real boundary. It asks the API. Call it in every protected layout, page and Server Action.

A layout does not re-run on client-side navigation within its segment, so **Server Actions must call `requireUser()` themselves** rather than assuming the layout vouched for the caller.

### 2. The refresh cookie path

The API scopes its refresh cookie to `Path=/v1/auth`. The browser reaches the API through this app's `/api/v1/*` rewrite, so it sees the response as coming from `/api/v1/auth/…` and will only send that cookie back on `/v1/auth` — a path that doesn't exist on this origin.

Symptom: login appears to work, then every refresh 401s forever.

Fix — start the API with:

```
REFRESH_COOKIE_PATH=/api/v1/auth
```

The alternative is to drop the rewrite and serve the API from `api.crowd4test.com` with `COOKIE_DOMAIN=.crowd4test.com`. That works too, but reintroduces CORS.

---

## The route registry

[src/lib/seo/routes.ts](src/lib/seo/routes.ts) is the single source of truth for all 78 marketing URLs. It drives page metadata, `sitemap.xml`, `generateStaticParams`, and later the navigation menus.

**Adding a page = adding one entry.** Then `npm run routes:generate` scaffolds the file.

Every claim-bearing number lives in one `STATS` object at the top of that file. content.md flags all of them as ⚠ VERIFY, so when the real figures arrive it is a single edit rather than a search across 78 descriptions.

### Templated vs individual routes

Families that genuinely share a template render through one `[slug]/page.tsx` with `generateStaticParams`:

```
/ai-testing/[slug]    /services/[slug]     /platform/[slug]
/industries/[slug]    /solutions/[slug]    /legal/[slug]
```

`dynamicParams = false`, so an unregistered slug 404s rather than rendering an empty shell that Google might index as a soft 404.

Genuinely distinct pages (resources, company, testers, the conversion pages) each have their own file.

---

## Scripts

| Command                           | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `npm run dev`                     | Dev server                                           |
| `npm run build`                   | Production build                                     |
| `npm start`                       | Serve the build                                      |
| `npm run check`                   | format:check + lint + typecheck — same three CI runs |
| `npm run lint` / `lint:fix`       | ESLint                                               |
| `npm run format` / `format:check` | Prettier                                             |
| `npm run typecheck`               | `tsc --noEmit`                                       |
| `npm run routes:generate`         | Scaffold pages for registry entries that have none   |
| `npm run verify:build`            | Assert every registry route produced HTML            |

`verify:build` guards a quiet failure: a route in the registry with no page behind it still appears in `sitemap.xml`, so you'd submit a URL to Google that serves a 404. Nothing in `next build` complains about that.

---

## Layout

```
web/
├── src/
│   ├── proxy.ts                    cookie-presence redirects ONLY
│   ├── app/
│   │   ├── layout.tsx              fonts, skip link, JSON-LD
│   │   ├── globals.css             ← DESIGN TOKEN SLOT
│   │   ├── page.tsx                homepage
│   │   ├── sitemap.ts / robots.ts  generated from the registry
│   │   ├── (marketing)/            78 public routes
│   │   ├── (auth)/                 login, register, reset…
│   │   └── app/                    authenticated portals
│   ├── components/
│   │   └── scaffold.tsx            ← DELETE when the design lands
│   └── lib/
│       ├── env.ts                  validated, fails fast
│       ├── api/
│       │   ├── client.ts           browser fetch, refresh-and-retry
│       │   ├── server.ts           Server Components, forwards cookies
│       │   └── types.ts            response envelope + domain unions
│       ├── auth/session.ts         THE authorization boundary
│       └── seo/
│           ├── routes.ts           the 78-route registry
│           ├── metadata.ts         registry → Next Metadata
│           ├── redirects.ts        24 legacy redirects
│           └── structured-data.ts  JSON-LD builders
└── scripts/
    ├── generate-routes.ts
    └── verify-build.ts
```

---

## When the design arrives

1. **Tokens first.** Replace the `@theme` block in [src/app/globals.css](src/app/globals.css). Use semantic names (`--color-surface-raised`, not `--color-gray-100`) — the literal name becomes a lie the first time the value changes.
2. **Primitives by hand.** Build ~25 base components in `src/components/ui/`. Don't generate these; you want to own them, and Code Connect needs them to exist first.
3. **Then pages.** Replace `<Scaffold />` route by route. The copy for each is already written in [content.md](../content.md).
4. **Delete `scaffold.tsx`** when the last route is done.

### Two things not to break

`layout.tsx` has a **skip link** (WCAG 2.4.1) and `globals.css` has a **`:focus-visible` outline**. The viewport deliberately omits `maximum-scale=1` because disabling pinch-zoom fails WCAG 1.4.4.

This company sells accessibility testing. An inaccessible site is a sales problem, not just a compliance one.

---

## Redirects

24 legacy paths from the old PascalCase SPA, in [src/lib/seo/redirects.ts](src/lib/seo/redirects.ts). Each emits both its original casing and a lowercase variant, because `source` matching is case-sensitive and an inbound link to `/aboutus` would otherwise 404.

`permanent: true` emits **308, not 301**. Google treats them identically for ranking and 308 additionally preserves the HTTP method. If an audit demands a literal 301, swap `permanent` for `statusCode: 301` — the two are mutually exclusive.

Verified working against a production build:

```
/AI                 → 308 /ai-testing
/aboutus            → 308 /company
/Termsandcontion    → 308 /legal/terms
/blog/:slug*        → 308 /resources/blog/:slug*
```

---

## Deployment

AWS Amplify per Agreement §2.7. Environment variables to set there:

| Variable                  | Value                        |
| ------------------------- | ---------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | `https://www.crowd4test.com` |
| `NEXT_PUBLIC_ENVIRONMENT` | `production`                 |
| `API_ORIGIN`              | The EC2 API origin           |

**`NEXT_PUBLIC_ENVIRONMENT` matters more than it looks.** Anything other than `production` sets `robots.txt` to disallow everything and marks pages `noindex`. That's deliberate — a preview deployment that Google indexes creates duplicate content competing with the real site.

---

## Not done yet

- No design, by instruction
- No content pipeline — pages read titles from the registry, not body copy. Still to decide: MDX vs CMS vs Postgres
- No forms. Demo and contact submissions have nowhere to go yet, and that is the single most important gap for a lead-generation site
- No analytics, and no cookie banner to gate it
- No `opengraph-image.tsx` — `ogImageFor()` returns a fallback
- No tests
