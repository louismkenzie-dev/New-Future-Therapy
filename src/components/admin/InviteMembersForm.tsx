"use client";

import { useActionState, useState } from "react";
import { Check, Copy, UserPlus } from "lucide-react";
import { inviteMembers, type InviteResult } from "@/app/actions/adminInvites";
import { FormError, FormSuccess } from "@/components/auth/FormParts";
import { inputClass, labelClass, primaryButton } from "@/components/admin/course/formStyles";

const initialState: InviteResult = { status: "idle" };

function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-charcoal px-5 py-2 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200 shrink-0"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied" : "Copy Link"}
    </button>
  );
}

/* Give someone course access while public sign-ups are closed. */
export default function InviteMembersForm() {
  const [state, formAction, pending] = useActionState(inviteMembers, initialState);
  const [open, setOpen] = useState(false);

  if (!open && state.status !== "success") {
    return (
      <button type="button" onClick={() => setOpen(true)} className={primaryButton}>
        <UserPlus size={16} />
        Invite Someone
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
      <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-2">Invite Someone</p>
      <p className="font-body text-sm text-muted leading-relaxed mb-6 max-w-2xl">
        Creates their account with complimentary access and gives you a personal link to send them,
        by WhatsApp or email. They choose their own password. Add a partner to link the two of you
        as a couple. Links work for fourteen days and can be used once.
      </p>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="invite-name" className={labelClass}>First Name <span className="text-sage">*</span></label>
            <input id="invite-name" name="name" required className={inputClass} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="invite-email" className={labelClass}>Email <span className="text-sage">*</span></label>
            <input id="invite-email" name="email" type="email" required className={inputClass} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="partner-name" className={labelClass}>Partner’s First Name (optional)</label>
            <input id="partner-name" name="partner-name" className={inputClass} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="partner-email" className={labelClass}>Partner’s Email (optional)</label>
            <input id="partner-email" name="partner-email" type="email" className={inputClass} autoComplete="off" />
          </div>
        </div>

        {state.status === "error" && <FormError message={state.message} />}

        <button type="submit" disabled={pending} className={primaryButton}>
          <UserPlus size={16} />
          {pending ? "Creating…" : "Create Account and Link"}
        </button>
      </form>

      {state.status === "success" && state.links && (
        <div className="mt-8 space-y-3">
          <FormSuccess message={state.message} />
          {state.links.map((link) => (
            <div
              key={link.email}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-sage-light/60 bg-sage-pale p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-charcoal">
                  {link.name} · {link.email}
                  {link.existing && <span className="text-muted"> (existing account, fresh link)</span>}
                </p>
                <p className="font-mono text-xs text-muted break-all mt-1">{link.url}</p>
              </div>
              <CopyLink url={link.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
