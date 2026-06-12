"use client";

import { useActionState } from "react";
import { HeartHandshake } from "lucide-react";
import { acceptInvite, type InviteFormState } from "@/app/actions/couples";
import { FormError } from "@/components/auth/FormParts";

const initialState: InviteFormState = { status: "idle" };

export default function AcceptInviteForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(
    acceptInvite,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />
      {state.status === "error" && <FormError message={state.message} />}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <HeartHandshake size={16} />
        {isPending ? "Linking Your Accounts…" : "Accept and Link Our Accounts"}
      </button>
      <p className="font-body text-xs text-muted leading-relaxed text-center">
        Linking never exposes your private reflections. You each keep your own
        space, and only what you each explicitly choose to share is ever
        visible to the other. Either of you can unlink at any time.
      </p>
    </form>
  );
}
