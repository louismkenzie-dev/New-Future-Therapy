import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { syncSubscriptionFromStripe } from "@/lib/dal/subscriptions";

/* Stripe webhook — the billing source of truth. Signature-verified, and
   idempotent via the stripe_events table (event id is the primary key). */

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return new Response("Webhook not configured", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new Response("Invalid signature", { status: 400 });
  }

  // Idempotency: first writer wins; replays exit here.
  const { error: insertError } = await supabaseAdmin()
    .from("stripe_events")
    .insert({ id: event.id, type: event.type, summary: summarise(event) });
  if (insertError) {
    if (insertError.code === "23505") {
      return Response.json({ received: true, duplicate: true });
    }
    console.error("Failed to record Stripe event:", insertError);
    return new Response("Event log failure", { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.mode === "subscription" && session.subscription) {
          const subId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id;
          const sub = await stripe().subscriptions.retrieve(subId);
          await syncSubscriptionFromStripe(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await syncSubscriptionFromStripe(event.data.object);
        break;
      }
      default:
        // Logged in stripe_events for the admin activity feed; no sync needed.
        break;
    }
  } catch (error) {
    console.error(`Webhook handling failed for ${event.type}:`, error);
    // Remove the idempotency marker so Stripe's retry can succeed.
    await supabaseAdmin().from("stripe_events").delete().eq("id", event.id);
    return new Response("Handler failure", { status: 500 });
  }

  return Response.json({ received: true });
}

function summarise(event: Stripe.Event): Record<string, unknown> {
  const object = event.data.object as unknown as Record<string, unknown>;
  const metadata = (object.metadata ?? {}) as Record<string, string>;
  return {
    userId: metadata.user_id ?? (object.client_reference_id as string) ?? null,
    planKey: metadata.plan_key ?? null,
    status: (object.status as string) ?? null,
    customer:
      typeof object.customer === "string"
        ? object.customer
        : ((object.customer as { id?: string } | null)?.id ?? null),
  };
}
