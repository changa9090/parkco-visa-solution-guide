import { pyRound1 } from "./occupation_matcher.mjs";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_DOCX_XML_BYTES = 25 * 1024 * 1024; // 25 MB uncompressed XML guard
export const ALLOWED_EXTENSIONS = new Set([".pdf", ".docx", ".txt", ".md"]);

export const PRIVACY_NOTICE_KO =
  "업로드하신 이력서는 외부 유료 AI API로 전송되거나 서버 디스크에 저장되지 않고, " +
  "로컬 메모리 내에서 즉시 분석 후 폐기돼요.";

export const PRIVACY_NOTICE_EN =
  "Your resume is processed strictly in ephemeral local memory—never sent to paid external AI APIs " +
  "or stored on server disk.";

const MONTH_MAP = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

const EDUCATION_SECTION_HEADERS =
  /^\s*(?:#+\s*)?(?:education|academic\s+background|qualifications?|학력|학력사항|교육사항)\s*:?\s*$/i;
const WORK_SECTION_HEADERS =
  /^\s*(?:#+\s*)?(?:work\s+experience|professional\s+experience|employment(?:\s+history)?|experience|career|경력|경력사항|근무경력|주요경력)\s*:?\s*$/i;
const OTHER_SECTION_HEADERS =
  /^\s*(?:#+\s*)?(?:skills?|certifications?|registration\s*&?\s*language|licenses?|languages?|projects?|references?|자격증|어학|기술스택|수상)\s*:?\s*$/i;

const EDUCATION_LINE_MARKERS =
  /(?<![\p{L}\p{N}_])(?:university|college|tafe|cricos|bachelor|master\s+of|phd|doctor\s+of|diploma\s+of|certificate\s+(?:iii|iv)|high\s+school)(?![\p{L}\p{N}_])|(?:대학교|대학원|전문대학|학사|석사|박사|졸업|입학|수료)/iu;

const AU_STUDY_PATTERNS =
  /(?<![\p{L}\p{N}_])(?:university\s+of\s+queensland|uq|qut|queensland\s+university\s+of\s+technology|griffith\s+university|university\s+of\s+sydney|unsw|university\s+of\s+new\s+south\s+wales|uts|macquarie\s+university|university\s+of\s+melbourne|monash\s+university|rmit|deakin\s+university|swinburne|la\s+trobe|university\s+of\s+western\s+australia|uwa|curtin\s+university|murdoch|university\s+of\s+adelaide|flinders\s+university|unisa|australian\s+national\s+university|anu|university\s+of\s+tasmania|charles\s+darwin\s+university|bond\s+university|torrens\s+university|tafe\s+(?:nsw|qld|queensland|victoria|sa|wa)|cricos)(?![\p{L}\p{N}_])|(?:호주\s*(?:대학교|대학원|유학|학위)|퀸즐랜드\s*대학교|시드니\s*대학교|멜버른\s*대학교|모나쉬)/iu;

const AU_WORK_PATTERNS =
  /(?<![\p{L}\p{N}_])(?:pty\s+ltd|sydney|melbourne|brisbane|perth|adelaide|gold\s+coast|canberra|hobart|darwin|nsw|qld|queensland|victoria|vic|wa|sa|tas|act|nt|abn|tfn)(?![\p{L}\p{N}_])|(?:시드니|멜버른|브리즈번|퍼스|애들레이드|골드코스트|캔버라|퀸즐랜드)/iu;

const OVERSEAS_WORK_PATTERNS =
  /(?<![\p{L}\p{N}_])(?:korea|seoul|busan|incheon|singapore|tokyo|london)(?![\p{L}\p{N}_])|(?:대한민국|한국|서울|부산|인천|경기|대전|대구)/iu;

const DATE_SPAN_SOURCE =
  "(?<start>" +
  "(?:19|20)\\d{2}\\s*(?:[./-]|년)\\s*\\d{1,2}\\s*월?" +
  "|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?\\s+(?:19|20)\\d{2}" +
  "|(?:19|20)\\d{2}년?" +
  ")" +
  "\\s*(?:[-–—~]|to|부터)\\s*" +
  "(?<end>" +
  "(?:19|20)\\d{2}\\s*(?:[./-]|년)\\s*\\d{1,2}\\s*월?" +
  "|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?\\s+(?:19|20)\\d{2}" +
  "|Present|Current|Now|재직중|재직|현재" +
  "|(?:19|20)\\d{2}년?" +
  ")";

const DATE_SPAN_SINGLE_RE = new RegExp(DATE_SPAN_SOURCE, "iu");

export class ResumeValidationError extends Error {
  constructor(messageKo, statusCode = 400, messageEn = null, lang = "ko") {
    const resolvedEn = messageEn || messageKo;
    const isEn = String(lang || "").toLowerCase().startsWith("en");
    super(isEn ? resolvedEn : messageKo);
    this.name = "ResumeValidationError";
    this.messageKo = messageKo;
    this.messageEn = resolvedEn;
    this.statusCode = statusCode;
  }

  getMessage(lang = "ko") {
    return String(lang || "").toLowerCase().startsWith("en") ? this.messageEn : this.messageKo;
  }
}

function getExtension(filename) {
  const clean = String(filename || "").trim();
  const idx = clean.lastIndexOf(".");
  if (idx <= 0 || idx === clean.length - 1) return "";
  return clean.slice(idx).toLowerCase();
}

function isAllWhitespaceBytes(u8) {
  if (!u8 || u8.length === 0) return true;
  for (let i = 0; i < u8.length; i++) {
    const b = u8[i];
    if (b !== 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0b && b !== 0x0c && b !== 0x0d) {
      return false;
    }
  }
  return true;
}

function decodeTextBytes(u8) {
  for (const label of ["utf-8", "euc-kr", "iso-8859-1"]) {
    try {
      const dec = new TextDecoder(label, { fatal: label !== "iso-8859-1" });
      let str = dec.decode(u8);
      if (str.charCodeAt(0) === 0xfeff) {
        str = str.slice(1);
      }
      return str;
    } catch {
      // Try next encoding
    }
  }
  return new TextDecoder("utf-8").decode(u8);
}

/* ---------------- Zero-Dependency PKZIP + OOXML DOCX Extractor ---------------- */

async function inflateRawBytes(compressedU8) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("DecompressionStream unavailable");
  }
  const ds = new DecompressionStream("deflate-raw");
  const writer = ds.writable.getWriter();
  const writePromise = writer.write(compressedU8).then(() => writer.close());
  const outBuf = await new Response(ds.readable).arrayBuffer();
  await writePromise;
  return new Uint8Array(outBuf);
}

async function readDocxDocumentXmlBytes(u8, lang) {
  if (u8.length < 22) {
    throw new Error("Archive too short");
  }
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

  // Locate End of Central Directory (0x06054b50) scanning backward up to 65 KB comment window
  let eocdPos = -1;
  const minPos = Math.max(0, u8.length - 65557);
  for (let p = u8.length - 22; p >= minPos; p--) {
    if (dv.getUint32(p, true) === 0x06054b50) {
      eocdPos = p;
      break;
    }
  }
  if (eocdPos < 0) {
    throw new Error("Missing PKZIP EOCD");
  }

  const totalEntries = dv.getUint16(eocdPos + 10, true);
  const cdOffset = dv.getUint32(eocdPos + 16, true);
  if (cdOffset >= u8.length) {
    throw new Error("Invalid Central Directory offset");
  }

  let ptr = cdOffset;
  let docEntry = null;
  const utf8Dec = new TextDecoder("utf-8");

  for (let i = 0; i < totalEntries && ptr + 46 <= u8.length; i++) {
    if (dv.getUint32(ptr, true) !== 0x02014b50) {
      throw new Error("Corrupted Central Directory entry");
    }
    const method = dv.getUint16(ptr + 10, true);
    const compSize = dv.getUint32(ptr + 20, true);
    const uncompSize = dv.getUint32(ptr + 24, true);
    const nameLen = dv.getUint16(ptr + 28, true);
    const extraLen = dv.getUint16(ptr + 30, true);
    const commentLen = dv.getUint16(ptr + 32, true);
    const localHeaderOffset = dv.getUint32(ptr + 42, true);

    if (ptr + 46 + nameLen > u8.length) {
      throw new Error("Truncated Central Directory filename");
    }
    const entryName = utf8Dec.decode(u8.subarray(ptr + 46, ptr + 46 + nameLen));
    if (entryName === "word/document.xml") {
      docEntry = { method, compSize, uncompSize, localHeaderOffset };
      break;
    }
    ptr += 46 + nameLen + extraLen + commentLen;
  }

  if (!docEntry) {
    throw new ResumeValidationError(
      "올바른 Word(.docx) 문서 구조가 아니에요. 파일을 다시 저장하거나 텍스트 붙여넣기를 이용해 주세요.",
      422,
      "Invalid Word (.docx) document structure. Please re-save your file or paste your resume text directly.",
      lang
    );
  }

  if (docEntry.uncompSize > MAX_DOCX_XML_BYTES) {
    throw new ResumeValidationError(
      "압축 해제된 문서 크기가 허용 한도를 초과했어요.",
      413,
      "Uncompressed document XML exceeds the maximum safety limit.",
      lang
    );
  }

  const lh = docEntry.localHeaderOffset;
  if (lh + 30 > u8.length || dv.getUint32(lh, true) !== 0x04034b50) {
    throw new Error("Invalid local file header");
  }
  const lhNameLen = dv.getUint16(lh + 26, true);
  const lhExtraLen = dv.getUint16(lh + 28, true);
  const dataStart = lh + 30 + lhNameLen + lhExtraLen;
  const dataEnd = dataStart + docEntry.compSize;
  if (dataEnd > u8.length) {
    throw new Error("Truncated DOCX compressed payload");
  }

  const slice = u8.subarray(dataStart, dataEnd);
  let xmlBytes;
  if (docEntry.method === 0) {
    xmlBytes = slice;
  } else if (docEntry.method === 8) {
    xmlBytes = await inflateRawBytes(slice);
  } else {
    throw new Error(`Unsupported ZIP method ${docEntry.method}`);
  }

  if (xmlBytes.length > MAX_DOCX_XML_BYTES) {
    throw new ResumeValidationError(
      "압축 해제된 문서 크기가 허용 한도를 초과했어요.",
      413,
      "Uncompressed document XML exceeds the maximum safety limit.",
      lang
    );
  }
  return xmlBytes;
}

function decodeXmlEntities(str) {
  return str.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (_m, ent) => {
    if (ent === "amp") return "&";
    if (ent === "lt") return "<";
    if (ent === "gt") return ">";
    if (ent === "quot") return '"';
    if (ent === "apos") return "'";
    if (ent.startsWith("#x")) return String.fromCodePoint(parseInt(ent.slice(2), 16));
    if (ent.startsWith("#")) return String.fromCodePoint(parseInt(ent.slice(1), 10));
    return _m;
  });
}

