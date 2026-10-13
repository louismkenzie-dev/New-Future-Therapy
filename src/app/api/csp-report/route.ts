import { NextResponse } from "next/server";
import { LIMITS, rateLimitByIp } from "@/lib/rateLimit";

/* Receives Content-Security-Policy violation reports from browsers and logs
   a one-line summary, so anything the policy blocks shows up in the Vercel
   runtime logs. Size-capped and rate-limited; never echoes input. */

export const dynamic = "force-dynamic";

const MAX_BYTES = 16 * 1024;

function strip(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`.slice(0, 200);
  } catch {
    return value.slice(0, 120);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await rateLimitByIp(LIMITS.cspReport))) {
    return new NextResponse(null, { status: 204 });
  }
  const text = (await request.text()).slice(0, MAX_BYTES);
  try {
    const body = JSON.parse(text) as unknown;
    const reports = Array.isArray(body) ? body : [body];
    for (const entry of reports.slice(0, 5)) {
      const r = (entry as Record<string, unknown>)["csp-report"] ?? (entry as Record<string, unknown>).body ?? entry;
      const rec = r as Record<string, unknown>;
      console.warn(
        "[csp] blocked",
        strip(rec["blocked-uri"] ?? rec.blockedURL),
        "directive:",
        String(rec["violated-directive"] ?? rec.effectiveDirective ?? "").slice(0, 60),
        "on",
        strip(rec["document-uri"] ?? rec.documentURL)
      );
    }
  } catch {
    // Malformed report — ignore.
  }
  return new NextResponse(null, { status: 204 });
}
