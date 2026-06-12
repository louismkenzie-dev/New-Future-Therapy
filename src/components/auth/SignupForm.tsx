"use client";

import { useActionState } from "react";
import { signUp, type AuthFormState } from "@/app/actions/auth";
import {
  inputClass,
  labelClass,
  RequiredMark,
  FormError,
  FormSuccess,
  SubmitButton,
} from "@/components/auth/FormParts";

const initialState: AuthFormState = { status: "idle" };

export default function SignupForm({ next }: { next: string }) {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  if (state.status === "success") {
    return <FormSuccess message={state.message} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="name" className={labelClass}>
          Your Name
          <RequiredMark />
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="pronouns" className={labelClass}>
          Pronouns (Optional)
        </label>
        <input
          id="pronouns"
          name="pronouns"
          type="text"
          autoComplete="off"
          placeholder="e.g. she/her, he/him, they/them"
          className={inputClass}
        />
      </div>

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
        label="Create Account"
        pendingLabel="Creating your account…"
      />

      <p className="font-body text-xs text-muted leading-relaxed text-center">
        Your details are held securely and handled under GDPR. Creating an
        account does not subscribe you to anything.
      </p>
    </form>
  );
}