function parseStrictXmlTree(xmlStr) {
  const root = { tag: "#root", children: [], text: "" };
  const stack = [root];
  const tokenRe = /<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[([\s\S]*?)\]\]>|<!DOCTYPE[^>]*>|<(\/?)([A-Za-z_][\w:.-]*)([^>]*?)(\/?)>|([^<]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRe.exec(xmlStr)) !== null) {
    if (match.index !== lastIndex) {
      throw new Error("Malformed XML token");
    }
    lastIndex = tokenRe.lastIndex;

    if (match[1] !== undefined) {
      stack[stack.length - 1].children.push({ tag: "#text", text: match[1], children: [] });
    } else if (match[3] !== undefined) {
      const isClose = match[2] === "/";
      const rawTag = match[3];
      const localTag = rawTag.includes(":") ? rawTag.split(":").pop() : rawTag;
      const isSelfClose = match[5] === "/" || /\s\/$/.test(match[4]);

      if (isClose) {
        if (stack.length <= 1) throw new Error("Unexpected closing XML tag");
        const top = stack.pop();
        if (top.rawTag !== rawTag) {
          throw new Error(`Mismatched XML tag: expected </${top.rawTag}>, got </${rawTag}>`);
        }
      } else {
        const node = { rawTag, tag: localTag, children: [], text: "" };
        stack[stack.length - 1].children.push(node);
        if (!isSelfClose) {
          stack.push(node);
        }
      }
    } else if (match[6] !== undefined) {
      stack[stack.length - 1].children.push({
        tag: "#text",
        text: decodeXmlEntities(match[6]),
        children: [],
      });
    }
  }

  if (lastIndex !== xmlStr.length || stack.length !== 1) {
    throw new Error("Unclosed or truncated XML document");
  }
  const docEl = root.children.find((c) => c.tag !== "#text");
  if (!docEl) throw new Error("Empty XML document");
  return docEl;
}

