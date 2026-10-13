"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyPassword, createSession, destroySession } from "@/lib/adminAuth";
import { setContacted, deleteSubmission } from "@/lib/submissions";
import { isAdmin } from "@/lib/adminAuth";
import { LIMITS, rateLimitByIp } from "@/lib/rateLimit";

export interface LoginState {
  error?: string;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!(await rateLimitByIp(LIMITS.adminLogin))) {
    return { error: "Too many sign-in attempts. Please wait 15 minutes and try again." };
  }
  const password = (formData.get("password")?.toString() ?? "").slice(0, 200);

  if (!verifyPassword(password)) {
    return { error: "That password is not correct. Please try again." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function toggleContacted(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const dbId = formData.get("dbId")?.toString() ?? "";
  const contacted = formData.get("contacted") === "true";
  await setContacted(dbId, contacted);
  revalidatePath("/admin");
}

export async function deleteEnquiry(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
  const dbId = formData.get("dbId")?.toString() ?? "";
  if (dbId) await deleteSubmission(dbId);
  revalidatePath("/admin");
}
