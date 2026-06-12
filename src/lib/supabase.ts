import "server-only";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/* Anon client — used by server actions for contact form inserts.
   RLS policy restricts this to INSERT only on contact_submissions. */
export function supabaseAnon() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(SUPABASE_URL, key);
}

/* Service-role client — bypasses RLS; used only in admin server components. */
export function supabaseAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(SUPABASE_URL, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
