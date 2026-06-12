"use client";

import { useActionState } from "react";
import { updateProfile, type AuthFormState } from "@/app/actions/auth";
import {
  inputClass,
  labelClass,
  RequiredMark,
  FormError,
  FormSuccess,
  SubmitButton,
} from "@/components/auth/FormParts";

const initialState: AuthFormState = { status: "idle" };

export default function ProfileForm({
  defaultName,
  defaultPronouns,
  email,
}: {
  defaultName: string;
  defaultPronouns: string;
  email: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="account-email" className={labelClass}>
          Email
        </label>
        <input
          id="account-email"
          type="email"
          value={email}
          disabled
          className={`${inputClass} bg-sage-pale/40 text-muted cursor-not-allowed`}
        />
      </div>

      <div>
        <label htmlFor="account-name" className={labelClass}>
          Your Name
          <RequiredMark />
        </label>
        <input
          id="account-name"
          name="name"
          type="text"
          required
          defaultValue={defaultName}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="account-pronouns" className={labelClass}>
          Pronouns (Optional)
        </label>
        <input
          id="account-pronouns"
          name="pronouns"
          type="text"
          defaultValue={defaultPronouns}
          placeholder="e.g. she/her, he/him, they/them"
          className={inputClass}
        />
      </div>

      {state.status === "error" && <FormError message={state.message} />}
      {state.status === "success" && <FormSuccess message={state.message} />}

      <SubmitButton pending={isPending} label="Save Details" pendingLabel="Saving…" />
    </form>
  );
}
