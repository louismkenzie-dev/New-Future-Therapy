"use client";

import { useActionState } from "react";
import { StickyNote } from "lucide-react";
import { addPathNote, type PathFormState } from "@/app/actions/learningPath";
import {
  inputClass,
  labelClass,
  FormError,
  FormSuccess,
} from "@/components/auth/FormParts";

const initialState: PathFormState = { status: "idle" };

export default function AddNoteForm() {
  const [state, formAction, isPending] = useActionState(
    addPathNote,
    initialState
  );

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
      <div className="flex items-center gap-3 mb-4">
        <StickyNote size={18} className="text-sage-dark" />
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em]">
          Add a Note
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="path-note" className={labelClass}>
            Something you want to remember
          </label>
          <textarea
            id="path-note"
            name="note"
            rows={3}
            placeholder="An insight, an intention, a sentence worth keeping…"
            className={`${inputClass} resize-y min-h-20`}
          />
        </div>
        {state.status === "error" && <FormError message={state.message} />}
        {state.status === "success" && <FormSuccess message={state.message} />}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving…" : "Save to My Path"}
        </button>
      </form>
    </div>
  );
}
