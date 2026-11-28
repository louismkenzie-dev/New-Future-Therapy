import "server-only";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { siteUrl } from "@/lib/siteUrl";

/* Referral partnerships: 10% off the list price for the client, 10%
   commission for the partner.

   Each partner has a Stripe promotion code (e.g. SARAH10) on one shared
   10%-off coupon. Clients either type the code at checkout or arrive via
   the partner's link (/r/SARAH10), which applies it automatically.

   Commission is recorded from the invoice.paid webhook: every paid invoice
   that carries a partner's promotion code earns them 10% of what the
   client actually paid. The coupon's duration therefore decides how long
   both the discount and the commission last; change REFERRAL_TERMS (and
   the coupon id with it) to change that for new referrals. */

export const REFERRAL_PERCENT = 10;
export const COMMISSION_PERCENT = 10;

// Founders' decision (28 Nov 2026): discount and commission continue on
// every payment for as long as the referred client stays subscribed.
export const REFERRAL_TERMS: {
  duration: "forever" | "once" | "repeating";
  months?: number;
  couponId: string;
  summary: string;
} = {
  duration: "forever",
  couponId: "nft-referral-10pc-forever",
  summary: "for as long as they stay subscribed",
};

export const REFERRAL_COOKIE = "nf_ref";
export const CODE_PATTERN = /^[A-Z0-9-]{3,30}$/;

export function normaliseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function referralLink(code: string): string {
  return `${siteUrl()}/r/${code}`;
}

async function ensureCoupon(): Promise<string> {
  try {
    await stripe().coupons.retrieve(REFERRAL_TERMS.couponId);
  } catch {
    await stripe().coupons.create({
      id: REFERRAL_TERMS.couponId,
      name: `Referral partner ${REFERRAL_PERCENT}% off`,
      percent_off: REFERRAL_PERCENT,
      duration: REFERRAL_TERMS.duration,
      ...(REFERRAL_TERMS.duration === "repeating" ? { duration_in_months: REFERRAL_TERMS.months ?? 12 } : {}),
    });
  }
  return REFERRAL_TERMS.couponId;
}

export async function createReferralPartner(input: {
  name: string;
  email: string;
  code: string;
  notes: string;
}): Promise<void> {
  const admin = supabaseAdmin();
  const { data: clash } = await admin.from("referral_partners").select("id").eq("code", input.code).maybeSingle();
  if (clash) throw new Error("That code is already in use. Please choose another.");

  const coupon = await ensureCoupon();
  const promo = await stripe().promotionCodes.create({
    promotion: { type: "coupon", coupon },
    code: input.code,
    metadata: { referral_partner_email: input.email, referral_partner_name: input.name },
  });

  const { error } = await admin.from("referral_partners").insert({
    name: input.name,
    email: input.email,
    code: input.code,
    stripe_promotion_code_id: promo.id,
    notes: input.notes || null,
  });
  if (error) {
    await stripe().promotionCodes.update(promo.id, { active: false });
    throw new Error(error.message);
  }
}

export async function setPartnerActive(partnerId: string, active: boolean): Promise<void> {
  const admin = supabaseAdmin();
  const { data: partner } = await admin
    .from("referral_partners")
    .select("stripe_promotion_code_id")
    .eq("id", partnerId)
    .maybeSingle();
  if (!partner) return;
  if (partner.stripe_promotion_code_id) {
    await stripe().promotionCodes.update(partner.stripe_promotion_code_id, { active });
  }
  await admin.from("referral_partners").update({ active }).eq("id", partnerId);
}

export async function markCommissionPaid(partnerId: string): Promise<void> {
  await supabaseAdmin()
    .from("referral_conversions")
    .update({ paid_out_at: new Date().toISOString() })
    .eq("partner_id", partnerId)
    .is("paid_out_at", null);
}

/* Active partner for a code (used by the /r/ link and checkout). */
export async function activePartnerByCode(
  code: string
): Promise<{ id: string; email: string; promotionCodeId: string } | null> {
  if (!CODE_PATTERN.test(code)) return null;
  const { data } = await supabaseAdmin()
    .from("referral_partners")
    .select("id, email, stripe_promotion_code_id, active")
    .eq("code", code)
    .maybeSingle();
  if (!data?.active || !data.stripe_promotion_code_id) return null;
  return { id: data.id, email: data.email, promotionCodeId: data.stripe_promotion_code_id };
}

