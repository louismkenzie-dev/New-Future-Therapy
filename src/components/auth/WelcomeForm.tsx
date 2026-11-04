"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/app/actions/auth";
import { acceptWelcome } from "@/app/actions/welcome";
import { labelClass, RequiredMark, FormError, SubmitButton } from "@/components/auth/FormParts";
import PasswordInput from "@/components/auth/PasswordInput";

const initialState: AuthFormState = { status: "idle" };

export default function WelcomeForm({ token, email }: { token: string; email: string }) {
  const [state, formAction, isPending] = useActionState(acceptWelcome, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />
      {/* Lets password managers save the new login against the right email. */}
      <input type="email" name="username" value={email} autoComplete="username" readOnly hidden />
      <div>
        <p className={labelClass}>Your Email</p>
        <p className="font-body text-base text-charcoal break-all">{email}</p>
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Choose a Password
          <RequiredMark />
        </label>
        <PasswordInput id="password" autoComplete="new-password" minLength={8} autoFocus />
        <p className="font-body text-xs text-muted mt-2">At least eight characters.</p>
      </div>

      {state.status === "error" && <FormError message={state.message} />}

      <SubmitButton pending={isPending} label="Set My Password and Begin" pendingLabel="Setting up…" />
    </form>
  );
}
