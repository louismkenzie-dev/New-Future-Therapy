import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

/* Chat transcripts are AES-256-GCM encrypted before they reach the database,
   using the same key material as exercise responses, so raw database access
   yields no readable conversation text. */

function encryptionKey(): Buffer {
  const hex =
    process.env.RESPONSES_SECRET ?? process.env.SUBMISSIONS_SECRET ?? "";
  if (hex.length !== 64) {
    throw new Error(
      "RESPONSES_SECRET (or SUBMISSIONS_SECRET) must be a 32-byte hex string"
    );
  }
  return Buffer.from(hex, "hex");
}

export function encryptText(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), enc]).toString("hex");
}

export function decryptText(hex: string): string {
  try {
    const payload = Buffer.from(hex, "hex");
    const iv = payload.subarray(0, 12);
    const tag = payload.subarray(12, 28);
    const enc = payload.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString(
      "utf8"
    );
  } catch {
    // Unreadable ciphertext (rotated key?) — surface empty rather than crash.
    return "";
  }
}
