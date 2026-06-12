import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { supabaseAnon, supabaseAdmin } from "./supabase";

/* Contact-form submissions stored in Supabase as AES-256-GCM ciphertext.
   The payload column holds binary (iv + auth_tag + ciphertext) so raw DB
   access yields no readable PII. SUBMISSIONS_SECRET is the 32-byte hex key. */

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  pronouns: string;
  referral: string;
  message: string;
  submittedAt: string;
}

function encryptionKey(): Buffer {
  const hex = process.env.SUBMISSIONS_SECRET;
  if (!hex || hex.length !== 64) {
    throw new Error("SUBMISSIONS_SECRET must be a 32-byte hex string");
  }
  return Buffer.from(hex, "hex");
}

function encrypt(plain: string): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]);
}

function decrypt(payload: Buffer): string {
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const enc = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

export async function saveSubmission(
  data: Omit<Submission, "id" | "submittedAt">
): Promise<void> {
  const submission: Submission = {
    ...data,
    id: randomBytes(8).toString("hex"),
    submittedAt: new Date().toISOString(),
  };
  const payload = encrypt(JSON.stringify(submission));

  // PostgREST expects bytea as \x{hex} — never Array.from() which loses binary structure
  const { error } = await supabaseAnon()
    .from("contact_submissions")
    .insert({ payload: `\\x${payload.toString("hex")}` });

  if (error) throw new Error(error.message);
}

export async function listSubmissions(): Promise<Submission[]> {
  const { data, error } = await supabaseAdmin()
    .from("contact_submissions")
    .select("payload, submitted_at")
    .order("submitted_at", { ascending: false })
    .limit(500);

  if (error) throw new Error(error.message);

  const submissions: Submission[] = [];
  for (const row of data ?? []) {
    try {
      // Supabase returns bytea as \x{hex} — strip prefix and decode
      const hex = (row.payload as string).replace(/^\\x/, "");
      const buf = Buffer.from(hex, "hex");
      submissions.push(JSON.parse(decrypt(buf)) as Submission);
    } catch {
      // skip any row that fails to decrypt rather than crashing the dashboard
    }
  }
  return submissions;
}
