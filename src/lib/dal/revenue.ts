import "server-only";
import { unstable_cache } from "next/cache";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { isActiveStatus } from "@/lib/dal/subscriptions";

/* Revenue dashboard data. Subscriber counts and MRR come from the local,
   webhook-synced subscriptions table (always fresh, no API latency); lifetime
   revenue and the 12-month strip come from one cached Stripe invoices sweep. */

export interface RevenueStats {
  totalMembers: number;
  activeSubscribers: number;
  individualCount: number;
  couplesCount: number;
  mrrPence: number;
  pastDueCount: number;
  cancellingCount: number;
}

export async function getRevenueStats(): Promise<RevenueStats> {
  const admin = supabaseAdmin();

  const [{ count: totalMembers }, { data: subs }] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin
      .from("subscriptions")
      .select("user_id, plan, status, billing_interval, amount_pence, cancel_at_period_end"),
  ]);

  const live = (subs ?? []).filter((s) => isActiveStatus(s.status));
  const mrrPence = live.reduce(
    (sum, s) =>
      sum +
      (s.billing_interval === "year"
        ? Math.round(s.amount_pence / 12)
        : s.amount_pence),
    0
  );

  return {
    totalMembers: totalMembers ?? 0,
    activeSubscribers: live.length,
    individualCount: live.filter((s) => s.plan === "individual").length,
    couplesCount: live.filter((s) => s.plan === "couples").length,
    mrrPence,
    pastDueCount: live.filter((s) => s.status === "past_due").length,
    cancellingCount: live.filter((s) => s.cancel_at_period_end).length,
  };
}

export interface MonthRevenue {
  label: string; // e.g. "Jul"
  pence: number;
}

export interface StripeRevenue {
  lifetimePence: number;
  months: MonthRevenue[]; // oldest first, 12 entries
  available: boolean; // false when Stripe is not configured/reachable
}

async function fetchStripeRevenue(): Promise<StripeRevenue> {
  const months: MonthRevenue[] = [];
  const now = new Date();
  const monthKeys: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthKeys.push(`${d.getFullYear()}-${d.getMonth()}`);
    months.push({
      label: d.toLocaleDateString("en-GB", { month: "short" }),
      pence: 0,
    });
  }

  let lifetimePence = 0;
  try {
    const client = stripe();
    let startingAfter: string | undefined;
    for (let page = 0; page < 20; page++) {
      const invoices: Stripe.ApiList<Stripe.Invoice> =
        await client.invoices.list({
          status: "paid",
          limit: 100,
          ...(startingAfter ? { starting_after: startingAfter } : {}),
        });
      for (const invoice of invoices.data) {
        const paid = invoice.amount_paid ?? 0;
        lifetimePence += paid;
        const d = new Date(invoice.created * 1000);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const index = monthKeys.indexOf(key);
        if (index >= 0) months[index].pence += paid;
      }
      if (!invoices.has_more) break;
      startingAfter = invoices.data[invoices.data.length - 1]?.id;
    }
    return { lifetimePence, months, available: true };
  } catch (error) {
    console.error("Stripe revenue fetch failed:", error);
    return { lifetimePence: 0, months, available: false };
  }
}

export const getStripeRevenue = unstable_cache(
  fetchStripeRevenue,
  ["stripe-revenue"],
  { revalidate: 3600 }
);

export interface ActivityEvent {
  id: string;
  type: string;
  createdAt: string;
  memberName: string | null;
  planKey: string | null;
}

const ACTIVITY_TYPES = [
  "checkout.session.completed",
  "customer.subscription.deleted",
];

export async function getRecentActivity(limit = 12): Promise<ActivityEvent[]> {
  const admin = supabaseAdmin();
  const { data: events } = await admin
    .from("stripe_events")
    .select("id, type, summary, created_at")
    .in("type", ACTIVITY_TYPES)
    .order("created_at", { ascending: false })
    .limit(limit);

  const rows = events ?? [];
  const userIds = [
    ...new Set(
      rows
        .map((e) => (e.summary as { userId?: string } | null)?.userId)
        .filter(Boolean) as string[]
    ),
  ];

  const names = new Map<string, string>();
  if (userIds.length) {
    const { data: profiles } = await admin
      .from("profiles")
      .select("id, display_name")
      .in("id", userIds);
    for (const p of profiles ?? []) names.set(p.id, p.display_name);
  }

  return rows.map((event) => {
    const summary = (event.summary ?? {}) as {
      userId?: string;
      planKey?: string;
    };
    return {
      id: event.id,
      type: event.type,
      createdAt: event.created_at,
      memberName: summary.userId ? (names.get(summary.userId) ?? null) : null,
      planKey: summary.planKey ?? null,
    };
  });
}
