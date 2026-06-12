"use client";

import { useActionState } from "react";
import { requestPasswordReset, type AuthFormState } from "@/app/actions/auth";
import {
  inputClass,
  labelClass,
  RequiredMark,
  FormError,
  FormSuccess,
  SubmitButton,
} from "@/components/auth/FormParts";

const initialState: AuthFormState = { status: "idle" };

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordReset,
    initialState
  );

  if (state.status === "success") {
    return <FormSuccess message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
          <RequiredMark />
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      {state.status === "error" && <FormError message={state.message} />}

      <SubmitButton
        pending={isPending}
        label="Send Reset Link"
        pendingLabel="Sending…"
      />
    </form>
  );
}
