"use client";

import { useActionState, useState } from "react";
import { UserPlus } from "lucide-react";
import { addReferralPartner, type PartnerFormState } from "@/app/actions/adminReferrals";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton } from "@/components/admin/course/formStyles";

const initialState: PartnerFormState = { status: "idle" };

function suggestCode(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? "";
  return first ? `${first.toUpperCase().replace(/[^A-Z0-9]/g, "")}10` : "";
}

export default function AddPartnerForm() {
  const [state, formAction, pending] = useActionState(addReferralPartner, initialState);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeEdited, setCodeEdited] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={primaryButton}>
        <UserPlus size={16} />
        Add a Referral Partner
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
      <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-2">Add a Referral Partner</p>
      <p className="font-body text-sm text-muted leading-relaxed mb-6 max-w-2xl">
        Creates their personal code in Stripe. Their clients get 10% off when they use it, and the
        commission they earn appears below automatically.
      </p>
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="partner-name" className={labelClass}>Name <span className="text-sage">*</span></label>
            <input
              id="partner-name"
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!codeEdited) setCode(suggestCode(e.target.value));
              }}
              className={inputClass}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="partner-email" className={labelClass}>Email <span className="text-sage">*</span></label>
            <input id="partner-email" name="email" type="email" required className={inputClass} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="partner-code" className={labelClass}>Their Code <span className="text-sage">*</span></label>
            <input
              id="partner-code"
              name="code"
              required
              value={code}
              onChange={(e) => {
                setCodeEdited(true);
                setCode(e.target.value.toUpperCase());
              }}
              placeholder="SARAH10"
              className={`${inputClass} uppercase tracking-wider`}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="partner-notes" className={labelClass}>Notes (optional)</label>
            <input id="partner-notes" name="notes" placeholder="e.g. counsellor in Leeds" className={inputClass} autoComplete="off" />
          </div>
        </div>
        {state.status === "error" && <FormError message={state.message} />}
        {state.status === "success" && <FormSuccess message={state.message} />}
        <button type="submit" disabled={pending} className={primaryButton}>
          <UserPlus size={16} />
          {pending ? "Creating…" : "Create Their Code"}
        </button>
      </form>
    </div>
  );
}
