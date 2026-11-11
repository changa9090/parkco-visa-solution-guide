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

const NON_SUBSTANTIVE_SUBCLASSES = new Set([
  "010",
  "020",
  "030",
  "040",
  "041",
  "050",
  "051",
  "unlawful",
]);

const ITEM_1240_ELIGIBLE_BV_SUBCLASSES = new Set(["010", "020", "030"]);

const ITEM_1222_STUDENT_500_BARRED_SUBCLASSES = new Set([
  "485",
  "600",
  "601",
  "651",
  "403",
  "426",
  "771",
  "988",
]);

const SUBCLASS_ALIASES = {
  bva: "010",
  bridging_a: "010",
  bvb: "020",
  bridging_b: "020",
  bvc: "030",
  bridging_c: "030",
  bve: "050",
  bridging_e: "050",
  none: "unlawful",
  expired: "unlawful",
};

export const NATIONAL_HOLIDAYS = {
  "2026-01-01": "New Year's Day",
  "2026-01-26": "Australia Day",
  "2026-04-03": "Good Friday",
  "2026-04-06": "Easter Monday",
  "2026-12-25": "Christmas Day",
  "2026-12-28": "Boxing Day (Additional Day)",
  "2027-01-01": "New Year's Day",
  "2027-01-26": "Australia Day",
  "2027-03-26": "Good Friday",
  "2027-03-29": "Easter Monday",
  "2027-12-25": "Christmas Day",
  "2027-12-27": "Christmas Day (Additional Day)",
  "2027-12-28": "Boxing Day (Additional Day)",
  "2028-01-01": "New Year's Day",
  "2028-01-03": "New Year's Day (Additional Day)",
  "2028-01-26": "Australia Day",
  "2028-04-14": "Good Friday",
  "2028-04-17": "Easter Monday",
  "2028-04-25": "Anzac Day",
  "2028-12-25": "Christmas Day",
  "2028-12-26": "Boxing Day",
  "2029-01-01": "New Year's Day",
  "2029-01-26": "Australia Day",
  "2029-03-30": "Good Friday",
  "2029-04-02": "Easter Monday",
  "2029-04-25": "Anzac Day",
  "2029-12-25": "Christmas Day",
  "2029-12-26": "Boxing Day",
  "2030-01-01": "New Year's Day",
  "2030-01-26": "Australia Day",
  "2030-01-28": "Australia Day (Additional Day)",
  "2030-04-19": "Good Friday",
  "2030-04-22": "Easter Monday",
  "2030-04-25": "Anzac Day",
  "2030-12-25": "Christmas Day",
  "2030-12-26": "Boxing Day",
};