export function extractDocxXmlText(xmlStr) {
  const docRoot = parseStrictXmlTree(xmlStr);
  const bodyElem = docRoot.children.find((c) => c.tag === "body") || docRoot;

  function collectParagraphText(pNode) {
    const runs = [];
    function walk(n) {
      if (n.tag === "t") {
        for (const ch of n.children) {
          if (ch.tag === "#text" && ch.text) runs.push(ch.text);
        }
        return;
      }
      for (const ch of n.children || []) walk(ch);
    }
    walk(pNode);
    return runs.join("").trim();
  }

  function walkAllByTag(node, targetTag, out = []) {
    if (node.tag === targetTag) {
      out.push(node);
    }
    for (const ch of node.children || []) {
      walkAllByTag(ch, targetTag, out);
    }
    return out;
  }

  const paragraphs = [];
  for (const child of bodyElem.children || []) {
    if (child.tag === "p") {
      const ptxt = collectParagraphText(child);
      if (ptxt) paragraphs.push(ptxt);
    } else if (child.tag === "tbl") {
      const trNodes = walkAllByTag(child, "tr");
      for (const tr of trNodes) {
        const cellTexts = [];
        for (const tc of tr.children || []) {
          if (tc.tag === "tc") {
            const pNodes = walkAllByTag(tc, "p");
            const tcJoined = pNodes
              .map((pEl) => collectParagraphText(pEl))
              .filter(Boolean)
              .join(" ");
            if (tcJoined) cellTexts.push(tcJoined);
          }
        }
        if (cellTexts.length) {
          paragraphs.push(cellTexts.join(" | "));
        }
      }
    } else if (child.tag !== "#text") {
      for (const pEl of walkAllByTag(child, "p")) {
        const ptxt = collectParagraphText(pEl);
        if (ptxt) paragraphs.push(ptxt);
      }
    }
  }
  return paragraphs.filter(Boolean).join("\n");
}

/* ---------------- Lazy-Loaded pdf.js + Multi-Column Coordinate Clustering ---------------- */

let _pdfjsModulePromise = null;

async function loadPdfJsLazy() {
  if (!_pdfjsModulePromise) {
    _pdfjsModulePromise = import(new URL("../vendor/pdfjs/pdf.min.mjs", import.meta.url).href).then((mod) => {
      if (mod.GlobalWorkerOptions) {
        mod.GlobalWorkerOptions.workerSrc = new URL("../vendor/pdfjs/pdf.worker.min.mjs", import.meta.url).href;
      }
      return mod;
    });
  }
  return _pdfjsModulePromise;
}

function assembleLinesFromItems(items) {
  if (!items.length) return [];
  const sorted = [...items].sort((a, b) => {
    const tolY = Math.max(3.5, Math.min(a.h, b.h) * 0.45);
    if (Math.abs(a.y - b.y) > tolY) {
      return b.y - a.y; // top to bottom
    }
    return a.x - b.x; // left to right
  });

  const rows = [];
  for (const it of sorted) {
    const lastRow = rows[rows.length - 1];
    if (!lastRow) {
      rows.push({ ySum: it.y, count: 1, hMax: it.h, items: [it] });
      continue;
    }
    const rowY = lastRow.ySum / lastRow.count;
    const tolY = Math.max(3.5, Math.min(lastRow.hMax, it.h) * 0.45);
    if (Math.abs(it.y - rowY) <= tolY) {
      lastRow.items.push(it);
      lastRow.ySum += it.y;
      lastRow.count += 1;
      lastRow.hMax = Math.max(lastRow.hMax, it.h);
    } else {
      rows.push({ ySum: it.y, count: 1, hMax: it.h, items: [it] });
    }
  }

  const lines = [];
  for (const row of rows) {
    row.items.sort((a, b) => a.x - b.x);
    let buf = "";
    let prevEnd = null;
    let prevH = 10;
    for (const seg of row.items) {
      const txt = seg.str;
      if (!txt) continue;
      if (prevEnd !== null) {
        const gap = seg.x - prevEnd;
        if (gap > prevH * 2.4) {
          buf += " | ";
        } else if (gap > prevH * 0.14 && !buf.endsWith(" ") && !txt.startsWith(" ")) {
          buf += " ";
        }
      }
      buf += txt;
      prevEnd = seg.x + seg.w;
      prevH = seg.h;
    }
    const clean = buf.trim();
    if (clean) lines.push(clean);
  }
  return lines;
}

