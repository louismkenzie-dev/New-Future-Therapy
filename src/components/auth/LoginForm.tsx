"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthFormState } from "@/app/actions/auth";
import {
  inputClass,
  labelClass,
  RequiredMark,
  FormError,
  SubmitButton,
} from "@/components/auth/FormParts";

const initialState: AuthFormState = { status: "idle" };

export default function LoginForm({
  next,
  linkError,
}: {
  next: string;
  linkError?: boolean;
}) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={next} />

      {linkError && state.status === "idle" && (
        <FormError message="That link has expired or has already been used. Please sign in, or request a new link." />
      )}

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

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
          <RequiredMark />
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
        <p className="font-body text-xs text-muted mt-2 text-right">
          <Link
            href="/forgot-password"
            className="hover:text-charcoal transition-colors duration-200 underline underline-offset-4"
          >
            Forgotten your password?
          </Link>
        </p>
      </div>

      {state.status === "error" && <FormError message={state.message} />}

      <SubmitButton pending={isPending} label="Sign In" pendingLabel="Signing in…" />
    </form>
  );
}
