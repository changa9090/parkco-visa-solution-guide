import { OccupationMatcher } from "./occupation_matcher.mjs";
import {
  ResumeValidationError,
  analyzeResumeText,
  extractTextFromBytes,
} from "./resume_analyzer.mjs";
import {
  OFFICIAL_INQUIRY_URL,
  OFFICIAL_INQUIRY_URL_EN,
  runDiagnosis,
} from "./diagnostic_engine.mjs";
import { SAMPLE_PERSONAS } from "./sample_personas.mjs";

function normLang(raw) {
  return String(raw || "").trim().toLowerCase().startsWith("en") ? "en" : "ko";
}

export function createStaticVisaGuideFromData({
  solMaster,
  confusionPairs,
  pathwaysCatalog,
  youtubeCatalog,
  provenance,
}) {
  const matcher = new OccupationMatcher(solMaster.occupations || [], confusionPairs || []);

  return {
    matcher,
    getHealth() {
      return {
        status: "ok",
        mode: "static-client",
        sol_count: matcher.occupations.length,
        curated_videos_count: (youtubeCatalog.videos || []).length,
        channel_total_videos: youtubeCatalog.total_channel_videos || 209,
        fy_version: pathwaysCatalog.thresholds_fy26_27.effective_period,
        official_inquiry_url: OFFICIAL_INQUIRY_URL,
        official_inquiry_url_en: OFFICIAL_INQUIRY_URL_EN,
        provenance_sources: (provenance?.sources || []).length,
      };
    },
    getBootstrap() {
      const popular = matcher.search({ query: "", limit: 12 }).results;
      return {
        thresholds_fy26_27: pathwaysCatalog.thresholds_fy26_27,
        english_matrix_2025_2026: pathwaysCatalog.english_matrix_2025_2026,
        lifecycle_blueprints: pathwaysCatalog.lifecycle_blueprints,
        non_skilled_and_remote_visas: pathwaysCatalog.non_skilled_and_remote_visas,
        parkco_services: pathwaysCatalog.parkco_services,
        specialist_navigators: pathwaysCatalog.specialist_navigators,
        youtube_catalog: youtubeCatalog,
        confusion_pairs: matcher.confusionPairs,
        popular_occupations: popular,
        sample_personas: SAMPLE_PERSONAS,
      };
    },
    searchSol({ q = "", list = "", visa = "", skill_level = "", limit = 24 } = {}) {
      const skStr = String(skill_level ?? "").trim();
      const limStr = String(limit ?? "24").trim();
      const parsedSkill = /^\d+$/.test(skStr) ? parseInt(skStr, 10) : null;
      const parsedLimit = /^\d+$/.test(limStr)
        ? Math.min(100, Math.max(1, parseInt(limStr, 10)))
        : 24;
      return matcher.search({
        query: q,
        list_filter: list,
        visa_filter: visa,
        skill_level: parsedSkill,
        limit: parsedLimit,
      });
    },
    getOccupation(idOrCode, lang = "ko") {
      const reqLang = normLang(lang);
      const key = String(idOrCode || "").trim();
      const occ = matcher.getById(key) || matcher.getByCode(key);
      if (!occ) {
        throw new Error(
          reqLang === "en"
            ? `No SOL occupation found for ANZSCO code '${key}'.`
            : `ANZSCO 코드(${key})에 해당하는 SOL 직종을 찾지 못했어요.`
        );
      }
      return occ;
    },
    analyzeResumeTextPayload({ filename = "pasted_resume.txt", text = "", lang = "ko" } = {}) {
      const reqLang = normLang(lang);
      try {
        return analyzeResumeText(String(text ?? ""), matcher, String(filename || "pasted_resume.txt"), reqLang);
      } catch (err) {
        if (err instanceof ResumeValidationError) {
          throw new Error(err.getMessage(reqLang));
        }
        throw err;
      }
    },
    async analyzeResumeFile(fileOrBytes, filename = "uploaded_resume.txt", lang = "ko") {
      const reqLang = normLang(lang);
      try {
        let bytes;
        let name = filename;
        if (typeof Blob !== "undefined" && fileOrBytes instanceof Blob) {
          if (fileOrBytes.name) name = fileOrBytes.name;
          bytes = new Uint8Array(await fileOrBytes.arrayBuffer());
        } else if (fileOrBytes instanceof Uint8Array) {
          bytes = fileOrBytes;
        } else if (fileOrBytes instanceof ArrayBuffer) {
          bytes = new Uint8Array(fileOrBytes);
        } else {
          bytes = new Uint8Array(0);
        }
        const extracted = await extractTextFromBytes(name, bytes, reqLang);
        return analyzeResumeText(extracted, matcher, name, reqLang);
      } catch (err) {
        if (err instanceof ResumeValidationError) {
          throw new Error(err.getMessage(reqLang));
        }
        throw err;
      }
    },
    diagnose(payload = {}) {
      return runDiagnosis(payload, matcher, pathwaysCatalog, youtubeCatalog);
    },
  };
}

let _browserClientPromise = null;

export function loadStaticVisaGuideBrowser(dataBaseUrl = null) {
  if (!_browserClientPromise) {
    const base =
      dataBaseUrl ||
      new URL("./data/", typeof document !== "undefined" ? document.baseURI : import.meta.url).href;

    const fetchJson = async (name) => {
      const res = await fetch(new URL(name, base).href, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Failed to load dataset ${name} (HTTP ${res.status})`);
      }
      return res.json();
    };

    _browserClientPromise = Promise.all([
      fetchJson("sol_master_2026.json"),
      fetchJson("confusion_pairs.json"),
      fetchJson("pathways_catalog_2026.json"),
      fetchJson("youtube_catalog_2026.json"),
      fetchJson("PROVENANCE.json"),
    ]).then(([solMaster, confusionPairs, pathwaysCatalog, youtubeCatalog, provenance]) =>
      createStaticVisaGuideFromData({
        solMaster,
        confusionPairs,
        pathwaysCatalog,
        youtubeCatalog,
        provenance,
      })
    );
  }
  return _browserClientPromise;
}
