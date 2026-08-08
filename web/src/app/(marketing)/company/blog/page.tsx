import type { Metadata } from 'next'
import { CtaBanner, ResourceCard, Section } from '@/components/ds'
import { DeepBand } from '@/components/sections/blocks'
import s from '@/components/sections/sections.module.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbFor } from '@/lib/seo/structured-data'
import { INCLUDE_DRAFTS } from '@/lib/content-visibility'
import { BLOG_INDEX, CLOSING_CTA, assertPublishedPostsHaveBodies, visiblePosts } from '@/content'

const PATH = '/company/blog'

export const metadata: Metadata = buildMetadata(PATH)

/**
 * The blog index, ported from `BlogPage` in `design/site/pages.jsx`.
 *
 * The hero is a compact dark band with just an eyebrow and an h1 — no split, no
 * photograph. That is the prototype's shape for both collection index pages, and
 * it is right: the cards below are the content, so the header should get out of
 * the way.
 *
 * ⚠ THE GRID IS EMPTY IN PRODUCTION TODAY. No post has a body, so every entry in
 * `content/blog.ts` is a draft. On preview and locally the drafts are listed so
 * they can be reviewed; in production the empty state shows instead. Neither
 * state is a bug — see the note at the top of `content/blog.ts`.
 */
export default function BlogIndexPage() {
  // Runs on every blog URL, since they all load through this segment. Fails the
  // build if a post was flipped to published without a body.
  assertPublishedPostsHaveBodies()

  const posts = visiblePosts(INCLUDE_DRAFTS)

  return (
    <>
      <JsonLd schema={breadcrumbFor(PATH, 'Blog')} />

      <Section tone="inverse" className={s.deep} compact>
        <div className="c4t-eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
          {BLOG_INDEX.eyebrow}
        </div>
        <h1
          className="c4t-display-xl"
          style={{
            margin: '20px 0 0',
            color: 'var(--text-inverse)',
            maxWidth: 900,
            textWrap: 'pretty',
          }}
        >
          {BLOG_INDEX.title}
        </h1>
        <p
          className="c4t-body-lg"
          style={{ margin: '24px 0 0', color: 'var(--text-inverse-muted)', maxWidth: 620 }}
        >
          {BLOG_INDEX.description}
        </p>
      </Section>

      <Section>
        {posts.length ? (
          <div
            className="c4t-grid-4"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-grid-gap)',
            }}
          >
            {posts.map((post) => (
              <ResourceCard
                key={post.slug}
                type={post.type}
                title={post.title}
                description={post.excerpt}
                date={post.date}
                readTime={post.readTime}
                author={post.author}
                href={`${PATH}/${post.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="c4t-body-lg" style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {BLOG_INDEX.emptyState}
          </p>
        )}
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}
