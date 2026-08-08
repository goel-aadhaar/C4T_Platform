import {
  Button,
  CtaBanner,
  FaqAccordion,
  FeatureCard,
  Hero,
  Section,
  SectionHeader,
  SiteImage,
  StatBlock,
  Tag,
} from '@/components/ds'
import { JsonLd } from '@/components/seo/JsonLd'
import { requireRoute } from '@/lib/seo/routes'
import { breadcrumbFor, faqJsonLd, serviceJsonLd } from '@/lib/seo/structured-data'
import { ChipGrid, DeepBand, TickList } from './blocks'
import s from './sections.module.css'
import {
  CLOSING_CTA,
  DELIVERY,
  DETAIL_FAQS,
  DETAIL_SECTIONS,
  FAMILIES,
  INCLUDED,
  INTEGRATIONS,
  PLACEHOLDER_CREDIT,
  detailIndex,
  getDetail,
  rotatedPhoto,
  siblingsOf,
  type FamilyKey,
} from '@/content'

export interface DetailPageProps {
  family: FamilyKey
  slug: string
}

/**
 * THE detail page. All 33 of them.
 *
 * CLAUDE.md rule 5: one `[slug]` template per family, generated from content.
 * This goes one step further than the rule requires — the three families share a
 * single body, because `design/site/detail.jsx` had one `DetailPage` driven by a
 * `FAMILIES` table and nothing about the AI, Services and Platform pages differs
 * structurally. The three route files under `app/(marketing)/<family>/[slug]/`
 * are four lines each and pass a family key.
 *
 * WHY THE PHOTOGRAPHY IS INDEXED. `detail.jsx` walked a six-photo pool by the
 * item's position in its family — `DPHOTOS[index % 6]` for the hero, then
 * `DPHOTOS[(index + i + 1) % 6]` for the three step rows — and flipped the step
 * layout on odd indices. Two consecutive pages in the same family therefore never
 * open with the same picture or the same left/right rhythm. It is a cheap trick
 * that stops 33 pages built from one template reading as 33 copies, so it is
 * reproduced exactly. Reordering a family's items in `content/details.ts`
 * reshuffles every page's imagery.
 *
 * WHAT IS SHARED WITH EVERY OTHER PAGE. The three delivery steps, the "what you
 * receive" list, the integrations chips, the FAQ and the closing band are the
 * same objects the homepage and hubs use. That is the point: one engagement
 * described once.
 */
