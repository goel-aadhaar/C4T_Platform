const { Hero, Section, SectionHeader, FeatureCard, ServiceCard, CaseStudyCard, StatBlock, LogoCloud, Testimonial, CtaBanner, CapabilitySection, ResourceCard, Button, Badge, Tag, Icon, Media } = window.Crowd4TestDesignSystem_772017;

const d = window.C4TH;
const go = () => { if (window.C4TGO) window.C4TGO("Contact"); };

/* Photography: Unsplash, used under the Unsplash Licence. Replace with owned photography before launch. */
function Photo({ src, alt, credit, ratio = "4 / 3", radius = 14, dark, style }) {
  return (
    <figure style={{ margin: 0, position: "relative", borderRadius: radius, overflow: "hidden", border: `1px solid ${dark ? "var(--border-inverse)" : "var(--border-default)"}`, background: dark ? "var(--surface-inverse-raised)" : "var(--surface-sunken)", ...style }}>
      <img src={src + "&w=1600&q=80&auto=format&fit=crop"} alt={alt} loading="lazy" style={{ display: "block", width: "100%", aspectRatio: ratio, objectFit: "cover" }} />
      <figcaption style={{ position: "absolute", left: 12, bottom: 12, font: "var(--fw-medium) 11px/1 var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", color: "var(--ink-50)", background: "rgb(23 19 15 / 0.62)", padding: "6px 8px", borderRadius: 4 }}>{credit}</figcaption>
    </figure>
  );
}

function Eyebrow({ children, dark }) {
  return <div className="c4t-eyebrow" style={{ color: dark ? "var(--text-inverse-muted)" : "var(--text-brand)" }}>{children}</div>;
}

function Chip({ children, dark }) {
  return <span style={{ font: "var(--fw-medium) 13px/1 var(--font-mono)", whiteSpace: "nowrap", color: dark ? "var(--text-inverse-muted)" : "var(--text-secondary)", border: `1px solid ${dark ? "var(--border-inverse)" : "var(--border-default)"}`, background: dark ? "var(--surface-inverse-raised)" : "transparent", borderRadius: 6, padding: "10px 13px" }}>{children}</span>;
}

function ResourceCarousel({ items, onPick }) {
  const [i, setI] = React.useState(0);
  const n = items.length;
  const step = (dir) => setI((v) => (v + dir + n) % n);
  const rel = (k) => { let r = k - i; if (r > n / 2) r -= n; if (r < -n / 2) r += n; return r; };
  return (
    <div style={{ marginTop: 48 }}>
      <div
        role="group" aria-roledescription="carousel" aria-label="Resources" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } }}
        style={{ position: "relative", height: 420, perspective: 1700, overflow: "hidden", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {items.map((r, k) => {
          const o = rel(k), a = Math.abs(o);
          return (
            <div key={r.title} aria-hidden={o !== 0} onClick={() => (o !== 0 ? setI(k) : onPick && onPick(r))}
              style={{
                position: "absolute", width: 340, transformStyle: "preserve-3d",
                transform: `translateX(${o * 255}px) rotateY(${o * -38}deg) scale(${1 - a * 0.14})`,
                opacity: a > 2 ? 0 : 1 - a * 0.28, zIndex: 10 - a,
                filter: a ? "brightness(0.82)" : "none",
                cursor: o === 0 ? "default" : "pointer",
                transition: "transform var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard), filter var(--duration-base) var(--ease-standard)",
                pointerEvents: a > 2 ? "none" : "auto",
              }}>
              <ResourceCard {...r} />
            </div>
          );
        })}
        <CarouselArrow dir={-1} onClick={() => step(-1)} />
        <CarouselArrow dir={1} onClick={() => step(1)} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {items.map((r, k) => (
          <button key={r.title} aria-label={`Show ${r.title}`} aria-current={k === i} onClick={() => setI(k)}
            style={{ width: k === i ? 22 : 8, height: 8, padding: 0, borderRadius: 999, border: "none", cursor: "pointer", background: k === i ? "var(--coral-500)" : "var(--ink-300)", transition: "width 200ms, background 200ms" }} />
        ))}
      </div>
    </div>
  );
}

