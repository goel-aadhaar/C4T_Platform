const d = window.C4TH;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "standard",
  "rhythm": "contrast",
  "accent": "teal"
}/*EDITMODE-END*/;

const DENSITY_CSS = {
  editorial: "--space-13:128px;--space-11:80px;--space-section-y:128px;--space-section-y-compact:80px;--space-card-padding:32px;--space-card-padding-lg:40px;--space-grid-gap:24px;--type-display-2xl-size:80px;--type-display-2xl-tracking:-3px;--type-display-xl-size:62px;--type-display-lg-size:52px;--type-display-md-size:40px;--type-body-lg-size:19px",
  standard: "",
  compact: "--space-13:64px;--space-11:44px;--space-section-y:64px;--space-section-y-compact:44px;--space-card-padding:20px;--space-card-padding-lg:24px;--space-grid-gap:16px;--type-display-2xl-size:56px;--type-display-2xl-tracking:-1.8px;--type-display-xl-size:44px;--type-display-lg-size:36px;--type-display-md-size:30px;--type-body-lg-size:17px",
};
const ACCENT_CSS = {
  teal: "--coral-50:var(--teal-50);--coral-200:var(--teal-100);--coral-300:var(--teal-100);--coral-400:var(--teal-100);--coral-500:var(--teal-500);--coral-600:var(--teal-600);--coral-700:var(--teal-700);--coral-100:var(--teal-100);--surface-brand-subtle:var(--teal-50);--text-brand:var(--teal-600);--action-primary-bg:#0b7a6e;--action-primary-bg-hover:#086055;--action-primary-bg-active:#05463e;--action-primary-bg-disabled:#cfe9e3;--text-link:#086055;--text-link-hover:#05463e",
  ink: "--coral-50:var(--ink-50);--coral-100:var(--ink-100);--coral-200:var(--ink-200);--coral-300:var(--ink-300);--coral-400:var(--ink-400);--coral-500:var(--ink-800);--coral-600:var(--ink-900);--coral-700:var(--ink-950);--surface-brand-subtle:var(--ink-100);--text-brand:var(--ink-600);--action-primary-bg:#17130f;--action-primary-bg-hover:#241e18;--action-primary-bg-active:#332b23;--action-primary-bg-disabled:#c9c3bc;--text-link:#241e18;--text-link-hover:#17130f",
  coral: "",
};

/* Label → page routing, built from the nav IA so every mega-menu link lands somewhere. */
const ROUTES = (() => {
  const m = { "Home": "Home", "Crowd4Test": "Home", "Pricing": "Pricing" };
  const section = { "AI Testing": "AiTesting", "Services": "Services", "Platform": "Platform", "Industries": "Industries", "Company": "About" };
  d.nav.forEach((item) => {
    const target = section[item.label] || (item.label === "Pricing" ? "Pricing" : "Contact");
    m[item.label] = target;
    (item.columns || []).forEach((col) => col.links.forEach((l) => { m[l.label] = target; }));
    if (item.feature) m[item.feature.cta] = item.label === "Platform" ? "Contact" : target;
  });
  ["Book a demo", "Start a pilot", "Talk to an expert", "Talk to an AI expert", "Talk to sales", "Contact", "Book my demo", "Subscribe", "Become a Tester"].forEach((l) => { m[l] = "Contact"; });
  ["See pricing", "Pricing"].forEach((l) => { m[l] = "Pricing"; });
  ["Become a Tester", "How It Works", "Payouts", "Tester Academy", "Tester FAQ", "Bring Your Own Crowd"].forEach((l) => { m[l] = "Contact"; });
  ["Privacy", "Terms", "Accessibility statement", "Security", "Compliance"].forEach((l) => { m[l] = "Trust"; });
  Object.assign(m, { "About Crowd4Test": "About", "About": "About", "Careers": "Careers", "Partners": "Partners", "See open roles": "Careers", "Become a partner": "Contact", "Trust & Security": "Trust", "Read about our security": "Trust", "Read about security": "Trust", "Request security documentation": "Contact", "Blog": "Blog", "Case Studies": "CaseStudies", "View all case studies": "CaseStudies", "All case studies": "CaseStudies", "View all resources": "Blog", "Industries": "Industries", "View all industries": "Industries" });
  return m;
})();

const DETAIL_SECTION = { ai: "AI Testing", qa: "Services", platform: "Platform" };
const NAV_SECTION = { AiTesting: "AI Testing", Services: "Services", Platform: "Platform", Industries: "Industries", Pricing: "Pricing", About: "Company", Trust: "Company", Blog: "Company", CaseStudies: "Company", Careers: "Company", Partners: "Company" };

function pageComponent(key) {
  return {
    Home: window.HomePage, AiTesting: window.AiTestingPage, Services: window.ServicesPage,
    Platform: window.PlatformPage, Industries: window.IndustriesPage, Pricing: window.PricingPage,
    Contact: window.ContactPage, About: window.AboutPage, Trust: window.TrustPage,
    Blog: window.BlogPage, CaseStudies: window.CaseStudiesPage,
    Careers: window.CareersPage, Partners: window.PartnersPage,
  }[key] || window.HomePage;
}

function App() {
  const { TopNav, Footer } = window.Crowd4TestDesignSystem_772017;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState("Home");
  const go = React.useCallback((label) => { setPage(window.DETAIL_INDEX && window.DETAIL_INDEX[label] ? label : (ROUTES[label] || "Home")); window.scrollTo(0, 0); }, []);
  React.useEffect(() => { window.C4TGO = go; }, [go]);
  const css = `:root{${[DENSITY_CSS[t.density], ACCENT_CSS[t.accent]].filter(Boolean).join(";")}}`;
  const detail = window.detailFor ? window.detailFor(page, go) : null;
  const Current = pageComponent(page);
  return (
    <div>
      <style>{css}</style>
      <TopNav items={d.nav} active={NAV_SECTION[page] || (window.DETAIL_INDEX && window.DETAIL_INDEX[page] ? DETAIL_SECTION[window.DETAIL_INDEX[page].key] : undefined)} onNavigate={go} announcement={<span>New: The State of AI Quality 2026 report is out. 1,200 teams told us how they test AI. Read it →</span>} />
      <main>{detail || <Current t={t} go={go} />}</main>
      <Footer columns={d.footerColumns} onNavigate={go} />
      <TweaksPanel>
        <TweakSection label="Page rhythm" />
        <TweakRadio label="Density" value={t.density} options={["editorial", "standard", "compact"]} onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="Theme" value={t.rhythm} options={["contrast", "light"]} onChange={(v) => setTweak("rhythm", v)} />
        <TweakSection label="Brand" />
        <TweakRadio label="Accent" value={t.accent} options={["teal", "ink", "coral"]} onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
