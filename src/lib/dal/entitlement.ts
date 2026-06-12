import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { requireUser, type SessionUser } from "@/lib/auth/session";
import { isActiveStatus } from "@/lib/dal/subscriptions";
import { courses } from "@/lib/content/courses";

export interface Entitlement {
  active: boolean;
  plan: "individual" | "couples" | null;
  source: "own" | "partner" | "complimentary" | null;
  canInvitePartner: boolean;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  status: string | null;
}

const NONE: Entitlement = {
  active: false,
  plan: null,
  source: null,
  canInvitePartner: false,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  status: null,
};

export const getEntitlement = cache(
  async (userId: string, complimentary = false): Promise<Entitlement> => {
    const admin = supabaseAdmin();

    // Own subscription first — it also drives the partner-invite ability.
    const { data: ownSubs } = await admin
      .from("subscriptions")
      .select("plan, status, current_period_end, cancel_at_period_end")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const own = (ownSubs ?? []).find((s) => isActiveStatus(s.status));
    if (own) {
      return {
        active: true,
        plan: own.plan,
        source: "own",
        canInvitePartner: own.plan === "couples",
        currentPeriodEnd: own.current_period_end,
        cancelAtPeriodEnd: own.cancel_at_period_end,
        status: own.status,
      };
    }

    if (complimentary) {
      return {
        ...NONE,
        active: true,
        source: "complimentary",
      };
    }

    // Covered by an active partner's couples plan?
    const { data: couple } = await admin
      .from("couples")
      .select("owner_id, partner_id")
      .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
      .eq("status", "active")
      .maybeSingle();

    if (couple) {
      const partnerId =
        couple.owner_id === userId ? couple.partner_id : couple.owner_id;
      if (partnerId) {
        const { data: partnerSubs } = await admin
          .from("subscriptions")
          .select("status, current_period_end, cancel_at_period_end")
          .eq("user_id", partnerId)
          .eq("plan", "couples");

        const covering = (partnerSubs ?? []).find((s) =>
          isActiveStatus(s.status)
        );
        if (covering) {
          return {
            active: true,
            plan: "couples",
            source: "partner",
            canInvitePartner: false,
            currentPeriodEnd: covering.current_period_end,
            cancelAtPeriodEnd: covering.cancel_at_period_end,
            status: covering.status,
          };
        }
      }
    }

    return NONE;
  }
);

/* Auth + entitlement gate for member pages and actions. */
export async function requireEntitlement(
  next?: string
): Promise<{ user: SessionUser; entitlement: Entitlement }> {
  const user = await requireUser(next);
  const entitlement = await getEntitlement(
    user.id,
    user.profile.complimentaryAccess
  );
  if (!entitlement.active) {
    redirect(`/courses/${courses[0].id}#pricing`);
  }
  return { user, entitlement };
}
