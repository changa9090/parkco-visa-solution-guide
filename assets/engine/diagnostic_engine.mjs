export const OFFICIAL_INQUIRY_URL = "https://parklawyers.com.au/links/?lang=ko";
export const OFFICIAL_INQUIRY_URL_EN = "https://parklawyers.com.au/links/";
export const OFFICIAL_BOOKING_URL = OFFICIAL_INQUIRY_URL;
export const OFFICIAL_BOOKING_URL_EN = OFFICIAL_INQUIRY_URL_EN;

export const AGE_POINTS = {
  "18_24": 25,
  "25_32": 30,
  "33_39": 25,
  "40_44": 15,
  "45_49": 0,
  "50_plus": 0,
};

export const AGE_LABELS_KO = {
  "18_24": "만 18~24세",
  "25_32": "만 25~32세 (최고점 구간)",
  "33_39": "만 33~39세",
  "40_44": "만 40~44세",
  "45_49": "만 45~49세 (일반 GSM 연령 상한 초과)",
  "50_plus": "만 50세 이상 (특례·스폰서·가족 경로 중심)",
};

export const AGE_LABELS_EN = {
  "18_24": "Age 18–24 (25 pts)",
  "25_32": "Age 25–32 (Maximum 30 pts)",
  "33_39": "Age 33–39 (25 pts)",
  "40_44": "Age 40–44 (15 pts)",
  "45_49": "Age 45–49 (Above Standard GSM Cap)",
  "50_plus": "Age 50+ (Exempt / Sponsor / Family Focus)",
};

export const ENGLISH_POINTS = {
  superior: 20,
  proficient: 10,
  competent: 0,
  vocational_482: 0,
  below_threshold: 0,
};

export const ENGLISH_LABELS_KO = {
  superior: "Superior (IELTS 8.0+ / 개편 PTE L69·R70·W85·S88)",
  proficient: "Proficient (IELTS 7.0+ / 개편 PTE L58·R59·W69·S76)",
  competent: "Competent (IELTS 6.0+ / 개편 PTE L47·R48·W51·S54)",
  vocational_482: "482 SID 기준 (IELTS 5.0 / 개편 PTE L33·R36·W29·S24)",
  below_threshold: "현재 영어 점수 미보유 / 기준 미달",
};

export const ENGLISH_LABELS_EN = {
  superior: "Superior (IELTS 8.0+ / Revised PTE L69·R70·W85·S88)",
  proficient: "Proficient (IELTS 7.0+ / Revised PTE L58·R59·W69·S76)",
  competent: "Competent (IELTS 6.0+ / Revised PTE L47·R48·W51·S54)",
  vocational_482: "Subclass 482 SID Level (IELTS 5.0 / Revised PTE L33·R36·W29·S24)",
  below_threshold: "No English Score Yet / Below Threshold",
};

export const QUAL_POINTS = {
  phd: 20,
  bachelor_masters: 15,
  diploma_trade: 10,
  other: 0,
};

export const AU_WORK_POINTS = {
  "0": 0,
  "1_2": 5,
  "3_4": 10,
  "5_7": 15,
  "8+": 20,
};

export const OS_WORK_POINTS = {
  "0": 0,
  "1_2": 0,
  "3_4": 5,
  "5_7": 10,
  "8+": 15,
};

export const WORK_BUCKET_MIN_YEARS = {
  "0": 0.0,
  "1_2": 1.0,
  "3_4": 3.0,
  "5_7": 5.0,
  "8+": 8.0,
};

export const PARTNER_POINTS = {
  single_or_au_partner: 10,
  skilled_partner: 10,
  english_partner: 5,
  partner_no_points: 0,
};

