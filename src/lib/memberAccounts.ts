import "server-only";
import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

/* Creating complimentary course accounts and linking couples. Shared by
   the team's Members page and the private tester page. */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function findUserId(email: string): Promise<string | null> {
  const admin = supabaseAdmin();
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) return null;
    const match = data.users.find((u) => u.email?.toLowerCase() === email);
    if (match) return match.id;
    if (data.users.length < 1000) return null;
  }
}

/* Creates the account if needed and grants complimentary access. */
export async function ensureMember(name: string, email: string): Promise<{ id: string; existing: boolean }> {
  const admin = supabaseAdmin();
  const existingId = await findUserId(email);
  let id = existingId;
  if (!id) {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      // Never shared: the member sets their own password from the welcome link.
      password: randomBytes(24).toString("base64url"),
      user_metadata: { display_name: name },
    });
    if (error || !data.user) throw new Error(error?.message ?? "Could not create the account.");
    id = data.user.id;
  }
  await admin.from("profiles").update({ complimentary_access: true }).eq("id", id);
  return { id, existing: Boolean(existingId) };
}

async function currentCouples(userId: string) {
  const { data } = await supabaseAdmin()
    .from("couples")
    .select("id, owner_id, partner_id, status")
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .in("status", ["pending", "active", "suspended"]);
  return data ?? [];
}

/* Links two accounts as a couple. "already" when they are already
   together; "conflict" when either is linked to (or invited by) someone
   else, in which case nothing changes. */
export async function linkCouple(aId: string, bId: string): Promise<"linked" | "already" | "conflict"> {
  const [aCouples, bCouples] = await Promise.all([currentCouples(aId), currentCouples(bId)]);
  const together = aCouples.find(
    (c) => c.status === "active" && (c.partner_id === bId || c.owner_id === bId)
  );
  if (together) return "already";
  if (aCouples.length || bCouples.length) return "conflict";
  const { error } = await supabaseAdmin().from("couples").insert({
    owner_id: aId,
    partner_id: bId,
    status: "active",
    linked_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
  return "linked";
}