export function DetailPage({ family: familyKey, slug }: DetailPageProps) {
  const family = FAMILIES[familyKey]
  const item = getDetail(familyKey, slug)

  // The route files call notFound() before rendering, so this is unreachable.
  // Kept as a type guard rather than a `!` so a future caller cannot skip it.
  if (!item) return null

  const index = detailIndex(familyKey, slug)
  const siblings = siblingsOf(familyKey, slug)
  const heroPhoto = rotatedPhoto(index)

  // Odd-indexed pages start their step rows with the image on the right, so
  // adjacent pages in a family alternate their whole rhythm, not just row 1.
  const altLayout = index % 2 === 1

  const path = `${family.base}/${slug}`

  return (
    <>
      {/* Three schemas per detail page:
          - Service, because that is what the page sells;
          - BreadcrumbList, so the SERP shows "crowd4test.com › Services › Crowd
            Testing" instead of a bare URL — the leaf uses the item's short title,
            not the long SEO one;
          - FAQPage, from the same four questions the accordion renders. Google
            requires the marked-up Q&A to be visible on the page, which it is. */}
      <JsonLd
        schema={[
          serviceJsonLd(requireRoute(path)),
          breadcrumbFor(path, item.title),
          faqJsonLd(DETAIL_FAQS.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      <Hero
        className={s.deep}
        tone="inverse"
        eyebrow={family.eyebrow}
        title={item.title}
        description={item.description}
        primaryCta="Book a demo"
        primaryHref="/contact"
        secondaryCta="Start a pilot"
        secondaryHref="/contact"
        media={
          <SiteImage
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            ratio="4 / 3"
            priority
            sizes="(max-width: 900px) 100vw, 45vw"
            caption={PLACEHOLDER_CREDIT}
          />
        }
      />

      {/* ─── Family stat band ────────────────────────────────────────────── */}
      <Section tone="sunken" compact>
        <StatBlock className={s.stats3} stats={family.stats} columns={3} />
      </Section>

      {/* ─── What we cover ───────────────────────────────────────────────── */}
      {item.chips.length ? (
        <Section>
          <SectionHeader
            eyebrow={DETAIL_SECTIONS.cover.eyebrow}
            title={family.coverTitle}
            description={family.coverDescription}
          />
          <ChipGrid items={item.chips} />
        </Section>
      ) : null}

      {/* ─── How we work ─────────────────────────────────────────────────── */}
      <Section tone="inverse" className={s.deep}>
        <SectionHeader tone="inverse" {...DETAIL_SECTIONS.delivery} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72, marginTop: 72 }}>
          {DELIVERY.map((step, i) => {
            const flip = altLayout ? i % 2 === 0 : i % 2 === 1
            const photo = rotatedPhoto(index + i + 1)
            return (
              <div key={step.n} className={s.stepRow}>
                <div style={{ order: flip ? 2 : 1 }}>
                  <SiteImage
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    ratio="16 / 10"
                    sizes="(max-width: 900px) 100vw, 50vw"
                    caption={PLACEHOLDER_CREDIT}
                  />
                </div>
                <div style={{ order: flip ? 1 : 2, maxWidth: 460 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--type-caption-size)',
                      fontWeight: 'var(--fw-semibold)',
                      letterSpacing: 'var(--type-eyebrow-tracking)',
                      color: 'var(--text-inverse-muted)',
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    className="c4t-heading-lg"
                    style={{ margin: '16px 0 0', color: 'var(--text-inverse)', textWrap: 'pretty' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="c4t-body-md"
                    style={{ margin: '14px 0 0', color: 'var(--text-inverse-muted)' }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ─── What you receive ────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div
          className="c4t-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          <div>
            <SectionHeader {...DETAIL_SECTIONS.received} />
            <TickList items={INCLUDED} style={{ marginTop: 36, gap: 14 }} />
          </div>

          <div
            style={{
              background: 'var(--surface-canvas)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-panel)',
              padding: 40,
            }}
          >
            <div className="c4t-eyebrow" style={{ color: 'var(--text-brand)' }}>
              {DETAIL_SECTIONS.integrations.eyebrow}
            </div>
            <h3
              className="c4t-heading-lg"
              style={{ margin: '16px 0 12px', color: 'var(--text-primary)' }}
            >
              {DETAIL_SECTIONS.integrations.title}
            </h3>
            <p
              className="c4t-body-md"
              style={{ margin: '0 0 24px', color: 'var(--text-secondary)' }}
            >
              {DETAIL_SECTIONS.integrations.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {INTEGRATIONS.map((name) => (
                <Tag key={name}>{name}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Related ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          eyebrow={DETAIL_SECTIONS.related.eyebrow}
          title={family.relatedTitle}
          actions={
            <Button variant="secondary" iconRight="arrow-right" href={family.base}>
              {family.hubCta}
            </Button>
          }
        />
        <div
          className="c4t-grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-grid-gap)',
            marginTop: 48,
          }}
        >
          {siblings.map((sibling) => (
            <FeatureCard
              key={sibling.slug}
              icon={sibling.icon}
              title={sibling.title}
              description={sibling.description}
              meta={family.eyebrow}
              href={`${family.base}/${sibling.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <Section tone="sunken">
        <SectionHeader {...DETAIL_SECTIONS.faq} />
        <div style={{ marginTop: 40, maxWidth: 860 }}>
          <FaqAccordion items={DETAIL_FAQS.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
        </div>
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}
