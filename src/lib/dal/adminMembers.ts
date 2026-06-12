import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import { isActiveStatus } from "@/lib/dal/subscriptions";

/* Admin-only member views — service-role access, guarded by isAdmin() in
   every page and action that calls in here. */

export interface MemberListRow {
  id: string;
  name: string;
  email: string;
  pronouns: string | null;
  plan: "individual" | "couples" | "complimentary" | null;
  subscriptionStatus: string | null;
  cancelAtPeriodEnd: boolean;
  partnerName: string | null;
  partnerPending: boolean;
  deactivated: boolean;
  joinedAt: string;
}

interface ProfileRow {
  id: string;
  display_name: string;
  pronouns: string | null;
  complimentary_access: boolean;
  deactivated_at: string | null;
  created_at: string;
}

async function emailMap(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  let page = 1;
  // Paginate defensively; a small practice will exit on the first page.
  for (;;) {
    const { data, error } = await supabaseAdmin().auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error || !data?.users?.length) break;
    for (const user of data.users) {
      if (user.email) map.set(user.id, user.email);
    }
    if (data.users.length < 1000) break;
    page += 1;
  }
  return map;
}

export async function listMembers(): Promise<MemberListRow[]> {
  const admin = supabaseAdmin();

  const [profilesResult, subsResult, couplesResult, emails] = await Promise.all([
    admin
      .from("profiles")
      .select(
        "id, display_name, pronouns, complimentary_access, deactivated_at, created_at"
      )
      .order("created_at", { ascending: false }),
    admin
      .from("subscriptions")
      .select("user_id, plan, status, cancel_at_period_end, created_at")
      .order("created_at", { ascending: false }),
    admin
      .from("couples")
      .select("owner_id, partner_id, status")
      .in("status", ["pending", "active", "suspended"]),
    emailMap(),
  ]);

  const profiles = (profilesResult.data ?? []) as ProfileRow[];
  const nameById = new Map(profiles.map((p) => [p.id, p.display_name]));

  const liveSubByUser = new Map<
    string,
    { plan: "individual" | "couples"; status: string; cancel: boolean }
  >();
  for (const sub of subsResult.data ?? []) {
    if (!liveSubByUser.has(sub.user_id) && isActiveStatus(sub.status)) {
      liveSubByUser.set(sub.user_id, {
        plan: sub.plan,
        status: sub.status,
        cancel: sub.cancel_at_period_end,
      });
    }
  }

  const coupleByUser = new Map<
    string,
    { partnerId: string | null; pending: boolean }
  >();
  for (const couple of couplesResult.data ?? []) {
    if (couple.status === "pending") {
      coupleByUser.set(couple.owner_id, { partnerId: null, pending: true });
      continue;
    }
    if (couple.partner_id) {
      coupleByUser.set(couple.owner_id, {
        partnerId: couple.partner_id,
        pending: false,
      });
      coupleByUser.set(couple.partner_id, {
        partnerId: couple.owner_id,
        pending: false,
      });
    }
  }

  return profiles.map((profile) => {
    const sub = liveSubByUser.get(profile.id);
    const couple = coupleByUser.get(profile.id);
    return {
      id: profile.id,
      name: profile.display_name,
      email: emails.get(profile.id) ?? "—",
      pronouns: profile.pronouns,
      plan: sub?.plan ?? (profile.complimentary_access ? "complimentary" : null),
      subscriptionStatus: sub?.status ?? null,
      cancelAtPeriodEnd: sub?.cancel ?? false,
      partnerName: couple?.partnerId
        ? (nameById.get(couple.partnerId) ?? null)
        : null,
      partnerPending: couple?.pending ?? false,
      deactivated: Boolean(profile.deactivated_at),
      joinedAt: profile.created_at,
    };
  });
}

export async function getMember(id: string): Promise<MemberListRow | null> {
  const members = await listMembers();
  return members.find((m) => m.id === id) ?? null;
}
