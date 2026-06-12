import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  getVisibleResponsesByIds,
  type ResponseRecord,
} from "@/lib/dal/responses";

export interface LearningPathItem {
  id: string;
  kind: "note" | "partner_bookmark";
  courseId: string | null;
  lessonId: string | null;
  note: string;
  createdAt: string;
  /** Present only while the bookmarked response is still shared and the
      couple still active — revocation makes it vanish, by design. */
  source: ResponseRecord | null;
}

/* Which shared responses the member has already bookmarked. */
export async function getBookmarkedResponseIds(): Promise<Set<string>> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("learning_path_items")
    .select("source_response_id")
    .eq("kind", "partner_bookmark")
    .not("source_response_id", "is", null);
  return new Set((data ?? []).map((r) => r.source_response_id as string));
}

export async function getLearningPath(): Promise<LearningPathItem[]> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("learning_path_items")
    .select("id, kind, course_id, lesson_id, source_response_id, note, created_at")
    .order("created_at", { ascending: false });

  const rows = data ?? [];
  const sourceIds = rows
    .map((r) => r.source_response_id)
    .filter(Boolean) as string[];
  const sources = await getVisibleResponsesByIds(sourceIds);

  return rows.map((row) => ({
    id: row.id,
    kind: row.kind,
    courseId: row.course_id,
    lessonId: row.lesson_id,
    note: row.note,
    createdAt: row.created_at,
    source: row.source_response_id
      ? (sources.get(row.source_response_id) ?? null)
      : null,
  }));
}
