"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { acceptAgreement, type AgreementFormState } from "@/app/actions/agreement";
import { FormError } from "@/components/auth/FormParts";

const initialState: AgreementFormState = { status: "idle" };

export default function AgreementForm({ next, name }: { next: string; name: string }) {
  const [state, formAction, pending] = useActionState(acceptAgreement, initialState);
  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={next} />
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          name="agree"
          value="yes"
          required
          className="mt-1 w-5 h-5 shrink-0 accent-[#3A5A40]"
        />
        <span className="font-body text-base text-charcoal leading-relaxed">
          I, {name}, have read and agree to the NewFuture Therapy Couples Participation Agreement.
        </span>
      </label>
      {state.status === "error" && <FormError message={state.message} />}
      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60"
      >
        {pending ? "Saving…" : "I Agree — Continue to the Programme"}
        <ArrowRight size={16} />
      </button>
      <p className="font-body text-xs text-muted leading-relaxed">
        Your agreement is recorded against your account with today's date. You can read this
        agreement again at any time from your account page.
      </p>
    </form>
  );
}