function CarouselArrow({ dir, onClick }) {
  return (
    <button onClick={onClick} aria-label={dir < 0 ? "Previous resource" : "Next resource"}
      style={{ position: "absolute", [dir < 0 ? "left" : "right"]: 8, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 48, height: 48, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--surface-canvas)", border: "1px solid var(--border-default)", boxShadow: "var(--shadow-md)", color: "var(--text-primary)", cursor: "pointer" }}>
      <Icon name={dir < 0 ? "chevron-left" : "chevron-right"} size={20} />
    </button>
  );
}

const bentoCard = { background: "var(--ink-100)", borderColor: "var(--ink-200)" };

const STEP_MEDIA = [
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3", alt: "A QA lead mapping a release process with the team" },
  { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3", alt: "A tester validating a build on real hardware" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3", alt: "Release readiness metrics on a dashboard" },
];

function DeckCarousel({ items, render, width = 540, height = 540 }) {
  const [i, setI] = React.useState(0);
  const n = items.length;
  const step = (dir) => setI((v) => (v + dir + n) % n);
  const rel = (k) => { let r = k - i; if (r > n / 2) r -= n; if (r < -n / 2) r += n; return r; };
  return (
    <div style={{ marginTop: 48 }}>
      <div role="group" aria-roledescription="carousel" aria-label="Case studies" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } }}
        style={{ position: "relative", height, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {items.map((item, k) => {
          const o = rel(k), a = Math.abs(o);
          return (
            <div key={k} aria-hidden={o !== 0} onClick={() => o !== 0 && setI(k)}
              style={{
                position: "absolute", width, maxWidth: "100%",
                transform: `translateX(${o * 235}px) scale(${1 - a * 0.11})`,
                opacity: a > 2 ? 0 : 1 - a * 0.55, zIndex: 10 - a,
                cursor: o === 0 ? "default" : "pointer", pointerEvents: a > 2 ? "none" : "auto",
                transition: "transform var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard)",
              }}>
              {render(item, o === 0)}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 28, font: "var(--fw-semibold) 13px/1 var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
        <button onClick={() => step(-1)} aria-label="Previous case study" style={deckNavStyle}><Icon name="chevron-left" size={16} /></button>
        <span><span style={{ color: "var(--text-primary)" }}>{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}</span>
        <button onClick={() => step(1)} aria-label="Next case study" style={deckNavStyle}><Icon name="chevron-right" size={16} /></button>
      </div>
    </div>
  );
}
const deckNavStyle = { width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid var(--border-default)", background: "var(--surface-canvas)", color: "var(--text-primary)", cursor: "pointer", padding: 0 };

function HomePage({ t }) {
  const contrast = t.rhythm === "contrast";
  const deep = (cls) => (contrast ? "c4t-deep " + (cls || "") : cls || "");
  const T = (darkTone, lightTone) => (contrast ? darkTone : lightTone);
  const dk = contrast;

  return (
    <div>
      <Hero
        className={deep()}
        tone={T("inverse", "canvas")}
        eyebrow="AI-Powered Digital Quality Engineering"
        title="Ship AI and software your users can trust."
        description="We combine AI agents that test at machine speed with a vetted global community of human testers who catch what automation can't — wrong answers, broken journeys, cultural misfires and accessibility failures."
        primaryCta="Book a demo"
        secondaryCta="Start a pilot"
        bullets={["2-week pilot · Fixed scope", "Named QA lead on every engagement", "Results triaged in your Jira"]}
        trustLine="ISO/IEC 27001 · SOC 2 Type II · GDPR · DPDPA"
        onAction={go}
        media={<Photo dark={dk} ratio="4 / 3" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3" alt="An engineer running tests on a real device" credit="Placeholder · Unsplash licence" />}
      />

      <Section tone={T("inverse", "sunken")} compact className={contrast ? "c4t-edge" : ""}>
        <div className="c4t-eyebrow" style={{ textAlign: "center", color: dk ? "var(--text-inverse-muted)" : "var(--text-muted)" }}>Working with teams in</div>
        <div className="c4t-marquee" style={{ marginTop: 28 }}>
          <div className="c4t-marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="c4t-marquee-set" aria-hidden={dup === 1}>
                {["Fintech", "Healthcare", "Retail", "Gaming", "Telecom", "AI", "Media", "Travel", "Education"].map((s) => (
                  <span key={s} className="c4t-heading-md" style={{ color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)", whiteSpace: "nowrap" }}>{s}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sunken" className="c4t-airy">
        <StatBlock className="c4t-stats-5" stats={d.stats} columns={5} />
      </Section>

      <Section>
        <SectionHeader eyebrow="The problem" title="Software changed. Testing didn't keep up." description="Your team ships weekly. Your product now answers questions in natural language, calls tools, and behaves differently for every user. Traditional QA was built for deterministic software with predictable outputs. It doesn't fit any more." />
        <div className="c4t-bento" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr 1fr", gridAutoRows: "minmax(210px, auto)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          <FeatureCard {...d.problems[0]} style={{ ...bentoCard, gridColumn: "1", gridRow: "1 / 3", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} />
          <FeatureCard {...d.problems[1]} style={{ ...bentoCard, gridColumn: "2 / 4", gridRow: "1" }} />
          <FeatureCard {...d.problems[2]} style={{ ...bentoCard, gridColumn: "2", gridRow: "2" }} />
          <FeatureCard {...d.problems[3]} style={{ ...bentoCard, gridColumn: "3", gridRow: "2" }} />
        </div>
      </Section>

      <Section tone={T("inverse", "sunken")} className={deep()}>
        <SectionHeader tone={T("inverse", "default")} eyebrow="The approach" title="AI for speed. Humans for judgment." description="We run both in one workflow. AI agents generate test cases from your requirements, execute regression at scale, and triage the results. Human experts then validate everything AI can't reliably judge on its own — factual accuracy, tone, cultural fit, accessibility and whether the experience actually works for a real person." />
        <div style={{ display: "flex", flexDirection: "column", gap: 72, marginTop: 72 }}>
          {d.steps.map((s, idx) => {
            const flip = idx % 2 === 1;
            return (
              <div key={s.n} className="c4t-step-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
                <div style={{ order: flip ? 2 : 1 }}>
                  <Photo dark={dk} ratio="16 / 10" src={STEP_MEDIA[idx].src} alt={STEP_MEDIA[idx].alt} credit="Placeholder · Unsplash licence" />
                </div>
                <div style={{ order: flip ? 1 : 2, maxWidth: 460 }}>
                  <div style={{ font: "var(--fw-semibold) 13px/1 var(--font-mono)", letterSpacing: "0.12em", color: dk ? "var(--text-inverse-muted)" : "var(--text-brand)" }}>{s.n}</div>
                  <h3 className="c4t-heading-lg" style={{ margin: "16px 0 0", color: dk ? "var(--text-inverse)" : "var(--text-primary)", textWrap: "pretty" }}>{s.title}</h3>
                  <p className="c4t-body-md" style={{ margin: "14px 0 0", color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)" }}>{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 44 }}><Button variant={T("inverse", "secondary")} iconRight="arrow-right" onClick={go}>See how it works</Button></div>
      </Section>

      <Section>
        <SectionHeader eyebrow="AI Quality" title="Testing built for products that think." description="AI features fail in ways traditional QA was never designed to catch. We test the failure modes that matter." actions={<Button variant="secondary" iconRight="arrow-right" onClick={go}>Explore AI testing</Button>} />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {d.aiServices.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </Section>

      <Section tone="sunken">
        <SectionHeader eyebrow="Software Quality Engineering" title="The full QA stack, still." description="AI didn't replace the fundamentals. We cover them across web, mobile, API and desktop." actions={<Button variant="secondary" iconRight="arrow-right" onClick={go}>Explore all services</Button>} />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {d.qaServices.map((s) => <FeatureCard key={s.title} {...s} />)}
        </div>
      </Section>

      <CapabilitySection
        className={deep()}
        tone={T("inverse", "canvas")}
        eyebrow="The platform"
        title="One platform from test case to release decision."
        description="Everything runs in one place — AI generation, crowd execution, triage and reporting. Your team sees a single source of truth instead of five spreadsheets."
        capabilities={d.platform}
        media={<Photo dark={dk} ratio="4 / 3" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3" alt="Engineers triaging test results on screen" credit="Placeholder · Unsplash licence" />}
      />

      <Section tone={T("inverse", "canvas")} compact className={contrast ? "c4t-edge" : "c4t-edge-light"}>
        <div className="c4t-split-sticky" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <Eyebrow dark={dk}>AI use cases</Eyebrow>
            <h2 className="c4t-display-md" style={{ margin: "16px 0 0", color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>What we test.</h2>
            <div style={{ marginTop: 24 }}><Button variant={dk ? "inverse-ghost" : "link"} iconRight="arrow-right" onClick={go}>Explore all use cases</Button></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {d.useCases.map((u) => (dk ? <Chip key={u} dark>{u}</Chip> : <Tag key={u}>{u}</Tag>))}
          </div>
        </div>
      </Section>

      <div style={{ background: "var(--surface-sunken)" }}>
        <Photo dark={false} ratio="21 / 6" radius={0} src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3" alt="A quality engineering team reviewing findings together" credit="Placeholder · Unsplash licence" style={{ border: "none" }} />
      </div>

      <Section className="c4t-airy">
        <SectionHeader eyebrow="Industries" title="Depth where it matters." description="Regulated industries need testers who understand the domain, not just the app. We match clinicians to healthcare, finance professionals to BFSI, and native speakers to every market you launch in." actions={<Button variant="secondary" iconRight="arrow-right" onClick={go}>View all industries</Button>} />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, marginTop: 48, border: "1px solid var(--border-default)", borderRadius: 14, overflow: "hidden", background: "var(--surface-canvas)" }}>
          {d.industries.map((i) => (
            <div key={i.name} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 20px", borderRight: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
              <Icon name={i.icon} size={24} color="var(--coral-500)" />
              <div className="c4t-heading-sm" style={{ color: "var(--text-primary)", textWrap: "balance" }}>{i.name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone={T("inverse", "sunken")} className={deep()}>
        <SectionHeader tone={T("inverse", "default")} eyebrow="Customer stories" title="What teams say." />
        <div style={{ marginTop: 48 }}>
          <Testimonial tone={T("inverse", "canvas")} variant="feature" quote="Testimonial quote goes here — one to two sentences, ideally with a number in it. Use only real, attributable quotes with written consent." name="Name" role="Title" company="Company" />
        </div>
        <div style={{ marginTop: 56, paddingTop: 48, borderTop: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-default)"}` }}>
          <StatBlock className="c4t-stats-5 c4t-stats-3" tone={T("inverse", "canvas")} stats={d.results} columns={3} align="left" />
        </div>
      </Section>

      <Section tone="sunken">
        <SectionHeader eyebrow="Proof" title="Results, not adjectives." actions={<Button variant="secondary" iconRight="arrow-right" onClick={go}>View all case studies</Button>} />
        <DeckCarousel items={d.caseStudies} render={(c) => <CaseStudyCard {...c} />} />
      </Section>

      <Section tone={T("inverse", "canvas")} className={deep()}>
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-grid-gap)" }}>
          <div style={{ border: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-default)"}`, borderRadius: 14, padding: 40, background: dk ? "var(--surface-inverse-raised)" : "var(--surface-canvas)" }}>
            <h2 className="c4t-heading-lg" style={{ margin: 0, color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>Fits the tools you already use.</h2>
            <p className="c4t-body-md" style={{ margin: "12px 0 28px", color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)" }}>Bugs go where your team already works. No new dashboard to check.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.integrations.map((i) => <Chip key={i} dark={dk}>{i}</Chip>)}
            </div>
            <div style={{ marginTop: 28 }}><Button variant={dk ? "inverse-ghost" : "link"} iconRight="arrow-right" onClick={go}>See all integrations</Button></div>
          </div>
          <div style={{ border: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-default)"}`, borderRadius: 14, padding: 40, background: dk ? "var(--surface-inverse-raised)" : "var(--surface-canvas)" }}>
            <h2 className="c4t-heading-lg" style={{ margin: 0, color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>Enterprise-ready by default.</h2>
            <p className="c4t-body-md" style={{ margin: "12px 0 28px", color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)" }}>Certifications, access control and data residency, evidenced. Confirm each badge before launch.</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
              {d.trust.map((x) => (
                <li key={x} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon name="check" size={20} color={dk ? "var(--teal-100)" : "var(--teal-500)"} />
                  <span className="c4t-body-md" style={{ color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>{x}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 28 }}><Button variant={dk ? "inverse-ghost" : "link"} iconRight="arrow-right" onClick={go}>Read about our security</Button></div>
          </div>
        </div>
      </Section>

      <Section tone="sunken">
        <SectionHeader eyebrow="Resources" title="Learn how modern QA actually works." actions={<Button variant="secondary" iconRight="arrow-right" onClick={go}>View all resources</Button>} />
        <ResourceCarousel items={d.resources} />
      </Section>

      <div id="c4t-cta" className={deep()} style={{ position: "relative" }}>
        <CtaBanner
          tone="inverse"
          eyebrow="Ready when you are"
          title="Ready to ship with confidence?"
          description="Book a 30-minute call. We'll map your release process, show you where quality is leaking, and scope a pilot you can run on your next release."
          primaryCta="Book a demo"
          secondaryCta="Start a pilot"
          note="No commitment. No sales script. A QA engineer will be on the call."
          style={{ background: "transparent" }}
        />
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, C4TPhoto: Photo, C4TChip: Chip, C4TResourceCarousel: ResourceCarousel, C4TDeckCarousel: DeckCarousel });
