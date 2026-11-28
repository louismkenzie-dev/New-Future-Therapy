"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { claimTesterAccess, type TesterFormState } from "@/app/actions/testers";
import Honeypot from "@/components/testers/Honeypot";
import { FormErrorBox, FormSuccessPanel } from "@/components/testers/FormStatus";
import { fieldClass, fieldLabel, submitClass } from "@/components/testers/formStyles";

const initialState: TesterFormState = { status: "idle" };

export default function ClaimAccessForm({ testerKey }: { testerKey: string }) {
  const [state, formAction, pending] = useActionState(claimTesterAccess, initialState);

  if (state.status === "success") {
    return <FormSuccessPanel title="Your Place Is Ready" message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      <Honeypot />
      <input type="hidden" name="key" value={testerKey} />

      <fieldset className="space-y-4">
        <legend className="font-heading text-2xl font-light text-charcoal mb-4">About You</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="claim-name" className={fieldLabel}>
              First Name <span className="text-sage-dark">*</span>
            </label>
            <input id="claim-name" name="name" required autoComplete="given-name" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="claim-email" className={fieldLabel}>
              Email <span className="text-sage-dark">*</span>
            </label>
            <input id="claim-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-heading text-2xl font-light text-charcoal mb-1">Your Partner</legend>
        <p className="font-body text-sm text-muted leading-relaxed">
          Optional. Add your partner and we will invite them too, so you can share reflections as
          you go. You are just as welcome to explore the programme on your own.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="claim-partner-name" className={fieldLabel}>
              Partner&rsquo;s First Name
            </label>
            <input id="claim-partner-name" name="partner-name" autoComplete="off" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="claim-partner-email" className={fieldLabel}>
              Partner&rsquo;s Email
            </label>
            <input id="claim-partner-email" name="partner-email" type="email" autoComplete="off" className={fieldClass} />
          </div>
        </div>
      </fieldset>

      <div className="flex items-start gap-3 p-4 bg-sage-pale/60 rounded-lg border border-sage-light/50">
        <input
          id="claim-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 w-5 h-5 shrink-0 rounded border-grey-light accent-[#3A5A40] cursor-pointer"
        />
        <label htmlFor="claim-consent" className="font-body text-sm text-muted leading-relaxed cursor-pointer">
          I consent to NewFuture Therapy creating programme accounts for the people named above and
          emailing each of us a sign-in link, as described in the{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
          >
            Privacy &amp; Data Protection Policy
          </a>
          . <span className="text-sage-dark">*</span>
        </label>
      </div>

      {state.status === "error" && <FormErrorBox message={state.message} />}

      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Setting Up Your Access…" : "Claim Our Free Access"}
        {!pending && <ArrowRight size={16} />}
      </button>
    </form>
  );
}
