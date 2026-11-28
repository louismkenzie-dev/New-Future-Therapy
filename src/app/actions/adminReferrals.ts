"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { EMAIL_PATTERN } from "@/lib/memberAccounts";
import {
  CODE_PATTERN,
  createReferralPartner,
  markCommissionPaid,
  normaliseCode,
  setPartnerActive,
} from "@/lib/referrals";
import { MAX, clean } from "@/lib/limits";

export interface PartnerFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function addReferralPartner(_prev: PartnerFormState, formData: FormData): Promise<PartnerFormState> {
  if (!(await isAdmin())) redirect("/admin/login");

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email).toLowerCase();
  const code = normaliseCode(clean(formData.get("code"), 40));
  const notes = clean(formData.get("notes"), MAX.shortText);

  if (!name || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please give the partner's name and a valid email address." };
  }
  if (!CODE_PATTERN.test(code)) {
    return {
      status: "error",
      message: "Codes are 3 to 30 characters: capital letters, numbers and dashes only, for example SARAH10.",
    };
  }

  try {
    await createReferralPartner({ name, email, code, notes });
  } catch (error) {
    console.error("Add referral partner failed:", error);
    const message = error instanceof Error && error.message.includes("already in use")
      ? error.message
      : "Stripe could not create that code. It may already exist in Stripe; please try a different code.";
    return { status: "error", message };
  }
  revalidatePath("/admin/referrals");
  return { status: "success", message: `${name}'s code ${code} is ready to share.` };
}

export async function togglePartner(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = formData.get("id")?.toString() ?? "";
  const active = formData.get("active")?.toString() === "true";
  if (id) await setPartnerActive(id, active);
  revalidatePath("/admin/referrals");
}

export async function markPartnerPaid(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = formData.get("id")?.toString() ?? "";
  if (id) await markCommissionPaid(id);
  revalidatePath("/admin/referrals");
}
