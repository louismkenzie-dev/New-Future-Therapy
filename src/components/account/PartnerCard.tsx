"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { Check, Copy, HeartHandshake, Link2, Unlink } from "lucide-react";
import {
  createPartnerInvite,
  unlinkCouple,
  type InviteFormState,
} from "@/app/actions/couples";
import { FormError, FormSuccess, inputClass } from "@/components/auth/FormParts";

const initialState: InviteFormState = { status: "idle" };

interface PartnerCardProps {
  canInvitePartner: boolean;
  couple: {
    status: "pending" | "active" | "suspended";
    isOwner: boolean;
    partnerName: string | null;
  } | null;
}

export default function PartnerCard({
  canInvitePartner,
  couple,
}: PartnerCardProps) {
  const [state, formAction, isPending] = useActionState(
    createPartnerInvite,
    initialState
  );
  const [copied, setCopied] = useState(false);
  const [confirmingUnlink, setConfirmingUnlink] = useState(false);

  const copyLink = async () => {
    if (!state.inviteUrl) return;
    try {
      await navigator.clipboard.writeText(state.inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Selection fallback: the input is selectable below.
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
      <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
        Your Partner
      </p>

      {couple?.status === "active" ? (
        <>
          <h2 className="font-heading text-2xl font-light text-charcoal mb-4">
            Linked With {couple.partnerName ?? "Your Partner"}
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed mb-6">
            You are learning side by side. Each of you keeps your own private
            space — only the reflections you each choose to share are visible
            to the other.
          </p>
          {confirmingUnlink ? (
            <div className="space-y-4">
              <p className="font-body text-sm text-charcoal leading-relaxed">
                Unlinking ends all sharing between your accounts immediately.
                Nothing either of you wrote is deleted — shared reflections
                simply become private again. Are you sure?
              </p>
              <div className="flex gap-3">
                <form action={unlinkCouple}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 font-body text-sm border border-grey-light text-charcoal px-6 py-3 rounded-full hover:border-red-200 hover:text-red-600 transition-colors duration-200"
                  >
                    <Unlink size={15} />
                    Yes, Unlink Our Accounts
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setConfirmingUnlink(false)}
                  className="font-body text-sm text-muted px-4 py-3 hover:text-charcoal transition-colors duration-200"
                >
                  Keep the Link
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingUnlink(true)}
              className="inline-flex items-center gap-2 font-body text-sm border border-grey-light text-muted px-6 py-3 rounded-full hover:border-sage-light hover:text-charcoal transition-colors duration-200"
            >
              <Unlink size={15} />
              Unlink Accounts
            </button>
          )}
        </>
      ) : couple?.status === "suspended" ? (
        <>
          <h2 className="font-heading text-2xl font-light text-charcoal mb-4">
            Link Paused
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed">
            The Joint Couples plan that covered your link has ended, so sharing
            is paused. Everything you both wrote is safe — resubscribing
            restores your shared space exactly as it was.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-heading text-2xl font-light text-charcoal mb-4">
            {couple?.status === "pending"
              ? "Invitation Waiting"
              : "Learn Side by Side"}
          </h2>

          {canInvitePartner ? (
            <>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                {couple?.status === "pending"
                  ? "Your invitation has not been accepted yet. You can create a fresh link at any time — each new link replaces the last."
                  : "Your Joint Couples plan covers two linked accounts. Create a private invitation link and send it to your partner however you prefer."}
              </p>

              {state.status === "success" && state.inviteUrl ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={state.inviteUrl}
                      onFocus={(e) => e.currentTarget.select()}
                      className={`${inputClass} text-xs`}
                      aria-label="Partner invitation link"
                    />
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-5 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 shrink-0"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <FormSuccess message={state.message} />
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      "An invitation to grow together"
                    )}&body=${encodeURIComponent(
                      `I would love us to take the Growing Together course side by side. This private link joins your account to mine:\n\n${state.inviteUrl}`
                    )}`}
                    className="inline-block font-body text-sm text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
                  >
                    Or send it by email
                  </a>
                </div>
              ) : (
                <form action={formAction}>
                  {state.status === "error" && (
                    <div className="mb-4">
                      <FormError message={state.message} />
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Link2 size={15} />
                    {isPending
                      ? "Creating Your Link…"
                      : couple?.status === "pending"
                        ? "Create a Fresh Invitation Link"
                        : "Create an Invitation Link"}
                  </button>
                </form>
              )}
            </>
          ) : (
            <p className="font-body text-sm text-muted leading-relaxed">
              <HeartHandshake size={16} className="inline mr-2 text-sage-dark" />
              Linking accounts is part of the{" "}
              <Link
                href="/courses"
                className="text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
              >
                Joint Couples plan
              </Link>
              . Each of you keeps a fully private space, and you choose —
              reflection by reflection — what to share.
            </p>
          )}
        </>
      )}
    </div>
  );
}
