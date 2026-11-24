"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2, Undo2 } from "lucide-react";
import { saveLessonBlocks, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import type { LessonBlock } from "@/lib/content/courses";
import { normaliseBlocks } from "@/lib/content/courses/validate";
import { inputClass, labelClass, primaryButton, secondaryButton } from "./formStyles";
import { SectionForm } from "./SectionFields";
import { PRACTICE_PHOTOS, SECTION_SPECS, newSection, sectionLabel } from "./sectionSchemas";
import VideoUploader from "./VideoUploader";
import SubtitlesButton from "./SubtitlesButton";

/* Section-by-section editing in plain labelled boxes: reorder, remove, add
   and edit every section without ever seeing the data behind it. Anything
   more structural is a plain-English request to the formatter
   (RefineForm). The raw data view is still there for Louis, folded away
   under "Advanced" at the very bottom. */

type Obj = Record<string, unknown>;

const initialState: EditorFormState = { status: "idle" };

const ADDABLE = Object.entries(SECTION_SPECS).filter(([, s]) => s.template);

function firstText(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    for (const x of v) {
      const t = firstText(x);
      if (t) return t;
    }
  }
  if (v && typeof v === "object") {
    const o = v as Obj;
    for (const k of ["heading", "title", "text", "label", "front", "body"]) {
      if (typeof o[k] === "string" && o[k]) return o[k] as string;
    }
  }
  return "";
}

function summary(block: LessonBlock): string {
  const b = block as unknown as Obj;
  const first =
    firstText({ heading: b.heading, title: b.title, text: b.text, body: b.body }) ||
    (typeof b.caption === "string" && b.caption) ||
    (typeof b.alt === "string" && b.alt) ||
    firstText(b.items) ||
    firstText(b.steps) ||
    firstText(b.questions) ||
    "";
  const line = first.replace(/\s+/g, " ").trim();
  return line.length > 90 ? `${line.slice(0, 90)}…` : line;
}

/** Sections that would be thrown away on save because something they need is empty. */
function incomplete(blocks: LessonBlock[]): number[] {
  return blocks.flatMap((b, i) => (normaliseBlocks([b]).length === 0 ? [i] : []));
}

function savedAtLabel(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date().toDateString() === d.toDateString();
  const time = d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" });
  return today ? `today at ${time}` : `${d.toLocaleDateString("en-GB", { day: "numeric", month: "long" })} at ${time}`;
}

