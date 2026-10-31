export const CSIT_FY26_27_AUD = 79423;
export const DAMA_CSIT_90_AUD = 71481;
export const SSIT_FY26_27_AUD = 146576;
export const FWHIT_FY26_27_AUD = 190100;
export const AMSR_EXEMPTION_AUD = 250000;
export const ART_MIGRATION_FEE_AUD = 3727;
export const ART_HARDSHIP_FEE_AUD = 1863.5;
export const CITIZENSHIP_CONFERRAL_FEE_AUD = 595;

const REG_212_S48_EXEMPT_SUBCLASSES = new Set([
  "820",
  "801",
  "190",
  "491",
  "494",
  "444",
  "010",
  "020",
  "030",
  "050",
  "602",
  "802",
]);

export class CalculatorValidationError extends Error {
  constructor(messageKo, messageEn) {
    super(messageEn);
    this.name = "CalculatorValidationError";
    this.messageKo = messageKo;
    this.messageEn = messageEn;
  }

  getMessage(lang = "ko") {
    return String(lang || "").toLowerCase().startsWith("en") ? this.messageEn : this.messageKo;
  }
}

function parseIsoDate(raw, fallbackIso) {
  const s = String(raw || "").trim().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d) {
      return dt;
    }
  }
  const [fy, fm, fd] = fallbackIso.split("-").map(Number);
  return new Date(Date.UTC(fy, fm - 1, fd));
}

function fmtIso(dt) {
  return dt.toISOString().slice(0, 10);
}

function addDays(dt, days) {
  return new Date(dt.getTime() + days * 86400000);
}

function addWorkingDays(startDt, workingDays) {
  let cur = new Date(startDt.getTime());
  let added = 0;
  while (added < workingDays) {
    cur = addDays(cur, 1);
    const wd = cur.getUTCDay(); // 0 Sun .. 6 Sat
    if (wd >= 1 && wd <= 5) {
      added += 1;
    }
  }
  return cur;
}

function shiftYears(dt, deltaYears, leapForward = false) {
  const y = dt.getUTCFullYear() + deltaYears;
  const m = dt.getUTCMonth();
  const d = dt.getUTCDate();
  if (m === 1 && d === 29) {
    const test = new Date(Date.UTC(y, 1, 29));
    if (test.getUTCMonth() !== 1) {
      return leapForward ? new Date(Date.UTC(y, 2, 1)) : new Date(Date.UTC(y, 1, 28));
    }
  }
  return new Date(Date.UTC(y, m, d));
}