export function clusterPdfTextItems(rawItems, pageWidth = 612) {
  const norm = [];
  for (const it of rawItems || []) {
    const str = String(it?.str ?? "");
    if (!str.trim()) continue;
    const tr = it.transform || [10, 0, 0, 10, 0, 0];
    const x = Number(tr[4]) || 0;
    const y = Number(tr[5]) || 0;
    const h = Math.max(8, Math.abs(Number(tr[3]) || Number(tr[0]) || it.height || 10));
    const w = Number(it.width) > 0 ? Number(it.width) : str.length * h * 0.48;
    norm.push({ str, x, y, w, h });
  }
  if (!norm.length) return "";

  // Detect genuine 2-column resume layout via empty vertical gutter analysis
  const narrow = norm.filter((it) => it.w <= pageWidth * 0.54);
  const wide = norm.filter((it) => it.w > pageWidth * 0.54);

  let bestGutter = null;
  const minG = Math.round(pageWidth * 0.24);
  const maxG = Math.round(pageWidth * 0.72);
  for (let gx = minG; gx <= maxG; gx += 4) {
    const crossing = narrow.some((it) => it.x < gx - 6 && it.x + it.w > gx + 6);
    if (crossing) continue;
    const left = narrow.filter((it) => it.x + it.w <= gx + 6);
    const right = narrow.filter((it) => it.x >= gx - 6);
    if (left.length < 3 || right.length < 3) continue;

    // Count distinct Y bands present in both columns simultaneously
    let sharedBands = 0;
    for (const lItem of left) {
      if (right.some((rItem) => Math.abs(rItem.y - lItem.y) <= Math.max(6, lItem.h * 0.8))) {
        sharedBands += 1;
      }
    }
    const hasColSectionHeader = [...left, ...right].some((it) => {
      const t = it.str.trim();
      return EDUCATION_SECTION_HEADERS.test(t) || WORK_SECTION_HEADERS.test(t) || OTHER_SECTION_HEADERS.test(t);
    });
    if (sharedBands >= 4 || (sharedBands >= 2 && hasColSectionHeader)) {
      const score = Math.min(left.length, right.length) * 10 + sharedBands;
      if (!bestGutter || score > bestGutter.score) {
        bestGutter = { gx, left, right, score };
      }
    }
  }

  if (bestGutter) {
    const colTopY = Math.max(...bestGutter.left.map((i) => i.y), ...bestGutter.right.map((i) => i.y));
    const topWide = wide.filter((i) => i.y > colTopY + 6);
    const bottomWide = wide.filter((i) => i.y <= colTopY + 6);
    return [
      ...assembleLinesFromItems(topWide),
      ...assembleLinesFromItems(bestGutter.left),
      ...assembleLinesFromItems(bestGutter.right),
      ...assembleLinesFromItems(bottomWide),
    ].join("\n");
  }

  return assembleLinesFromItems(norm).join("\n");
}

async function extractPdfBytesWithPdfJs(u8, lang) {
  let pdfjs;
  try {
    pdfjs = await loadPdfJsLazy();
  } catch (err) {
    throw new ResumeValidationError(
      "PDF 판독 엔진을 불러오지 못했어요. 잠시 후 다시 시도하거나 텍스트 붙여넣기를 이용해 주세요.",
      500,
      "Failed to load the local PDF reader module. Please retry or paste your resume text directly.",
      lang
    );
  }

  const isNodeRuntime = Boolean(globalThis.process?.versions?.node);
  const cMapUrlObj = new URL("../vendor/pdfjs/cmaps/", import.meta.url);
  const stdFontUrlObj = new URL("../vendor/pdfjs/standard_fonts/", import.meta.url);
  const cMapUrl = isNodeRuntime ? decodeURIComponent(cMapUrlObj.pathname) : cMapUrlObj.href;
  const standardFontDataUrl = isNodeRuntime ? decodeURIComponent(stdFontUrlObj.pathname) : stdFontUrlObj.href;

  // Ensure pure Uint8Array (not a Node.js Buffer subclass, which pdf.js rejects)
  const pureBytes = new Uint8Array(u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength));

  let doc = null;
  try {
    const loadingTask = pdfjs.getDocument({
      data: pureBytes,
      cMapUrl,
      cMapPacked: true,
      standardFontDataUrl,
      isEvalSupported: false,
      verbosity: 0,
    });
    doc = await loadingTask.promise;
    const maxPages = Math.min(25, doc.numPages);
    const pagesOut = [];
    for (let p = 1; p <= maxPages; p++) {
      const page = await doc.getPage(p);
      const viewport = page.getViewport({ scale: 1.0 });
      const tc = await page.getTextContent();
      const pageText = clusterPdfTextItems(tc.items || [], viewport.width || 612);
      if (pageText.trim()) {
        pagesOut.push(pageText);
      }
    }
    await doc.destroy();
    doc = null;

    const joinedPdf = pagesOut.join("\n").trim();
    if (joinedPdf.replace(/\s+/g, "").length < 10) {
      throw new ResumeValidationError(
        "스캔 이미지 전용 PDF이거나 추출 가능한 텍스트가 없어요. 텍스트 선택이 가능한 PDF·DOCX 또는 직접 붙여넣기를 이용해 주세요.",
        422,
        "This PDF appears to be image-only (scanned) with no extractable text. Please upload a text-selectable PDF/DOCX or paste your text.",
        lang
      );
    }
    return joinedPdf;
  } catch (err) {
    if (doc) {
      try {
        await doc.destroy();
      } catch {
        // Ignore cleanup error
      }
    }
    if (err instanceof ResumeValidationError) throw err;
    throw new ResumeValidationError(
      "손상되었거나 읽을 수 없는 PDF 파일이에요. 정상 PDF 파일 또는 텍스트 붙여넣기를 이용해 주세요.",
      422,
      "Corrupted or unreadable PDF file. Please upload a valid PDF or paste your resume text directly.",
      lang
    );
  }
}

export async function extractTextFromBytes(filename, rawBytes, lang = "ko") {
  const cleanName = String(filename || "uploaded_resume.txt").trim();
  const ext = getExtension(cleanName);

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new ResumeValidationError(
      `지원하지 않는 파일 형식(${ext || "확장자 없음"})이에요. PDF, DOCX, TXT, MD 파일만 업로드할 수 있어요.`,
      400,
      `Unsupported file format (${ext || "no extension"}). Please upload a PDF, DOCX, TXT, or MD file.`,
      lang
    );
  }

  const u8 =
    rawBytes instanceof Uint8Array
      ? rawBytes
      : rawBytes instanceof ArrayBuffer
      ? new Uint8Array(rawBytes)
      : new Uint8Array(0);

  if (u8.byteLength > MAX_UPLOAD_BYTES) {
    throw new ResumeValidationError(
      "이력서 파일 크기가 10MB를 초과했어요. 10MB 이하의 PDF, DOCX, TXT 파일을 업로드해 주세요.",
      413,
      "The file exceeds the 10 MB size limit. Please upload a PDF, DOCX, or TXT file under 10 MB.",
      lang
    );
  }

  if (isAllWhitespaceBytes(u8)) {
    throw new ResumeValidationError(
      "빈 파일이 업로드되었어요. 내용이 포함된 이력서 파일이나 텍스트를 입력해 주세요.",
      400,
      "The uploaded file is empty. Please upload a valid resume file or paste your text directly.",
      lang
    );
  }

  if (ext === ".txt" || ext === ".md") {
    const decoded = decodeTextBytes(u8);
    if (decoded.replace(/\s+/g, "").length < 10) {
      throw new ResumeValidationError(
        "텍스트 내용이 너무 짧아 직종과 경력을 판독하기 어려워요. 주요 업무와 기간을 조금 더 적어 주세요.",
        422,
        "The text is too short to assess your ANZSCO occupation and experience. Please include your job title, duties, and dates.",
        lang
      );
    }
    return decoded;
  }

  if (ext === ".docx") {
    let joined = "";
    try {
      const xmlBytes = await readDocxDocumentXmlBytes(u8, lang);
      const xmlStr = new TextDecoder("utf-8", { fatal: true }).decode(xmlBytes);
      joined = extractDocxXmlText(xmlStr);
    } catch (err) {
      if (err instanceof ResumeValidationError) throw err;
      throw new ResumeValidationError(
        "손상되었거나 암호가 걸린 DOCX 파일이에요. 정상 DOCX/PDF 파일 또는 텍스트 붙여넣기를 이용해 주세요.",
        422,
        "Corrupted or password-protected DOCX file. Please upload a valid DOCX/PDF file or paste your text.",
        lang
      );
    }

    if (joined.replace(/\s+/g, "").length < 10) {
      throw new ResumeValidationError(
        "DOCX 문서에서 읽을 수 있는 본문 텍스트를 찾지 못했어요. 표나 텍스트가 포함된 이력서를 업로드해 주세요.",
        422,
        "No readable text was found inside the DOCX file. Please upload a document containing selectable text.",
        lang
      );
    }
    return joined;
  }

  return extractPdfBytesWithPdfJs(u8, lang);
}

