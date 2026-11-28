"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { submitFeedback, type TesterFormState } from "@/app/actions/testers";
import Honeypot from "@/components/testers/Honeypot";
import { FormErrorBox, FormSuccessPanel } from "@/components/testers/FormStatus";
import { fieldClass, fieldLabel, submitClass } from "@/components/testers/formStyles";

const initialState: TesterFormState = { status: "idle" };

const PROGRESS = [
  "I have not started yet",
  "I have watched the introduction",
  "I am part way through",
  "I have finished the programme",
];

/* Feedback for Laura and Esther. Used on the private tester page (with the
   page key) and in the member area (signed in, name and email prefilled). */
export default function FeedbackForm({
  testerKey,
  defaultName = "",
  defaultEmail = "",
}: {
  testerKey?: string;
  defaultName?: string;
  defaultEmail?: string;
}) {
  const [state, formAction, pending] = useActionState(submitFeedback, initialState);

  if (state.status === "success") {
    return <FormSuccessPanel title="Thank You" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      <Honeypot />
      {testerKey && <input type="hidden" name="key" value={testerKey} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fb-name" className={fieldLabel}>
            Name <span className="text-sage-dark">*</span>
          </label>
          <input id="fb-name" name="name" required defaultValue={defaultName} autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="fb-email" className={fieldLabel}>
            Email <span className="text-sage-dark">*</span>
          </label>
          <input
            id="fb-email"
            name="email"
            type="email"
            required
            defaultValue={defaultEmail}
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset>
        <legend className={fieldLabel}>Overall, How Would You Rate the Programme?</legend>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="radio" name="rating" value={n} className="peer sr-only" />
              <span className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] px-4 rounded-full border border-grey-light bg-white font-body text-sm text-charcoal transition-colors duration-200 peer-checked:bg-sage-dark peer-checked:border-sage-dark peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-sage hover:border-sage-light">
                {n}
              </span>
            </label>
          ))}
          <span className="self-center font-body text-xs text-muted ml-2">1 = not for me, 5 = excellent</span>
        </div>
      </fieldset>

      <div>
        <label htmlFor="fb-progress" className={fieldLabel}>How Far Have You Got?</label>
        <select id="fb-progress" name="progress" defaultValue="" className={fieldClass}>
          <option value="">Please select…</option>
          {PROGRESS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="fb-worked" className={fieldLabel}>What Worked Well for You?</label>
        <textarea id="fb-worked" name="worked-well" rows={4} className={`${fieldClass} resize-y`} />
      </div>

      <div>
        <label htmlFor="fb-improve" className={fieldLabel}>What Could Be Better, Clearer or Different?</label>
        <textarea id="fb-improve" name="could-improve" rows={4} className={`${fieldClass} resize-y`} />
      </div>

      <div>
        <label htmlFor="fb-pro" className={fieldLabel}>Your Professional Perspective</label>
        <p className="font-body text-sm text-muted mb-2">
          Would it suit your clients or the people you work with? Is anything missing?
        </p>
        <textarea id="fb-pro" name="professional-view" rows={4} className={`${fieldClass} resize-y`} />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 bg-sage-pale/60 rounded-lg border border-sage-light/50 cursor-pointer">
          <input
            name="partner-interest"
            type="checkbox"
            className="mt-0.5 w-5 h-5 shrink-0 rounded border-grey-light accent-[#3A5A40]"
          />
          <span className="font-body text-sm text-muted leading-relaxed">
            I would like to talk about becoming a referral partner.
          </span>
        </label>
        <label className="flex items-start gap-3 p-4 rounded-lg border border-grey-light bg-white cursor-pointer">
          <input name="may-quote" type="checkbox" className="mt-0.5 w-5 h-5 shrink-0 rounded border-grey-light accent-[#3A5A40]" />
          <span className="font-body text-sm text-muted leading-relaxed">
            You may quote my feedback anonymously when you talk about the programme.
          </span>
        </label>
      </div>

      {state.status === "error" && <FormErrorBox message={state.message} />}

      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Sending…" : "Send My Feedback"}
        {!pending && <ArrowRight size={16} />}
      </button>
      <p className="font-body text-xs text-muted">
        Your feedback goes only to Laura and Esther. Every field is optional apart from your name and
        email.
      </p>
    </form>
  );
}
