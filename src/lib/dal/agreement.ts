import "server-only";
import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { AGREEMENT_VERSION } from "@/lib/content/participationAgreement";

/* When (if ever) the member accepted the CURRENT agreement version. */
export const hasAcceptedAgreement = cache(async (userId: string): Promise<string | null> => {
  const { data } = await supabaseAdmin()
    .from("profiles")
    .select("agreement_version, agreement_accepted_at")
    .eq("id", userId)
    .maybeSingle();
  if (!data || data.agreement_version !== AGREEMENT_VERSION) return null;
  return data.agreement_accepted_at;
});