/* ---------------- Deterministic Resume Profile & Duty Analyzer ---------------- */

function parseYmToken(token, isEnd = false) {
  const t = String(token || "").trim().toLowerCase();
  const now = new Date();
  if (/^(?:present|current|now|재직중|재직|현재|현)$/.test(t)) {
    return [now.getFullYear(), now.getMonth() + 1];
  }

  const mNum = t.match(/^((?:19|20)\d{2})\s*(?:[./-]|년)\s*(\d{1,2})\s*월?$/);
  if (mNum) {
    const yr = parseInt(mNum[1], 10);
    const mo = Math.min(12, Math.max(1, parseInt(mNum[2], 10)));
    return [yr, mo];
  }

  const mMon = t.match(/^([a-z]{3,9})\.?\s+((?:19|20)\d{2})$/);
  if (mMon && MONTH_MAP[mMon[1]]) {
    return [parseInt(mMon[2], 10), MONTH_MAP[mMon[1]]];
  }

  const mYr = t.match(/^((?:19|20)\d{2})년?$/);
  if (mYr) {
    return [parseInt(mYr[1], 10), isEnd ? 12 : 1];
  }

  return null;
}

function mergeIntervalMonths(intervals) {
  if (!intervals.length) return 0.0;
  const sortedIv = [...intervals].sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
  const merged = [[sortedIv[0][0], sortedIv[0][1]]];
  for (let i = 1; i < sortedIv.length; i++) {
    const [sIdx, eIdx] = sortedIv[i];
    const last = merged[merged.length - 1];
    if (sIdx <= last[1]) {
      last[1] = Math.max(last[1], eIdx);
    } else {
      merged.push([sIdx, eIdx]);
    }
  }
  const totalMonths = merged.reduce((acc, [s, e]) => acc + (e - s + 1), 0);
  return pyRound1(totalMonths / 12.0);
}

function computeMergedWorkYears(text) {
  let section = "unknown";
  const allIntervals = [];
  const auIntervals = [];
  const osIntervals = [];
  const detectedSpans = [];

  const lines = String(text || "")
    .split(/\r?\n/)
    .map((ln) => ln.trim())
    .filter(Boolean);
  const headerAuHint = AU_WORK_PATTERNS.test(lines.slice(0, 4).join("\n"));

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (EDUCATION_SECTION_HEADERS.test(line)) {
      section = "education";
      continue;
    }
    if (WORK_SECTION_HEADERS.test(line)) {
      section = "work";
      continue;
    }
    if (OTHER_SECTION_HEADERS.test(line)) {
      section = "other";
      continue;
    }

    if (section === "education") continue;
    if (section !== "work" && EDUCATION_LINE_MARKERS.test(line)) continue;

    const spanRe = new RegExp(DATE_SPAN_SOURCE, "giu");
    let m;
    while ((m = spanRe.exec(line)) !== null) {
      const sYm = parseYmToken(m.groups.start, false);
      const eYm = parseYmToken(m.groups.end, true);
      if (!sYm || !eYm) continue;
      const sIdx = sYm[0] * 12 + (sYm[1] - 1);
      const eIdx = eYm[0] * 12 + (eYm[1] - 1);
      if (eIdx < sIdx || eIdx - sIdx > 480) continue;

      allIntervals.push([sIdx, eIdx]);
      const prevLine =
        idx > 0 &&
        !DATE_SPAN_SINGLE_RE.test(lines[idx - 1]) &&
        !WORK_SECTION_HEADERS.test(lines[idx - 1]) &&
        !EDUCATION_SECTION_HEADERS.test(lines[idx - 1]) &&
        !OTHER_SECTION_HEADERS.test(lines[idx - 1])
          ? lines[idx - 1]
          : "";
      const nextLine =
        idx + 1 < lines.length && !DATE_SPAN_SINGLE_RE.test(lines[idx + 1])
          ? lines[idx + 1]
          : "";
      const spanCtx = `${prevLine} ${line} ${nextLine}`;

      let locTag;
      if (OVERSEAS_WORK_PATTERNS.test(spanCtx) && !AU_WORK_PATTERNS.test(line)) {
        osIntervals.push([sIdx, eIdx]);
        locTag = "OS";
      } else if (AU_WORK_PATTERNS.test(spanCtx) || (headerAuHint && !OVERSEAS_WORK_PATTERNS.test(spanCtx))) {
        auIntervals.push([sIdx, eIdx]);
        locTag = "AU";
      } else {
        osIntervals.push([sIdx, eIdx]);
        locTag = "OS";
      }

      detectedSpans.push({
        start: `${String(sYm[0]).padStart(4, "0")}-${String(sYm[1]).padStart(2, "0")}`,
        end: `${String(eYm[0]).padStart(4, "0")}-${String(eYm[1]).padStart(2, "0")}`,
        region: locTag,
        context: line.slice(0, 110),
      });
    }
  }

  if (!allIntervals.length) {
    let fallbackYrs = 0.0;
    const mExp = text.match(/(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years?\s+(?:of\s+)?experience|년\s*(?:이상\s*)?경력)/i);
    if (mExp) {
      fallbackYrs = pyRound1(parseFloat(mExp[1]));
    } else {
      const mExpKo = text.match(/경력\s*(\d{1,2}(?:\.\d)?)\s*년/);
      if (mExpKo) {
        fallbackYrs = pyRound1(parseFloat(mExpKo[1]));
      }
    }
    if (fallbackYrs > 0) {
      const isAu = AU_WORK_PATTERNS.test(text) && !OVERSEAS_WORK_PATTERNS.test(text);
      return [fallbackYrs, isAu ? fallbackYrs : 0.0, isAu ? 0.0 : fallbackYrs, []];
    }
    return [0.0, 0.0, 0.0, []];
  }

  return [
    mergeIntervalMonths(allIntervals),
    mergeIntervalMonths(auIntervals),
    mergeIntervalMonths(osIntervals),
    detectedSpans,
  ];
}

