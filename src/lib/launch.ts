/* Launch switches for the Couples Relationship Programme.

   While Laura and Esther review the programme, sign-ups and checkout are
   closed: testers sign in with the accounts already created for them, and
   nobody else can create an account or pay. Set NEXT_PUBLIC_SIGNUPS_OPEN=true
   in Vercel to open both. Safe to read on the client (NEXT_PUBLIC_). */
export const SIGNUPS_OPEN = process.env.NEXT_PUBLIC_SIGNUPS_OPEN === "true";
