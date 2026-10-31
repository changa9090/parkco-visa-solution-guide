/* ==========================================================================
   Park & Co Australian Visa Solution Guide — Module 07: Master Guide & Clocks
   ========================================================================== */
(() => {
  "use strict";

  const guideState = {
    guide: null,
    selectedChapterId: "ch01_legal_architecture",
    searchQuery: "",
    calcResults: {},
  };

  function isEn() {
    const bridgeLang = window.PARKCO_APP_BRIDGE?.getLang?.();
    if (bridgeLang) return bridgeLang === "en";
    return document.documentElement.lang === "en";
  }

  function esc(val) {
    return String(val ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function fetchGuide() {
    if (window.PARKCO_APP_BRIDGE?.apiGet) {
      return window.PARKCO_APP_BRIDGE.apiGet("/api/guide");
    }
    const res = await fetch("./api/guide", { headers: { Accept: "application/json" } });
    return res.json();
  }

  async function postCalc(calculator, params) {
    const lang = isEn() ? "en" : "ko";
    if (window.PARKCO_APP_BRIDGE?.apiPostJson) {
      return window.PARKCO_APP_BRIDGE.apiPostJson("/api/calculators/evaluate", { calculator, params, lang });
    }
    const res = await fetch(`./api/calculators/evaluate?lang=${lang}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ calculator, params, lang }),
    });
    return res.json();
  }

  function filteredChapters() {
    const chapters = guideState.guide?.chapters || [];
    const q = guideState.searchQuery.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter((ch) => {
      const hay = JSON.stringify(ch).toLowerCase();
      return hay.includes(q);
    });
  }

  function renderGuideToc() {
    const listEl = document.getElementById("guide-chapter-list");
    if (!listEl || !guideState.guide) return;
    const en = isEn();
    const list = filteredChapters();
    if (!list.length) {
      listEl.innerHTML = `<p class="empty-hint">${en ? "No chapters match your search keyword." : "검색어와 일치하는 장(Chapter)이 없어요."}</p>`;
      return;
    }
    if (!list.some((c) => c.id === guideState.selectedChapterId)) {
      guideState.selectedChapterId = list[0].id;
    }
    listEl.innerHTML = list
      .map((ch) => {
        const active = ch.id === guideState.selectedChapterId;
        const title = en ? ch.title_en : ch.title_ko;
        const sub = en ? ch.subtitle_en : ch.subtitle_ko;
        return `
        <button type="button" class="guide-toc-btn ${active ? "is-active" : ""}" data-guide-ch="${esc(ch.id)}">
          <span class="guide-toc-num">CH ${String(ch.number).padStart(2, "0")}</span>
          <span class="guide-toc-title">${esc(title)}</span>
          <span class="guide-toc-sub">${esc(sub)}</span>
        </button>`;
      })
      .join("");
  }

  function renderGuideArticle() {
    const panel = document.getElementById("guide-article-panel");
    if (!panel || !guideState.guide) return;
    const en = isEn();
    const chapters = guideState.guide.chapters || [];
    const ch = chapters.find((c) => c.id === guideState.selectedChapterId) || chapters[0];
    if (!ch) return;

    const headers = (en ? ch.data_table?.headers_en : ch.data_table?.headers_ko) || [];
    const rows = (en ? ch.data_table?.rows_en : ch.data_table?.rows_ko) || [];
    const takeaways = (en ? ch.key_takeaways_en : ch.key_takeaways_ko) || [];

    panel.innerHTML = `
      <div class="guide-art-head">
        <div class="guide-art-badges">
          <span class="guide-pill-primary">CHAPTER ${String(ch.number).padStart(2, "0")} / 12</span>
          <span class="guide-pill-statute">${esc(ch.statutory_basis)}</span>
        </div>
        <h3 class="guide-art-title">${esc(en ? ch.title_en : ch.title_ko)}</h3>
        <p class="guide-art-summary">${esc(en ? ch.summary_en : ch.summary_ko)}</p>
      </div>

      <div class="guide-sections-stack">
        ${(ch.sections || [])
          .map(
            (s) => `
          <section class="guide-subsec">
            <h4>${esc(en ? s.heading_en : s.heading_ko)}</h4>
            <p>${esc(en ? s.body_en : s.body_ko)}</p>
          </section>`
          )
          .join("")}
      </div>

      <div class="guide-table-wrap">
        <table class="guide-data-table">
          <thead>
            <tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows.map((r) => `<tr>${r.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>

      <div class="guide-takeaways-box">
        <h4>${en ? "Key Statutory Takeaways" : "핵심 법정 체크포인트"}</h4>
        <ul>
          ${takeaways.map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </div>

      <div class="caveat-box guide-alert-box">
        <h4>${en ? "QLS Accredited Specialist Practice Alert" : "QLS 이민법 전문변호사 실무 주의보"}</h4>
        <p>${esc(en ? ch.practitioner_alert_en : ch.practitioner_alert_ko)}</p>
      </div>
    `;
  }

  function renderCalculatorsShell() {
    const grid = document.getElementById("au-calculators-grid");
    if (!grid) return;
    const en = isEn();
    grid.innerHTML = `
      <form class="guide-calc-card" data-calc-form="art_and_s501_deadline">
        <span class="guide-calc-tag">s 347(3) · s 500(6B) · reg 2.44</span>
        <h4>${en ? "1. ART · s 501 · NOICC Deadline Clock" : "1. ART 재심 · s 501 · NOICC 불변기한 계산기"}</h4>
        <label class="calc-lbl">${en ? "Decision / Notice Type" : "통지·처분 유형"}
          <select name="decision_type" class="input-control">
            <option value="general_refusal_onshore">${en ? "General Onshore Visa/Nomination Refusal (28d)" : "일반 비자·노미네이션 거절 (s 347(3)(b) 28일)"}</option>
            <option value="student_500_refusal_onshore">${en ? "Student Subclass 500 Refusal — Paper Review (28d)" : "학생비자(500) 거절 — s 367C 서면심리 (28일)"}</option>
            <option value="detention_refusal">${en ? "Refusal in Immigration Detention (14d)" : "이민구금(Detention) 중 통지 결정 (s 347(3)(a) 14일)"}</option>
            <option value="s501_delegate_onshore">${en ? "Onshore s 501 / s 501CA(4) Character Review (9d!)" : "호주 내 s 501 / s 501CA(4) 인성 재심 (단 9일!)"}</option>
            <option value="s501ca_mandatory_cancel">${en ? "s 501(3A) Mandatory Cancellation Revocation (28d)" : "s 501(3A) 의무취소 철회 청구 (28일)"}</option>
            <option value="noicc_s116_onshore">${en ? "Onshore s 116 NOICC Cancellation Notice (5 wd)" : "호주 내 s 116 비자취소예고 NOICC (5영업일)"}</option>
          </select>
        </label>
        <label class="calc-lbl">${en ? "Notification Date" : "결정문·통지서 수령일"}
          <input type="date" name="notification_date" value="2026-10-30" class="input-control">
        </label>
        <div class="calc-result-box" id="calc-out-art_and_s501_deadline"></div>
      </form>

      <form class="guide-calc-card" data-calc-form="s48_and_schedule3_check">
        <span class="guide-calc-tag">s 48 · reg 2.12 · Schedule 3</span>
        <h4>${en ? "2. Section 48 Bar & Schedule 3 Checker" : "2. s 48 재접수 금지 · Schedule 3 판독기"}</h4>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Target Visa" : "목표 비자"}
            <select name="target_subclass" class="input-control">
              <option value="820">Partner 820 (s 48 Exempt)</option>
              <option value="190">GSM State 190 (s 48 Exempt)</option>
              <option value="491">Regional 491 (s 48 Exempt)</option>
              <option value="494">Regional Sponsor 494 (Exempt)</option>
              <option value="482">SID 482 (Subject to s 48)</option>
              <option value="186">ENS 186 (Subject to s 48)</option>
              <option value="500">Student 500 (Subject to s 48)</option>
            </select>
          </label>
          <label class="calc-lbl">${en ? "Days Without Substantive Visa" : "실질비자 소멸 후 경과일수"}
            <input type="number" name="days_since_last_substantive_visa" value="45" min="0" max="3650" class="input-control">
          </label>
        </div>
        <label class="calc-chk"><input type="checkbox" name="holds_substantive_visa"> <span>${en ? "Currently holds a Substantive Visa" : "현재 유효한 실질 비자(Substantive Visa) 보유 중"}</span></label>
        <label class="calc-chk"><input type="checkbox" name="refused_or_cancelled_since_last_entry" checked> <span>${en ? "Refused or cancelled since last entry to AU" : "최근 호주 입국 후 거절·취소 이력 있음"}</span></label>
        <label class="calc-chk"><input type="checkbox" name="has_compelling_reasons" checked> <span>${en ? "Strong compelling/compassionate waiver evidence" : "강력한 면제 사유(호주 자녀·장기혼인 등) 보유"}</span></label>
        <div class="calc-result-box" id="calc-out-s48_and_schedule3_check"></div>
      </form>

      <form class="guide-calc-card" data-calc-form="citizenship_s22_residence">
        <span class="guide-calc-tag">Citizenship Act s 22 · CPI 20</span>
        <h4>${en ? "3. Citizenship s 22 & NZ SCV 444 Calculator" : "3. 호주 시민권(s 22) · NZ 444 거주일수 계산기"}</h4>
        <label class="calc-lbl">${en ? "Applicant Stream" : "신청자 구분"}
          <select name="applicant_stream" class="input-control">
            <option value="standard_pr">${en ? "Standard Permanent Resident" : "일반 영주권자 (189/190/186/801 등)"}</option>
            <option value="nz_scv_444">${en ? "New Zealand Citizen (Subclass 444 SCV — CPI 20)" : "뉴질랜드 시민권자 (Subclass 444 — CPI 20 직행)"}</option>
          </select>
        </label>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Lawful Stay Start" : "호주 합법거주 시작일"}
            <input type="date" name="lawful_start_date" value="2022-07-01" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "PR Grant Date" : "영주권 승인일"}
            <input type="date" name="pr_grant_date" value="2025-07-01" class="input-control">
          </label>
        </div>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "4-Yr Absences (<=365d)" : "4년 해외체류일 (<=365일)"}
            <input type="number" name="absent_days_4yr" value="95" min="0" max="1460" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "12-Mo Absences (<=90d)" : "최근 12개월 결석 (<=90일)"}
            <input type="number" name="absent_days_last_12m" value="25" min="0" max="365" class="input-control">
          </label>
        </div>
        <div class="calc-result-box" id="calc-out-citizenship_s22_residence"></div>
      </form>

      <form class="guide-calc-card" data-calc-form="sponsor_salary_and_saf">
        <span class="guide-calc-tag">F2026L00874 · SAF F2018L01092</span>
        <h4>${en ? "4. FY26–27 CSIT / SSIT Salary & SAF Levy" : "4. FY26–27 스폰서 연봉(CSIT/SSIT) · SAF 계산기"}</h4>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Sponsored Stream" : "스폰서 비자 트랙"}
            <select name="visa_stream" class="input-control">
              <option value="482_core">482 Core Skills ($79,423)</option>
              <option value="482_specialist">482 Specialist ($146,576)</option>
              <option value="482_dama">482 DAMA 90% ($71,481)</option>
              <option value="186_ens">186 ENS Direct/TRT ($79,423)</option>
              <option value="494_sesr">494 Regional ($79,423)</option>
            </select>
          </label>
          <label class="calc-lbl">${en ? "Applicant Age" : "신청자 만 나이"}
            <input type="number" name="applicant_age" value="34" min="18" max="70" class="input-control">
          </label>
        </div>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Offered Salary (AUD)" : "제시 기본연봉 (AUD)"}
            <input type="number" name="offered_salary_aud" value="88000" step="1000" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "Market Rate AMSR (AUD)" : "시장연봉 AMSR (AUD)"}
            <input type="number" name="amsr_aud" value="84000" step="1000" class="input-control">
          </label>
        </div>
        <label class="calc-chk"><input type="checkbox" name="sponsor_turnover_ge_10m"> <span>${en ? "Sponsor annual turnover >= A$10M" : "스폰서 기업 연매출 A$1,000만 이상"}</span></label>
        <div class="calc-result-box" id="calc-out-sponsor_salary_and_saf"></div>
      </form>
    `;

    grid.querySelectorAll("[data-calc-form]").forEach((form) => {
      form.addEventListener("change", () => runSingleForm(form));
      form.addEventListener("input", () => runSingleForm(form));
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        runSingleForm(form);
      });
      runSingleForm(form);
    });
  }

  async function runSingleForm(form) {
    const calcName = form.dataset.calcForm;
    const fd = new FormData(form);
    const params = {};
    for (const [k, v] of fd.entries()) params[k] = v;
    form.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
      params[chk.name] = chk.checked;
    });
    if (calcName === "s48_and_schedule3_check") params.onshore = true;
    if (calcName === "citizenship_s22_residence") params.application_date = "2026-10-30";
    if (calcName === "sponsor_salary_and_saf") params.years_sponsored = 2;

    try {
      const res = await postCalc(calcName, params);
      guideState.calcResults[calcName] = res;
      const box = document.getElementById(`calc-out-${calcName}`);
      if (box) {
        const en = isEn();
        box.innerHTML = `<strong>${esc(res.deadline_date ? (en ? `Deadline: ${res.deadline_date}` : `법정 마감일: ${res.deadline_date}`) : res.statutory_basis)}</strong><p>${esc(en ? res.verdict_en : res.verdict_ko)}</p>`;
      }
    } catch (err) {
      const box = document.getElementById(`calc-out-${calcName}`);
      if (box) box.textContent = err.message || "Error";
    }
  }

  async function initGuideModule() {
    const tocList = document.getElementById("guide-chapter-list");
    if (!tocList) return;

    document.getElementById("guide-search-input")?.addEventListener("input", (e) => {
      guideState.searchQuery = e.target.value || "";
      renderGuideToc();
      renderGuideArticle();
    });

    tocList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-guide-ch]");
      if (!btn) return;
      guideState.selectedChapterId = btn.dataset.guideCh;
      renderGuideToc();
      renderGuideArticle();
    });

    window.addEventListener("parkco:langchange", () => {
      renderGuideToc();
      renderGuideArticle();
      renderCalculatorsShell();
    });

    try {
      guideState.guide = await fetchGuide();
      renderGuideToc();
      renderGuideArticle();
      renderCalculatorsShell();
    } catch (err) {
      console.error("Failed to initialize AU Master Guide:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGuideModule);
  } else {
    setTimeout(initGuideModule, 0);
  }
})();
