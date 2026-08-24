/**
 * All site copy, ported from the original stail.co.in single-page site.
 * Sections import from here so content edits never touch components.
 */

export const SITE = {
  name: "STAIL",
  legalName: "ShivTrinetrix AI Labs Private Limited",
  title: "STAIL — ShivTrinetrix AI Labs | India's Sovereign AI Future",
  description:
    "ShivTrinetrix AI Labs (STAIL) — Building India's Sovereign AI Future. AI Models, AI Infrastructure, AI Transformation for Governments, PSUs, Mining, Defense & Enterprises.",
  url: "https://stail.co.in",
  phone: "+91 76679 21536",
  phoneHref: "tel:+917667921536",
  calendly: "https://calendly.com/introtostail/30min",
  address: [
    "Om Chambers, 648/A, 4th Floor",
    "Binnamangala 1st Stage, Indiranagar",
    "Bangalore, Karnataka — 560038",
  ],
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
] as const;

export const HERO = {
  kicker: "India's Sovereign AI Future",
  headline: ["Building India's future", "with Sovereign AI"],
  sub: "Building Sovereign AI Systems, Industry Intelligence Platforms, and Enterprise AI Infrastructure for the Next Generation of Digital India.",
  sectorsLabel: "Serving critical sectors across India",
  sectors: [
    "Government",
    "PSUs & CPSEs",
    "Mining",
    "Banking",
    "Manufacturing",
    "Defense",
    "Education",
    "Healthcare",
  ],
} as const;

/**
 * Copy for the hero's floating mini-cards. Kept here (rather than inline in
 * the component) so these figures stay in step with STATS/FLAGSHIP/CASE_STUDY.
 */
export const HERO_CARDS = {
  ops: { title: "MineGPT Ops", trend: "↑ +12% production" },
  citizen: {
    title: "Citizen AI",
    question: "नमस्ते! योजना पात्रता जांचें",
    answer: "✓ 3 योजनाएँ मिलीं",
  },
  sovereign: {
    lead: "Sovereign",
    body: "AI that keeps every byte inside",
    tail: "your perimeter",
    meta: "On-premise · Private LLM",
  },
  safety: { status: "Live", value: "99.2%", label: "PPE detection accuracy" },
  deploy: {
    command: "stail tmi deploy",
    lines: ["✓ sovereign mode", "✓ live · <50ms"],
  },
} as const;

export const STATS = [
  { value: 11, suffix: "+", label: "AI Products Built" },
  { value: 40, suffix: "+", label: "Enterprise Use Cases" },
  { value: 100, suffix: "M+", label: "Data Points Processed" },
  { value: 24, suffix: "×7", label: "AI Operations" },
] as const;

export const ABOUT = {
  label: "About STAIL",
  heading: "AI Research & Product Lab",
  body1:
    "ShivTrinetrix AI Labs (STAIL) is an AI Research & Product Lab focused on building domain-specific AI systems, sovereign enterprise AI infrastructure, and intelligent automation platforms for governments and enterprises.",
  body2:
    "We develop proprietary AI products, deploy private AI models, and help organizations adopt AI securely through consulting, implementation, and managed AI services.",
  tags: [
    "AI Models",
    "Enterprise AI",
    "Agentic Systems",
    "AI Infrastructure",
    "AI Consulting",
    "AI Studios",
  ],
  vision: {
    title: "Our Vision",
    body: "To become India's leading AI Research & Product Company powering governments and enterprises across every strategic sector.",
  },
  mission: {
    title: "Mission",
    body: "To make India self-reliant in Artificial Intelligence by building sovereign, secure, and scalable AI systems for critical industries.",
  },
} as const;