function detectQualification(text) {
  const low = text.toLowerCase();
  const mastersResearch =
    /(?<![\p{L}\p{N}_])(?:master\s+of\s+philosophy|mphil|masters?\s+by\s+research)(?![\p{L}\p{N}_])|연구\s*석사/iu.test(
      low
    );
  if (/(?<![\p{L}\p{N}_])(?:ph\.?d|doctor\s+of\s+philosophy|doctorate)(?![\p{L}\p{N}_])|박사\s*학위|박사\s*졸업/iu.test(low)) {
    return ["phd", true];
  }
  if (
    /(?<![\p{L}\p{N}_])(?:bachelor|master|b\.?sc|b\.?eng|b\.?com|b\.?it|m\.?sc|mba)(?![\p{L}\p{N}_])|학사|석사|4년제\s*대학교/iu.test(
      low
    )
  ) {
    return ["bachelor_masters", mastersResearch];
  }
  if (
    /(?<![\p{L}\p{N}_])(?:diploma|advanced\s+diploma|associate\s+degree|certificate\s+iii|certificate\s+iv|cert\s+iii|cert\s+iv)(?![\p{L}\p{N}_])|디플로마|전문학사|전문대|기능사|산업기사/iu.test(
      low
    )
  ) {
    return ["diploma_trade", false];
  }
  return ["other", false];
}

function detectEnglishClue(text) {
  const mPte = text.match(/(?<![\p{L}\p{N}_])pte(?:\s+academic)?[^\d\n]{0,25}(\d{2})(?![\p{L}\p{N}_])/iu);
  if (mPte) {
    const score = parseInt(mPte[1], 10);
    let tier = "below_threshold";
    if (score >= 85) tier = "superior";
    else if (score >= 69) tier = "proficient";
    else if (score >= 50) tier = "competent";
    else if (score >= 36) tier = "vocational_482";
    return { test: "PTE", score_raw: String(score), tier_estimate: tier };
  }

  const mIelts = text.match(
    /(?<![\p{L}\p{N}_])ielts(?:\s+(?:academic|general))?[^\d\n]{0,25}([4-9](?:\.[05])?)(?![\p{L}\p{N}_])/iu
  );
  if (mIelts) {
    const band = parseFloat(mIelts[1]);
    let tier = "below_threshold";
    if (band >= 8.0) tier = "superior";
    else if (band >= 7.0) tier = "proficient";
    else if (band >= 6.0) tier = "competent";
    else if (band >= 5.0) tier = "vocational_482";
    return { test: "IELTS", score_raw: mIelts[1], tier_estimate: tier };
  }

  return null;
}

function detectRegistrationClues(text) {
  const cluesKo = [];
  const cluesEn = [];
  const checks = [
    [/(?<![\p{L}\p{N}_])ahpra(?![\p{L}\p{N}_])/iu, "AHPRA 의료·보건 면허", "AHPRA Health Practitioner Registration"],
    [/(?<![\p{L}\p{N}_])anmac(?![\p{L}\p{N}_])/iu, "ANMAC 간호 기술심사", "ANMAC Nursing Skills Assessment"],
    [/(?<![\p{L}\p{N}_])(?:naati|ccl)(?![\p{L}\p{N}_])/iu, "NAATI CCL (+5점)", "NAATI CCL (+5 pts)"],
    [
      /(?<![\p{L}\p{N}_])(?:professional\s+year|py\s+program)(?![\p{L}\p{N}_])|프로페셔널\s*이어/iu,
      "Professional Year (+5점)",
      "Professional Year (+5 pts)",
    ],
    [/(?<![\p{L}\p{N}_])acs(?![\p{L}\p{N}_])/iu, "ACS ICT 기술심사", "ACS ICT Skills Assessment"],
    [/(?<![\p{L}\p{N}_])vetassess(?![\p{L}\p{N}_])/iu, "VETASSESS 기술심사", "VETASSESS Skills Assessment"],
    [
      /(?<![\p{L}\p{N}_])(?:tra|jrp)(?![\p{L}\p{N}_])|job\s+ready\s+program/iu,
      "TRA 기능직 기술심사",
      "TRA Trades Skills Assessment",
    ],
    [
      /engineers\s+australia|(?<![\p{L}\p{N}_])ea(?![\p{L}\p{N}_])\s+stage\s+1/iu,
      "Engineers Australia 기술심사",
      "Engineers Australia Skills Assessment",
    ],
    [
      /(?<![\p{L}\p{N}_])(?:aitsl|acecqa)(?![\p{L}\p{N}_])/iu,
      "AITSL / ACECQA 교원·보육 기술심사",
      "AITSL / ACECQA Teaching & Early Childhood Assessment",
    ],
    [
      /(?<![\p{L}\p{N}_])(?:caanz|ipa)(?![\p{L}\p{N}_])|cpa\s+australia/iu,
      "회계사 협회(CAANZ/CPAA/IPA) 심사",
      "Accounting Body (CAANZ/CPAA/IPA) Assessment",
    ],
  ];

  for (const [pat, labelKo, labelEn] of checks) {
    if (pat.test(text)) {
      cluesKo.push(labelKo);
      cluesEn.push(labelEn);
    }
  }
  return [cluesKo, cluesEn];
}

