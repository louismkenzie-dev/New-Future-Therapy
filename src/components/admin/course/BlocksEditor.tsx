"use client";

import { useActionState, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Trash2 } from "lucide-react";
import { saveLessonBlocks, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import type { LessonBlock } from "@/lib/content/courses";
import { inputClass, labelClass, primaryButton, secondaryButton } from "./formStyles";
import VideoUploader from "./VideoUploader";

/* Section-by-section editing: reorder, remove, and edit the common text of
   each block in place. Anything more structural is a plain-English request
   to the formatter (RefineForm), or — for the confident — the JSON view. */

const initialState: EditorFormState = { status: "idle" };

const KIND_LABELS: Record<string, string> = {
  video: "Video",
  audio: "Audio",
  prose: "Text",
  quote: "Quote",
  callout: "Callout",
  photo: "Photo",
  iconCards: "Icon cards",
  flow: "Journey (steps)",
  accordion: "Click-to-open sections",
  contrast: "Two columns",
  flipCards: "Flip cards",
  tapChoice: "Tap-to-answer",
  pairedReflection: "Paired reflection",
  journal: "Private journal",
  sharedJournal: "Shareable journal",
  checkin: "Check-in",
  worksheet: "Worksheet",
  quiz: "Self-assessment",
  download: "Download",
};

function summary(block: LessonBlock): string {
  const b = block as unknown as Record<string, unknown>;
  const first =
    (typeof b.heading === "string" && b.heading) ||
    (typeof b.title === "string" && b.title) ||
    (typeof b.text === "string" && b.text) ||
    (typeof b.body === "string" && b.body) ||
    "";
  return first.length > 90 ? `${first.slice(0, 90)}…` : first;
}

export default function BlocksEditor({
  lessonId,
  initialBlocks,
}: {
  lessonId: string;
  initialBlocks: LessonBlock[];
}) {
  const [blocks, setBlocks] = useState<LessonBlock[]>(initialBlocks);
  const [open, setOpen] = useState<number | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState(() => JSON.stringify(initialBlocks, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(saveLessonBlocks, initialState);

  const update = (i: number, patch: Record<string, unknown>) =>
    setBlocks((prev) => prev.map((b, j) => (j === i ? ({ ...b, ...patch } as LessonBlock) : b)));
  const move = (i: number, dir: -1 | 1) =>
    setBlocks((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const remove = (i: number) => setBlocks((prev) => prev.filter((_, j) => j !== i));

  const toggleJson = () => {
    if (jsonMode) {
      try {
        const parsed = JSON.parse(jsonText);
        if (!Array.isArray(parsed)) throw new Error("Expected a list of sections.");
        setBlocks(parsed as LessonBlock[]);
        setJsonError(null);
        setJsonMode(false);
      } catch (e) {
        setJsonError(e instanceof Error ? e.message : "That JSON could not be read.");
      }
    } else {
      setJsonText(JSON.stringify(blocks, null, 2));
      setJsonError(null);
      setJsonMode(true);
    }
  };

  const serialised = jsonMode ? jsonText : JSON.stringify(blocks);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="blocks" value={serialised} />

      {jsonMode ? (
        <div>
          <label htmlFor="blocks-json" className={labelClass}>All sections as JSON (advanced)</label>
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
        <ol className="space-y-3">
          {blocks.map((block, i) => {
            const b = block as unknown as Record<string, unknown>;
            const isOpen = open === i;
            return (
              <li key={`${i}-${block.kind}`} className="bg-white rounded-2xl border border-grey-light shadow-sm">
                <div className="flex items-center gap-3 px-5 py-4">
                  <span className="font-heading text-xl font-light text-sage w-7 text-center shrink-0">{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex-1 min-w-0 text-left"
                  >
                    <span className="block font-body text-xs text-sage-dark uppercase tracking-widest">
                      {KIND_LABELS[block.kind] ?? block.kind}
                    </span>
                    <span className="block font-body text-sm text-charcoal truncate">{summary(block) || "—"}</span>
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark disabled:opacity-30">
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="Move down" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark disabled:opacity-30">
                      <ArrowDown size={16} />
                    </button>
                    <button type="button" onClick={() => remove(i)} aria-label="Remove section" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-label="Edit section" className="w-10 h-10 inline-flex items-center justify-center rounded-full text-muted hover:text-sage-dark">
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-grey-light px-5 py-5 space-y-4">
                    {block.kind === "video" || block.kind === "audio" ? (
                      <>
                        <Field label="Title" value={String(b.title ?? "")} onChange={(v) => update(i, { title: v })} />
                        <VideoUploader
                          onReady={({ playbackId, durationSeconds }) =>
                            update(i, { playbackId, durationSeconds })
                          }
                        />
                        <Field
                          label="Playback ID"
                          value={String(b.playbackId ?? "")}
                          onChange={(v) => update(i, { playbackId: v.trim() })}
                          hint={
                            b.playbackId
                              ? "A video is attached. Upload another above to replace it, or clear this to show the “being prepared” placeholder."
                              : "Filled in automatically when you upload above. (If you manage videos in Mux yourself, paste a Signed playback ID here.)"
                          }
                          mono
                        />
                        <Field
                          label="Length in seconds"
                          value={String(b.durationSeconds ?? 0)}
                          onChange={(v) => update(i, { durationSeconds: Number(v) || 0 })}
                        />
                      </>
                    ) : block.kind === "prose" ? (
                      <>
                        <Field label="Heading (optional)" value={String(b.heading ?? "")} onChange={(v) => update(i, { heading: v || undefined })} />
                        <Area label="Text" value={String(b.body ?? "")} onChange={(v) => update(i, { body: v })} hint="Blank line between paragraphs. Start each line with “- ” for a list." />
                      </>
                    ) : block.kind === "quote" ? (
                      <>
                        <Area label="Quote" value={String(b.text ?? "")} onChange={(v) => update(i, { text: v })} rows={3} />
                        <Field label="Attribution (optional)" value={String(b.attribution ?? "")} onChange={(v) => update(i, { attribution: v || undefined })} />
                      </>
                    ) : block.kind === "callout" ? (
                      <>
                        <Field label="Title" value={String(b.title ?? "")} onChange={(v) => update(i, { title: v })} />
                        <Area label="Text" value={String(b.body ?? "")} onChange={(v) => update(i, { body: v })} />
                      </>
                    ) : (
                      <JsonField block={block} onChange={(next) => setBlocks((prev) => prev.map((x, j) => (j === i ? next : x)))} />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {state.status === "error" && <FormError message={state.message} />}
      {state.status === "success" && <FormSuccess message={state.message} />}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving…" : "Save Sections"}
        </button>
        <button type="button" onClick={toggleJson} className={secondaryButton}>
          {jsonMode ? "Back to the Section List" : "Edit as JSON (advanced)"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, hint, mono }: { label: string; value: string; onChange: (v: string) => void; hint?: string; mono?: boolean }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={`${inputClass} ${mono ? "font-mono text-xs" : ""}`} />
      {hint && <p className="font-body text-xs text-muted mt-1.5">{hint}</p>}
    </div>
  );
}

function Area({ label, value, onChange, hint, rows = 6 }: { label: string; value: string; onChange: (v: string) => void; hint?: string; rows?: number }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${inputClass} resize-y`} />
      {hint && <p className="font-body text-xs text-muted mt-1.5">{hint}</p>}
    </div>
  );
}

function JsonField({ block, onChange }: { block: LessonBlock; onChange: (b: LessonBlock) => void }) {
  const [text, setText] = useState(() => JSON.stringify(block, null, 2));
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <label className={labelClass}>This section’s content (JSON)</label>
      <textarea
        value={text}
        spellCheck={false}
        rows={14}
        onChange={(e) => {
          setText(e.target.value);
          try {
            const parsed = JSON.parse(e.target.value);
            setError(null);
            onChange(parsed as LessonBlock);
          } catch {
            setError("Keep typing — this is not valid JSON yet.");
          }
        }}
        className={`${inputClass} font-mono text-xs resize-y`}
      />
      <p className="font-body text-xs text-muted mt-1.5">
        {error ?? "For wording changes it is usually easier to ask for the change in plain English above."}
      </p>
    </div>
  );
}
