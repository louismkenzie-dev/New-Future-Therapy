"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/session";
import { findExercise } from "@/lib/content/courses";
import { saveResponse, type ResponseData } from "@/lib/dal/responses";

export interface ExerciseFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

function fields(formData: FormData) {
  return {
    courseId: formData.get("courseId")?.toString() ?? "",
    lessonId: formData.get("lessonId")?.toString() ?? "",
    exerciseId: formData.get("exerciseId")?.toString() ?? "",
  };
}

const SAVED: ExerciseFormState = {
  status: "success",
  message: "Saved. Your reflection is private to you.",
};
const FAILED: ExerciseFormState = {
  status: "error",
  message: "Something went wrong saving. Please try again.",
};

export async function saveJournalResponse(
  _prev: ExerciseFormState,
  formData: FormData
): Promise<ExerciseFormState> {
  const { courseId, lessonId, exerciseId } = fields(formData);
  const user = await requireUser(`/learn/${courseId}/${lessonId}`);

  const block = findExercise(courseId, lessonId, exerciseId);
  if (!block || (block.kind !== "journal" && block.kind !== "sharedJournal")) {
    return FAILED;
  }

  const answers = block.prompts.map(
    (_prompt, i) => formData.get(`answer-${i}`)?.toString() ?? ""
  );
  if (answers.every((a) => a.trim() === "")) {
    return {
      status: "error",
      message: "Write a little in at least one prompt before saving.",
    };
  }

  try {
    await saveResponse(
      user.id,
      courseId,
      lessonId,
      exerciseId,
      block.kind === "sharedJournal" ? "shared_journal" : "journal",
      { answers }
    );
  } catch (error) {
    console.error("Journal save failed:", error);
    return FAILED;
  }

  revalidatePath(`/learn/${courseId}/${lessonId}`);
  return SAVED;
}

export async function saveQuizResponse(
  _prev: ExerciseFormState,
  formData: FormData
): Promise<ExerciseFormState> {
  const { courseId, lessonId, exerciseId } = fields(formData);
  const user = await requireUser(`/learn/${courseId}/${lessonId}`);

  const block = findExercise(courseId, lessonId, exerciseId);
  if (!block || block.kind !== "quiz") return FAILED;

  const selections: Record<string, string> = {};
  for (const question of block.questions) {
    const value = formData.get(`question-${question.id}`)?.toString() ?? "";
    if (!question.options.some((o) => o.value === value)) {
      return {
        status: "error",
        message: "Please choose an answer for every question.",
      };
    }
    selections[question.id] = value;
  }

  try {
    await saveResponse(user.id, courseId, lessonId, exerciseId, "quiz", {
      selections,
    });
  } catch (error) {
    console.error("Quiz save failed:", error);
    return FAILED;
  }

  revalidatePath(`/learn/${courseId}/${lessonId}`);
  return { status: "success", message: "Saved." };
}

export async function saveCheckinResponse(
  _prev: ExerciseFormState,
  formData: FormData
): Promise<ExerciseFormState> {
  const { courseId, lessonId, exerciseId } = fields(formData);
  const user = await requireUser(`/learn/${courseId}/${lessonId}`);

  const block = findExercise(courseId, lessonId, exerciseId);
  if (!block || block.kind !== "checkin") return FAILED;

  const data: ResponseData = { scales: {}, texts: {}, choices: {} };
  for (const field of block.fields) {
    if (field.type === "scale") {
      const value = Number(formData.get(`scale-${field.id}`));
      if (Number.isFinite(value) && value >= 1 && value <= 10) {
        data.scales![field.id] = value;
      }
    } else if (field.type === "text") {
      const value = formData.get(`text-${field.id}`)?.toString().trim() ?? "";
      if (value) data.texts![field.id] = value;
    } else {
      const chosen = formData
        .getAll(`choices-${field.id}`)
        .map((v) => v.toString())
        .filter((v) => field.options?.includes(v));
      if (chosen.length) data.choices![field.id] = chosen;
    }
  }

  try {
    await saveResponse(user.id, courseId, lessonId, exerciseId, "checkin", data);
  } catch (error) {
    console.error("Check-in save failed:", error);
    return FAILED;
  }

  revalidatePath(`/learn/${courseId}/${lessonId}`);
  return { status: "success", message: "Saved. You can return to this any time." };
}

export async function saveWorksheetResponse(
  _prev: ExerciseFormState,
  formData: FormData
): Promise<ExerciseFormState> {
  const { courseId, lessonId, exerciseId } = fields(formData);
  const user = await requireUser(`/learn/${courseId}/${lessonId}`);

  const block = findExercise(courseId, lessonId, exerciseId);
  if (!block || block.kind !== "worksheet") return FAILED;

  const data: ResponseData = { texts: {}, choices: {} };
  const textFields = [
    ...block.fields.filter((f) => f.type === "text"),
    ...(block.coupleSection?.fields ?? []),
  ];
  for (const field of textFields) {
    const value = formData.get(`text-${field.id}`)?.toString().trim() ?? "";
    if (value) data.texts![field.id] = value;
  }
  for (const field of block.fields) {
    if (field.type === "scale") {
      const value = formData.get(`scale-${field.id}`)?.toString() ?? "";
      if (field.options?.includes(value)) data.choices![field.id] = [value];
    } else if (field.type === "choices") {
      const chosen = formData
        .getAll(`choices-${field.id}`)
        .map((v) => v.toString())
        .filter((v) => field.options?.includes(v));
      if (chosen.length) data.choices![field.id] = chosen;
    }
  }

  if (
    Object.keys(data.texts!).length === 0 &&
    Object.keys(data.choices!).length === 0
  ) {
    return {
      status: "error",
      message: "Answer at least one question before saving.",
    };
  }

  try {
    await saveResponse(user.id, courseId, lessonId, exerciseId, "worksheet", data);
  } catch (error) {
    console.error("Worksheet save failed:", error);
    return FAILED;
  }

  revalidatePath(`/learn/${courseId}/${lessonId}`);
  return SAVED;
}

/* Sharing is a deliberate, separate act — and always reversible. RLS plus the
   kind filter ensure only the owner's shareable rows can be toggled. */
export async function toggleResponseShare(formData: FormData): Promise<void> {
  const responseId = formData.get("responseId")?.toString() ?? "";
  const share = formData.get("share")?.toString() === "true";
  const courseId = formData.get("courseId")?.toString() ?? "";
  const lessonId = formData.get("lessonId")?.toString() ?? "";

  const user = await requireUser(`/learn/${courseId}/${lessonId}`);
  if (!responseId) return;

  const supabase = await createServerSupabase();
  await supabase
    .from("exercise_responses")
    .update({
      is_shared: share,
      shared_at: share ? new Date().toISOString() : null,
    })
    .eq("id", responseId)
    .eq("user_id", user.id)
    .in("exercise_kind", ["shared_journal", "worksheet"]);

  revalidatePath(`/learn/${courseId}/${lessonId}`);
  revalidatePath("/learn/shared");
}