export const FLAGSHIP = {
  badge: "Flagship Product",
  name: "Trinetrix Mining Intelligence (TMI)",
  tagline: "The Operating Intelligence Layer for Modern Mining",
  body: "An integrated AI platform transforming mining operations through real-time intelligence, predictive analytics, safety automation, ESG monitoring, and executive decision support.",
  modules: [
    {
      name: "MineGPT Ops",
      features:
        "Production analysis · Fleet optimization · Shift performance intelligence · Root cause analysis",
    },
    {
      name: "MineGPT Safety",
      features:
        "PPE detection · Fatigue monitoring · Restricted area intelligence · DGMS compliance",
    },
    {
      name: "MineGPT Predict",
      features:
        "Predictive maintenance · Failure forecasting · Maintenance scheduling · Spare forecasting",
    },
    {
      name: "MineGPT Geo",
      features:
        "Ore intelligence · Geological report analysis · Reserve estimation · Drill analytics",
    },
    {
      name: "MineGPT ESG",
      features:
        "Carbon monitoring · Dust intelligence · Water management · ESG automation",
    },
    {
      name: "MineGPT Command",
      features:
        "Executive dashboards · Forecasting · Cost intelligence · AI reports",
    },
  ],
} as const;

export const PRODUCTS = [
  {
    category: "Sovereign LLM",
    name: "Sovereign Indian Enterprise LLM",
    body: "Private AI for secure organizations — on-premise, with Hindi & regional language support, enterprise RAG and knowledge intelligence.",
    tags: ["Private Deploy", "Hindi Support", "Enterprise RAG", "Doc Intelligence"],
  },
  {
    category: "Citizen Services",
    name: "Government Citizen Service AI",
    body: "Scheme eligibility, complaint filing, form assistance, and citizen guidance across Agriculture, Health, Education, and Municipal departments.",
    tags: ["Scheme Eligibility", "Complaint Filing", "Form Assist"],
  },
  {
    category: "Knowledge AI",
    name: "AI Knowledge Officer",
    body: "Enterprise-wide knowledge retrieval, policy search, meeting intelligence, and knowledge graph generation for organizations.",
    tags: ["Policy Search", "Meeting Intel", "Knowledge Graph"],
  },
  {
    category: "Procurement AI",
    name: "AI Procurement Intelligence",
    body: "Tender analysis, vendor scoring, fraud detection, and cost benchmarking for procurement & finance teams.",
    tags: ["Tender Analysis", "Vendor Scoring", "Fraud Detection"],
  },
  {
    category: "Compliance AI",
    name: "AI Compliance & Policy Auditor",
    body: "Risk scoring, audit automation, compliance monitoring, and regulatory gap analysis for regulated industries.",
    tags: ["Risk Scoring", "Audit Auto", "Reg Gaps"],
  },
  {
    category: "Agriculture AI",
    name: "AI Agriculture Intelligence",
    body: "Disease detection, crop advisory, yield prediction, and weather intelligence for modern precision farming.",
    tags: ["Disease Detection", "Yield Prediction", "Crop Advisory"],
  },
  {
    category: "Employee Wellness",
    name: "Mentamind Enterprise",
    body: "Burnout detection, anonymous support, mood tracking, and HR wellness analytics for enterprise workforces.",
    tags: ["Burnout Detect", "Mood Tracking", "HR Analytics"],
  },
  {
    category: "Education AI",
    name: "AI Education Copilot",
    body: "Personalized learning paths, AI tutoring, curriculum generation, and automated evaluation for institutions.",
    tags: ["Personalized Learning", "AI Tutor", "Auto Eval"],
  },
  {
    category: "Legal AI",
    name: "AI Legal Intelligence System",
    body: "Contract review, case law search, compliance analysis, and document summarization for legal departments.",
    tags: ["Contract Review", "Case Law", "Doc Summary"],
  },
  {
    category: "Cybersecurity AI",
    name: "AI Cybersecurity Analyst",
    body: "Threat detection, SOC intelligence, incident reporting, and log analysis for enterprise security operations centers.",
    tags: ["Threat Detection", "SOC Intel", "Log Analysis"],
  },
] as const;