function fmtComma(num) {
  return Math.trunc(Number(num) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatProcTime(procMap, subclass) {
  const entries = (procMap && procMap[subclass]) || [];
  if (!entries.length) {
    return "스트림·개인별 상이 (이민성 최신 가이드 기준)";
  }
  const e = entries[0];
  const p50 = e.p50_raw || "-";
  const p90 = e.p90_raw || "-";
  return `50% ${p50} · 90% ${p90}`;
}

function formatProcTimeEn(procMap, subclass) {
  const entries = (procMap && procMap[subclass]) || [];
  if (!entries.length) {
    return "Varies by stream (per Home Affairs Global Processing Guide)";
  }
  const e = entries[0];
  const p50 = e.p50_raw || "-";
  const p90 = e.p90_raw || "-";
  return `50% in ${p50} · 90% in ${p90}`;
}

export function calculateGsmPoints(payload = {}) {
  const ageB = String(payload.age_bracket || "25_32");
  const engT = String(payload.english_tier || "competent");
  const qual = String(payload.qualification || "bachelor_masters");
  const auWorkB = String(payload.au_work_years_bucket || "0");
  const osWorkB = String(payload.os_work_years_bucket || "0");
  const partnerS = String(payload.partner_status || "single_or_au_partner");

  const auStudyOk = Boolean(payload.au_study);
  const pAge = AGE_POINTS[ageB] ?? 0;
  const pEng = ENGLISH_POINTS[engT] ?? 0;
  const pQual = QUAL_POINTS[qual] ?? 0;
  const pAuStudy = auStudyOk ? 5 : 0;
  const pSpecEdu =
    auStudyOk && (qual === "phd" || qual === "bachelor_masters") && Boolean(payload.masters_research_stem)
      ? 10
      : 0;
  const pRegStudy = auStudyOk && Boolean(payload.regional_study) ? 5 : 0;
  const pNaati = Boolean(payload.naati_ccl) ? 5 : 0;
  const pPy = auStudyOk && Boolean(payload.professional_year) ? 5 : 0;
  const pPartner = PARTNER_POINTS[partnerS] ?? 0;

  const pAuWork = AU_WORK_POINTS[auWorkB] ?? 0;
  const pOsWork = OS_WORK_POINTS[osWorkB] ?? 0;
  const rawEmp = pAuWork + pOsWork;
  const cappedEmp = Math.min(20, rawEmp);
  const capApplied = rawEmp > 20;

  const base189 =
    pAge + pEng + pQual + pAuStudy + pSpecEdu + pRegStudy + pNaati + pPy + pPartner + cappedEmp;

  return {
    age_points: pAge,
    english_points: pEng,
    qualification_points: pQual,
    au_study_points: pAuStudy,
    specialist_edu_points: pSpecEdu,
    regional_study_points: pRegStudy,
    naati_ccl_points: pNaati,
    professional_year_points: pPy,
    partner_points: pPartner,
    au_work_points_raw: pAuWork,
    os_work_points_raw: pOsWork,
    raw_employment_points: rawEmp,
    capped_employment_points: cappedEmp,
    cap_applied_6d51: capApplied,
    base_points_189: base189,
    points_190: base189 + 5,
    points_491: base189 + 15,
    meets_gsm_65_189: base189 >= 65,
    meets_gsm_65_190: base189 + 5 >= 65,
    meets_gsm_65_491: base189 + 15 >= 65,
  };
}

export function runDiagnosis(payload = {}, matcher, pathwaysCatalog, youtubeCatalog) {
  const thresholds = pathwaysCatalog.thresholds_fy26_27;
  const vacMap = thresholds.base_vac_aud;
  const procMap = pathwaysCatalog.processing_times || {};

  const location = String(payload.location || "onshore");
  const currentVisa = String(payload.current_visa || "none");
  const plannedNextStep = String(payload.planned_next_step || "best_pr");
  const ageB = String(payload.age_bracket || "25_32");
  const engT = String(payload.english_tier || "competent");
  const auWorkB = String(payload.au_work_years_bucket || "0");
  const osWorkB = String(payload.os_work_years_bucket || "0");

  const hasSponsor = Boolean(payload.has_employer_sponsor);
  const offeredSalary = payload.offered_salary_aud;
  const offeredSalaryInt =
    typeof offeredSalary === "number" && Number.isFinite(offeredSalary) && offeredSalary > 0
      ? Math.trunc(offeredSalary)
      : null;
  const regionalWilling = Boolean(payload.regional_willing);
  const hasAuPartner =
    Boolean(payload.has_au_partner_for_partner_visa) || plannedNextStep === "partner";
  const globalTalent = Boolean(payload.global_talent_profile);
  const parentFlag =
    Boolean(payload.au_child_parent_visa) || plannedNextStep === "parent_or_family";
  const s57Or4020 = Boolean(payload.s57_or_pic4020_notice);
  const priorRefusal = Boolean(payload.prior_refusal_s48);
  const healthChar = Boolean(payload.health_or_character_issue);
  const s48OnshoreBar = location === "onshore" && priorRefusal;

  const totalEstYears =
    payload.total_work_years_numeric !== null && payload.total_work_years_numeric !== undefined
      ? Number(payload.total_work_years_numeric)
      : (WORK_BUCKET_MIN_YEARS[auWorkB] ?? 0.0) + (WORK_BUCKET_MIN_YEARS[osWorkB] ?? 0.0);

  let occ = null;
  const codeIn = String(payload.anzsco_code || "").trim();
  if (codeIn) {
    occ = matcher.getByCode(codeIn);
  }
  if (occ === null && payload.occupation_query) {
    const sRes = matcher.search({ query: String(payload.occupation_query), limit: 1 });
    if (sRes.results.length) {
      occ = matcher.getByCode(sRes.results[0].anzsco_code_primary) || sRes.results[0];
    }
  }

  const points = calculateGsmPoints(payload);

  const occLists = occ ? occ.lists || [] : [];
  const occVisas = occ ? occ.visas_eligible || [] : [];
  const occSummary = {
    selected: occ !== null,
    anzsco_code: occ ? occ.anzsco_code_primary : null,
    occupation: occ ? occ.occupation : null,
    title_ko: occ ? occ.title_ko : null,
    lists: occLists,
    visas_eligible: occVisas,
    eligible_189: Boolean(occ && occLists.includes("MLTSSL") && occVisas.includes("189")),
    eligible_190: Boolean(occ && occVisas.includes("190")),
    eligible_491: Boolean(occ && occVisas.includes("491")),
    eligible_482: Boolean(occ && occVisas.includes("482")),
    eligible_186_de: Boolean(occ && occVisas.includes("186")),
    eligible_494: Boolean(occ && occVisas.includes("494")),
    eligible_485_pvew: Boolean(occ && occLists.includes("MLTSSL")),
    has_caveats: Boolean(occ && occ.has_caveats),
    caveats_by_subclass: occ ? occ.caveats_by_subclass || {} : {},
    assessing_authorities: occ ? occ.assessing_authorities || [] : [],
    skillselect_min_points_189: occ ? occ.skillselect_min_points_189 ?? null : null,
    dama_count: occ ? occ.dama_count ?? 0 : 0,
    dama_concessions: occ ? occ.dama_concessions ?? null : null,
  };

  const riskFlags = [];

  if (s57Or4020) {
    riskFlags.push({
      severity: "P1",
      code: "CRISIS_S57_PIC4020",
      title_ko: "긴급 대응 필수: s 57 소명 요청(Natural Justice) · PIC 4020 거절/취소 위기",
      title_en: "Immediate Action Required: s 57 Natural Justice · PIC 4020 Refusal / Cancellation Crisis",
      detail_ko:
        "이민성으로부터 s 57 소명 요청, NOICC(취소 예고), 또는 PIC 4020(허위·오도 정보/문서) 관련 통지를 받으신 경우 " +
        "법정 답변 기한(통상 7~28일)을 넘기면 즉시 거절 및 3년~10년 입국·비자 제한이 발동돼요. " +
        "단순 반성문 제출은 금물이며 즉시 박앤코 비자응급실(Visa Emergency™) 법률 소명 전략이 필요해요.",
      detail_en:
        "If you received a s 57 invitation to comment, NOICC, or PIC 4020 allegation (bogus document or false/misleading information), " +
        "missing the statutory deadline (typically 7–28 days) triggers immediate refusal and a 3- to 10-year visa bar. " +
        "Avoid unguided apology letters—seek immediate legal triage via Park & Co Visa Emergency™.",
    });
  }

  if (priorRefusal) {
    riskFlags.push({
      severity: "P1",
      code: "SECTION_48_BAR_AND_ART",
      title_ko: "호주 내 비자 거절·취소 이력 및 Section 48 재접수 제한(Bar) 경보",
      title_en: "Onshore Visa Refusal / Cancellation History & Section 48 Bar Alert",
      detail_ko:
        "호주 입국 후 비자가 거절·취소되어 실질 비자(Substantive Visa)가 없는 상태라면 Migration Act s 48에 의해 " +
        "호주 내에서 대부분의 일반 비자(482·500·189·186 등) 재접수가 법적으로 차단돼요. " +
        "ART(행정재심재판소, 접수비 $3,727) 재심 기한을 즉시 확인하거나, s 48 예외 비자(190 · 491 · 494 · 파트너 820) 및 출국 후 해외 접수 전략을 정밀 검토해야 해요.",
      detail_en:
        "If you were refused or cancelled since last entering Australia and do not hold a substantive visa, Migration Act s 48 legally bars onshore lodgement of most visas (482, 500, 189, 186, etc.). " +
        "Verify your non-extendable ART merits review deadline ($3,727 fee) immediately, or assess s 48 exempt onshore visas (190, 491, 494, Partner 820) and offshore lodgement options.",
    });
  }

  if (location === "onshore" && (currentVisa === "visitor_600" || currentVisa === "graduate_485")) {
    if (plannedNextStep === "student_500") {
      riskFlags.push({
        severity: "P1",
        code: "ONSHORE_STUDENT_500_HOPPING_BAN",
        title_ko: "호주 내 학생비자(Subclass 500) 비자 호핑 원천 금지 경보",
        title_en: "Statutory Ban on Onshore Student Visa (Subclass 500) Hopping",
        detail_ko:
          "2024년 7월 1일 법 개정 이후 방문비자(600) 및 졸업생비자(485) 소지자는 호주 내(Onshore)에서 학생비자(500)를 신청하는 것 자체가 법적으로 불가능해요. " +
          "체류 연장을 목적으로 무리한 학생비자 전환을 시도해서는 안 되며, 해외 출국 후 진정한 유학생 요건(GS) 하에 접수하거나 482·190·491·파트너 비자 등 합법적 직접 경로로 설계해야 해요.",
        detail_en:
          "Since 1 July 2024, holders of Visitor (600) and Temporary Graduate (485) visas are statutorily barred from lodging a Student Visa (Subclass 500) onshore in Australia. " +
          "Do not rely on onshore student extensions—plan direct skilled/sponsored/partner pathways (482, 190, 491, 820) or genuine offshore Student Visa lodgement.",
      });
    } else {
      riskFlags.push({
        severity: "P3",
        code: "ONSHORE_STUDENT_500_HOPPING_REMINDER",
        title_ko: "참고: 현재 비자(600/485) 만료 임박 시 호주 내 학생비자(500) 연장 전환은 불가해요",
        title_en: "Reminder: Current Subclass 600/485 Holders Cannot Switch to Student Visa (500) Onshore",
        detail_ko:
          "2024년 7월 1일 시행 규정에 따라 485·600 비자 소지자는 호주 내에서 학생비자(500)로 체류를 연장할 수 없으므로, 현 비자 만료일 전에 189·190·491 초청 또는 482 스폰서 노미네이션 일정을 역산해 준비하셔야 해요.",
        detail_en:
          "Under the 1 July 2024 anti-visa-hopping regulations, Subclass 485 and 600 holders cannot lodge an onshore Student Visa (500). Work backwards from your visa expiry to secure a 189/190/491 invitation or 482 nomination.",
      });
    }
  }

  if (location === "onshore" && currentVisa === "bridging_or_expired" && hasAuPartner) {
    riskFlags.push({
      severity: "P2",
      code: "PARTNER_SCHEDULE_3_RISK",
      title_ko: "호주 내 파트너 비자(820) 신청 시 Schedule 3 면제(Waiver) 입증 리스크",
      title_en: "Schedule 3 Waiver Risk for Onshore Partner Visa (Subclass 820)",
      detail_ko:
        "브리징 비자 소지 또는 비자 만료(실질 비자 미소지) 상태에서 호주 내 파트너 비자(820/801)를 접수하면 Schedule 3 요건이 걸려요. " +
        "강력하고 불가피한 사유(Compelling Reasons) 면제를 입증하지 못하면 거절될 수 있으므로, 주정부 사실혼 관계등록(Relationship Registration) 여부와 해외 309/100 접수 대안까지 변호사와 비교 후 결정하셔야 해요.",
      detail_en:
        "Lodging an onshore Partner Visa (820/801) while holding a Bridging Visa or without a substantive visa triggers Schedule 3 criteria. " +
        "Without compelling reasons for a waiver, the visa will be refused—compare onshore Schedule 3 submissions against offshore Subclass 309/100 lodgement with a specialist lawyer first.",
    });
  }

  const ageOver45 = ageB === "45_49" || ageB === "50_plus";
  if (ageOver45) {
    riskFlags.push({
      severity: "P2",
      code: "AGE_45_CAP_GSM_186DE",
      title_ko: "만 45세 연령 상한 도달: 일반 기술이민(189·190·491) 및 186 DE 제외",
      title_en: "Age 45 Statutory Ceiling Reached: Standard GSM (189·190·491) & 186 DE Excluded",
      detail_ko:
        "초청 시점 만 45세 이상은 일반 점수제 기술이민(189·190·491)과 186 Direct Entry 신청이 법적으로 불가해요. " +
        "하지만 ① 연령 제한이 없는 482 SID 스폰서 비자 취득 후 2년 근무 + Fair Work 고소득 기준(FWHIT $190,100)을 통한 186 TRT 전환, " +
        "② 지역 DAMA 협약(만 50세 또는 만 55세 미만 연령 완화)을 통한 482→186 전환, ③ 파트너 비자(820/309) 및 858 NIV는 여전히 열려 있어요.",
      detail_en:
        "Applicants aged 45 or older at invitation/application are ineligible for standard points-tested GSM (189/190/491) and Subclass 186 Direct Entry. " +
        "Viable PR alternatives remain open via: (1) Age-uncapped Subclass 482 SID + 2 years at the Fair Work High Income Threshold (FWHIT $190,100) for 186 TRT, " +
        "(2) Regional DAMA agreements (age concessions up to under 50 or 55), and (3) Partner Visas (820/309) or Subclass 858 NIV.",
    });
  }

  if (occ && occ.has_caveats) {
    const scOrder = ["482", "186", "494", "189", "190", "491"];
    const sortedScKeys = Object.keys(occ.caveats_by_subclass || {}).sort((a, b) => {
      const ia = scOrder.indexOf(a);
      const ib = scOrder.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    if (sortedScKeys.length) {
      const cavList = occ.caveats_by_subclass[sortedScKeys[0]];
      const verbatimExcerpt = cavList[0].description_en;
      const koSum = cavList[0].summary_ko;
      const enSum = cavList[0].summary_en || cavList[0].title_en || "Occupation caveat applies";
      const scKeysJoined = sortedScKeys.join(", ");
      const excerptShort = `${verbatimExcerpt.slice(0, 240)}${verbatimExcerpt.length > 240 ? "..." : ""}`;
      riskFlags.push({
        severity: "P2",
        code: `OCCUPATION_CAVEAT_${occ.anzsco_code_primary}`,
        title_ko: `직종 고유 법령 제한 조건(Caveat) 존재 — ${occ.occupation} (${occ.anzsco_code_primary})`,
        title_en: `Statutory Occupation Caveat Applies — ${occ.occupation} (${occ.anzsco_code_primary})`,
        detail_ko: `스폰서 비자(${scKeysJoined}) 진행 시 [${koSum}] 요건이 적용돼요. 이민성 원문: "${excerptShort}"`,
        detail_en: `Sponsored nomination under Subclass ${scKeysJoined} must satisfy [${enSum}]. Home Affairs Verbatim Text: "${excerptShort}"`,
      });
    }
  }

  if (occ && occLists.includes("STSOL") && !occLists.includes("CSOL") && !occLists.includes("MLTSSL")) {
    riskFlags.push({
      severity: "P2",
      code: "STSOL_ONLY_NO_CSOL",
      title_ko: `${occ.occupation} 직종은 일반 482 Core(CSOL) 및 189(MLTSSL) 미등재 직종이에요`,
      title_en: `'${occ.occupation}' Is Excluded from Standard 482 CSOL & 189 MLTSSL`,
      detail_ko:
        "2024년 12월 CSOL(456개 직종) 개편에서 일반 482 Core 리스트에 포함되지 않아 표준 482 스폰서십 및 189 신청이 불가해요. " +
        "주정부 후원(190/491), 지방 고용주 스폰서(494), 또는 해당 직종이 포함된 지역 DAMA 협약을 통해서만 진행할 수 있어요.",
      detail_en:
        "Under the December 2024 CSOL (456 occupations) reform, this occupation is unavailable for standard Subclass 482 Core Skills sponsorship or Subclass 189. " +
        "Target State Nomination (190/491), Regional Employer Sponsored (494), or an eligible regional DAMA Labour Agreement.",
    });
  }

  if (hasSponsor && offeredSalaryInt !== null && offeredSalaryInt < thresholds.csit_aud) {
    riskFlags.push({
      severity: "P2",
      code: "SALARY_BELOW_CSIT",
      title_ko: `제안 연봉($${fmtComma(offeredSalaryInt)})이 FY2026–27 최소 소득 기준(CSIT $${fmtComma(thresholds.csit_aud)}) 미만이에요`,
      title_en: `Offered Salary ($${fmtComma(offeredSalaryInt)}) Is Below FY2026–27 CSIT ($${fmtComma(thresholds.csit_aud)})`,
      detail_ko:
        `2026년 7월 1일부로 482 Core Skills 및 186 최소 연봉 기준(CSIT/TSMIT)이 AUD $${fmtComma(thresholds.csit_aud)}(Super 별도)로 인상되었어요. ` +
        `표준 스폰서십은 불가하며, 연봉 10% 완화($${fmtComma(thresholds.dama_concession_90pct_aud)})가 적용되는 지역 DAMA 협약 가능 여부를 확인해야 해요.`,
      detail_en:
        `From 1 July 2026, the minimum base salary threshold (CSIT/TSMIT) for Subclass 482 Core Skills and 186 is AUD $${fmtComma(thresholds.csit_aud)} (excluding superannuation). ` +
        `Standard sponsorship is unavailable unless adjusted upward or lodged under a 90% DAMA salary concession ($${fmtComma(thresholds.dama_concession_90pct_aud)}).`,
    });
  }

  if (healthChar) {
    riskFlags.push({
      severity: "P2",
      code: "HEALTH_CHARACTER_REVIEW",
      title_ko: "신체검사(PIC 4005/4007) · 신원조회(s 501) 사전 법률 리스크 점검 필요",
      title_en: "Pre-Lodgement Health (PIC 4005/4007) & Character (s 501) Legal Review Required",
      detail_ko:
        "비자 종류마다 Health Waiver 가능 여부(PIC 4007 적용 비자: 482·186 TRT·820/309 등 vs PIC 4005 면제 불가 비자: 189·190·186 DE 등)가 완전히 달라요. " +
        "음주운전·벌금·질환 이력이 있다면 비자 서브클래스를 고르기 전에 반드시 면제 가능 비자군부터 선별해야 해요.",
      detail_en:
        "Health waiver availability differs starkly by subclass (PIC 4007 waiverable: 482, 186 TRT, 820/309 vs PIC 4005 non-waiverable: 189, 190, 186 DE). " +
        "Any medical condition, DUI, or criminal record must be assessed before selecting your target visa subclass.",
    });
  }

  if (points.cap_applied_6d51) {
    riskFlags.push({
      severity: "P3",
      code: "SCHEDULE_6D_ITEM_6D51_CAP",
      title_ko: "Schedule 6D Item 6D51 경력 점수 합산 상한(최대 20점) 자동 적용됨",
      title_en: "Schedule 6D Item 6D51 Combined Employment Cap (Max 20 Pts) Applied",
      detail_ko:
        `호주 경력(${points.au_work_points_raw}점)과 해외 경력(${points.os_work_points_raw}점) 단순 합계는 ${points.raw_employment_points}점이지만, ` +
        "이민법 Schedule 6D Item 6D51 규정에 따라 국내·외 경력 합산 점수는 최대 20점까지만 인정돼요. EOI 과다 청구(Overclaim) 거절 방지를 위해 20점으로 정확히 보정했어요.",
      detail_en:
        `Your raw Australian (${points.au_work_points_raw} pts) + overseas (${points.os_work_points_raw} pts) employment score is ${points.raw_employment_points} pts, ` +
        "but Schedule 6D Item 6D51 caps combined employment points at 20 pts. Automatically capped at 20 pts to prevent EOI over-claiming refusal.",
    });
  }

  riskFlags.push({
    severity: "P3",
    code: "ENGLISH_TEST_2025_REFORM_CHECK",
    title_ko: "2025년 8·9월 개편 영어 성적표 기준 및 온라인 시험 불인정 유의",
    title_en: "Aug/Sep 2025 English Score Reforms & Strict Exclusion of Online Home Tests",
    detail_ko:
      "LIN 25/016 · LIN 25/082 개편으로 PTE Academic 영역별 기준(예: Competent L47/R48/W51/S54, Proficient L58/R59/W69/S76)이 달라졌으며, " +
      "IELTS Online · TOEFL Home Edition 등 모든 자택 온라인 시험은 호주 비자용으로 전면 인정되지 않아요.",
    detail_en:
      "Under LIN 25/016 and LIN 25/082, PTE Academic component thresholds changed (e.g., Competent L47/R48/W51/S54; Proficient L58/R59/W69/S76), " +
      "and all remote/at-home tests (IELTS Online, TOEFL Home Edition, etc.) are strictly invalid for Australian visas.",
  });

  const primaryPathways = [];
  const gsmEngOk = ["superior", "proficient", "competent"].includes(engT);
  const sponsorEngOk = ["superior", "proficient", "competent", "vocational_482"].includes(engT);
  const salOk = offeredSalaryInt === null || offeredSalaryInt >= thresholds.csit_aud;

  // 1. Partner Visa
  if (hasAuPartner) {
    const scLabel = location === "onshore" ? "820/801" : "309/100";
    const sched3Risk = location === "onshore" && currentVisa === "bridging_or_expired";
    primaryPathways.push({
      subclass: scLabel,
      name_ko: location === "onshore" ? "호주 내 파트너 영주권 트랙 (820 → 801)" : "해외 파트너 영주권 트랙 (309 → 100)",
      name_en: location === "onshore" ? "Onshore Partner PR Pathway (820 → 801)" : "Offshore Partner PR Pathway (309 → 100)",
      category: "family",
      score: !sched3Risk ? 93 : 84,
      readiness_tier: !sched3Risk ? "최우선 검토" : "조건부 전략 (Schedule 3 점검)",
      readiness_tier_en: !sched3Risk ? "Top Priority" : "Conditional (Schedule 3 Waiver Check)",
      direct_pr: true,
      employer_tied: false,
      vac_aud: vacMap["820_801"],
      vac_display: `$${fmtComma(vacMap["820_801"])}`,
      vac_display_en: `$${fmtComma(vacMap["820_801"])}`,
      processing_time: formatProcTime(procMap, location === "onshore" ? "820" : "309"),
      processing_time_en: formatProcTimeEn(procMap, location === "onshore" ? "820" : "309"),
      why_fit_ko:
        "직종 리스트(SOL)·연령·영어 점수 제한 없이 호주 시민권·영주권자 배우자/사실혼 관계의 진정성(4대 기둥 증빙)을 토대로 영주권까지 직결되는 가장 안정적인 가족 경로예요.",
      why_fit_en:
        "Leads directly to permanent residency based on a genuine married or de facto relationship with an Australian citizen/PR (Four Pillars evidence)—free from SOL occupation, age, or points hurdles.",
      key_requirements_ko: [
        "재정 · 주거 · 사회 · 상호 헌신의 4대 기둥(Four Pillars) 객관 증빙",
        "사실혼(De facto)의 경우 12개월 동거 입증 또는 주정부 관계등록(QLD/NSW/VIC 등)",
        "스폰서 신원조회 및 과거 파트너 스폰서십 이력 제한(평생 2회·5년 간격) 통과",
      ],
      key_requirements_en: [
        "Objective Four Pillars relationship evidence (financial, household, social, mutual commitment)",
        "For de facto partners: 12+ months cohabitation OR state civil relationship registration (QLD/NSW/VIC/SA/TAS/ACT)",
        "Sponsor character clearance & sponsorship cap check (lifetime max 2, 5-year spacing)",
      ],
      caveat_warning_en: null,
    });
  }

  // 2. Subclass 189
  if (occ && occSummary.eligible_189 && !ageOver45 && gsmEngOk && points.meets_gsm_65_189) {
    const ssCut = occSummary.skillselect_min_points_189 || 85;
    const competitive = points.base_points_189 >= ssCut;
    let tier189;
    let tier189En;
    let score189;
    if (s48OnshoreBar) {
      tier189 = "해외 출국 후 접수 필요 (s 48 제한)";
      tier189En = "Offshore Lodgement Required (s 48 Bar)";
      score189 = 68;
    } else {
      tier189 = competitive ? "최우선 검토" : "점수 보완 권장";
      tier189En = competitive ? "Top Priority" : "Points Boost Recommended";
      score189 = competitive ? 92 : 74;
    }

    const authStrKo = occSummary.assessing_authorities.map((a) => a.code).join(", ") || "해당 기관";
    const authStrEn = occSummary.assessing_authorities.map((a) => a.code).join(", ") || "Relevant Authority";

    primaryPathways.push({
      subclass: "189",
      name_ko: "독립기술이민 영주권 (Subclass 189 — Points-tested)",
      name_en: "Skilled Independent Visa (Subclass 189 — Direct PR)",
      category: "gsm",
      score: score189,
      readiness_tier: tier189,
      readiness_tier_en: tier189En,
      direct_pr: true,
      employer_tied: false,
      vac_aud: vacMap["189"],
      vac_display: `$${fmtComma(vacMap["189"])}`,
      vac_display_en: `$${fmtComma(vacMap["189"])}`,
      processing_time: formatProcTime(procMap, "189"),
      processing_time_en: formatProcTimeEn(procMap, "189"),
      why_fit_ko:
        `선택하신 ${occ.occupation} 직종이 MLTSSL에 등재되어 있고 현재 산출 점수가 ${points.base_points_189}점이에요 ` +
        `(최근 초청 참고선: 약 ${ssCut}점). 고용주나 거주 지역 제약 없이 즉시 영주권을 취득하는 최상위 경로예요.`,
      why_fit_en:
        `'${occ.occupation}' sits on the MLTSSL and your calculated Schedule 6D score is ${points.base_points_189} pts ` +
        `(recent SkillSelect benchmark: ~${ssCut} pts). Grants unrestricted direct permanent residency without employer or regional tie-in.`,
      key_requirements_ko: [
        `기술심사(${authStrKo}) 유효 승인 필수`,
        `SkillSelect EOI 점수 ${points.base_points_189}점 증빙 무결성 (초청 시점 만 45세 미만)`,
        "Competent 이상 공인 영어 성적 (유효기간 3년 이내)",
      ],
      key_requirements_en: [
        `Valid positive skills assessment (${authStrEn}) at time of invitation`,
        `Zero over-claiming across your ${points.base_points_189}-point SkillSelect EOI (under age 45 at invitation)`,
        "At least Competent English valid within 3 years of invitation",
      ],
      caveat_warning_en: null,
    });
  }

  // 3. Subclass 190
  if (occ && occSummary.eligible_190 && !ageOver45 && gsmEngOk && points.meets_gsm_65_190) {
    primaryPathways.push({
      subclass: "190",
      name_ko: "주정부 후원 기술이민 영주권 (Subclass 190 — +5점 가산)",
      name_en: "Skilled Nominated Visa (Subclass 190 — Direct PR, +5 Pts)",
      category: "gsm",
      score: points.points_190 >= 80 ? 90 : 79,
      readiness_tier: s48OnshoreBar ? "최우선 검토 (s 48 예외 가능)" : points.points_190 >= 80 ? "최우선 검토" : "유력 대안",
      readiness_tier_en: s48OnshoreBar ? "Top Priority (s 48 Exempt Onshore)" : points.points_190 >= 80 ? "Top Priority" : "Strong Contender",
      direct_pr: true,
      employer_tied: false,
      vac_aud: vacMap["190"],
      vac_display: `$${fmtComma(vacMap["190"])}`,
      vac_display_en: `$${fmtComma(vacMap["190"])}`,
      processing_time: formatProcTime(procMap, "190"),
      processing_time_en: formatProcTimeEn(procMap, "190"),
      why_fit_ko:
        `주정부 노미네이션(+5점) 합산 시 ${points.points_190}점이 되며, ` +
        `${!occSummary.eligible_189 ? "MLTSSL 미등재(STSOL) 직종에서도 " : ""}` +
        "고용주 종속 없이 곧바로 영주권(PR)을 받는 핵심 주정부 트랙이에요.",
      why_fit_en:
        `State nomination (+5 pts) brings your total to ${points.points_190} pts, unlocking direct permanent residency without employer tie-in` +
        `${!occSummary.eligible_189 ? "—even for STSOL occupations excluded from Subclass 189" : ""}.`,
      key_requirements_ko: [
        "각 주정부(QLD/NSW/VIC/SA/WA 등)별 거주·고용·우선 직군 ROI 선발 요건 충족",
        "기술심사 완료 및 Competent 영어 이상, 초청 시점 만 45세 미만",
        "호주 내 s 48 재접수 제한 상태에서도 주정부 노미네이션 확보 시 예외 접수 가능 대상 비자",
      ],
      key_requirements_en: [
        "Satisfy state/territory ROI criteria (residency, onshore employment, priority sector) in QLD, NSW, VIC, SA, WA, etc.",
        "Valid skills assessment, Competent+ English, and under age 45 at invitation",
        "Prescribed s 48 exempt visa—eligible for onshore lodgement upon state nomination even after a prior refusal",
      ],
      caveat_warning_en: null,
    });
  }

  // 4. Subclass 491
  if (occ && occSummary.eligible_491 && !ageOver45 && gsmEngOk && points.meets_gsm_65_491) {
    primaryPathways.push({
      subclass: "491",
      name_ko: "지방 주정부 가점 비자 → 영주권 (Subclass 491 → 191, +15점 가산)",
      name_en: "Skilled Work Regional → PR (Subclass 491 → 191, +15 Pts)",
      category: "gsm_regional",
      score: regionalWilling || points.points_190 < 85 || s48OnshoreBar ? 86 : 76,
      readiness_tier: s48OnshoreBar ? "최우선 검토 (s 48 예외 가능)" : regionalWilling ? "최우선 검토" : "유력 대안",
      readiness_tier_en: s48OnshoreBar ? "Top Priority (s 48 Exempt Onshore)" : regionalWilling ? "Top Priority" : "Strong Contender",
      direct_pr: false,
      employer_tied: false,
      vac_aud: vacMap["491"],
      vac_display: `$${fmtComma(vacMap["491"])} (추후 191 영주권 $${fmtComma(vacMap["191"])})`,
      vac_display_en: `$${fmtComma(vacMap["491"])} (+ $${fmtComma(vacMap["191"])} at Subclass 191 PR stage)`,
      processing_time: formatProcTime(procMap, "491"),
      processing_time_en: formatProcTimeEn(procMap, "491"),
      why_fit_ko:
        `+15점 가산으로 총 ${points.points_491}점을 확보할 수 있고, 골드코스트·퍼스·애들레이드·캔버라 등 지정 지방에서 ` +
        "3년간 거주하며 세금신고서(NOA) 3회분만 제출하면 별도 최저 연봉 하한선($0) 없이 191 영주권으로 전환돼요.",
      why_fit_en:
        `Adds +15 regional points for a total of ${points.points_491} pts. After 3 years living/working in a Designated Regional Area (incl. Gold Coast, Perth, Adelaide, Canberra) and 3 ATO Notices of Assessment, transitions to Subclass 191 PR with a $0 statutory minimum income floor.`,
      key_requirements_ko: [
        "지정 지방(Designated Regional Area — 시드니·멜버른·브리즈번 제외 전역) 거주·근무 조건 준수",
        "3년 보유 및 3개 과세연도 NOA 제출 후 Subclass 191($630) 영주권 전환",
      ],
      key_requirements_en: [
        "Comply with regional residence/work conditions across Australia outside Sydney, Melbourne, and Brisbane",
        "Hold 491 for 3 years + provide 3 ATO Notices of Assessment to transition to Subclass 191 PR ($630)",
      ],
      caveat_warning_en: null,
    });
  }

  // 5. Subclass 482 SID
  if (occ && occSummary.eligible_482 && sponsorEngOk) {
    const cav482 = (occ.caveats_by_subclass || {})["482"] || [];
    const cavEn = cav482.length ? cav482[0].description_en : null;
    const cavSumEn = cav482.length ? cav482[0].summary_en || cav482[0].title_en : null;
    const exp482Ok = totalEstYears >= 1.0;

    let tier482;
    let tier482En;
    let score482;
    if (s48OnshoreBar) {
      tier482 = "조건 보완 시 가능 (s 48 제한 — 출국 접수 검토)";
      tier482En = "Conditional (s 48 Bar — Offshore Lodgement Check)";
      score482 = 66;
    } else if (!salOk) {
      tier482 = `연봉 상향($${fmtComma(thresholds.csit_aud)}+) 또는 DAMA 필요`;
      tier482En = `Salary Adjustment ($${fmtComma(thresholds.csit_aud)}+) or DAMA Needed`;
      score482 = 64;
    } else if (!exp482Ok) {
      tier482 = "1년 경력 충족 후 가능";
      tier482En = "Eligible Once 1-Yr Experience Met";
      score482 = 68;
    } else if (hasSponsor || ageOver45) {
      tier482 = "최우선 검토";
      tier482En = "Top Priority";
      score482 = hasSponsor ? 91 : 84;
    } else {
      tier482 = "유력 대안";
      tier482En = "Strong Contender";
      score482 = 79;
    }

    const prBridgeNote = !ageOver45
      ? `2년 근무 후 만 45세 미만 186 TRT($${fmtComma(vacMap["186"])}) 전환`
      : `만 45세 이상 연령 상한이 없으며, 2년 근무 + 고소득 면제(FWHIT $${fmtComma(thresholds.fwhit_aud)}) 또는 지역 DAMA 연령 완화(만 50~55세)를 통해 186 영주권 연결`;
    const prBridgeNoteEn = !ageOver45
      ? `transitions to Subclass 186 TRT PR ($${fmtComma(vacMap["186"])}) after 2 years under age 45`
      : `has no upper age cap on 482 and bridges to 186 PR via the 2-year FWHIT ($${fmtComma(thresholds.fwhit_aud)}) high-income exemption or a regional DAMA age concession (under 50/55)`;

    primaryPathways.push({
      subclass: "482",
      name_ko: "고용주 스폰서 기술비자 → 영주권 (Subclass 482 SID → 186 TRT)",
      name_en: "Skills in Demand Employer Sponsored → PR (Subclass 482 SID → 186 TRT)",
      category: "employer_sponsored",
      score: score482,
      readiness_tier: tier482,
      readiness_tier_en: tier482En,
      direct_pr: false,
      employer_tied: true,
      vac_aud: vacMap["482"],
      vac_display: `$${fmtComma(vacMap["482"])} (고용주 SAF 연 $1,200/$1,800 별도)`,
      vac_display_en: `$${fmtComma(vacMap["482"])} (+ Employer SAF Levy $1,200/$1,800/yr)`,
      processing_time: formatProcTime(procMap, "482"),
      processing_time_en: formatProcTimeEn(procMap, "482"),
      why_fit_ko: `${occ.occupation} 직종은 CSOL(456개 직종)에 포함되어 최근 5년 내 1년 풀타임 경력만으로도 신청 가능하며, ${prBridgeNote}이 핵심 장점이에요.`,
      why_fit_en: `'${occ.occupation}' sits on the 456-occupation CSOL requiring just 1 year of full-time experience in the last 5 years, and ${prBridgeNoteEn}.`,
      key_requirements_ko: [
        `스폰서 연봉 FY2026–27 CSIT AUD $${fmtComma(thresholds.csit_aud)}+ (또는 SSIT $${fmtComma(thresholds.ssit_aud)}+ Specialist Stream)`,
        "최근 5년 내 관련 직종 최소 1년 풀타임(또는 비례 파트타임) 경력 및 노동시장 테스트(LMT)",
        "482 영어 기준 충족 (IELTS 5.0 / 개편 PTE L33·R36·W29·S24)",
        ...(cav482.length ? [`직종 Caveat 필수 통과: ${cav482[0].summary_ko}`] : []),
      ],
      key_requirements_en: [
        `Base salary meeting FY2026–27 CSIT AUD $${fmtComma(thresholds.csit_aud)}+ (or SSIT $${fmtComma(thresholds.ssit_aud)}+ Specialist Stream)`,
        "At least 1 year of full-time (or equivalent pro-rata part-time) experience in the last 5 years + Labour Market Testing (LMT)",
        "Subclass 482 English threshold (IELTS 5.0 each band / Revised PTE L33·R36·W29·S24)",
        ...(cavSumEn ? [`Must satisfy statutory caveat: ${cavSumEn}`] : []),
      ],
      caveat_warning_en: cavEn,
    });
  }

  // 6. Subclass 186 Direct Entry
  if (occ && occSummary.eligible_186_de && !ageOver45 && gsmEngOk && totalEstYears >= 3.0) {
    const cav186 = (occ.caveats_by_subclass || {})["186"] || [];
    const cav186SumEn = cav186.length ? cav186[0].summary_en || cav186[0].title_en : null;

    let tier186;
    let tier186En;
    let score186;
    if (s48OnshoreBar) {
      tier186 = "조건 보완 시 가능 (s 48 제한 — 출국 접수 검토)";
      tier186En = "Conditional (s 48 Bar — Offshore Lodgement Check)";
      score186 = 65;
    } else if (!salOk) {
      tier186 = `연봉 상향($${fmtComma(thresholds.csit_aud)}+) 필요`;
      tier186En = `Salary Adjustment ($${fmtComma(thresholds.csit_aud)}+) Needed`;
      score186 = 63;
    } else if (hasSponsor) {
      tier186 = "최우선 검토";
      tier186En = "Top Priority";
      score186 = 88;
    } else {
      tier186 = "유력 대안";
      tier186En = "Strong Contender";
      score186 = 75;
    }

    primaryPathways.push({
      subclass: "186",
      name_ko: "고용주 스폰서 즉시 영주권 (Subclass 186 Direct Entry)",
      name_en: "Employer Nomination Scheme Direct PR (Subclass 186 Direct Entry)",
      category: "employer_sponsored",
      score: score186,
      readiness_tier: tier186,
      readiness_tier_en: tier186En,
      direct_pr: true,
      employer_tied: true,
      vac_aud: vacMap["186"],
      vac_display: `$${fmtComma(vacMap["186"])} (고용주 SAF $3,000/$5,000 일시불 별도)`,
      vac_display_en: `$${fmtComma(vacMap["186"])} (+ Employer One-Off SAF $3,000/$5,000)`,
      processing_time: formatProcTime(procMap, "186"),
      processing_time_en: formatProcTimeEn(procMap, "186"),
      why_fit_ko:
        "관련 풀타임 경력 3년 이상 + 정식 기술심사를 갖추어 482 임시비자 단계 없이 곧바로 영주권을 취득하는 스폰서 직행 경로예요.",
      why_fit_en:
        "Bypasses temporary Subclass 482 residence—granting direct permanent residency when backed by 3+ years of full-time relevant experience and a full skills assessment.",
      key_requirements_ko: [
        `정식 기술심사 승인 + 풀타임 3년 경력 + 연봉 CSIT $${fmtComma(thresholds.csit_aud)} 이상`,
        "신청 시점 만 45세 미만 및 Competent 영어 성적",
        ...(cav186.length ? [`직종 Caveat 필수 통과: ${cav186[0].summary_ko}`] : []),
      ],
      key_requirements_en: [
        `Full positive skills assessment + 3 yrs full-time experience + salary at CSIT $${fmtComma(thresholds.csit_aud)}+`,
        "Under age 45 at time of application and Competent+ English",
        ...(cav186SumEn ? [`Must satisfy statutory caveat: ${cav186SumEn}`] : []),
      ],
      caveat_warning_en: cav186.length ? cav186[0].description_en : null,
    });
  }

  // 6b. Subclass 186 TRT
  if (
    currentVisa === "sponsored_482" &&
    (!ageOver45 || (offeredSalaryInt && offeredSalaryInt >= thresholds.fwhit_aud)) &&
    gsmEngOk
  ) {
    const cav186Trt = occ ? (occ.caveats_by_subclass || {})["186"] || [] : [];
    const cavTrtSumEn = cav186Trt.length ? cav186Trt[0].summary_en || cav186Trt[0].title_en : null;

    let tierTrt;
    let tierTrtEn;
    let scoreTrt;
    if (s48OnshoreBar) {
      tierTrt = "조건 보완 시 가능 (s 48 제한 — 출국 접수 검토)";
      tierTrtEn = "Conditional (s 48 Bar — Offshore Lodgement Check)";
      scoreTrt = 67;
    } else if (!salOk) {
      tierTrt = `연봉 상향($${fmtComma(thresholds.csit_aud)}+) 필요`;
      tierTrtEn = `Salary Adjustment ($${fmtComma(thresholds.csit_aud)}+) Needed`;
      scoreTrt = 65;
    } else {
      tierTrt = "최우선 검토";
      tierTrtEn = "Top Priority";
      scoreTrt = 92;
    }

    primaryPathways.push({
      subclass: "186-TRT",
      name_ko: "현 482 보유자 고용주 스폰서 영주권 전환 (Subclass 186 TRT — 2년 근무)",
      name_en: "Temporary Residence Transition PR for Current 482 Holders (Subclass 186 TRT — 2 Yrs)",
      category: "employer_sponsored",
      score: scoreTrt,
      readiness_tier: tierTrt,
      readiness_tier_en: tierTrtEn,
      direct_pr: true,
      employer_tied: true,
      vac_aud: vacMap["186"],
      vac_display: `$${fmtComma(vacMap["186"])} (고용주 SAF $3,000/$5,000 일시불 별도)`,
      vac_display_en: `$${fmtComma(vacMap["186"])} (+ Employer One-Off SAF $3,000/$5,000)`,
      processing_time: formatProcTime(procMap, "186"),
      processing_time_en: formatProcTimeEn(procMap, "186"),
      why_fit_ko:
        "현재 482 비자를 보유 중이시므로 직종이 CSOL/MLTSSL에 없더라도(구 STSOL·ROL 포함) 스폰서 고용주 소속 풀타임 2년 근무 요건 충족 시 186 TRT 영주권 전환이 가능해요.",
      why_fit_en:
        "As a current Subclass 482 holder, you can transition to Subclass 186 TRT permanent residency after 2 years of full-time sponsored work—even if your occupation sat on legacy STSOL/ROL lists.",
      key_requirements_ko: [
        `482 보유 상태에서 최근 3년 중 최소 2년 풀타임 근무 + 연봉 CSIT $${fmtComma(thresholds.csit_aud)} 이상`,
        `신청 시점 만 45세 미만 (또는 2년간 FWHIT $${fmtComma(thresholds.fwhit_aud)}+ 고소득 면제) 및 Competent 영어`,
        ...(cav186Trt.length ? [`직종 Caveat 점검: ${cav186Trt[0].summary_ko}`] : []),
      ],
      key_requirements_en: [
        `At least 2 years of full-time sponsored employment on Subclass 482 in the last 3 years + salary at CSIT $${fmtComma(thresholds.csit_aud)}+`,
        `Under age 45 at application (or 2-year FWHIT $${fmtComma(thresholds.fwhit_aud)}+ high-income exemption) and Competent+ English`,
        ...(cavTrtSumEn ? [`Check statutory caveat: ${cavTrtSumEn}`] : []),
      ],
      caveat_warning_en: cav186Trt.length ? cav186Trt[0].description_en : null,
    });
  }

  // 7. Regional DAMA
  if (
    occ &&
    occSummary.dama_count > 0 &&
    (ageOver45 || regionalWilling || !occSummary.eligible_482 || !salOk)
  ) {
    const dcon = occSummary.dama_concessions || {};
    const regionsPreview = (dcon.regions || []).slice(0, 5).join(", ");
    const maxAge = dcon.max_age ?? 55;
    primaryPathways.push({
      subclass: "482-DAMA",
      name_ko: `지역 DAMA 노동협약 특례 트랙 (${occSummary.dama_count}개 협약 지역 등재 → 186 PR)`,
      name_en: `Regional DAMA Labour Agreement Pathway (${occSummary.dama_count} Active Regions → 186 PR)`,
      category: "dama",
      score: ageOver45 || !occSummary.eligible_482 || !salOk ? 86 : 73,
      readiness_tier: "핵심 특례 대안",
      readiness_tier_en: "Key Concession Pathway",
      direct_pr: false,
      employer_tied: true,
      vac_aud: vacMap["482"],
      vac_display: `$${fmtComma(vacMap["482"])} (DAMA 협약 승인 후 접수)`,
      vac_display_en: `$${fmtComma(vacMap["482"])} (Lodged under approved DAMA Labour Agreement)`,
      processing_time: "DAR Endorsement + Labour Agreement 승인 후 482 수속",
      processing_time_en: "DAR Endorsement + Labour Agreement approval → 482 processing",
      why_fit_ko:
        `${occ.occupation} 직종은 현재 ${occSummary.dama_count}개 지역 DAMA(${regionsPreview})에 등재되어 있어 ` +
        `최대 만 ${maxAge}세 미만 연령 완화, 최소 연봉 90%($${fmtComma(thresholds.dama_concession_90pct_aud)}) 완화 및 186 영주권 전환 특례를 노릴 수 있어요.`,
      why_fit_en:
        `'${occ.occupation}' is listed across ${occSummary.dama_count} regional DAMAs (${regionsPreview}), unlocking age concessions up to under ${maxAge}, ` +
        `90% CSIT salary concessions ($${fmtComma(thresholds.dama_concession_90pct_aud)}), and structured Subclass 186 PR transition.`,
      key_requirements_ko: [
        "DAMA 지정 지방(예: WA 전체, SA, NT, FNQ 등) 소재 고용주의 DAR Endorsement 확보",
        `연령 상한 완화(최대 만 ${maxAge}세 미만) 및 영어 완화 조항 협약별 적용`,
      ],
      key_requirements_en: [
        "Secure Designated Area Representative (DAR) endorsement through a regional employer (e.g., WA statewide, SA, NT, FNQ)",
        `Age cap concession (up to under ${maxAge}) and English concessions per DAMA schedule`,
      ],
      caveat_warning_en: null,
    });
  }

  // 8. Subclass 858 NIV
  if (globalTalent) {
    primaryPathways.push({
      subclass: "858",
      name_ko: "국가혁신비자 즉시 영주권 (Subclass 858 — National Innovation Visa)",
      name_en: "National Innovation Visa Direct PR (Subclass 858 — Invitation Only)",
      category: "talent",
      score: 83,
      readiness_tier: "고급 특례 경로",
      readiness_tier_en: "Elite Invitation Pathway",
      direct_pr: true,
      employer_tied: false,
      vac_aud: vacMap["858"],
      vac_display: `$${fmtComma(vacMap["858"])}`,
      vac_display_en: `$${fmtComma(vacMap["858"])}`,
      processing_time: formatProcTime(procMap, "858"),
      processing_time_en: formatProcTimeEn(procMap, "858"),
      why_fit_ko:
        "폐지된 188 투자·사업이민(BIIP) 및 구 GTI를 대체한 최상위 인재 영주권으로, 국제적 연구·특허·창업·기술 업적이 뚜렷할 때 연령·SOL 제한을 넘어 EOI 초청 방식으로 즉시 영주권을 부여해요.",
      why_fit_en:
        "Replacing the closed Subclass 188 BIIP and former GTI, Subclass 858 grants direct PR by invitation for internationally recognised research, patents, deep-tech entrepreneurship, or elite achievements beyond standard age/SOL limits.",
      key_requirements_ko: [
        "이민성 초청(Invitation Only — EOI 선접수 필수) 및 동일 분야 호주 권위자/기관 추천(Form 1000)",
        `국제적 성취 입증 및 통상 FWHIT($${fmtComma(thresholds.fwhit_aud)}) 수준의 고소득 잠재력 소명`,
      ],
      key_requirements_en: [
        "Departmental Invitation following EOI submission + Form 1000 nomination by an Australian peak body or authority",
        `Internationally recognised achievement record and high-earning capacity benchmarked against FWHIT ($${fmtComma(thresholds.fwhit_aud)})`,
      ],
      caveat_warning_en: null,
    });
  }

  primaryPathways.sort((a, b) => b.score - a.score);

  let alternativeComparison = null;
  if (primaryPathways.length >= 2) {
    const [p1, p2] = primaryPathways;
    alternativeComparison = {
      primary_title: `1순위: ${p1.subclass} — ${p1.name_ko}`,
      primary_title_en: `#1 Primary: ${p1.subclass} — ${p1.name_en}`,
      secondary_title: `2순위 대안: ${p2.subclass} — ${p2.name_ko}`,
      secondary_title_en: `#2 Alternative: ${p2.subclass} — ${p2.name_en}`,
      rows: [
        {
          dimension_ko: "영주권 직결성",
          dimension_en: "PR Structure",
          option_1: p1.direct_pr ? "즉시 영주권 (Direct PR)" : "임시비자 후 영주권 전환 (2단계)",
          option_1_en: p1.direct_pr ? "Direct Permanent Residence" : "2-Stage Provisional → PR Transition",
          option_2: p2.direct_pr ? "즉시 영주권 (Direct PR)" : "임시비자 후 영주권 전환 (2단계)",
          option_2_en: p2.direct_pr ? "Direct Permanent Residence" : "2-Stage Provisional → PR Transition",
        },
        {
          dimension_ko: "고용주 종속성",
          dimension_en: "Employer Tie-In",
          option_1: p1.employer_tied ? "고용주 스폰서십 필수 (이직 제약 주의)" : "독립/주정부·가족 기반 (고용주 비종속)",
          option_1_en: p1.employer_tied ? "Employer Sponsorship Required (Mobility Conditions)" : "Independent / State / Family (No Employer Tie)",
          option_2: p2.employer_tied ? "고용주 스폰서십 필수 (이직 제약 주의)" : "독립/주정부·가족 기반 (고용주 비종속)",
          option_2_en: p2.employer_tied ? "Employer Sponsorship Required (Mobility Conditions)" : "Independent / State / Family (No Employer Tie)",
        },
        {
          dimension_ko: "기본 비자비 (FY26–27)",
          dimension_en: "Base VAC (FY26–27)",
          option_1: p1.vac_display,
          option_1_en: p1.vac_display_en,
          option_2: p2.vac_display,
          option_2_en: p2.vac_display_en,
        },
        {
          dimension_ko: "공식 수속 기간",
          dimension_en: "Official Processing Time",
          option_1: p1.processing_time,
          option_1_en: p1.processing_time_en,
          option_2: p2.processing_time,
          option_2_en: p2.processing_time_en,
        },
        {
          dimension_ko: "전략적 트레이드오프",
          dimension_en: "Strategic Readiness",
          option_1: p1.readiness_tier,
          option_1_en: p1.readiness_tier_en,
          option_2: p2.readiness_tier,
          option_2_en: p2.readiness_tier_en,
        },
      ],
    };
  }

  const rawOther = pathwaysCatalog.non_skilled_and_remote_visas || [];
  const prioritizedOther = rawOther.map((item) => {
    const highlighted = Boolean(
      (item.id === "partner_820_309_300" && hasAuPartner) ||
        (item.id === "niv_858" && globalTalent) ||
        (item.id === "parent_143_864_870_103" && parentFlag) ||
        (item.id === "art_s48_ministerial_351" && (priorRefusal || s57Or4020))
    );
    return { ...item, highlighted_for_user: highlighted };
  });
  prioritizedOther.sort((a, b) => (a.highlighted_for_user ? 0 : 1) - (b.highlighted_for_user ? 0 : 1));

  const desiredVideoIds = [];
  if (s57Or4020) desiredVideoIds.push("0__kDkczXRQ", "9zzTLmsYgk0", "JAt7RAr23A0");
  if (priorRefusal) desiredVideoIds.push("iCCeOYY5xvU", "97_8T6HcOOM", "zVvzficFWqk", "D2NtNOVuYtU");
  if (healthChar) desiredVideoIds.push("aLduugn-xiM", "Qd2JyrgRy3U");
  if (ageOver45) desiredVideoIds.push("qiP4zUdte-8", "OlvZDKi7acE", "ip89VQvzfZo");
  if (hasAuPartner) desiredVideoIds.push("kDXXvizNzpE", "TbQZLg0_M58", "_Yv2TxWS6Ck");
  if (globalTalent) desiredVideoIds.push("001RxckT6Z8");
  if (parentFlag) desiredVideoIds.push("vCSWCYA41n4", "jTWsopjUZmM");
  if (occ) {
    const c6 = occ.anzsco_code_primary;
    if (["351311", "351411", "141111"].includes(c6)) {
      desiredVideoIds.push("BMlkALM76Ew", "9JnafnJXvVw", "ryXR66hwnT8");
    } else if (c6.startsWith("26")) {
      desiredVideoIds.push("Wj68rWMAoVg", "m9xW3ZZXGQw", "pCCd_vz5OZo");
    } else if (c6.startsWith("2544") || ["241111", "423111"].includes(c6)) {
      desiredVideoIds.push("TqFGiMB8_HU", "URZ6deNp0Cc");
    } else if (c6.startsWith("3")) {
      desiredVideoIds.push("ZZNPJFbTj80", "1ovHqId4aJQ", "LfU9ynXRWH4");
    }
  }
  desiredVideoIds.push("Bu4AUSoyNic", "ccD4FE3bmOg", "m9xW3ZZXGQw", "jTWsopjUZmM", "vCSWCYA41n4");

  const vidById = new Map((youtubeCatalog.videos || []).map((v) => [v.id, v]));
  const recommendedVideos = [];
  const seenVids = new Set();
  for (const vid of desiredVideoIds) {
    if (vidById.has(vid) && !seenVids.has(vid)) {
      seenVids.add(vid);
      recommendedVideos.push(vidById.get(vid));
    }
    if (recommendedVideos.length >= 6) break;
  }

  const svcById = new Map((pathwaysCatalog.parkco_services || []).map((s) => [s.id, s]));
  const recServiceIds = [];
  if (s57Or4020) recServiceIds.push("visa_emergency");
  if (priorRefusal) recServiceIds.push("art_case_review");
  if (primaryPathways.some((p) => p.category === "gsm" || p.category === "gsm_regional")) {
    recServiceIds.push("gsm_case_review");
  }
  recServiceIds.push("strategy_consultation");
  for (const fb of ["gsm_case_review", "visa_emergency", "art_case_review"]) {
    if (!recServiceIds.includes(fb)) recServiceIds.push(fb);
  }
  const recommendedServices = recServiceIds.filter((sid) => svcById.has(sid)).map((sid) => svcById.get(sid));

  const p1P2Flags = riskFlags.filter((f) => f.severity === "P1" || f.severity === "P2");
  let conceptSummaryKo;
  let conceptSummaryEn;
  if (primaryPathways.length) {
    const topP = primaryPathways[0];
    conceptSummaryKo =
      "호주 이민은 '임시 체류/경력 확보 → 직종·기술심사·영어 검증 → 영주권(PR) 전환'의 단계별 설계가 핵심이에요. " +
      `현재 프로필에서는 [${topP.name_ko}] 경로가 1순위로 분석되었으며, 총 ${p1P2Flags.length}건의 핵심 법령 체크포인트가 확인되었어요.`;
    conceptSummaryEn =
      "Australian migration succeeds through structured stage-by-stage planning: Temporary Stay & Experience → ANZSCO / Skills / English Verification → Permanent Residence (PR). " +
      `Based on your profile, [${topP.name_en}] ranks #1, with ${p1P2Flags.length} statutory checkpoint(s) flagged for review.`;
  } else {
    conceptSummaryKo =
      "현재 입력 조건에서는 일반 점수제·표준 스폰서 비자 요건에 직종·연령·영어 허들이 존재해요. " +
      "지역 DAMA 노동협약, 파트너·가족 비자, 또는 경력·영어 보완 후 재설계 전략을 변호사와 함께 점검하시는 것을 권장해요.";
    conceptSummaryEn =
      "Under your current inputs, standard points-tested GSM and Core sponsorship pathways face occupation, age, or English hurdles. " +
      "We recommend reviewing Regional DAMA concessions, Partner/Family pathways, or a staged experience/English roadmap with an Accredited Specialist.";
  }

  const rawName = String(payload.applicant_name || "").trim();
  const applicantName = rawName || "상담 신청자";
  const applicantNameEn = rawName || "Prospective Client";

  const occLabel = occ
    ? occ.title_ko === occ.occupation
      ? occ.occupation
      : `${occ.title_ko} (${occ.occupation})`
    : "";
  const occLine = occ
    ? `${occLabel}, ANZSCO ${occ.anzsco_code_primary}, 리스트: ${occLists.join("/")}`
    : "직종 미선택 (비숙련·가족·기타 경로 포함 검토)";
  const occLineEn = occ
    ? `${occ.occupation} (ANZSCO ${occ.anzsco_code_primary}, Lists: ${occLists.join("/")})`
    : "Not Selected (Assessing Family / Special / Alternative Pathways)";

  const topRoutesLine = primaryPathways.length
    ? primaryPathways
        .slice(0, 3)
        .map((p) => `${p.subclass} (${p.readiness_tier})`)
        .join(", ")
    : "맞춤 특례/대안 경로 상담 요청";
  const topRoutesLineEn = primaryPathways.length
    ? primaryPathways
        .slice(0, 3)
        .map((p) => `${p.subclass} (${p.readiness_tier_en})`)
        .join(", ")
    : "Tailored Concession / Alternative Pathway Strategy Requested";

  const flagSubset = p1P2Flags.length ? p1P2Flags : riskFlags.slice(0, 2);
  const flagsLine = riskFlags.length
    ? flagSubset.map((f) => `[${f.severity}] ${f.title_ko}`).join(" / ")
    : "특이 리스크 없음";
  const flagsLineEn = riskFlags.length
    ? flagSubset.map((f) => `[${f.severity}] ${f.title_en}`).join(" / ")
    : "No critical statutory flags";

  const userNotes = String(payload.notes || "").trim();
  const subjectKo = `[박앤코 비자 진단 상담 요청] ${applicantName} — ${occ ? occ.occupation : "호주 비자 전략"}`;
  const subjectEn = `[Park & Co Visa Strategy Consultation] ${applicantNameEn} — ${occ ? occ.occupation : "Australian Visa Roadmap"}`;

  const bodyKo = [
    "안녕하세요, 법무법인 박앤코(Park & Co Lawyers) 박창민 대표변호사님 팀 앞 상담 문의드립니다.",
    "",
    "■ 신청자 기본 프로필 (비자 솔루션 가이드 진단 요약)",
    `- 성함/호칭: ${applicantName}`,
    `- 현재 위치 / 체류 비자: ${location === "onshore" ? "호주 내 (Onshore)" : "해외 (Offshore)"} / ${currentVisa}`,
    `- 연령대 / 영어 수준: ${AGE_LABELS_KO[ageB] ?? ageB} / ${ENGLISH_LABELS_KO[engT] ?? engT}`,
    `- 진단 직종(ANZSCO): ${occLine}`,
    `- 산출 기술이민 점수(Schedule 6D): 189 기준 ${points.base_points_189}점 · 190 기준 ${points.points_190}점 · 491 기준 ${points.points_491}점`,
    `- 고용주 스폰서 / 제안 연봉: ${hasSponsor ? "보유" : "미보유"} / ${offeredSalaryInt ? `AUD $${fmtComma(offeredSalaryInt)}` : "미정"}`,
    "",
    "■ 시스템 분석 유력 패스웨이 & 법령 리스크",
    `- 유력 패스웨이: ${topRoutesLine}`,
    `- 주요 점검 리스크: ${flagsLine}`,
    ...(userNotes ? ["", `■ 추가 문의사항:\n${userNotes}`] : []),
    "",
    "위 진단 브리프를 바탕으로 정확한 법률 검토 및 상담 일정 안내를 부탁드립니다.",
    `공식 문의·상담 링크: ${OFFICIAL_INQUIRY_URL}`,
  ].join("\n");

  const bodyEn = [
    "Dear Chang Min Park (Legal Practitioner Director · Accredited Specialist in Immigration Law — QLS) & Park & Co Lawyers Team,",
    "",
    "■ Applicant Profile (Park & Co Australian Visa Solution Guide Diagnostic Brief)",
    `- Name: ${applicantNameEn}`,
    `- Location / Current Visa: ${location === "onshore" ? "Onshore (Australia)" : "Offshore (Outside Australia)"} / ${currentVisa}`,
    `- Age Bracket / English Tier: ${AGE_LABELS_EN[ageB] ?? ageB} / ${ENGLISH_LABELS_EN[engT] ?? engT}`,
    `- Target Occupation (ANZSCO): ${occLineEn}`,
    `- Schedule 6D Points: Subclass 189 = ${points.base_points_189} pts · 190 = ${points.points_190} pts · 491 = ${points.points_491} pts`,
    `- Employer Sponsor / Offered Salary: ${hasSponsor ? "Yes" : "No"} / ${offeredSalaryInt ? `AUD $${fmtComma(offeredSalaryInt)}` : "TBD"}`,
    "",
    "■ Ranked Pathways & Statutory Risk Checkpoints",
    `- Top Ranked Pathways: ${topRoutesLineEn}`,
    `- Key Statutory Checkpoints: ${flagsLineEn}`,
    ...(userNotes ? ["", `■ Additional Notes:\n${userNotes}`] : []),
    "",
    "Please review this diagnostic brief and advise on booking a 1:1 legal strategy consultation.",
    `Official Inquiry Link: ${OFFICIAL_INQUIRY_URL_EN}`,
  ].join("\n");

  return {
    concept_summary_ko: conceptSummaryKo,
    concept_summary_en: conceptSummaryEn,
    gsm_points_breakdown: points,
    occupation_summary: occSummary,
    risk_flags: riskFlags,
    primary_pathways: primaryPathways,
    alternative_comparison: alternativeComparison,
    other_and_remote_options: prioritizedOther,
    recommended_videos: recommendedVideos,
    recommended_parkco_services: recommendedServices,
    consultation_brief: {
      inquiry_url: OFFICIAL_INQUIRY_URL,
      inquiry_url_en: OFFICIAL_INQUIRY_URL_EN,
      booking_url: OFFICIAL_BOOKING_URL,
      booking_url_en: OFFICIAL_BOOKING_URL_EN,
      subject_ko: subjectKo,
      subject_en: subjectEn,
      body_ko: bodyKo,
      body_en: bodyEn,
    },
  };
}
