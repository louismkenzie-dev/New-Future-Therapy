import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";

export interface CoupleState {
  coupleId: string;
  status: "pending" | "active" | "suspended" | "unlinked";
  isOwner: boolean;
  partnerId: string | null;
  partnerName: string | null;
  inviteExpiresAt: string | null;
  linkedAt: string | null;
}

/* The signed-in member's live couple (pending invite, active link, or
   suspended link awaiting resubscription). RLS scopes rows to membership. */
export async function getCoupleState(
  userId: string
): Promise<CoupleState | null> {
  const supabase = await createServerSupabase();
  const { data: couple } = await supabase
    .from("couples")
    .select(
      "id, owner_id, partner_id, status, invite_expires_at, linked_at"
    )
    .in("status", ["pending", "active", "suspended"])
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .maybeSingle();

  if (!couple) return null;

  const isOwner = couple.owner_id === userId;
  const partnerId = isOwner ? couple.partner_id : couple.owner_id;

  let partnerName: string | null = null;
  if (partnerId && couple.status === "active") {
    const { data: partner } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", partnerId)
      .maybeSingle();
    partnerName = partner?.display_name ?? null;
  }

  return {
    coupleId: couple.id,
    status: couple.status,
    isOwner,
    partnerId,
    partnerName,
    inviteExpiresAt: couple.invite_expires_at,
    linkedAt: couple.linked_at,
  };
}

/* Convenience: the active partner, or null. */
export async function getActivePartner(
  userId: string
): Promise<{ id: string; name: string } | null> {
  const couple = await getCoupleState(userId);
  if (!couple || couple.status !== "active" || !couple.partnerId) return null;
  return { id: couple.partnerId, name: couple.partnerName ?? "your partner" };
}