export const PROCESS = {
  label: "How We Work",
  heading: "Our Delivery Process",
  sub: "A battle-tested framework that takes your organization from AI strategy to sovereign deployment.",
  steps: [
    {
      num: "01",
      name: "Discover",
      body: "Deep-dive into your sector, data landscape, compliance needs, and strategic AI goals.",
    },
    {
      num: "02",
      name: "Design",
      body: "Architecture, data pipelines, model selection, and sovereign deployment blueprint.",
    },
    {
      num: "03",
      name: "Develop",
      body: "Agile sprints, weekly deliverables, full transparency via dashboards and model cards.",
    },
    {
      num: "04",
      name: "Deploy",
      body: "On-premise or sovereign cloud deployment, QA tested and production-hardened.",
    },
    {
      num: "05",
      name: "Scale",
      body: "Ongoing support, model fine-tuning, performance optimization, and feature expansion.",
    },
  ],
} as const;

export const INDUSTRIES = {
  label: "Industries",
  heading: "Built for Critical Sectors",
  sub: "Domain-specific AI trained for the precise workflows, compliance requirements, and data patterns of each industry.",
  items: [
    "Mining",
    "Government",
    "PSUs & CPSEs",
    "Manufacturing",
    "Banking",
    "Insurance",
    "Healthcare",
    "Education",
    "Agriculture",
    "Defense",
    "Smart Cities",
    "Rural Dev.",
  ],
} as const;

export const SOLUTIONS = {
  label: "Solutions",
  heading: "Tailored for Every Stage",
  sub: "Sovereign AI pathways designed for every type of organization — from state governments to enterprise conglomerates.",
  tabs: [
    {
      key: "government",
      tab: "For Government",
      title: "Government AI Transformation",
      body: "Full-stack sovereign AI implementation for central and state government bodies — citizen services, internal knowledge management, procurement intelligence, and compliance automation.",
      points: [
        "Private LLM deployment with zero data leaving your perimeter",
        "Multilingual citizen service bots (Hindi + 12 regional languages)",
        "AI-powered procurement audit and fraud detection",
        "Policy search and circular management AI",
        "Digital India compliant architecture",
      ],
      stackLabel: "Sovereign AI Stack",
      stack: ["On-Premise LLM", "RAG Pipeline", "Hindi NLP", "Gov Cloud", "CERT-In"],
      outcomes: [
        "80% faster citizen query resolution",
        "60% reduction in manual documentation work",
        "Real-time compliance monitoring across departments",
        "Unified policy knowledge base with AI search",
      ],
    },
    {
      key: "mining",
      tab: "For Mining",
      title: "Mining AI Intelligence Platform",
      body: "TMI — the operating intelligence layer that transforms mining operations, safety, predictive maintenance, ESG, and executive reporting into unified AI command.",
      points: [
        "Real-time production intelligence and fleet optimization",
        "DGMS-compliant AI safety monitoring with video AI",
        "Predictive maintenance reducing unplanned downtime",
        "AI-powered ESG carbon and dust monitoring",
        "Executive AI dashboards with natural language reports",
      ],
      stackLabel: "TMI Technology Stack",
      stack: ["Computer Vision", "Time-Series AI", "Digital Twin", "Edge AI", "IoT Integration"],
      outcomes: [
        "35% reduction in unplanned equipment failures",
        "Zero safety blind-spots with 24×7 AI monitoring",
        "Automated DGMS and ESG compliance reporting",
        "10–15% production efficiency improvement",
      ],
    },
    {
      key: "enterprise",
      tab: "For Enterprises",
      title: "Enterprise AI Transformation",
      body: "End-to-end AI adoption for large enterprises — private LLM deployment, agentic workflows, intelligent automation, and data intelligence — all with sovereign data control.",
      points: [
        "Private AI models fine-tuned on proprietary enterprise data",
        "Agentic AI for multi-step approval and workflow automation",
        "Enterprise AI search across all documents and systems",
        "AI Cybersecurity SOC and threat intelligence layer",
        "AI-powered HR wellness with Mentamind Enterprise",
      ],
      stackLabel: "Enterprise AI Stack",
      stack: ["Private LLM", "Agentic AI", "Vector DB", "API Gateway", "SOC AI"],
      outcomes: [
        "50% reduction in knowledge retrieval time",
        "Automated compliance and audit workflows",
        "AI-first HR analytics reducing attrition risk",
        "Enterprise-grade security with zero data exposure",
      ],
    },
    {
      key: "banking",
      tab: "For Banking & PSUs",
      title: "Banking & PSU AI Systems",
      body: "Sovereign AI for banks, NBFCs, and public sector undertakings — procurement intelligence, compliance automation, internal knowledge management, and risk analytics.",
      points: [
        "AI procurement platform for tender analysis and vendor scoring",
        "Regulatory compliance AI with automated gap analysis",
        "Private internal chatbot for policy and circular search",
        "Fraud detection AI integrated with core banking",
        "RBI and SEBI compliant sovereign deployment",
      ],
      stackLabel: "BFSI AI Stack",
      stack: ["Sovereign LLM", "Fraud AI", "RAG", "RBI Compliant", "Core Integration"],
      outcomes: [
        "40% faster procurement and vendor evaluation",
        "Real-time regulatory compliance monitoring",
        "Instant AI search across policy circulars",
        "Fraud detection with 95%+ precision rates",
      ],
    },
  ],
} as const;