export const STATE_HOLIDAYS = {
  QLD: {
    "2026-04-04": "Easter Saturday",
    "2026-04-05": "Easter Sunday",
    "2026-04-25": "Anzac Day",
    "2026-05-04": "Labour Day (QLD)",
    "2026-08-12": "Royal Queensland Show (Brisbane)",
    "2026-10-05": "King's Birthday (QLD)",
    "2027-03-27": "Easter Saturday",
    "2027-03-28": "Easter Sunday",
    "2027-04-25": "Anzac Day",
    "2027-04-26": "Anzac Day (Observed QLD)",
    "2027-05-03": "Labour Day (QLD)",
    "2027-08-11": "Royal Queensland Show (Brisbane)",
    "2027-10-04": "King's Birthday (QLD)",
    "2028-04-15": "Easter Saturday",
    "2028-04-16": "Easter Sunday",
    "2028-05-01": "Labour Day (QLD)",
    "2028-08-16": "Royal Queensland Show (Brisbane)",
    "2028-10-02": "King's Birthday (QLD)",
    "2029-03-31": "Easter Saturday",
    "2029-04-01": "Easter Sunday",
    "2029-05-07": "Labour Day (QLD)",
    "2029-08-15": "Royal Queensland Show (Brisbane)",
    "2029-10-01": "King's Birthday (QLD)",
    "2030-04-20": "Easter Saturday",
    "2030-04-21": "Easter Sunday",
    "2030-05-06": "Labour Day (QLD)",
    "2030-08-14": "Royal Queensland Show (Brisbane)",
    "2030-10-07": "King's Birthday (QLD)",
  },
  NSW: {
    "2026-04-04": "Easter Saturday",
    "2026-04-05": "Easter Sunday",
    "2026-04-25": "Anzac Day",
    "2026-06-08": "King's Birthday (NSW)",
    "2026-10-05": "Labour Day (NSW)",
    "2027-03-27": "Easter Saturday",
    "2027-03-28": "Easter Sunday",
    "2027-04-25": "Anzac Day",
    "2027-06-14": "King's Birthday (NSW)",
    "2027-10-04": "Labour Day (NSW)",
    "2028-04-15": "Easter Saturday",
    "2028-04-16": "Easter Sunday",
    "2028-06-12": "King's Birthday (NSW)",
    "2028-10-02": "Labour Day (NSW)",
    "2029-03-31": "Easter Saturday",
    "2029-04-01": "Easter Sunday",
    "2029-06-11": "King's Birthday (NSW)",
    "2029-10-01": "Labour Day (NSW)",
    "2030-04-20": "Easter Saturday",
    "2030-04-21": "Easter Sunday",
    "2030-06-10": "King's Birthday (NSW)",
    "2030-10-07": "Labour Day (NSW)",
  },
  VIC: {
    "2026-03-09": "Labour Day (VIC)",
    "2026-04-04": "Easter Saturday",
    "2026-04-05": "Easter Sunday",
    "2026-04-25": "Anzac Day",
    "2026-06-08": "King's Birthday (VIC)",
    "2026-09-25": "Friday before AFL Grand Final (VIC)",
    "2026-11-03": "Melbourne Cup Day (VIC)",
    "2027-03-08": "Labour Day (VIC)",
    "2027-03-27": "Easter Saturday",
    "2027-03-28": "Easter Sunday",
    "2027-04-25": "Anzac Day",
    "2027-06-14": "King's Birthday (VIC)",
    "2027-09-24": "Friday before AFL Grand Final (VIC)",
    "2027-11-02": "Melbourne Cup Day (VIC)",
    "2028-03-13": "Labour Day (VIC)",
    "2028-04-15": "Easter Saturday",
    "2028-04-16": "Easter Sunday",
    "2028-06-12": "King's Birthday (VIC)",
    "2028-09-29": "Friday before AFL Grand Final (VIC)",
    "2028-11-07": "Melbourne Cup Day (VIC)",
    "2029-03-12": "Labour Day (VIC)",
    "2029-03-31": "Easter Saturday",
    "2029-04-01": "Easter Sunday",
    "2029-06-11": "King's Birthday (VIC)",
    "2029-09-28": "Friday before AFL Grand Final (VIC)",
    "2029-11-06": "Melbourne Cup Day (VIC)",
    "2030-03-11": "Labour Day (VIC)",
    "2030-04-20": "Easter Saturday",
    "2030-04-21": "Easter Sunday",
    "2030-06-10": "King's Birthday (VIC)",
    "2030-09-27": "Friday before AFL Grand Final (VIC)",
    "2030-11-05": "Melbourne Cup Day (VIC)",
  },
  WA: {
    "2026-03-02": "Labour Day (WA)",
    "2026-04-05": "Easter Sunday",
    "2026-04-25": "Anzac Day",
    "2026-04-27": "Anzac Day (Observed WA)",
    "2026-06-01": "Western Australia Day",
    "2026-09-28": "King's Birthday (WA)",
    "2027-03-01": "Labour Day (WA)",
    "2027-03-28": "Easter Sunday",
    "2027-04-25": "Anzac Day",
    "2027-04-26": "Anzac Day (Observed WA)",
    "2027-06-07": "Western Australia Day",
    "2027-09-27": "King's Birthday (WA)",
    "2028-03-06": "Labour Day (WA)",
    "2028-04-16": "Easter Sunday",
    "2028-06-05": "Western Australia Day",
    "2028-09-25": "King's Birthday (WA)",
    "2029-03-05": "Labour Day (WA)",
    "2029-04-01": "Easter Sunday",
    "2029-06-04": "Western Australia Day",
    "2029-09-24": "King's Birthday (WA)",
    "2030-03-04": "Labour Day (WA)",
    "2030-04-21": "Easter Sunday",
    "2030-06-03": "Western Australia Day",
    "2030-09-30": "King's Birthday (WA)",
  },
  SA: {
    "2026-03-09": "Adelaide Cup Day (SA)",
    "2026-04-04": "Easter Saturday",
    "2026-04-25": "Anzac Day",
    "2026-06-08": "King's Birthday (SA)",
    "2026-10-05": "Labour Day (SA)",
    "2027-03-08": "Adelaide Cup Day (SA)",
    "2027-03-27": "Easter Saturday",
    "2027-04-26": "Anzac Day (Observed SA)",
    "2027-06-14": "King's Birthday (SA)",
    "2027-10-04": "Labour Day (SA)",
    "2028-03-13": "Adelaide Cup Day (SA)",
    "2028-04-15": "Easter Saturday",
    "2028-06-12": "King's Birthday (SA)",
    "2028-10-02": "Labour Day (SA)",
    "2029-03-12": "Adelaide Cup Day (SA)",
    "2029-03-31": "Easter Saturday",
    "2029-06-11": "King's Birthday (SA)",
    "2029-10-01": "Labour Day (SA)",
    "2030-03-11": "Adelaide Cup Day (SA)",
    "2030-04-20": "Easter Saturday",
    "2030-06-10": "King's Birthday (SA)",
    "2030-10-07": "Labour Day (SA)",
  },
  TAS: {
    "2026-03-09": "Eight Hours Day (TAS)",
    "2026-04-07": "Easter Tuesday (TAS Public Service)",
    "2026-04-25": "Anzac Day",
    "2026-06-08": "King's Birthday (TAS)",
    "2027-03-08": "Eight Hours Day (TAS)",
    "2027-03-30": "Easter Tuesday (TAS Public Service)",
    "2027-04-25": "Anzac Day",
    "2027-06-14": "King's Birthday (TAS)",
    "2028-03-13": "Eight Hours Day (TAS)",
    "2028-04-18": "Easter Tuesday (TAS Public Service)",
    "2028-06-12": "King's Birthday (TAS)",
    "2029-03-12": "Eight Hours Day (TAS)",
    "2029-04-03": "Easter Tuesday (TAS Public Service)",
    "2029-06-11": "King's Birthday (TAS)",
    "2030-03-11": "Eight Hours Day (TAS)",
    "2030-04-23": "Easter Tuesday (TAS Public Service)",
    "2030-06-10": "King's Birthday (TAS)",
  },
  ACT: {
    "2026-03-09": "Canberra Day (ACT)",
    "2026-04-04": "Easter Saturday",
    "2026-04-05": "Easter Sunday",
    "2026-04-25": "Anzac Day",
    "2026-04-27": "Anzac Day (Observed ACT)",
    "2026-06-01": "Reconciliation Day (ACT)",
    "2026-06-08": "King's Birthday (ACT)",
    "2026-10-05": "Labour Day (ACT)",
    "2027-03-08": "Canberra Day (ACT)",
    "2027-03-27": "Easter Saturday",
    "2027-03-28": "Easter Sunday",
    "2027-04-25": "Anzac Day",
    "2027-04-26": "Anzac Day (Observed ACT)",
    "2027-05-31": "Reconciliation Day (ACT)",
    "2027-06-14": "King's Birthday (ACT)",
    "2027-10-04": "Labour Day (ACT)",
    "2028-03-13": "Canberra Day (ACT)",
    "2028-04-15": "Easter Saturday",
    "2028-04-16": "Easter Sunday",
    "2028-05-29": "Reconciliation Day (ACT)",
    "2028-06-12": "King's Birthday (ACT)",
    "2028-10-02": "Labour Day (ACT)",
    "2029-03-12": "Canberra Day (ACT)",
    "2029-03-31": "Easter Saturday",
    "2029-04-01": "Easter Sunday",
    "2029-05-28": "Reconciliation Day (ACT)",
    "2029-06-11": "King's Birthday (ACT)",
    "2029-10-01": "Labour Day (ACT)",
    "2030-03-11": "Canberra Day (ACT)",
    "2030-04-20": "Easter Saturday",
    "2030-04-21": "Easter Sunday",
    "2030-05-27": "Reconciliation Day (ACT)",
    "2030-06-10": "King's Birthday (ACT)",
    "2030-10-07": "Labour Day (ACT)",
  },
  NT: {
    "2026-04-04": "Easter Saturday",
    "2026-04-25": "Anzac Day",
    "2026-05-04": "May Day (NT)",
    "2026-06-08": "King's Birthday (NT)",
    "2026-08-03": "Picnic Day (NT)",
    "2027-03-27": "Easter Saturday",
    "2027-04-26": "Anzac Day (Observed NT)",
    "2027-05-03": "May Day (NT)",
    "2027-06-14": "King's Birthday (NT)",
    "2027-08-02": "Picnic Day (NT)",
    "2028-04-15": "Easter Saturday",
    "2028-05-01": "May Day (NT)",
    "2028-06-12": "King's Birthday (NT)",
    "2028-08-07": "Picnic Day (NT)",
    "2029-03-31": "Easter Saturday",
    "2029-05-07": "May Day (NT)",
    "2029-06-11": "King's Birthday (NT)",
    "2029-08-06": "Picnic Day (NT)",
    "2030-04-20": "Easter Saturday",
    "2030-05-06": "May Day (NT)",
    "2030-06-10": "King's Birthday (NT)",
    "2030-08-05": "Picnic Day (NT)",
  },
};

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

