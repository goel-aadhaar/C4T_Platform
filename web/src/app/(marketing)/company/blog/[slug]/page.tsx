import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge, Button, CtaBanner, Section } from '@/components/ds'
import { DeepBand } from '@/components/sections/blocks'
import s from '@/components/sections/sections.module.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { DRAFT_METADATA, INCLUDE_DRAFTS } from '@/lib/content-visibility'
import { SITE_NAME } from '@/lib/seo/metadata'
import { breadcrumbJsonLd } from '@/lib/seo/structured-data'
import { env } from '@/lib/env'
import { CLOSING_CTA, getPost, visiblePosts } from '@/content'

const PREFIX = '/company/blog'

/**
 * A blog post.
 *
 * The route registry does NOT hold these — it is for the fixed IA, and posts are a
 * collection that changes without a code review of the routing. So metadata is
 * built from the post itself rather than `buildMetadata`, and the sitemap picks
 * them up from `publishedPosts()`.
 *
 * `dynamicParams = false`: a slug that is not in the collection 404s instead of
 * rendering an empty article shell.
 *
 * ⚠ DRAFTS. In production `visiblePosts(false)` returns only published posts, so
 * a draft generates no route at all and this file 404s it. On preview it renders
 * with a visible Draft badge and `noindex`. No post is published today — every
 * entry lacks a body — so in production this route currently generates nothing,
 * which is correct rather than broken.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return visiblePosts(INCLUDE_DRAFTS).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const url = new URL(`${PREFIX}/${slug}`, env.NEXT_PUBLIC_SITE_URL).toString()
  const isDraft = post.status === 'draft'

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      // `article`, not `website` — it carries the publication date, which is what
      // makes a post eligible for the news and article treatments.
      type: 'article',
      siteName: SITE_NAME,
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
    ...(isDraft ? DRAFT_METADATA : {}),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()
  // Belt and braces: `generateStaticParams` already excludes drafts in
  // production, but an explicit guard means a future switch to on-demand
  // rendering cannot leak one.
  if (post.status === 'draft' && !INCLUDE_DRAFTS) notFound()

  const isDraft = post.status === 'draft'

  return (
    <>
      {/* No `Article` JSON-LD on a draft: marking up an article with no body and
          no publication date is an assertion that is not true yet. The breadcrumb
          is safe either way. */}
      <JsonLd
        schema={
          isDraft
            ? breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Blog', path: PREFIX },
                { name: post.title, path: `${PREFIX}/${slug}` },
              ])
            : [
                articleJsonLd(
                  post.title,
                  post.excerpt,
                  `${PREFIX}/${slug}`,
                  post.date,
                  post.author,
                ),
                breadcrumbJsonLd([
                  { name: 'Home', path: '/' },
                  { name: 'Blog', path: PREFIX },
                  { name: post.title, path: `${PREFIX}/${slug}` },
                ]),
              ]
        }
      />

      <Section tone="inverse" className={s.deep} compact>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="c4t-eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
            {post.type}
          </span>
          {isDraft ? <Badge tone="warning">Draft — not published</Badge> : null}
          {post.date ? (
            <span
              className="c4t-eyebrow"
              style={{ color: 'var(--text-inverse-muted)', letterSpacing: '0.06em' }}
            >
              {formatDate(post.date)}
            </span>
          ) : null}
        </div>

        <h1
          className="c4t-display-lg"
          style={{
            margin: '20px 0 0',
            color: 'var(--text-inverse)',
            maxWidth: 900,
            textWrap: 'pretty',
          }}
        >
          {post.title}
        </h1>

        <p
          className="c4t-body-lg"
          style={{ margin: '24px 0 0', color: 'var(--text-inverse-muted)', maxWidth: 620 }}
        >
          {post.excerpt}
        </p>
      </Section>

      <Section>
        {/* `--container-prose` caps the measure at ~75ch, per the type rules.
            Long-form is the one place on this site where line length is the whole
            typographic problem. */}
        <div style={{ maxWidth: 'var(--container-prose)' }}>
          {post.body?.length ? (
            post.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="c4t-body-lg"
                style={{ margin: '0 0 24px', color: 'var(--text-primary)' }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="c4t-body-lg" style={{ margin: 0, color: 'var(--text-secondary)' }}>
              This post has no body yet. Add one to <code>content/blog.ts</code> and set its status
              to <code>published</code>.
            </p>
          )}

          <div style={{ marginTop: 'var(--space-9)' }}>
            <Button variant="secondary" iconLeft="arrow-left" href={PREFIX}>
              All posts
            </Button>
          </div>
        </div>
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}

/**
 * `en-GB` explicitly, not the server's locale. A build machine in another region
 * would otherwise silently reorder every date on the site.
 */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function articleJsonLd(
  title: string,
  description: string,
  path: string,
  date?: string,
  author?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: new URL(path, env.NEXT_PUBLIC_SITE_URL).toString(),
    datePublished: date,
    author: author
      ? { '@type': 'Person', name: author }
      : { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }
}
