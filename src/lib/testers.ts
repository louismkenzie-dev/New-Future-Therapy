import "server-only";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { siteUrl } from "@/lib/siteUrl";

/* The private tester page lives at /programme-preview/<key>. The key is
   kept in site_settings (never in the repository, which is public) so the
   team can change it if the link is passed around. The free-place cap
   counts people, not couples. */

export const DEFAULT_TESTER_CAP = 50;
const KEY_PATTERN = /^[A-Za-z0-9_-]{12,64}$/;

async function getSetting(key: string): Promise<string | null> {
  const { data } = await supabaseAdmin().from("site_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

async function setSetting(key: string, value: string): Promise<void> {
  const { error } = await supabaseAdmin()
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

export async function testerPageKey(): Promise<string | null> {
  const key = process.env.TESTER_PAGE_KEY || (await getSetting("tester_page_key"));
  return key && KEY_PATTERN.test(key) ? key : null;
}

/* Creates the key on first use so the team never has to. */
export async function ensureTesterPageKey(): Promise<string> {
  const existing = await testerPageKey();
  if (existing) return existing;
  const key = randomBytes(12).toString("base64url");
  await setSetting("tester_page_key", key);
  return key;
}

export async function rotateTesterPageKey(): Promise<string> {
  const key = randomBytes(12).toString("base64url");
  await setSetting("tester_page_key", key);
  return key;
}

export async function isValidTesterKey(candidate: string): Promise<boolean> {
  if (!KEY_PATTERN.test(candidate)) return false;
  const key = await testerPageKey();
  if (!key || key.length !== candidate.length) return false;
  return timingSafeEqual(Buffer.from(key), Buffer.from(candidate));
}

export function testerPageUrl(key: string): string {
  return `${siteUrl()}/programme-preview/${key}`;
}

export async function testerCap(): Promise<number> {
  const stored = await getSetting("tester_cap");
  const raw = stored === null ? NaN : Number(stored);
  return Number.isInteger(raw) && raw >= 0 ? raw : DEFAULT_TESTER_CAP;
}

export async function setTesterCap(cap: number): Promise<void> {
  await setSetting("tester_cap", String(cap));
}

/* People given access through the page so far (a couple counts as two). */
export async function testerPlacesUsed(): Promise<number> {
  const { data } = await supabaseAdmin().from("tester_signups").select("partner_email");
  return (data ?? []).reduce((n, row) => n + (row.partner_email ? 2 : 1), 0);
}

export interface TesterSignup {
  id: string;
  name: string;
  email: string;
  partnerName: string | null;
  partnerEmail: string | null;
  linkedAsCouple: boolean;
  createdAt: string;
}

export async function listTesterSignups(): Promise<TesterSignup[]> {
  const { data } = await supabaseAdmin()
    .from("tester_signups")
    .select("id, name, email, partner_name, partner_email, linked_as_couple, created_at")
    .order("created_at", { ascending: false })
    .limit(500);
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    partnerName: r.partner_name,
    partnerEmail: r.partner_email,
    linkedAsCouple: r.linked_as_couple,
    createdAt: r.created_at,
  }));
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number | null;
  progress: string | null;
  workedWell: string | null;
  couldImprove: string | null;
  professionalView: string | null;
  partnerInterest: boolean;
  mayQuote: boolean;
  createdAt: string;
}

export async function listFeedback(): Promise<Feedback[]> {
  const { data } = await supabaseAdmin()
    .from("programme_feedback")
    .select(
      "id, name, email, rating, progress, worked_well, could_improve, professional_view, partner_interest, may_quote, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    rating: r.rating,
    progress: r.progress,
    workedWell: r.worked_well,
    couldImprove: r.could_improve,
    professionalView: r.professional_view,
    partnerInterest: r.partner_interest,
    mayQuote: r.may_quote,
    createdAt: r.created_at,
  }));
}
