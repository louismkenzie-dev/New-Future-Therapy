/* Only ever redirect to a path on this site. Rejects absolute URLs,
   protocol-relative "//host" and the "/\host" form browsers also treat as
   another host, plus control characters. Safe on server and client. */
export function safeNext(raw: string | null | undefined, fallback = "/learn"): string {
  if (!raw || typeof raw !== "string") return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return fallback;
  if (/[\u0000-\u001f\u007f]/.test(raw)) return fallback;
  try {
    const base = "https://internal.invalid";
    const url = new URL(raw, base);
    if (url.origin !== base) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
