import { createBrowserClient } from "@supabase/ssr";

/* Browser client — used only for the lightweight signed-in check in the
   header account menu. All data access happens server-side. */
export function createBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
