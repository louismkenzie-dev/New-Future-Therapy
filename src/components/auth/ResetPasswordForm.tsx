"use client";

import { useActionState } from "react";
import { updatePassword, type AuthFormState } from "@/app/actions/auth";
import {
  inputClass,
  labelClass,
  RequiredMark,
  FormError,
  SubmitButton,
} from "@/components/auth/FormParts";

const initialState: AuthFormState = { status: "idle" };

export default function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="password" className={labelClass}>
          New Password
          <RequiredMark />
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
        <p className="font-body text-xs text-muted mt-2">
          At least eight characters.
        </p>
      </div>

      {state.status === "error" && <FormError message={state.message} />}

      <SubmitButton
        pending={isPending}
        label="Save New Password"
        pendingLabel="Saving…"
      />
    </form>
  );
}
