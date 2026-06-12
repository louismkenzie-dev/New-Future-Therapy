"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";
import { siteUrl } from "@/lib/siteUrl";

export interface AuthFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* next must stay on-site — never redirect a member to an external URL. */
function safeNext(raw: string | undefined, fallback: string): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return fallback;
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const pronouns = formData.get("pronouns")?.toString().trim() ?? "";
  const next = safeNext(formData.get("next")?.toString(), "/learn");

  if (!name || !email || !password) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return {
      status: "error",
      message: "Please choose a password of at least eight characters.",
    };
  }

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name, pronouns },
      emailRedirectTo: `${siteUrl()}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      return {
        status: "error",
        message:
          "An account with that email address already exists. Please sign in instead.",
      };
    }
    console.error("Sign-up failed:", error);
    return {
      status: "error",
      message: "Something went wrong creating your account. Please try again.",
    };
  }

  // Email confirmation disabled in Supabase → session is live immediately.
  if (data.session) redirect(next);

  return {
    status: "success",
    message:
      "Welcome. We have sent a confirmation link to your email address — please open it to finish creating your account.",
  };
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const next = safeNext(formData.get("next")?.toString(), "/learn");

  if (!email || !password) {
    return { status: "error", message: "Please enter your email and password." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      status: "error",
      message:
        "We could not sign you in with those details. Please check them and try again.",
    };
  }

  redirect(next);
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get("email")?.toString().trim() ?? "";

  if (!email || !emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const supabase = await createServerSupabase();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/confirm?next=${encodeURIComponent("/reset-password")}`,
  });

  // Always succeed so the form cannot be used to discover accounts.
  return {
    status: "success",
    message:
      "If an account exists for that address, we have sent a link to reset your password. Please check your email.",
  };
}

export async function updatePassword(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const password = formData.get("password")?.toString() ?? "";

  if (password.length < 8) {
    return {
      status: "error",
      message: "Please choose a password of at least eight characters.",
    };
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      status: "error",
      message:
        "Your reset link has expired. Please request a new one from the sign-in page.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error("Password update failed:", error);
    return {
      status: "error",
      message: "Something went wrong updating your password. Please try again.",
    };
  }

  redirect("/learn");
}

export async function updateProfile(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const user = await requireUser("/account");
  const name = formData.get("name")?.toString().trim() ?? "";
  const pronouns = formData.get("pronouns")?.toString().trim() ?? "";

  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: name, pronouns: pronouns || null })
    .eq("id", user.id);

  if (error) {
    console.error("Profile update failed:", error);
    return {
      status: "error",
      message: "Something went wrong saving your details. Please try again.",
    };
  }

  return { status: "success", message: "Your details have been saved." };
}
