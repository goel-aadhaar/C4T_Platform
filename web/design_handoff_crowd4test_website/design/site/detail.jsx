const DDS = window.Crowd4TestDesignSystem_772017;
const { Hero: DHero, Section: DSection, SectionHeader: DSectionHeader, FeatureCard: DFeatureCard, ServiceCard: DServiceCard, StatBlock: DStatBlock, CtaBanner: DCtaBanner, FaqAccordion: DFaqAccordion, Button: DButton, Icon: DIcon } = DDS;

const DPHOTOS = [
  { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3", alt: "An engineer running tests on a real device" },
  { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3", alt: "Engineers triaging test results on screen" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3", alt: "A QA lead mapping a release process with the team" },
  { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3", alt: "A tester validating a build on real hardware" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3", alt: "Release readiness metrics on a dashboard" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3", alt: "A quality engineering team reviewing findings together" },
];

/* Every detail page is assembled from copy that already exists in content.md:
   the service line, its capability chips, the shared three-step delivery flow,
   the "what every engagement includes" list and the shared FAQ. */
const DELIVERY = window.C4TH.steps;
const INCLUDED = window.C4TP.services.included;

const DETAIL_FAQS = [
  { q: "How quickly can we start?", a: "A scoping call, then a written test strategy and fixed-price pilot scope, usually within a week. Execution starts once you sign off the scope." },
  { q: "Who runs the work?", a: "A named QA lead owns your engagement end to end. You talk to the person doing the work, not an account manager relaying messages." },
  { q: "Where do findings land?", a: "In your tracker — Jira, Linear, GitHub, GitLab or Azure DevOps — triaged, deduplicated and prioritised, with video, logs and reproduction steps attached." },
  { q: "Do we have to commit up front?", a: "No. Start with a two-week pilot on one release: fixed scope, fixed price. Annual commitments come with better rates and are a choice, not a requirement." },
];

function chipsOf(item) {
  if (item.points) return item.points;
  if (item.meta && typeof item.meta === "string") return item.meta.split("·").map((s) => s.trim()).filter(Boolean);
  return [];
}

function DetailPage({ item, family, siblings, go, index }) {
  const Photo = window.C4TPhoto, Chip = window.C4TChip;
  const chips = chipsOf(item);
  const photo = DPHOTOS[index % DPHOTOS.length];
  const altLayout = index % 2 === 1;
  return (
    <div>
      <DHero
        className="c4t-deep" tone="inverse"
        eyebrow={family.eyebrow}
        title={item.title}
        description={item.description}
        primaryCta="Book a demo" secondaryCta="Start a pilot"
        onAction={() => go("Contact")}
        media={<Photo dark ratio="4 / 3" src={photo.src} alt={photo.alt} credit="Placeholder · Unsplash licence" />}
      />

      <DSection tone="sunken" compact>
        <DStatBlock className="c4t-stats-5 c4t-stats-3" stats={family.stats} columns={3} />
      </DSection>

      {chips.length ? (
        <DSection>
          <DSectionHeader eyebrow="What we cover" title={family.coverTitle} description={family.coverDesc} />
          <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(chips.length, 4)}, 1fr)`, gap: "var(--space-grid-gap)", marginTop: 48 }}>
            {chips.map((c, i) => (
              <div key={c} style={{ background: "var(--ink-100)", border: "1px solid var(--ink-200)", borderRadius: 10, padding: 24 }}>
                <div style={{ font: "var(--fw-semibold) 12px/1 var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-brand)" }}>{String(i + 1).padStart(2, "0")}</div>
                <div className="c4t-heading-sm" style={{ marginTop: 16, color: "var(--text-primary)", textWrap: "balance" }}>{c}</div>
              </div>
            ))}
          </div>
        </DSection>
      ) : null}

      <DSection tone="inverse" className="c4t-deep">
        <DSectionHeader tone="inverse" eyebrow="How we work" title="Scope, execute, decide." description="The same three-step engagement on every programme. No discovery phase that bills for three months before anything gets tested." />
        <div style={{ display: "flex", flexDirection: "column", gap: 72, marginTop: 72 }}>
          {DELIVERY.map((s, i) => {
            const flip = altLayout ? i % 2 === 0 : i % 2 === 1;
            const ph = DPHOTOS[(index + i + 1) % DPHOTOS.length];
            return (
              <div key={s.n} className="c4t-step-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                <div style={{ order: flip ? 2 : 1 }}>
                  <Photo dark ratio="16 / 10" src={ph.src} alt={ph.alt} credit="Placeholder · Unsplash licence" />
                </div>
                <div style={{ order: flip ? 1 : 2, maxWidth: 460 }}>
                  <div style={{ font: "var(--fw-semibold) 13px/1 var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-inverse-muted)" }}>{s.n}</div>
                  <h3 className="c4t-heading-lg" style={{ margin: "16px 0 0", color: "var(--text-inverse)", textWrap: "pretty" }}>{s.title}</h3>
                  <p className="c4t-body-md" style={{ margin: "14px 0 0", color: "var(--text-inverse-muted)" }}>{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DSection>

      <DSection tone="sunken">
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <DSectionHeader eyebrow="What you receive" title="Evidence, not a status update." />
            <ul style={{ listStyle: "none", margin: "36px 0 0", padding: 0, display: "grid", gap: 14 }}>
              {INCLUDED.map((x) => (
                <li key={x} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <DIcon name="check" size={20} color="var(--teal-500)" />
                  <span className="c4t-body-md" style={{ color: "var(--text-primary)" }}>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "var(--surface-canvas)", border: "1px solid var(--border-default)", borderRadius: 14, padding: 40 }}>
            <div className="c4t-eyebrow" style={{ color: "var(--text-brand)" }}>Integrations</div>
            <h3 className="c4t-heading-lg" style={{ margin: "16px 0 12px", color: "var(--text-primary)" }}>Results land where your team already works.</h3>
            <p className="c4t-body-md" style={{ margin: "0 0 24px", color: "var(--text-secondary)" }}>No new dashboard to check. Bugs go to your tracker, runs trigger from your pipeline.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {window.C4TH.integrations.map((i) => <Chip key={i}>{i}</Chip>)}
            </div>
          </div>
        </div>
      </DSection>

      <DSection>
        <DSectionHeader eyebrow="Related" title={family.relatedTitle} actions={<DButton variant="secondary" iconRight="arrow-right" onClick={() => go(family.hubLabel)}>{family.hubCta}</DButton>} />
        <div className="c4t-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {siblings.slice(0, 6).map((s) => (
            <DFeatureCard key={s.title} icon={s.icon} title={s.title} description={s.description} meta={family.eyebrow} href="#" onClick={(e) => { e.preventDefault(); go(s.title); }} />
          ))}
        </div>
      </DSection>

      <DSection tone="sunken">
        <DSectionHeader eyebrow="FAQ" title="Questions we get asked." />
        <div style={{ marginTop: 40, maxWidth: 860 }}><DFaqAccordion items={DETAIL_FAQS} defaultOpen={0} /></div>
      </DSection>

      <div className="c4t-deep" style={{ position: "relative" }}>
        <DCtaBanner tone="inverse" style={{ background: "transparent" }}
          eyebrow="Ready when you are"
          title="Ready to ship with confidence?"
          description="Book a 30-minute call. We'll map your release process, show you where quality is leaking, and scope a pilot you can run on your next release."
          primaryCta="Book a demo" secondaryCta="Start a pilot"
          note="No commitment. No sales script. A QA engineer will be on the call."
          onAction={() => go("Contact")} />
      </div>
    </div>
  );
}

const FAMILIES = {
  ai: {
    eyebrow: "AI Quality", hubLabel: "AI Testing", hubCta: "All AI testing",
    stats: window.C4TP.aiTesting.stats,
    coverTitle: "The failure modes we test for.",
    coverDesc: "Scoped to your product, graded against a rubric your domain experts wrote — not a generic checklist.",
    relatedTitle: "Other AI quality services.",
    items: window.C4TH.aiServices.concat(window.C4TD.ai),
  },
  qa: {
    eyebrow: "Quality Engineering", hubLabel: "Services", hubCta: "All services",
    stats: [window.C4TH.stats[0], window.C4TH.stats[1], window.C4TH.stats[2]],
    coverTitle: "What's in scope.",
    coverDesc: "Coverage agreed up front, executed on real devices in the markets you actually serve.",
    relatedTitle: "Other QA services.",
    items: window.C4TH.qaServices.concat(window.C4TD.qa),
  },
  platform: {
    eyebrow: "The Platform", hubLabel: "Platform", hubCta: "Platform overview",
    stats: [window.C4TH.stats[3], window.C4TH.stats[2], window.C4TH.stats[4]],
    coverTitle: "How the module works.",
    coverDesc: "Every automated step has a human checkpoint before anything reaches your backlog.",
    relatedTitle: "Other platform modules.",
    items: window.C4TH.platform.concat(window.C4TD.platform),
  },
};

/* Nav labels → the item they describe. Sub-links use the service name, so match on it. */
const DETAIL_INDEX = (() => {
  const map = {};
  const alias = {
    "GenAI & LLM Testing": "GenAI & LLM Testing", "AI Agent Testing": "AI Agent Testing",
    "Chatbot Testing": "Chatbot & Conversational AI", "Voice AI Testing": "Voice AI Testing",
    "RAG Evaluation": "RAG Evaluation", "Red Teaming & AI Safety": "Red Teaming & AI Safety",
    "Bias & Fairness Testing": "Bias & Fairness Testing", "Model Monitoring": "Model Monitoring",
    "Crowd Testing": "Crowd Testing", "Test Automation": "Test Automation",
    "Functional Testing": "Functional Testing", "Performance Testing": "Performance Engineering",
    "Security Testing": "Security Testing", "Accessibility Testing": "Accessibility Testing",
    "Localization Testing": "Localization Testing", "Payment Testing": "Payment Testing",
    "AI Test Generation": "AI Test Case Generator", "AI Data Collection": "AI Data Collection",
    "Mobile App Testing": "Mobile App Testing", "Web App Testing": "Web App Testing", "API Testing": "API Testing",
    "Usability Testing": "Usability Testing", "Compatibility & Device Testing": "Compatibility & Device Testing",
    "Game Testing": "Game Testing", "IoT, AR & VR Testing": "IoT, AR & VR Testing",
    "Device Cloud": "Device Cloud", "Integrations": "Integrations", "Security & Compliance": "Security & Compliance", "AI Exploratory Agents": "AI Exploratory Agents",
    "AI Bug Triage": "AI Bug Triage", "Regression Optimizer": "Regression Optimizer",
    "Release Readiness Score": "Release Readiness Score", "Analytics & Reporting": "Analytics & Reporting",
  };
  Object.keys(FAMILIES).forEach((key) => {
    FAMILIES[key].items.forEach((item, i) => { map[item.title] = { key, i }; });
  });
  Object.keys(alias).forEach((navLabel) => {
    const target = map[alias[navLabel]];
    if (target) map[navLabel] = target;
  });
  return map;
})();

function detailFor(label, go) {
  const hit = DETAIL_INDEX[label];
  if (!hit) return null;
  const family = FAMILIES[hit.key];
  const item = family.items[hit.i];
  const siblings = family.items.filter((_, i) => i !== hit.i).slice(0, 6);
  return <DetailPage item={item} family={family} siblings={siblings} go={go} index={hit.i} />;
}

Object.assign(window, { detailFor, DETAIL_INDEX });
