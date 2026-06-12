"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";

export interface ReactionFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const VALID_TYPES = ["i_hear_you", "thank_you", "this_moved_me", "lets_talk"];

/* One reaction (plus optional gentle reply) per partner per response —
   editable. The RLS insert/update policies guarantee the response is a
   currently shared reflection from the member's active partner. */
export async function setReaction(
  _prev: ReactionFormState,
  formData: FormData
): Promise<ReactionFormState> {
  const user = await requireUser("/learn/shared");
  const responseId = formData.get("responseId")?.toString() ?? "";
  const reactionType = formData.get("reactionType")?.toString() ?? "";
  const replyText = formData.get("replyText")?.toString().trim() ?? "";

  if (!responseId || !VALID_TYPES.includes(reactionType)) {
    return {
      status: "error",
      message: "Please choose a response before sending.",
    };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("response_reactions").upsert(
    {
      response_id: responseId,
      reactor_id: user.id,
      reaction_type: reactionType,
      reply_text: replyText || null,
    },
    { onConflict: "response_id,reactor_id" }
  );

  if (error) {
    console.error("Reaction save failed:", error);
    return {
      status: "error",
      message: "Something went wrong sending your response. Please try again.",
    };
  }

  revalidatePath("/learn/shared");
  return { status: "success", message: "Sent, gently." };
}
