import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

/* Team-issued welcome links (see the member_invites migration). Tokens
   are random, single-use and expire after fourteen days, matching partner
   invitations; only their SHA-256 hash is stored. */

const WELCOME_DAYS = 14;

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function issueWelcomeToken(userId: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const admin = supabaseAdmin();
  // A fresh link replaces any earlier unused one.
  await admin.from("member_invites").delete().eq("user_id", userId).is("used_at", null);
  const { error } = await admin.from("member_invites").insert({
    user_id: userId,
    token_hash: hashToken(token),
    expires_at: new Date(Date.now() + WELCOME_DAYS * 86_400_000).toISOString(),
  });
  if (error) throw new Error(error.message);
  return token;
}

export interface WelcomeInvite {
  id: string;
  userId: string;
  email: string;
  name: string;
}

/* The unused, unexpired invite a token belongs to, if any. */
export async function findWelcomeInvite(token: string): Promise<WelcomeInvite | null> {
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return null;
  const admin = supabaseAdmin();
  const { data: invite } = await admin
    .from("member_invites")
    .select("id, user_id, expires_at, used_at")
    .eq("token_hash", hashToken(token))
    .maybeSingle();
  if (!invite || invite.used_at || new Date(invite.expires_at) <= new Date()) return null;

  const [{ data: userData }, { data: profile }] = await Promise.all([
    admin.auth.admin.getUserById(invite.user_id),
    admin.from("profiles").select("display_name").eq("id", invite.user_id).maybeSingle(),
  ]);
  const email = userData?.user?.email;
  if (!email) return null;
  return { id: invite.id, userId: invite.user_id, email, name: profile?.display_name ?? "" };
}

export async function markWelcomeUsed(inviteId: string): Promise<void> {
  await supabaseAdmin()
    .from("member_invites")
    .update({ used_at: new Date().toISOString() })
    .eq("id", inviteId);
}