export default function BlocksEditor({
  lessonId,
  initialBlocks,
  savedAt,
}: {
  lessonId: string;
  initialBlocks: LessonBlock[];
  /** When the lesson was last saved, for the save bar. */
  savedAt?: string;
}) {
  const [blocks, setBlocks] = useState<LessonBlock[]>(initialBlocks);
  const [open, setOpen] = useState<number | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState(() => JSON.stringify(initialBlocks, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(saveLessonBlocks, initialState);
  const [uploading, setUploading] = useState(0);
  const [removed, setRemoved] = useState<{ index: number; block: LessonBlock } | null>(null);
  const [addKind, setAddKind] = useState("prose");
  const [problems, setProblems] = useState<number[]>([]);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  /* Saving reloads the page, which re-creates this editor with the saved
     sections, so "unsaved" means "different from what we started with". */
  const initialJson = useMemo(() => JSON.stringify(initialBlocks), [initialBlocks]);
  const dirty = jsonMode ? jsonText.trim() !== JSON.stringify(initialBlocks, null, 2).trim() : JSON.stringify(blocks) !== initialJson;

  /* Local time only once on the client, so server and client agree. */
  useEffect(() => setSavedLabel(savedAtLabel(savedAt)), [savedAt]);

  /* Leaving mid-upload would lose the video; leaving with unsaved changes would lose the words. */
  useEffect(() => {
    if (uploading === 0 && !dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [uploading, dirty]);

  /* A finished upload saves the lesson at once, so the video cannot be
     lost by forgetting to press Save. Saving re-mounts this editor, so it
     waits while any other upload is still running. */
  const latest = useRef({ blocks, uploading, jsonMode });
  latest.current = { blocks, uploading, jsonMode };
  const attachVideo = (i: number, playbackId: string, durationSeconds: number) => {
    const now = latest.current;
    const next = now.blocks.map((b, j) =>
      j === i ? ({ ...b, playbackId, durationSeconds } as LessonBlock) : b
    );
    setBlocks(next);
    if (now.uploading > 1 || now.jsonMode) return;
    const data = new FormData();
    data.set("lessonId", lessonId);
    data.set("blocks", JSON.stringify(next));
    startTransition(() => formAction(data));
  };

  const replace = (i: number, next: Obj) => {
    setBlocks((prev) => prev.map((b, j) => (j === i ? (next as unknown as LessonBlock) : b)));
    setProblems((p) => p.filter((x) => x !== i));
  };
  const update = (i: number, patch: Obj) =>
    setBlocks((prev) => prev.map((b, j) => (j === i ? ({ ...b, ...patch } as LessonBlock) : b)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    setBlocks((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setProblems([]);
    if (open === i) setOpen(j);
    else if (open === j) setOpen(i);
  };
  const remove = (i: number) => {
    setRemoved({ index: i, block: blocks[i] });
    setBlocks((prev) => prev.filter((_, j) => j !== i));
    setProblems([]);
    setOpen(null);
  };
  const undoRemove = () => {
    if (!removed) return;
    setBlocks((prev) => [...prev.slice(0, removed.index), removed.block, ...prev.slice(removed.index)]);
    setOpen(removed.index);
    setRemoved(null);
  };
  const add = () => {
    const block = newSection(addKind);
    if (!block) return;
    /* A new section goes after the one being edited, or at the end. */
    const at = open === null ? blocks.length : open + 1;
    setBlocks((prev) => [...prev.slice(0, at), block, ...prev.slice(at)]);
    setOpen(at);
    setRemoved(null);
    setProblems([]);
  };

  const toggleJson = () => {
    if (jsonMode) {
      try {
        const parsed = JSON.parse(jsonText);
        if (!Array.isArray(parsed)) throw new Error("Expected a list of sections.");
        setBlocks(parsed as LessonBlock[]);
        setJsonError(null);
        setJsonMode(false);
      } catch (e) {
        setJsonError(e instanceof Error ? e.message : "That could not be read.");
      }
    } else {
      setJsonText(JSON.stringify(blocks, null, 2));
      setJsonError(null);
      setJsonMode(true);
    }
  };

  const checkBeforeSave = (e: FormEvent<HTMLFormElement>) => {
    if (jsonMode) return;
    const bad = incomplete(blocks);
    setProblems(bad);
    if (bad.length) {
      e.preventDefault();
      setOpen(bad[0]);
    }
  };

  const serialised = jsonMode ? jsonText : JSON.stringify(blocks);

  return (
    <form action={formAction} onSubmit={checkBeforeSave} className="space-y-6">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="blocks" value={serialised} />

      {jsonMode ? (
        <div>
          <label htmlFor="blocks-json" className={labelClass}>All sections as raw data (advanced)</label>
          <textarea
            id="blocks-json"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={24}
            spellCheck={false}
            className={`${inputClass} font-mono text-xs resize-y`}
          />
          {jsonError && <div className="mt-3"><FormError message={jsonError} /></div>}
        </div>
      ) : (
        <>
          <p className="font-body text-sm text-muted leading-relaxed">
            Tap a section to open it and change the words. Press Enter in any box to start a new line,
            and it will show as a new line on the site. Nothing changes for members until you press
            Save Changes.
          </p>

          <ol className="space-y-3">
            {blocks.map((block, i) => {
              const b = block as unknown as Obj;
              const isOpen = open === i;
              const flagged = problems.includes(i);
              return (
                <li
                  key={`${i}-${block.kind}`}
                  className={`bg-white rounded-2xl border shadow-sm transition-colors duration-200 ${
                    flagged ? "border-red-300" : isOpen ? "border-sage-light" : "border-grey-light"
                  }`}
                >
                  <div className="flex items-center gap-3 px-5 py-4">
                    <span className="font-heading text-xl font-light text-sage-dark w-7 text-center shrink-0">{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex-1 min-w-0 text-left min-h-[44px]"
                    >
                      <span className="block font-body text-xs text-sage-dark uppercase tracking-widest">
                        {sectionLabel(block.kind)}
                      </span>
                      <span className="block font-body text-sm text-charcoal truncate">
                        {summary(block) || <span className="text-muted">Not filled in yet</span>}
                      </span>
                    </button>
                    <div className="flex items-center gap-1 shrink-0">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move section ${i + 1} up`} title="Move up" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark disabled:opacity-30">
                        <ArrowUp size={16} />
                      </button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label={`Move section ${i + 1} down`} title="Move down" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark disabled:opacity-30">
                        <ArrowDown size={16} />
                      </button>
                      <button type="button" onClick={() => remove(i)} aria-label={`Remove section ${i + 1}`} title="Remove" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                      <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-label={isOpen ? "Close section" : "Edit section"} title={isOpen ? "Close" : "Edit"} className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark">
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Kept mounted while closed so an upload survives collapsing it. */}
                  <div hidden={!isOpen} className="border-t border-grey-light px-5 py-5 space-y-5">
                    {flagged && (
                      <FormError message="This section is missing something it needs. Fill in the boxes marked with a star, or remove the section." />
                    )}
                    {block.kind === "video" || block.kind === "audio" ? (
                      <>
                        <SectionForm value={b} onChange={(next) => replace(i, next)} photos={PRACTICE_PHOTOS} />
                        <VideoUploader
                          onReady={({ playbackId, durationSeconds }) =>
                            attachVideo(i, playbackId, durationSeconds)
                          }
                          onBusyChange={(busy) => setUploading((n) => Math.max(0, n + (busy ? 1 : -1)))}
                        />
                        <p className="font-body text-sm text-muted">
                          {b.playbackId
                            ? "A video is attached. Upload another above to replace it."
                            : "No video yet. Members see a “being prepared” message until one is uploaded."}
                        </p>
                        {Boolean(b.playbackId) && <SubtitlesButton playbackId={String(b.playbackId)} />}
                        <details className="rounded-xl border border-grey-light px-4 py-3">
                          <summary className="font-body text-sm text-muted cursor-pointer min-h-[32px]">Technical details</summary>
                          <div className="space-y-4 mt-4">
                            <SmallField
                              label="Playback ID"
                              value={String(b.playbackId ?? "")}
                              onChange={(v) => update(i, { playbackId: v.trim() })}
                              hint="Filled in automatically when you upload above. Clear it to show the “being prepared” placeholder."
                              mono
                            />
                            <SmallField
                              label="Length in seconds"
                              value={String(b.durationSeconds ?? 0)}
                              onChange={(v) => update(i, { durationSeconds: Number(v) || 0 })}
                            />
                          </div>
                        </details>
                      </>
                    ) : (
                      <SectionForm value={b} onChange={(next) => replace(i, next)} photos={PRACTICE_PHOTOS} />
                    )}
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setOpen(null)} className={secondaryButton}>
                        Done With This Section
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {removed && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-grey-light bg-white px-5 py-3">
              <p className="font-body text-sm text-muted">
                Section {removed.index + 1} ({sectionLabel(removed.block.kind)}) removed.
              </p>
              <button type="button" onClick={undoRemove} className={secondaryButton}>
                <Undo2 size={16} />
                Undo
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-dashed border-sage-light bg-sage-pale/50 p-5">
            <label htmlFor="add-section" className={labelClass}>Add a Section</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select id="add-section" value={addKind} onChange={(e) => setAddKind(e.target.value)} className={`${inputClass} text-base`}>
                {ADDABLE.map(([kind, spec]) => (
                  <option key={kind} value={kind}>
                    {spec.label}: {spec.description}
                  </option>
                ))}
              </select>
              <button type="button" onClick={add} className={`${secondaryButton} bg-white shrink-0`}>
                <Plus size={16} />
                Add Section
              </button>
            </div>
            <p className="font-body text-xs text-muted mt-2">
              {open === null ? "It is added at the end." : `It is added after section ${open + 1}, the one you have open.`}
            </p>
          </div>
        </>
      )}

      {/* The save bar stays in view while scrolling through a long lesson. */}
      <div className="sticky bottom-4 z-20 rounded-2xl border border-grey-light bg-cream/95 backdrop-blur shadow-sm px-5 py-4 space-y-3">
        {problems.length > 0 && (
          <FormError
            message={`Not saved yet. ${problems.length === 1 ? `Section ${problems[0] + 1} needs` : `Sections ${problems.map((p) => p + 1).join(", ")} need`} a little more filling in. Look for the boxes marked with a star.`}
          />
        )}
        {state.status === "error" && <FormError message={state.message} />}
        {state.status === "success" && !dirty && (
          <FormSuccess message="Saved. The preview has been updated, and members will see this the next time they open the lesson." />
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending || uploading > 0} className={primaryButton}>
            {pending ? "Saving…" : uploading > 0 ? "Waiting for the Video to Finish…" : "Save Changes"}
          </button>
          <p className="font-body text-sm text-muted" aria-live="polite">
            {dirty
              ? "You have changes that are not saved yet."
              : savedLabel
                ? `All changes saved ${savedLabel}.`
                : "No changes yet."}
          </p>
        </div>
      </div>

      <details className="pt-2" open={jsonMode}>
        <summary className="font-body text-xs text-muted cursor-pointer">Advanced</summary>
        <div className="mt-3 space-y-3">
          <p className="font-body text-xs text-muted leading-relaxed">
            Shows the raw data behind every section. Only for technical changes; everything else can be done above.
          </p>
          <button type="button" onClick={toggleJson} className={secondaryButton}>
            {jsonMode ? "Back to the Section List" : "Edit the Raw Data"}
          </button>
        </div>
      </details>
    </form>
  );
}

function SmallField({ label, value, onChange, hint, mono }: { label: string; value: string; onChange: (v: string) => void; hint?: string; mono?: boolean }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} ${mono ? "font-mono text-xs" : ""}`} />
      {hint && <p className="font-body text-xs text-muted mt-1.5">{hint}</p>}
    </div>
  );
}
