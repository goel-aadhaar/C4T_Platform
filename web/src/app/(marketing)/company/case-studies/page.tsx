import type { Metadata } from 'next'
import { CaseStudyCard, CtaBanner, Section, StatBlock } from '@/components/ds'
import { DeepBand } from '@/components/sections/blocks'
import { Carousel } from '@/components/sections/Carousel'
import s from '@/components/sections/sections.module.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo/metadata'
import { breadcrumbFor } from '@/lib/seo/structured-data'
import { INCLUDE_DRAFTS } from '@/lib/content-visibility'
import {
  CASE_STUDIES_INDEX,
  CLOSING_CTA,
  RESULTS,
  assertPublishedCaseStudiesAreReal,
  visibleCaseStudies,
} from '@/content'

const PATH = '/company/case-studies'

export const metadata: Metadata = buildMetadata(PATH)

/**
 * The case-study index, ported from `CaseStudiesPage` in `design/site/pages.jsx`.
 *
 * The prototype used the deck carousel here rather than a grid, and kept the
 * three-across results band underneath. Both are preserved — the carousel because
 * a case study is a story you step through rather than scan, and the band because
 * it is the page's summary claim.
 *
 * ⚠ EMPTY IN PRODUCTION TODAY. Every entry in `content/case-studies.ts` is a
 * draft holding the handoff's placeholder values. content.md §12.3 requires every
 * metric to trace to delivery data and every named client to have given written
 * approval, so nothing here can be published without that paperwork.
 */
export default function CaseStudiesIndexPage() {
  // Fails the build if a study was flipped to published with "00%" still in it.
  assertPublishedCaseStudiesAreReal()

  const studies = visibleCaseStudies(INCLUDE_DRAFTS)

  return (
    <>
      <JsonLd schema={breadcrumbFor(PATH, 'Case studies')} />

      <Section tone="inverse" className={s.deep} compact>
        <div className="c4t-eyebrow" style={{ color: 'var(--text-inverse-muted)' }}>
          {CASE_STUDIES_INDEX.eyebrow}
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
          {CASE_STUDIES_INDEX.title}
        </h1>
        <p
          className="c4t-body-lg"
          style={{ margin: '24px 0 0', color: 'var(--text-inverse-muted)', maxWidth: 620 }}
        >
          {CASE_STUDIES_INDEX.description}
        </p>
      </Section>

      <Section>
        {studies.length ? (
          <Carousel
            variant="deck"
            label="Case studies"
            itemNoun="case study"
            slides={studies.map((study) => (
              <CaseStudyCard
                key={study.slug}
                client={study.client}
                industry={study.industry}
                headline={study.headline}
                results={study.results}
                href={`${PATH}/${study.slug}`}
              />
            ))}
          />
        ) : (
          <p className="c4t-body-lg" style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {CASE_STUDIES_INDEX.emptyState}
          </p>
        )}
      </Section>

      {/* ⚠ These three outcome figures are unverified — see RESULTS in
          content/home.ts. They render here as they do on the homepage. */}
      <Section tone="sunken" compact>
        <StatBlock className={s.stats3} stats={RESULTS} columns={3} />
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}
