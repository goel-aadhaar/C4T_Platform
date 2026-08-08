import type { IconName } from '@/components/ds'
import type { SectionCopy } from './home'

/**
 * Company section content, ported from `design/site/detaildata.js`
 * (`window.C4TD.company`) — About, Careers, Partners and Trust.
 *
 * Blog and Case Studies are the other two Company routes; they are index pages
 * over MDX and content collections rather than fixed copy, so they arrive in
 * step 9 with their own modules.
 *
 * PATH NOTE. The prototype had no URLs at all, and content.md's sitemap put
 * Trust at `/trust` and the blog at `/resources/blog`. The handoff README's
 * route map — which is the one being built — puts all six under `/company/*`,
 * and `lib/seo/redirects.ts` already sends legacy traffic there.
 */

export interface Belief {
  icon: IconName
  title: string
  description: string
}

/* ─── /company/about ───────────────────────────────────────────────────────── */

export const ABOUT_PAGE = {
  eyebrow: 'About us',
  title: 'We believe quality is a human judgment, assisted by machines.',
  description:
    'Founded in 2015 and headquartered in Bengaluru, Crowd4Test helps enterprises ship software and AI products they can stand behind.',

  /**
   * Two paragraphs. Stored as an array rather than a `\n\n` string so the page
   * maps over real <p> elements — the source's embedded newlines would
   * otherwise need splitting at render time.
   */
  why: [
    'Crowd4Test started in 2015 with a straightforward observation: the people best placed to find problems in software are people who resemble the people who’ll use it. Test labs are clean, fast and homogeneous. The real world is none of those things.',
    'Since then the problem has changed shape. Software now generates its own answers, and those answers are wrong in ways no assertion can catch. So we built the AI side of our platform — not to replace the human judgment we started with, but to give it reach. AI covers thousands of cases in minutes. People decide which failures actually matter.',
  ] as readonly string[],

  beliefs: [
    {
      icon: 'scale',
      title: "AI can't grade its own homework",
      description:
        "Automated evaluation shares the blind spots of the models it evaluates. Human review isn't a nice-to-have on AI products; it's the control.",
    },
    {
      icon: 'globe',
      title: 'Real conditions beat clean conditions',
      description:
        "The bug is on a mid-range phone in a market you've never visited, on a network that drops packets.",
    },
    {
      icon: 'users',
      title: 'People are the control',
      description: 'Automation scales the work. Humans decide what the work meant.',
    },
    {
      icon: 'eye',
      title: 'Evidence over assertion',
      description:
        "If we can't show you the run, the reviewer and the timestamp, we don't claim it.",
    },
  ] satisfies readonly Belief[],
} as const

/* ─── /company/careers ─────────────────────────────────────────────────────── */

export interface Role {
  title: string
  team: string
  location: string
  type: string
}

export const CAREERS_PAGE = {
  eyebrow: 'Careers',
  title: 'Build the quality layer for AI-era software.',
  description:
    "We're a small team with unusually large reach — a platform, a global community, and enterprise clients who depend on both.",

  how: [
    {
      icon: 'globe',
      title: 'Remote-friendly',
      description: 'Remote-friendly with a Bengaluru hub.',
    },
    {
      icon: 'users',
      title: 'Small teams, real ownership',
      description: 'Small teams with real ownership of the work they ship.',
    },
    {
      icon: 'handshake',
      title: 'Direct client contact',
      description: 'Direct client contact from day one, not after two years.',
    },
    {
      icon: 'message-square',
      title: 'We say what we found',
      description: 'We say what we found — internally too.',
    },
  ] satisfies readonly Belief[],

  /**
   * ⚠ NOT REAL. Four rows of "Role title / Function / Location / Type". The
   * source's own note says to replace them before launch, and the Service
   * Agreement puts open roles behind the backend. Until then the page renders
   * the empty state below instead of a table of nothing.
   */
  roles: [] as readonly Role[],

  emptyState: 'No open roles right now. Open roles are listed here as they come up.',

  nothingFits:
    "Nothing that fits? Send us something anyway. If you're good at what you do, tell us what you'd want to work on.",

  email: 'careers@crowd4test.com',

  testerNote:
    'Looking to test with us instead? Our tester community is separate from our staff team.',
} as const

/* ─── /company/partners ────────────────────────────────────────────────────── */

export const PARTNERS_PAGE = {
  eyebrow: 'Partner program',
  title: 'Partner with us.',
  description:
    'If your clients ship software or AI products, quality is a gap you can close without building a QA practice.',

  types: [
    {
      icon: 'share-2',
      title: 'Referral',
      description: 'Introduce us, we handle delivery, you earn commission.',
    },
    {
      icon: 'briefcase',
      title: 'Agency & consultancy',
      description: 'White-label or co-delivered QA as part of your engagements.',
    },
    {
      icon: 'plug',
      title: 'Technology',
      description: 'Integrate with our platform via API, webhooks or MCP.',
    },
    {
      icon: 'store',
      title: 'Reseller',
      description: 'Sell Crowd4Test under a commercial agreement in your market.',
    },
  ] satisfies readonly Belief[],

  benefits: [
    'Dedicated partner manager',
    'Deal registration and protection',
    'Co-marketing support',
    'Technical enablement and training',
    'Priority delivery slots',
  ] as readonly string[],
} as const

