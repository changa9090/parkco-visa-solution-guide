export const BILINGUAL_SIGNAL_MAP = {
  // ICT & Software
  "개발자": ["software", "developer", "programmer", "code:0.75", "applications:0.75", "testing:0.5"],
  "프로그래머": ["programmer", "developer", "software", "code:0.75", "programs:0.75"],
  "풀스택": ["software", "developer", "programmer", "web", "applications:0.75", "design:0.5"],
  "백엔드": ["software", "developer", "programmer", "systems:0.75", "database:0.75", "architecture:0.75"],
  "프론트엔드": ["web", "developer", "software", "user:0.5", "interface:0.75", "applications:0.75"],
  "소프트웨어": ["software", "engineer", "developer", "programmer", "systems:0.75"],
  "소프트웨어엔지니어": ["software", "engineer", "developer:0.75", "systems:0.75"],
  "아키텍처": ["architecture", "software", "systems:0.75", "design:0.75", "specifications:0.75"],
  "설계": ["design", "specifications:0.75", "architecture:0.75", "planning:0.5"],
  "테스트": ["testing", "tester:0.75", "debugging:0.75", "diagnosing:0.75", "quality:0.75"],
  "테스팅": ["testing", "tester:0.75", "debugging:0.75", "quality:0.75"],
  "데이터": ["data", "database:0.75", "analytics:0.75", "analyst:0.75", "scientist:0.75", "statistical:0.75"],
  "데브옵스": ["devops", "cloud:0.75", "software:0.75", "systems:0.75", "engineer:0.75"],
  "화이트해커": ["penetration", "tester", "cyber:0.75", "security:0.75"],
  "모의해킹": ["penetration", "tester", "cyber:0.75", "security:0.75"],
  "사이버보안": ["cyber", "security", "ict:0.75", "specialist:0.75", "engineer:0.75", "analyst:0.75"],
  "정보보안": ["cyber", "security", "ict:0.75", "specialist:0.75"],
  "보안": ["cyber", "security", "network:0.75", "ict:0.75"],
  "클라우드": ["cloud", "devops:0.75", "systems:0.75", "network:0.75", "software:0.75"],
  "네트워크": ["network", "systems:0.75", "telecommunications:0.75", "ict:0.75"],
  "비즈니스분석": ["business", "analyst", "ict:0.75", "systems:0.75", "requirements:0.75"],
  react: ["software", "developer", "programmer", "web", "applications:0.75", "code:0.75"],
  python: ["software", "developer", "programmer", "data:0.75", "code:0.75", "testing:0.5"],
  typescript: ["software", "developer", "programmer", "web", "code:0.75"],
  javascript: ["software", "developer", "programmer", "web", "code:0.75"],
  java: ["software", "developer", "programmer", "applications:0.75", "code:0.75"],
  golang: ["software", "developer", "programmer", "systems:0.75"],
  aws: ["software", "systems:0.75", "cloud", "devops", "engineer:0.75"],
  kubernetes: ["devops", "software:0.75", "systems:0.75", "engineer:0.75"],
  api: ["software", "developer", "programmer", "applications:0.75", "systems:0.75", "design:0.5"],
  // Hospitality
  "셰프": ["chef", "cook:0.75", "menu:0.75", "kitchen:0.75", "food:0.5", "cost:0.5"],
  "주방장": ["chef", "cook:0.5", "kitchen:0.75", "menu:0.75", "supervising:0.5"],
  "요리사": ["chef", "cook", "food:0.5", "dishes:0.5", "kitchen:0.5", "menu:0.5"],
  "조리사": ["cook", "chef:0.75", "food:0.5", "dishes:0.5", "kitchen:0.5", "seasoning:0.5"],
  "쿡": ["cook", "chef:0.75", "food:0.5", "dishes:0.5", "seasoning:0.5"],
  "주방": ["kitchen", "chef:0.75", "cook:0.75", "food:0.5", "hygiene:0.5"],
  "메뉴": ["menu", "planning:0.5", "chef:0.75", "food:0.5"],
  "제빵": ["baker", "bread:0.75", "baking:0.75", "dough:0.75"],
  "제빵사": ["baker", "pastrycook:0.75", "bread:0.75", "baking:0.75"],
  "베이커": ["baker", "bread:0.75", "baking:0.75"],
  "파티시에": ["pastrycook", "pastry:0.75", "cakes:0.75", "desserts:0.75", "baker:0.5"],
  "제과": ["pastrycook", "pastry:0.75", "cakes:0.75", "baker:0.5"],
  "제과사": ["pastrycook", "pastry:0.75", "cakes:0.75", "baker:0.5"],
  "정육": ["butcher", "smallgoods:0.75", "meat:0.75"],
  "정육사": ["butcher", "smallgoods:0.75", "meat:0.75"],
  "카페": ["cafe", "restaurant:0.75", "manager:0.75", "hospitality:0.5"],
  "레스토랑": ["restaurant", "cafe:0.75", "chef:0.75", "cook:0.75", "hospitality:0.5"],
  "바리스타": ["cafe", "restaurant:0.75", "hospitality:0.5"],
  "점장": ["cafe:0.75", "restaurant:0.75", "retail:0.75", "manager"],
  // Accounting & Finance
  "회계사": ["accountant", "accounting:0.75", "financial:0.5", "statements:0.5", "taxation:0.75", "management:0.5"],
  "회계": ["accountant", "accounting:0.75", "financial:0.5", "statements:0.5", "budget:0.5"],
  "세무사": ["taxation", "accountant:0.75", "tax:0.75", "returns:0.75"],
  "세무": ["taxation", "accountant:0.75", "tax:0.75", "returns:0.75"],
  "재무제표": ["financial:0.75", "statements:0.75", "accountant", "accounting:0.75", "reporting:0.5"],
  "결산": ["financial:0.75", "statements:0.75", "accountant:0.75", "budget:0.5", "audit:0.5"],
  "감사": ["auditor", "audit:0.75", "financial:0.5", "internal:0.75", "external:0.75"],
  "기장": ["accountant", "accounting:0.75", "financial:0.5"],
  "보험계리사": ["actuary", "actuarial:0.75"],
  // Trades & Construction
  "타일": ["tiler", "tile:0.75", "wall:0.75", "floor:0.75", "waterproofing:0.75", "laying:0.5"],
  "타일러": ["tiler", "wall:0.75", "floor:0.75", "tile:0.75"],
  "방수": ["waterproofing", "tiler:0.75", "tile:0.75", "surfaces:0.5", "cement:0.5"],
  "욕실": ["tiler:0.75", "tile:0.75", "plumber:0.75", "wall:0.75", "floor:0.75"],
  "리노베이션": ["tiler:0.75", "carpenter:0.75", "renovation:0.75", "wall:0.5", "floor:0.5"],
  "용접사": ["welder", "first:0.75", "class:0.75", "welding:0.75", "metal:0.75", "fabricator:0.75"],
  "용접": ["welder", "welding:0.75", "metal:0.75", "fabricator:0.75", "joints:0.5"],
  "웰더": ["welder", "welding:0.75", "metal:0.75"],
  "제관": ["metal", "fabricator", "structural:0.75", "steel:0.75", "welding:0.75"],
  "제관사": ["metal", "fabricator", "welder:0.75"],
  "피터": ["fitter", "turner:0.75", "machinist:0.75", "metal:0.5"],
  "판금": ["panelbeater", "sheetmetal", "metal:0.5", "vehicle:0.5"],
  "패널비터": ["panelbeater", "vehicle:0.75", "body:0.75"],
  "목수": ["carpenter", "joiner:0.75", "timber:0.75", "framing:0.75", "wood:0.5"],
  "카펜터": ["carpenter", "joiner:0.75", "timber:0.75", "wood:0.5"],
  "캐비닛메이커": ["cabinetmaker", "cabinet:0.75", "furniture:0.75"],
  "가구제작": ["cabinetmaker", "furniture", "cabinet:0.75", "wood:0.5"],
  "배관공": ["plumber", "plumbing:0.75", "pipe:0.75", "drainage:0.75", "gasfitter:0.75"],
  "배관": ["plumber", "plumbing:0.75", "pipe:0.75", "drainage:0.75", "gas:0.5"],
  "플러머": ["plumber", "pipe:0.75", "drainage:0.75"],
  "전기기사": ["electrician", "electrical:0.75", "wiring:0.75", "circuit:0.75"],
  "전기": ["electrician", "electrical:0.75", "wiring:0.75", "circuit:0.75"],
  "일렉트리션": ["electrician", "electrical:0.75", "wiring:0.75"],
  "에어컨": ["airconditioning", "refrigeration", "mechanic:0.75", "plumber:0.5"],
  "냉동공조": ["airconditioning", "refrigeration", "mechanic:0.75"],
  "정비": ["mechanic", "motor:0.75", "engine:0.75", "vehicle:0.75", "diesel:0.75", "repairing:0.5"],
  "자동차정비사": ["motor", "mechanic", "diesel:0.75", "automotive:0.75", "vehicle:0.75"],
  "미케닉": ["mechanic", "motor:0.75", "vehicle:0.75", "engine:0.75"],
  "항공정비사": ["aircraft", "maintenance", "engineer:0.75", "avionics:0.75"],
  "조적": ["bricklayer", "brick:0.75", "mortar:0.75"],
  "벽돌공": ["bricklayer", "brick:0.75"],
  "미장": ["plasterer", "plaster:0.75", "plasterboard:0.75", "renderer:0.75"],
  "도장": ["painter", "painting:0.75", "vehicle:0.5", "surface:0.5"],
  "페인터": ["painter", "painting:0.75"],
  "토목": ["civil", "engineer:0.75", "engineering:0.75", "structural:0.75", "construction:0.5"],
  "적산": ["quantity", "surveyor", "cost:0.75", "construction:0.5", "estimate:0.75"],
  "적산사": ["quantity", "surveyor", "estimator:0.75"],
  "측량사": ["surveyor", "surveying:0.75", "spatial:0.75"],
  "건축": ["architect", "architectural:0.75", "construction:0.5", "building:0.5"],
  "건축가": ["architect", "landscape:0.75", "architectural:0.75"],
  "제도사": ["draftsperson", "architectural:0.75", "civil:0.75", "mechanical:0.75", "electrical:0.75"],
  "현장소장": ["construction", "project", "manager", "building:0.75", "site:0.5"],
  // Healthcare, Medical, Education, Legal & Social
  "의사": ["practitioner", "physician:0.75", "resident:0.75", "surgeon:0.75", "medical:0.75", "specialist:0.5"],
  "일반의": ["general", "practitioner", "medical:0.75", "physician:0.75"],
  "전공의": ["resident", "medical", "officer"],
  "전문의": ["specialist", "physician", "surgeon:0.75", "medical:0.75"],
  "외과의사": ["surgeon", "surgical:0.75"],
  "내과의사": ["physician", "practitioner:0.75", "internal:0.75"],
  "소아과의사": ["paediatrician", "paediatric:0.75"],
  "정신과의사": ["psychiatrist", "psychiatric:0.75"],
  "산부인과의사": ["obstetrician", "gynaecologist"],
  "안과의사": ["ophthalmologist", "eye:0.75"],
  "피부과의사": ["dermatologist", "skin:0.75"],
  "마취과의사": ["anaesthetist", "anaesthetic:0.75"],
  "치과의사": ["dentist", "dental:0.75"],
  "치과": ["dentist", "dental"],
  "치위생사": ["dental", "hygienist"],
  "치기공사": ["dental", "technician", "prosthetist:0.75"],
  "수의사": ["veterinarian", "veterinary:0.75"],
  "한의사": ["traditional", "chinese", "medicine", "acupuncturist:0.75"],
  "침구사": ["acupuncturist", "traditional:0.75", "chinese:0.75"],
  "간호사": ["registered", "nurse", "nursing:0.75", "enrolled:0.75", "patient:0.5", "care:0.5"],
  "정규간호사": ["registered", "nurse", "nursing:0.75"],
  rn: ["registered", "nurse", "nursing:0.75", "patient:0.5"],
  "준간호사": ["enrolled", "nurse", "nursing:0.75"],
  "조산사": ["midwife", "midwifery:0.75"],
  "임상병리사": ["medical", "laboratory", "scientist", "technician:0.75", "pathology:0.75"],
  "임상병리": ["medical", "laboratory", "scientist", "technician:0.75", "pathology:0.75"],
  "방사선사": ["radiographer", "diagnostic:0.75", "radiation:0.75", "medical:0.5"],
  "초음파사": ["sonographer", "ultrasound:0.75"],
  "검안사": ["optometrist", "orthoptist:0.75"],
  "안경사": ["optical", "dispenser", "optometrist:0.75"],
  "병동": ["nurse", "nursing:0.75", "patient:0.5", "hospital:0.5", "ward:0.75", "clinical:0.5"],
  "환자": ["patient:0.75", "nursing:0.75", "care:0.5", "treatment:0.5", "assessing:0.5"],
  "케어": ["care:0.75", "nursing:0.75", "patient:0.5", "aged:0.75", "disabled:0.75"],
  "노인요양": ["aged", "care:0.75", "nurse:0.75", "nursing:0.75", "disabled:0.5"],
  "에이지드케어": ["aged", "care:0.75", "nurse:0.75"],
  "유아교사": ["early", "childhood", "pre-primary:0.75", "teacher", "children:0.5"],
  "유아교육교사": ["early", "childhood", "pre-primary:0.75", "teacher"],
  "유치원": ["early", "childhood", "pre-primary:0.75", "teacher", "children:0.5"],
  "어린이집": ["child", "care", "worker:0.75", "centre:0.75", "early:0.75", "childhood:0.75"],
  "보육교사": ["child", "care", "worker", "early:0.75", "childhood:0.75", "teacher:0.75"],
  "보육": ["child", "care", "worker:0.75", "early:0.75", "childhood:0.75", "children:0.5"],
  "중등교사": ["secondary", "school", "teacher", "middle:0.75", "teaching:0.5"],
  "초등교사": ["primary", "school", "teacher", "teaching:0.5"],
  "특수교사": ["special", "needs", "education", "teacher"],
  "교사": ["teacher", "school:0.75", "secondary:0.75", "primary:0.75", "early:0.75", "teaching:0.5"],
  "사회복지": ["social", "worker", "welfare:0.75", "community:0.75"],
  "사회복지사": ["social", "worker", "welfare:0.75", "community:0.75"],
  "상담사": ["counsellor", "psychologist:0.75", "psychotherapist:0.75"],
  "심리상담사": ["clinical", "psychologist", "counsellor:0.75", "psychotherapist:0.75"],
  "물리치료": ["physiotherapist", "physical:0.75", "rehabilitation:0.5"],
  "물리치료사": ["physiotherapist", "rehabilitation:0.5"],
  "작업치료": ["occupational", "therapist", "rehabilitation:0.5"],
  "작업치료사": ["occupational", "therapist", "rehabilitation:0.5"],
  "언어치료사": ["speech", "pathologist"],
  "카이로프랙터": ["chiropractor", "osteopath:0.75"],
  "약사": ["pharmacist", "hospital:0.75", "retail:0.75", "industrial:0.5", "medication:0.5"],
  "변호사": ["solicitor", "barrister:0.75", "lawyer:0.75", "legal:0.5", "law:0.5"],
  "사무변호사": ["solicitor", "legal:0.5", "law:0.5"],
  "솔리시터": ["solicitor", "legal:0.5"],
  "법정변호사": ["barrister", "court:0.5", "legal:0.5"],
  "배리스터": ["barrister", "court:0.5", "legal:0.5"],
  "특허변호사": ["intellectual", "property", "lawyer", "patent:0.75"],
  "지식재산권변호사": ["intellectual", "property", "lawyer", "patent:0.75"],
  "이민법무사": ["migration", "agent", "immigration:0.75"],
  "통역사": ["interpreter", "translator:0.75"],
  "번역가": ["translator", "interpreter:0.75"],
  "번역사": ["translator", "interpreter:0.75"],
  // Business, Marketing, Design & Other
  "마케터": ["marketing", "specialist", "advertising:0.75", "campaign:0.5", "market:0.5"],
  "마케팅": ["marketing", "specialist", "market:0.75", "campaign:0.5", "brand:0.5"],
  "광고기획": ["advertising", "specialist", "campaign:0.75", "marketing:0.75"],
  "홍보": ["public", "relations", "communication:0.5", "media:0.5"],
  "그래픽": ["graphic", "designer", "visual:0.75", "design:0.75", "multimedia:0.75"],
  "디자이너": ["designer", "graphic:0.75", "web:0.75", "industrial:0.75", "interior:0.75", "fashion:0.75"],
  "인테리어": ["interior", "designer", "decorator:0.75"],
  "인사": ["human", "resource", "recruitment:0.75", "workplace:0.75"],
  "채용": ["recruitment", "consultant", "human:0.75", "resource:0.75"],
  "경영컨설턴트": ["management", "consultant", "organisation:0.75"],
  "물류": ["supply", "distribution", "procurement:0.75", "logistics:0.75", "chain:0.75"],
  "미용사": ["hairdresser", "beauty:0.75", "hair:0.75", "cutting:0.5"],
  "피부관리사": ["beauty", "therapist", "skin:0.75"],
  "뷰티테라피스트": ["beauty", "therapist"],
  "조경": ["landscape", "gardener", "architect:0.75", "arborist:0.75"],
  "가드너": ["gardener", "landscape:0.75", "nurseryperson:0.5"],
  "플로리스트": ["florist", "flower:0.75"],
  "공인중개사": ["real", "estate", "agent", "principal:0.75", "property:0.75"],
  "부동산": ["real", "estate", "property", "manager:0.75", "agent:0.75", "conveyancer:0.75"],
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

function parseSignalTerm(rawEntry) {
  const idx = rawEntry.indexOf(":");
  if (idx !== -1) {
    return [rawEntry.slice(0, idx), Number(rawEntry.slice(idx + 1))];
  }
  return [rawEntry, 1.0];
}

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
  const parsedList = mapped.map(parseSignalTerm);
  if (/[가-힣]/.test(trig)) {
    KO_SIGNAL_TRIGGERS.push([trig, parsedList]);
  } else {
    ASCII_SIGNAL_TRIGGERS.push([trig, unicodeWordBoundedRegex(escapeRegex(trig)), parsedList]);
  }
}

