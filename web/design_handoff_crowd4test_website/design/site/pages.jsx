const DS = window.Crowd4TestDesignSystem_772017;
const { Hero: PHero, Section: PSection, SectionHeader: PSectionHeader, FeatureCard: PFeatureCard, ServiceCard: PServiceCard, StatBlock: PStatBlock, CtaBanner: PCtaBanner, PricingTable: PPricingTable, FaqAccordion: PFaqAccordion, ContactForm: PContactForm, Button: PButton, Icon: PIcon, Tag: PTag, Testimonial: PTestimonial } = DS;

const p = window.C4TP;
const home = window.C4TH;

function PageShell({ children }) { return <div>{children}</div>; }

function PageHero({ data, dk, onAction }) {
  const Photo = window.C4TPhoto;
  return (
    <PHero
      className={dk ? "c4t-deep" : ""}
      tone={dk ? "inverse" : "canvas"}
      eyebrow={data.eyebrow}
      title={data.title}
      description={data.description}
      primaryCta={data.primary}
      secondaryCta={data.secondary}
      onAction={onAction}
      media={data.photo ? <Photo dark={dk} ratio="4 / 3" src={data.photo.src} alt={data.photo.alt} credit="Placeholder · Unsplash licence" /> : false}
      align={data.photo ? "split" : "center"}
    />
  );
}

