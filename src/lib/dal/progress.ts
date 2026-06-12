import "server-only";
import { createServerSupabase } from "@/lib/supabase/server";

export interface LessonProgressEntry {
  status: "in_progress" | "completed";
  videoPositionSeconds: number | null;
  completedAt: string | null;
}

/* Progress for the signed-in member (RLS scopes rows to them). */
export async function getProgressMap(
  courseId: string
): Promise<Map<string, LessonProgressEntry>> {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id, status, video_position_seconds, completed_at")
    .eq("course_id", courseId);

  const map = new Map<string, LessonProgressEntry>();
  for (const row of data ?? []) {
    map.set(row.lesson_id, {
      status: row.status,
      videoPositionSeconds: row.video_position_seconds,
      completedAt: row.completed_at,
    });
  }
  return map;
}
