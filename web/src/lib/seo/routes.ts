import { assertFamiliesMatchRoutes, type FamilyKey } from '@/content/details'
import { STATS } from '@/content/stats'

/**
 * The route registry — the single source of truth for every marketing URL.
 *
 * Drives: page metadata, sitemap.xml, `generateStaticParams` for the templated
 * route families, and the JSON-LD builders. Adding a page means adding one entry
 * here; nothing else needs to know about it.
 *
 * Titles and descriptions are transcribed from content.md §17.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * SCOPE. This registry follows the handoff README's route map, NOT content.md's
 * sitemap. The two disagree, and the README is the later document:
 *
 *  - content.md ships copy for `/industries/*` and `/solutions/*`. Both were cut
 *    from the navigation late in design, and CLAUDE.md rule 10 bars building
 *    them. Absent here.
 *  - content.md put a `/resources` hub over blog, case studies, guides,
 *    webinars, a glossary and an ROI calculator, plus a `/testers/*` section.
 *    The README's map has neither. The two pages worth keeping — the blog and
 *    case studies — moved under `/company`, which is where the nav points.
 *  - `/book-a-demo` and `/start-a-pilot` were separate conversion pages. The
 *    README makes `/contact` the single destination and the prototype sent both
 *    CTAs there, so they are redirects in `redirects.ts`, not pages.
 *  - `/trust` moved to `/company/trust`, matching the nav.
 *
 * Legal routes are not in the README's map either, but they are linked from the
 * footer bottom bar (content.md §3.3) and two legacy redirects land on them, so
 * they stay.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type RouteGroup =
  'core' | 'convert' | 'ai-testing' | 'services' | 'platform' | 'company' | 'legal' | 'app'

export interface RouteDef {
  /** Absolute path, no trailing slash. */
  path: string
  /** Page title WITHOUT the " | Crowd4Test" suffix — the builder appends it. */
  title: string
  description: string
  group: RouteGroup
  /** Sitemap priority, 0–1. Omit for the default. */
  priority?: number
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean
}

