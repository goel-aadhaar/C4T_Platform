/* Copy source: content.md v1.0. {{placeholders}} are intentional and must be replaced before launch. */
window.C4TH = {
  nav: [
    {
      label: "AI Testing",
      columns: [
        { title: "Validate AI systems", links: [
          { icon: "sparkles", label: "GenAI & LLM Testing", desc: "Accuracy, safety and consistency for language models" },
          { icon: "bot", label: "AI Agent Testing", desc: "Multi-step agent workflows, tool calls and failure recovery" },
          { icon: "message-square", label: "Chatbot Testing", desc: "Intent coverage, tone and escalation paths" },
          { icon: "mic", label: "Voice AI Testing", desc: "Accents, noise, interruptions and barge-in" },
          { icon: "library-big", label: "RAG Evaluation", desc: "Retrieval quality, grounding and citation accuracy" }
        ] },
        { title: "Protect AI systems", links: [
          { icon: "shield-alert", label: "Red Teaming & AI Safety", desc: "Adversarial prompts, jailbreaks and misuse" },
          { icon: "scale", label: "Bias & Fairness Testing", desc: "Demographic and linguistic fairness slices" },
          { icon: "activity", label: "Model Monitoring", desc: "Drift detection after you ship" },
          { icon: "database", label: "AI Data Collection", desc: "Human-labelled training and evaluation data" }
        ] }
      ],
      feature: { badge: "New", title: "AI Agent Testing", desc: "Agents that call tools and take actions fail differently. Here's how we test them.", cta: "Read the guide" }
    },
    {
      label: "Services",
      columns: [
        { title: "Core QA", links: [
          { icon: "users-round", label: "Crowd Testing" }, { icon: "test-tube-diagonal", label: "Functional Testing" },
          { icon: "code", label: "Test Automation" }, { icon: "smartphone", label: "Mobile App Testing" },
          { icon: "monitor", label: "Web App Testing" }, { icon: "webhook", label: "API Testing" }
        ] },
        { title: "Specialised", links: [
          { icon: "gauge", label: "Performance Testing" }, { icon: "shield-check", label: "Security Testing" },
          { icon: "accessibility", label: "Accessibility Testing" }, { icon: "globe", label: "Localization Testing" },
          { icon: "credit-card", label: "Payment Testing" }, { icon: "eye", label: "Usability Testing" }
        ] },
        { title: "By surface", links: [
          { icon: "layout-grid", label: "Compatibility & Device Testing" }, { icon: "gamepad-2", label: "Game Testing" },
          { icon: "cpu", label: "IoT, AR & VR Testing" }
        ] }
      ],
      feature: { title: "Not sure what you need?", desc: "Book a 30-minute scoping call with a QA engineer.", cta: "Talk to an expert" }
    },
    {
      label: "Platform",
      columns: [
        { title: "AI engine", links: [
          { icon: "wand-sparkles", label: "AI Test Generation" }, { icon: "compass", label: "AI Exploratory Agents" },
          { icon: "filter", label: "AI Bug Triage" }, { icon: "repeat", label: "Regression Optimizer" },
          { icon: "gauge", label: "Release Readiness Score" }
        ] },
        { title: "Infrastructure", links: [
          { icon: "line-chart", label: "Analytics & Reporting" }, { icon: "smartphone", label: "Device Cloud" },
          { icon: "plug", label: "Integrations" }, { icon: "lock", label: "Security & Compliance" }
        ] }
      ],
      feature: { title: "See the platform", desc: "A 15-minute walkthrough with the engineer who would run your pilot.", cta: "Book a demo" }
    },
    {
      label: "Company",
      columns: [
        { title: "Crowd4Test", links: [
          { icon: "building-2", label: "About Crowd4Test" }, { icon: "users", label: "Careers" },
          { icon: "file-text", label: "Blog" }, { icon: "trophy", label: "Case Studies" },
          { icon: "handshake", label: "Partners" },
          { icon: "shield-check", label: "Trust & Security" }, { icon: "mail", label: "Contact" }
        ] }
      ]
    },
    { label: "Pricing" }
  ],
  footerColumns: [
    { title: "AI Testing", links: ["GenAI & LLM Testing", "AI Agent Testing", "Chatbot Testing", "Voice AI Testing", "RAG Evaluation", "Red Teaming", "Bias & Fairness", "Model Monitoring", "AI Data Collection"] },
    { title: "Services", links: ["Crowd Testing", "Functional Testing", "Test Automation", "Mobile App Testing", "Web App Testing", "API Testing", "Performance Testing", "Security Testing", "Accessibility Testing", "Localization Testing", "Payment Testing", "Usability Testing", "Game Testing"] },
    { title: "Platform", links: ["Overview", "AI Test Generation", "AI Exploratory Agents", "AI Bug Triage", "Regression Optimizer", "Release Readiness Score", "Analytics", "Device Cloud", "Integrations"] },
    { title: "Industries", links: ["Banking & Finance", "Healthcare", "Retail & Ecommerce", "Media & Entertainment", "Telecom", "Gaming", "Travel", "Automotive", "SaaS", "Education"] },
    { title: "Company", links: ["About", "Careers", "Partners", "Trust & Security", "Contact", "Pricing"] },
    { title: "Testers", links: ["Become a Tester", "How It Works", "Payouts", "Tester Academy", "Tester FAQ", "Bring Your Own Crowd"] }
  ],
  stats: [
    { value: "5,000+", label: "Vetted testers" },
    { value: "120+", label: "Countries" },
    { value: "2,000+", label: "Real devices" },
    { value: "100+", label: "Enterprise clients" },
    { value: "11 years", label: "Delivering quality" }
  ],
  problems: [
    { icon: "gauge", title: "Release velocity outruns coverage", description: "Teams ship faster every quarter. Test coverage doesn't grow at the same rate, so the gap becomes production risk." },
    { icon: "circle-help", title: "AI outputs have no single right answer", description: "A pass/fail assertion can't tell you whether a response was accurate, appropriate or safe. Something has to make a judgment call." },
    { icon: "globe", title: "Staging doesn't look like the real world", description: "Your test lab has clean networks, five devices and one language. Your users have none of that." },
    { icon: "banknote", title: "One bad release is expensive", description: "A hallucinated answer, a failed payment or an inaccessible checkout costs revenue, trust and, increasingly, regulatory exposure." }
  ],
  steps: [
    { n: "01", title: "Scope", body: "A QA lead maps your release process, risk areas and target markets. You get a test strategy and a fixed-price pilot scope, usually within a week." },
    { n: "02", title: "Execute", body: "AI agents generate and run tests across your stack. Matched human testers validate on real devices in real markets. Both feed the same pipeline." },
    { n: "03", title: "Decide", body: "Bugs land triaged, deduplicated and prioritised in your tracker. A Release Readiness Score tells you whether to ship — with the evidence behind it." }
  ],
  aiServices: [
    { icon: "sparkles", eyebrow: "LLM", title: "GenAI & LLM Testing", description: "Validate accuracy, consistency and safety across prompts, models and versions — before your users find the gaps.", points: ["Prompt coverage", "Hallucination detection", "Output consistency", "Regression across model versions"] },
    { icon: "bot", eyebrow: "Agents", title: "AI Agent Testing", description: "Agents plan, call tools and take real actions. We test the whole chain, including what happens when a step fails.", points: ["Multi-step workflows", "Tool-call accuracy", "Failure recovery", "MCP server validation"], badge: "New" },
    { icon: "message-square", eyebrow: "Conversation", title: "Chatbot & Conversational AI", description: "Intent coverage, tone, escalation and the messy way real people actually type.", points: ["Intent coverage", "Context retention", "Escalation paths", "Multilingual"] },
    { icon: "mic", eyebrow: "Voice", title: "Voice AI Testing", description: "Real accents, real background noise, real interruptions — on real devices in real rooms.", points: ["Accent diversity", "Noise conditions", "Barge-in", "Wake-word accuracy"] },
    { icon: "library-big", eyebrow: "Retrieval", title: "RAG Evaluation", description: "Check that answers are grounded in your documents and that citations point where they claim to.", points: ["Retrieval precision", "Grounding", "Citation accuracy", "Freshness"] },
    { icon: "shield-alert", eyebrow: "Safety", title: "Red Teaming & AI Safety", description: "Adversarial testing by humans who are genuinely trying to break your model.", points: ["Jailbreak attempts", "Prompt injection", "Toxicity", "Misuse scenarios"] },
    { icon: "scale", eyebrow: "Fairness", title: "Bias & Fairness Testing", description: "Measure output quality across demographic, linguistic and regional slices, with native speakers in each.", points: ["Demographic slices", "Language parity", "Regional fairness", "Documented evidence"] },
    { icon: "activity", eyebrow: "Production", title: "Model Monitoring", description: "Models drift quietly. Continuous evaluation catches it before your support queue does.", points: ["Drift detection", "Production sampling", "Sentiment tracking", "Alerting"] }
  ],
  qaServices: [
    { icon: "users-round", title: "Crowd Testing", description: "Real users, real devices, real networks, real countries. Coverage no lab can reproduce.", meta: "120+ countries · 2,000+ devices · 24/7" },
    { icon: "code", title: "Test Automation", description: "Build and maintain suites in the frameworks your team already uses.", meta: "Playwright · Selenium · Appium · Cypress · REST Assured" },
    { icon: "test-tube-diagonal", title: "Functional Testing", description: "Structured and exploratory testing across every core flow before each release.", meta: "Regression · Smoke · Exploratory · UAT support" },
    { icon: "gauge", title: "Performance Engineering", description: "Find the breaking point in staging instead of in production.", meta: "Load · Stress · Soak · Scalability" },
    { icon: "shield-check", title: "Security Testing", description: "OWASP-aligned validation of your app, APIs and auth flows.", meta: "OWASP Top 10 · API security · Auth & session · VAPT" },
    { icon: "accessibility", title: "Accessibility Testing", description: "Tested with assistive technology by people who use it every day.", meta: "WCAG 2.2 AA · ADA · Section 508 · EN 301 549" },
    { icon: "globe", title: "Localization Testing", description: "In-market validation by native speakers — language, layout, currency and cultural fit.", meta: "40+ languages · Native speakers · Regional UX" },
    { icon: "credit-card", title: "Payment Testing", description: "Real cards, real wallets, real bank flows in each market you operate in.", meta: "UPI · Cards · Wallets · 3DS · Refunds" }
  ],
  platform: [
    { icon: "wand-sparkles", title: "AI Test Case Generator", description: "Turn requirements into executable test cases in minutes. Feed it PRDs, user stories, Jira tickets, Figma files or an API spec." },
    { icon: "compass", title: "AI Exploratory Agents", description: "Agents explore your app like curious users, following unexpected paths and surfacing defects a scripted suite would never reach." },
    { icon: "filter", title: "AI Bug Triage", description: "Every incoming bug is deduplicated, categorised, severity-scored and routed. Your team reads signal instead of noise." },
    { icon: "repeat", title: "Regression Optimizer", description: "Predicts which tests actually matter for this change. Cut execution time while holding risk coverage flat." },
    { icon: "gauge", title: "Release Readiness Score", description: "A single number backed by quality, risk and coverage sub-scores — plus the evidence behind each one." },
    { icon: "line-chart", title: "Analytics & Reporting", description: "Test runs, pass rates, coverage by device and country, defect distribution and release health over time." }
  ],
  useCases: ["Chatbots", "Voice assistants", "LLM applications", "AI agents & copilots", "RAG systems", "Recommendation engines", "Computer vision & image AI", "Document AI", "Translation & multilingual AI", "Fraud detection models"],
  industries: [
    { icon: "landmark", name: "Banking & Finance" }, { icon: "heart-pulse", name: "Healthcare" },
    { icon: "shopping-cart", name: "Retail & Ecommerce" }, { icon: "clapperboard", name: "Media & Entertainment" },
    { icon: "radio-tower", name: "Telecom" }, { icon: "gamepad-2", name: "Gaming" },
    { icon: "plane", name: "Travel & Hospitality" }, { icon: "car", name: "Automotive" },
    { icon: "cloud", name: "SaaS" }, { icon: "graduation-cap", name: "Education" }
  ],
  results: [
    { value: "40%", label: "Faster regression cycles" },
    { value: "15%", label: "Fewer production defects" },
    { value: "3 weeks", label: "To first release-ready report" }
  ],
  caseStudies: [
    { client: "Case study one", industry: "Industry", headline: "Headline result — e.g. cut regression from 3 days to 6 hours", results: [{ value: "00%", label: "Result metric one" }, { value: "00×", label: "Result metric two" }, { value: "00", label: "Result metric three" }] },
    { client: "Case study two", industry: "Industry", headline: "Headline result — one line, with a number in it", results: [{ value: "00%", label: "Result metric one" }, { value: "00", label: "Result metric two" }] },
    { client: "Case study three", industry: "Industry", headline: "Headline result — one line, with a number in it", results: [{ value: "00%", label: "Result metric one" }, { value: "00", label: "Result metric two" }] }
  ],
  integrations: ["Jira", "Linear", "GitHub", "GitLab", "Azure DevOps", "Jenkins", "TestRail", "Xray", "Slack", "Microsoft Teams", "Webhooks", "REST API"],
  trust: ["ISO/IEC 27001:2022 certified", "SOC 2 Type II", "GDPR and DPDPA aligned", "NDAs with every tester", "Role-based access", "Regional data residency options", "Audit logs"],
  resources: [
    { type: "Guide", title: "The Ultimate Guide to Testing AI Applications", description: "A practical framework for validating LLMs, agents and RAG systems." },
    { type: "Report", title: "The State of AI Quality 2026", description: "What 1,200 engineering teams told us about testing AI in production." },
    { type: "Article", title: "GenAI Testing Checklist", description: "45 checks to run before you ship an AI feature." },
    { type: "Article", title: "Crowd Testing vs. In-House QA: The Real Cost", description: "An honest cost model, including the parts vendors leave out." }
  ]
};