/* invoice.paid → commission row for any partner promotion code on it.
   Idempotent on the invoice id. */
export async function recordReferralFromInvoice(invoice: Stripe.Invoice): Promise<void> {
  if (!invoice.id || invoice.amount_paid <= 0) return;

  let discounts = invoice.discounts ?? [];
  if (discounts.some((d) => typeof d === "string")) {
    const full = await stripe().invoices.retrieve(invoice.id, { expand: ["discounts"] });
    discounts = full.discounts ?? [];
  }
  const promoIds = discounts
    .map((d) => (typeof d === "string" ? null : d.promotion_code))
    .map((p) => (p == null ? null : typeof p === "string" ? p : p.id))
    .filter((p): p is string => Boolean(p));
  if (promoIds.length === 0) return;

  const admin = supabaseAdmin();
  const { data: partner } = await admin
    .from("referral_partners")
    .select("id")
    .in("stripe_promotion_code_id", promoIds)
    .limit(1)
    .maybeSingle();
  if (!partner) return;

  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  let userId: string | null = null;
  if (customerId) {
    const { data } = await admin.from("profiles").select("id").eq("stripe_customer_id", customerId).maybeSingle();
    userId = data?.id ?? null;
  }
  const sub = invoice.parent?.subscription_details?.subscription;

  const { error } = await admin.from("referral_conversions").upsert(
    {
      partner_id: partner.id,
      user_id: userId,
      customer_email: invoice.customer_email ?? null,
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: sub ? (typeof sub === "string" ? sub : sub.id) : null,
      amount_paid_pence: invoice.amount_paid,
      commission_pence: Math.round((invoice.amount_paid * COMMISSION_PERCENT) / 100),
    },
    { onConflict: "stripe_invoice_id", ignoreDuplicates: true }
  );
  if (error) throw new Error(`Referral record failed: ${error.message}`);
}

export interface PartnerSummary {
  id: string;
  name: string;
  email: string;
  code: string;
  active: boolean;
  notes: string | null;
  createdAt: string;
  payments: number;
  clients: number;
  salesPence: number;
  owedPence: number;
  paidPence: number;
}

export interface ConversionRow {
  id: string;
  partnerName: string;
  code: string;
  customerEmail: string | null;
  amountPaidPence: number;
  commissionPence: number;
  paidOutAt: string | null;
  createdAt: string;
}

export async function referralOverview(): Promise<{ partners: PartnerSummary[]; recent: ConversionRow[] }> {
  const admin = supabaseAdmin();
  const [{ data: partners }, { data: conversions }] = await Promise.all([
    admin.from("referral_partners").select("id, name, email, code, active, notes, created_at").order("created_at"),
    admin
      .from("referral_conversions")
      .select("id, partner_id, customer_email, stripe_subscription_id, amount_paid_pence, commission_pence, paid_out_at, created_at")
      .order("created_at", { ascending: false })
      .limit(2000),
  ]);

  const byPartner = new Map((partners ?? []).map((p) => [p.id, p]));
  const summaries: PartnerSummary[] = (partners ?? []).map((p) => {
    const mine = (conversions ?? []).filter((c) => c.partner_id === p.id);
    return {
      id: p.id,
      name: p.name,
      email: p.email,
      code: p.code,
      active: p.active,
      notes: p.notes,
      createdAt: p.created_at,
      payments: mine.length,
      clients: new Set(mine.map((c) => c.stripe_subscription_id ?? c.customer_email ?? c.id)).size,
      salesPence: mine.reduce((n, c) => n + c.amount_paid_pence, 0),
      owedPence: mine.filter((c) => !c.paid_out_at).reduce((n, c) => n + c.commission_pence, 0),
      paidPence: mine.filter((c) => c.paid_out_at).reduce((n, c) => n + c.commission_pence, 0),
    };
  });

  const recent: ConversionRow[] = (conversions ?? []).slice(0, 50).map((c) => ({
    id: c.id,
    partnerName: byPartner.get(c.partner_id)?.name ?? "",
    code: byPartner.get(c.partner_id)?.code ?? "",
    customerEmail: c.customer_email,
    amountPaidPence: c.amount_paid_pence,
    commissionPence: c.commission_pence,
    paidOutAt: c.paid_out_at,
    createdAt: c.created_at,
  }));

  return { partners: summaries, recent };
}
