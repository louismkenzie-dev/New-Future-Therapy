import "server-only";
import { createHmac, scryptSync, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/* Shared-password team (admin) authentication.

   Password: verified against ADMIN_PASSWORD_HASH (scrypt) when set, so the
   password itself never needs to be stored; falls back to a timing-safe
   compare with ADMIN_PASSWORD.

   Session: a signed token carrying its own issue and expiry times,
   HMAC-signed with a key derived from the password credential — so it
   expires server-side after 8 hours whatever the browser does, cannot be
   forged, and changing the password signs everyone out. */

const COOKIE_NAME = "nf_admin";
const SESSION_SECONDS = 8 * 60 * 60;

function credential(): string {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return `hash:${hash}`;
  const password = process.env.ADMIN_PASSWORD;
  if (password) return `plain:${password}`;
  throw new Error("Admin credentials are not configured");
}

function signingKey(): Buffer {
  return createHmac("sha256", credential()).update("nf-admin-session-v2").digest();
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Format: scrypt$N$r$p$saltB64$hashB64 */
export function hashAdminPassword(password: string): string {
  const N = 16384, r = 8, p = 1;
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, { N, r, p });
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export function verifyPassword(input: string): boolean {
  if (!input || input.length > 200) return false;
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (stored) {
    const [scheme, n, r, p, salt, hash] = stored.split("$");
    if (scheme !== "scrypt" || !salt || !hash) return false;
    const expected = Buffer.from(hash, "base64");
    const actual = scryptSync(input, Buffer.from(salt, "base64"), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return safeEqual(input, password);
}

export async function createSession(): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ v: 2, iat: now, exp: now + SESSION_SECONDS, n: randomBytes(8).toString("hex") })
  ).toString("base64url");
  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete({ name: COOKIE_NAME, path: "/admin" });
}

export async function isAdmin(): Promise<boolean> {
  try {
    const cookie = (await cookies()).get(COOKIE_NAME)?.value;
    if (!cookie) return false;
    const [payload, signature] = cookie.split(".");
    if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      v?: number;
      exp?: number;
    };
    return data.v === 2 && typeof data.exp === "number" && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