export const SERVICES = {
  label: "Services",
  heading: "Full-Stack AI Partnership",
  sub: "From strategy to sovereign deployment — STAIL is your end-to-end AI transformation partner.",
  items: [
    {
      num: "01",
      name: "AI Strategy Consulting",
      body: "Roadmaps, AI maturity assessments, and sector-specific frameworks for enterprise AI adoption.",
    },
    {
      num: "02",
      name: "Enterprise AI Deployment",
      body: "End-to-end implementation of AI systems at scale, with change management and training.",
    },
    {
      num: "03",
      name: "Private AI Infrastructure",
      body: "On-premise and sovereign cloud deployments that keep your data fully inside your perimeter.",
    },
    {
      num: "04",
      name: "LLM Fine-Tuning",
      body: "Domain-specific model training and fine-tuning on your proprietary data and workflows.",
    },
    {
      num: "05",
      name: "Agentic AI Systems",
      body: "Autonomous AI agents for complex multi-step workflows, approvals, and decision chains.",
    },
    {
      num: "06",
      name: "Data Intelligence",
      body: "Data strategy, pipelines, warehousing, and analytics foundations for AI readiness.",
    },
    {
      num: "07",
      name: "AI Transformation Programs",
      body: "Organization-wide capability building, training, and culture transformation for the AI era.",
    },
    {
      num: "08",
      name: "Government AI Consulting",
      body: "Specialized advisory for policy, implementation, and digital governance for public sector bodies.",
    },
  ],
} as const;

export const ADVANTAGES = {
  label: "The STAIL Advantage",
  heading: "Why Choose STAIL",
  sub: "We're not just another AI vendor — we're India's sovereign AI research and product lab invested in your outcome.",
  items: [
    {
      name: "Sovereign AI Architecture",
      body: "Your data never leaves your organization. Complete ownership, zero external exposure, government-grade security from day one.",
    },
    {
      name: "Domain-Specific Intelligence",
      body: "AI models trained on sector-specific data and workflows — not generic models retrofitted for your use case.",
    },
    {
      name: "Enterprise Security Grade",
      body: "Government and defense-grade deployment architecture built for compliance, audit trails, and zero-trust security.",
    },
    {
      name: "Custom AI Models",
      body: "Proprietary models fine-tuned specifically for your organization's data, language, and operational workflows.",
    },
    {
      name: "Full Stack AI Partner",
      body: "Strategy through implementation. One team handles everything — no coordination overhead, end-to-end accountability.",
    },
    {
      name: "Made in India, for India",
      body: "Built with an Indian sovereign AI identity — Hindi and regional language support, compliance with Indian regulatory frameworks.",
    },
  ],
} as const;

