"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/session";
import { getLesson } from "@/lib/content/courses";

/* Lesson progress writes go through the RLS-enforced client — a member can
   only ever touch their own rows. Signed-out viewers of preview lessons are
   silently ignored. */

export async function saveVideoPosition(
  courseId: string,
  lessonId: string,
  seconds: number
): Promise<void> {
  const user = await getUser();
  if (!user || !getLesson(courseId, lessonId)) return;

  const supabase = await createServerSupabase();
  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      course_id: courseId,
      lesson_id: lessonId,
      video_position_seconds: Math.max(0, Math.floor(seconds)),
    },
    { onConflict: "user_id,course_id,lesson_id" }
  );
}

export async function setLessonComplete(formData: FormData): Promise<void> {
  const courseId = formData.get("courseId")?.toString() ?? "";
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  const completed = formData.get("completed")?.toString() === "true";

  const user = await getUser();
  if (!user || !getLesson(courseId, lessonId)) return;

  const supabase = await createServerSupabase();
  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      course_id: courseId,
      lesson_id: lessonId,
      status: completed ? "completed" : "in_progress",
      completed_at: completed ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,course_id,lesson_id" }
  );

  revalidatePath("/learn");
  revalidatePath(`/learn/${courseId}`);
  revalidatePath(`/learn/${courseId}/${lessonId}`);
}

export async function markLessonCompleteFromPlayer(
  courseId: string,
  lessonId: string
): Promise<void> {
  const user = await getUser();
  if (!user || !getLesson(courseId, lessonId)) return;

  const supabase = await createServerSupabase();
  await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      course_id: courseId,
      lesson_id: lessonId,
      status: "completed",
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,course_id,lesson_id" }
  );

  revalidatePath("/learn");
  revalidatePath(`/learn/${courseId}`);
}
