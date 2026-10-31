/* ==========================================================================
   Park & Co Australian Visa Solution Guide System — Interactive Client (ES2022)
   Full Bilingual Support: 한국어 (KO) & English (EN)
   ========================================================================== */

(() => {
  "use strict";

  const OFFICIAL_INQUIRY_URL = "https://parklawyers.com.au/links/?lang=ko";
  const OFFICIAL_INQUIRY_URL_EN = "https://parklawyers.com.au/links/";
  const OFFICIAL_BOOKING_URL = OFFICIAL_INQUIRY_URL;
  const OFFICIAL_BOOKING_URL_EN = OFFICIAL_INQUIRY_URL_EN;
  const LANG_STORAGE_KEY = "parkco_visa_guide_lang";
  const DEFAULT_DUTY_KO = "셰프 요리사 주방 메뉴 기획";
  const DEFAULT_DUTY_EN = "Chef cook kitchen menu planning";

  function detectInitialLang() {
    try {
      const qsLang = new URLSearchParams(window.location.search).get("lang");
      if (qsLang) {
        return qsLang.trim().toLowerCase().startsWith("en") ? "en" : "ko";
      }
      const saved = window.localStorage?.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "ko") return saved;
    } catch {
      // Ignore storage/URL access errors in restricted contexts
    }
    return "ko";
  }

  const initialLang = detectInitialLang();

  const state = {
    lang: initialLang,
    bootstrap: null,
    activeModule: "module-concepts",
    activeVideoCategory: "all",
    videoSearchQuery: "",
    openVideoId: null,
    selectedSolId: "351311",
    selectedDiagCode: "261313",
    briefLang: initialLang,
    lastDutyResponse: null,
    lastResumeData: null,
    lastResumePrefill: null,
    lastSolListResponse: null,
    lastSolDetailOcc: null,
    lastDiagnosis: null,
    dutyReqSeq: 0,
    resumeReqSeq: 0,
    solReqSeq: 0,
    solDetailReqSeq: 0,
    diagReqSeq: 0,
  };

  function isEn() {
    return state.lang === "en";
  }

  function t() {
    const dict = window.PARKCO_I18N?.UI_STRINGS;
    return (isEn() ? dict?.en : dict?.ko) || dict?.ko || {};
  }

  function escapeHtml(val) {
    return String(val ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatOccDisplay(titleKo, occEn) {
    if (isEn()) return occEn || titleKo || "";
    if (!titleKo || titleKo === occEn) return occEn || titleKo || "";
    return `${titleKo} (${occEn})`;
  }

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  let _staticEnginePromise = null;

  function isStaticRuntime() {
    return (
      document.documentElement?.dataset?.runtimeMode === "static" ||
      /\.github\.io$/i.test(window.location.hostname || "")
    );
  }

  function getStaticEngine() {
    if (!_staticEnginePromise) {
      const modUrl = new URL("./assets/engine/static_client.mjs", document.baseURI).href;
      _staticEnginePromise = import(modUrl).then((m) => m.loadStaticVisaGuideBrowser());
    }
    return _staticEnginePromise;
  }

  async function apiGet(url) {
    if (isStaticRuntime()) {
      const engine = await getStaticEngine();
      const parsed = new URL(url, window.location.origin);
      const path = parsed.pathname;
      const sp = parsed.searchParams;
      if (path === "/api/health") {
        return engine.getHealth();
      }
      if (path === "/api/bootstrap") {
        return engine.getBootstrap();
      }
      if (path === "/api/guide") {
        return engine.getGuide({
          q: sp.get("q") || "",
          limit: sp.get("limit") || "",
        });
      }
      if (path === "/api/sol/search") {
        return engine.searchSol({
          q: sp.get("q") || "",
          list: sp.get("list") || "",
          visa: sp.get("visa") || "",
          skill_level: sp.get("skill_level") || "",
          limit: sp.get("limit") || "24",
        });
      }
      if (path.startsWith("/api/sol/occupation/")) {
        const key = decodeURIComponent(path.slice("/api/sol/occupation/".length));
        return engine.getOccupation(key, sp.get("lang") || state.lang);
      }
      throw new Error(`Unsupported static GET endpoint: ${path}`);
    }

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t().apiError?.(res.status) || `HTTP ${res.status}`);
    }
    return data;
  }

  async function apiPostJson(url, payload) {
    if (isStaticRuntime()) {
      const engine = await getStaticEngine();
      const parsed = new URL(url, window.location.origin);
      const path = parsed.pathname;
      if (path === "/api/resume/analyze") {
        return engine.analyzeResumeTextPayload({
          filename: payload?.filename || "pasted_resume.txt",
          text: payload?.text ?? "",
          lang: payload?.lang || parsed.searchParams.get("lang") || state.lang,
        });
      }
      if (path === "/api/diagnose") {
        return engine.diagnose(payload || {});
      }
      if (path === "/api/calculators/evaluate") {
        return engine.evaluateCalculator({
          calculator: payload?.calculator || "",
          params: payload?.params || {},
          lang: payload?.lang || parsed.searchParams.get("lang") || state.lang,
        });
      }
      throw new Error(`Unsupported static POST endpoint: ${path}`);
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || t().apiError?.(res.status) || `HTTP ${res.status}`);
    }
    return data;
  }

  /* ------------------------------------------------------------------------
     Language Switching (Instant In-Place Re-Render Across All 6 Modules)
     ------------------------------------------------------------------------ */
  function setLanguage(nextLang, persistUrl = true) {
    const normalized = nextLang === "en" ? "en" : "ko";
    state.lang = normalized;
    state.briefLang = normalized;

    try {
      window.localStorage?.setItem(LANG_STORAGE_KEY, normalized);
      if (persistUrl && window.history?.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", normalized);
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      // Ignore storage/history errors
    }

    window.PARKCO_I18N?.applyStaticI18n(normalized);

    const errEl = qs("#resume-error-banner");
    if (errEl) errEl.hidden = true;

    const dutyInp = qs("#duty-query-input");
    if (dutyInp) {
      const curVal = dutyInp.value.trim();
      if (normalized === "en" && curVal === DEFAULT_DUTY_KO) {
        dutyInp.value = DEFAULT_DUTY_EN;
      } else if (normalized === "ko" && curVal === DEFAULT_DUTY_EN) {
        dutyInp.value = DEFAULT_DUTY_KO;
      }
    }

    if (!state.bootstrap) return;

    renderVideoCurationScopeNote();
    renderVideoCategories(true);
    renderVideoCards();
    if (state.openVideoId) {
      openVideoModal(state.openVideoId, false);
    }
    renderSamplePersonas();
    renderPathwaysEncyclopedia();

    if (state.lastDutyResponse) {
      renderConfusionAlerts(qs("#duty-confusion-alerts"), state.lastDutyResponse.confusion_alerts);
      renderOccupationMatchCards(qs("#duty-match-results"), state.lastDutyResponse.results);
    }

    if (state.lastResumeData) {
      renderResumeAnalysis(state.lastResumeData);
    }

    if (state.lastSolListResponse) {
      renderSolExplorerList(state.lastSolListResponse);
    }
    if (state.lastSolDetailOcc) {
      renderSolDetailDom(state.lastSolDetailOcc);
    } else {
      const solPanel = qs("#sol-detail-panel .empty-hint");
      if (solPanel && t().solSelectHint) solPanel.textContent = t().solSelectHint;
    }

    if (state.lastDiagnosis) {
      updateDiagSelectedBadge(state.lastDiagnosis.occupation_summary);
      renderDiagnosisResults(state.lastDiagnosis);
      syncConsultationBrief(state.lastDiagnosis.consultation_brief);
    }

    window.dispatchEvent(new CustomEvent("parkco:langchange", { detail: { lang: normalized } }));
  }

  /* ------------------------------------------------------------------------
     Module Tab Switching & Hash Deep-Link Activation
     ------------------------------------------------------------------------ */
  const HASH_MODULE_ALIASES = {
    "module-concepts": "module-concepts",
    "module-resume": "module-resume",
    "module-sol": "module-sol",
    "module-diagnose": "module-diagnose",
    "module-pathways": "module-pathways",
    "module-consult": "module-consult",
    "module-guide": "module-guide",
    "sec-guide": "module-guide",
    "sec-simulator": "module-diagnose",
    "sec-occupations": "module-sol",
    "sec-cv": "module-resume",
  };

  function applyHashModuleIfPresent(scrollIntoView = false) {
    try {
      const rawHash = String(window.location.hash || "").replace(/^#/, "").trim();
      const targetMod = HASH_MODULE_ALIASES[rawHash];
      if (targetMod) {
        switchModule(targetMod, scrollIntoView);
      }
    } catch {
      // Ignore URL hash errors
    }
  }

  function switchModule(moduleId, scrollIntoView = true) {
    state.activeModule = moduleId;
    qsa(".module-tab").forEach((btn) => {
      const active = btn.dataset.moduleTab === moduleId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    qsa(".workspace-module").forEach((sec) => {
      sec.classList.toggle("is-active", sec.id === moduleId);
    });
    if (scrollIntoView) {
      const rail = qs(".module-nav-rail");
      if (rail) {
        rail.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  /* ------------------------------------------------------------------------
     Module 01: @immispecialist Video Hub & Modal Player
     ------------------------------------------------------------------------ */
  function renderVideoCurationScopeNote() {
    const noteEl = qs("#video-curation-scope-note");
    if (!noteEl || !state.bootstrap?.youtube_catalog) return;
    const yt = state.bootstrap.youtube_catalog;
    const curated = (yt.videos || []).length;
    const total = Number(yt.total_channel_videos || curated);
    const uncurated = Math.max(0, total - curated);
    const ui = t();
    if (typeof ui.videoCurationScopeNote === "function") {
      noteEl.textContent = ui.videoCurationScopeNote(total, curated, uncurated);
    }
  }

  function renderVideoCategories(forceRebuild = false) {
    const wrap = qs("#video-category-chips");
    if (!wrap || !state.bootstrap) return;
    const existing = qsa("[data-video-cat]", wrap);
    if (existing.length && !forceRebuild) {
      existing.forEach((btn) => {
        const active = btn.dataset.videoCat === state.activeVideoCategory;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      return;
    }
    const cats = state.bootstrap.youtube_catalog.categories || [];
    wrap.innerHTML = cats
      .map((c) => {
        const active = c.id === state.activeVideoCategory;
        const label = isEn() ? c.label_en || c.label_ko : c.label_ko;
        return `
        <button type="button" class="chip-btn ${active ? "is-active" : ""}" data-video-cat="${escapeHtml(c.id)}" aria-pressed="${active ? "true" : "false"}">
          ${escapeHtml(label)}
        </button>`;
      })
      .join("");
  }

  function renderVideoCards() {
    const grid = qs("#video-cards-grid");
    if (!grid || !state.bootstrap) return;
    const allVideos = state.bootstrap.youtube_catalog.videos || [];
    const q = state.videoSearchQuery.trim().toLowerCase();
    const ui = t();

    const filtered = allVideos.filter((v) => {
      if (state.activeVideoCategory !== "all" && v.category !== state.activeVideoCategory) {
        return false;
      }
      if (!q) return true;
      const hay = `${v.title} ${v.title_en || ""} ${v.summary_ko} ${v.summary_en || ""} ${(v.visas || []).join(" ")} ${(v.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });

    if (!filtered.length) {
      grid.innerHTML = `<p class="empty-hint">${escapeHtml(ui.videoEmpty)}</p>`;
      return;
    }

    grid.innerHTML = filtered
      .map((v) => {
        const vTitle = isEn() ? v.title_en || v.title : v.title;
        const vSummary = isEn() ? v.summary_en || v.summary_ko : v.summary_ko;
        const vPub = isEn() ? v.published_en || v.published || "" : v.published || "";
        const vViews = isEn() ? v.views_en || v.views || "" : v.views || "";
        const metaParts = [vPub, vViews].filter(Boolean).join(" · ");
        return `
        <article class="video-card" data-open-video="${escapeHtml(v.id)}" tabindex="0" role="button" aria-label="${escapeHtml(ui.videoPlayAria(vTitle))}">
          <div class="video-thumb-wrap">
            <img src="${escapeHtml(v.thumbnail_url)}" alt="${escapeHtml(vTitle)}" loading="lazy">
            <span class="video-duration-pill">${escapeHtml(v.duration || ui.videoDurationFallback)}</span>
          </div>
          <div class="video-card-body">
            <div class="video-visa-tags">
              ${(v.visas || []).slice(0, 4).map((sc) => `<span class="visa-mini-tag">${escapeHtml(sc)}</span>`).join("")}
              ${isEn() && ui.videoKrAudioPill ? `<span class="visa-mini-tag">${escapeHtml(ui.videoKrAudioPill)}</span>` : ""}
            </div>
            <h4 class="video-card-title">${escapeHtml(vTitle)}</h4>
            <p class="video-card-summary">${escapeHtml(vSummary)}</p>
            <div class="video-card-meta">
              <span>${escapeHtml(metaParts)}</span>
              <strong>${escapeHtml(ui.videoWatchCta)}</strong>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function openVideoModal(videoId, reloadIframe = true) {
    if (!state.bootstrap) return;
    const vid = (state.bootstrap.youtube_catalog.videos || []).find((v) => v.id === videoId);
    if (!vid) return;
    state.openVideoId = videoId;
    const modal = qs("#video-modal");
    const titleEl = qs("#video-modal-title");
    const sumEl = qs("#video-modal-summary");
    const extEl = qs("#video-modal-ext-link");
    const frameWrap = qs("#video-iframe-container");

    const vTitle = isEn() ? vid.title_en || vid.title : vid.title;
    const vSum = isEn() ? vid.summary_en || vid.summary_ko || "" : vid.summary_ko || "";

    titleEl.textContent = vTitle;
    sumEl.textContent = vSum;
    extEl.href = vid.watch_url;
    if (reloadIframe) {
      frameWrap.innerHTML = `<iframe src="${escapeHtml(vid.embed_url)}?autoplay=1&rel=0" title="${escapeHtml(vTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    modal.hidden = false;
  }

  function closeVideoModal() {
    state.openVideoId = null;
    const modal = qs("#video-modal");
    const frameWrap = qs("#video-iframe-container");
    if (frameWrap) frameWrap.innerHTML = "";
    if (modal) modal.hidden = true;
  }

  /* ------------------------------------------------------------------------
     Module 02: Keyword/Duty Occupation Matcher & Ephemeral Resume Analyzer
     ------------------------------------------------------------------------ */
  function renderConfusionAlerts(container, alerts) {
    if (!container) return;
    if (!alerts || !alerts.length) {
      container.innerHTML = "";
      return;
    }
    const ui = t();
    container.innerHTML = alerts
      .map((a) => {
        const title = isEn() ? a.title_en || a.title_ko : a.title_ko;
        const dist = isEn() ? a.distinction_en || a.distinction_ko : a.distinction_ko;
        return `
        <div class="confusion-alert-card">
          <h4>${escapeHtml(ui.confusionHeading(title))}</h4>
          <p>${escapeHtml(dist)}</p>
        </div>`;
      })
      .join("");
  }

  function renderOccupationMatchCards(container, results) {
    if (!container) return;
    const ui = t();
    if (!results || !results.length) {
      container.innerHTML = `<p class="empty-hint">${escapeHtml(ui.dutyEmpty)}</p>`;
      return;
    }
    container.innerHTML = results
      .map((occ) => {
        const reasons = isEn()
          ? occ.matched_reasons_en || occ.matched_reasons_ko || []
          : occ.matched_reasons_ko || [];
        return `
        <article class="occ-match-card">
          <div class="occ-match-top">
            <div>
              <span class="occ-code-pill">ANZSCO ${escapeHtml(occ.anzsco_code_primary)}</span>
              <span class="occ-list-pill">${escapeHtml((occ.lists || []).join(" · "))}</span>
              ${occ.has_caveats ? `<span class="visa-mini-tag">${escapeHtml(ui.caveatPill)}</span>` : ""}
              <h4 class="occ-match-title">${escapeHtml(formatOccDisplay(occ.title_ko, occ.occupation))}</h4>
            </div>
            <span class="badge-subtle">${escapeHtml(ui.fitScore(occ.match_score))}</span>
          </div>
          <p class="occ-reasons-line">${escapeHtml(reasons.join(" · "))}</p>
          ${
            (occ.matched_tasks || []).length
              ? `<ul class="occ-tasks-preview">${occ.matched_tasks.slice(0, 2).map((tk) => `<li>${escapeHtml(tk)}</li>`).join("")}</ul>`
              : ""
          }
          <div class="occ-match-actions">
            <div class="video-visa-tags">
              ${(occ.visas_eligible || []).map((v) => `<span class="visa-mini-tag">${escapeHtml(v)}</span>`).join("")}
            </div>
            <div>
              <button type="button" class="btn-secondary-sm" data-inspect-sol="${escapeHtml(occ.anzsco_code_primary)}">${escapeHtml(ui.solDetailBtn)}</button>
              <button type="button" class="btn-primary-sm" data-select-diag-occ="${escapeHtml(occ.anzsco_code_primary)}">${escapeHtml(ui.diagThisOccBtn)}</button>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  async function runDutySearch(query) {
    const seq = ++state.dutyReqSeq;
    const res = await apiGet(`/api/sol/search?q=${encodeURIComponent(query)}&limit=6`);
    if (seq !== state.dutyReqSeq) return;
    state.lastDutyResponse = res;
    renderConfusionAlerts(qs("#duty-confusion-alerts"), res.confusion_alerts);
    renderOccupationMatchCards(qs("#duty-match-results"), res.results);
  }

  function renderSamplePersonas() {
    const wrap = qs("#sample-persona-buttons");
    if (!wrap || !state.bootstrap) return;
    wrap.innerHTML = (state.bootstrap.sample_personas || [])
      .map((p) => {
        const badge = isEn() ? p.badge_en || p.badge_ko : p.badge_ko;
        const title = isEn() ? p.title_en || p.title_ko : p.title_ko;
        return `
        <button type="button" class="persona-btn" data-persona-id="${escapeHtml(p.id)}">
          <span class="persona-badge">${escapeHtml(badge)}</span>
          <span class="persona-title">${escapeHtml(title)}</span>
        </button>`;
      })
      .join("");
  }

  function renderResumeAnalysis(data) {
    const errEl = qs("#resume-error-banner");
    const outEl = qs("#resume-analysis-output");
    if (errEl) errEl.hidden = true;
    state.lastResumeData = data;
    state.lastResumePrefill = data.suggested_diagnosis_prefill || null;

    const ui = t();
    const p = data.extracted_profile;
    const engStr = p.english_clue ? `${p.english_clue.test} ${p.english_clue.score_raw}` : ui.engNotSpecified;
    const qualLabel = ui.qualMap?.[p.qualification] || p.qualification;
    const regClues = isEn()
      ? p.registration_clues_en || p.registration_clues || []
      : p.registration_clues || [];
    const insights = isEn()
      ? data.gap_insights_en || data.gap_insights_ko || []
      : data.gap_insights_ko || [];
    const privacyNote = isEn()
      ? data.privacy_notice_en || data.privacy_notice_ko
      : data.privacy_notice_ko;

    outEl.innerHTML = `
      <div class="resume-summary-box">
        <div class="panel-card-head">
          <h4>${escapeHtml(ui.resumeReportTitle(data.filename))}</h4>
          <button type="button" class="btn-primary-sm" id="btn-apply-resume-to-diag">
            ${escapeHtml(ui.applyResumeBtn)}
          </button>
        </div>
        <div class="resume-kpi-chips">
          <span class="resume-kpi-chip">${escapeHtml(ui.mergedExpChip(p.estimated_experience_years))}</span>
          <span class="resume-kpi-chip">${escapeHtml(ui.auExpChip(p.au_experience_detected))}</span>
          <span class="resume-kpi-chip">${escapeHtml(ui.auStudyChip(p.au_study_detected))}</span>
          <span class="resume-kpi-chip">${escapeHtml(ui.qualChip(qualLabel))}</span>
          <span class="resume-kpi-chip">${escapeHtml(ui.engChip(engStr))}</span>
          ${regClues.map((c) => `<span class="resume-kpi-chip">${escapeHtml(c)}</span>`).join("")}
        </div>
        <ul class="insight-list">
          ${insights.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}
        </ul>
        <p class="statutory-source-note">${escapeHtml(privacyNote)}</p>
      </div>
      <div class="occupation-match-list" id="resume-candidate-cards"></div>
    `;

    renderOccupationMatchCards(qs("#resume-candidate-cards"), (data.occupation_candidates || []).slice(0, 3));

    const applyBtn = qs("#btn-apply-resume-to-diag");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        if (state.lastResumePrefill) {
          applyPrefillToDiagnoseForm(state.lastResumePrefill);
        }
      });
    }
  }

  function showResumeError(msg) {
    const errEl = qs("#resume-error-banner");
    if (!errEl) return;
    errEl.textContent = msg;
    errEl.hidden = false;
  }

  async function analyzeResumeText(filename, text) {
    const seq = ++state.resumeReqSeq;
    const errEl = qs("#resume-error-banner");
    if (errEl) errEl.hidden = true;
    try {
      const data = await apiPostJson("/api/resume/analyze", {
        filename,
        text,
        lang: state.lang,
      });
      if (seq !== state.resumeReqSeq) return;
      renderResumeAnalysis(data);
    } catch (err) {
      if (seq !== state.resumeReqSeq) return;
      showResumeError(err.message);
    }
  }

  async function uploadResumeFile(file) {
    const seq = ++state.resumeReqSeq;
    const errEl = qs("#resume-error-banner");
    if (errEl) errEl.hidden = true;
    const ui = t();
    if (file.size > 10 * 1024 * 1024) {
      showResumeError(ui.fileTooLarge);
      return;
    }

    if (isStaticRuntime()) {
      try {
        const engine = await getStaticEngine();
        const data = await engine.analyzeResumeFile(file, file.name, state.lang);
        if (seq !== state.resumeReqSeq) return;
        renderResumeAnalysis(data);
      } catch (err) {
        if (seq !== state.resumeReqSeq) return;
        showResumeError(err.message || ui.fileAnalyzeErr);
      }
      return;
    }

    const fd = new FormData();
    fd.append("lang", state.lang);
    fd.append("file", file, file.name);
    try {
      const res = await fetch(`/api/resume/analyze?lang=${encodeURIComponent(state.lang)}`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (seq !== state.resumeReqSeq) return;
      if (!res.ok) {
        showResumeError(data.error || ui.fileAnalyzeErr);
        return;
      }
      renderResumeAnalysis(data);
    } catch (err) {
      if (seq !== state.resumeReqSeq) return;
      showResumeError(err.message || ui.fileNetworkErr);
    }
  }

  /* ------------------------------------------------------------------------
     Module 03: Official 714 SOL Explorer & Verbatim Caveat Detail Panel
     ------------------------------------------------------------------------ */
  function renderSolExplorerList(data) {
    const ui = t();
    const counter = qs("#sol-result-counter");
    if (counter) {
      counter.textContent = ui.solCounter(data.total_matches, data.results.length);
    }

    const grid = qs("#sol-cards-grid");
    if (!grid) return;
    if (!data.results.length) {
      grid.innerHTML = `<p class="empty-hint">${escapeHtml(ui.solEmpty)}</p>`;
      return;
    }

    grid.innerHTML = data.results
      .map((occ) => {
        const cardKey = occ.id || occ.anzsco_code_primary;
        const primaryTitle = isEn() ? occ.occupation : occ.title_ko;
        const subPartsEn = [
          occ.skill_level ? `Skill Level ${occ.skill_level}` : "",
          occ.anzsco_2022_code ? `ANZSCO 2022: ${occ.anzsco_2022_code}` : "",
        ].filter(Boolean);
        const subLine = isEn() ? subPartsEn.join(" · ") : occ.occupation;
        return `
        <button type="button" class="sol-occ-card ${cardKey === state.selectedSolId ? "is-selected" : ""}" data-sol-card="${escapeHtml(cardKey)}">
          <div>
            <span class="occ-code-pill">${escapeHtml(occ.anzsco_code_primary)}</span>
            <span class="occ-list-pill">${escapeHtml((occ.lists || []).join(" · "))}</span>
            ${occ.has_caveats ? `<span class="visa-mini-tag">Caveat</span>` : ""}
          </div>
          <h4 class="occ-match-title">${escapeHtml(primaryTitle)}</h4>
          <div class="statutory-source-note">${escapeHtml(subLine)}</div>
          <div class="video-visa-tags" style="margin-top:8px;">
            ${(occ.visas_eligible || []).map((v) => `<span class="visa-mini-tag">${escapeHtml(v)}</span>`).join("")}
          </div>
        </button>`;
      })
      .join("");
  }

  async function loadSolExplorer() {
    const seq = ++state.solReqSeq;
    const q = (qs("#sol-query-input")?.value || "").trim();
    const listF = qs("#sol-list-select")?.value || "";
    const visaF = qs("#sol-visa-select")?.value || "";
    const skillF = qs("#sol-skill-select")?.value || "";

    const url = `/api/sol/search?q=${encodeURIComponent(q)}&list=${encodeURIComponent(listF)}&visa=${encodeURIComponent(visaF)}&skill_level=${encodeURIComponent(skillF)}&limit=28`;
    const data = await apiGet(url);
    if (seq !== state.solReqSeq) return;
    state.lastSolListResponse = data;

    if (data.results.length) {
      const matchedRow =
        data.results.find((r) => r.id === state.selectedSolId) ||
        data.results.find((r) => r.anzsco_code_primary === state.selectedSolId) ||
        data.results[0];
      state.selectedSolId = matchedRow.id || matchedRow.anzsco_code_primary;
    }

    renderSolExplorerList(data);
    if (data.results.length) {
      await renderSolDetailPanel(state.selectedSolId);
    }
  }

  function renderSolDetailDom(occ) {
    const panel = qs("#sol-detail-panel");
    if (!panel || !occ) return;
    const ui = t();

    const authHtml = (occ.assessing_authorities || []).length
      ? occ.assessing_authorities
          .map((a) =>
            /^https?:\/\//i.test(a.url || "")
              ? `<a href="${escapeHtml(a.url)}" target="_blank" rel="noopener noreferrer"><strong>${escapeHtml(a.code)}</strong> (${escapeHtml(a.full_name)}) ↗</a>`
              : `<strong>${escapeHtml(a.code)}</strong> (${escapeHtml(a.full_name)})`
          )
          .join(" · ")
      : escapeHtml(ui.variesByStream);

    const caveatEntries = Object.entries(occ.caveats_by_subclass || {});
    const caveatsHtml = caveatEntries.length
      ? caveatEntries
          .map(([sc, list]) => {
            const sumLine = list
              .map((x) => (isEn() ? x.summary_en || x.title_en || x.summary_ko : x.summary_ko))
              .join(" / ");
            return `
              <div class="caveat-box">
                <h4>${escapeHtml(ui.caveatHeading(sc))}</h4>
                <p><strong>${escapeHtml(ui.caveatSummaryLabel)}</strong> ${escapeHtml(sumLine)}</p>
                <div class="caveat-verbatim">
                  <strong>Home Affairs Verbatim Caveat:</strong><br>
                  ${list.map((x) => escapeHtml(x.description_en)).join("<br><br>")}
                </div>
              </div>`;
          })
          .join("")
      : `<div class="resume-summary-box"><strong>${escapeHtml(ui.noCaveatTitle)}</strong> ${escapeHtml(ui.noCaveatBody)}</div>`;

    const damaHtml =
      occ.dama_count > 0 && occ.dama_concessions
        ? `<div class="resume-summary-box">
             <strong>${escapeHtml(ui.damaHeading(occ.dama_count))}</strong>
             ${escapeHtml((occ.dama_concessions.regions || []).join(", "))}<br>
             ${escapeHtml(ui.damaSub(occ.dama_concessions.max_age, occ.dama_concessions.min_salary_aud))}
           </div>`
        : "";

    panel.innerHTML = `
      <div class="panel-card-head">
        <div>
          <span class="occ-code-pill">ANZSCO ${escapeHtml(occ.anzsco_code_primary)}</span>
          <span class="occ-list-pill">${escapeHtml((occ.lists || []).join(" · "))}</span>
          <h3 style="margin-top:8px;">${escapeHtml(formatOccDisplay(occ.title_ko, occ.occupation))}</h3>
        </div>
        <button type="button" class="btn-primary-sm" data-select-diag-occ="${escapeHtml(occ.anzsco_code_primary)}">
          ${escapeHtml(ui.diagWithThisOccCta)}
        </button>
      </div>

      <div class="resume-kpi-chips">
        ${occ.anzsco_2022_code ? `<span class="resume-kpi-chip">ANZSCO 2022: ${escapeHtml(occ.anzsco_2022_code)}</span>` : ""}
        ${occ.anzsco_2013_code ? `<span class="resume-kpi-chip">ANZSCO 2013: ${escapeHtml(occ.anzsco_2013_code)}</span>` : ""}
        ${occ.skill_level ? `<span class="resume-kpi-chip">Skill Level: ${escapeHtml(occ.skill_level)}</span>` : ""}
        <span class="resume-kpi-chip">${escapeHtml(ui.cutoff189(occ.skillselect_min_points_189))}</span>
      </div>

      <p><strong>${escapeHtml(ui.assessingAuthLabel)}</strong> ${authHtml}</p>
      <p><strong>${escapeHtml(ui.eligibleStreamsLabel)}</strong><br>${(occ.visa_streams_detail || []).map((s) => `<span class="visa-mini-tag" style="margin:2px 4px 2px 0;display:inline-block;">${escapeHtml(s)}</span>`).join("")}</p>

      ${caveatsHtml}
      ${damaHtml}

      ${occ.abs_description ? `<p><strong>${escapeHtml(ui.absDefLabel)}</strong> ${escapeHtml(occ.abs_description)}</p>` : ""}
      ${
        (occ.abs_tasks || []).length
          ? `<div><strong>${escapeHtml(ui.absTasksLabel)}</strong>
               <ul class="insight-list">${occ.abs_tasks.map((tk) => `<li>${escapeHtml(tk)}</li>`).join("")}</ul>
             </div>`
          : ""
      }
    `;
  }

  async function renderSolDetailPanel(idOrCode) {
    const panel = qs("#sol-detail-panel");
    if (!panel || !idOrCode) return;
    const dSeq = ++state.solDetailReqSeq;
    state.selectedSolId = idOrCode;
    qsa(".sol-occ-card").forEach((c) => {
      c.classList.toggle("is-selected", c.dataset.solCard === idOrCode);
    });

    try {
      const occ = await apiGet(`/api/sol/occupation/${encodeURIComponent(idOrCode)}?lang=${encodeURIComponent(state.lang)}`);
      if (dSeq !== state.solDetailReqSeq) return;
      state.lastSolDetailOcc = occ;
      renderSolDetailDom(occ);
    } catch (err) {
      if (dSeq !== state.solDetailReqSeq) return;
      panel.innerHTML = `<p class="empty-hint">${escapeHtml(err.message)}</p>`;
    }
  }

  /* ------------------------------------------------------------------------
     Module 04: Multi-Factor Visa Diagnosis Simulator
     ------------------------------------------------------------------------ */
  function updateDiagSelectedBadge(occSummary) {
    const badge = qs("#diag-selected-occ-badge");
    if (!badge) return;
    const ui = t();
    if (occSummary?.selected) {
      badge.textContent = `${ui.selectedOccPrefix} ${formatOccDisplay(occSummary.title_ko, occSummary.occupation)} · ${occSummary.anzsco_code} · ${(occSummary.lists || []).join("/")}`;
    } else {
      badge.textContent = ui.unselectedOccBadge;
    }
  }

  async function selectOccupationForDiagnosis(code, jumpToDiagnose = true) {
    const clean = (code || "").trim();
    if (!clean) return;
    try {
      let occ = null;
      if (/^\d{6}$/.test(clean)) {
        occ = await apiGet(`/api/sol/occupation/${encodeURIComponent(clean)}?lang=${encodeURIComponent(state.lang)}`);
      } else {
        const res = await apiGet(`/api/sol/search?q=${encodeURIComponent(clean)}&limit=1`);
        occ = res.results?.[0] || null;
      }
      if (occ) {
        state.selectedDiagCode = occ.anzsco_code_primary;
        const inp = qs("#diag-anzsco-input");
        if (inp) inp.value = occ.anzsco_code_primary;
        updateDiagSelectedBadge({
          selected: true,
          title_ko: occ.title_ko,
          occupation: occ.occupation,
          anzsco_code: occ.anzsco_code_primary,
          lists: occ.lists,
        });
      }
    } catch {
      state.selectedDiagCode = "";
    }
    if (jumpToDiagnose) {
      switchModule("module-diagnose");
    }
    await submitDiagnosis();
  }

  function applyPrefillToDiagnoseForm(prefill) {
    if (prefill.anzsco_code) {
      state.selectedDiagCode = prefill.anzsco_code;
      const inp = qs("#diag-anzsco-input");
      if (inp) inp.value = prefill.anzsco_code;
    }
    if (prefill.qualification && qs("#diag-qual")) {
      qs("#diag-qual").value = prefill.qualification;
    }
    if (prefill.english_tier && qs("#diag-english")) {
      qs("#diag-english").value = prefill.english_tier;
    }
    if (prefill.au_work_years_bucket && qs("#diag-au-work")) {
      qs("#diag-au-work").value = prefill.au_work_years_bucket;
    }
    if (prefill.os_work_years_bucket && qs("#diag-os-work")) {
      qs("#diag-os-work").value = prefill.os_work_years_bucket;
    }
    if (qs("#diag-au-study")) qs("#diag-au-study").checked = Boolean(prefill.au_study);
    if (qs("#diag-stem-research")) qs("#diag-stem-research").checked = Boolean(prefill.masters_research_stem);
    if (qs("#diag-naati")) qs("#diag-naati").checked = Boolean(prefill.naati_ccl);
    if (qs("#diag-py")) qs("#diag-py").checked = Boolean(prefill.professional_year);

    selectOccupationForDiagnosis(prefill.anzsco_code || state.selectedDiagCode, true);
  }

  function collectDiagnosisPayload() {
    const rawCode = (qs("#diag-anzsco-input")?.value || "").trim();
    const salaryRaw = Number(qs("#diag-salary")?.value || 0);
    return {
      lang: state.lang,
      anzsco_code: /^\d{6}$/.test(rawCode) ? rawCode : "",
      occupation_query: /^\d{6}$/.test(rawCode) ? "" : rawCode,
      location: qs("#diag-location")?.value || "onshore",
      current_visa: qs("#diag-current-visa")?.value || "graduate_485",
      age_bracket: qs("#diag-age")?.value || "25_32",
      planned_next_step: qs("#diag-planned-step")?.value || "best_pr",
      english_tier: qs("#diag-english")?.value || "proficient",
      qualification: qs("#diag-qual")?.value || "bachelor_masters",
      partner_status: qs("#diag-partner-pts")?.value || "single_or_au_partner",
      au_work_years_bucket: qs("#diag-au-work")?.value || "0",
      os_work_years_bucket: qs("#diag-os-work")?.value || "0",
      au_study: Boolean(qs("#diag-au-study")?.checked),
      masters_research_stem: Boolean(qs("#diag-stem-research")?.checked),
      regional_study: Boolean(qs("#diag-regional-study")?.checked),
      naati_ccl: Boolean(qs("#diag-naati")?.checked),
      professional_year: Boolean(qs("#diag-py")?.checked),
      regional_willing: Boolean(qs("#diag-regional-willing")?.checked),
      has_employer_sponsor: Boolean(qs("#diag-has-sponsor")?.checked),
      offered_salary_aud: salaryRaw > 0 ? salaryRaw : null,
      has_au_partner_for_partner_visa: Boolean(qs("#diag-au-partner-visa")?.checked),
      global_talent_profile: Boolean(qs("#diag-global-talent")?.checked),
      au_child_parent_visa: Boolean(qs("#diag-parent-visa")?.checked),
      s57_or_pic4020_notice: Boolean(qs("#diag-s57-pic4020")?.checked),
      prior_refusal_s48: Boolean(qs("#diag-prior-refusal")?.checked),
      health_or_character_issue: Boolean(qs("#diag-health-char")?.checked),
      applicant_name: (qs("#brief-name-input")?.value || "").trim(),
      notes: (qs("#brief-notes-input")?.value || "").trim(),
    };
  }

  async function submitDiagnosis() {
    const seq = ++state.diagReqSeq;
    const payload = collectDiagnosisPayload();
    const diag = await apiPostJson(`/api/diagnose?lang=${encodeURIComponent(state.lang)}`, payload);
    if (seq !== state.diagReqSeq) return;
    state.lastDiagnosis = diag;

    updateDiagSelectedBadge(diag.occupation_summary);
    renderDiagnosisResults(diag);
    syncConsultationBrief(diag.consultation_brief);
  }

  function renderDiagnosisResults(diag) {
    const col = qs("#diagnose-results-column");
    if (!col) return;
    const ui = t();
    const pts = diag.gsm_points_breakdown;

    const ac = diag.alternative_comparison;
    const compareHtml = ac
      ? `
        <div class="panel-card" style="margin-bottom:18px;">
          <div class="panel-card-head">
            <h3>${escapeHtml(ui.compareHeading)}</h3>
          </div>
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${escapeHtml(ui.compareDimCol)}</th>
                  <th>${escapeHtml(isEn() ? ac.primary_title_en || ac.primary_title : ac.primary_title)}</th>
                  <th>${escapeHtml(isEn() ? ac.secondary_title_en || ac.secondary_title : ac.secondary_title)}</th>
                </tr>
              </thead>
              <tbody>
                ${ac.rows
                  .map(
                    (r) => `
                  <tr>
                    <td><strong>${escapeHtml(isEn() ? r.dimension_en || r.dimension_ko : r.dimension_ko)}</strong></td>
                    <td>${escapeHtml(isEn() ? r.option_1_en || r.option_1 : r.option_1)}</td>
                    <td>${escapeHtml(isEn() ? r.option_2_en || r.option_2 : r.option_2)}</td>
                  </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>`
      : "";

    const pathwaysHtml = (diag.primary_pathways || []).length
      ? diag.primary_pathways
          .map((p, idx) => {
            const pTier = isEn() ? p.readiness_tier_en || p.readiness_tier : p.readiness_tier;
            const pName = isEn() ? p.name_en || p.name_ko : p.name_ko;
            const pWhy = isEn() ? p.why_fit_en || p.why_fit_ko : p.why_fit_ko;
            const pVac = isEn() ? p.vac_display_en || p.vac_display : p.vac_display;
            const pProc = isEn() ? p.processing_time_en || p.processing_time : p.processing_time;
            const pReqs = isEn()
              ? p.key_requirements_en || p.key_requirements_ko || []
              : p.key_requirements_ko || [];
            return `
          <article class="pathway-result-card">
            <div class="pathway-result-head">
              <div>
                <span class="pill-burgundy">#${idx + 1} · ${escapeHtml(pTier)}</span>
                <h4 class="occ-match-title" style="margin-top:6px;">Subclass ${escapeHtml(p.subclass)} — ${escapeHtml(pName)}</h4>
              </div>
              <span class="badge-subtle">${escapeHtml(ui.fitIndex(p.score))}</span>
            </div>
            <p style="margin:6px 0 10px;font-size:0.94rem;">${escapeHtml(pWhy)}</p>
            <div class="pathway-meta-pills">
              <span class="meta-pill">${escapeHtml(ui.baseVacLabel(pVac))}</span>
              <span class="meta-pill">${escapeHtml(ui.procTimeLabel(pProc))}</span>
            </div>
            <ul class="insight-list">
              ${pReqs.map((req) => `<li>${escapeHtml(req)}</li>`).join("")}
            </ul>
          </article>`;
          })
          .join("")
      : `<div class="panel-card" style="margin-bottom:16px;"><p>${escapeHtml(ui.noPrimaryPathwayMsg)}</p></div>`;

    const highlightedOther = (diag.other_and_remote_options || []).filter((o) => o.highlighted_for_user);
    const highlightedOtherHtml = highlightedOther.length
      ? `
        <div class="panel-card" style="margin-bottom:18px;">
          <div class="panel-card-head">
            <h3>${escapeHtml(ui.highlightedOtherHeading)}</h3>
          </div>
          <div class="occupation-match-list">
            ${highlightedOther
              .map((v) => {
                const vTitle = isEn() ? v.title_en || v.title_ko : v.title_ko;
                const vSc = isEn() ? v.subclasses_en || v.subclasses : v.subclasses;
                const vVac = isEn() ? v.vac_fy26_27_en || v.vac_fy26_27 : v.vac_fy26_27;
                const vSum = isEn() ? v.summary_en || v.summary_ko : v.summary_ko;
                const vCrit = isEn() ? v.key_criteria_en || v.key_criteria_ko || [] : v.key_criteria_ko || [];
                return `
              <article class="occ-match-card">
                <div class="occ-match-top">
                  <div>
                    <span class="pill-burgundy">${escapeHtml(v.badge)}</span>
                    <h4 class="occ-match-title" style="margin-top:6px;">${escapeHtml(vTitle)} (${escapeHtml(vSc)})</h4>
                  </div>
                  <span class="badge-subtle">${escapeHtml(vVac)}</span>
                </div>
                <p style="margin:6px 0 8px;font-size:0.92rem;">${escapeHtml(vSum)}</p>
                <ul class="insight-list">
                  ${vCrit.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
                </ul>
              </article>`;
              })
              .join("")}
          </div>
        </div>`
      : "";

    const recServicesHtml = (diag.recommended_parkco_services || []).length
      ? `
        <div class="panel-card" style="margin-bottom:18px;">
          <div class="panel-card-head">
            <h3>${escapeHtml(ui.recServicesHeading)}</h3>
          </div>
          <div class="diag-services-grid">
            ${diag.recommended_parkco_services
              .slice(0, 4)
              .map((s) => {
                const sTm = isEn() ? s.trademark_en || s.trademark : s.trademark;
                const sFee = isEn() ? s.fee_en || s.fee_ko : s.fee_ko;
                const sTitle = isEn() ? s.title_en || s.title_ko : s.title_ko;
                const sDesc = isEn() ? s.description_en || s.description_ko : s.description_ko;
                const sUrl = isEn() ? s.url_en || s.url_ko : s.url_ko;
                return `
              <article class="tm-service-card ${s.id === "visa_emergency" ? "tm-service-urgent" : ""}">
                <div class="tm-top">
                  <span class="tm-badge ${s.id === "visa_emergency" ? "tm-badge-urgent" : ""}">${escapeHtml(sTm)}</span>
                  <span class="tm-fee">${escapeHtml(sFee)}</span>
                </div>
                <h4>${escapeHtml(sTitle)}</h4>
                <p>${escapeHtml(sDesc)}</p>
                <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                  <a href="${escapeHtml(sUrl)}" target="_blank" rel="noopener noreferrer" class="tm-link">${escapeHtml(ui.openServiceCta)}</a>
                  ${
                    s.video_id
                      ? `<button type="button" class="btn-secondary-sm" data-open-video="${escapeHtml(s.video_id)}">${escapeHtml(ui.watchGuideVideoBtn)}</button>`
                      : ""
                  }
                </div>
              </article>`;
              })
              .join("")}
          </div>
        </div>`
      : "";

    const videosMiniHtml = (diag.recommended_videos || []).length
      ? `
        <div class="panel-card">
          <div class="panel-card-head">
            <h3>${escapeHtml(ui.recVideosHeading)}</h3>
          </div>
          <div class="occupation-match-list">
            ${diag.recommended_videos
              .slice(0, 4)
              .map((v) => {
                const vTitle = isEn() ? v.title_en || v.title : v.title;
                const vSum = isEn() ? v.summary_en || v.summary_ko : v.summary_ko;
                return `
              <div class="occ-match-card" data-open-video="${escapeHtml(v.id)}" role="button" tabindex="0">
                <div class="occ-match-top">
                  <strong>${escapeHtml(vTitle)}</strong>
                  <span class="pill-burgundy">${escapeHtml(v.duration || ui.watchShortLabel)}</span>
                </div>
                <p style="margin:4px 0 0;font-size:0.88rem;color:var(--color-charcoal-soft);">${escapeHtml(vSum)}</p>
              </div>`;
              })
              .join("")}
          </div>
        </div>`
      : "";

    const conceptSummary = isEn()
      ? diag.concept_summary_en || diag.concept_summary_ko
      : diag.concept_summary_ko;

    col.innerHTML = `
      <div class="points-banner-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <span class="brand-overline">SCHEDULE 6D POINTS &amp; PATHWAY SUMMARY</span>
          ${pts.cap_applied_6d51 ? `<span class="pill-burgundy">${escapeHtml(ui.cap6d51Pill)}</span>` : ""}
        </div>
        <p style="margin:8px 0 0;font-size:0.96rem;color:#EFE3D3;">${escapeHtml(conceptSummary)}</p>
        <div class="points-tiers-grid">
          <div class="points-tier-box">
            <strong>${escapeHtml(ui.ptsUnit(pts.base_points_189))}</strong>
            <span>${escapeHtml(ui.tier189Label)}</span>
          </div>
          <div class="points-tier-box">
            <strong>${escapeHtml(ui.ptsUnit(pts.points_190))}</strong>
            <span>${escapeHtml(ui.tier190Label)}</span>
          </div>
          <div class="points-tier-box">
            <strong>${escapeHtml(ui.ptsUnit(pts.points_491))}</strong>
            <span>${escapeHtml(ui.tier491Label)}</span>
          </div>
        </div>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" class="btn-hero-primary" data-nav-target="module-consult">
            ${escapeHtml(ui.buildConsultBriefBtn)}
          </button>
        </div>
      </div>

      <div style="margin-bottom:18px;">
        ${(() => {
          const checkpoints = diag.statutory_checkpoints || (diag.risk_flags || []).filter((f) => f.severity === "P1" || f.severity === "P2");
          const refNotes = diag.reference_notes || (diag.risk_flags || []).filter((f) => f.severity !== "P1" && f.severity !== "P2");
          const renderFlagCard = (f) => {
            const fTitle = isEn() ? f.title_en || f.title_ko : f.title_ko;
            const fDetail = isEn() ? f.detail_en || f.detail_ko : f.detail_ko;
            return `
          <div class="risk-card risk-${escapeHtml(f.severity)}">
            <h4>[${escapeHtml(f.severity)}] ${escapeHtml(fTitle)}</h4>
            <p>${escapeHtml(fDetail)}</p>
          </div>`;
          };
          return `
            <h3 class="subsection-title">${escapeHtml(ui.riskSectionHeading(checkpoints.length))}</h3>
            ${checkpoints.length ? checkpoints.map(renderFlagCard).join("") : `<p class="statutory-source-note">${escapeHtml(ui.noCheckpointsHint)}</p>`}
            ${refNotes.length ? `<h4 class="subsection-title" style="margin-top:14px;font-size:15.5px;">${escapeHtml(ui.referenceNotesHeading(refNotes.length))}</h4>${refNotes.map(renderFlagCard).join("")}` : ""}
          `;
        })()}
      </div>

      <h3 class="subsection-title">${escapeHtml(ui.rankedPathwaysHeading)}</h3>
      ${pathwaysHtml}
      ${highlightedOtherHtml}
      ${compareHtml}
      ${recServicesHtml}
      ${videosMiniHtml}
    `;
  }

  /* ------------------------------------------------------------------------
     Module 05 & Module 06 Rendering + Consultation Brief Sync
     ------------------------------------------------------------------------ */
  function renderPathwaysEncyclopedia() {
    if (!state.bootstrap) return;
    const ui = t();

    const bpGrid = qs("#lifecycle-blueprints-grid");
    if (bpGrid) {
      bpGrid.innerHTML = (state.bootstrap.lifecycle_blueprints || [])
        .map((bp) => {
          const bpTitle = isEn() ? bp.title_en || bp.title_ko : bp.title_ko;
          const bpWho = isEn() ? bp.target_who_en || bp.target_who_ko : bp.target_who_ko;
          const bpStages = isEn() ? bp.stages_en || bp.stages_ko || [] : bp.stages_ko || [];
          const bpTraps = isEn()
            ? bp.critical_traps_en || bp.critical_traps_ko || []
            : bp.critical_traps_ko || [];
          return `
          <article class="blueprint-card">
            <span class="pill-burgundy">${escapeHtml(bp.badge)}</span>
            <h4 class="occ-match-title" style="margin-top:8px;">${escapeHtml(bpTitle)}</h4>
            <p class="statutory-source-note">${escapeHtml(bpWho)}</p>
            <ol class="blueprint-stages">
              ${bpStages.map((st) => `<li>${escapeHtml(st)}</li>`).join("")}
            </ol>
            <div class="blueprint-traps">
              <strong>${escapeHtml(ui.blueprintTrapsLabel)}</strong>
              <ul style="margin:6px 0 0;padding-left:18px;">
                ${bpTraps.map((tr) => `<li>${escapeHtml(tr)}</li>`).join("")}
              </ul>
            </div>
          </article>`;
        })
        .join("");
    }

    const engBody = qs("#english-matrix-table tbody");
    if (engBody) {
      engBody.innerHTML = (state.bootstrap.english_matrix_2025_2026 || [])
        .map((row) => {
          const tier = isEn() ? row.tier_en || row.tier_ko : row.tier_ko;
          const ielts = isEn() ? row.ielts_en || row.ielts : row.ielts;
          const pte = isEn() ? row.pte_post_aug2025_en || row.pte_post_aug2025 : row.pte_post_aug2025;
          const toefl = isEn() ? row.toefl_ibt_en || row.toefl_ibt : row.toefl_ibt;
          const celpip = isEn() ? row.celpip_en || row.celpip : row.celpip;
          const val = isEn() ? row.validity_en || row.validity : row.validity;
          return `
          <tr>
            <td><strong>${escapeHtml(tier)}</strong></td>
            <td>${escapeHtml(ielts)}</td>
            <td><strong>${escapeHtml(pte)}</strong></td>
            <td>${escapeHtml(toefl)}</td>
            <td>${escapeHtml(celpip)}</td>
            <td>${escapeHtml(val)}</td>
          </tr>`;
        })
        .join("");
    }

    const nsGrid = qs("#non-skilled-visas-grid");
    if (nsGrid) {
      nsGrid.innerHTML = (state.bootstrap.non_skilled_and_remote_visas || [])
        .map((v) => {
          const sc = isEn() ? v.subclasses_en || v.subclasses : v.subclasses;
          const title = isEn() ? v.title_en || v.title_ko : v.title_ko;
          const vac = isEn() ? v.vac_fy26_27_en || v.vac_fy26_27 : v.vac_fy26_27;
          const sum = isEn() ? v.summary_en || v.summary_ko : v.summary_ko;
          const crit = isEn() ? v.key_criteria_en || v.key_criteria_ko || [] : v.key_criteria_ko || [];
          return `
          <article class="non-skilled-card">
            <div class="panel-card-head">
              <span class="pill-burgundy">${escapeHtml(v.badge)}</span>
              <span class="badge-subtle">${escapeHtml(sc)}</span>
            </div>
            <h4 class="occ-match-title">${escapeHtml(title)}</h4>
            <p class="occ-reasons-line">${escapeHtml(ui.fyVacPrefix(vac))}</p>
            <p style="font-size:0.93rem;">${escapeHtml(sum)}</p>
            <ul class="insight-list">
              ${crit.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
            </ul>
          </article>`;
        })
        .join("");
    }

    const navGrid = qs("#specialist-navigators-grid");
    if (navGrid) {
      navGrid.innerHTML = (state.bootstrap.specialist_navigators || [])
        .map((n) => {
          const nTag = isEn() ? n.tag_en || n.tag : n.tag;
          const nTitle = isEn() ? n.title_en || n.title_ko : n.title_ko;
          return `
          <a href="${escapeHtml(n.url)}" target="_blank" rel="noopener noreferrer" class="nav-tool-card">
            <span class="nav-tool-tag">${escapeHtml(nTag)}</span>
            <span class="nav-tool-title">${escapeHtml(nTitle)} ↗</span>
          </a>`;
        })
        .join("");
    }

    const tmList = qs("#trademark-services-list");
    if (tmList && (state.bootstrap.parkco_services || []).length) {
      tmList.innerHTML = state.bootstrap.parkco_services
        .map((s) => {
          const sBadge = isEn() ? s.badge_en || s.badge_ko : s.badge_ko;
          const sFee = isEn() ? s.fee_en || s.fee_ko : s.fee_ko;
          const sTitle = isEn() ? s.title_en || s.title_ko : s.title_ko;
          const sDesc = isEn() ? s.description_en || s.description_ko : s.description_ko;
          const sUrl = isEn() ? s.url_en || s.url_ko : s.url_ko;
          const sTm = isEn() ? s.trademark_en || s.trademark : s.trademark;
          return `
          <article class="tm-service-card ${s.id === "visa_emergency" ? "tm-service-urgent" : ""}">
            <div class="tm-top">
              <span class="tm-badge ${s.id === "visa_emergency" ? "tm-badge-urgent" : ""}">${escapeHtml(sBadge)}</span>
              <span class="tm-fee">${escapeHtml(sFee)}</span>
            </div>
            <h4>${escapeHtml(sTitle)}</h4>
            <p>${escapeHtml(sDesc)}</p>
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
              <a href="${escapeHtml(sUrl)}" target="_blank" rel="noopener noreferrer" class="tm-link">${escapeHtml(ui.openTmServiceCta(sTm))}</a>
              ${
                s.video_id
                  ? `<button type="button" class="btn-secondary-sm" data-open-video="${escapeHtml(s.video_id)}">${escapeHtml(ui.principalVideoBtn)}</button>`
                  : ""
              }
            </div>
          </article>`;
        })
        .join("");
    }
  }

  function syncConsultationBrief(brief) {
    if (!brief) return;
    const area = qs("#brief-body-textarea");
    qsa("[data-brief-lang]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.briefLang === state.briefLang);
    });
    if (area) {
      area.value = state.briefLang === "en" ? brief.body_en : brief.body_ko;
    }
    updateInquiryLinkFromState();
  }

  function updateInquiryLinkFromState() {
    const inquiryBtn = qs("#btn-inquiry-consult");
    if (!inquiryBtn) return;
    inquiryBtn.href =
      isEn() || state.briefLang === "en"
        ? state.lastDiagnosis?.consultation_brief?.inquiry_url_en || OFFICIAL_INQUIRY_URL_EN
        : state.lastDiagnosis?.consultation_brief?.inquiry_url || OFFICIAL_INQUIRY_URL;
  }

  /* ------------------------------------------------------------------------
     Event Listeners & Initialization
     ------------------------------------------------------------------------ */
  function bindEvents() {
    document.addEventListener("click", (e) => {
      const langBtn = e.target.closest("[data-set-lang]");
      if (langBtn) {
        setLanguage(langBtn.dataset.setLang, true);
        return;
      }

      const tabBtn = e.target.closest("[data-module-tab]");
      if (tabBtn) {
        switchModule(tabBtn.dataset.moduleTab, false);
        return;
      }

      const navBtn = e.target.closest("[data-nav-target]");
      if (navBtn) {
        switchModule(navBtn.dataset.navTarget, true);
        return;
      }

      const catChip = e.target.closest("[data-video-cat]");
      if (catChip) {
        state.activeVideoCategory = catChip.dataset.videoCat;
        renderVideoCategories(false);
        renderVideoCards();
        return;
      }

      const vidCard = e.target.closest("[data-open-video]");
      if (vidCard) {
        openVideoModal(vidCard.dataset.openVideo, true);
        return;
      }

      const presetBtn = e.target.closest("[data-duty-preset]");
      if (presetBtn) {
        const qVal = isEn()
          ? presetBtn.dataset.dutyPresetEn || presetBtn.dataset.dutyPreset
          : presetBtn.dataset.dutyPreset;
        const inp = qs("#duty-query-input");
        if (inp) inp.value = qVal;
        runDutySearch(qVal);
        return;
      }

      const personaBtn = e.target.closest("[data-persona-id]");
      if (personaBtn && state.bootstrap) {
        const p = (state.bootstrap.sample_personas || []).find((x) => x.id === personaBtn.dataset.personaId);
        if (p) {
          const rText = isEn() ? p.resume_text_en || p.resume_text : p.resume_text;
          analyzeResumeText(p.filename, rText);
        }
        return;
      }

      const solInspectBtn = e.target.closest("[data-inspect-sol]");
      if (solInspectBtn) {
        const code = solInspectBtn.dataset.inspectSol;
        const solInput = qs("#sol-query-input");
        if (solInput) solInput.value = code;
        state.selectedSolId = code;
        switchModule("module-sol", true);
        loadSolExplorer();
        return;
      }

      const solCard = e.target.closest("[data-sol-card]");
      if (solCard) {
        renderSolDetailPanel(solCard.dataset.solCard);
        return;
      }

      const diagOccBtn = e.target.closest("[data-select-diag-occ]");
      if (diagOccBtn) {
        selectOccupationForDiagnosis(diagOccBtn.dataset.selectDiagOcc, true);
        return;
      }

      const briefLangBtn = e.target.closest("[data-brief-lang]");
      if (briefLangBtn) {
        state.briefLang = briefLangBtn.dataset.briefLang === "en" ? "en" : "ko";
        if (state.lastDiagnosis?.consultation_brief) {
          syncConsultationBrief(state.lastDiagnosis.consultation_brief);
        }
        return;
      }
    });

    // Video search
    const vidInput = qs("#video-search-input");
    if (vidInput) {
      vidInput.addEventListener("input", () => {
        state.videoSearchQuery = vidInput.value;
        renderVideoCards();
      });
    }

    // Modal close & keyboard activation on [data-open-video]
    qs("#btn-close-video-modal")?.addEventListener("click", closeVideoModal);
    qs("#video-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "video-modal") closeVideoModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeVideoModal();
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        const vidCard = e.target?.closest?.("[data-open-video]");
        if (vidCard && vidCard.tagName !== "BUTTON") {
          e.preventDefault();
          openVideoModal(vidCard.dataset.openVideo, true);
        }
      }
    });

    // Duty search form
    qs("#duty-search-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = qs("#duty-query-input")?.value || "";
      runDutySearch(q);
    });

    // Resume file upload & drag-drop
    const dropzone = qs("#resume-dropzone");
    const fileInput = qs("#resume-file-input");
    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      dropzone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInput.click();
        }
      });
      fileInput.addEventListener("change", () => {
        const selected = fileInput.files?.[0];
        if (selected) {
          uploadResumeFile(selected);
          fileInput.value = "";
        }
      });
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("is-dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("is-dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("is-dragover");
        if (e.dataTransfer?.files?.[0]) uploadResumeFile(e.dataTransfer.files[0]);
      });
    }

    qs("#btn-analyze-pasted")?.addEventListener("click", () => {
      const txt = qs("#resume-paste-textarea")?.value || "";
      analyzeResumeText("pasted_resume.txt", txt);
    });

    // SOL filters
    let solTimer = null;
    qs("#sol-query-input")?.addEventListener("input", () => {
      clearTimeout(solTimer);
      solTimer = setTimeout(loadSolExplorer, 200);
    });
    ["#sol-list-select", "#sol-visa-select", "#sol-skill-select"].forEach((sel) => {
      qs(sel)?.addEventListener("change", loadSolExplorer);
    });

    // Diagnose simulator
    qs("#btn-diag-lookup-occ")?.addEventListener("click", () => {
      const raw = qs("#diag-anzsco-input")?.value || "";
      selectOccupationForDiagnosis(raw, false);
    });
    qs("#diag-location")?.addEventListener("change", () => {
      const loc = qs("#diag-location")?.value;
      const curVisa = qs("#diag-current-visa");
      if (curVisa) {
        if (loc === "offshore") {
          curVisa.value = "none";
        } else if (curVisa.value === "none") {
          curVisa.value = "graduate_485";
        }
      }
    });
    qs("#diag-au-study")?.addEventListener("change", () => {
      if (!qs("#diag-au-study")?.checked) {
        ["#diag-stem-research", "#diag-regional-study", "#diag-py"].forEach((sel) => {
          const el = qs(sel);
          if (el) el.checked = false;
        });
      }
    });
    ["#diag-stem-research", "#diag-regional-study", "#diag-py"].forEach((sel) => {
      qs(sel)?.addEventListener("change", (ev) => {
        if (ev.target.checked && qs("#diag-au-study")) {
          qs("#diag-au-study").checked = true;
        }
      });
    });
    qs("#diagnose-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      submitDiagnosis();
    });
    qs("#diagnose-form")?.addEventListener("change", () => {
      submitDiagnosis();
    });

    // Consultation brief edits & actions
    ["#brief-name-input", "#brief-notes-input"].forEach((sel) => {
      qs(sel)?.addEventListener("change", () => submitDiagnosis());
    });
    qs("#brief-body-textarea")?.addEventListener("input", updateInquiryLinkFromState);

    qs("#btn-copy-and-book")?.addEventListener("click", async () => {
      const text = qs("#brief-body-textarea")?.value || "";
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        }
      } catch {
        // Clipboard API fallback ignored cleanly
      }
      const toast = qs("#copy-toast-msg");
      if (toast) toast.hidden = false;
      const bookUrl =
        isEn() || state.briefLang === "en"
          ? state.lastDiagnosis?.consultation_brief?.booking_url_en || OFFICIAL_BOOKING_URL_EN
          : state.lastDiagnosis?.consultation_brief?.booking_url || OFFICIAL_BOOKING_URL;
      window.open(bookUrl, "_blank", "noopener,noreferrer");
    });

    qs("#btn-print-brief")?.addEventListener("click", () => {
      window.print();
    });
  }

  function applyQueryPrefillIfPresent() {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (!sp.has("age") && !sp.has("occ")) return;

      const rawAge = Number(sp.get("age"));
      if (Number.isFinite(rawAge) && rawAge >= 18 && qs("#diag-age")) {
        qs("#diag-age").value =
          rawAge <= 24 ? "18_24" :
          rawAge <= 32 ? "25_32" :
          rawAge <= 39 ? "33_39" :
          rawAge <= 44 ? "40_44" :
          rawAge <= 49 ? "45_49" : "50_plus";
      }

      const rawOcc = (sp.get("occ") || "").trim();
      if (/^\d{6}$/.test(rawOcc)) {
        state.selectedDiagCode = rawOcc;
        if (qs("#diag-anzsco-input")) qs("#diag-anzsco-input").value = rawOcc;
      }

      if (sp.has("study")) {
        const isAuStudy = (sp.get("study") || "").toUpperCase() === "AU";
        if (qs("#diag-location")) qs("#diag-location").value = isAuStudy ? "onshore" : "offshore";
        if (qs("#diag-current-visa")) qs("#diag-current-visa").value = isAuStudy ? "graduate_485" : "none";
        if (qs("#diag-au-study")) qs("#diag-au-study").checked = isAuStudy;
      }

      if (sp.has("deg") && qs("#diag-qual")) {
        const d = (sp.get("deg") || "").toLowerCase();
        qs("#diag-qual").value = d === "phd" ? "phd" : (d === "trade_diploma" ? "diploma_trade" : (d === "high_school" ? "other" : "bachelor_masters"));
      }

      if (sp.has("eng") && qs("#diag-english")) {
        const e = (sp.get("eng") || "").toLowerCase();
        const engMap = {
          ielts_8_plus: "superior",
          ielts_7: "proficient",
          ielts_6_5: "competent",
          ielts_6: "competent",
          ielts_5: "vocational_482",
          none: "below_threshold",
        };
        if (engMap[e]) qs("#diag-english").value = engMap[e];
      }

      if (sp.has("exp")) {
        const yrs = Number(sp.get("exp") || 0);
        const isAuStudy = (sp.get("study") || "").toUpperCase() === "AU";
        if (!isAuStudy && qs("#diag-au-work")) qs("#diag-au-work").value = "0";
        if (qs("#diag-os-work")) {
          qs("#diag-os-work").value = yrs >= 8 ? "8+" : (yrs >= 5 ? "5_7" : (yrs >= 3 ? "3_4" : "0"));
        }
      }

      if (sp.has("offer") && qs("#diag-has-sponsor")) {
        const hasSponsor = sp.get("offer") === "1" || sp.get("offer") === "true";
        qs("#diag-has-sponsor").checked = hasSponsor;
        const sal = Number(sp.get("sal") || 0);
        if (qs("#diag-salary")) qs("#diag-salary").value = hasSponsor && sal > 0 ? String(sal) : "";
      }
    } catch {
      // Ignore query prefill errors cleanly
    }
  }

  async function init() {
    window.PARKCO_I18N?.applyStaticI18n(state.lang);
    const solCounter = qs("#sol-result-counter");
    if (solCounter && t().solLoading) solCounter.textContent = t().solLoading;

    bindEvents();
    applyQueryPrefillIfPresent();
    applyHashModuleIfPresent(Boolean(window.location.hash));
    window.addEventListener("hashchange", () => applyHashModuleIfPresent(true));
    window.PARKCO_APP_BRIDGE = {
      apiGet,
      apiPostJson,
      getLang: () => state.lang,
      switchModule,
    };
    try {
      state.bootstrap = await apiGet("/api/bootstrap");
      const solStat = qs("#stat-sol-count");
      if (solStat) solStat.textContent = "714";
      const vidStat = qs("#stat-video-count");
      if (vidStat && state.bootstrap.youtube_catalog?.total_channel_videos) {
        vidStat.textContent = `${state.bootstrap.youtube_catalog.total_channel_videos}+`;
      }

      renderVideoCurationScopeNote();
      renderVideoCategories(true);
      renderVideoCards();
      renderSamplePersonas();
      renderPathwaysEncyclopedia();

      await Promise.all([
        runDutySearch(isEn() ? DEFAULT_DUTY_EN : DEFAULT_DUTY_KO),
        loadSolExplorer(),
        submitDiagnosis(),
      ]);
    } catch (err) {
      console.error("Bootstrap error:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