function easterSundayUtc(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function normalizeState(rawState) {
  const st = String(rawState || "QLD").trim().toUpperCase();
  return Object.prototype.hasOwnProperty.call(STATE_HOLIDAYS, st) ? st : "QLD";
}

function getHolidayName(dt, state) {
  const iso = fmtIso(dt);
  if (NATIONAL_HOLIDAYS[iso]) return NATIONAL_HOLIDAYS[iso];
  if (STATE_HOLIDAYS[state] && STATE_HOLIDAYS[state][iso]) return STATE_HOLIDAYS[state][iso];
  const y = dt.getUTCFullYear();
  if (y > 2030) {
    const md = iso.slice(5);
    if (md === "01-01") return "New Year's Day";
    if (md === "01-26") return "Australia Day";
    if (md === "04-25") return "Anzac Day";
    if (md === "12-25") return "Christmas Day";
    if (md === "12-26") return "Boxing Day";
    const es = easterSundayUtc(y);
    if (fmtIso(addDays(es, -2)) === iso) return "Good Friday";
    if (fmtIso(addDays(es, 1)) === iso) return "Easter Monday";
  }
  return null;
}

function addWorkingDays(startDt, workingDays, state = "QLD") {
  let cur = new Date(startDt.getTime());
  let added = 0;
  const skipped = [];
  while (added < workingDays) {
    cur = addDays(cur, 1);
    const wd = cur.getUTCDay(); // 0 Sun .. 6 Sat
    if (wd >= 1 && wd <= 5) {
      const hName = getHolidayName(cur, state);
      if (hName) {
        skipped.push({ date: fmtIso(cur), name: hName });
      } else {
        added += 1;
      }
    }
  }
  return { date: cur, skipped };
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
        period_label_ko: "통지일 다음 날부터 28일 (역일 기준 · 기한 연장 불가)",
        period_label_en: "28 calendar days after notification day (strictly non-extendable per s 347(5))",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: null,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `일반 비자·노미네이션 거절에 대한 행정재심기구(ART) 재심 청구 마감일은 ${deadlineIso}입니다. ` +
          `s 347(5)에 따라 기한 연장이 허용되지 않으며 기본 접수비는 A$${fmtComma(ART_MIGRATION_FEE_AUD)}(경제적 곤궁 감액 시 A$${fmtComma(ART_HARDSHIP_FEE_AUD, 2)}, 인용·환송 시 50% 환급)입니다.`,
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
        period_label_ko: "28일 불변기한 + 행정재심기구(ART) 구두심리 없는 서면심리(Review on the Papers) 대상",
        period_label_en: "28 calendar days (non-extendable) + Mandatory Review on the Papers (reg 4.18)",
        extendable: false,
        on_the_papers_s367c: true,
        decision_clock_days: null,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `학생비자(Subclass 500) 거절에 대한 행정재심기구(ART) 재심 청구 마감일은 ${deadlineIso}입니다. ` +
          "개정법(s 367C · reg 4.18)에 따라 구두 청문회(Hearing) 없이 서면심리로 진행되므로 현행 CoE 재학 증빙(reg 4.18(4))과 서면 변론서(s 367F 28일 / s 367G 14일) 준비 여부를 우선 점검해야 합니다.",
        verdict_en:
          `Your Subclass 500 ART filing deadline is ${deadlineIso}. ` +
          "Under s 367C and reg 4.18, Student Visa refusals are decided on the papers without an oral hearing; current CoE enrolment evidence (reg 4.18(4)) and written submissions (28d under s 367F / 14d under s 367G) are decisive.",
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
          `이민구금(Detention) 상태에서 통지받은 결정의 행정재심기구(ART) 접수 마감일은 ${deadlineIso}(s 347(3)(a) 14일 불변기한)입니다. ` +
          "브릿징 비자 거절 재심(s 338(4))은 수수료가 면제되며 접수 후 7영업일(reg 4.17) 결정 기한 규정이 적용됩니다.",
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
        period_label_ko: "9일 단기 불변기한 (84일 내 ART 미결정 시 간주 기각 규정 적용)",
        period_label_en: "9 calendar days strict (s 500(6B)) + 84-day deemed-affirmation clock (s 500(6L))",
        extendable: false,
        on_the_papers_s367c: false,
        decision_clock_days: 84,
        deemed_affirm_date: eightyFourIso,
        filing_fee_aud: ART_MIGRATION_FEE_AUD,
        hardship_fee_aud: ART_HARDSHIP_FEE_AUD,
        verdict_ko:
          `호주 내 s 501 거절·취소 또는 s 501CA(4) 불취소 결정의 행정재심기구(ART) 접수 마감일은 ${deadlineIso}(9일 불변기한)입니다. ` +
          `심리 2영업일 전 증거제출 제한 규칙(s 500(6H)–(6J))과 ${eightyFourIso} 기준 84일 간주 기각 규정(s 500(6L)) 및 Direction No. 123 심사 기준을 즉시 확인해야 합니다.`,
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
          `12개월 이상 징역형 선고에 따른 s 501(3A) 의무적 비자 취소 철회 청구(Representations) 마감일은 ${deadlineIso}입니다. ` +
          "법정 기한이 도과하면 철회 심사 권한이 제한되므로 Direction No. 123(공동체 보호·가족·호주 유대) 소명 자료를 기한 내에 준비해야 합니다.",
        verdict_en:
          `Mandatory s 501(3A) cancellation revocation representations under s 501CA must be lodged by ${deadlineIso} (28 days under reg 2.52; zero extension power). ` +
          "Address all primary and other considerations under Ministerial Direction No. 123.",
      };
    }

    if (dtype === "noicc_s116_onshore") {
      const state = normalizeState(p.state);
      const primary = addWorkingDays(notif, 5, state);
      const ext = addWorkingDays(primary.date, 5, state);
      const deadlineIso = fmtIso(primary.date);
      const extIso = fmtIso(ext.date);
      const skippedStr = primary.skipped.map((h) => `${h.date} ${h.name}`).join(", ");
      const holidayNoteKo = primary.skipped.length ? ` (${state} 공휴일 ${skippedStr} 제외 반영)` : "";
      const holidayNoteEn = primary.skipped.length ? ` (excluding ${state} public holiday(s): ${skippedStr})` : "";
      return {
        calculator: calc,
        decision_type: dtype,
        state,
        skipped_holidays: primary.skipped,
        statutory_basis: "Migration Act 1958 ss 116, 119, 121; Migration Regulations 1994 reg 2.44(2)(a), (3)",
        notification_date: notifIso,
        deadline_date: deadlineIso,
        extended_deadline_date: extIso,
        period_label_ko: `호주 내 s 116 취소예고(NOICC) 5영업일 (${state} 공휴일 반영 · 만료 전 신청 시 +5영업일 1회 연장 가능)`,
        period_label_en: `5 working days onshore under reg 2.44(2)(a) (${state} public holidays excluded; extendable once by +5 working days under reg 2.44(3))`,
        extendable: true,
        on_the_papers_s367c: false,
        decision_clock_days: null,
        filing_fee_aud: 0,
        hardship_fee_aud: 0,
        verdict_ko:
          `호주 내 s 116 비자 취소 예고 통지(NOICC) 1차 답변 기한은 ${deadlineIso}(5영업일 · 주말 및 ${state} 공휴일 제외)${holidayNoteKo}입니다. ` +
          `기한 도과 전 연장을 요청하면 reg 2.44(3)에 따라 최대 ${extIso}(+5영업일)까지 연장 신청이 가능합니다(단 공항 입국심사장 reg 2.46 통지는 즉시 소명 대상).`,
        verdict_en:
          `Onshore s 116 NOICC response is due by ${deadlineIso} (5 working days under reg 2.44(2)(a), excluding weekends and ${state} public holidays)${holidayNoteEn}. ` +
          `Before expiry, one 5-working-day extension to ${extIso} may be requested under reg 2.44(3) (note: airport clearance cancellation under reg 2.46 allows only 5 minutes).`,
      };
    }

    throw new CalculatorValidationError(
      `지원하지 않는 결정 유형입니다: ${dtype}`,
      `Unsupported decision_type: ${dtype}`
    );
  }

  if (calc === "s48_and_schedule3_check") {
    const onshore = p.onshore !== undefined ? Boolean(p.onshore) : true;
    const rawCurSub = String(p.current_visa_subclass || "").trim().toLowerCase();
    let curSub;
    let holdsSub;
    if (rawCurSub) {
      curSub = Object.prototype.hasOwnProperty.call(SUBCLASS_ALIASES, rawCurSub)
        ? SUBCLASS_ALIASES[rawCurSub]
        : rawCurSub;
      holdsSub = !NON_SUBSTANTIVE_SUBCLASSES.has(curSub);
    } else {
      holdsSub = Boolean(p.holds_substantive_visa);
      curSub = holdsSub ? "substantive" : "010";
    }

    let priorRef;
    if (Object.prototype.hasOwnProperty.call(p, "refused_or_cancelled_since_last_entry")) {
      priorRef = Boolean(p.refused_or_cancelled_since_last_entry);
    } else if (rawCurSub) {
      priorRef = false;
    } else {
      priorRef = true;
    }

    const daysUnsub = Math.max(0, parseInt(p.days_since_last_substantive_visa || 0, 10) || 0);
    const target = String(p.target_subclass || "820").trim();
    const compelling = Boolean(p.has_compelling_reasons);

    const s48Applies = onshore && !holdsSub && priorRef;
    const exempt = REG_212_S48_EXEMPT_SUBCLASSES.has(target);

    const item1240Eligible = Boolean(
      onshore &&
        target === "482" &&
        !holdsSub &&
        ITEM_1240_ELIGIBLE_BV_SUBCLASSES.has(curSub) &&
        !s48Applies
    );
    const item1240IneligibleBvOrUnlawful = Boolean(
      onshore &&
        target === "482" &&
        !holdsSub &&
        !ITEM_1240_ELIGIBLE_BV_SUBCLASSES.has(curSub)
    );
    const item1222Barred = Boolean(
      onshore &&
        target === "500" &&
        ITEM_1222_STUDENT_500_BARRED_SUBCLASSES.has(curSub)
    );

    let onshoreAllowed = !onshore || !s48Applies || exempt;
    if (item1240IneligibleBvOrUnlawful || item1222Barred) {
      onshoreAllowed = false;
    }

    const sch3Triggered = onshore && !holdsSub && (target === "820" || target === "500");
    let sch3Crit = "none";
    if (sch3Triggered) {
      if (daysUnsub <= 28) sch3Crit = "3001_within_28d";
      else if (target === "820") sch3Crit = "3001_expired_waensila_waiver_needed";
      else sch3Crit = "schedule3_hard_block";
    }

    let vKo;
    let vEn;
    if (!onshore) {
      vKo = "해외(Offshore) 체류 중에는 s 48 재접수 제한과 Schedule 3 요건이 적용되지 않습니다(단 과거 취소·불법체류 이력에 따른 PIC 4013/4014 입국 제한 기간은 별도 확인이 필요합니다).";
      vEn = "Outside Australia (offshore), neither s 48 nor Schedule 3 applies (verify PIC 4013/4014 exclusion periods separately if previously cancelled or unlawful).";
    } else if (item1222Barred) {
      vKo =
        `2024년 7월 1일 시행 Schedule 1 Item 1222 개정 규정에 따라 현재 Subclass ${curSub} 비자 소지자는 호주 내(Onshore)에서 학생비자(Subclass 500)를 유효하게 접수할 수 없습니다` +
        "(485 · 600 · 601 · 651 · 403 · 426 · 771 · 988 호주 내 전환 법적 원천 금지). 해외 출국 후 접수 또는 482 · 190 · 491 · 820 등 합법적 직접 경로를 검토하시기 바랍니다.";
      vEn =
        `Under Migration Regulations 1994 Schedule 1 Item 1222 (effective 1 July 2024), holders of Subclass ${curSub} are statutorily barred from making a valid onshore Subclass 500 Student visa application ` +
        "(applies to Subclasses 485, 600, 601, 651, 403, 426, 771, and 988). Consider direct skilled/sponsored/partner pathways or genuine offshore lodgement.";
    } else if (item1240IneligibleBvOrUnlawful && !s48Applies) {
      vKo =
        `Schedule 1 Item 1240(3)(b)에 따라 호주 내 Subclass 482(SID) 접수는 실질 비자 또는 브리징 비자 A(010)·B(020)·C(030) 소지자에게만 허용되므로 현재 상태(${curSub})에서는 호주 내 유효 접수가 불가합니다` +
        "(해외 출국 후 접수 및 PIC 4014 입국 제한 여부 검토 필요).";
      vEn =
        `Under Schedule 1 Item 1240(3)(b), onshore Subclass 482 (SID) lodgement requires holding a substantive visa or Bridging Visa A (010), B (020), or C (030); ` +
        `current status (${curSub}) is ineligible for onshore lodgement (assess offshore lodgement and PIC 4014 exclusion risk).`;
    } else if (!onshoreAllowed) {
      vKo =
        `호주 내 실질 비자 미보유 및 거절·취소 이력으로 Migration Act s 48 재접수 제한 대상에 해당하여 Subclass ${target} 호주 내 유효 접수 가능 여부를 면밀히 확인해야 합니다. ` +
        "reg 2.12 예외 비자(190 · 491 · 494 · 파트너 820) 해당 여부 또는 BVB 확보 후 해외 접수 방안을 검토하시기 바랍니다.";
      vEn =
        `Section 48 bars onshore lodgement of Subclass ${target} because you hold no substantive visa and had a refusal/cancellation since last entry. ` +
        "Consider reg 2.12 exempt visas (190, 491, 494, Partner 820) or offshore lodgement with careful Bridging Visa travel planning.";
    } else if (item1240Eligible) {
      vKo =
        `Schedule 1 Item 1240(3)(b)에 따라 브리징 비자 A(010)·B(020)·C(030) 소지자(현재 ${curSub})는 Schedule 3 장벽 없이 호주 내(Onshore)에서 Subclass 482(SID) 비자를 적법하게 신청할 수 있습니다. ` +
        "다만 브리징 비자 C(030)는 재정적 곤궁(Financial Hardship) 근로허가를 별도 승인받지 않은 한 기본적으로 취업권이 없으며 호주 입국 후 비자 거절·취소 이력이 있는 경우에만 s 48 재접수 제한이 적용됩니다.";
      vEn =
        `Under Schedule 1 Item 1240(3)(b), Bridging Visa A (010), B (020), and C (030) holders (current: ${curSub}) ARE eligible to lodge Subclass 482 (SID) onshore without any Schedule 3 bar. ` +
        "Note that Bridging Visa C (030) normally carries no work rights unless financial hardship work rights are separately granted, and the s 48 bar applies only if you had an onshore refusal or cancellation since last entering Australia.";
    } else if (sch3Crit === "3001_expired_waensila_waiver_needed") {
      vKo =
        `Subclass 820은 reg 2.12 예외 비자에 해당하나 마지막 실질 비자 만료 후 ${daysUnsub}일(>28일)이 경과하여 Schedule 3(Criterion 3001) 요건 검토가 필요합니다. ` +
        `Waensila [2016] FCAFC 32 판례 기준에 따른 '강력하고 연민할 만한 사유(Compelling Reasons)' 면제 소명 자료가 ${compelling ? "중요한 검토 요소가 됩니다" : "필수적으로 요구됩니다"}.`;
      vEn =
        `Subclass 820 is exempt from s 48 under reg 2.12, but ${daysUnsub} days (>28d) without a substantive visa triggers Schedule 3 (Criterion 3001). ` +
        `Under Waensila [2016] FCAFC 32, establishing compelling reasons for a Schedule 3 waiver is ${compelling ? "viable with strong evidence" : "mandatory to avoid refusal"}.`;
    } else {
      vKo =
        `입력하신 조건 기준 Subclass ${target} 기본 호주 내 접수 제한(s 48)에 해당하지 않으나 개별 자격 요건은 추가 확인이 필요합니다` +
        (s48Applies ? " (reg 2.12 s 48 예외 비자 기준 · 주정부 노미네이션 전 BVB 출국 조건 별도 확인)." : ".");
      vEn =
        `Onshore lodgement of Subclass ${target} is legally permitted` +
        (s48Applies ? " via reg 2.12 exemption to s 48." : ".");
    }

    return {
      calculator: calc,
      statutory_basis: "Migration Act 1958 s 48; Migration Regulations 1994 reg 2.12, Schedule 1 Items 1222 & 1240(3)(b), Schedule 3 (3001/3003/3004); Waensila [2016] FCAFC 32",
      target_subclass: target,
      current_visa_subclass: curSub,
      s48_applies: s48Applies,
      reg_212_exempt: exempt,
      onshore_lodgement_allowed: onshoreAllowed,
      item_1240_bva_bvb_bvc_eligible: item1240Eligible,
      item_1222_student_500_barred: item1222Barred,
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
        ? `${appIso} 입력값 기준 시민권 일반 거주요건(s 22) 산술 기간을 충족합니다(간주 영주권 시작일 ${deemedIso} · 최근 4년 해외체류 ${abs4y}/365일 · 최근 12개월 ${abs12m}/90일 · 접수비 A$${CITIZENSHIP_CONFERRAL_FEE_AUD} · 신원·품행 등 개별 요건 별도 확인).`
        : `${appIso} 입력값 기준 시민권 일반 거주요건(s 22) 산술 기간에 아직 미달합니다(최초 거주기간 충족 예정일: ${earliestIso} · 4년 해외체류 ${abs4y}/365일 · 최근 12개월 해외체류 ${abs12m}/90일).`,
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

    const vKo =
      salary <= 0
        ? `제시 기본연봉(AUD)을 입력하시면 현행 FY2026–27 최소 연봉 기준(A$${fmtComma(effFloor)} · 법정 하한 A$${fmtComma(minThresh)}) 충족 여부와 고용주 부담 SAF 기금(A$${fmtComma(safAud)})을 확인하실 수 있습니다.`
        : `제시 연봉 A$${fmtComma(salary)}은 현행 FY2026–27 최소 연봉 기준(A$${fmtComma(effFloor)} · 법정 하한 A$${fmtComma(minThresh)} 및 시장연봉 AMSR A$${fmtComma(amsr)} 중 높은 금액)을 ` +
          `${salaryOk ? "충족합니다(직무 진정성·LMT 등 추가 요건 별도 확인 필요)" : "밑돌아 노미네이션 거절 위험이 높습니다"}. 고용주 부담 SAF 기금은 A$${fmtComma(safAud)}(근로자 전가 법적 금지)입니다` +
          ageNoteKo;
    const vEn =
      salary <= 0
        ? `Enter an offered base salary (AUD) to check compliance against the FY2026–27 minimum floor of A$${fmtComma(effFloor)} (statutory threshold A$${fmtComma(minThresh)}) and employer SAF levy (A$${fmtComma(safAud)}).`
        : `Offered salary A$${fmtComma(salary)} ${salaryOk ? "satisfies" : "falls below"} the FY2026–27 effective floor of A$${fmtComma(effFloor)} ` +
          `(higher of statutory threshold A$${fmtComma(minThresh)} and AMSR A$${fmtComma(amsr)}). Employer SAF levy is A$${fmtComma(safAud)} (strictly illegal to pass onto the nominee)` +
          ageNoteEn;

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
      verdict_ko: vKo,
      verdict_en: vEn,
    };
  }

  throw new CalculatorValidationError(
    `지원하지 않는 법정 계산기입니다: ${calc}`,
    `Unknown Australian statutory calculator: ${calc}`
  );
}
