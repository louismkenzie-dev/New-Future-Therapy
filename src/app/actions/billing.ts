"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SIGNUPS_OPEN } from "@/lib/launch";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { requireUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { isPlanKey, stripePriceIdFor } from "@/lib/billing/plans";
import { siteUrl } from "@/lib/siteUrl";
import { REFERRAL_COOKIE, activePartnerByCode } from "@/lib/referrals";

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

  const user = await requireUser(returnPath);

  if (!isPlanKey(planKey)) redirect(returnPath);

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

  // Arrived through a referral partner's link? Apply their code for them.
  // (Stripe allows either a preset discount or the promo-code box, not both.)
  const referralCode = (await cookies()).get(REFERRAL_COOKIE)?.value ?? "";
  const partner = referralCode ? await activePartnerByCode(referralCode) : null;
  const referral =
    partner && partner.email.toLowerCase() !== user.email.toLowerCase() ? partner : null;

  const session = await stripe().checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: stripePriceIdFor(planKey), quantity: 1 }],
    subscription_data: {
      metadata: {
        user_id: user.id,
        plan_key: planKey,
        ...(referral ? { referral_code: referralCode } : {}),
      },
    },
    ...(referral
      ? { discounts: [{ promotion_code: referral.promotionCodeId }] }
      : { allow_promotion_codes: true }),
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
