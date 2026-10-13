"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { supabaseAdmin } from "@/lib/supabase";
import { AGREEMENT_VERSION } from "@/lib/content/participationAgreement";
import { safeNext as safeRedirect } from "@/lib/safeRedirect";

export interface AgreementFormState {
  status: "idle" | "error";
  message?: string;
}

/* Records the member's acceptance of the current agreement version. */
export async function acceptAgreement(
  _prev: AgreementFormState,
  formData: FormData
): Promise<AgreementFormState> {
  const user = await requireUser("/learn/agreement");
  if (formData.get("agree") !== "yes") {
    return { status: "error", message: "Please tick the box to confirm you agree." };
  }
  const safeNext = safeRedirect(formData.get("next")?.toString(), "/learn");

  const { error } = await supabaseAdmin()
    .from("profiles")
    .update({ agreement_version: AGREEMENT_VERSION, agreement_accepted_at: new Date().toISOString() })
    .eq("id", user.id);
  if (error) {
    console.error("Agreement save failed:", error);
    return { status: "error", message: "Something went wrong saving your agreement. Please try again." };
  }
  revalidatePath("/learn");
  revalidatePath("/account");
  redirect(safeNext);
}
