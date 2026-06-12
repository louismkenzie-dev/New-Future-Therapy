"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabase";

async function guard(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function toggleComplimentaryAccess(
  formData: FormData
): Promise<void> {
  await guard();
  const userId = formData.get("userId")?.toString() ?? "";
  const grant = formData.get("grant")?.toString() === "true";
  if (!userId) return;

  await supabaseAdmin()
    .from("profiles")
    .update({ complimentary_access: grant })
    .eq("id", userId);

  revalidatePath("/admin/members");
  revalidatePath(`/admin/members/${userId}`);
}

export async function adminUnlinkCouple(formData: FormData): Promise<void> {
  await guard();
  const userId = formData.get("userId")?.toString() ?? "";
  if (!userId) return;

  const admin = supabaseAdmin();
  const { data: couple } = await admin
    .from("couples")
    .select("id")
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .in("status", ["pending", "active", "suspended"])
    .maybeSingle();
  if (!couple) return;

  await admin
    .from("couples")
    .update({
      status: "unlinked",
      unlinked_at: new Date().toISOString(),
      invite_token_hash: null,
      invite_expires_at: null,
    })
    .eq("id", couple.id);

  revalidatePath("/admin/members");
  revalidatePath(`/admin/members/${userId}`);
}

export async function setAccountDeactivated(formData: FormData): Promise<void> {
  await guard();
  const userId = formData.get("userId")?.toString() ?? "";
  const deactivate = formData.get("deactivate")?.toString() === "true";
  if (!userId) return;

  const admin = supabaseAdmin();
  await admin
    .from("profiles")
    .update({ deactivated_at: deactivate ? new Date().toISOString() : null })
    .eq("id", userId);

  // Ban in Supabase Auth too, so even a live session cannot be refreshed.
  await admin.auth.admin.updateUserById(userId, {
    ban_duration: deactivate ? "87600h" : "none",
  });

  revalidatePath("/admin/members");
  revalidatePath(`/admin/members/${userId}`);
}