/* ─── /company/trust ───────────────────────────────────────────────────────── */

export interface TrustGroup {
  title: string
  icon: IconName
  items: readonly string[]
}

export const TRUST_PAGE = {
  eyebrow: 'Trust & security',
  title: 'Security is a precondition, not a feature.',
  description:
    "You're giving an external partner access to unreleased software. Here's exactly how we handle that.",

  /**
   * ⚠ THE CERTIFICATIONS GROUP IS THE HIGHEST-RISK COPY ON THE SITE. A trust
   * page is precisely where a buyer's security reviewer looks, and every line
   * in that first group is a checkable assertion. Publish none of them without
   * the certificate, audit report or DPA in hand. The other three groups
   * describe practices and need only the Client's confirmation.
   */
  groups: [
    {
      title: 'Certifications',
      icon: 'badge-check',
      items: [
        'ISO/IEC 27001:2022',
        'SOC 2 Type II',
        'GDPR aligned',
        'India DPDPA aligned',
        'HIPAA-ready workflows for healthcare engagements',
      ],
    },
    {
      title: 'Tester vetting',
      icon: 'user-check',
      items: [
        'Identity verification',
        'Signed NDA before any project access',
        'Background checks for restricted-tier engagements',
        'Ongoing quality and conduct scoring',
        'Immediate removal on any breach',
        'Restricted pools for sensitive products',
      ],
    },
    {
      title: 'Platform controls',
      icon: 'lock',
      items: [
        'Encryption in transit and at rest',
        'Role-based access control',
        'SSO and SAML',
        'Full audit logging',
        'Configurable data retention and deletion',
        'Regional data residency options',
        'Environment isolation per client',
        'Least-privilege access for our own staff',
      ],
    },
    {
      title: 'Product protection',
      icon: 'shield-check',
      items: [
        'Watermarked builds',
        'Device-level install restrictions',
        'Screenshot and recording controls where supported',
        'Time-limited access',
        'Revocation on project close',
        'No client data used for model training, ever',
      ],
    },
  ] satisfies readonly TrustGroup[],

  /** Documents available on request. None are linked — they do not exist yet. */
  docs: [
    'Security whitepaper',
    'Penetration test summary',
    'DPA and sub-processor list',
    'Business continuity plan',
    'Insurance certificates',
  ] as readonly string[],
} as const

/* ─── Section headers ──────────────────────────────────────────────────────── */

/**
 * Header copy for the Company page sections, transcribed verbatim from
 * `design/site/pages.jsx` where it sat inline as JSX props.
 *
 * The hero CTA labels are here too, because they differ per page and none of
 * them is the generic "Book a demo": Trust asks for security documentation,
 * Careers points at open roles, Partners asks you to become one.
 */
export const COMPANY_SECTIONS = {
  aboutWhy: {
    eyebrow: 'Why we exist',
    title: 'The real world is not a test lab.',
  },
  aboutBeliefs: {
    eyebrow: 'What we believe',
    title: "Four positions we won't trade away.",
  },
  aboutProof: {
    eyebrow: 'Proof',
    title: 'Results, not adjectives.',
    action: { label: 'All case studies', href: '/company/case-studies' },
  },
  careersHow: {
    eyebrow: 'How we work',
    title: 'Four things that are true here.',
  },
  careersRoles: {
    eyebrow: 'Open roles',
    title: "Where we're hiring.",
  },
  partnersTypes: {
    eyebrow: 'Partnership types',
    title: 'Four ways to work together.',
  },
  partnersBenefits: {
    eyebrow: 'What partners get',
    title: "Support that isn't just a logo on a page.",
  },
  trustDocs: {
    eyebrow: 'On request',
    title: 'Documentation available on request.',
  },
} as const satisfies Record<string, SectionCopy>

/** Hero CTA pairs, per page. All land on /contact. */
export const COMPANY_CTAS = {
  about: { primary: 'Book a demo', secondary: 'Start a pilot' },
  careers: { primary: 'See open roles', secondary: 'Talk to an engineer' },
  partners: { primary: 'Become a partner', secondary: 'Talk to an expert' },
  trust: { primary: 'Request security documentation', secondary: 'Talk to an expert' },
} as const

/**
 * The two closing panels on the Careers page. Headings are transcribed from
 * `pages.jsx`; the bodies come from CAREERS_PAGE above.
 */
export const CAREERS_PANELS = {
  nothingFits: { title: 'Nothing that fits?' },
  becomeATester: {
    title: 'Looking to test with us instead?',
    cta: 'Become a tester',
    /**
     * The prototype sent this to Contact. There is no tester-signup route in the
     * README map — content.md's `/testers` section was cut — so it stays on
     * Contact rather than pointing at a redirect.
     */
    href: '/contact',
  },
} as const
