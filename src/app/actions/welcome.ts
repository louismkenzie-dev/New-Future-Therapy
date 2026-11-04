"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { createServerSupabase } from "@/lib/supabase/server";
import { findWelcomeInvite, markWelcomeUsed } from "@/lib/memberInvites";
import { LIMITS, TOO_MANY, rateLimitByIp } from "@/lib/rateLimit";
import { MAX } from "@/lib/limits";
import type { AuthFormState } from "@/app/actions/auth";

/* Accept a team-issued welcome link: set the member's own password, sign
   them in and take them into the programme. */
export async function acceptWelcome(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  if (!(await rateLimitByIp(LIMITS.signup))) return { status: "error", message: TOO_MANY };
  const token = formData.get("token")?.toString() ?? "";
  const password = (formData.get("password")?.toString() ?? "").slice(0, MAX.password);

  if (password.length < 8) {
    return { status: "error", message: "Please choose a password of at least eight characters." };
  }

  const invite = await findWelcomeInvite(token);
  if (!invite) {
    return {
      status: "error",
      message: "This welcome link has expired or has already been used. Please ask us for a fresh one.",
    };
  }

  const { error } = await supabaseAdmin().auth.admin.updateUserById(invite.userId, { password });
  if (error) {
    console.error("Welcome password set failed:", error);
    return {
      status: "error",
      message: "That password could not be saved. Please try a different one, at least eight characters long.",
    };
  }
  await markWelcomeUsed(invite.id);

  const supabase = await createServerSupabase();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email: invite.email, password });
  if (signInError) redirect("/login");
  redirect("/learn");
}