function NumberedRows({ items, dk, labelKey = "n" }) {
  return (
    <div style={{ display: "grid", gap: 0, marginTop: 48, borderTop: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-default)"}` }}>
      {items.map((s) => (
        <div key={s[labelKey]} className="c4t-numrow" style={{ display: "grid", gridTemplateColumns: "160px 260px 1fr", gap: 32, padding: "28px 0", borderBottom: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-default)"}`, alignItems: "start" }}>
          <div style={{ font: "var(--fw-semibold) 13px/1.4 var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: dk ? "var(--text-inverse-muted)" : "var(--text-brand)" }}>{s[labelKey]}</div>
          <div className="c4t-heading-sm" style={{ color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>{s.title || ""}</div>
          <p className="c4t-body-md" style={{ margin: 0, color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

function ChecklistGrid({ items, dk, columns = 2 }) {
  return (
    <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "20px 48px", marginTop: 44 }}>
      {items.map((it) => {
        const [head, tail] = Array.isArray(it) ? it : [it, null];
        return (
          <div key={head} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 20, borderBottom: `1px solid ${dk ? "var(--border-inverse)" : "var(--border-subtle)"}` }}>
            <PIcon name="check" size={20} color={dk ? "var(--teal-100)" : "var(--teal-500)"} />
            <div>
              <div className="c4t-heading-sm" style={{ color: dk ? "var(--text-inverse)" : "var(--text-primary)" }}>{head}</div>
              {tail ? <p className="c4t-body-sm" style={{ margin: "6px 0 0", color: dk ? "var(--text-inverse-muted)" : "var(--text-secondary)" }}>{tail}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClosingCta({ go }) {
  return (
    <div className="c4t-deep" style={{ position: "relative" }}>
      <PCtaBanner tone="inverse" style={{ background: "transparent" }}
        eyebrow="Ready when you are"
        title="Ready to ship with confidence?"
        description="Book a 30-minute call. We'll map your release process, show you where quality is leaking, and scope a pilot you can run on your next release."
        primaryCta="Book a demo" secondaryCta="Start a pilot"
        note="No commitment. No sales script. A QA engineer will be on the call."
        onAction={() => go("Contact")} />
    </div>
  );
}

function AiTestingPage({ go }) {
  const d = p.aiTesting;
  return (
    <PageShell>
      <PageHero data={{ ...d, photo: { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3", alt: "Reviewers grading model output against a rubric" } }} dk onAction={() => go("Contact")} />
      <PSection tone="sunken" compact><PStatBlock className="c4t-stats-5 c4t-stats-3" stats={d.stats} columns={3} /></PSection>
      <PSection>
        <PSectionHeader eyebrow="Why it matters" title={d.whyTitle} />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {d.why.map((w) => <PFeatureCard key={w.title} {...w} style={{ background: "var(--ink-100)", borderColor: "var(--ink-200)" }} />)}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="What we test" title="Coverage across the AI stack." />
        <ChecklistGrid items={d.coverage} dk />
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="How we do it" title="Rubrics, not vibes." />
        <NumberedRows items={d.method} />
      </PSection>
      <PSection>
        <PSectionHeader eyebrow="Services" title="Every AI failure mode, covered." actions={<PButton variant="secondary" iconRight="arrow-right" onClick={() => go("Contact")}>Talk to an AI expert</PButton>} />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {home.aiServices.map((s) => <PServiceCard key={s.title} {...s} />)}
        </div>
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="FAQ" title="Questions we get asked." />
        <div style={{ marginTop: 40, maxWidth: 860 }}><PFaqAccordion items={d.faqs} defaultOpen={0} /></div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function ServicesPage({ go }) {
  const d = p.services;
  return (
    <PageShell>
      <PageHero data={{ ...d, photo: { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3", alt: "A tester validating a build on real hardware" } }} dk onAction={() => go("Contact")} />
      <PSection>
        <PSectionHeader eyebrow="Choose by need" title="Core QA, delivered by people who do it every day." description="Fifteen services across web, mobile, API and desktop. Pick the ones your release actually needs." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {home.qaServices.map((s) => <PFeatureCard key={s.title} {...s} style={{ background: "var(--ink-100)", borderColor: "var(--ink-200)" }} />)}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="Engagement models" title="Four ways to work with us." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {d.models.map((m) => <PFeatureCard key={m.title} {...m} tone="inverse" />)}
        </div>
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="Always included" title="What every engagement includes." />
        <ChecklistGrid items={d.included} columns={3} />
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function PlatformPage({ go }) {
  const d = p.platform;
  return (
    <PageShell>
      <PageHero data={{ ...d, photo: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3", alt: "Release readiness metrics on a dashboard" } }} dk onAction={() => go(d.secondary === "See pricing" ? "Pricing" : "Contact")} />
      <PSection>
        <PSectionHeader eyebrow="How the pieces fit" title="Five stages, one pipeline." />
        <NumberedRows items={d.flow.map((f) => ({ n: f.n, body: f.body }))} />
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="Modules" title="Everything in the platform." actions={<PButton variant="secondary" iconRight="arrow-right" onClick={() => go("Contact")}>Book a demo</PButton>} />
        <div className="c4t-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {home.platform.map((f) => <PFeatureCard key={f.title} {...f} />)}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <PSectionHeader tone="inverse" eyebrow="Integrations" title="Built to fit your stack" description={d.stack} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
              {home.integrations.map((i) => <window.C4TChip key={i} dark>{i}</window.C4TChip>)}
            </div>
          </div>
          <div>
            <PSectionHeader tone="inverse" eyebrow="Security" title="Enterprise controls" />
            <ul style={{ listStyle: "none", margin: "32px 0 0", padding: 0, display: "grid", gap: 12 }}>
              {d.security.map((s) => (
                <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <PIcon name="check" size={20} color="var(--teal-100)" />
                  <span className="c4t-body-md" style={{ color: "var(--text-inverse)" }}>{s}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 28 }}><PButton variant="inverse-ghost" iconRight="arrow-right" onClick={() => go("Contact")}>Read about security</PButton></div>
          </div>
        </div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function IndustriesPage({ go }) {
  const d = p.industries, s = d.spotlight;
  return (
    <PageShell>
      <PageHero data={d} dk onAction={() => go("Contact")} />
      <PSection>
        <PSectionHeader eyebrow="Ten industries" title="Depth where it matters." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, marginTop: 48, border: "1px solid var(--border-default)", borderRadius: 14, overflow: "hidden", background: "var(--surface-canvas)" }}>
          {home.industries.map((i) => (
            <div key={i.name} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 20px", borderRight: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
              <PIcon name={i.icon} size={24} color="var(--coral-500)" />
              <div className="c4t-heading-sm" style={{ color: "var(--text-primary)", textWrap: "balance" }}>{i.name}</div>
            </div>
          ))}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow={s.eyebrow} title={s.title} description={s.description} />
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, marginTop: 56, alignItems: "start" }}>
          <div>
            <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>What we test</div>
            <ChecklistGrid items={s.tests} dk columns={1} />
          </div>
          <div>
            <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>Compliance context</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
              {s.compliance.map((c) => <window.C4TChip key={c} dark>{c}</window.C4TChip>)}
            </div>
            <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)", marginTop: 40 }}>Who tests your product</div>
            <p className="c4t-body-md" style={{ margin: "16px 0 0", color: "var(--text-inverse-muted)" }}>{s.who}</p>
          </div>
        </div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function PricingPage({ go }) {
  const d = p.pricing;
  return (
    <PageShell>
      <PageHero data={d} dk onAction={() => go("Contact")} />
      <PSection>
        <PSectionHeader eyebrow="How pricing works" title="Two components, so you only pay for what you use." />
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {d.components.map((c) => <PFeatureCard key={c.title} {...c} style={{ background: "var(--ink-100)", borderColor: "var(--ink-200)" }} />)}
        </div>
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="Plans" title="Start on one release." />
        <div style={{ marginTop: 48 }}>
          <PPricingTable plans={d.plans} note="Prices are scoped per engagement. A 30-minute call gets you a real figure, usually within two business days." onSelect={() => go("Contact")} />
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="Always included" title="What's always included." />
        <ChecklistGrid items={d.always} dk columns={2} />
      </PSection>
      <PSection>
        <PSectionHeader eyebrow="Pricing FAQ" title="The questions procurement asks." />
        <div style={{ marginTop: 40, maxWidth: 860 }}><PFaqAccordion items={d.faqs} defaultOpen={0} /></div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function ContactPage({ go }) {
  const d = p.contact;
  return (
    <PageShell>
      <PSection tone="inverse" className="c4t-deep">
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>{d.eyebrow}</div>
            <h1 className="c4t-display-xl" style={{ margin: "20px 0 0", color: "var(--text-inverse)", textWrap: "pretty" }}>{d.title}</h1>
            <p className="c4t-body-lg" style={{ margin: "24px 0 0", color: "var(--text-inverse-muted)", maxWidth: 520 }}>{d.description}</p>
            <div style={{ marginTop: 48 }}>
              <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>What happens on the call</div>
              <div style={{ marginTop: 8 }}><NumberedRows items={d.agenda} dk /></div>
              <p className="c4t-body-sm" style={{ margin: "24px 0 0", color: "var(--text-inverse-muted)" }}>{d.note}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 40 }}>
              {d.trust.map((t) => <window.C4TChip key={t} dark>{t}</window.C4TChip>)}
            </div>
          </div>
          <div style={{ background: "var(--surface-canvas)", borderRadius: 14, padding: 40, border: "1px solid var(--border-default)" }}>
            <PContactForm title="Book my demo" description="We reply within one business day. We won't add you to a drip sequence." submitLabel="Book my demo" />
          </div>
        </div>
      </PSection>
    </PageShell>
  );
}

function AboutPage({ go }) {
  const a = window.C4TD.company.about;
  const Photo = window.C4TPhoto;
  return (
    <PageShell>
      <PageHero data={{ ...a, primary: "Book a demo", secondary: "Start a pilot", photo: { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3", alt: "The Crowd4Test team reviewing findings together" } }} dk onAction={() => go("Contact")} />
      <PSection tone="sunken" compact><PStatBlock className="c4t-stats-5" stats={home.stats} columns={5} /></PSection>
      <PSection>
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <PSectionHeader eyebrow="Why we exist" title="The real world is not a test lab." />
          <div>{a.why.split("\n\n").map((para) => <p key={para.slice(0, 24)} className="c4t-body-lg" style={{ margin: "0 0 20px", color: "var(--text-secondary)" }}>{para}</p>)}</div>
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="What we believe" title="Four positions we won't trade away." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {a.beliefs.map((b) => <PFeatureCard key={b.title} {...b} tone="inverse" />)}
        </div>
      </PSection>
      <PSection tone="sunken">
        <PSectionHeader eyebrow="Proof" title="Results, not adjectives." actions={<PButton variant="secondary" iconRight="arrow-right" onClick={() => go("Case Studies")}>All case studies</PButton>} />
        <window.C4TDeckCarousel items={home.caseStudies} render={(c) => <DDSCaseStudyCard {...c} />} />
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}
const DDSCaseStudyCard = DS.CaseStudyCard;

function TrustPage({ go }) {
  const t = window.C4TD.company.trust;
  return (
    <PageShell>
      <PageHero data={{ ...t, primary: "Request security documentation", secondary: "Talk to an expert" }} dk onAction={() => go("Contact")} />
      <PSection>
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-grid-gap)" }}>
          {t.groups.map((g) => (
            <div key={g.title} style={{ background: "var(--ink-100)", border: "1px solid var(--ink-200)", borderRadius: 14, padding: 40 }}>
              <PIcon name={g.icon} size={24} color="var(--coral-500)" />
              <h3 className="c4t-heading-lg" style={{ margin: "20px 0 24px", color: "var(--text-primary)" }}>{g.title}</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {g.items.map((i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <PIcon name="check" size={20} color="var(--teal-500)" />
                    <span className="c4t-body-md" style={{ color: "var(--text-primary)" }}>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="On request" title="Documentation available on request." />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 40 }}>
          {t.docs.map((x) => <window.C4TChip key={x} dark>{x}</window.C4TChip>)}
        </div>
        <div style={{ marginTop: 40 }}><PButton variant="inverse" iconRight="arrow-right" onClick={() => go("Contact")}>Request security documentation</PButton></div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function BlogPage({ go }) {
  return (
    <PageShell>
      <PSection tone="inverse" className="c4t-deep" compact>
        <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>Blog</div>
        <h1 className="c4t-display-xl" style={{ margin: "20px 0 0", color: "var(--text-inverse)", maxWidth: 900, textWrap: "pretty" }}>Learn how modern QA actually works.</h1>
      </PSection>
      <PSection>
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)" }}>
          {home.resources.map((r) => <DS.ResourceCard key={r.title} {...r} />)}
        </div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function CaseStudiesPage({ go }) {
  return (
    <PageShell>
      <PSection tone="inverse" className="c4t-deep" compact>
        <div className="c4t-eyebrow" style={{ color: "var(--text-inverse-muted)" }}>Proof</div>
        <h1 className="c4t-display-xl" style={{ margin: "20px 0 0", color: "var(--text-inverse)", maxWidth: 900, textWrap: "pretty" }}>Results, not adjectives.</h1>
      </PSection>
      <PSection>
        <window.C4TDeckCarousel items={home.caseStudies} render={(c) => <DS.CaseStudyCard {...c} />} />
      </PSection>
      <PSection tone="sunken" compact>
        <PStatBlock className="c4t-stats-5 c4t-stats-3" stats={home.results} columns={3} />
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function CareersPage({ go }) {
  const c = window.C4TD.company.careers;
  return (
    <PageShell>
      <PageHero data={{ ...c, primary: "See open roles", secondary: "Talk to an engineer", photo: { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3", alt: "The team working together" } }} dk onAction={() => go("Contact")} />
      <PSection>
        <PSectionHeader eyebrow="How we work" title="Four things that are true here." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {c.how.map((h) => <PFeatureCard key={h.title} {...h} style={{ background: "var(--ink-100)", borderColor: "var(--ink-200)" }} />)}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="Open roles" title="Where we're hiring." description={c.openNote} />
        <div style={{ marginTop: 48, borderTop: "1px solid var(--border-inverse)" }}>
          {c.roles.map((r, i) => (
            <a key={i} href="#" onClick={(e) => { e.preventDefault(); go("Contact"); }} className="c4t-role-row" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 24, alignItems: "center", padding: "24px 0", borderBottom: "1px solid var(--border-inverse)", textDecoration: "none" }}>
              <span className="c4t-heading-sm" style={{ color: "var(--text-inverse)" }}>{r.title}</span>
              <span style={{ font: "var(--fw-medium) 13px/1 var(--font-mono)", color: "var(--text-inverse-muted)" }}>{r.team}</span>
              <span style={{ font: "var(--fw-medium) 13px/1 var(--font-mono)", color: "var(--text-inverse-muted)" }}>{r.location} · {r.type}</span>
              <PIcon name="arrow-right" size={20} color="var(--ink-50)" />
            </a>
          ))}
        </div>
      </PSection>
      <PSection tone="sunken">
        <div className="c4t-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-grid-gap)" }}>
          <div style={{ background: "var(--surface-canvas)", border: "1px solid var(--border-default)", borderRadius: 14, padding: 40 }}>
            <h3 className="c4t-heading-lg" style={{ margin: 0, color: "var(--text-primary)" }}>Nothing that fits?</h3>
            <p className="c4t-body-md" style={{ margin: "12px 0 24px", color: "var(--text-secondary)" }}>{c.nothingFits}</p>
            <a href={"mailto:" + c.email} className="c4t-body-md" style={{ fontFamily: "var(--font-mono)" }}>{c.email}</a>
          </div>
          <div style={{ background: "var(--surface-canvas)", border: "1px solid var(--border-default)", borderRadius: 14, padding: 40 }}>
            <h3 className="c4t-heading-lg" style={{ margin: 0, color: "var(--text-primary)" }}>Looking to test with us instead?</h3>
            <p className="c4t-body-md" style={{ margin: "12px 0 24px", color: "var(--text-secondary)" }}>{c.testerNote}</p>
            <PButton variant="secondary" iconRight="arrow-right" onClick={() => go("Contact")}>Become a tester</PButton>
          </div>
        </div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

function PartnersPage({ go }) {
  const pt = window.C4TD.company.partners;
  return (
    <PageShell>
      <PageHero data={{ ...pt, primary: "Become a partner", secondary: "Talk to an expert" }} dk onAction={() => go("Contact")} />
      <PSection>
        <PSectionHeader eyebrow="Partnership types" title="Four ways to work together." />
        <div className="c4t-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-grid-gap)", marginTop: 48 }}>
          {pt.types.map((x) => <PFeatureCard key={x.title} {...x} style={{ background: "var(--ink-100)", borderColor: "var(--ink-200)" }} />)}
        </div>
      </PSection>
      <PSection tone="inverse" className="c4t-deep">
        <PSectionHeader tone="inverse" eyebrow="What partners get" title="Support that isn't just a logo on a page." />
        <ChecklistGrid items={pt.benefits} dk columns={2} />
        <div style={{ marginTop: 40 }}><PButton variant="inverse" iconRight="arrow-right" onClick={() => go("Contact")}>Become a partner</PButton></div>
      </PSection>
      <ClosingCta go={go} />
    </PageShell>
  );
}

Object.assign(window, { AiTestingPage, ServicesPage, PlatformPage, IndustriesPage, PricingPage, ContactPage, AboutPage, TrustPage, BlogPage, CaseStudiesPage, CareersPage, PartnersPage });
