/* ==========================================================================
   Park & Co Australian Visa Solution Guide — First-Class Bilingual Engine
   Supports instant lossless switching between 한국어 (KO) and English (EN)
   ========================================================================== */

(() => {
  "use strict";

  const META_I18N = {
    ko: {
      title: "박앤코 호주 비자 솔루션 가이드 시스템 | Park & Co Lawyers",
      description:
        "호주 이민성 공식 SOL 714개 직종 판독, 이력서 로컬 분석, FY2026–27 패스웨이·점수·리스크 진단 및 법무법인 박앤코(박창민 대표변호사, QLS 이민법 전문변호사) 상담 연동 시스템",
    },
    en: {
      title: "Park & Co Australian Visa Solution Guide | Park & Co Lawyers",
      description:
        "Official 714-occupation Home Affairs SOL & verbatim caveat decoder, private in-memory CV analyzer, FY2026–27 Schedule 6D points & pathway simulator, and direct legal strategy brief with Chang Min Park (QLS Accredited Specialist in Immigration Law).",
    },
  };

  /**
   * Declarative selector -> English specification for static DOM nodes in index.html.
   * On first run, the original Korean text/HTML/attributes are automatically cached
   * on each element so toggling KO <-> EN is 100% lossless and instant.
   */
  const STATIC_EN_ENTRIES = [
    // Accessibility & Header
    { sel: ".skip-link", text: "Skip to main workspace" },
    { sel: ".brand-lockup", attrs: { "aria-label": "Go to Park & Co Lawyers Visa Solution Guide home" } },
    { sel: ".brand-logo", attrs: { alt: "Park & Co Lawyers Logo" } },
    { sel: ".brand-ko-name", text: "Australian Visa Solution Guide" },
    { sel: "#header-verified-pill span", text: "FY 2026–27 Legislation Verified" },
    { sel: ".lang-switch", attrs: { "aria-label": "Language switcher" } },
    {
      sel: ".btn-emergency-header",
      attrs: { href: "https://parklawyers.com.au/case-emergency/visa/" },
    },
    { sel: ".btn-emergency-header span", text: "Visa Emergency™" },
    { sel: '.header-actions [data-nav-target="module-consult"] span', text: "Consultation Brief" },

    // Editorial Hero
    { sel: ".hero-title", html: "From Your Current Status,<br>Which Visa Leads to PR?" },
    {
      sel: ".hero-subtitle",
      html:
        "Replace guesswork with <strong>714 official Home Affairs SOL occupations &amp; verbatim legislative caveats</strong>, " +
        "<strong>private in-memory CV duty analysis</strong>, <strong>updated FY2026–27 English, salary &amp; Schedule 6D points simulation</strong>, and " +
        "<strong>Legal Practitioner Director Chang Min Park's @immispecialist diagnostic briefings</strong> in one unified workspace.",
    },
    { sel: ".hero-section .btn-hero-primary span", text: "Start 1-Min Visa & Points Diagnosis" },
    { sel: ".hero-section .btn-hero-secondary span", text: "Upload Resume · Match Occupation" },
    { sel: ".hero-section .btn-hero-ghost span", text: "Explore 714 SOL & Caveats" },
    { sel: "#btn-hero-master-guide span", text: "Read Complete AU Immigration Guide" },
    {
      sel: ".hero-metrics-strip .hero-metric-item:nth-child(1) .metric-label",
      text: "Official Home Affairs SOL & Verbatim Caveats",
    },
    {
      sel: ".hero-metrics-strip .hero-metric-item:nth-child(2) .metric-label",
      text: "FY26–27 482/186 Min Salary (CSIT)",
    },
    {
      sel: ".hero-metrics-strip .hero-metric-item:nth-child(3) .metric-label",
      text: "@immispecialist Legal Video Briefings",
    },

    // QLS Accredited Specialist Authority Card
    {
      sel: ".specialist-authority-card",
      attrs: { "aria-label": "Chang Min Park QLS Accredited Specialist Credentials" },
    },
    {
      sel: ".qls-specialist-badge",
      attrs: { alt: "Queensland Law Society Accredited Specialist in Immigration Law Official Badge" },
    },
    { sel: ".specialist-name", text: "Chang Min Park" },
    { sel: ".specialist-en-role", text: "Legal Practitioner Director · Accredited Specialist (Imm)" },
    { sel: ".specialist-firm", text: "Park & Co Lawyers (Underwood QLD, Australia)" },
    {
      sel: ".specialist-note",
      html:
        "Built to the standards of a <strong>Queensland Law Society Accredited Specialist in Immigration Law</strong>—" +
        "screening real-world refusal triggers (Caveats · s 48 Bar · Schedule 3 · EOI Over-claiming) before you lodge.",
    },
    {
      sel: ".specialist-links-mini a:nth-child(1)",
      text: "GSM Case Review™",
      attrs: { href: "https://parklawyers.com.au/case-review/gsm-case-review/" },
    },
    {
      sel: ".specialist-links-mini a:nth-child(2)",
      text: "Visa Emergency™",
      attrs: { href: "https://parklawyers.com.au/case-emergency/visa/" },
    },
    {
      sel: ".specialist-links-mini a:nth-child(3)",
      text: "ART Case Review™",
      attrs: { href: "https://parklawyers.com.au/appealing-visa-decision/" },
    },
    { sel: ".specialist-contact-bar span", text: "Official Legal Inquiry" },
    {
      sel: ".specialist-email-link",
      text: "Official Inquiry Hub ↗",
      attrs: { href: "https://parklawyers.com.au/links/" },
    },

    // Sticky 6-Module Navigation Rail
    { sel: ".module-nav-rail", attrs: { "aria-label": "6 Core Visa Solution Modules" } },
    { sel: '[data-module-tab="module-concepts"] .tab-label', text: "Concepts & Videos" },
    { sel: '[data-module-tab="module-resume"] .tab-label', text: "Occupation & CV Match" },
    { sel: '[data-module-tab="module-sol"] .tab-label', text: "SOL & Caveat Decoder" },
    { sel: '[data-module-tab="module-diagnose"] .tab-label', text: "Visa & Points Simulator" },
    { sel: '[data-module-tab="module-pathways"] .tab-label', text: "Pathways & All Visas" },
    { sel: '[data-module-tab="module-consult"] .tab-label', text: "Consult & Services" },
    { sel: '[data-module-tab="module-guide"] .tab-label', text: "Master Guide & Clocks" },
    { sel: "#heading-guide", text: "Complete Australian Migration, Visa, Review & Citizenship Guide" },
    {
      sel: "#guide-section-desc",
      html:
        "Explore 12 primary-source-verified chapters and 4 deterministic statutory calculators grounded in the Migration Act 1958 (Comp. 172), Migration Regulations 1994 (Comp. 289), FY2026–27 salary/VAC instruments, <strong>Ministerial Direction No. 123 (eff. 31 October 2026)</strong>, and ART s 367C on-the-papers reforms.",
    },
    {
      sel: "#guide-official-cta",
      attrs: { href: "https://parklawyers.com.au/links/" },
    },
    { sel: "#guide-official-cta span", text: "1:1 Legal Inquiry Hub ↗" },
    {
      sel: "#guide-search-input",
      attrs: {
        placeholder: "Search statute, subclass, or keyword (e.g. Direction 123, s 48, 482, citizenship)",
        "aria-label": "Search Australian Master Guide",
      },
    },
    { sel: "#guide-calc-heading", text: "4 Deterministic Australian Statutory Deadline, Bar & Salary Calculators" },
    {
      sel: "#guide-calc-subdesc",
      text: "Verify non-extendable ART/s 501 clocks, s 48 & Schedule 3 onshore rules, Citizenship s 22 / NZ 444 residence dates, and FY2026–27 CSIT/SSIT/SAF obligations.",
    },

    // Module 01: Concepts & @immispecialist Video Hub
    { sel: "#heading-concepts", text: "Master the Big Picture of Australian Migration First" },
    {
      sel: "#module-concepts .section-desc",
      html:
        "Home Affairs' Visa Finder and Skilled Occupation List operate on three interlocking pillars: " +
        "<strong>(1) Occupation Eligibility (SOL &amp; Skills Assessment)</strong>, " +
        "<strong>(2) Temporary Stepping Stones (Experience &amp; English Build-up)</strong>, and " +
        "<strong>(3) Permanent Residence Gateways (Points Invitation vs Employer Sponsorship vs Family/Talent)</strong>.",
    },
    { sel: "#module-concepts .btn-outline-burgundy span", text: "Browse Full @immispecialist Channel" },
    { sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(1) h3", text: "Entry, Study & Initial Stay Design" },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(1) .stage-visas",
      text: "Subclass 500 (Student) · 417 (WHM) · 600 (Visitor)",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(1) .stage-body",
      text:
        "Every first visa shapes your PR timeline. Since 1 July 2024, onshore Student Visa (500) hopping from Visitor (600) or Graduate (485) visas is statutorily banned—making initial pathway selection critical.",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(2) h3",
      text: "Skills Assessment, Experience & English",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(2) .stage-visas",
      text: "Subclass 485 (Graduate) · JRP/ACS/VETASSESS · PTE/IELTS",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(2) .stage-body",
      text:
        "Your Subclass 485 window (capped at age 35; under 50 for Masters by Research/PhD) is prime time to secure your skills assessment, 1+ year of full-time work (for 482), and revised PTE/IELTS scores.",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(3) h3",
      text: "Employer Sponsorship & Regional Bridges",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(3) .stage-visas",
      text: "Subclass 482 SID · 491 (Regional +15) · 494 · 13 DAMAs",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(3) .stage-body",
      text:
        "Where Subclass 189 points fall short, your occupation sits on STSOL, or you are 45+, Employer Sponsorship (482 SID at $79,423+ CSIT), Regional State Nomination (491), or a 13-region DAMA opens practical doors.",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(4) h3",
      text: "Permanent Residence (PR) Settlement",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(4) .stage-visas",
      text: "189 · 190 · 186 (TRT/DE) · 191 · 820/801 · 858 NIV",
    },
    {
      sel: ".concept-lifecycle-grid .concept-stage-card:nth-child(4) .stage-body",
      text:
        "Lock in PR via 186 TRT after 2 years on 482, Subclass 191 after 3 years regional residence & tax returns on 491 ($0 minimum income floor), direct 190 State Nomination, Partner (820/801), or 858 NIV.",
    },
    { sel: ".statutory-strip-header .pill-burgundy", text: "Effective 1 July 2026 Statutory Figures" },
    {
      sel: ".statutory-strip-header .statutory-source-note",
      text: "Legislative Basis: F2026L00874 · LIN 24/089 · LIN 24/093 · LIN 25/082",
    },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(1) .stat-kpi-label", text: "482 Core / 186 Min Salary (CSIT)" },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(1) .stat-kpi-val", text: "AUD $79,423" },
    {
      sel: "#statutory-kpi-grid .stat-kpi:nth-child(1) .stat-kpi-sub",
      text: "Excl. Super · DAMA 90% Concession $71,481",
    },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(2) .stat-kpi-label", text: "482 Specialist Stream (SSIT)" },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(2) .stat-kpi-val", text: "AUD $146,576" },
    {
      sel: "#statutory-kpi-grid .stat-kpi:nth-child(2) .stat-kpi-sub",
      text: "186 TRT Age Exemption (FWHIT): $190,100",
    },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(3) .stat-kpi-label", text: "GSM Min Pool / Employment Cap" },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(3) .stat-kpi-val", text: "65 Pts / Max 20 Pts" },
    {
      sel: "#statutory-kpi-grid .stat-kpi:nth-child(3) .stat-kpi-sub",
      text: "Schedule 6D Item 6D51 Combined AU+OS Cap",
    },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(4) .stat-kpi-label", text: "FY2026–27 Key Base VACs" },
    { sel: "#statutory-kpi-grid .stat-kpi:nth-child(4) .stat-kpi-val", text: "482 $4,015 · PR $6,140" },
    {
      sel: "#statutory-kpi-grid .stat-kpi:nth-child(4) .stat-kpi-sub",
      text: "Partner $11,710 · 485 $5,750 · 500 $2,500",
    },
    {
      sel: ".video-hub-top .subsection-title",
      text: "Curated @immispecialist Self-Diagnosis & Strategy Briefings",
    },
    {
      sel: ".video-hub-top .subsection-desc",
      text:
        "Hand-picked briefings by Legal Practitioner Director Chang Min Park (Korean audio with curated English legal takeaways) organised by migration scenario.",
    },
    { sel: 'label[for="video-search-input"]', text: "Search video title or visa subclass" },
    {
      sel: "#video-search-input",
      attrs: { placeholder: "Search videos (e.g., age 45, chef, 482, partner, refusal)..." },
    },
    { sel: "#video-category-chips", attrs: { "aria-label": "Video topic filters" } },

    // Module 02: Occupation Duty Matcher & Local CV Analyzer
    { sel: "#heading-resume", text: "Identify Your ANZSCO Occupation via Duties & Local CV Analysis" },
    {
      sel: "#module-resume .section-desc",
      html:
        "Australian immigration assesses your <strong>actual performed duties (ABS ANZSCO Tasks)</strong>, not merely your job title. " +
        "Search in English or Korean—or upload your CV (PDF · DOCX · TXT)—to match eligible SOL occupations and spot high-risk occupation confusion traps.",
    },
    {
      sel: "#module-resume .dual-workspace-grid > .panel-card:nth-child(1) .panel-card-head h3",
      text: "Keyword & Duty-Based Occupation Matcher",
    },
    {
      sel: "#module-resume .dual-workspace-grid > .panel-card:nth-child(1) .panel-card-head .badge-subtle",
      text: "EN/KR Natural Duty Matching",
    },
    {
      sel: 'label[for="duty-query-input"]',
      text: "Enter your job title, tech stack, or core daily duties",
    },
    {
      sel: "#duty-query-input",
      attrs: {
        placeholder:
          "e.g., Full-stack React Python API architecture / Chef menu costing kitchen supervision / Wall & floor tiling",
      },
    },
    { sel: '#duty-search-form button[type="submit"]', text: "Match Occupation" },
    { sel: ".preset-chips-wrap .preset-label", text: "Popular Duty Presets:" },
    { sel: ".preset-chips-wrap button:nth-of-type(1)", text: "Chef vs Cook (Hospitality)" },
    { sel: ".preset-chips-wrap button:nth-of-type(2)", text: "ICT Software Engineering" },
    { sel: ".preset-chips-wrap button:nth-of-type(3)", text: "Registered Nurse (RN)" },
    { sel: ".preset-chips-wrap button:nth-of-type(4)", text: "Wall & Floor Tiler" },
    { sel: ".preset-chips-wrap button:nth-of-type(5)", text: "Accounting & Tax" },
    { sel: ".preset-chips-wrap button:nth-of-type(6)", text: "Early Childhood Teacher (ECT)" },

    {
      sel: "#module-resume .dual-workspace-grid > .panel-card:nth-child(2) .panel-card-head h3",
      text: "Upload Resume (CV) & Auto-Extract Experience",
    },
    {
      sel: "#module-resume .dual-workspace-grid > .panel-card:nth-child(2) .panel-card-head .badge-privacy",
      text: "Zero External API · Ephemeral Memory",
    },
    { sel: ".sample-personas-box .preset-label", text: "No CV handy? Try a 1-click sample profile:" },
    { sel: "#resume-dropzone", attrs: { "aria-label": "Upload PDF, DOCX, or TXT resume file" } },
    { sel: ".dropzone-title", text: "Drag & drop your PDF · DOCX · TXT resume here, or click to browse" },
    { sel: ".dropzone-sub", text: "Max 10 MB · Analysed in local memory and discarded immediately" },
    { sel: ".paste-resume-details summary", text: "Or paste your resume / employment history text directly" },
    { sel: 'label[for="resume-paste-textarea"]', text: "Paste resume text" },
    {
      sel: "#resume-paste-textarea",
      attrs: {
        placeholder:
          "Paste employment dates (e.g., 2021.03 - 2024.06), job titles, duties, qualifications, and IELTS/PTE scores...",
      },
    },
    { sel: "#btn-analyze-pasted", text: "Analyse Pasted Resume" },

    // Module 03: Official 714 SOL Explorer & Caveats
    { sel: "#heading-sol", text: "Decode Visa Eligibility & Caveats Across All 714 Official SOL Occupations" },
    {
      sel: "#module-sol .section-desc",
      html:
        "Whether your occupation sits on <strong>MLTSSL · STSOL · CSOL · ROL</strong> determines Subclass 189 Independent vs Subclass 482 Sponsorship eligibility. " +
        "Select any occupation card to inspect <strong>ANZSCO 2022/2013 mapping, assessing authorities, 13-region DAMA concessions, and verbatim Home Affairs legislative caveats</strong>.",
    },
    { sel: 'label[for="sol-query-input"]', text: "Search Occupation Title (EN/KR) or ANZSCO Code" },
    {
      sel: "#sol-query-input",
      attrs: { placeholder: "e.g., 351311, Chef, Registered Nurse, Software Engineer, Accountant, Tiler..." },
    },
    { sel: 'label[for="sol-list-select"]', text: "Skilled Occupation List" },
    { sel: '#sol-list-select option[value=""]', text: "All Official Lists (714)" },
    { sel: '#sol-list-select option[value="MLTSSL"]', text: "MLTSSL (Medium/Long-Term — 189 · 485 Eligible)" },
    { sel: '#sol-list-select option[value="CSOL"]', text: "CSOL (Core 482 SID & 186 DE)" },
    { sel: '#sol-list-select option[value="STSOL"]', text: "STSOL (Short-Term — 190 · 491 Only, No 189)" },
    { sel: '#sol-list-select option[value="ROL"]', text: "ROL (Regional Only — 491 · 494)" },
    { sel: '#sol-list-select option[value="DAMA"]', text: "13 Regional DAMAs Eligible" },
    { sel: 'label[for="sol-visa-select"]', text: "Eligible Visa Subclass" },
    { sel: '#sol-visa-select option[value=""]', text: "All Subclasses" },
    { sel: '#sol-visa-select option[value="189"]', text: "Subclass 189 (Skilled Independent)" },
    { sel: '#sol-visa-select option[value="190"]', text: "Subclass 190 (State Nominated PR)" },
    { sel: '#sol-visa-select option[value="491"]', text: "Subclass 491 (Regional +15 Pts)" },
    { sel: '#sol-visa-select option[value="482"]', text: "Subclass 482 (SID Employer Sponsored)" },
    { sel: '#sol-visa-select option[value="186"]', text: "Subclass 186 (ENS Direct PR)" },
    { sel: '#sol-visa-select option[value="494"]', text: "Subclass 494 (Regional Employer)" },
    { sel: '#sol-visa-select option[value="485"]', text: "Subclass 485 (Graduate PVEW)" },
    { sel: 'label[for="sol-skill-select"]', text: "ANZSCO Skill Level" },
    { sel: '#sol-skill-select option[value=""]', text: "All Skill Levels" },
    { sel: '#sol-skill-select option[value="1"]', text: "Skill Level 1 (Bachelor+ Professional)" },
    { sel: '#sol-skill-select option[value="2"]', text: "Skill Level 2 (Diploma / Associate)" },
    { sel: '#sol-skill-select option[value="3"]', text: "Skill Level 3 (Trades, Culinary & Technical)" },
    { sel: ".sol-summary-line .ext-source-link", text: "Open Official Home Affairs SOL Page ↗" },

    // Module 04: Multi-Factor Visa & Risk Simulator
    { sel: "#heading-diagnose", text: "Simulate Your Optimal Visa Pathways, Schedule 6D Points & Legal Risks" },
    {
      sel: "#module-diagnose .section-desc",
      text:
        "Simultaneously evaluates Schedule 6D points (auto-applying the 20-point combined employment cap), SOL & Caveat rules, age 35/45 statutory ceilings, onshore Student 500 hopping bans, Partner Schedule 3 risks, and Section 48 bars.",
    },
    {
      selAll: "#diagnose-form .form-group-title",
      texts: [
        "1. Target Occupation & Current Immigration Status",
        "2. Qualifications, English & Skilled Employment (Schedule 6D)",
        "3. Employer Sponsorship, Family, Talent & Crisis Checkpoints",
      ],
    },
    { sel: 'label[for="diag-anzsco-input"]', text: "Target Occupation (ANZSCO Code or Title)" },
    {
      sel: "#diag-anzsco-input",
      attrs: { placeholder: "e.g., 261313, 351311, Chef, Nurse (leave blank for Partner/Family-only)" },
    },
    { sel: "#btn-diag-lookup-occ", text: "Apply" },
    { sel: 'label[for="diag-location"]', text: "Current Location" },
    { sel: '#diag-location option[value="onshore"]', text: "Inside Australia (Onshore)" },
    { sel: '#diag-location option[value="offshore"]', text: "Outside Australia (Offshore)" },
    { sel: 'label[for="diag-current-visa"]', text: "Current Australian Visa" },
    { sel: '#diag-current-visa option[value="graduate_485"]', text: "Temporary Graduate (Subclass 485)" },
    { sel: '#diag-current-visa option[value="student_500"]', text: "Student Visa (Subclass 500)" },
    { sel: '#diag-current-visa option[value="whm_417"]', text: "Working Holiday (Subclass 417/462)" },
    { sel: '#diag-current-visa option[value="sponsored_482"]', text: "Employer Sponsored (Subclass 482)" },
    { sel: '#diag-current-visa option[value="visitor_600"]', text: "Visitor / ETA (Subclass 600/601/651)" },
    { sel: '#diag-current-visa option[value="bridging_or_expired"]', text: "Bridging Visa / Expired Substantive Visa" },
    { sel: '#diag-current-visa option[value="none"]', text: "Offshore (No Australian Visa)" },
    { sel: 'label[for="diag-age"]', text: "Age Bracket (At Invitation / Lodgement)" },
    { sel: '#diag-age option[value="18_24"]', text: "Age 18–24 (+25 pts)" },
    { sel: '#diag-age option[value="25_32"]', text: "Age 25–32 (+30 pts · Maximum)" },
    { sel: '#diag-age option[value="33_39"]', text: "Age 33–39 (+25 pts · Check 485 age cap)" },
    { sel: '#diag-age option[value="40_44"]', text: "Age 40–44 (+15 pts)" },
    { sel: '#diag-age option[value="45_49"]', text: "Age 45–49 (Excluded from Standard GSM)" },
    { sel: '#diag-age option[value="50_plus"]', text: "Age 50+ (Sponsor · DAMA · Family · NIV)" },
    { sel: 'label[for="diag-planned-step"]', text: "Primary Migration Goal" },
    { sel: '#diag-planned-step option[value="best_pr"]', text: "Fastest / Optimal Permanent Residence" },
    { sel: '#diag-planned-step option[value="sponsor_482"]', text: "Employer Sponsorship (482 / 186 / DAMA)" },
    { sel: '#diag-planned-step option[value="student_500"]', text: "Study in Australia (Subclass 500)" },
    { sel: '#diag-planned-step option[value="partner"]', text: "Australian Partner / Spouse Visa (820/309/300)" },
    { sel: '#diag-planned-step option[value="parent_or_family"]', text: "Parent / Family Sponsorship" },
    { sel: 'label[for="diag-english"]', text: "Official English Test Tier (Aug/Sep 2025 PTE Rules)" },
    { sel: '#diag-english option[value="superior"]', text: "Superior (+20 pts · IELTS 8.0+ / PTE L69·R70·W85·S88)" },
    { sel: '#diag-english option[value="proficient"]', text: "Proficient (+10 pts · IELTS 7.0+ / PTE L58·R59·W69·S76)" },
    { sel: '#diag-english option[value="competent"]', text: "Competent (+0 pts · IELTS 6.0+ / PTE L47·R48·W51·S54)" },
    { sel: '#diag-english option[value="vocational_482"]', text: "482 SID Minimum (IELTS 5.0 / PTE L33·R36·W29·S24)" },
    { sel: '#diag-english option[value="below_threshold"]', text: "No Score Yet / Preparing" },
    { sel: 'label[for="diag-qual"]', text: "Highest Recognised Qualification" },
    { sel: '#diag-qual option[value="phd"]', text: "Doctorate / PhD (+20 pts)" },
    { sel: '#diag-qual option[value="bachelor_masters"]', text: "Bachelor or Masters Degree (+15 pts)" },
    { sel: '#diag-qual option[value="diploma_trade"]', text: "Australian Diploma / Trade Qualification (+10 pts)" },
    { sel: '#diag-qual option[value="other"]', text: "Other / Secondary School (+0 pts)" },
    { sel: 'label[for="diag-partner-pts"]', text: "Partner Points Status" },
    {
      sel: '#diag-partner-pts option[value="single_or_au_partner"]',
      text: "Single OR Australian Citizen/PR Partner (+10 pts)",
    },
    {
      sel: '#diag-partner-pts option[value="skilled_partner"]',
      text: "Partner with Skills Assessment + Competent English (+10 pts)",
    },
    { sel: '#diag-partner-pts option[value="english_partner"]', text: "Partner with Competent English Only (+5 pts)" },
    {
      sel: '#diag-partner-pts option[value="partner_no_points"]',
      text: "Accompanying Partner Below Thresholds (+0 pts)",
    },
    { sel: 'label[for="diag-au-work"]', text: "Australian Skilled Employment (Last 10 Yrs)" },
    { sel: '#diag-au-work option[value="0"]', text: "Under 1 year (+0 pts)" },
    { sel: '#diag-au-work option[value="1_2"]', text: "1 to <3 years (+5 pts · Meets 482)" },
    { sel: '#diag-au-work option[value="3_4"]', text: "3 to <5 years (+10 pts · Meets 186 DE)" },
    { sel: '#diag-au-work option[value="5_7"]', text: "5 to <8 years (+15 pts)" },
    { sel: '#diag-au-work option[value="8+"]', text: "8+ years (+20 pts)" },
    { sel: 'label[for="diag-os-work"]', text: "Overseas Skilled Employment (Last 10 Yrs)" },
    { sel: '#diag-os-work option[value="0"]', text: "Under 3 years (+0 pts)" },
    { sel: '#diag-os-work option[value="3_4"]', text: "3 to <5 years (+5 pts)" },
    { sel: '#diag-os-work option[value="5_7"]', text: "5 to <8 years (+10 pts)" },
    { sel: '#diag-os-work option[value="8+"]', text: "8+ years (+15 pts)" },
    { sel: "#diag-au-study + span", text: "Australian Study Requirement Met (+5 pts)" },
    { sel: "#diag-stem-research + span", text: "AU STEM Masters by Research / PhD 2+ yrs (+10 pts)" },
    { sel: "#diag-regional-study + span", text: "Study in Designated Regional Australia (+5 pts)" },
    { sel: "#diag-naati + span", text: "NAATI CCL Credentialed (+5 pts)" },
    { sel: "#diag-py + span", text: "Professional Year in Australia (+5 pts)" },
    { sel: "#diag-regional-willing + span", text: "Open to Regional Living/Work (491 / 494 / DAMA)" },
    { sel: "#diag-has-sponsor + span", text: "Have Willing Employer Sponsor (482 / 186 / 494)" },
    { sel: 'label[for="diag-salary"]', text: "Offered / Expected Base Salary (AUD, excl. Super)" },
    { sel: "#diag-salary", attrs: { placeholder: "e.g., 85000 (CSIT $79,423)" } },
    { sel: "#diag-au-partner-visa + span", text: "Have Australian Citizen / PR Spouse or Partner (820/309)" },
    { sel: "#diag-global-talent + span", text: "Exceptional Research / Patent / Founder Profile (858 NIV)" },
    { sel: "#diag-parent-visa + span", text: "Have Settled Australian Citizen / PR Child (Parent 143/870)" },
    { sel: "#diag-s57-pic4020 + span", text: "[URGENT] Received s 57 / NOICC / PIC 4020 Notice" },
    { sel: "#diag-prior-refusal + span", text: "[URGENT] Prior Visa Refusal / Cancellation or s 48 Bar" },
    { sel: "#diag-health-char + span", text: "Medical Condition or Character / Police Record" },
    { sel: '#diagnose-form .diagnose-submit-row button[type="submit"]', text: "Run Multi-Factor Visa & Legal Risk Simulation" },

    // Module 05: Pathway Blueprints & Non-Skilled Panorama
    { sel: "#heading-pathways", text: "Step-by-Step Pathway Blueprints & Non-Skilled / Special Visa Panorama" },
    {
      sel: "#module-pathways .section-desc",
      html:
        "Compare stage-by-stage requirements and refusal traps across the 5 core skilled/sponsored lifecycles alongside " +
        "<strong>Partner Visas (820/309/300), National Innovation Visa (858 NIV), Parent Visas (143/870/103), Training (407), Special Status (461/155), and ART Merits Review</strong>.",
    },
    { sel: "#module-pathways > h3.subsection-title", text: "5 Core Skilled, Graduate & Sponsored Lifecycle Roadmaps" },
    {
      sel: "#module-pathways .matrix-card .panel-card-head h3",
      text: "Revised Aug/Sep 2025 Official Australian Visa English Score Matrix",
    },
    {
      sel: "#module-pathways .matrix-card .panel-card-head .subsection-desc",
      text:
        "Legislative Instruments: LIN 25/016 · LIN 25/082 · LIN 25/089 — All remote/at-home tests (IELTS Online, TOEFL Home, etc.) are strictly excluded.",
    },
    { sel: "#english-matrix-table thead th:nth-child(1)", text: "English Tier (Applicable Visas & Points)" },
    { sel: "#english-matrix-table thead th:nth-child(2)", text: "IELTS (A/G)" },
    { sel: "#english-matrix-table thead th:nth-child(3)", text: "Revised PTE Academic (Aug 2025+)" },
    { sel: "#english-matrix-table thead th:nth-child(4)", text: "TOEFL iBT" },
    { sel: "#english-matrix-table thead th:nth-child(5)", text: "CELPIP G" },
    { sel: "#english-matrix-table thead th:nth-child(6)", text: "Validity" },
    {
      sel: ".non-skilled-section .subsection-title",
      text: "Partner, Family, Innovation (858 NIV), Special Visas & Review Remedies",
    },
    {
      sel: ".non-skilled-section .subsection-desc",
      text:
        "Complete guide for applicants pursuing partner/family sponsorship, global talent invitation, Resident Return Visas, or post-refusal legal remedies.",
    },

    // Module 06: Consultation Brief & Park & Co Trademark Services
    { sel: "#heading-consult", text: "Finalise Your Migration Strategy with Park & Co Lawyers" },
    {
      sel: "#module-consult .section-desc",
      html:
        "Your occupation match, Schedule 6D points, ranked pathways, and statutory risk flags have been compiled into a structured legal brief. " +
        "Copy the brief into the <strong>official inquiry link (parklawyers.com.au/links)</strong> or launch the dedicated Park &amp; Co trademark service for your matter.",
    },
    { sel: ".consult-brief-card .panel-card-head h3", text: "Tailored Diagnostic Consultation Brief (Editable)" },
    { sel: ".consult-brief-card .panel-card-head .pill-burgundy", text: "Official Inquiry Hub Linked" },
    { sel: 'label[for="brief-name-input"]', text: "Full Name / Preferred Name" },
    { sel: "#brief-name-input", attrs: { placeholder: "e.g., Minjun Kim" } },
    { sel: 'label[for="brief-notes-input"]', text: "Key Questions for Legal Practitioner Director Chang Min Park" },
    {
      sel: "#brief-notes-input",
      attrs: { placeholder: "e.g., Can we lodge Subclass 482 nomination before my 485 expires?" },
    },
    { sel: 'label[for="brief-body-textarea"]', text: "Full Consultation Brief (Feel free to edit before sending)" },
    { sel: ".brief-lang-toggle", attrs: { "aria-label": "Select Consultation Brief Language" } },
    { sel: '[data-brief-lang="ko"]', text: "Korean Brief (KO)" },
    { sel: '[data-brief-lang="en"]', text: "English Brief (EN)" },
    { sel: "#btn-copy-and-book span", text: "Copy Brief & Open Official Inquiry Link" },
    {
      sel: "#btn-inquiry-consult",
      attrs: { href: "https://parklawyers.com.au/links/" },
    },
    { sel: "#btn-inquiry-consult span", text: "Open Official Inquiry & Booking Hub ↗" },
    { sel: "#btn-print-brief span", text: "Print / Save PDF Report" },
    {
      sel: "#copy-toast-msg",
      text: "Your diagnostic brief has been copied to the clipboard—paste it directly into the official inquiry form!",
    },
    { sel: ".consult-services-stack .panel-card-head h3", text: "Park & Co Official Trademark Legal Services" },
    { sel: ".navigators-panel .panel-card-head h3", text: "Park & Co Specialist Calculators & Deep-Dive Navigators" },
    {
      sel: ".navigators-panel .panel-card-head .subsection-desc",
      text:
        "Cross-check state nomination cut-offs, 3-tier employer sponsorship costs, 13-region DAMA schedules, and live 74-stream processing times.",
    },

    // Video Modal & Legal Footer
    { sel: "#btn-close-video-modal", attrs: { "aria-label": "Close video player" } },
    { sel: "#video-modal-ext-link", text: "Watch on YouTube ↗" },
    { sel: "#vc-lbl-total", text: "Total Visits" },
    { sel: "#vc-lbl-today", text: "Today" },
    { sel: "#vc-lbl-visitors", text: "Visitors" },
    { sel: "#visit-counter", attrs: { title: "Click to view 30-day daily visit chart" } },
    {
      sel: ".footer-firm-info",
      html:
        "<strong>Park &amp; Co Lawyers</strong> · Legal Practitioner Director Chang Min Park (Accredited Specialist in Immigration Law — QLS)<br>" +
        'Underwood QLD, Australia · Official Inquiry: <a href="https://parklawyers.com.au/links/" target="_blank" rel="noopener noreferrer">parklawyers.com.au/links</a>',
    },
    {
      sel: ".footer-disclaimer p",
      html:
        "<strong>Legal Disclaimer:</strong> Occupation matching, CV extraction, Schedule 6D points calculations, and pathway simulations generated by this system provide general legal information based on public Department of Home Affairs legislation and SOL datasets (FY2026–27) and do not constitute formal legal advice or guarantee visa approval. " +
        "Always verify current statutory instruments and your individual evidence with a qualified Australian immigration lawyer before lodging.",
    },
  ];

  const UI_STRINGS = {
    ko: {
      apiError: (status) => `요청 처리 중 오류가 발생했어요 (${status})`,
      videoEmpty: "검색 조건에 맞는 영상이 없어요. 다른 키워드나 전체 카테고리를 선택해 보세요.",
      videoDurationFallback: "강의",
      videoPlayAria: (t) => `${t} 영상 재생`,
      videoWatchCta: "영상 보기 ↗",
      videoKrAudioPill: "",
      videoCurationScopeNote: (total, curated, uncurated) =>
        `채널 전체 인덱싱 ${total}편 중 호주 이민 핵심 강의 ${curated}편을 엄선해 제공하며, 큐레이션 외 인덱싱 영상 ${uncurated}편(고용법·가족법·일반 판례 등 비이민 주제 포함)은 자동 편입하지 않았어요.`,
      confusionHeading: (t) => `유사 직종 혼동 주의: ${t}`,
      dutyEmpty:
        "일치하는 SOL 직종을 찾지 못했어요. 담당 업무(예: 메뉴 기획, API 개발, 재무제표, 타일 시공)를 조금 더 구체적으로 적어 보세요.",
      caveatPill: "Caveat 조건 있음",
      fitScore: (s) => `적합도 ${s}`,
      solDetailBtn: "SOL·Caveat 상세",
      diagThisOccBtn: "이 직종으로 진단 →",
      resumeReportTitle: (fn) => `이력서 분석 리포트 — ${fn}`,
      applyResumeBtn: "진단 시뮬레이터에 자동 반영 →",
      mergedExpChip: (y) => `병합 순수 경력: 약 ${y}년`,
      auExpChip: (det) => `호주 경력: ${det ? "감지됨" : "미감지"}`,
      auStudyChip: (det) => `호주 학위: ${det ? "감지됨" : "미감지"}`,
      qualChip: (q) => `학력: ${q}`,
      engChip: (e) => `영어 단서: ${e}`,
      engNotSpecified: "미기재 (확인 필요)",
      qualMap: {
        phd: "박사 학위 (PhD)",
        bachelor_masters: "학사/석사 학위",
        diploma_trade: "Diploma / 기능직 학위",
        other: "기타/미상",
      },
      fileTooLarge: "파일 크기가 10MB를 초과했어요. 10MB 이하의 PDF, DOCX, TXT 파일을 올려 주세요.",
      fileAnalyzeErr: "이력서 파일 분석 중 오류가 발생했어요.",
      fileNetworkErr: "이력서 업로드 중 네트워크 오류가 발생했어요.",
      solLoading: "공식 SOL 직종 로딩 중...",
      solCounter: (tot, shown) => `검색 조건 부합 직종: 총 ${tot}개 (상위 ${shown}개 표시 중)`,
      solEmpty: "선택하신 필터에 해당하는 직종이 없어요. 필터 조건을 완화해 보세요.",
      solSelectHint:
        "왼쪽 목록에서 직종을 선택하시면 가능 비자, 기술심사 기관, DAMA 특례 및 이민성 법령 원문 Caveat을 상세히 판독해 드려요.",
      variesByStream: "비자 스트림별 상이",
      caveatHeading: (sc) => `Subclass ${sc} 법령 제한 조건 (Caveat)`,
      caveatSummaryLabel: "박앤코 실무 요약:",
      noCaveatTitle: "특수 직종 Caveat 없음:",
      noCaveatBody:
        "이민성 직종 리스트상 별도의 매출·좌석·사업장 제한 Caveat이 부과되지 않는 직종이에요 (기본 비자 요건만 충족하면 돼요).",
      damaHeading: (cnt) => `13개 지역 DAMA 특례 등재 (${cnt}개 지역):`,
      damaSub: (age, sal) =>
        `최대 만 ${age}세 미만 연령 완화 · 최소 연봉 AUD $${Number(sal).toLocaleString()} 특례 검토 가능`,
      diagWithThisOccCta: "이 직종으로 맞춤 비자 진단 →",
      cutoff189: (pts) => `189 최근 커트라인: ${pts ? `${pts}점` : "MLTSSL 전용/미발표"}`,
      assessingAuthLabel: "공식 기술심사 기관 (Assessing Authority):",
      eligibleStreamsLabel: "신청 가능 비자 스트림:",
      absDefLabel: "ABS 직종 정의:",
      absTasksLabel: "ABS 공식 핵심 수행 직무 (기술심사·노미네이션 대조 기준):",
      selectedOccPrefix: "선택 직종:",
      unselectedOccBadge: "선택 직종: 미지정 (가족·파트너·인재 등 비숙련/특례 경로 중심 진단)",
      compareHeading: "1순위 vs 2순위 패스웨이 전략 비교",
      compareDimCol: "비교 항목",
      fitIndex: (s) => `적합지수 ${s}`,
      baseVacLabel: (v) => `기본 비자비: ${v}`,
      procTimeLabel: (t) => `공식 수속기간: ${t}`,
      noPrimaryPathwayMsg:
        "현재 조건에서는 표준 기술·스폰서 비자 직접 요건에 제한이 있어요. 아래 리스크 경보와 05번 탭의 DAMA·파트너·가족·858 NIV 대안 경로 및 박앤코 1:1 전략 상담을 확인해 보세요.",
      highlightedOtherHeading: "선택하신 가족 · 인재 · 구제 조건 맞춤 경로",
      recServicesHeading: "진단 상황별 추천 박앤코 공식 법률 서비스",
      openServiceCta: "서비스 바로가기 ↗",
      watchGuideVideoBtn: "안내 영상 보기",
      recVideosHeading: "내 진단 상황에 꼭 맞는 @immispecialist 추천 영상",
      watchShortLabel: "시청",
      cap6d51Pill: "Item 6D51 경력 20점 상한 반영됨",
      ptsUnit: (n) => `${n}점`,
      tier189Label: "189 독립기술 기준",
      tier190Label: "190 주정부 (+5)",
      tier491Label: "491 지방 주정부 (+15)",
      buildConsultBriefBtn: "이 진단 결과로 박앤코 상담 브리프 작성 →",
      riskSectionHeading: (n) => `사전 법률 리스크 & 체크포인트 (${n}건)`,
      referenceNotesHeading: (n) => `참고 사항 (${n}건)`,
      noCheckpointsHint: "즉시 걸리는 P1·P2 법령 결격 체크포인트는 확인되지 않았어요 (0건).",
      rankedPathwaysHeading: "유력 비자 패스웨이 판정 결과",
      blueprintTrapsLabel: "실무 핵심 주의점:",
      fyVacPrefix: (v) => `FY26–27 비자비: ${v}`,
      openTmServiceCta: (tm) => `${tm} 바로가기 ↗`,
      principalVideoBtn: "대표변호사 안내 영상",
    },
    en: {
      apiError: (status) => `Request failed (HTTP ${status})`,
      videoEmpty: "No curated videos match your filter. Try another keyword or select 'All Curated Videos'.",
      videoDurationFallback: "Briefing",
      videoPlayAria: (t) => `Play video: ${t}`,
      videoWatchCta: "Watch Briefing ↗",
      videoKrAudioPill: "KR Audio · EN Takeaway",
      videoCurationScopeNote: (total, curated, uncurated) =>
        `${curated} core Australian migration briefings are curated here out of ${total} indexed channel videos; ${uncurated} indexed videos outside curation (including employment/family law & general case updates) are excluded from auto-inclusion.`,
      confusionHeading: (t) => `Occupation Confusion Alert: ${t}`,
      dutyEmpty:
        "No matching SOL occupation found. Try adding specific duties (e.g., menu costing, REST API architecture, financial reporting, ceramic tiling).",
      caveatPill: "Caveat Applies",
      fitScore: (s) => `Match ${s}`,
      solDetailBtn: "SOL & Caveats",
      diagThisOccBtn: "Diagnose Occupation →",
      resumeReportTitle: (fn) => `CV Extraction Report — ${fn}`,
      applyResumeBtn: "Auto-Fill Simulator →",
      mergedExpChip: (y) => `De-overlapped Experience: ~${y} yrs`,
      auExpChip: (det) => `AU Work: ${det ? "Detected" : "Not Detected"}`,
      auStudyChip: (det) => `AU Study: ${det ? "Detected" : "Not Detected"}`,
      qualChip: (q) => `Qualification: ${q}`,
      engChip: (e) => `English Clue: ${e}`,
      engNotSpecified: "Not Listed (Verify Score)",
      qualMap: {
        phd: "Doctorate (PhD)",
        bachelor_masters: "Bachelor / Masters Degree",
        diploma_trade: "Diploma / Trade Qualification",
        other: "Other / Unspecified",
      },
      fileTooLarge: "File exceeds the 10 MB limit. Please upload a PDF, DOCX, or TXT file under 10 MB.",
      fileAnalyzeErr: "An error occurred while analysing your resume file.",
      fileNetworkErr: "A network error occurred while uploading your resume.",
      solLoading: "Loading official Home Affairs SOL occupations...",
      solCounter: (tot, shown) => `Matching SOL Occupations: ${tot} total (showing top ${shown})`,
      solEmpty: "No occupations match the selected filters. Try broadening your filter criteria.",
      solSelectHint:
        "Select any occupation on the left to inspect eligible visa subclasses, assessing authorities, 13-region DAMA concessions, and verbatim Home Affairs caveats.",
      variesByStream: "Varies by visa stream",
      caveatHeading: (sc) => `Subclass ${sc} Statutory Occupation Caveat`,
      caveatSummaryLabel: "Park & Co Legal Summary:",
      noCaveatTitle: "No Occupation-Specific Caveat:",
      noCaveatBody:
        "No special turnover, seating, or business-size occupation caveat applies on the Home Affairs instrument (standard visa criteria apply).",
      damaHeading: (cnt) => `Listed Across ${cnt} of 13 Regional DAMAs:`,
      damaSub: (age, sal) =>
        `Age concession up to under ${age} · Minimum salary concession from AUD $${Number(sal).toLocaleString()}`,
      diagWithThisOccCta: "Simulate Pathways for This Occupation →",
      cutoff189: (pts) => `189 Recent Cut-Off: ${pts ? `${pts} pts` : "MLTSSL Only / Uninvited"}`,
      assessingAuthLabel: "Official Assessing Authority:",
      eligibleStreamsLabel: "Eligible Visa Streams:",
      absDefLabel: "ABS ANZSCO Lead Statement:",
      absTasksLabel: "Official ABS ANZSCO Tasks (Skills Assessment & Nomination Benchmark):",
      selectedOccPrefix: "Selected Occupation:",
      unselectedOccBadge: "Selected Occupation: None (Assessing Partner, Family & Special Pathways)",
      compareHeading: "#1 Primary vs #2 Alternative Pathway Comparison",
      compareDimCol: "Dimension",
      fitIndex: (s) => `Fit Score ${s}`,
      baseVacLabel: (v) => `Base VAC: ${v}`,
      procTimeLabel: (t) => `Official Processing: ${t}`,
      noPrimaryPathwayMsg:
        "Standard points-tested GSM and Core sponsorship pathways face occupation, age, or English hurdles under your current inputs. Review the statutory checkpoints below, Tab 05 DAMA / Partner / Family / 858 NIV options, and book a 1:1 strategy review.",
      highlightedOtherHeading: "Matched Family, Talent & Legal Remedy Pathways",
      recServicesHeading: "Recommended Park & Co Official Legal Services",
      openServiceCta: "Open Service ↗",
      watchGuideVideoBtn: "Watch Video Guide",
      recVideosHeading: "Recommended @immispecialist Briefings for Your Profile",
      watchShortLabel: "Watch",
      cap6d51Pill: "Item 6D51 20-Pt Employment Cap Applied",
      ptsUnit: (n) => `${n} pts`,
      tier189Label: "189 Independent Base",
      tier190Label: "190 State Nominated (+5)",
      tier491Label: "491 Regional State (+15)",
      buildConsultBriefBtn: "Generate Consultation Brief from Results →",
      riskSectionHeading: (n) => `Pre-Lodgement Statutory Risk & Checkpoints (${n})`,
      referenceNotesHeading: (n) => `Reference Notes (${n})`,
      noCheckpointsHint: "No P1/P2 statutory risk checkpoints flagged on current inputs (0).",
      rankedPathwaysHeading: "Ranked Visa Pathway Assessment",
      blueprintTrapsLabel: "Critical Practical Traps:",
      fyVacPrefix: (v) => `FY26–27 VAC: ${v}`,
      openTmServiceCta: (tm) => `Open ${tm} ↗`,
      principalVideoBtn: "Legal Practitioner Director Briefing",
    },
  };

  function ensureSnapshot(el, entry) {
    if (el.__koSnapshot) return;
    const snap = { attrs: {} };
    if ("html" in entry) {
      snap.html = el.innerHTML;
    } else if ("text" in entry) {
      snap.text = el.textContent;
    }
    if (entry.attrs) {
      for (const attrName of Object.keys(entry.attrs)) {
        snap.attrs[attrName] = el.getAttribute(attrName) ?? "";
      }
    }
    el.__koSnapshot = snap;
  }

  function applyStaticI18n(lang) {
    const isEn = lang === "en";
    const meta = isEn ? META_I18N.en : META_I18N.ko;
    document.documentElement.lang = isEn ? "en" : "ko";
    document.title = meta.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", meta.description);

    for (const entry of STATIC_EN_ENTRIES) {
      if (entry.selAll && Array.isArray(entry.texts)) {
        const nodes = document.querySelectorAll(entry.selAll);
        nodes.forEach((node, idx) => {
          const enTxt = entry.texts[idx];
          if (enTxt === undefined) return;
          ensureSnapshot(node, { text: enTxt });
          node.textContent = isEn ? enTxt : node.__koSnapshot.text;
        });
        continue;
      }
      const el = document.querySelector(entry.sel);
      if (!el) continue;
      ensureSnapshot(el, entry);
      if (isEn) {
        if ("html" in entry) {
          el.innerHTML = entry.html;
        } else if ("text" in entry) {
          el.textContent = entry.text;
        }
        if (entry.attrs) {
          for (const [k, v] of Object.entries(entry.attrs)) {
            el.setAttribute(k, v);
          }
        }
      } else {
        const snap = el.__koSnapshot;
        if ("html" in snap) {
          el.innerHTML = snap.html;
        } else if ("text" in snap) {
          el.textContent = snap.text;
        }
        for (const [k, v] of Object.entries(snap.attrs)) {
          el.setAttribute(k, v);
        }
      }
    }

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.dataset.setLang === (isEn ? "en" : "ko");
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  window.PARKCO_I18N = {
    UI_STRINGS,
    applyStaticI18n,
  };
})();
