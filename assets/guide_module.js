/* ==========================================================================
   Park & Co Australian Visa Solution Guide · Module 07: Master Guide & Clocks
   ========================================================================== */
(() => {
  "use strict";

  const guideState = {
    guide: null,
    selectedChapterId: "ch01_legal_architecture",
    searchQuery: "",
    calcResults: {},
    confirmedCalcs: {},
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
      listEl.innerHTML = `<p class="empty-hint">${en ? "No chapters match your search keyword." : "검색어와 일치하는 장(Chapter)이 없습니다."}</p>`;
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

  function renderNeutralCalcBox(calcName) {
    const box = document.getElementById(`calc-out-${calcName}`);
    if (!box) return;
    const en = isEn();
    box.classList.add("calc-result-neutral");
    box.innerHTML = `<strong>${en ? "Ready for Statutory Calculation" : "법정 기준 대조 대기 중"}</strong><p>${
      en
        ? "Enter your dates/figures above and click [Calculate] or [Try Sample] to evaluate statutory criteria objectively."
        : "위 항목을 입력한 뒤 [법정 기준 계산하기] 또는 [예시 조건으로 체험하기]를 누르면 객관적인 법령 기준 대조 결과를 표시합니다."
    }</p>`;
  }

  function applySampleToCalcForm(form) {
    const calcName = form.dataset.calcForm;
    if (calcName === "art_and_s501_deadline") {
      form.elements.decision_type.value = "general_refusal_onshore";
      form.elements.notification_date.value = "2026-10-30";
      if (form.elements.state) form.elements.state.value = "QLD";
    } else if (calcName === "s48_and_schedule3_check") {
      form.elements.target_subclass.value = "820";
      if (form.elements.current_visa_subclass) form.elements.current_visa_subclass.value = "010";
      form.elements.days_since_last_substantive_visa.value = "45";
      form.elements.holds_substantive_visa.checked = false;
      form.elements.refused_or_cancelled_since_last_entry.checked = true;
      form.elements.has_compelling_reasons.checked = true;
    } else if (calcName === "citizenship_s22_residence") {
      form.elements.applicant_stream.value = "standard_pr";
      form.elements.lawful_start_date.value = "2022-07-01";
      form.elements.pr_grant_date.value = "2025-07-01";
      form.elements.absent_days_4yr.value = "95";
      form.elements.absent_days_last_12m.value = "25";
    } else if (calcName === "sponsor_salary_and_saf") {
      form.elements.visa_stream.value = "482_core";
      form.elements.applicant_age.value = "34";
      form.elements.offered_salary_aud.value = "88000";
      form.elements.amsr_aud.value = "84000";
      form.elements.sponsor_turnover_ge_10m.checked = false;
    }
    guideState.confirmedCalcs[calcName] = true;
    runSingleForm(form);
  }

  function renderCalculatorsShell() {
    const grid = document.getElementById("au-calculators-grid");
    if (!grid) return;
    const en = isEn();
    const calcBtnTxt = en ? "Calculate" : "법정 기준 계산하기";
    const sampleBtnTxt = en ? "Try Sample" : "예시 조건으로 체험하기";
    grid.innerHTML = `
      <form class="guide-calc-card" data-calc-form="art_and_s501_deadline">
        <span class="guide-calc-tag">s 347(3) · s 500(6B) · reg 2.44</span>
        <h4>${en ? "1. ART · s 501 · NOICC Deadline Clock" : "1. 행정재심기구(ART) · s 501 · NOICC 불변기한 계산기"}</h4>
        <label class="calc-lbl">${en ? "Decision / Notice Type" : "통지·처분 유형"}
          <select name="decision_type" class="input-control">
            <option value="general_refusal_onshore">${en ? "General Onshore Visa/Nomination Refusal (28d)" : "일반 비자·노미네이션 거절 (s 347(3)(b) 28일)"}</option>
            <option value="student_500_refusal_onshore">${en ? "Student Subclass 500 Refusal · Paper Review (28d)" : "학생비자(500) 거절 · s 367C 서면심리 (28일)"}</option>
            <option value="detention_refusal">${en ? "Refusal in Immigration Detention (14d)" : "이민구금(Detention) 중 통지 결정 (s 347(3)(a) 14일)"}</option>
            <option value="s501_delegate_onshore">${en ? "Onshore s 501 / s 501CA(4) Character Review (9d)" : "호주 내 s 501 / s 501CA(4) 인성 재심 (9일)"}</option>
            <option value="s501ca_mandatory_cancel">${en ? "s 501(3A) Mandatory Cancellation Revocation (28d)" : "s 501(3A) 의무취소 철회 청구 (28일)"}</option>
            <option value="noicc_s116_onshore">${en ? "Onshore s 116 NOICC Cancellation Notice (5 wd)" : "호주 내 s 116 비자취소예고 NOICC (5영업일)"}</option>
          </select>
        </label>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Notification Date" : "결정문·통지서 수령일"}
            <input type="date" name="notification_date" value="" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "State / Territory (Public Holidays)" : "관할 주·준주 (공휴일 반영)"}
            <select name="state" class="input-control">
              <option value="QLD">QLD (Brisbane)</option>
              <option value="NSW">NSW (Sydney)</option>
              <option value="VIC">VIC (Melbourne)</option>
              <option value="WA">WA (Perth)</option>
              <option value="SA">SA (Adelaide)</option>
              <option value="TAS">TAS (Hobart)</option>
              <option value="ACT">ACT (Canberra)</option>
              <option value="NT">NT (Darwin)</option>
            </select>
          </label>
        </div>
        <div class="calc-actions-row">
          <button type="submit" class="btn-primary-sm">${calcBtnTxt}</button>
          <button type="button" class="btn-secondary-sm" data-calc-sample="art_and_s501_deadline">${sampleBtnTxt}</button>
        </div>
        <div class="calc-result-box" id="calc-out-art_and_s501_deadline"></div>
      </form>

      <form class="guide-calc-card" data-calc-form="s48_and_schedule3_check">
        <span class="guide-calc-tag">s 48 · reg 2.12 · Item 1240/1222 · Sch 3</span>
        <h4>${en ? "2. Section 48 Bar, Item 1240/1222 & Schedule 3 Checker" : "2. s 48 · Item 1240/1222 · Schedule 3 판독기"}</h4>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Target Visa" : "목표 비자"}
            <select name="target_subclass" class="input-control">
              <option value="820">Partner 820 (s 48 Exempt)</option>
              <option value="190">GSM State 190 (s 48 Exempt)</option>
              <option value="491">Regional 491 (s 48 Exempt)</option>
              <option value="494">Regional Sponsor 494 (Exempt)</option>
              <option value="482">SID 482 (Item 1240 BVA/B/C)</option>
              <option value="186">ENS 186 (Subject to s 48)</option>
              <option value="500">Student 500 (Item 1222 Check)</option>
            </select>
          </label>
          <label class="calc-lbl">${en ? "Current Visa Status" : "현재 체류·비자 상태"}
            <select name="current_visa_subclass" class="input-control">
              <option value="substantive">${en ? "Substantive Visa (Other)" : "일반 유효 실질비자 (500/417 등)"}</option>
              <option value="485">${en ? "Subclass 485 (Graduate)" : "Subclass 485 (졸업생비자)"}</option>
              <option value="600">${en ? "Subclass 600 (Visitor)" : "Subclass 600 (방문비자)"}</option>
              <option value="601">${en ? "Subclass 601 (ETA)" : "Subclass 601 (ETA 전자여행)"}</option>
              <option value="651">${en ? "Subclass 651 (eVisitor)" : "Subclass 651 (eVisitor)"}</option>
              <option value="403">${en ? "Subclass 403 / 426 / 771 / 988" : "임시특수비자 (403/426/771/988)"}</option>
              <option value="010">${en ? "Bridging Visa A (010)" : "브리징 비자 A (BVA 010)"}</option>
              <option value="020">${en ? "Bridging Visa B (020)" : "브리징 비자 B (BVB 020)"}</option>
              <option value="030">${en ? "Bridging Visa C (030)" : "브리징 비자 C (BVC 030)"}</option>
              <option value="050">${en ? "Bridging Visa E (050/051)" : "브리징 비자 E (BVE 050/051)"}</option>
              <option value="unlawful">${en ? "Unlawful / Expired Visa" : "비자 만료·미보유 (Unlawful)"}</option>
            </select>
          </label>
        </div>
        <label class="calc-lbl">${en ? "Days Without Substantive Visa" : "실질비자 소멸 후 경과일수"}
          <input type="number" name="days_since_last_substantive_visa" value="0" min="0" max="3650" class="input-control">
        </label>
        <label class="calc-chk"><input type="checkbox" name="holds_substantive_visa" checked> <span>${en ? "Currently holds a Substantive Visa" : "현재 유효한 실질 비자(Substantive Visa) 보유 중"}</span></label>
        <label class="calc-chk"><input type="checkbox" name="refused_or_cancelled_since_last_entry"> <span>${en ? "Refused or cancelled since last entry to AU" : "최근 호주 입국 후 거절·취소 이력 있음"}</span></label>
        <label class="calc-chk"><input type="checkbox" name="has_compelling_reasons"> <span>${en ? "Strong compelling/compassionate waiver evidence" : "면제 소명 사유(호주 자녀·장기혼인 등) 보유"}</span></label>
        <div class="calc-actions-row">
          <button type="submit" class="btn-primary-sm">${calcBtnTxt}</button>
          <button type="button" class="btn-secondary-sm" data-calc-sample="s48_and_schedule3_check">${sampleBtnTxt}</button>
        </div>
        <div class="calc-result-box" id="calc-out-s48_and_schedule3_check"></div>
      </form>

      <form class="guide-calc-card" data-calc-form="citizenship_s22_residence">
        <span class="guide-calc-tag">Citizenship Act s 22 · CPI 20</span>
        <h4>${en ? "3. Citizenship s 22 & NZ SCV 444 Calculator" : "3. 호주 시민권(s 22) · NZ 444 거주일수 계산기"}</h4>
        <label class="calc-lbl">${en ? "Applicant Stream" : "신청자 구분"}
          <select name="applicant_stream" class="input-control">
            <option value="standard_pr">${en ? "Standard Permanent Resident" : "일반 영주권자 (189/190/186/801 등)"}</option>
            <option value="nz_scv_444">${en ? "New Zealand Citizen (Subclass 444 SCV · CPI 20)" : "뉴질랜드 시민권자 (Subclass 444 · CPI 20 직행)"}</option>
          </select>
        </label>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Lawful Stay Start" : "호주 합법거주 시작일"}
            <input type="date" name="lawful_start_date" value="" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "PR Grant Date" : "영주권 승인일"}
            <input type="date" name="pr_grant_date" value="" class="input-control">
          </label>
        </div>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "4-Yr Absences (<=365d)" : "4년 해외체류일 (<=365일)"}
            <input type="number" name="absent_days_4yr" value="0" min="0" max="1460" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "12-Mo Absences (<=90d)" : "최근 12개월 결석 (<=90일)"}
            <input type="number" name="absent_days_last_12m" value="0" min="0" max="365" class="input-control">
          </label>
        </div>
        <div class="calc-actions-row">
          <button type="submit" class="btn-primary-sm">${calcBtnTxt}</button>
          <button type="button" class="btn-secondary-sm" data-calc-sample="citizenship_s22_residence">${sampleBtnTxt}</button>
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
            <input type="number" name="applicant_age" value="32" min="18" max="70" class="input-control">
          </label>
        </div>
        <div class="form-row-2">
          <label class="calc-lbl">${en ? "Offered Salary (AUD)" : "제시 기본연봉 (AUD)"}
            <input type="number" name="offered_salary_aud" value="" placeholder="${en ? "e.g., 88000" : "예: 88000"}" step="1000" class="input-control">
          </label>
          <label class="calc-lbl">${en ? "Market Rate AMSR (AUD)" : "시장연봉 AMSR (AUD)"}
            <input type="number" name="amsr_aud" value="" placeholder="${en ? "e.g., 84000" : "예: 84000"}" step="1000" class="input-control">
          </label>
        </div>
        <label class="calc-chk"><input type="checkbox" name="sponsor_turnover_ge_10m"> <span>${en ? "Sponsor annual turnover >= A$10M" : "스폰서 기업 연매출 A$1,000만 이상"}</span></label>
        <div class="calc-actions-row">
          <button type="submit" class="btn-primary-sm">${calcBtnTxt}</button>
          <button type="button" class="btn-secondary-sm" data-calc-sample="sponsor_salary_and_saf">${sampleBtnTxt}</button>
        </div>
        <div class="calc-result-box" id="calc-out-sponsor_salary_and_saf"></div>
      </form>
    `;

    grid.querySelectorAll("[data-calc-form]").forEach((form) => {
      const calcName = form.dataset.calcForm;
      form.addEventListener("change", (ev) => {
        if (calcName === "s48_and_schedule3_check") {
          const nonSubSet = new Set(["010", "020", "030", "050", "051", "unlawful"]);
          if (ev.target?.name === "current_visa_subclass" && form.elements.holds_substantive_visa) {
            form.elements.holds_substantive_visa.checked = !nonSubSet.has(ev.target.value);
          } else if (ev.target?.name === "holds_substantive_visa" && form.elements.current_visa_subclass) {
            if (ev.target.checked && nonSubSet.has(form.elements.current_visa_subclass.value)) {
              form.elements.current_visa_subclass.value = "substantive";
            } else if (!ev.target.checked && !nonSubSet.has(form.elements.current_visa_subclass.value)) {
              form.elements.current_visa_subclass.value = "010";
            }
          }
        }
        if (guideState.confirmedCalcs[calcName]) runSingleForm(form);
      });
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        guideState.confirmedCalcs[calcName] = true;
        runSingleForm(form);
      });
      form.querySelector("[data-calc-sample]")?.addEventListener("click", () => {
        applySampleToCalcForm(form);
      });
      renderNeutralCalcBox(calcName);
    });
  }

  function buildCalcHandoffHtml(calcName, params, en) {
    const langQ = en ? "&lang=en" : "";
    if (calcName === "art_and_s501_deadline") {
      const tool = params.decision_type === "noicc_s116_onshore" ? "noicc" : "deadline";
      const label = en
        ? "Open Statutory Deadline Crisis Navigator ↗"
        : "비자 위기·기한 내비게이터에서 기한 정밀 계산 ↗";
      return `<div class="handoff-links-row"><a href="https://changa9090.github.io/parkco-visa-crisis-navigator/?tool=${tool}${langQ}" target="_blank" rel="noopener" class="btn-handoff-link" data-handoff-link="1">${esc(label)}</a></div>`;
    }
    if (calcName === "s48_and_schedule3_check") {
      const links = [
        `<a href="https://changa9090.github.io/parkco-visa-crisis-navigator/?tool=s48${langQ}" target="_blank" rel="noopener" class="btn-handoff-link" data-handoff-link="1">${esc(
          en ? "Open s 48 & Schedule 3 Crisis Navigator ↗" : "비자 위기 내비게이터에서 s 48·대안 점검 ↗"
        )}</a>`,
      ];
      const tgt = String(params.target_subclass || "");
      const rawAnzsco = (document.getElementById("diag-anzsco-input")?.value || "").trim();
      const anzscoQ = /^\d{6}$/.test(rawAnzsco) ? `anzsco=${encodeURIComponent(rawAnzsco)}&` : "";
      if (["482", "186", "494"].includes(tgt)) {
        links.push(
          `<a href="https://changa9090.github.io/parkco-sid-ens-navigator/?${anzscoQ}visa=${encodeURIComponent(tgt)}${langQ}" target="_blank" rel="noopener" class="btn-handoff-link" data-handoff-link="1">${esc(
            en ? "Send to 482/186 Sponsor Navigator ↗" : "482·186 스폰서 내비게이터 열기 ↗"
          )}</a>`
        );
      } else if (["190", "491"].includes(tgt)) {
        links.push(
          `<a href="https://changa9090.github.io/parkco-gsm-state-navigator/?${anzscoQ}visa=${encodeURIComponent(tgt)}${langQ}" target="_blank" rel="noopener" class="btn-handoff-link" data-handoff-link="1">${esc(
            en ? "Send to 8-State GSM Navigator ↗" : "8개 주 GSM 커트라인 내비게이터 열기 ↗"
          )}</a>`
        );
      }
      return `<div class="handoff-links-row">${links.join("")}</div>`;
    }
    if (calcName === "sponsor_salary_and_saf") {
      const sp = new URLSearchParams();
      const rawAnzsco = (document.getElementById("diag-anzsco-input")?.value || "").trim();
      if (/^\d{6}$/.test(rawAnzsco)) sp.set("anzsco", rawAnzsco);
      if (params.applicant_age) sp.set("age", String(params.applicant_age));
      if (params.offered_salary_aud) sp.set("salary", String(params.offered_salary_aud));
      if (en) sp.set("lang", "en");
      const label = en
        ? "Send Inputs to 482/186 Sponsor Navigator ↗"
        : "482·186 스폰서 내비게이터로 연봉·연령 전달 ↗";
      return `<div class="handoff-links-row"><a href="https://changa9090.github.io/parkco-sid-ens-navigator/?${sp.toString()}" target="_blank" rel="noopener" class="btn-handoff-link" data-handoff-link="1">${esc(label)}</a></div>`;
    }
    return "";
  }

  async function runSingleForm(form) {
    const calcName = form.dataset.calcForm;
    const en = isEn();
    const fd = new FormData(form);
    const params = {};
    for (const [k, v] of fd.entries()) params[k] = v;
    form.querySelectorAll('input[type="checkbox"]').forEach((chk) => {
      params[chk.name] = chk.checked;
    });
    if (calcName === "art_and_s501_deadline" && !String(params.notification_date || "").trim()) {
      renderNeutralCalcBox(calcName);
      return;
    }
    if (calcName === "citizenship_s22_residence" && (!String(params.lawful_start_date || "").trim() || !String(params.pr_grant_date || "").trim())) {
      renderNeutralCalcBox(calcName);
      return;
    }
    if (calcName === "s48_and_schedule3_check") params.onshore = true;
    if (calcName === "citizenship_s22_residence") params.application_date = "2026-10-30";
    if (calcName === "sponsor_salary_and_saf") params.years_sponsored = 2;

    try {
      const res = await postCalc(calcName, params);
      guideState.calcResults[calcName] = res;
      const box = document.getElementById(`calc-out-${calcName}`);
      if (box) {
        box.classList.toggle("calc-result-neutral", res.status === "prompt");
        const handoffHtml = res.status === "prompt" ? "" : buildCalcHandoffHtml(calcName, params, en);
        box.innerHTML = `<strong>${esc(res.deadline_date ? (en ? `Deadline: ${res.deadline_date}` : `법정 마감일: ${res.deadline_date}`) : res.statutory_basis)}</strong><p>${esc(en ? res.verdict_en : res.verdict_ko)}</p>${handoffHtml}`;
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
