import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";

export type ReactionType =
  | "i_hear_you"
  | "thank_you"
  | "this_moved_me"
  | "lets_talk";

export interface ReactionRecord {
  id: string;
  responseId: string;
  reactorId: string;
  reactionType: ReactionType;
  replyText: string | null;
  updatedAt: string;
}

/* Reactions on a set of responses. RLS limits visibility to the reactor and
   the owner of the response. */
export async function getReactionsForResponses(
  responseIds: string[]
): Promise<Map<string, ReactionRecord[]>> {
  const map = new Map<string, ReactionRecord[]>();
  if (responseIds.length === 0) return map;

  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("response_reactions")
    .select("id, response_id, reactor_id, reaction_type, reply_text, updated_at")
    .in("response_id", responseIds);

  for (const row of data ?? []) {
    const record: ReactionRecord = {
      id: row.id,
      responseId: row.response_id,
      reactorId: row.reactor_id,
      reactionType: row.reaction_type,
      replyText: row.reply_text,
      updatedAt: row.updated_at,
    };
    const list = map.get(row.response_id) ?? [];
    list.push(record);
    map.set(row.response_id, list);
  }
  return map;
}
