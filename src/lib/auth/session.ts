import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

/* Data-access-layer auth gate. proxy.ts only does an optimistic redirect;
   every page, server action and route handler that touches member data must
   call requireUser()/requireEntitlement() (entitlement lives in
   src/lib/dal/entitlement.ts) itself. */

export interface Profile {
  id: string;
  displayName: string;
  pronouns: string | null;
  stripeCustomerId: string | null;
  complimentaryAccess: boolean;
  deactivatedAt: string | null;
}

export interface SessionUser {
  id: string;
  email: string;
  profile: Profile;
}

interface ProfileRow {
  id: string;
  display_name: string;
  pronouns: string | null;
  stripe_customer_id: string | null;
  complimentary_access: boolean;
  deactivated_at: string | null;
}

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    pronouns: row.pronouns,
    stripeCustomerId: row.stripe_customer_id,
    complimentaryAccess: row.complimentary_access,
    deactivatedAt: row.deactivated_at,
  };
}

/* Validates the session against Supabase (not just the cookie) and loads the
   profile. Returns null for signed-out or deactivated accounts. */
export const getUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "id, display_name, pronouns, stripe_customer_id, complimentary_access, deactivated_at"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.deactivated_at) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    profile: mapProfile(profile as ProfileRow),
  };
});

export async function requireUser(next?: string): Promise<SessionUser> {
  const user = await getUser();
  if (!user) {
    redirect(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
  }
  return user;
}
