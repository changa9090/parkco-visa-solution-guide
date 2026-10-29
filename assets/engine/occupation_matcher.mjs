export const BILINGUAL_SIGNAL_MAP = {
  // ICT & Software
  "개발자": ["software", "developer", "programmer", "code", "applications", "testing"],
  "프로그래머": ["programmer", "developer", "software", "code", "programs"],
  "풀스택": ["software", "developer", "programmer", "web", "applications", "design"],
  "백엔드": ["software", "developer", "programmer", "systems", "database", "architecture"],
  "프론트엔드": ["web", "developer", "software", "user", "interface", "applications"],
  "소프트웨어": ["software", "engineer", "developer", "programmer", "systems"],
  "아키텍처": ["architecture", "software", "systems", "design", "specifications"],
  "설계": ["design", "designing", "specifications", "architecture", "planning"],
  "테스트": ["testing", "debugging", "diagnosing", "quality"],
  "테스팅": ["testing", "debugging", "quality"],
  "데이터": ["data", "database", "analytics", "analyst", "scientist", "statistical"],
  "데브옵스": ["devops", "cloud", "software", "systems", "engineer"],
  "사이버보안": ["cyber", "security", "ict", "specialist", "engineer"],
  "정보보안": ["cyber", "security", "ict", "specialist"],
  "보안": ["cyber", "security", "network", "ict"],
  "클라우드": ["cloud", "devops", "systems", "network", "software"],
  "네트워크": ["network", "systems", "telecommunications", "ict"],
  "비즈니스분석": ["business", "analyst", "ict", "systems", "requirements"],
  react: ["software", "developer", "programmer", "web", "applications", "code"],
  python: ["software", "developer", "programmer", "data", "code", "testing"],
  typescript: ["software", "developer", "programmer", "web", "code"],
  javascript: ["software", "developer", "programmer", "web", "code"],
  java: ["software", "developer", "programmer", "applications", "code"],
  golang: ["software", "developer", "programmer", "systems"],
  aws: ["software", "systems", "cloud", "devops", "engineer"],
  kubernetes: ["devops", "software", "systems", "engineer"],
  api: ["software", "developer", "programmer", "applications", "systems", "design"],
  // Hospitality
  "셰프": ["chef", "menu", "kitchen", "cooks", "food", "cost"],
  "주방장": ["chef", "kitchen", "menu", "supervising", "cooks"],
  "요리사": ["chef", "cook", "food", "dishes", "kitchen", "menus"],
  "조리사": ["cook", "chef", "food", "preparing", "cooking", "kitchen"],
  "쿡": ["cook", "preparing", "cooking", "food", "seasoning"],
  "주방": ["kitchen", "chef", "cook", "food", "hygiene"],
  "메뉴": ["menus", "menu", "planning", "chef", "food"],
  "제빵": ["baker", "bread", "baking", "dough"],
  "베이커": ["baker", "bread", "baking"],
  "파티시에": ["pastrycook", "pastry", "cakes", "desserts"],
  "제과": ["pastrycook", "pastry", "cakes"],
  "카페": ["cafe", "restaurant", "manager", "hospitality"],
  "레스토랑": ["restaurant", "cafe", "chef", "cook", "hospitality"],
  "바리스타": ["cafe", "restaurant", "hospitality"],
  "점장": ["cafe", "restaurant", "retail", "manager"],
  // Accounting & Finance
  "회계사": ["accountant", "accounting", "financial", "statements", "budget"],
  "회계": ["accountant", "accounting", "financial", "statements", "budget"],
  "세무사": ["taxation", "accountant", "tax", "returns"],
  "세무": ["taxation", "accountant", "tax", "returns"],
  "재무제표": ["financial", "statements", "accountant", "accounting", "reporting"],
  "결산": ["financial", "statements", "accountant", "budget", "audits"],
  "감사": ["auditor", "audit", "audits", "financial", "internal", "external"],
  "기장": ["accountant", "accounting", "financial"],
  // Trades & Construction
  "타일": ["tiler", "tiles", "wall", "floor", "waterproofing", "laying"],
  "타일러": ["tiler", "wall", "floor", "tiles"],
  "방수": ["waterproofing", "tiler", "tiles", "surfaces", "cement"],
  "욕실": ["tiler", "tiles", "plumber", "wall", "floor"],
  "리노베이션": ["tiler", "carpenter", "renovation", "wall", "floor"],
  "용접사": ["welder", "first", "class", "welding", "metal"],
  "용접": ["welder", "welding", "metal", "fabricator", "joints"],
  "웰더": ["welder", "welding", "metal"],
  "제관": ["metal", "fabricator", "structural", "steel", "welding"],
  "목수": ["carpenter", "joiner", "timber", "framing", "wood"],
  "카펜터": ["carpenter", "timber", "wood"],
  "배관공": ["plumber", "plumbing", "pipes", "drainage"],
  "배관": ["plumber", "plumbing", "pipes", "drainage", "gas"],
  "플러머": ["plumber", "pipes", "drainage"],
  "전기기사": ["electrician", "electrical", "wiring", "circuits"],
  "전기": ["electrician", "electrical", "wiring", "circuits"],
  "일렉트리션": ["electrician", "electrical", "wiring"],
  "정비": ["mechanic", "motor", "engine", "vehicle", "diesel", "repairing"],
  "미케닉": ["mechanic", "motor", "vehicle", "engine"],
  "조적": ["bricklayer", "bricks", "mortar"],
  "미장": ["plasterer", "plaster", "plasterboard"],
  "도장": ["painter", "painting", "surfaces"],
  "페인터": ["painter", "painting"],
  "토목": ["civil", "engineer", "engineering", "structural", "construction"],
  "적산": ["quantity", "surveyor", "cost", "construction", "estimates"],
  "건축": ["architect", "architectural", "construction", "building"],
  "현장소장": ["construction", "project", "manager", "building", "site"],
  // Healthcare, Education, Legal & Social
  "간호사": ["registered", "nurse", "nurses", "nursing", "patient", "care"],
  "정규간호사": ["registered", "nurse", "nurses", "nursing"],
  rn: ["registered", "nurse", "nurses", "nursing", "patient"],
  "임상병리사": ["medical", "laboratory", "scientist", "technician", "pathology"],
  "임상병리": ["medical", "laboratory", "scientist", "pathology"],
  "병동": ["nurse", "nurses", "nursing", "patients", "hospital", "ward", "clinical"],
  "환자": ["patients", "patient", "nursing", "care", "treatment", "assessing"],
  "케어": ["care", "nursing", "patients", "aged", "disabled"],
  "노인요양": ["aged", "care", "nurse", "nursing", "personal"],
  "에이지드케어": ["aged", "care", "nurse"],
  "유아교사": ["early", "childhood", "pre-primary", "teacher", "children"],
  "유치원": ["early", "childhood", "pre-primary", "teacher", "children"],
  "어린이집": ["child", "care", "worker", "early", "childhood", "children"],
  "보육교사": ["child", "care", "worker", "early", "childhood", "teacher"],
  "보육": ["child", "care", "worker", "early", "childhood", "children"],
  "중등교사": ["secondary", "school", "teacher", "teaching"],
  "초등교사": ["primary", "school", "teacher", "teaching"],
  "교사": ["teacher", "school", "secondary", "primary", "early", "teaching"],
  "사회복지": ["social", "worker", "welfare", "community"],
  "심리상담사": ["clinical", "psychologist", "counsellor", "psychological"],
  "물리치료": ["physiotherapist", "physical", "rehabilitation"],
  "작업치료": ["occupational", "therapist", "rehabilitation"],
  "약사": ["pharmacist", "hospital", "retail", "medications"],
  "변호사": ["solicitor", "barrister", "legal", "law"],
  // Business, Marketing & Design
  "마케터": ["marketing", "specialist", "advertising", "campaigns", "market"],
  "마케팅": ["marketing", "specialist", "market", "campaigns", "brand"],
  "광고기획": ["advertising", "specialist", "campaigns", "marketing"],
  "홍보": ["public", "relations", "communications", "media"],
  "그래픽": ["graphic", "designer", "visual", "design", "multimedia"],
  "디자이너": ["designer", "graphic", "web", "industrial", "interior"],
  "인사": ["human", "resource", "recruitment", "workplace"],
  "경영컨설턴트": ["management", "consultant", "organisation"],
  "물류": ["supply", "distribution", "procurement", "logistics"],
  "미용사": ["hairdresser", "hair", "cutting", "colouring"],
};

