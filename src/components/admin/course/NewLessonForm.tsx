"use client";

import { useActionState, useState } from "react";
import { FileUp, Sparkles, Wand2 } from "lucide-react";
import { createLessonFromUpload, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton } from "./formStyles";

const initialState: EditorFormState = { status: "idle" };

export default function NewLessonForm({
  modules,
  defaultModuleId,
}: {
  modules: { id: string; label: string }[];
  defaultModuleId?: string;
}) {
  const [state, formAction, pending] = useActionState(createLessonFromUpload, initialState);
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <label htmlFor="moduleId" className={labelClass}>
          Which module is this lesson part of?
        </label>
        <select id="moduleId" name="moduleId" defaultValue={defaultModuleId ?? modules[0]?.id} className={inputClass} required>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
        <p className="font-body text-xs text-muted mt-2">
          Need a new module? Add it on the Course page first, then come back here.
        </p>
      </div>

      <div>
        <label htmlFor="files" className={labelClass}>
          Your material
        </label>
        <label
          htmlFor="files"
          className="flex flex-col items-center justify-center gap-3 border border-dashed border-sage-light rounded-2xl bg-sage-pale/50 px-6 py-10 text-center cursor-pointer hover:bg-sage-pale transition-colors duration-200"
        >
          <FileUp size={28} className="text-sage-dark" strokeWidth={1.5} />
          <span className="font-body text-sm text-charcoal">
            {fileNames.length ? fileNames.join(", ") : "Choose one or more files"}
          </span>
          <span className="font-body text-xs text-muted">
            Word documents (.docx), PDFs or plain text — a video script, a question sheet, a worksheet. Upload everything for one lesson together.
          </span>
        </label>
        <input
          id="files"
          name="files"
          type="file"
          multiple
          accept=".docx,.pdf,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
          className="sr-only"
          onChange={(e) => setFileNames(Array.from(e.target.files ?? []).map((f) => f.name))}
        />
      </div>

      <div>
        <label htmlFor="pastedText" className={labelClass}>
          Or paste the text here
        </label>
        <textarea id="pastedText" name="pastedText" rows={6} className={`${inputClass} resize-y`} placeholder="Paste a script, questions or worksheet text…" />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything the editor should know? (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className={`${inputClass} resize-y`}
          placeholder="e.g. “This is Part 2 of Module 1 — four individual questions, then two to answer together.” or “Keep the check-in as sliders out of ten.”"
        />
      </div>

      {state.status === "error" && <FormError message={state.message} />}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? <Sparkles size={16} className="animate-pulse" /> : <Wand2 size={16} />}
          {pending ? "Formatting your lesson…" : "Format Into a Lesson"}
        </button>
        <span className="font-body text-xs text-muted">
          {pending
            ? "This usually takes about a minute. Please keep this page open."
            : "You will be able to preview and adjust it before anyone sees it."}
        </span>
      </div>
    </form>
  );
}
