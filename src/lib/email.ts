import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import { siteUrl } from "@/lib/siteUrl";

/* General-purpose branded email via Resend's REST API, sharing the enquiry
   alerts' configuration (RESEND_API_KEY / site_settings.resend_api_key).

   Owner notifications (tester sign-ups, feedback) go to
   site_settings.feedback_alert_emails if set, otherwise to the same
   addresses as enquiry alerts. Missing configuration disables sending
   silently: an email must never block or break the page that sent it. */

interface MailConfig {
  apiKey: string;
  from: string;
  ownerEmails: string[];
  replyTo: string | null;
}

async function loadConfig(): Promise<MailConfig | null> {
  const keys = [
    "resend_api_key",
    "enquiry_alert_emails",
    "enquiry_alert_from",
    "feedback_alert_emails",
    "feedback_reply_to",
  ];
  const settings = new Map<string, string>();
  try {
    const { data } = await supabaseAdmin().from("site_settings").select("key, value").in("key", keys);
    for (const row of (data ?? []) as { key: string; value: string }[]) settings.set(row.key, row.value);
  } catch (error) {
    console.error("Email settings unavailable:", error);
  }

  const apiKey = process.env.RESEND_API_KEY || settings.get("resend_api_key") || "";
  if (!apiKey) return null;
  const owners =
    settings.get("feedback_alert_emails") ||
    process.env.ENQUIRY_ALERT_EMAIL ||
    settings.get("enquiry_alert_emails") ||
    "";
  return {
    apiKey,
    from:
      process.env.ENQUIRY_ALERT_FROM ||
      settings.get("enquiry_alert_from") ||
      "NewFuture Therapy <alerts@newfuturetherapy.co.uk>",
    ownerEmails: owners
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean),
    replyTo: settings.get("feedback_reply_to") || null,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/* Email-client-safe layout matching the enquiry alert: cream page, white
   card, Georgia for the serif heading, a sage-dark pill button. `bodyHtml`
   must already be escaped. */
export function brandedEmail({
  heading,
  bodyHtml,
  button,
}: {
  heading: string;
  bodyHtml: string;
  button?: { label: string; url: string };
}): string {
  const site = siteUrl();
  const cta = button
    ? `<tr><td style="padding:8px 40px 8px;text-align:center;">
          <a href="${escapeHtml(button.url)}" style="display:inline-block;background-color:#3A5A40;color:#F5F3EF;font-family:Arial,Helvetica,sans-serif;font-size:14px;text-decoration:none;padding:14px 34px;border-radius:999px;">${escapeHtml(button.label)}</a>
        </td></tr>`
    : "";
  return `<!DOCTYPE html>
<html lang="en-GB">
<body style="margin:0;padding:0;background-color:#F5F3EF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EF;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#FFFFFF;border:1px solid #E4E0DB;border-radius:16px;">
        <tr><td style="padding:36px 40px 20px;text-align:center;">
          <img src="${site}/apple-icon.png" width="44" height="44" alt="" style="display:inline-block;border-radius:10px;" />
          <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;color:#5C5651;text-transform:uppercase;">NewFuture Therapy</p>
        </td></tr>
        <tr><td style="padding:0 40px;">
          <p style="margin:0 auto;width:32px;border-top:2px solid #6B8C6F;font-size:0;line-height:0;">&nbsp;</p>
          <h1 style="margin:20px 0 16px;text-align:center;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:26px;line-height:1.25;color:#2D2926;">${escapeHtml(heading)}</h1>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#5C5651;">${bodyHtml}</div>
        </td></tr>
        ${cta}
        <tr><td style="padding:24px 40px 34px;"></td></tr>
      </table>
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8C8680;">NewFuture Therapy &middot; Wakefield &amp; Online</p>
    </td></tr>
  </table>
</body>
</html>`;
}

interface Message {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

async function send(config: MailConfig, to: string[], message: Message): Promise<void> {
  if (to.length === 0) return;
  try {
    const replyTo = message.replyTo ?? config.replyTo;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) console.error("Email failed:", response.status, await response.text());
  } catch (error) {
    console.error("Email failed:", error);
  }
}

/** Send to one person (a tester, a partner). */
export async function sendEmailTo(to: string, message: Message): Promise<void> {
  const config = await loadConfig();
  if (config) await send(config, [to], message);
}

/** Send to Laura and Esther. */
export async function sendToOwners(message: Message): Promise<void> {
  const config = await loadConfig();
  if (config) await send(config, config.ownerEmails, message);
}
