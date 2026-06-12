"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";

export interface PathFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function addPathNote(
  _prev: PathFormState,
  formData: FormData
): Promise<PathFormState> {
  const user = await requireUser("/learn/path");
  const note = formData.get("note")?.toString().trim() ?? "";
  const courseId = formData.get("courseId")?.toString() || null;
  const lessonId = formData.get("lessonId")?.toString() || null;

  if (!note) {
    return { status: "error", message: "Write a note before saving." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("learning_path_items").insert({
    user_id: user.id,
    kind: "note",
    course_id: courseId,
    lesson_id: lessonId,
    note,
  });

  if (error) {
    console.error("Path note failed:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/learn/path");
  return { status: "success", message: "Added to your learning path." };
}

export async function addPartnerBookmark(
  _prev: PathFormState,
  formData: FormData
): Promise<PathFormState> {
  const user = await requireUser("/learn/shared");
  const sourceResponseId = formData.get("sourceResponseId")?.toString() ?? "";
  const note = formData.get("note")?.toString().trim() ?? "";
  const courseId = formData.get("courseId")?.toString() || null;
  const lessonId = formData.get("lessonId")?.toString() || null;

  if (!sourceResponseId) return { status: "error", message: "Missing response." };

  const supabase = await createServerSupabase();

  // Visible under RLS, shared, and not our own — i.e. genuinely the partner's.
  const { data: source } = await supabase
    .from("exercise_responses")
    .select("id, user_id, is_shared")
    .eq("id", sourceResponseId)
    .maybeSingle();
  if (!source || source.user_id === user.id || !source.is_shared) {
    return {
      status: "error",
      message: "That reflection is no longer available to bookmark.",
    };
  }

  const { error } = await supabase.from("learning_path_items").insert({
    user_id: user.id,
    kind: "partner_bookmark",
    course_id: courseId,
    lesson_id: lessonId,
    source_response_id: sourceResponseId,
    note,
  });

  if (error) {
    console.error("Partner bookmark failed:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  revalidatePath("/learn/path");
  revalidatePath("/learn/shared");
  return { status: "success", message: "Saved to your learning path." };
}

export async function removePathItem(formData: FormData): Promise<void> {
  const user = await requireUser("/learn/path");
  const itemId = formData.get("itemId")?.toString() ?? "";
  if (!itemId) return;

  const supabase = await createServerSupabase();
  await supabase
    .from("learning_path_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id);

  revalidatePath("/learn/path");
}