export function tokenize(text) {
  const raw = String(text || "").toLowerCase().match(/[0-9]{4,6}|[a-zA-Z][a-zA-Z0-9+#.-]{1,}|[가-힣]{2,}|쿡/g) || [];
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
      const occKoLow = String(occ.title_ko || "").toLowerCase();
      const occKoNoSpace = occKoLow.replace(/\s+/g, "");
      const occKoParts = occKoLow
        .split(/[()/·,]/)
        .map((p) => p.replace(/\s+/g, ""))
        .filter(Boolean);
      const occKoPrimary = occKoParts.length > 0 ? occKoParts[0] : occKoNoSpace;
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
        occKoLow,
        occKoNoSpace,
        occKoParts,
        occKoPrimary,
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

    const qNoSpace = qLower.replace(/\s+/g, "");
    const hasKoQuery = /[가-힣]/.test(qLower);
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
          for (const rawEntry of BILINGUAL_SIGNAL_MAP[tok]) {
            const [enTerm, w] = parseSignalTerm(rawEntry);
            setMaxWeight(enTerm, w);
          }
        }
      } else {
        for (const [trigger, mappedList] of KO_SIGNAL_TRIGGERS) {
          if (tok === trigger) {
            for (const [enTerm, w] of mappedList) setMaxWeight(enTerm, w);
          } else if (tok.length >= 3 && trigger.length >= 3 && tok.includes(trigger)) {
            for (const [enTerm, w] of mappedList) {
              const subW = w >= 1.0 ? 0.75 : 0.5;
              setMaxWeight(enTerm, subW);
            }
          }
        }
      }
    }

    for (const [trigger, mappedList] of KO_SIGNAL_TRIGGERS) {
      if (trigger.length >= 3 && (qLower.includes(trigger) || qNoSpace.includes(trigger))) {
        for (const [enTerm, w] of mappedList) setMaxWeight(enTerm, w);
      }
    }
    for (const [_trigger, trigRe, mappedList] of ASCII_SIGNAL_TRIGGERS) {
      if (trigRe.test(qLower)) {
        for (const [enTerm, w] of mappedList) setMaxWeight(enTerm, w);
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

      let koTitleContains = false;
      if (hasKoQuery && qNoSpace.length >= 2) {
        if (qNoSpace === "의사") {
          koTitleContains = /(?<![가-힣])의사/.test(meta.occKoLow);
        } else {
          koTitleContains = meta.occKoLow.includes(qLower) || meta.occKoNoSpace.includes(qNoSpace);
        }
      }

      if (
        qLower.length >= 2 &&
        (qLower === meta.occEnLow ||
          qLower === meta.occKoLow ||
          (hasKoQuery && qNoSpace === meta.occKoPrimary))
      ) {
        score += 95.0;
        reasons.push("공식 영문/국문 직종명 완전 일치");
        reasonsEn.push("Exact official occupation title match");
      } else if (hasKoQuery && qNoSpace.length >= 1 && meta.occKoParts.includes(qNoSpace)) {
        score += 80.0;
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
      } else if (qLower.length >= 2 && (meta.occEnLow.includes(qLower) || koTitleContains)) {
        score += 55.0;
        reasons.push("직종명 직접 포함");
        reasonsEn.push("Occupation title contains search term");
      }

      const koHits = [];
      for (const tok of koTokens) {
        const tokInKoTitle =
          tok === "의사"
            ? /(?<![가-힣])의사/.test(meta.occKoLow)
            : meta.occKoLow.includes(tok) || meta.occKoNoSpace.includes(tok);
        if (tokInKoTitle) {
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
