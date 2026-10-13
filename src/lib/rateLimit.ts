import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

/* Fixed-window rate limiting backed by the rate_limits table (service role
   only). Keys are hashed, so no raw IP addresses or emails are stored.
   Fails open: if the database cannot be reached the request is allowed —
   an outage must never lock people out of the site. */

export interface Limit {
  /** Logical bucket, e.g. "login". */
  name: string;
  windowSeconds: number;
  max: number;
}

export const LIMITS = {
  adminLogin: { name: "admin-login", windowSeconds: 15 * 60, max: 5 },
  memberLogin: { name: "member-login", windowSeconds: 15 * 60, max: 10 },
  memberLoginEmail: { name: "member-login-email", windowSeconds: 15 * 60, max: 8 },
  signup: { name: "signup", windowSeconds: 60 * 60, max: 5 },
  passwordReset: { name: "password-reset", windowSeconds: 60 * 60, max: 5 },
  contact: { name: "contact", windowSeconds: 60 * 60, max: 5 },
  chat: { name: "reflections-chat", windowSeconds: 10 * 60, max: 30 },
  chatDaily: { name: "reflections-chat-day", windowSeconds: 24 * 60 * 60, max: 200 },
  invite: { name: "partner-invite", windowSeconds: 60 * 60, max: 10 },
  inviteAccept: { name: "invite-accept", windowSeconds: 60 * 60, max: 10 },
  courseFormat: { name: "course-format", windowSeconds: 60 * 60, max: 30 },
  videoUpload: { name: "video-upload", windowSeconds: 60 * 60, max: 30 },
  writes: { name: "member-writes", windowSeconds: 60, max: 60 },
  cspReport: { name: "csp-report", windowSeconds: 60, max: 30 },
} satisfies Record<string, Limit>;

function hashKey(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 40);
}

/** Best-effort client IP from Vercel's forwarding headers. */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

/** true = allowed, false = over the limit. */
export async function rateLimit(limit: Limit, identifier: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin().rpc("rate_limit_hit", {
      p_key: `${limit.name}:${hashKey(identifier)}`,
      p_window_seconds: limit.windowSeconds,
      p_max: limit.max,
    });
    if (error) {
      console.error("Rate limit check failed:", error.message);
      return true;
    }
    return data !== false;
  } catch (error) {
    console.error("Rate limit check failed:", error);
    return true;
  }
}

/** Convenience: limit by the caller's IP address. */
export async function rateLimitByIp(limit: Limit): Promise<boolean> {
  return rateLimit(limit, await clientIp());
}

export const TOO_MANY = "Too many attempts. Please wait a few minutes and try again.";
