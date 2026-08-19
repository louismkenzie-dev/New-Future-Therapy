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

export async function sendEnquiryAlert(enquirerName: string): Promise<void> {
  const config = await loadConfig();
  if (!config) return;

  const safeName = enquirerName.slice(0, 80);

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
        subject: "New consultation enquiry on the website",
        text: `You have received a new consultation enquiry from ${safeName}.

For confidentiality, the details are not included in this email. Sign in to the team area to read and respond:

${SITE_URL}/admin

— NewFuture Therapy website`,
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
