"use client";

import { useActionState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { refineLesson, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton } from "./formStyles";

const initialState: EditorFormState = { status: "idle" };

const SUGGESTIONS = [
  "Make the introduction shorter",
  "Turn the list of themes into icon cards",
  "Add a tap-to-answer question after the video",
  "Split this into two lessons’ worth of steps — keep only Part 1 here",
  "Move the couples questions to the end",
];

export default function RefineForm({ lessonId }: { lessonId: string }) {
  const [state, formAction, pending] = useActionState(refineLesson, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="lessonId" value={lessonId} />
      <label htmlFor="instruction" className={labelClass}>
        Ask for a change, in plain English
      </label>
      <textarea
        id="instruction"
        name="instruction"
        rows={3}
        required
        disabled={pending}
        className={`${inputClass} resize-y`}
        placeholder="e.g. “Make the welcome shorter and put the four benefits into cards.”"
      />
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending}
            onClick={(e) => {
              const field = (e.currentTarget.form?.elements.namedItem("instruction") as HTMLTextAreaElement | null);
              if (field) field.value = s;
            }}
            className="font-body text-xs text-sage-dark bg-sage-pale border border-sage-light/50 rounded-full px-3 py-1.5 hover:bg-white transition-colors duration-200"
          >
            {s}
          </button>
        ))}
      </div>
      {state.status === "error" && <FormError message={state.message} />}
      {state.status === "success" && <FormSuccess message={state.message} />}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? <Sparkles size={16} className="animate-pulse" /> : <Wand2 size={16} />}
          {pending ? "Making the change…" : "Make This Change"}
        </button>
        {pending && <span className="font-body text-xs text-muted">Usually under a minute.</span>}
      </div>
    </form>
  );
}