function detectEmploymentWarnings(text) {
  const warningsKo = [];
  const warningsEn = [];
  if (/(?<![\p{L}\p{N}_])abn(?![\p{L}\p{N}_])|sole\s+trader|independent\s+contractor|프리랜서|외주\s*용역/iu.test(text)) {
    warningsKo.push(
      "ABN / 프리랜서(Contractor) 근무 이력 감지: 482·186 및 TRA/VETASSESS 심사에서는 단순 ABN 인보이스만으로 고용관계·풀타임 경력 인정이 까다로울 수 있어 계약서·세금신고(NOA)·실제 지휘감독 증빙 점검이 필요해요."
    );
    warningsEn.push(
      "ABN / Independent Contractor History Detected: For Subclass 482/186 and TRA/VETASSESS assessments, standalone ABN invoices are scrutinised heavily—written service contracts, ATO Notices of Assessment (NOA), and day-to-day direction evidence should be audited."
    );
  }
  if (/(?<![\p{L}\p{N}_])(?:part[- ]time|casual)(?![\p{L}\p{N}_])|파트타임|캐주얼|알바|아르바이트/iu.test(text)) {
    warningsKo.push(
      "파트타임·캐주얼 근무 형태 감지: 482 SID는 주 20시간 이상 파트타임의 비례 합산(Pro-rata, 예: 주 19~20시간 2년 = 풀타임 1년)이 가능하지만, 부정기 캐주얼이나 주 20시간 미만 구간은 기술심사·점수제 경력에서 제외될 수 있어요."
    );
    warningsEn.push(
      "Part-Time / Casual Employment Detected: While Subclass 482 SID permits pro-rata counting of regular part-time work (e.g., 2 years at ~20 hrs/wk = 1 year full-time), irregular casual shifts or periods under 20 hrs/wk may be excluded from skills assessments and Schedule 6D points."
    );
  }
  if (/(?<![\p{L}\p{N}_])intern(?:ship)?(?![\p{L}\p{N}_])|인턴|실습생|placement/iu.test(text)) {
    warningsKo.push(
      "인턴십·학위 실습(Placement) 이력 감지: 무급 실습이나 학점 이수용 인턴십은 대다수 기술심사 기관(ACS·VETASSESS·TRA)에서 숙련 유급 경력으로 산입되지 않아요."
    );
    warningsEn.push(
      "Internship / Clinical Placement Detected: Unpaid placements or academic credit internships generally cannot be counted as skilled remunerated employment by ACS, VETASSESS, or TRA."
    );
  }
  return [warningsKo, warningsEn];
}

function yearsToAuBucket(yrs) {
  if (yrs >= 8) return "8+";
  if (yrs >= 5) return "5_7";
  if (yrs >= 3) return "3_4";
  if (yrs >= 1) return "1_2";
  return "0";
}

function yearsToOsBucket(yrs) {
  if (yrs >= 8) return "8+";
  if (yrs >= 5) return "5_7";
  if (yrs >= 3) return "3_4";
  return "0";
}

