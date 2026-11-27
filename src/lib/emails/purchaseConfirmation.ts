import "server-only";
import type Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { PLAN_INFO, formatPence, isPlanKey } from "@/lib/billing/plans";
import { REFUND_POLICY_UPDATED, TERMS_UPDATED } from "@/lib/legal";

/* Purchase confirmation email, sent once per completed checkout from the
   Stripe webhook (which is already idempotent per event).

   Besides welcoming the member, this is the written confirmation UK law
   expects for digital content: it repeats that the buyer asked for
   immediate access and acknowledged losing the 14-day right to cancel,
   with the date they did so and the versions of the Terms and Refund
   Policy they agreed to.

   Sent through Resend's REST API, like the enquiry alerts. The API key is
   read from RESEND_API_KEY, then from site_settings (resend_api_key). The
   sender is PURCHASE_EMAIL_FROM, then site_settings
   (purchase_email_from), then a default on the practice's domain. Missing
   configuration logs and skips — an email must never fail the webhook. */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newfuturetherapy.co.uk";
const DEFAULT_FROM = "NewFuture Therapy <hello@newfuturetherapy.co.uk>";

interface SenderConfig {
  apiKey: string;
  from: string;
}

async function loadSender(): Promise<SenderConfig | null> {
  let apiKey = process.env.RESEND_API_KEY ?? "";
  let from = process.env.PURCHASE_EMAIL_FROM ?? "";

  if (!apiKey || !from) {
    try {
      const { data } = await supabaseAdmin()
        .from("site_settings")
        .select("key, value")
        .in("key", ["resend_api_key", "purchase_email_from"]);
      const settings = new Map(
        ((data ?? []) as { key: string; value: string }[]).map((row) => [
          row.key,
          row.value,
        ])
      );
      apiKey = apiKey || (settings.get("resend_api_key") ?? "");
      from = from || (settings.get("purchase_email_from") ?? "");
    } catch (error) {
      console.error("Purchase email settings unavailable:", error);
    }
  }

  if (!apiKey) return null;
  return { apiKey, from: from || DEFAULT_FROM };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function londonDate(date: Date, withTime = false): string {
  return date.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export interface PurchaseDetails {
  to: string;
  firstName: string;
  planLabel: string;
  isCouples: boolean;
  priceLine: string;
  startedOn: string;
  consentLine: string;
  termsVersion: string;
  refundPolicyVersion: string;
  reference: string;
}

/* Pulls everything the email needs from a completed Checkout Session.
   Returns null when there is no address to send to. */
export function purchaseDetailsFrom(
  session: Stripe.Checkout.Session
): PurchaseDetails | null {
  const to = session.customer_details?.email ?? session.customer_email ?? "";
  if (!to) return null;

  const metadata = session.metadata ?? {};
  const planKey = metadata.plan_key ?? "";
  const plan = isPlanKey(planKey) ? PLAN_INFO[planKey] : undefined;
  const isCouples = plan?.plan === "couples";

  const name = (session.customer_details?.name ?? "").trim();
  const firstName = name ? name.split(/\s+/)[0].slice(0, 40) : "";

  const amount =
    typeof session.amount_total === "number"
      ? formatPence(session.amount_total)
      : plan
        ? formatPence(plan.amountPence)
        : "";
  const per = plan?.interval === "year" ? "year" : "month";
  const priceLine = amount
    ? `${amount} per ${per}, renewing automatically until you cancel`
    : `Renewing automatically each ${per} until you cancel`;

  const started = new Date((session.created ?? Date.now() / 1000) * 1000);
  const consentAt = metadata.consent_given_at
    ? new Date(metadata.consent_given_at)
    : started;
  const consentWhen = Number.isNaN(consentAt.getTime())
    ? londonDate(started, true)
    : londonDate(consentAt, true);

  return {
    to,
    firstName,
    planLabel: plan?.label ?? "Growing Together membership",
    isCouples,
    priceLine,
    startedOn: londonDate(started),
    consentLine: `On ${consentWhen} you asked for your access to begin straight away, and confirmed that you understood this meant losing your 14-day right to cancel once your access began.`,
    termsVersion: metadata.terms_version || TERMS_UPDATED,
    refundPolicyVersion: metadata.refund_policy_version || REFUND_POLICY_UPDATED,
    reference: session.id.slice(-10).toUpperCase(),
  };
}

const P = "margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#5C5651;";
const LABEL = "font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3A5A40;padding:10px 0 2px;";
const VALUE = "font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#2D2926;padding:0 0 10px;border-bottom:1px solid #E4E0DB;";
const LINK = "color:#3A5A40;text-decoration:underline;";

export function purchaseEmailHtml(d: PurchaseDetails): string {
  const hello = d.firstName ? `Welcome, ${escapeHtml(d.firstName)}` : "Welcome";
  const partner = d.isCouples
    ? `<p style="${P}">Your Joint Couples plan covers two linked accounts. When you are ready, invite your partner from your <a href="${SITE_URL}/account" style="${LINK}">account page</a>. Each of you works privately, and you choose what to share.</p>`
    : "";
  return `<!DOCTYPE html>
<html lang="en-GB">
<body style="margin:0;padding:0;background-color:#F5F3EF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EF;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border:1px solid #E4E0DB;border-radius:16px;">
        <tr><td style="padding:36px 40px 24px;text-align:center;">
          <img src="${SITE_URL}/apple-icon.png" width="44" height="44" alt="" style="display:inline-block;border-radius:10px;" />
          <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:3px;color:#5C5651;text-transform:uppercase;">NewFuture Therapy</p>
        </td></tr>
        <tr><td style="padding:0 40px;">
          <p style="margin:0 auto;width:32px;border-top:2px solid #6B8C6F;font-size:0;line-height:0;">&nbsp;</p>
          <h1 style="margin:20px 0 16px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:28px;line-height:1.25;color:#2D2926;text-align:center;">${hello}</h1>
          <p style="${P}">Thank you for joining Growing Together. Your membership is active and the whole programme is ready for you whenever you are. There is no rush and no pressure: go at the pace that feels right, and pause whenever you need to.</p>
          ${partner}
        </td></tr>
        <tr><td style="padding:8px 40px 24px;text-align:center;">
          <a href="${SITE_URL}/learn" style="display:inline-block;background-color:#3A5A40;color:#F5F3EF;font-family:Arial,Helvetica,sans-serif;font-size:14px;text-decoration:none;padding:14px 34px;border-radius:999px;">Begin the Programme</a>
        </td></tr>
        <tr><td style="padding:0 40px 8px;">
          <h2 style="margin:8px 0 8px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:22px;color:#2D2926;">Your Order</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="${LABEL}">Plan</td></tr>
            <tr><td style="${VALUE}">${escapeHtml(d.planLabel)}</td></tr>
            <tr><td style="${LABEL}">Price</td></tr>
            <tr><td style="${VALUE}">${escapeHtml(d.priceLine)}</td></tr>
            <tr><td style="${LABEL}">Access began</td></tr>
            <tr><td style="${VALUE}">${escapeHtml(d.startedOn)}</td></tr>
            <tr><td style="${LABEL}">Reference</td></tr>
            <tr><td style="${VALUE}">${escapeHtml(d.reference)}</td></tr>
          </table>
          <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5C5651;">Your payment receipt comes separately from our payment provider, Stripe.</p>
        </td></tr>
        <tr><td style="padding:24px 40px 8px;">
          <h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:22px;color:#2D2926;">Your Right to Cancel</h2>
          <p style="${P}">${escapeHtml(d.consentLine)}</p>
          <p style="${P}">You can still cancel future renewals at any time from your <a href="${SITE_URL}/account" style="${LINK}">account page</a>, and you will keep access until the end of the period you have paid for. This does not affect your statutory rights, including your rights if anything we provide is faulty or not as described.</p>
          <p style="${P}">You agreed to our <a href="${SITE_URL}/terms" style="${LINK}">Terms &amp; Conditions</a> (last updated ${escapeHtml(d.termsVersion)}) and our <a href="${SITE_URL}/refund-policy" style="${LINK}">Refund Policy</a> (last updated ${escapeHtml(d.refundPolicyVersion)}). Please keep this email for your records.</p>
        </td></tr>
        <tr><td style="padding:8px 40px 34px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5C5651;">This programme is educational and is not a substitute for therapy or crisis support. If you would like to speak with us, we offer a free 15-minute initial consultation through our <a href="${SITE_URL}/contact" style="${LINK}">contact page</a>.</p>
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5C5651;">NewFuture Therapy &middot; Wakefield &amp; Online &middot; Registered with BACP</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export function purchaseEmailText(d: PurchaseDetails): string {
  const hello = d.firstName ? `Welcome, ${d.firstName}` : "Welcome";
  const partner = d.isCouples
    ? `\nYour Joint Couples plan covers two linked accounts. When you are ready, invite your partner from your account page: ${SITE_URL}/account\n`
    : "";
  return `${hello}

Thank you for joining Growing Together. Your membership is active and the whole programme is ready for you whenever you are. There is no rush and no pressure.
${partner}
Begin the programme: ${SITE_URL}/learn

YOUR ORDER
Plan: ${d.planLabel}
Price: ${d.priceLine}
Access began: ${d.startedOn}
Reference: ${d.reference}
Your payment receipt comes separately from our payment provider, Stripe.

YOUR RIGHT TO CANCEL
${d.consentLine}

You can still cancel future renewals at any time from your account page (${SITE_URL}/account), and you will keep access until the end of the period you have paid for. This does not affect your statutory rights, including your rights if anything we provide is faulty or not as described.

You agreed to our Terms & Conditions (last updated ${d.termsVersion}): ${SITE_URL}/terms
and our Refund Policy (last updated ${d.refundPolicyVersion}): ${SITE_URL}/refund-policy
Please keep this email for your records.

This programme is educational and is not a substitute for therapy or crisis support. We offer a free 15-minute initial consultation: ${SITE_URL}/contact

NewFuture Therapy · Wakefield & Online · Registered with BACP`;
}

/* Best-effort: logs and returns false on any failure, never throws. */
export async function sendPurchaseConfirmation(
  session: Stripe.Checkout.Session
): Promise<boolean> {
  try {
    const details = purchaseDetailsFrom(session);
    if (!details) {
      console.error("Purchase email skipped: no customer email on", session.id);
      return false;
    }
    const sender = await loadSender();
    if (!sender) {
      console.error("Purchase email skipped: Resend is not configured");
      return false;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${sender.apiKey}`,
        "Content-Type": "application/json",
        // Resend drops a repeat send with the same key, as a second guard.
        "Idempotency-Key": `purchase-confirmation-${session.id}`,
      },
      body: JSON.stringify({
        from: sender.from,
        to: [details.to],
        subject: "Welcome to Growing Together: your order confirmation",
        html: purchaseEmailHtml(details),
        text: purchaseEmailText(details),
      }),
    });
    if (!response.ok) {
      console.error(
        "Purchase email failed:",
        response.status,
        await response.text()
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Purchase email failed:", error);
    return false;
  }
}
