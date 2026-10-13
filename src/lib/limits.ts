/* Maximum lengths for anything people type. Generous enough never to bite
   real use; small enough that nobody can post megabytes into the database
   or the AI. Strips control characters (keeping newlines and tabs). */

export const MAX = {
  name: 100,
  email: 254,
  phone: 30,
  pronouns: 50,
  shortText: 200,
  message: 5000,
  reflection: 10000,
  reply: 2000,
  password: 200,
} as const;

export function clean(value: FormDataEntryValue | null | undefined, max: number): string {
  const text = typeof value === "string" ? value : "";
  return text
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}
