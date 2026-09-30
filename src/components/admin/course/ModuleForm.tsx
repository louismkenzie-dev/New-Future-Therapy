"use client";

import { useActionState, useState } from "react";
import { Plus } from "lucide-react";
import { saveModule, type EditorFormState } from "@/app/actions/courseEditor";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton, secondaryButton } from "./formStyles";

const initialState: EditorFormState = { status: "idle" };

export default function ModuleForm({
  module,
  nextNumber,
}: {
  module?: { id: string; number: number; title: string; lede: string; essence: string };
  nextNumber: number;
}) {
  const [openForm, setOpenForm] = useState(Boolean(module));
  const [state, formAction, pending] = useActionState(saveModule, initialState);

  if (!openForm) {
    return (
      <button type="button" onClick={() => setOpenForm(true)} className={secondaryButton}>
        <Plus size={16} />
        Add a Module
      </button>
    );
  }

  return (
    <form action={formAction} className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 space-y-5">
      {module && <input type="hidden" name="moduleId" value={module.id} />}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label htmlFor="module-number" className={labelClass}>Number</label>
          <input id="module-number" name="number" type="number" min={0} defaultValue={module?.number ?? nextNumber} className={inputClass} required />
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="module-title" className={labelClass}>Title</label>
          <input id="module-title" name="title" defaultValue={module?.title ?? ""} className={inputClass} required placeholder="e.g. Communication" />
        </div>
      </div>
      <div>
        <label htmlFor="module-lede" className={labelClass}>Short description</label>
        <textarea id="module-lede" name="lede" rows={2} defaultValue={module?.lede ?? ""} className={`${inputClass} resize-y`} />
      </div>
      <div>
        <label htmlFor="module-essence" className={labelClass}>One-line essence (optional)</label>
        <input id="module-essence" name="essence" defaultValue={module?.essence ?? ""} className={inputClass} />
      </div>
      {state.status === "error" && <FormError message={state.message} />}
      {state.status === "success" && <FormSuccess message={state.message} />}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? "Saving…" : module ? "Save Module" : "Add Module"}
        </button>
        {!module && (
          <button type="button" onClick={() => setOpenForm(false)} className={secondaryButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