export const STOPWORDS_EN = new Set([
  "and", "or", "the", "of", "in", "to", "for", "with", "on", "at", "by", "from",
  "as", "is", "are", "a", "an", "nec", "other", "general", "not", "elsewhere",
  "classified", "work", "working", "years", "year", "experience", "australia",
  "sydney", "melbourne", "brisbane", "perth", "adelaide", "nsw", "vic", "qld",
  "pty", "ltd", "bachelor", "master", "diploma", "certificate", "university",
]);

export const POPULAR_PRIORITY_CODES = [
  "261313", "351311", "254499", "241111", "221111", "333411",
  "322313", "331212", "351411", "261312", "233211", "225113",
  "341111", "334111", "321211", "271311",
];
export const POPULAR_PRIORITY_SET = new Set(POPULAR_PRIORITY_CODES);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Matches Python 3 Unicode-aware \b word boundary */
function unicodeWordBoundedRegex(escapedBody, flags = "u") {
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escapedBody}(?![\\p{L}\\p{N}_])`, flags);
}

/* Matches Python 3 banker's round(val, 1) */
export function pyRound1(val) {
  const scaled = Number((val * 10).toPrecision(12));
  const floor = Math.floor(scaled);
  const diff = scaled - floor;
  let roundedInt;
  if (Math.abs(diff - 0.5) < 1e-9) {
    roundedInt = floor % 2 === 0 ? floor : floor + 1;
  } else {
    roundedInt = Math.round(scaled);
  }
  return roundedInt / 10;
}

const KO_SIGNAL_TRIGGERS = [];
const ASCII_SIGNAL_TRIGGERS = [];
for (const [trig, mapped] of Object.entries(BILINGUAL_SIGNAL_MAP)) {
  if (/[가-힣]/.test(trig)) {
    KO_SIGNAL_TRIGGERS.push([trig, mapped]);
  } else {
    ASCII_SIGNAL_TRIGGERS.push([trig, unicodeWordBoundedRegex(escapeRegex(trig)), mapped]);
  }
}

export function tokenize(text) {
  const raw = String(text || "").toLowerCase().match(/[0-9]{4,6}|[a-zA-Z][a-zA-Z0-9+#.-]{1,}|[가-힣]{2,}/g) || [];
  const out = [];
  for (let tok of raw) {
    if (STOPWORDS_EN.has(tok)) continue;
    if (/^[가-힣]{3,}$/.test(tok)) {
      const stripped = tok.replace(/(에서|으로|에게|이라|라고|입니다|하다|하는|및|은|는|이|가|을|를|의|와|과|도|로)$/, "");
      if (stripped.length >= 2) {
        tok = stripped;
      }
    }
    if (!out.includes(tok)) {
      out.push(tok);
    }
  }
  return out;
}

export function mergeDuplicateOccupationRecords(existing, incoming) {
  const base = structuredClone(existing);
  let primaryRec;
  let secondaryRec;
  if ((incoming.visas_eligible || []).length > (base.visas_eligible || []).length) {
    primaryRec = structuredClone(incoming);
    secondaryRec = base;
  } else {
    primaryRec = base;
    secondaryRec = structuredClone(incoming);
  }

  for (const lst of secondaryRec.lists || []) {
    if (!primaryRec.lists.includes(lst)) primaryRec.lists.push(lst);
  }
  for (const vs of secondaryRec.visas_eligible || []) {
    if (!primaryRec.visas_eligible.includes(vs)) primaryRec.visas_eligible.push(vs);
  }
  for (const st of secondaryRec.visa_streams_detail || []) {
    if (!primaryRec.visa_streams_detail.includes(st)) primaryRec.visa_streams_detail.push(st);
  }

  primaryRec.caveats_by_subclass = primaryRec.caveats_by_subclass || {};
  for (const [sc, cavs] of Object.entries(secondaryRec.caveats_by_subclass || {})) {
    if (!primaryRec.caveats_by_subclass[sc]) {
      primaryRec.caveats_by_subclass[sc] = [];
    }
    const curCavs = primaryRec.caveats_by_subclass[sc];
    const existingDescs = new Set(curCavs.map((c) => c.description_en));
    for (const c of cavs) {
      if (!existingDescs.has(c.description_en)) {
        curCavs.push(c);
        existingDescs.add(c.description_en);
      }
    }
  }
  primaryRec.has_caveats = Object.keys(primaryRec.caveats_by_subclass).length > 0;

  const seenAuth = new Set((primaryRec.assessing_authorities || []).map((a) => a.code));
  for (const auth of secondaryRec.assessing_authorities || []) {
    if (!seenAuth.has(auth.code)) {
      primaryRec.assessing_authorities.push(auth);
      seenAuth.add(auth.code);
    }
  }

  if (!primaryRec.anzsco_2022_code && secondaryRec.anzsco_2022_code) {
    primaryRec.anzsco_2022_code = secondaryRec.anzsco_2022_code;
  }
  if (!primaryRec.anzsco_2013_code && secondaryRec.anzsco_2013_code) {
    primaryRec.anzsco_2013_code = secondaryRec.anzsco_2013_code;
  }

  return primaryRec;
}

export class OccupationMatcher {
  constructor(occupations, confusionPairs = []) {
    this.occupations = occupations || [];
    this.confusionPairs = confusionPairs || [];
    this._byId = new Map();
    this._byCode = new Map();
    this._indexed = [];

    for (const occ of this.occupations) {
      const occId = String(occ.id || "").trim();
      if (occId) {
        this._byId.set(occId, occ);
      }
      for (const key of ["anzsco_code_primary", "anzsco_2022_code", "anzsco_2013_code"]) {
        const code = String(occ[key] || "").trim();
        if (code) {
          if (this._byCode.has(code)) {
            this._byCode.set(code, mergeDuplicateOccupationRecords(this._byCode.get(code), occ));
          } else {
            this._byCode.set(code, structuredClone(occ));
          }
        }
      }

      const occEnLow = occ.occupation.toLowerCase();
      const cleanOccPhrase = occEnLow.replace(/\s*\([^)]*\)\s*/g, " ").trim();
      const codeSet = new Set(
        [
          String(occ.anzsco_code_primary || ""),
          String(occ.anzsco_2022_code || ""),
          String(occ.anzsco_2013_code || ""),
        ].filter(Boolean)
      );
      const lists = occ.lists || [];
      const meta = {
        codes: codeSet,
        occEnLow,
        occKoLow: String(occ.title_ko || "").toLowerCase(),
        altLow: [...(occ.alternative_titles || []), ...(occ.specialisations || [])].join(" | ").toLowerCase(),
        ugLow: String(occ.unit_group_title || "").toLowerCase(),
        descLow: String(occ.abs_description || "").toLowerCase(),
        kwKoList: (occ.keywords_ko || []).map((k) => k.toLowerCase()),
        cleanOccPhrase,
        cleanOccRe:
          cleanOccPhrase.length >= 4
            ? unicodeWordBoundedRegex(escapeRegex(cleanOccPhrase))
            : null,
        tasksIndexed: (occ.abs_tasks || []).map((t) => [t.toLowerCase(), t]),
        tasksBlobLow: (occ.abs_tasks || []).join("\n").toLowerCase(),
        tieBoost:
          (lists.includes("MLTSSL") ? 2.5 : 0.0) +
          (lists.includes("CSOL") ? 1.5 : 0.0) +
          (POPULAR_PRIORITY_SET.has(occ.anzsco_code_primary) ? 6.0 : 0.0) +
          (occEnLow.includes("(general)") ? 4.0 : 0.0),
      };
      this._indexed.push([occ, meta]);
    }
  }

  getById(occId) {
    const clean = String(occId || "").trim();
    return this._byId.get(clean) ?? null;
  }

  getByCode(codeOrId) {
    const clean = String(codeOrId || "").trim();
    if (this._byId.has(clean)) return this._byId.get(clean);
    return this._byCode.get(clean) ?? null;
  }

  _matchesFilters(occ, listFilter, visaFilter, skillLevel) {
    if (listFilter) {
      const lf = String(listFilter).trim().toUpperCase();
      if (lf === "DAMA") {
        if ((occ.dama_count || 0) <= 0) return false;
      } else {
        const upLists = (occ.lists || []).map((x) => String(x).toUpperCase());
        if (!upLists.includes(lf)) return false;
      }
    }
    if (visaFilter) {
      const vf = String(visaFilter).trim();
      if (!(occ.visas_eligible || []).includes(vf)) return false;
    }
    if (skillLevel !== null && skillLevel !== undefined && skillLevel !== "") {
      if (occ.skill_level !== Number(skillLevel)) return false;
    }
    return true;
  }

  search(arg = "", listFilterArg = "", visaFilterArg = "", skillLevelArg = null, limitArg = 20) {
    let query = "";
    let list_filter = "";
    let visa_filter = "";
    let skill_level = null;
    let limit = 20;

    if (arg && typeof arg === "object" && !Array.isArray(arg)) {
      query = arg.query ?? "";
      list_filter = arg.list_filter ?? "";
      visa_filter = arg.visa_filter ?? "";
      skill_level = arg.skill_level ?? null;
      limit = arg.limit ?? 20;
    } else {
      query = arg ?? "";
      list_filter = listFilterArg ?? "";
      visa_filter = visaFilterArg ?? "";
      skill_level = skillLevelArg ?? null;
      limit = limitArg ?? 20;
    }

    const qClean = String(query || "").trim();
    const qLower = qClean.toLowerCase();

    const filteredPairs = this._indexed.filter(([occ]) =>
      this._matchesFilters(occ, list_filter, visa_filter, skill_level)
    );

    if (!qClean) {
      const priorityRank = new Map(POPULAR_PRIORITY_CODES.map((c, idx) => [c, idx]));
      const sortedDefault = filteredPairs
        .map(([occ]) => occ)
        .sort((a, b) => {
          const rA = priorityRank.get(a.anzsco_code_primary) ?? 999;
          const rB = priorityRank.get(b.anzsco_code_primary) ?? 999;
          if (rA !== rB) return rA - rB;
          const mA = (a.lists || []).includes("MLTSSL") ? 0 : 1;
          const mB = (b.lists || []).includes("MLTSSL") ? 0 : 1;
          if (mA !== mB) return mA - mB;
          const vDiff = (b.visas_eligible || []).length - (a.visas_eligible || []).length;
          if (vDiff !== 0) return vDiff;
          return a.occupation < b.occupation ? -1 : a.occupation > b.occupation ? 1 : 0;
        });

      const capLim = Math.max(1, Number(limit) || 20);
      const results = sortedDefault.slice(0, capLim).map((occ) => ({
        ...occ,
        match_score: priorityRank.has(occ.anzsco_code_primary) ? 100 : 60,
        matched_reasons_ko: ["호주 이민성 공식 SOL 등재 직종"],
        matched_reasons_en: ["Official Home Affairs SOL Occupation"],
        matched_tasks: (occ.abs_tasks || []).slice(0, 2),
      }));

      return {
        query: qClean,
        total_matches: filteredPairs.length,
        results,
        confusion_alerts: [],
      };
    }

    const tokens = tokenize(qClean);
    const koTokens = tokens.filter((t) => /[가-힣]/.test(t));
    const expandedEn = new Map();
    const setMaxWeight = (term, w) => {
      const prev = expandedEn.get(term) ?? 0.0;
      if (w > prev) expandedEn.set(term, w);
    };

    for (const tok of tokens) {
      if (/^[a-z0-9+#.-]+$/.test(tok)) {
        setMaxWeight(tok, 1.0);
        if (Object.prototype.hasOwnProperty.call(BILINGUAL_SIGNAL_MAP, tok)) {
          for (const enTerm of BILINGUAL_SIGNAL_MAP[tok]) {
            setMaxWeight(enTerm, 1.0);
          }
        }
      } else {
        for (const [trigger, mappedList] of KO_SIGNAL_TRIGGERS) {
          if (tok === trigger) {
            for (const enTerm of mappedList) setMaxWeight(enTerm, 1.0);
          } else if (tok.length >= 3 && trigger.length >= 3 && (tok.includes(trigger) || trigger.includes(tok))) {
            for (const enTerm of mappedList) setMaxWeight(enTerm, 0.75);
          }
        }
      }
    }

    for (const [trigger, mappedList] of KO_SIGNAL_TRIGGERS) {
      if (trigger.length >= 3 && qLower.includes(trigger)) {
        for (const enTerm of mappedList) setMaxWeight(enTerm, 1.0);
      }
    }
    for (const [_trigger, trigRe, mappedList] of ASCII_SIGNAL_TRIGGERS) {
      if (trigRe.test(qLower)) {
        for (const enTerm of mappedList) setMaxWeight(enTerm, 1.0);
      }
    }

    const compiledEn = [];
    for (const [enTerm, weight] of expandedEn.entries()) {
      compiledEn.push([
        enTerm,
        weight,
        enTerm.length >= 3,
        unicodeWordBoundedRegex(`${escapeRegex(enTerm)}(?:s|es|ing|ed|er|ers)?`),
      ]);
    }

    const scored = [];
    for (const [occ, meta] of filteredPairs) {
      let score = 0.0;
      const reasons = [];
      const reasonsEn = [];
      let matchedTasks = [];

      for (const tok of tokens) {
        if (meta.codes.has(tok)) {
          score += 140.0;
          reasons.push(`ANZSCO 직종코드(${tok}) 정확 일치`);
          reasonsEn.push(`Exact ANZSCO code match (${tok})`);
        } else if (/^\d{4,}$/.test(tok) && Array.from(meta.codes).some((c) => c.startsWith(tok))) {
          score += 65.0;
          reasons.push(`ANZSCO 직군 코드(${tok}xx) 일치`);
          reasonsEn.push(`ANZSCO unit group match (${tok}xx)`);
        }
      }

      if (qLower.length >= 2 && (qLower === meta.occEnLow || qLower === meta.occKoLow)) {
        score += 95.0;
        reasons.push("공식 영문/국문 직종명 완전 일치");
        reasonsEn.push("Exact official occupation title match");
      } else if (
        meta.cleanOccRe !== null &&
        qLower.includes(meta.cleanOccPhrase) &&
        meta.cleanOccRe.test(qLower)
      ) {
        score += 72.0;
        reasons.push("공식 영문 직종명 직접 일치");
        reasonsEn.push("Direct official occupation title match");
      } else if (qLower.length >= 2 && (meta.occEnLow.includes(qLower) || meta.occKoLow.includes(qLower))) {
        score += 55.0;
        reasons.push("직종명 직접 포함");
        reasonsEn.push("Occupation title contains search term");
      }

      const koHits = [];
      for (const tok of koTokens) {
        if (meta.occKoLow.includes(tok)) {
          score += 42.0;
          koHits.push(tok);
        } else if (
          meta.kwKoList.some(
            (kw) => tok === kw || (tok.length >= 3 && kw.length >= 3 && (kw.includes(tok) || tok.includes(kw)))
          )
        ) {
          score += 24.0;
          koHits.push(tok);
        }
      }
      if (koHits.length) {
        reasons.push(`한국어 직무·직종 키워드 매칭 (${koHits.slice(0, 4).join(", ")})`);
        reasonsEn.push("Bilingual role/duty keyword signal matched");
      }

      const titleEnHits = [];
      const altEnHits = [];
      let altPts = 0.0;
      let ugDescPts = 0.0;

      for (const [enTerm, weight, _ge3, patRe] of compiledEn) {
        if (meta.occEnLow.includes(enTerm) && patRe.test(meta.occEnLow)) {
          score += 36.0 * weight;
          titleEnHits.push(enTerm);
        } else if (meta.altLow.includes(enTerm) && patRe.test(meta.altLow)) {
          altPts += 18.0 * weight;
          altEnHits.push(enTerm);
        } else if (meta.ugLow.includes(enTerm) && patRe.test(meta.ugLow)) {
          ugDescPts += 10.0 * weight;
        } else if (meta.descLow.includes(enTerm) && patRe.test(meta.descLow)) {
          ugDescPts += 5.0 * weight;
        }
      }

      score += Math.min(36.0, altPts) + Math.min(22.0, ugDescPts);

      if (titleEnHits.length) {
        reasons.push(`영문 공식 직종명 핵심어 부합 (${titleEnHits.slice(0, 4).join(", ")})`);
        reasonsEn.push(`Official English title keyword match (${titleEnHits.slice(0, 4).join(", ")})`);
      } else if (altEnHits.length) {
        reasons.push(`대체 직함·세부 전공(Specialisation) 부합 (${altEnHits.slice(0, 3).join(", ")})`);
        reasonsEn.push(`Alternative title / specialisation match (${altEnHits.slice(0, 3).join(", ")})`);
      }

      const activeTaskTerms = compiledEn.filter(
        ([enTerm, _w, ge3]) => ge3 && meta.tasksBlobLow.includes(enTerm)
      );
      const taskScores = [];
      if (activeTaskTerms.length) {
        for (const [tLow, taskStr] of meta.tasksIndexed) {
          let tPts = 0.0;
          for (const [enTerm, weight, _ge3, patRe] of activeTaskTerms) {
            if (tLow.includes(enTerm) && patRe.test(tLow)) {
              tPts += 8.5 * weight;
            }
          }
          if (tPts > 0) {
            taskScores.push([tPts, taskStr]);
          }
        }
      }

      if (taskScores.length) {
        taskScores.sort((a, b) => b[0] - a[0]);
        const topTaskSum = taskScores.slice(0, 4).reduce((acc, [pts]) => acc + pts, 0.0);
        const taskBonus = Math.min(44.0, topTaskSum);
        score += taskBonus;
        matchedTasks = taskScores.slice(0, 3).map(([, t]) => t);
        reasons.push(`ABS 공식 직무(Task) ${taskScores.length}개 항목 부합`);
        reasonsEn.push(`Matches ${taskScores.length} official ABS ANZSCO task${taskScores.length !== 1 ? "s" : ""}`);
      }

      if (score >= 14.0) {
        const finalScore = pyRound1(score + meta.tieBoost);
        scored.push({
          ...occ,
          match_score: finalScore,
          matched_reasons_ko: reasons.length ? reasons : ["직무 연관성 매칭"],
          matched_reasons_en: reasonsEn.length ? reasonsEn : ["Related ANZSCO role/duty match"],
          matched_tasks: matchedTasks.length ? matchedTasks : (occ.abs_tasks || []).slice(0, 2),
        });
      }
    }

    scored.sort((a, b) => {
      if (b.match_score !== a.match_score) return b.match_score - a.match_score;
      return (b.visas_eligible || []).length - (a.visas_eligible || []).length;
    });

    const capLim = Math.max(1, Number(limit) || 20);
    const topResults = scored.slice(0, capLim);
    const topCodeSet = new Set(scored.slice(0, 5).map((r) => r.anzsco_code_primary));
    const alerts = this.confusionPairs.filter((grp) =>
      (grp.codes || []).some((c) => topCodeSet.has(c))
    );

    return {
      query: qClean,
      total_matches: scored.length,
      results: topResults,
      confusion_alerts: alerts,
    };
  }
}