export function analyzeResumeText(text, matcher, filename = "pasted_text.txt", lang = "ko") {
  const cleanText = String(text || "").trim();
  if (cleanText.replace(/\s+/g, "").length < 15) {
    throw new ResumeValidationError(
      "입력된 이력서 텍스트가 너무 짧아요. 직함, 담당 직무, 근무 기간을 1~2문장 이상 입력해 주세요.",
      400,
      "The resume text is too short. Please enter at least 1–2 sentences describing your job title, core duties, and employment dates.",
      lang
    );
  }

  const [expYears, auYears, osYears, detectedSpans] = computeMergedWorkYears(cleanText);
  const auWork = auYears > 0 || AU_WORK_PATTERNS.test(cleanText);
  const auStudy = AU_STUDY_PATTERNS.test(cleanText);
  const [qualification, mastersResearch] = detectQualification(cleanText);
  const englishClue = detectEnglishClue(cleanText);
  const [regClues, regCluesEn] = detectRegistrationClues(cleanText);
  const [empWarnings, empWarningsEn] = detectEmploymentWarnings(cleanText);

  const queryLines = [];
  let sec = "unknown";
  for (const rawLn of cleanText.split(/\r?\n/)) {
    const ln = rawLn.trim();
    if (!ln) continue;
    if (EDUCATION_SECTION_HEADERS.test(ln)) {
      sec = "education";
      continue;
    }
    if (WORK_SECTION_HEADERS.test(ln)) {
      sec = "work";
      continue;
    }
    if (OTHER_SECTION_HEADERS.test(ln)) {
      sec = "other";
      continue;
    }
    if (sec === "education") continue;
    queryLines.push(ln);
  }

  const queryPayload = queryLines.slice(0, 40).join("\n") || cleanText.slice(0, 1500);
  const searchRes = matcher.search({ query: queryPayload, limit: 5 });
  const candidates = searchRes.results;

  const gapInsights = [];
  const gapInsightsEn = [];
  if (candidates.length) {
    const top = candidates[0];
    const authCodes = (top.assessing_authorities || []).map((a) => a.code).join(", ");
    const authKo = authCodes || "해당 심사기관";
    const authEn = authCodes || "Relevant Assessing Authority";
    const listsStr = (top.lists || []).join(" · ");
    gapInsights.push(
      `이력서 직무 분석 결과 1순위 후보 직종은 '${top.title_ko} (${top.occupation}, ANZSCO ${top.anzsco_code_primary})'이며, 공식 리스트 [${listsStr}] 및 기술심사 기관 [${authKo}] 기준이 적용돼요.`
    );
    gapInsightsEn.push(
      `Top matched ANZSCO occupation from your duties: '${top.occupation} (ANZSCO ${top.anzsco_code_primary})', governed by official list [${listsStr}] and assessing authority [${authEn}].`
    );

    if (top.has_caveats) {
      const scOrder = ["482", "186", "494", "189", "190", "491"];
      const sortedScKeys = Object.keys(top.caveats_by_subclass || {}).sort((a, b) => {
        const ia = scOrder.indexOf(a);
        const ib = scOrder.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      });
      const firstSc = sortedScKeys[0];
      const firstCav = top.caveats_by_subclass[firstSc][0];
      const cavSummary = firstCav.summary_ko;
      const cavSummaryEn = firstCav.summary_en || firstCav.title_en || "Statutory occupation caveat applies";
      gapInsights.push(
        `주의(직종 Caveat): ${top.occupation} 직종으로 ${firstSc} 등 스폰서 비자 진행 시 '${cavSummary}' 제한 조건이 이민성 법령 원문에 명시되어 있어요.`
      );
      gapInsightsEn.push(
        `Statutory Caveat Alert: Sponsoring '${top.occupation}' under Subclass ${firstSc} is subject to legislative caveat — '${cavSummaryEn}'.`
      );
    }

    if (!(top.visas_eligible || []).includes("189")) {
      gapInsights.push(
        `${top.occupation} 직종은 MLTSSL이 아닌 ${(top.lists || []).join(", ")} 소속이므로 189 독립기술이민은 불가하며, 주정부 후원(190/491) 또는 고용주 스폰서(482 → 186) 중심으로 설계해야 해요.`
      );
      gapInsightsEn.push(
        `Because '${top.occupation}' sits on ${(top.lists || []).join(", ")} (not MLTSSL), Subclass 189 Independent is unavailable—focus on State Nomination (190/491) or Employer Sponsorship (482 → 186).`
      );
    }
  }

  const fmtYr = (v) => (Number.isInteger(v) ? `${v}.0` : String(v));
  if (expYears < 1.0) {
    gapInsights.push(
      `통합 산출 경력이 약 ${fmtYr(expYears)}년으로 감지되었어요. 482 SID 스폰서 비자는 최근 5년 내 최소 1년 풀타임(또는 비례 파트타임) 경력이 필수이므로 경력 산정 구간을 꼭 확인해 보세요.`
    );
    gapInsightsEn.push(
      `De-overlapped experience totals ~${fmtYr(expYears)} yrs. Subclass 482 SID requires at least 1 year of full-time (or equivalent pro-rata part-time) experience within the last 5 years—please double-check your date ranges.`
    );
  } else if (expYears < 2.0) {
    gapInsights.push(
      `중복 기간 병합 후 총 경력이 약 ${fmtYr(expYears)}년(호주 약 ${fmtYr(auYears)}년 · 해외 약 ${fmtYr(osYears)}년)으로 계산되었어요. 482 SID 최소 기준(1년)은 충족 가능하나, 186 Direct Entry(3년 풀타임)까지는 추가 경력 축적이 필요해요.`
    );
    gapInsightsEn.push(
      `De-overlapped experience totals ~${fmtYr(expYears)} yrs (AU ~${fmtYr(auYears)} yrs · Overseas ~${fmtYr(osYears)} yrs). This meets the 1-year minimum for Subclass 482 SID, though Subclass 186 Direct Entry requires 3 full-time years.`
    );
  } else {
    gapInsights.push(
      `중복 기간 병합 후 총 경력이 약 ${fmtYr(expYears)}년(호주 약 ${fmtYr(auYears)}년 · 해외 약 ${fmtYr(osYears)}년)으로 확인되어 482 SID(1년+) 및 기술이민 경력 점수 검토에 유리한 기반을 갖추고 있어요.`
    );
    gapInsightsEn.push(
      `De-overlapped experience totals ~${fmtYr(expYears)} yrs (AU ~${fmtYr(auYears)} yrs · Overseas ~${fmtYr(osYears)} yrs), providing a solid foundation for Subclass 482 SID (1+ yr) and Schedule 6D employment points.`
    );
  }

  if (!englishClue) {
    gapInsights.push(
      "이력서에 공인 영어 성적(IELTS / PTE Academic)이 명시되지 않았어요. 2025년 8·9월 개편된 영역별 PTE/IELTS 기준(온라인 자택 시험 전면 불인정)에 맞춰 목표 점수를 먼저 확정하시는 것을 권장해요."
    );
    gapInsightsEn.push(
      "No official English test score (IELTS / PTE Academic) was detected on your resume. Confirm your target band scores under the revised Aug/Sep 2025 component rules (remote/at-home tests are strictly excluded)."
    );
  }

  gapInsights.push(...empWarnings);
  gapInsightsEn.push(...empWarningsEn);

  let engTierPrefill = "competent";
  if (
    englishClue &&
    ["superior", "proficient", "competent", "vocational_482"].includes(englishClue.tier_estimate)
  ) {
    engTierPrefill = englishClue.tier_estimate;
  }

  const suggestedPrefill = {
    anzsco_code: candidates.length ? candidates[0].anzsco_code_primary : "",
    qualification,
    masters_research_stem: mastersResearch && auStudy,
    au_study: auStudy,
    au_work_years_bucket: yearsToAuBucket(auYears),
    os_work_years_bucket: yearsToOsBucket(osYears),
    total_work_years_numeric: expYears,
    english_tier: engTierPrefill,
    naati_ccl: regClues.some((c) => c.includes("NAATI")),
    professional_year: regClues.some((c) => c.includes("Professional Year")) && auStudy,
  };

  return {
    filename,
    char_count: cleanText.length,
    extracted_profile: {
      estimated_experience_years: expYears,
      au_experience_years: auYears,
      os_experience_years: osYears,
      detected_work_spans: detectedSpans,
      au_experience_detected: auWork,
      qualification,
      masters_research_detected: mastersResearch,
      au_study_detected: auStudy,
      english_clue: englishClue,
      registration_clues: regClues,
      registration_clues_en: regCluesEn,
      employment_type_warnings: empWarnings,
      employment_type_warnings_en: empWarningsEn,
    },
    occupation_candidates: candidates,
    confusion_alerts: searchRes.confusion_alerts,
    suggested_diagnosis_prefill: suggestedPrefill,
    gap_insights_ko: gapInsights,
    gap_insights_en: gapInsightsEn,
    privacy_notice_ko: PRIVACY_NOTICE_KO,
    privacy_notice_en: PRIVACY_NOTICE_EN,
  };
}
