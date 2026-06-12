import "server-only";
import { put, list } from "@vercel/blob";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

/* Contact-form submissions, stored as AES-256-GCM-encrypted JSON blobs.
   Blob URLs are public-by-URL, so nothing readable ever leaves the server:
   a leaked URL yields only ciphertext. SUBMISSIONS_SECRET (32-byte hex) is
   the encryption key and must match between local and Vercel environments. */

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

const PREFIX = "submissions/";

function key(): Buffer {
  const hex = process.env.SUBMISSIONS_SECRET;
  if (!hex || hex.length !== 64) {
    throw new Error("SUBMISSIONS_SECRET must be a 32-byte hex string");
  }
  return Buffer.from(hex, "hex");
}

function encrypt(plain: string): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]);
}

function decrypt(payload: Buffer): string {
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const enc = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key(), iv);
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
  await put(
    `${PREFIX}${Date.now()}-${submission.id}.bin`,
    encrypt(JSON.stringify(submission)),
    { access: "public", contentType: "application/octet-stream" }
  );
}

export async function listSubmissions(): Promise<Submission[]> {
  const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
  const submissions = await Promise.all(
    blobs.map(async (blob) => {
      try {
        const res = await fetch(blob.url, { cache: "no-store" });
        const buf = Buffer.from(await res.arrayBuffer());
        return JSON.parse(decrypt(buf)) as Submission;
      } catch {
        return null; // skip unreadable/corrupt blobs rather than failing the page
      }
    })
  );
  return submissions
    .filter((s): s is Submission => s !== null)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}