export const ROUTES: readonly RouteDef[] = [
  // ─── Core ──────────────────────────────────────────────────────────────────
  {
    path: '/',
    title: 'AI Testing & Crowd Testing Services',
    description: `Validate AI apps, web, mobile and APIs with AI agents plus a vetted global community of expert testers. Real devices, real users, ${STATS.countries} countries.`,
    group: 'core',
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description:
      'Flexible pricing for AI testing and QA. Start with a fixed-price pilot, scale to a dedicated team.',
    group: 'core',
    priority: 0.9,
  },

  // ─── Conversion ────────────────────────────────────────────────────────────
  // One destination, not three. `/book-a-demo` and `/start-a-pilot` redirect
  // here; both CTA labels are still used, they just land on the same page.
  {
    path: '/contact',
    title: 'Contact Crowd4Test',
    description:
      'Get in touch about testing services, partnerships, press or support. We reply within one business day.',
    group: 'convert',
    priority: 0.7,
  },

  // ─── AI Testing ────────────────────────────────────────────────────────────
  {
    path: '/ai-testing',
    title: 'AI Testing Services — LLM, Agent & GenAI Validation',
    description: `End-to-end AI quality: hallucination detection, agent testing, red teaming, bias evaluation and drift monitoring, with human experts in ${STATS.languages} languages.`,
    group: 'ai-testing',
    priority: 0.9,
  },
  {
    path: '/ai-testing/genai-llm-testing',
    title: 'GenAI & LLM Testing Services',
    description: `Test LLM applications for accuracy, hallucination, consistency and safety. Human-graded evaluation plus automated scoring across ${STATS.languages} languages.`,
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/ai-agent-testing',
    title: 'AI Agent Testing Services',
    description:
      'Test AI agents end to end — planning, tool calls, error recovery, multi-agent handoffs and MCP servers.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/chatbot-testing',
    title: 'Chatbot Testing Services — Conversational AI QA',
    description:
      'Test chatbots for intent coverage, context retention, tone, escalation and multilingual quality with real users.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/voice-ai-testing',
    title: 'Voice AI Testing — Speech Recognition QA',
    description:
      'Test voice AI with real accents, real background noise and real devices. Wake-word accuracy, transcription quality and barge-in.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/rag-evaluation',
    title: 'RAG Evaluation Services',
    description:
      'Evaluate RAG pipelines for retrieval precision, grounding, citation accuracy and index freshness.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/red-teaming',
    title: 'AI Red Teaming Services',
    description:
      'Human-led adversarial testing — jailbreaks, prompt injection, data exfiltration, toxicity and misuse, ranked by exploitability.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/bias-and-fairness-testing',
    title: 'AI Bias & Fairness Testing',
    description:
      'Measure AI output quality across demographic, linguistic and regional slices with native speakers and domain experts.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/model-monitoring',
    title: 'AI Model Monitoring & Drift Detection',
    description:
      'Continuous post-launch AI evaluation. Detect drift, quality regressions and emerging failures before users complain.',
    group: 'ai-testing',
  },
  {
    path: '/ai-testing/ai-data-collection',
    title: 'AI Training Data Collection & Annotation',
    description: `Human-sourced and labelled training data — text, speech, image, video — across ${STATS.languages} languages and ${STATS.countries} countries.`,
    group: 'ai-testing',
  },

  // ─── Services ──────────────────────────────────────────────────────────────
  {
    path: '/services',
    title: 'Software Testing Services — QA Engineering',
    description: `Functional, automation, performance, security, accessibility, localization and payment testing on ${STATS.devices} real devices.`,
    group: 'services',
    priority: 0.9,
  },
  {
    path: '/services/crowd-testing',
    title: 'Crowd Testing Services — Real Users, Real Devices',
    description: `Test with ${STATS.testers} vetted testers on ${STATS.devices} real devices across ${STATS.countries} countries, on real networks.`,
    group: 'services',
  },
  {
    path: '/services/functional-testing',
    title: 'Functional Testing Services — Manual & Exploratory QA',
    description:
      'Structured, exploratory and regression testing across web, mobile and desktop, run by experienced QA engineers.',
    group: 'services',
  },
  {
    path: '/services/test-automation',
    title: 'Test Automation Services — Playwright, Selenium, Appium',
    description:
      'Build, run and maintain automation suites in your framework, with CI/CD integration and AI-assisted maintenance.',
    group: 'services',
  },
  {
    path: '/services/mobile-app-testing',
    title: 'Mobile App Testing Services — iOS & Android QA',
    description: `Test iOS and Android apps on ${STATS.devices} real devices across ${STATS.countries} countries — functional, performance and network testing.`,
    group: 'services',
  },
  {
    path: '/services/web-app-testing',
    title: 'Web Application Testing — Cross-Browser QA',
    description:
      'Cross-browser, responsive, functional and performance testing on real browsers and real machines.',
    group: 'services',
  },
  {
    path: '/services/api-testing',
    title: 'API Testing Services — REST, GraphQL & Contract Testing',
    description:
      'Functional, contract, security and performance testing for REST, GraphQL and gRPC APIs, integrated into CI.',
    group: 'services',
  },
  {
    path: '/services/performance-testing',
    title: 'Performance Testing — Load, Stress & Scalability',
    description:
      'Find your breaking point before your users do, with actionable bottleneck analysis and a capacity model.',
    group: 'services',
  },
  {
    path: '/services/security-testing',
    title: 'Application Security Testing — OWASP & VAPT',
    description:
      'OWASP-aligned application and API security testing with reproducible findings and remediation guidance.',
    group: 'services',
  },
  {
    path: '/services/accessibility-testing',
    title: 'Accessibility Testing — WCAG 2.2, ADA & Section 508',
    description:
      'Automated scanning plus manual testing with assistive technology users, and a prioritised remediation roadmap.',
    group: 'services',
  },
  {
    path: '/services/localization-testing',
    title: `Localization Testing — In-Market QA in ${STATS.languages} Languages`,
    description:
      'Native speakers in-market validate translation, layout, formats, payments and cultural fit.',
    group: 'services',
  },
  {
    path: '/services/payment-testing',
    title: 'Payment Testing — Real Cards & Local Methods',
    description:
      'Test checkout with real payment instruments in every market — UPI, cards, wallets, 3DS, refunds and failure paths.',
    group: 'services',
  },
  {
    path: '/services/usability-testing',
    title: 'Usability Testing — UX Research with Real Users',
    description:
      'Moderated and unmoderated sessions with users matched to your audience. See where people hesitate and give up.',
    group: 'services',
  },
  {
    path: '/services/compatibility-testing',
    title: 'Compatibility Testing — Device, Browser & OS Coverage',
    description: `Validate across ${STATS.devices} real devices, browsers and operating systems, including regional models.`,
    group: 'services',
  },
  {
    path: '/services/game-testing',
    title: 'Game Testing Services — Mobile, PC & Console QA',
    description:
      'Functional, compatibility, multiplayer and localization testing by testers who play the genre.',
    group: 'services',
  },
  {
    path: '/services/iot-and-ar-vr-testing',
    title: 'IoT, AR & VR Testing — Connected Device QA',
    description:
      'Test connected devices, wearables and immersive experiences in real homes and real environments.',
    group: 'services',
  },

  // ─── Platform ──────────────────────────────────────────────────────────────
  {
    path: '/platform',
    title: 'AI Testing Platform — Generation, Triage & Release Scoring',
    description:
      'One platform for AI test generation, crowd execution, bug triage, regression optimization and release scoring.',
    group: 'platform',
    priority: 0.9,
  },
  {
    path: '/platform/ai-test-generation',
    title: 'AI Test Case Generator',
    description:
      'Generate executable test cases from PRDs, user stories, Jira, Figma and API specs, reviewed by QA engineers.',
    group: 'platform',
  },
  {
    path: '/platform/ai-exploratory-agents',
    title: 'AI Exploratory Testing Agents',
    description:
      'AI agents explore your app like curious users, surfacing defects scripted suites never reach.',
    group: 'platform',
  },
  {
    path: '/platform/ai-bug-triage',
    title: 'AI Bug Triage & Deduplication',
    description:
      'Automatically deduplicate, categorise, score and route defects so your team reads signal, not noise.',
    group: 'platform',
  },
  {
    path: '/platform/regression-optimizer',
    title: 'AI Regression Test Optimization',
    description:
      "Risk-based test selection cuts regression time while holding coverage of what's actually at risk.",
    group: 'platform',
  },
  {
    path: '/platform/release-readiness-score',
    title: 'Release Readiness Score',
    description:
      'One score backed by quality, risk and coverage evidence, so release decisions rest on data.',
    group: 'platform',
  },
  {
    path: '/platform/analytics',
    title: 'QA Analytics & Reporting Dashboard',
    description:
      'Test runs, pass rates, coverage by device and country, defect distribution and release health in one dashboard.',
    group: 'platform',
  },
  {
    path: '/platform/device-cloud',
    title: `Real Device Cloud — ${STATS.devices} Devices, ${STATS.countries} Countries`,
    description:
      "Real devices in real locations, with local SIMs and real networks a data-centre farm can't provide.",
    group: 'platform',
  },
  {
    path: '/platform/integrations',
    title: 'Integrations — Jira, GitHub, Slack & More',
    description:
      'Connect to your tracker, CI pipeline and chat. Bugs land where your team already works, with two-way sync.',
    group: 'platform',
  },
  {
    path: '/platform/security',
    title: 'Security & Compliance',
    description:
      "How we protect your data, unreleased products and users' privacy — certifications, controls and tester vetting.",
    group: 'platform',
  },

  // ─── Company ───────────────────────────────────────────────────────────────
  // Six routes, per the README map. `/company` itself is not a page — the nav
  // and the redirect table both point at `/company/about`.
  {
    path: '/company/about',
    title: 'About Crowd4Test — AI-Powered Quality Engineering',
    description:
      'Founded in 2015 in Bengaluru, combining AI agents with a vetted global tester community.',
    group: 'company',
    priority: 0.7,
  },
  {
    path: '/company/careers',
    title: 'Careers at Crowd4Test — Open Roles',
    description:
      'Join a team building the quality layer for AI-era software. Engineering, delivery, community and sales roles.',
    group: 'company',
  },
  {
    path: '/company/partners',
    title: 'Partner Program',
    description:
      'Referral, reseller, agency and technology partnerships for teams who need a quality layer they can trust.',
    group: 'company',
  },
  {
    path: '/company/trust',
    title: 'Trust Centre — Security, Privacy & Compliance',
    description:
      'Our security certifications, privacy practices, sub-processors and compliance documentation in one place.',
    group: 'company',
  },
  {
    path: '/company/blog',
    title: 'Blog — AI Testing & Quality Engineering',
    description:
      'Practical writing on AI testing, crowd testing, automation and quality engineering.',
    group: 'company',
    changeFrequency: 'daily',
  },
  {
    path: '/company/case-studies',
    title: 'Customer Case Studies',
    description:
      'How teams in fintech, healthcare, retail, media and AI ship faster with fewer escaped defects.',
    group: 'company',
  },

  // ─── Legal ─────────────────────────────────────────────────────────────────
  {
    path: '/legal/terms',
    title: 'Terms of Use',
    description: 'The terms governing use of the Crowd4Test platform and services.',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/legal/privacy',
    title: 'Privacy Policy',
    description: 'How Crowd4Test collects, uses and protects personal data.',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/legal/cookies',
    title: 'Cookie Policy',
    description: 'The cookies this site uses and how to control them.',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/legal/dpa',
    title: 'Data Processing Agreement',
    description: 'Our DPA and the sub-processors we rely on.',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/legal/accessibility-statement',
    title: 'Accessibility Statement',
    description: 'Our conformance level, known gaps, and how to report an accessibility barrier.',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
] as const

// ─── Lookups ─────────────────────────────────────────────────────────────────

const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]))

