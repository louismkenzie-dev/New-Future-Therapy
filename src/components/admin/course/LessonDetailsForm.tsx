"use client";

import { useActionState } from "react";
import { saveLessonDetails, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton } from "./formStyles";

const initialState: EditorFormState = { status: "idle" };

export default function LessonDetailsForm({
  lesson,
  modules,
}: {
  lesson: { id: string; title: string; summary: string; moduleId: string; estimatedMinutes: number; sortOrder: number };
  modules: { id: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState(saveLessonDetails, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="lessonId" value={lesson.id} />
      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input id="title" name="title" defaultValue={lesson.title} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="summary" className={labelClass}>One-line summary</label>
        <textarea id="summary" name="summary" rows={2} defaultValue={lesson.summary} className={`${inputClass} resize-y`} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label htmlFor="moduleId" className={labelClass}>Module</label>
          <select id="moduleId" name="moduleId" defaultValue={lesson.moduleId} className={inputClass}>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="estimatedMinutes" className={labelClass}>Minutes</label>
          <input id="estimatedMinutes" name="estimatedMinutes" type="number" min={5} max={180} defaultValue={lesson.estimatedMinutes} className={inputClass} />
        </div>
        <div>
          <label htmlFor="sortOrder" className={labelClass}>Position</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={lesson.sortOrder} className={inputClass} />
          <p className="font-body text-xs text-muted mt-1">Lower comes first within the module.</p>
        </div>
      </div>
      {state.status === "error" && <FormError message={state.message} />}
      {state.status === "success" && <FormSuccess message={state.message} />}
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Saving…" : "Save Details"}
      </button>
    </form>
  );
}