export const STUDIO = {
  label: "STAIL Studio",
  heading: ["AI Content.", "AI Media.", "AI Storytelling."],
  body: "STAIL Studio produces AI-generated enterprise content, training videos, government awareness campaigns, product explainers, and digital learning assets.",
  tags: [
    "AI Avatars",
    "Training Videos",
    "Gov Campaigns",
    "Corporate Learning",
    "Explainer Videos",
    "Product Demos",
  ],
  terminal: {
    title: "stail-studio — content-gen",
    command: "stail studio create --type training-video",
    lines: [
      "✓ AI Avatar loaded — Priya (Hindi + English)",
      "✓ Script generated from knowledge base",
      "✓ Voice synthesis complete — 2m 34s",
      "✓ Lip sync applied — 97% accuracy",
      "✓ Branding overlay applied",
    ],
    result: "🎬 Video READY for review",
    meta: [
      ["Format", "MP4 1080p + WebM"],
      ["Render", "4.2 seconds"],
      ["Languages", "Hindi, English, Tamil"],
    ],
  },
} as const;

export const RESEARCH = {
  label: "Research",
  heading: "AI Research at STAIL",
  sub: "Advancing the state of AI through focused research in areas that matter most to India's sovereign AI future.",
  areas: [
    "Agentic AI",
    "Sovereign AI",
    "Enterprise LLMs",
    "Mining Intelligence",
    "Multimodal Systems",
    "AI Safety",
    "Indian Language Models",
    "AI for Governance",
    "Federated Learning",
    "Edge AI",
    "AI Infrastructure",
  ],
} as const;

export const CASE_STUDY = {
  label: "Case Study",
  heading: "AI in Action",
  category: "Mining · Sovereign AI Platform",
  title: "TMI — AI Command Center for a Major Colliery",
  body: "A major mining operation needed to replace fragmented manual systems with unified AI intelligence — covering safety, production, maintenance, and ESG reporting. STAIL deployed the Trinetrix Mining Intelligence platform in an on-premise sovereign configuration within 16 weeks.",
  stats: [
    { value: "35%", label: "Downtime Reduction" },
    { value: "0", label: "Safety Blind Spots" },
    { value: "12%", label: "Production Gain" },
    { value: "16W", label: "Time to Deploy" },
  ],
  terminal: {
    title: "tmi — sovereign deploy",
    command: "stail tmi deploy --mine colliery-x --mode sovereign",
    lines: [
      "✓ Edge AI nodes provisioned — 24 units across 6 sections",
      "✓ PPE detection model loaded — 99.2% accuracy",
      "✓ Predictive maintenance pipeline active",
      "✓ ESG monitoring streams connected",
      "✓ Executive dashboard deployed",
    ],
    result: "🚀 TMI LIVE — Mine Intelligence Active 24×7",
    meta: [
      ["Data residency", "On-premise sovereign"],
      ["Latency", "<50ms"],
    ],
  },
} as const;

export const CAREERS = {
  label: "Careers",
  heading: "Build India's AI Future",
  sub: "Join a team of researchers, engineers, and builders working on India's most ambitious AI projects.",
  roles: [
    { name: "AI Engineers", meta: "Full time · Bangalore" },
    { name: "ML Engineers", meta: "Full time · Bangalore" },
    { name: "Research Scientists", meta: "Full time · Bangalore" },
    { name: "Full Stack Devs", meta: "Full time · Bangalore" },
    { name: "AI Product Managers", meta: "Full time · Bangalore" },
  ],
} as const;

export const CONTACT = {
  label: "Contact",
  heading: ["Let's Build India's", "AI Future Together"],
  sub: "Book a strategy call or send us a message. We'll get back to you within 24 hours.",
  callCard: {
    title: "Book a Strategy Call",
    body: "30 minutes. No pitch decks. Just honest advice on how STAIL can transform your organization.",
  },
  sectors: [
    "Government / PSU",
    "Mining",
    "Banking / NBFC",
    "Defense",
    "Healthcare",
    "Education",
    "Agriculture",
    "Manufacturing",
    "Other Enterprise",
  ],
} as const;

export const CTA = {
  headline: ["Sovereign AI.", "India's Future."],
  body: "Join the governments and enterprises that are building with STAIL — India's sovereign AI research and product lab.",
} as const;

export const FOOTER = {
  tagline: "AI Models · AI Infrastructure · AI Transformation",
  address: "Om Chambers, Indiranagar, Bangalore — 560038",
  copyright: `© ${new Date().getFullYear()} ShivTrinetrix AI Labs Private Limited`,
} as const;
