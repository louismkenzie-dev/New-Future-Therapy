import "server-only";

/* Enquiry alert emails, sent via Resend's REST API (no SDK dependency).
   Deliberately minimal content: the enquiry itself is encrypted at rest, so
   the alert carries only the enquirer's name and a link to the team area —
   client details never transit to an inbox.

   Configuration (Vercel environment variables):
   - RESEND_API_KEY       — from resend.com (required to send)
   - ENQUIRY_ALERT_EMAIL  — recipient(s), comma-separated
   - ENQUIRY_ALERT_FROM   — optional; defaults to alerts@newfuturetherapy.co.uk
   Missing configuration disables alerts silently — an alert must never
   block or break the contact form itself. */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.newfuturetherapy.co.uk";

export async function sendEnquiryAlert(enquirerName: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.ENQUIRY_ALERT_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || to.length === 0) return;

  const from =
    process.env.ENQUIRY_ALERT_FROM ??
    "NewFuture Therapy <alerts@newfuturetherapy.co.uk>";

  const safeName = enquirerName.slice(0, 80);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
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
