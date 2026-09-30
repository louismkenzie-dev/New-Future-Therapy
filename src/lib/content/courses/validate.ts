import type { LessonBlock } from "./types";

/* Turns untrusted JSON (from the editor, or from the AI formatter) into a
   list of well-formed lesson blocks. Anything it cannot make sense of is
   dropped rather than allowed to crash a member's lesson page. Pure —
   safe on the client too. */

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const optStr = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v : undefined);
const num = (v: unknown, fallback: number): number =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;
const strList = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim() !== "") : [];
const objList = (v: unknown): Obj[] => (Array.isArray(v) ? v.filter(isObj) : []);

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

let seq = 0;
function idFor(raw: unknown, fallbackBase: string): string {
  const s = slugify(str(raw));
  return s || `${fallbackBase}-${++seq}`;
}

function normaliseBlock(raw: Obj, index: number): LessonBlock | null {
  const kind = str(raw.kind);
  const exerciseId = () => idFor(raw.exerciseId, `${kind}-${index + 1}`);

  switch (kind) {
    case "video":
      return {
        kind,
        title: optStr(raw.title),
        playbackId: str(raw.playbackId),
        durationSeconds: num(raw.durationSeconds, 0),
      };
    case "audio":
      return {
        kind,
        title: str(raw.title, "Audio practice"),
        playbackId: str(raw.playbackId),
        durationSeconds: num(raw.durationSeconds, 0),
      };
    case "prose": {
      const body = str(raw.body).trim();
      if (!body) return null;
      return { kind, heading: optStr(raw.heading), body };
    }
    case "quote": {
      const text = str(raw.text).trim();
      if (!text) return null;
      return { kind, text, attribution: optStr(raw.attribution) };
    }
    case "journal":
    case "sharedJournal": {
      const prompts = strList(raw.prompts);
      if (!prompts.length) return null;
      const base = {
        exerciseId: exerciseId(),
        title: str(raw.title, "Reflection"),
        intro: optStr(raw.intro),
        prompts,
      };
      return kind === "journal"
        ? { kind, ...base }
        : { kind, ...base, partnerNote: str(raw.partnerNote, "Shared with you, in their own words.") };
    }
    case "quiz": {
      const questions = objList(raw.questions)
        .map((q, i) => ({
          id: idFor(q.id, `q${i + 1}`),
          text: str(q.text),
          options: objList(q.options)
            .map((o) => ({ value: str(o.value), label: str(o.label) }))
            .filter((o) => o.value && o.label),
        }))
        .filter((q) => q.text && q.options.length);
      const profiles = objList(raw.profiles)
        .map((p) => ({ id: str(p.id), title: str(p.title), description: str(p.description) }))
        .filter((p) => p.id && p.title);
      if (!questions.length || !profiles.length) return null;
      return { kind, exerciseId: exerciseId(), title: str(raw.title, "A gentle self-assessment"), intro: str(raw.intro), questions, profiles };
    }
    case "checkin": {
      const fields = objList(raw.fields)
        .map((f, i) => ({
          id: idFor(f.id, `field${i + 1}`),
          label: str(f.label),
          type: (["scale", "text", "choices"].includes(str(f.type)) ? str(f.type) : "text") as "scale" | "text" | "choices",
          options: strList(f.options).length ? strList(f.options) : undefined,
        }))
        .filter((f) => f.label);
      if (!fields.length) return null;
      const cadence = str(raw.cadence);
      return {
        kind,
        exerciseId: exerciseId(),
        title: str(raw.title, "Check-in"),
        intro: optStr(raw.intro),
        fields,
        cadence: (["once", "weekly", "monthly"].includes(cadence) ? cadence : undefined) as "once" | "weekly" | "monthly" | undefined,
      };
    }
    case "worksheet": {
      const fields = objList(raw.fields)
        .map((f, i) => ({
          id: idFor(f.id, `field${i + 1}`),
          label: str(f.label),
          type: (["text", "scale", "choices"].includes(str(f.type)) ? str(f.type) : "text") as "text" | "scale" | "choices",
          options: strList(f.options).length ? strList(f.options) : undefined,
          hint: optStr(f.hint),
          section: optStr(f.section),
        }))
        .filter((f) => f.label);
      if (!fields.length) return null;
      const cs = isObj(raw.coupleSection) ? raw.coupleSection : null;
      const closing = isObj(raw.closing) ? raw.closing : null;
      return {
        kind,
        exerciseId: exerciseId(),
        title: str(raw.title, "Worksheet"),
        intro: optStr(raw.intro),
        fields,
        coupleSection: cs
          ? {
              title: str(cs.title, "Together"),
              intro: str(cs.intro),
              groundRules: strList(cs.groundRules),
              fields: objList(cs.fields)
                .map((f, i) => ({ id: idFor(f.id, `together${i + 1}`), label: str(f.label) }))
                .filter((f) => f.label),
            }
          : undefined,
        partnerNote: str(raw.partnerNote, "Shared with you, in their own words."),
        closing: closing
          ? { heading: str(closing.heading), body: str(closing.body), question: str(closing.question), pull: str(closing.pull) }
          : undefined,
      };
    }
    case "pairedReflection": {
      const ind = isObj(raw.individual) ? raw.individual : {};
      const tog = isObj(raw.together) ? raw.together : {};
      const questions = objList(ind.questions)
        .map((q, i) => {
          const scale = isObj(q.scale) ? q.scale : null;
          return {
            id: idFor(q.id, `q${i + 1}`),
            label: str(q.label),
            hint: optStr(q.hint),
            scale: scale ? { low: str(scale.low, "Low"), high: str(scale.high, "High") } : undefined,
          };
        })
        .filter((q) => q.label);
      if (!questions.length) return null;
      const togetherQuestions = objList(tog.questions)
        .map((q, i) => ({ id: idFor(q.id, `together${i + 1}`), label: str(q.label), hint: optStr(q.hint) }))
        .filter((q) => q.label);
      const compare = isObj(raw.compare)
        ? Object.fromEntries(Object.entries(raw.compare).filter(([, v]) => typeof v === "string") as [string, string][])
        : undefined;
      const closing = isObj(raw.closing) && str(raw.closing.text) ? { text: str(raw.closing.text) } : undefined;
      return {
        kind,
        exerciseId: exerciseId(),
        eyebrow: optStr(raw.eyebrow),
        title: str(raw.title, "Reflection"),
        intro: optStr(raw.intro),
        order: str(raw.order) === "togetherFirst" ? "togetherFirst" : undefined,
        individual: { title: str(ind.title, "Individual Reflection"), intro: optStr(ind.intro), questions },
        together: {
          title: str(tog.title, "Coming Back Together"),
          intro: optStr(tog.intro),
          steps: strList(tog.steps).length ? strList(tog.steps) : undefined,
          questions: togetherQuestions,
        },
        compare: compare && Object.keys(compare).length ? compare : undefined,
        revealNote: optStr(raw.revealNote),
        closing,
      };
    }
    case "iconCards": {
      const items = objList(raw.items)
        .map((i) => ({ icon: str(i.icon, "leaf"), title: str(i.title), body: optStr(i.body) }))
        .filter((i) => i.title);
      if (!items.length) return null;
      const columns = num(raw.columns, 3);
      return {
        kind,
        heading: optStr(raw.heading),
        intro: optStr(raw.intro),
        columns: (columns === 2 || columns === 4 ? columns : 3) as 2 | 3 | 4,
        items,
      };
    }
    case "accordion": {
      const items = objList(raw.items)
        .map((i) => ({ icon: optStr(i.icon), title: str(i.title), body: str(i.body) }))
        .filter((i) => i.title && i.body);
      if (!items.length) return null;
      return { kind, heading: optStr(raw.heading), intro: optStr(raw.intro), items };
    }
    case "contrast": {
      const cols = objList(raw.columns)
        .map((c) => ({
          label: str(c.label),
          icon: optStr(c.icon),
          items: strList(c.items),
          tone: (str(c.tone) === "sage" ? "sage" : undefined) as "sage" | undefined,
        }))
        .filter((c) => c.label && c.items.length);
      if (cols.length < 2) return null;
      return { kind, heading: optStr(raw.heading), intro: optStr(raw.intro), columns: [cols[0], cols[1]], note: optStr(raw.note) };
    }
    case "flipCards": {
      const items = objList(raw.items)
        .map((i) => ({ frontLabel: optStr(i.frontLabel), front: str(i.front), backLabel: optStr(i.backLabel), back: str(i.back) }))
        .filter((i) => i.front && i.back);
      if (!items.length) return null;
      return { kind, heading: optStr(raw.heading), intro: optStr(raw.intro), items };
    }
    case "tapChoice": {
      const questions = objList(raw.questions)
        .map((q, i) => ({
          id: idFor(q.id, `choice${i + 1}`),
          text: str(q.text),
          options: objList(q.options)
            .map((o, j) => ({ value: idFor(o.value ?? o.label, `option${j + 1}`), label: str(o.label), response: str(o.response) }))
            .filter((o) => o.label),
        }))
        .filter((q) => q.text && q.options.length);
      if (!questions.length) return null;
      return { kind, exerciseId: exerciseId(), title: str(raw.title, "A moment to notice"), intro: optStr(raw.intro), questions };
    }
    case "flow": {
      const steps = objList(raw.steps)
        .map((s) => ({ icon: str(s.icon, "leaf"), title: str(s.title), body: optStr(s.body) }))
        .filter((s) => s.title);
      if (!steps.length) return null;
      return { kind, heading: optStr(raw.heading), intro: optStr(raw.intro), steps };
    }
    case "callout": {
      const title = str(raw.title);
      const body = str(raw.body);
      if (!title || !body) return null;
      return { kind, icon: optStr(raw.icon), title, body, tone: str(raw.tone) === "dark" ? "dark" : undefined };
    }
    case "photo": {
      const src = str(raw.src);
      if (!src.startsWith("/photos/")) return null;
      return { kind, src, alt: str(raw.alt), caption: optStr(raw.caption), position: optStr(raw.position) };
    }
    case "download": {
      const blobPath = str(raw.blobPath);
      if (!blobPath) return null;
      return { kind, title: str(raw.title, "Download"), description: str(raw.description), blobPath, fileLabel: str(raw.fileLabel, "Download (PDF)") };
    }
    default:
      return null;
  }
}

export function normaliseBlocks(raw: unknown): LessonBlock[] {
  seq = 0;
  const list = Array.isArray(raw) ? raw : [];
  const out: LessonBlock[] = [];
  const seenExercise = new Set<string>();
  list.forEach((item, i) => {
    if (!isObj(item)) return;
    const block = normaliseBlock(item, i);
    if (!block) return;
    if ("exerciseId" in block) {
      // Exercise ids must be unique within a lesson: responses key on them.
      let id = block.exerciseId;
      let n = 2;
      while (seenExercise.has(id)) id = `${block.exerciseId}-${n++}`;
      seenExercise.add(id);
      (block as { exerciseId: string }).exerciseId = id;
    }
    out.push(block);
  });
  return out;
}
