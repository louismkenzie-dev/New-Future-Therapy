import "server-only";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { isPlanKey, PLAN_INFO, planInfoByPriceId } from "@/lib/billing/plans";

/* Webhook-driven sync of Stripe subscriptions into the local table, plus the
   couple-state reconciliation that keys partner access on it. Service-role
   only — never called with user input. */

const ACTIVE_STATUSES = ["active", "trialing", "past_due"] as const;

export function isActiveStatus(status: string): boolean {
  return (ACTIVE_STATUSES as readonly string[]).includes(status);
}

function periodEndOf(sub: Stripe.Subscription): string | null {
  // Stripe moved billing periods onto subscription items in newer API versions.
  const item = sub.items?.data?.[0] as
    | (Stripe.SubscriptionItem & { current_period_end?: number })
    | undefined;
  const ts =
    item?.current_period_end ??
    (sub as unknown as { current_period_end?: number }).current_period_end;
  return ts ? new Date(ts * 1000).toISOString() : null;
}

async function resolveUserId(sub: Stripe.Subscription): Promise<string | null> {
  const fromMetadata = sub.metadata?.user_id;
  if (fromMetadata) return fromMetadata;

  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const { data } = await supabaseAdmin()
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.id ?? null;
}

export async function syncSubscriptionFromStripe(
  sub: Stripe.Subscription
): Promise<void> {
  const userId = await resolveUserId(sub);
  if (!userId) {
    console.error(`Stripe subscription ${sub.id} has no resolvable user`);
    return;
  }

  const price = sub.items.data[0]?.price;
  const planKey = sub.metadata?.plan_key;
  const info =
    (planKey && isPlanKey(planKey) ? PLAN_INFO[planKey] : undefined) ??
    (price ? planInfoByPriceId(price.id) : undefined);

  const plan = info?.plan ?? "individual";
  const interval = info?.interval ?? price?.recurring?.interval ?? "month";
  const amountPence = price?.unit_amount ?? info?.amountPence ?? 0;

  const { error } = await supabaseAdmin()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id:
          typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        stripe_subscription_id: sub.id,
        plan,
        billing_interval: interval === "year" ? "year" : "month",
        stripe_price_id: price?.id ?? "",
        amount_pence: amountPence,
        status: sub.status,
        current_period_end: periodEndOf(sub),
        cancel_at_period_end: sub.cancel_at_period_end ?? false,
      },
      { onConflict: "stripe_subscription_id" }
    );

  if (error) throw new Error(`Subscription sync failed: ${error.message}`);

  await reconcileCouple(userId);
}

/* Belt-and-braces fallback for checkout success arriving before the webhook:
   the success page passes the Checkout Session id and we sync directly. */
export async function syncFromCheckoutSession(
  sessionId: string,
  userId: string
): Promise<void> {
  const session = await stripe().checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });
  if (session.client_reference_id !== userId) return;
  const sub = session.subscription;
  if (sub && typeof sub !== "string") {
    await syncSubscriptionFromStripe(sub);
  }
}

/* Keeps couples.status in step with whether a couples subscription still
   covers the pair. Suspension hides shared content at the RLS level while
   preserving the link and all data; resubscribing restores it. */
export async function reconcileCouple(userId: string): Promise<void> {
  const admin = supabaseAdmin();

  const { data: couple } = await admin
    .from("couples")
    .select("id, owner_id, partner_id, status")
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .in("status", ["active", "suspended"])
    .maybeSingle();

  if (!couple) return;

  const memberIds = [couple.owner_id, couple.partner_id].filter(
    Boolean
  ) as string[];

  const { data: subs } = await admin
    .from("subscriptions")
    .select("status, plan")
    .in("user_id", memberIds)
    .eq("plan", "couples");

  const covered = (subs ?? []).some((s) => isActiveStatus(s.status));

  if (couple.status === "active" && !covered) {
    await admin
      .from("couples")
      .update({ status: "suspended" })
      .eq("id", couple.id);
  } else if (couple.status === "suspended" && covered) {
    await admin
      .from("couples")
      .update({ status: "active" })
      .eq("id", couple.id);
  }
}
