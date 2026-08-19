import "server-only";
import { supabaseAdmin } from "@/lib/supabase";

/* Enquiry alert emails, sent via Resend's REST API (no SDK dependency).
   Deliberately minimal content: the enquiry itself is encrypted at rest, so
   the alert carries only the enquirer's name and a link to the team area —
   client details never transit to an inbox.

   Configuration is read from environment variables first, then from the
   service-role-only site_settings table (keys: resend_api_key,
   enquiry_alert_emails, enquiry_alert_from). Missing configuration disables
   alerts silently — an alert must never block or break the contact form. */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newfuturetherapy.co.uk";

interface AlertConfig {
  apiKey: string;
  to: string[];
  from: string;
}

async function loadConfig(): Promise<AlertConfig | null> {
  let apiKey = process.env.RESEND_API_KEY ?? "";
  let emails = process.env.ENQUIRY_ALERT_EMAIL ?? "";
  let from = process.env.ENQUIRY_ALERT_FROM ?? "";

  if (!apiKey || !emails) {
    try {
      const { data } = await supabaseAdmin()
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "resend_api_key",
          "enquiry_alert_emails",
          "enquiry_alert_from",
        ]);
      const settings = new Map(
        ((data ?? []) as { key: string; value: string }[]).map((row) => [
          row.key,
          row.value,
        ])
      );
      apiKey = apiKey || (settings.get("resend_api_key") ?? "");
      emails = emails || (settings.get("enquiry_alert_emails") ?? "");
      from = from || (settings.get("enquiry_alert_from") ?? "");
    } catch (error) {
      console.error("Enquiry alert settings unavailable:", error);
    }
  }

  const to = emails
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || to.length === 0) return null;

  return {
    apiKey,
    to,
    from: from || "NewFuture Therapy <alerts@newfuturetherapy.co.uk>",
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/* Branded, email-client-safe HTML: table layout, inline styles, the leaf
   mark as a hosted PNG (SVG is stripped by Gmail), Georgia standing in for
   Cormorant Garamond. */
function alertHtml(firstName: string, when: string): string {
  const name = escapeHtml(firstName);
  return `<!DOCTYPE html>
<html lang="en-GB">
<body style="margin:0;padding:0;background-color:#F5F3EF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3EF;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#FFFFFF;border:1px solid #E4E0DB;border-radius:16px;">
        <tr><td style="padding:36px 40px 28px;text-align:center;">
          <img src="${SITE_URL}/apple-icon.png" width="44" height="44" alt="" style="display:inline-block;border-radius:10px;" />
          <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;color:#5C5651;text-transform:uppercase;">NewFuture Therapy</p>
        </td></tr>
        <tr><td style="padding:0 40px;text-align:center;">
          <p style="margin:0 auto;width:32px;border-top:2px solid #6B8C6F;font-size:0;line-height:0;">&nbsp;</p>
          <h1 style="margin:20px 0 14px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:26px;line-height:1.25;color:#2D2926;">New Consultation Enquiry</h1>
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#5C5651;">
            <strong style="color:#3A5A40;">${name}</strong> sent an enquiry through the website on
          </p>
          <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:17px;color:#3A5A40;">${escapeHtml(when)}</p>
        </td></tr>
        <tr><td style="padding:0 40px 8px;text-align:center;">
          <a href="${SITE_URL}/admin" style="display:inline-block;background-color:#3A5A40;color:#F5F3EF;font-family:Arial,Helvetica,sans-serif;font-size:14px;text-decoration:none;padding:14px 34px;border-radius:999px;">Read It in the Team Area</a>
        </td></tr>
        <tr><td style="padding:24px 40px 34px;text-align:center;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8C8680;">
            For confidentiality, the enquiry itself is not included in this email — it is waiting, encrypted, in the team area.
          </p>
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8C8680;">NewFuture Therapy &middot; Wakefield &amp; Online</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendEnquiryAlert(enquirerName: string): Promise<void> {
  const config = await loadConfig();
  if (!config) return;

  const firstName = enquirerName.trim().split(/\s+/)[0].slice(0, 40);
  const when = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        subject: `New consultation enquiry from ${firstName}`,
        html: alertHtml(firstName, when),
        text: `${firstName} sent an enquiry through the website on ${when}.

For confidentiality, the enquiry itself is not included in this email. Sign in to the team area to read and respond:

${SITE_URL}/admin

— NewFuture Therapy · Wakefield & Online`,
      }),
    });
    if (!response.ok) {
      console.error(
        "Enquiry alert email failed:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Enquiry alert email failed:", error);
  }
}
