"use server";

import { createHash, randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { requireUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { siteUrl } from "@/lib/siteUrl";

export interface InviteFormState {
  status: "idle" | "success" | "error";
  message?: string;
  inviteUrl?: string;
}

const INVITE_DAYS = 14;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/* Creates (or refreshes) the partner invite. The raw token exists only in
   the returned link — the database stores its hash. */
export async function createPartnerInvite(
  _prev: InviteFormState,
  formData: FormData
): Promise<InviteFormState> {
  void formData;
  const user = await requireUser("/account");

  const entitlement = await getEntitlement(
    user.id,
    user.profile.complimentaryAccess
  );
  if (!entitlement.canInvitePartner) {
    return {
      status: "error",
      message:
        "Partner invitations are part of the Joint Couples plan. You can switch plans from Manage Billing.",
    };
  }

  const admin = supabaseAdmin();
  const { data: existing } = await admin
    .from("couples")
    .select("id, status, owner_id")
    .or(`owner_id.eq.${user.id},partner_id.eq.${user.id}`)
    .in("status", ["pending", "active", "suspended"])
    .maybeSingle();

  if (existing && existing.status !== "pending") {
    return {
      status: "error",
      message: "Your account is already linked with a partner.",
    };
  }

  const token = randomBytes(32).toString("base64url");
  const expires = new Date(
    Date.now() + INVITE_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { error } = existing
    ? await admin
        .from("couples")
        .update({ invite_token_hash: hashToken(token), invite_expires_at: expires })
        .eq("id", existing.id)
    : await admin.from("couples").insert({
        owner_id: user.id,
        status: "pending",
        invite_token_hash: hashToken(token),
        invite_expires_at: expires,
      });

  if (error) {
    console.error("Invite creation failed:", error);
    return {
      status: "error",
      message: "Something went wrong creating your invitation. Please try again.",
    };
  }

  revalidatePath("/account");
  return {
    status: "success",
    message: `This private link is for your partner only, and it works for ${INVITE_DAYS} days. Creating a new link replaces this one.`,
    inviteUrl: `${siteUrl()}/invite/${token}`,
  };
}

export async function acceptInvite(
  _prev: InviteFormState,
  formData: FormData
): Promise<InviteFormState> {
  const token = formData.get("token")?.toString() ?? "";
  const user = await requireUser(`/invite/${token}`);

  const admin = supabaseAdmin();
  const { data: couple } = await admin
    .from("couples")
    .select("id, owner_id, invite_expires_at")
    .eq("invite_token_hash", hashToken(token))
    .eq("status", "pending")
    .maybeSingle();

  if (
    !couple ||
    !couple.invite_expires_at ||
    new Date(couple.invite_expires_at) < new Date()
  ) {
    return {
      status: "error",
      message:
        "This invitation has expired or has already been used. Please ask your partner for a fresh link.",
    };
  }

  if (couple.owner_id === user.id) {
    return {
      status: "error",
      message:
        "This is your own invitation link — share it with your partner instead.",
    };
  }

  const { data: existing } = await admin
    .from("couples")
    .select("id")
    .or(`owner_id.eq.${user.id},partner_id.eq.${user.id}`)
    .in("status", ["pending", "active", "suspended"])
    .maybeSingle();
  if (existing) {
    return {
      status: "error",
      message: "Your account is already linked with a partner.",
    };
  }

  // The inviter must still hold an active couples plan.
  const { data: ownerProfile } = await admin
    .from("profiles")
    .select("complimentary_access")
    .eq("id", couple.owner_id)
    .maybeSingle();
  const ownerEntitlement = await getEntitlement(
    couple.owner_id,
    ownerProfile?.complimentary_access ?? false
  );
  if (!ownerEntitlement.canInvitePartner) {
    return {
      status: "error",
      message:
        "Your partner's Joint Couples plan is no longer active, so this invitation cannot be accepted right now.",
    };
  }

  const { error } = await admin
    .from("couples")
    .update({
      partner_id: user.id,
      status: "active",
      linked_at: new Date().toISOString(),
      invite_token_hash: null,
      invite_expires_at: null,
    })
    .eq("id", couple.id)
    .eq("status", "pending");

  if (error) {
    console.error("Invite acceptance failed:", error);
    return {
      status: "error",
      message: "Something went wrong linking your accounts. Please try again.",
    };
  }

  revalidatePath("/account");
  revalidatePath("/learn/shared");
  redirect("/learn?linked=1");
}

/* Either member may unlink at any time; owners may also cancel a pending
   invite. Unlinking ends all shared visibility immediately (RLS requires an
   active couple). */
export async function unlinkCouple(): Promise<void> {
  const user = await requireUser("/account");

  const admin = supabaseAdmin();
  const { data: couple } = await admin
    .from("couples")
    .select("id")
    .or(`owner_id.eq.${user.id},partner_id.eq.${user.id}`)
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

  revalidatePath("/account");
  revalidatePath("/learn/shared");
}
