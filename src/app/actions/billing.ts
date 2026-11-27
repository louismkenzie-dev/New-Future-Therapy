"use server";

import { redirect } from "next/navigation";
import { SIGNUPS_OPEN } from "@/lib/launch";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { requireUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { isPlanKey, stripePriceIdFor } from "@/lib/billing/plans";
import { siteUrl } from "@/lib/siteUrl";
import { REFUND_POLICY_UPDATED, TERMS_UPDATED } from "@/lib/legal";

async function customerIdFor(
  userId: string,
  email: string,
  name: string,
  existing: string | null
): Promise<string> {
  if (existing) return existing;
  const customer = await stripe().customers.create({
    email,
    name,
    metadata: { user_id: userId },
  });
  await supabaseAdmin()
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", userId);
  return customer.id;
}

export async function startCheckout(formData: FormData): Promise<void> {
  const planKey = formData.get("planKey")?.toString() ?? "";
  const courseId = formData.get("courseId")?.toString() ?? "";
  const returnPath = `/courses/${encodeURIComponent(courseId)}`;

  // Checkout is closed until launch — nobody can pay before the founders open it.
  if (!SIGNUPS_OPEN) redirect(returnPath);

  // UK digital-content rules: the buyer must ask for immediate access and
  // acknowledge losing the 14-day cancellation right before paying. The
  // pricing cards will not submit without the tick; this is the backstop.
  if (formData.get("digitalContentConsent")?.toString() !== "yes") {
    redirect(`${returnPath}#pricing`);
  }

  const user = await requireUser(returnPath);

  if (!isPlanKey(planKey)) redirect(returnPath);

  // Kept on the Checkout Session and the subscription as the record of what
  // the buyer agreed to, and when.
  const consentRecord = {
    digital_content_consent: "immediate_access_waives_14_day_cancellation",
    consent_given_at: new Date().toISOString(),
    terms_version: TERMS_UPDATED,
    refund_policy_version: REFUND_POLICY_UPDATED,
  };

  const entitlement = await getEntitlement(
    user.id,
    user.profile.complimentaryAccess
  );
  if (entitlement.active) {
    // Already covered — including via a partner's couples plan.
    redirect("/learn?already-covered=1");
  }

  const customerId = await customerIdFor(
    user.id,
    user.email,
    user.profile.displayName,
    user.profile.stripeCustomerId
  );

  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: stripePriceIdFor(planKey), quantity: 1 }],
    metadata: { user_id: user.id, plan_key: planKey, ...consentRecord },
    subscription_data: {
      metadata: { user_id: user.id, plan_key: planKey, ...consentRecord },
    },
    custom_text: {
      submit: {
        message:
          "Your access begins as soon as payment is confirmed. As you asked for immediate access, the 14-day right to cancel ends at that point. You can cancel future renewals at any time from your account page.",
      },
    },
    allow_promotion_codes: true,
    success_url: `${siteUrl()}/learn?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}${returnPath}#pricing`,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  redirect(session.url);
}

export async function openBillingPortal(): Promise<void> {
  const user = await requireUser("/account");

  const customerId = user.profile.stripeCustomerId;
  if (!customerId) redirect("/account");

  const session = await stripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${siteUrl()}/account`,
  });

  redirect(session.url);
}
