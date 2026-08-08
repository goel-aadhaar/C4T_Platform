import type { Metadata } from 'next'
import { Button, CtaBanner, Hero, Icon, Section, SectionHeader, Tag } from '@/components/ds'
import { DeepBand, TickList } from '@/components/sections/blocks'
import s from '@/components/sections/sections.module.css'
import { buildMetadata } from '@/lib/seo/metadata'
import { CLOSING_CTA, COMPANY_CTAS, COMPANY_SECTIONS, TRUST_PAGE } from '@/content'

const PATH = '/company/trust'

export const metadata: Metadata = buildMetadata(PATH)

/**
 * The trust centre, ported from `TrustPage` in `design/site/pages.jsx`.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠ THIS IS THE HIGHEST-RISK PAGE ON THE SITE.
 *
 * It is where a buyer's security reviewer goes, and the first panel asserts
 * ISO/IEC 27001:2022, SOC 2 Type II, GDPR and DPDPA alignment, and HIPAA-ready
 * workflows. Every one of those is checkable, and a customer can act on it — a
 * false certification claim on a trust page is a misrepresentation, not
 * marketing licence.
 *
 * The page renders what the handoff specifies so it can be reviewed whole. It
 * must NOT go live until the client supplies, for each line in the
 * Certifications panel, the certificate, audit report or DPA behind it. Delete
 * the ones without evidence; the other three panels describe practices and need
 * only confirmation.
 *
 * The "documentation available on request" chips are not links, deliberately —
 * none of those documents exists yet, and a link to a 404 on this page is worse
 * than no link.
 * ──────────────────────────────────────────────────────────────────────────
 */
export default function TrustPage() {
  return (
    <>
      <Hero
        className={s.deep}
        tone="inverse"
        align="center"
        media={false}
        eyebrow={TRUST_PAGE.eyebrow}
        title={TRUST_PAGE.title}
        description={TRUST_PAGE.description}
        primaryCta={COMPANY_CTAS.trust.primary}
        primaryHref="/contact"
        secondaryCta={COMPANY_CTAS.trust.secondary}
        secondaryHref="/contact"
      />

      {/* ─── The four panels ─────────────────────────────────────────────── */}
      <Section>
        <div
          className="c4t-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-grid-gap)',
          }}
        >
          {TRUST_PAGE.groups.map((group) => (
            <div
              key={group.title}
              style={{
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-panel)',
                padding: 40,
              }}
            >
              <Icon name={group.icon} size={24} style={{ color: 'var(--accent-base)' }} />
              <h2
                className="c4t-heading-lg"
                style={{ margin: '20px 0 24px', color: 'var(--text-primary)' }}
              >
                {group.title}
              </h2>
              <TickList items={group.items} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── On request ──────────────────────────────────────────────────── */}
      <Section tone="inverse" className={s.deep}>
        <SectionHeader tone="inverse" {...COMPANY_SECTIONS.trustDocs} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 40 }}>
          {TRUST_PAGE.docs.map((doc) => (
            <Tag key={doc} tone="inverse">
              {doc}
            </Tag>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Button variant="inverse" iconRight="arrow-right" href="/contact">
            {COMPANY_CTAS.trust.primary}
          </Button>
        </div>
      </Section>

      <DeepBand>
        <CtaBanner tone="inverse" style={{ background: 'transparent' }} {...CLOSING_CTA} />
      </DeepBand>
    </>
  )
}