function fmtComma(num, decimals = 0) {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function evaluateAuCalculator(calculator, params = {}) {
  const calc = String(calculator || "").trim();
  const p = params && typeof params === "object" ? params : {};

  if (calc === "art_and_s501_deadline") {
    const dtype = String(p.decision_type || "general_refusal_onshore").trim();
    const notif = parseIsoDate(p.notification_date, "2026-10-30");
    const notifIso = fmtIso(notif);

    if (dtype === "general_refusal_onshore") {
      const deadlineIso = fmtIso(addDays(notif, 28));
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 s 347(3)(b), s 347(5); Migration Regulations 1994 reg 4.13",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        period_label_ko: "통지일 다음 날부터 28일 (역일 기준 · 연장 절대 불가)",
        period_label_en: "28 calendar days after notification day (strictly non-extendable per s 347(5))",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: null,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `일반 비자·노미네이션 거절 ART 재심 청구 마감일은 ${deadlineIso}이에요. ` +
          `s 347(5)에 따라 단 1분도 기한 연장이 불가능하며, 기본 접수비는 A$${fmtComma(ART_MIGRATION_FEE_AUD)}(경제적 곤궁 감액 시 A$${fmtComma(ART_HARDSHIP_FEE_AUD, 2)}, 승소·환송 시 50% 환급)예요.`,
        verdict_en:
          `Your non-extendable ART merits review deadline is ${deadlineIso} under s 347(3)(b). ` +
          `Section 347(5) excludes any extension of time; the FY2026–27 fee is A$${fmtComma(ART_MIGRATION_FEE_AUD)} (50% financial hardship reduction A$${fmtComma(ART_HARDSHIP_FEE_AUD, 2)}; 50% refunded on set-aside/remittal).`,
      };
    }

    if (dtype === "student_500_refusal_onshore") {
      const deadlineIso = fmtIso(addDays(notif, 28));
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 ss 347(3)(b), 367C–367H; Migration Regulations 1994 regs 4.18–4.20",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        period_label_ko: "28일 불변기한 + ART 구두심리 없는 서면심리(Review on the Papers) 대상",
        period_label_en: "28 calendar days (non-extendable) + Mandatory Review on the Papers (reg 4.18)",
        extendable: false,
        on_the_papers_s367c: true,
        decision_clock_days: null,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `학생비자(Subclass 500) 거절 ART 재심 마감일은 ${deadlineIso}이에요. ` +
          "개정법(s 367C · reg 4.18)에 따라 구두 청문회(Hearing) 없이 서면심리로 결정되므로, 현행 CoE 재학 증빙(reg 4.18(4))과 서면 변론서(s 367F 28일 / s 367G 14일)가 승패를 좌우해요.",
        verdict_en:
          `Your Subclass 500 ART filing deadline is ${deadlineIso}. ` +
          "Under s 367C and reg 4.18, Student Visa refusals are decided on the papers without an oral hearing—current CoE enrolment evidence (reg 4.18(4)) and written submissions (28d under s 367F / 14d under s 367G) are decisive.",
      };
    }

    if (dtype === "detention_refusal") {
      const deadlineIso = fmtIso(addDays(notif, 14));
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 s 347(3)(a), s 347(5); reg 4.17 (7 working days ART bridging decision clock)",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        period_label_ko: "이민구금 중 통지 시 14일 이내 접수 (연장 불가 · 브릿징 재심은 ART 7영업일 내 결정)",
        period_label_en: "14 calendar days if in immigration detention on notification day (s 347(3)(a))",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: 7,
        filing_fee_aud: 0,
        hardship_fee_aud: 0,
        verdict_ko:
          `이민구금(Detention) 상태에서 통지받은 결정의 ART 접수 마감일은 ${deadlineIso}(s 347(3)(a) 14일 불변기한)이에요. ` +
          "브릿징 비자 거절 재심(s 338(4))은 수수료가 면제되며 ART가 접수 후 7영업일(reg 4.17) 이내에 결정해야 해요.",
        verdict_en:
          `For applicants in immigration detention on the notification day, the non-extendable ART filing deadline is ${deadlineIso} (14 days under s 347(3)(a)). ` +
          "Bridging visa detention reviews (s 338(4)) carry $0 fee and a 7-working-day ART decision clock (reg 4.17).",
      };
    }

    if (dtype === "s501_delegate_onshore") {
      const deadlineIso = fmtIso(addDays(notif, 9));
      const eightyFourIso = fmtIso(addDays(notif, 84));
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 ss 500(6B), 500(6H)–(6J), 500(6L); Ministerial Direction No. 123 (eff. 31 Oct 2026)",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        period_label_ko: "9일 초단기 불변기한 (84일 내 ART 미결정 시 자동 기각 간주!)",
        period_label_en: "9 calendar days strict (s 500(6B)) + 84-day deemed-affirmation clock (s 500(6L))",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: 84,
        deemed_affirm_date: eightyFourIso,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `호주 내 s 501 거절·취소 또는 s 501CA(4) 불취소 결정의 ART 접수 마감일은 ${deadlineIso}(단 9일!)이에요. ` +
          `심리 2영업일 전 증거제출 차단 규칙(s 500(6H)–(6J))과 ${eightyFourIso} 84일 자동 기각 간주(s 500(6L)), 그리고 Direction No. 123 기준을 즉시 적용해야 해요.`,
        verdict_en:
          `Expedited onshore s 501 / s 501CA(4) ART review must be lodged by ${deadlineIso} (strictly 9 days under s 500(6B)). ` +
          `Note the strict 2-business-day pre-hearing evidence lockout (s 500(6H)–(6J)), the 84-day deemed-affirmation deadline (${eightyFourIso}, s 500(6L)), and Ministerial Direction No. 123.`,
      };
    }

    if (dtype === "s501ca_mandatory_cancel") {
      const deadlineIso = fmtIso(addDays(notif, 28));
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 ss 501(3A), 501CA(3)–(4); Migration Regulations 1994 reg 2.52; Direction No. 123",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        period_label_ko: "s 501(3A) 의무취소 철회 청구(Revocation) 28일 불변기한",
        period_label_en: "28 calendar days strict for s 501CA revocation representations (reg 2.52)",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: null,
        filing_fee_aud: 0,
        hardship_fee_aud: 0,
        verdict_ko:
          `12개월 이상 징역형 선고에 따른 s 501(3A) 의무적 비자 취소 철회 청구(Representations) 마감일은 ${deadlineIso}이에요. ` +
          "하루라도 넘기면 장관/위임관조차 철회 심사 권한을 상실하므로 Direction No. 123(공동체 보호·가족·호주 유대) 소명서를 기한 내 제출해야 해요.",
        verdict_en:
          `Mandatory s 501(3A) cancellation revocation representations under s 501CA must be lodged by ${deadlineIso} (28 days under reg 2.52; zero extension power). ` +
          "Address all primary and other considerations under Ministerial Direction No. 123.",
      };
    }

    if (dtype === "noicc_s116_onshore") {
      const dl = addWorkingDays(notif, 5);
      const ext = addWorkingDays(dl, 5);
      const deadlineIso = fmtIso(dl);
      const extIso = fmtIso(ext);
      return {
        calculator: calc,
        decision_type: dtype,
        statutory_basis: "Migration Act 1958 ss 116, 119, 121; Migration Regulations 1994 reg 2.44(2)(a), (3)",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        extended_deadline_date: extIso,
        period_label_ko: "호주 내 s 116 취소예고(NOICC) 5영업일 (만료 전 신청 시 +5영업일 1회 연장 가능)",
        period_label_en: "5 working days onshore under reg 2.44(2)(a) (extendable once by +5 working days under reg 2.44(3))",
        extendable: true,
        on_the_papers_s367c: false,
        decision_clock_days: null,
        filing_fee_aud: 0,
        hardship_fee_aud: 0,
        verdict_ko:
          `호주 내 s 116 비자 취소 예고 통지(NOICC) 1차 답변 기한은 ${deadlineIso}(5영업일, 주말 제외·공휴일 별도 확인)이에요. ` +
          `기한 도과 전 연장 요청 시 reg 2.44(3)에 따라 최대 ${extIso}(+5영업일)까지 연장할 수 있어요(단, 공항 입국심사장 reg 2.46 통지는 5분 즉시 소명).`,
        verdict_en:
          `Onshore s 116 NOICC response is due by ${deadlineIso} (5 working days under reg 2.44(2)(a), excluding weekends; verify state/ACT public holidays). ` +
          `Before expiry, one 5-working-day extension to ${extIso} may be requested under reg 2.44(3) (note: airport clearance cancellation under reg 2.46 allows only 5 minutes).`,
      };
    }

    throw new CalculatorValidationError(
      `지원하지 않는 결정 유형이에요: ${dtype}`,
      `Unsupported decision_type: ${dtype}`
    );
  }

  if (calc === "s48_and_schedule3_check") {
    const onshore = p.onshore !== undefined ? Boolean(p.onshore) : true;
    const holdsSub = Boolean(p.holds_substantive_visa);
    const priorRef = p.refused_or_cancelled_since_last_entry !== undefined ? Boolean(p.refused_or_cancelled_since_last_entry) : true;
    const daysUnsub = Math.max(0, parseInt(p.days_since_last_substantive_visa || 0, 10) || 0);
    const target = String(p.target_subclass || "820").trim();
    const compelling = Boolean(p.has_compelling_reasons);

    const s48Applies = onshore && !holdsSub && priorRef;
    const exempt = REG_212_S48_EXEMPT_SUBCLASSES.has(target);
    const onshoreAllowed = !onshore || !s48Applies || exempt;

    const sch3Triggered = onshore && !holdsSub && (target === "820" || target === "482" || target === "500");
    let sch3Crit = "none";
    if (sch3Triggered) {
      if (daysUnsub <= 28) sch3Crit = "3001_within_28d";
      else if (target === "820") sch3Crit = "3001_expired_waensila_waiver_needed";
      else sch3Crit = "schedule3_hard_block";
    }

    let vKo;
    let vEn;
    if (!onshore) {
      vKo = "해외(Offshore) 체류 중에는 s 48 재접수 금지와 Schedule 3가 적용되지 않아요(단, 과거 취소·불법체류에 따른 PIC 4013/4014 입국 제한 기간은 별도 확인 필요).";
      vEn = "Outside Australia (offshore), neither s 48 nor Schedule 3 applies (verify PIC 4013/4014 exclusion periods separately if previously cancelled or unlawful).";
    } else if (!onshoreAllowed) {
      vKo =
        `호주 내 실질 비자 미보유 + 거절/취소 이력으로 Migration Act s 48이 발동되어 Subclass ${target} 호주 내 접수가 법적으로 무효(Invalid) 처리돼요. ` +
        "reg 2.12 예외 비자(190 · 491 · 494 · 파트너 820)로 전환하거나 BVB 확보 후 해외 접수 전략을 세워야 해요.";
      vEn =
        `Section 48 bars onshore lodgement of Subclass ${target} because you hold no substantive visa and had a refusal/cancellation since last entry. ` +
        "Consider reg 2.12 exempt visas (190, 491, 494, Partner 820) or offshore lodgement with careful Bridging Visa travel planning.";
    } else if (sch3Crit === "3001_expired_waensila_waiver_needed") {
      vKo =
        `Subclass 820은 reg 2.12 예외로 s 48에도 불구하고 호주 내 접수가 가능하지만, 마지막 실질 비자 만료 후 ${daysUnsub}일(>28일)이 지나 Schedule 3(Criterion 3001)가 발동돼요. ` +
        `Waensila [2016] FCAFC 32 판례에 따라 심사 결정 시점 기준 '강력하고 연민할 만한 사유(Compelling Reasons)' 면제 입증이 ${compelling ? "유력해요" : "필수예요"}.`;
      vEn =
        `Subclass 820 is exempt from s 48 under reg 2.12, but ${daysUnsub} days (>28d) without a substantive visa triggers Schedule 3 (Criterion 3001). ` +
        `Under Waensila [2016] FCAFC 32, establishing compelling reasons for a Schedule 3 waiver is ${compelling ? "viable with strong evidence" : "mandatory to avoid refusal"}.`;
    } else {
      vKo =
        `Subclass ${target} 호주 내 접수가 법적으로 가능해요` +
        (s48Applies ? " (reg 2.12 s 48 예외 비자 적용 · 주정부 노미네이션 전 BVB 출국 여부 주의)." : ".");
      vEn =
        `Onshore lodgement of Subclass ${target} is legally permitted` +
        (s48Applies ? " via reg 2.12 exemption to s 48." : ".");
    }

    return {
      calculator: calc,
      statutory_basis: "Migration Act 1958 s 48; Migration Regulations 1994 reg 2.12, Schedule 3 (3001/3003/3004); Waensila [2016] FCAFC 32",
      target_subclass: target,
      s48_applies: s48Applies,
      reg_212_exempt: exempt,
      onshore_lodgement_allowed: onshoreAllowed,
      schedule3_triggered: sch3Triggered,
      schedule3_criterion: sch3Crit,
      verdict_ko: vKo,
      verdict_en: vEn,
    };
  }

  if (calc === "citizenship_s22_residence") {
    const stream = String(p.applicant_stream || "standard_pr").trim();
    const lawfulDt = parseIsoDate(p.lawful_start_date, "2022-07-01");
    const prDt = parseIsoDate(p.pr_grant_date, "2025-07-01");
    const appDt = parseIsoDate(p.application_date, "2026-10-30");
    const abs4y = Math.max(0, parseInt(p.absent_days_4yr || 0, 10) || 0);
    const abs12m = Math.max(0, parseInt(p.absent_days_last_12m || 0, 10) || 0);

    let deemedPr = prDt;
    if (stream === "nz_scv_444") {
      const july2022 = parseIsoDate("2022-07-01", "2022-07-01");
      deemedPr = lawfulDt.getTime() <= july2022.getTime() ? july2022 : lawfulDt;
    }

    const fourYrAnchor = shiftYears(appDt, -4, false);
    const oneYrAnchor = shiftYears(appDt, -1, false);
    const fourYrOk = lawfulDt.getTime() <= fourYrAnchor.getTime();
    const pr12mOk = deemedPr.getTime() <= oneYrAnchor.getTime();
    const abs4yOk = abs4y <= 365;
    const abs12mOk = abs12m <= 90;
    const eligible = fourYrOk && pr12mOk && abs4yOk && abs12mOk;

    const earliest4y = shiftYears(lawfulDt, 4, true);
    const earliestPr = shiftYears(deemedPr, 1, true);
    const earliestDate = earliest4y.getTime() >= earliestPr.getTime() ? earliest4y : earliestPr;

    const appIso = fmtIso(appDt);
    const deemedIso = fmtIso(deemedPr);
    const earliestIso = fmtIso(earliestDate);

    return {
      calculator: calc,
      statutory_basis: "Australian Citizenship Act 2007 (Cth) s 22; LIN 22/103 & CPI 20 (Subclass 444 NZ Pathway)",
      applicant_stream: stream,
      deemed_pr_date: deemedIso,
      earliest_residence_date: earliestIso,
      four_year_lawful_met: fourYrOk,
      twelve_month_pr_met: pr12mOk,
      absence_4yr_met: abs4yOk,
      absence_12m_met: abs12mOk,
      eligible,
      application_fee_aud: CITIZENSHIP_CONFERRAL_FEE_AUD,
      verdict_ko: eligible
        ? `${appIso} 기준 시민권 일반 거주요건(s 22)을 모두 충족해요! (간주 영주권 시작일 ${deemedIso} · 최근 4년 해외체류 ${abs4y}/365일 · 최근 12개월 ${abs12m}/90일 · 접수비 A$${CITIZENSHIP_CONFERRAL_FEE_AUD}).`
        : `아직 s 22 요건이 충족되지 않았어요(최초 거주 충족 예정일: ${earliestIso} · 4년 결석 ${abs4y}/365일 · 최근 12개월 결석 ${abs12m}/90일).`,
      verdict_en: eligible
        ? `Meets all Citizenship Act 2007 s 22 general residence criteria on ${appIso} (deemed PR date ${deemedIso}, 4-yr absences ${abs4y}/365d, 12-mo absences ${abs12m}/90d, Form 1300t fee A$${CITIZENSHIP_CONFERRAL_FEE_AUD}).`
        : `Does not yet satisfy s 22 on ${appIso} (earliest date ${earliestIso}; 4-yr absences ${abs4y}/365d; final 12-mo absences ${abs12m}/90d).`,
    };
  }

  if (calc === "sponsor_salary_and_saf") {
    const stream = String(p.visa_stream || "482_core").trim();
    const salary = Math.max(0, parseInt(p.offered_salary_aud || 0, 10) || 0);
    const amsr = Math.max(0, parseInt(p.amsr_aud || 0, 10) || 0);
    const largeTurn = Boolean(p.sponsor_turnover_ge_10m);
    const years = Math.min(4, Math.max(1, parseInt(p.years_sponsored || 2, 10) || 2));
    const age = Math.max(18, parseInt(p.applicant_age || 32, 10) || 32);

    let minThresh = CSIT_FY26_27_AUD;
    if (stream === "482_specialist") minThresh = SSIT_FY26_27_AUD;
    else if (stream === "482_dama") minThresh = DAMA_CSIT_90_AUD;

    const amsrExempt = salary >= AMSR_EXEMPTION_AUD;
    const effFloor = amsrExempt ? minThresh : Math.max(minThresh, amsr);
    const salaryOk = salary >= effFloor;
    const safAud = stream.startsWith("482")
      ? (largeTurn ? 1800 : 1200) * years
      : largeTurn ? 5000 : 3000;
    const age45FwhitMet = age < 45 || salary >= FWHIT_FY26_27_AUD;

    const ageNoteKo =
      stream === "186_ens" && age >= 45
        ? ` · 만 45세 이상 186 고소득 연령면제 기준(FWHIT A$${fmtComma(FWHIT_FY26_27_AUD)}) ${age45FwhitMet ? "충족" : "미달(DAMA 등 대안 검토)"}.`
        : ".";
    const ageNoteEn =
      stream === "186_ens" && age >= 45
        ? `; Age 45+ 186 FWHIT exemption (A$${fmtComma(FWHIT_FY26_27_AUD)}) ${age45FwhitMet ? "met" : "not met (check DAMA/medical/academic exemptions)"}.`
        : ".";

    return {
      calculator: calc,
      statutory_basis: "Migration Regulations 1994 regs 2.72, 5.19; F2026L00874 (eff. 1 Jul 2026); SAF Charges Regulations 2018 (F2018L01092)",
      visa_stream: stream,
      minimum_threshold_aud: minThresh,
      effective_floor_aud: effFloor,
      amsr_exempt_250k: amsrExempt,
      salary_compliant: salaryOk,
      saf_levy_aud: safAud,
      age_45_fwhit_met: age45FwhitMet,
      fwhit_fy26_27_aud: FWHIT_FY26_27_AUD,
      verdict_ko:
        `제시 연봉 A$${fmtComma(salary)}은 FY2026–27 최소 기준(A$${fmtComma(effFloor)} — 법정 하한 A$${fmtComma(minThresh)} 및 시장연봉 AMSR A$${fmtComma(amsr)} 중 높은 금액)을 ` +
        `${salaryOk ? "충족해요" : "밑돌아 노미네이션이 거절돼요"}. 고용주 부담 SAF 기금은 A$${fmtComma(safAud)}(근로자 전가 법적 금지)예요` +
        ageNoteKo,
      verdict_en:
        `Offered salary A$${fmtComma(salary)} ${salaryOk ? "satisfies" : "falls below"} the FY2026–27 effective floor of A$${fmtComma(effFloor)} ` +
        `(higher of statutory threshold A$${fmtComma(minThresh)} and AMSR A$${fmtComma(amsr)}). Employer SAF levy is A$${fmtComma(safAud)} (strictly illegal to pass onto the nominee)` +
        ageNoteEn,
    };
  }

  throw new CalculatorValidationError(
    `지원하지 않는 법정 계산기예요: ${calc}`,
    `Unknown Australian statutory calculator: ${calc}`
  );
}