export function getRoute(path: string): RouteDef | undefined {
  return BY_PATH.get(path)
}

/** Throws rather than silently rendering a page with no metadata. */
export function requireRoute(path: string): RouteDef {
  const route = BY_PATH.get(path)
  if (!route) {
    throw new Error(
      `No route registered for "${path}". Add it to src/lib/seo/routes.ts before creating the page.`,
    )
  }
  return route
}

/**
 * Child slugs of a templated family, e.g. slugsUnder('/services') → the 15
 * service pages. Used by `generateStaticParams`; the hub itself is excluded.
 */
export function slugsUnder(prefix: string): string[] {
  return ROUTES.filter((r) => r.path.startsWith(`${prefix}/`))
    .map((r) => r.path.slice(prefix.length + 1))
    .filter((slug) => !slug.includes('/'))
}

export function indexableRoutes(): RouteDef[] {
  return ROUTES.filter((r) => !r.noindex)
}

// ─── Consistency ─────────────────────────────────────────────────────────────

/**
 * Two lists describe the same 33 detail pages: the registered paths here, which
 * carry the SEO metadata, and the items in `content/details.ts`, which carry the
 * copy. Nothing structural forces them to agree — a page can be registered with
 * no content, or written with no metadata, and either way the failure surfaces
 * as a 404 or an untitled page in production rather than at build time.
 *
 * So they are checked against each other on module load. `routes.ts` is imported
 * by every page, `sitemap.ts` and the metadata builder, so this runs during
 * `next build` and fails it.
 */
const FAMILY_PREFIX: Record<FamilyKey, string> = {
  ai: '/ai-testing',
  services: '/services',
  platform: '/platform',
}

assertFamiliesMatchRoutes({
  ai: slugsUnder(FAMILY_PREFIX.ai),
  services: slugsUnder(FAMILY_PREFIX.services),
  platform: slugsUnder(FAMILY_PREFIX.platform),
})
