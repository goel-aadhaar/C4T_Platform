import type { Metadata } from 'next'
import { Button, CtaBanner, FeatureCard, Hero, Section, SectionHeader } from '@/components/ds'
import { ChecklistGrid, DeepBand } from '@/components/sections/blocks'
import s from '@/components/sections/sections.module.css'
import { buildMetadata } from '@/lib/seo/metadata'
import { CLOSING_CTA, COMPANY_CTAS, COMPANY_SECTIONS, PARTNERS_PAGE } from '@/content'

const PATH = '/company/partners'

export const metadata: Metadata = buildMetadata(PATH)

/**
 * The partner programme, ported from `PartnersPage` in `design/site/pages.jsx`.
 *
 * No photograph in the source, so the hero is centred.
 */
export default function PartnersPage() {
  return (
    <>
      <Hero
        className={s.deep}
        tone="inverse"
        align="center"
        media={false}
        eyebrow={PARTNERS_PAGE.eyebrow}
        title={PARTNERS_PAGE.title}
        description={PARTNERS_PAGE.description}
        primaryCta={COMPANY_CTAS.partners.primary}
        primaryHref="/contact"
        secondaryCta={COMPANY_CTAS.partners.secondary}
        secondaryHref="/contact"
      />

      {/* ─── Partnership types ───────────────────────────────────────────── */}
      <Section>
        <SectionHeader {...COMPANY_SECTIONS.partnersTypes} />
        <div
          className="c4t-grid-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-grid-gap)',
            marginTop: 48,
          }}
        >
          {PARTNERS_PAGE.types.map((type) => (
            <FeatureCard
              key={type.title}
              icon={type.icon}
              title={type.title}
              description={type.description}
              style={{ background: 'var(--surface-sunken)' }}
            />
          ))}
        </div>
      </Section>

      {/* ─── What partners get ───────────────────────────────────────────── */}
      <Section tone="inverse" className={s.deep}>
        <SectionHeader tone="inverse" {...COMPANY_SECTIONS.partnersBenefits} />
        <ChecklistGrid
          items={PARTNERS_PAGE.benefits.map((label) => ({ label }))}
          columns={2}
          tone="inverse"
        />
        <div style={{ marginTop: 40 }}>
          <Button variant="inverse" iconRight="arrow-right" href="/contact">
            {COMPANY_CTAS.partners.primary}
          </Button>
        </div>
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}
