/* Detail-page copy for the nav links not represented on the homepage. Source: content.md §5.10, §6.5–6.7, §6.13–6.16, §7.8–7.10. */
window.C4TD = {
  ai: [
    { icon: "database", eyebrow: "Data", title: "AI Data Collection", description: "Synthetic data can't reproduce a regional dialect, a clinician's phrasing, or the way a real person mumbles a wake word. Our community can.", points: ["Speech & audio", "Text & instruction data", "Image & video capture", "Preference & RLHF data"] },
  ],
  qa: [
    { icon: "smartphone", title: "Mobile App Testing", description: "Emulators miss battery drain, thermal throttling, permission dialogs, notification behaviour and everything that happens on a three-year-old phone with 400 apps installed.", meta: "iOS · Android · Tablets · Foldables" },
    { icon: "monitor", title: "Web App Testing", description: "Browser versions, screen sizes, extensions, zoom levels, corporate proxies and ad blockers all change how your app behaves.", meta: "Chrome · Safari · Firefox · Edge · Core Web Vitals" },
    { icon: "webhook", title: "API Testing", description: "Most integration failures happen below the interface. We test the contract directly.", meta: "REST · GraphQL · gRPC · WebSocket · Webhooks" },
    { icon: "eye", title: "Usability Testing", description: "Watch someone fail at the thing you thought was obvious. It's uncomfortable and it's the fastest product feedback you'll ever get.", meta: "Moderated · Unmoderated · Card sorting · SUS scoring" },
    { icon: "layout-grid", title: "Compatibility & Device Testing", description: "The top ten devices are easy. Your bugs are in the next two hundred. We build the matrix from your analytics, not a generic device list.", meta: "Devices · OS versions · Browsers · Screen sizes" },
    { icon: "gamepad-2", title: "Game Testing", description: "Someone who has never played a competitive shooter won't notice that the netcode feels wrong. We match testers by platform and genre.", meta: "Gameplay · Multiplayer · Performance · Store compliance" },
    { icon: "cpu", title: "IoT, AR & VR Testing", description: "Some things can only be tested in a real house — wifi dead spots, competing devices, unusual room layouts and people who don't read the manual.", meta: "Pairing · Connectivity · Sensors · Comfort · Safety" },
  ],
  platform: [
    { icon: "smartphone", title: "Device Cloud", description: "Data-centre device farms give you a phone in a rack on a fast connection. That isn't the same as a phone in a user's hand on a congested network in Jakarta." },
    { icon: "plug", title: "Integrations", description: "Results go where your team already is, with two-way sync. Close a bug in Jira and it's closed here, so retest scheduling happens automatically." },
    { icon: "lock", title: "Security & Compliance", description: "You're giving an external partner access to unreleased software. Certifications, tester vetting, platform controls and product protection — documented." },
  ],
  company: {
    careers: {
      eyebrow: "Careers",
      title: "Build the quality layer for AI-era software.",
      description: "We're a small team with unusually large reach — a platform, a global community, and enterprise clients who depend on both.",
      how: [
        { icon: "globe", title: "Remote-friendly", description: "Remote-friendly with a Bengaluru hub." },
        { icon: "users", title: "Small teams, real ownership", description: "Small teams with real ownership of the work they ship." },
        { icon: "handshake", title: "Direct client contact", description: "Direct client contact from day one, not after two years." },
        { icon: "message-square", title: "We say what we found", description: "We say what we found — internally too." },
      ],
      roles: [
        { title: "Role title", team: "Function", location: "Location", type: "Type" },
        { title: "Role title", team: "Function", location: "Location", type: "Type" },
        { title: "Role title", team: "Function", location: "Location", type: "Type" },
        { title: "Role title", team: "Function", location: "Location", type: "Type" },
      ],
      openNote: "Open roles are pulled from the backend and grouped by function. Replace this placeholder list before launch.",
      nothingFits: "Nothing that fits? Send us something anyway. If you're good at what you do, tell us what you'd want to work on.",
      email: "careers@crowd4test.com",
      testerNote: "Looking to test with us instead? Our tester community is separate from our staff team.",
    },
    partners: {
      eyebrow: "Partner program",
      title: "Partner with us.",
      description: "If your clients ship software or AI products, quality is a gap you can close without building a QA practice.",
      types: [
        { icon: "share-2", title: "Referral", description: "Introduce us, we handle delivery, you earn commission." },
        { icon: "briefcase", title: "Agency & consultancy", description: "White-label or co-delivered QA as part of your engagements." },
        { icon: "plug", title: "Technology", description: "Integrate with our platform via API, webhooks or MCP." },
        { icon: "store", title: "Reseller", description: "Sell Crowd4Test under a commercial agreement in your market." },
      ],
      benefits: ["Dedicated partner manager", "Deal registration and protection", "Co-marketing support", "Technical enablement and training", "Priority delivery slots"],
    },
    about: {
      eyebrow: "About us",
      title: "We believe quality is a human judgment, assisted by machines.",
      description: "Founded in 2015 and headquartered in Bengaluru, Crowd4Test helps enterprises ship software and AI products they can stand behind.",
      why: "Crowd4Test started in 2015 with a straightforward observation: the people best placed to find problems in software are people who resemble the people who'll use it. Test labs are clean, fast and homogeneous. The real world is none of those things.\n\nSince then the problem has changed shape. Software now generates its own answers, and those answers are wrong in ways no assertion can catch. So we built the AI side of our platform — not to replace the human judgment we started with, but to give it reach. AI covers thousands of cases in minutes. People decide which failures actually matter.",
      beliefs: [
        { icon: "scale", title: "AI can't grade its own homework", description: "Automated evaluation shares the blind spots of the models it evaluates. Human review isn't a nice-to-have on AI products; it's the control." },
        { icon: "globe", title: "Real conditions beat clean conditions", description: "The bug is on a mid-range phone in a market you've never visited, on a network that drops packets." },
        { icon: "users", title: "People are the control", description: "Automation scales the work. Humans decide what the work meant." },
        { icon: "eye", title: "Evidence over assertion", description: "If we can't show you the run, the reviewer and the timestamp, we don't claim it." },
      ],
    },
    trust: {
      eyebrow: "Trust & security",
      title: "Security is a precondition, not a feature.",
      description: "You're giving an external partner access to unreleased software. Here's exactly how we handle that.",
      groups: [
        { title: "Certifications", icon: "badge-check", items: ["ISO/IEC 27001:2022", "SOC 2 Type II", "GDPR aligned", "India DPDPA aligned", "HIPAA-ready workflows for healthcare engagements"] },
        { title: "Tester vetting", icon: "user-check", items: ["Identity verification", "Signed NDA before any project access", "Background checks for restricted-tier engagements", "Ongoing quality and conduct scoring", "Immediate removal on any breach", "Restricted pools for sensitive products"] },
        { title: "Platform controls", icon: "lock", items: ["Encryption in transit and at rest", "Role-based access control", "SSO and SAML", "Full audit logging", "Configurable data retention and deletion", "Regional data residency options", "Environment isolation per client", "Least-privilege access for our own staff"] },
        { title: "Product protection", icon: "shield-check", items: ["Watermarked builds", "Device-level install restrictions", "Screenshot and recording controls where supported", "Time-limited access", "Revocation on project close", "No client data used for model training, ever"] },
      ],
      docs: ["Security whitepaper", "Penetration test summary", "DPA and sub-processor list", "Business continuity plan", "Insurance certificates"],
    },
  },
};
