import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase";
import { encryptText, decryptText } from "@/lib/reflections/crypto";

/* Reflections conversations. Transcripts are retained (the practice's chosen
   default) with participant delete controls; message text is encrypted at
   the application layer. All reads and writes go through the user's
   RLS-scoped client — the service-role client is used only for the anonymous
   safety counter, which stores no identity and no content. */

export interface ChatSessionMeta {
  id: string;
  courseId: string | null;
  lessonId: string | null;
  exerciseId: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SessionRow {
  id: string;
  course_id: string | null;
  lesson_id: string | null;
  exercise_id: string | null;
  title: string;
  created_at: string;
  updated_at: string;
}

function mapSession(row: SessionRow): ChatSessionMeta {
  return {
    id: row.id,
    courseId: row.course_id,
    lessonId: row.lesson_id,
    exerciseId: row.exercise_id,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/* Find or create the session for a context. Embedded lesson panels reuse one
   session per exercise; the standalone page creates fresh ones on demand. */
export async function getOrCreateSession(
  userId: string,
  context: {
    sessionId?: string;
    courseId?: string;
    lessonId?: string;
    exerciseId?: string;
    title: string;
  }
): Promise<ChatSessionMeta | null> {
  const supabase = await createServerSupabase();

  if (context.sessionId) {
    const { data } = await supabase
      .from("chat_sessions")
      .select("id, course_id, lesson_id, exercise_id, title, created_at, updated_at")
      .eq("id", context.sessionId)
      .eq("user_id", userId)
      .maybeSingle();
    return data ? mapSession(data as SessionRow) : null;
  }

  if (context.exerciseId) {
    const { data } = await supabase
      .from("chat_sessions")
      .select("id, course_id, lesson_id, exercise_id, title, created_at, updated_at")
      .eq("user_id", userId)
      .eq("exercise_id", context.exerciseId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return mapSession(data as SessionRow);
  }

  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({
      user_id: userId,
      course_id: context.courseId ?? null,
      lesson_id: context.lessonId ?? null,
      exercise_id: context.exerciseId ?? null,
      title: context.title,
    })
    .select("id, course_id, lesson_id, exercise_id, title, created_at, updated_at")
    .single();
  if (error || !data) return null;
  return mapSession(data as SessionRow);
}

export async function listSessions(userId: string): Promise<ChatSessionMeta[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("chat_sessions")
    .select("id, course_id, lesson_id, exercise_id, title, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  return ((data ?? []) as SessionRow[]).map(mapSession);
}

export async function getMessages(
  sessionId: string,
  limit = 30
): Promise<ChatMessage[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return ((data ?? []) as { role: "user" | "assistant"; content: string }[])
    .reverse()
    .map((row) => ({ role: row.role, content: decryptText(row.content) }))
    .filter((m) => m.content !== "");
}

/* The route handler passes its own request-scoped client so the assistant
   turn can still be persisted after streaming ends (the request cookie scope
   is gone by then). */
export type SupabaseLike = Awaited<ReturnType<typeof createServerSupabase>>;

export async function appendMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string,
  client?: SupabaseLike
): Promise<void> {
  const supabase = client ?? (await createServerSupabase());
  await supabase.from("chat_messages").insert({
    session_id: sessionId,
    role,
    content: encryptText(content),
  });
  await supabase
    .from("chat_sessions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", sessionId);
}

export async function deleteSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase
    .from("chat_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", userId);
}

export async function deleteAllSessions(userId: string): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.from("chat_sessions").delete().eq("user_id", userId);
}

/* Anonymous safety counter (the practice's chosen posture): tier and
   timestamp only — no user id, no session id, no content. Informs the
   periodic signposting review without creating any duty to act on
   individuals or any record about them. */
export async function recordSafetyEvent(
  tier: "vulnerability" | "immediate"
): Promise<void> {
  try {
    await supabaseAdmin().from("agent_safety_events").insert({ tier });
  } catch {
    // The counter must never break the support pathway itself.
  }
}
