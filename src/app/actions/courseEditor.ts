"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { courses, getLesson } from "@/lib/content/courses";
import { normaliseBlocks, slugify } from "@/lib/content/courses/validate";
import type { LessonBlock } from "@/lib/content/courses";
import {
  deleteEditorLesson,
  deleteEditorModule,
  getEditorLesson,
  lessonIdExists,
  listEditorLessons,
  updateEditorLessonFields,
  upsertEditorLesson,
  upsertEditorModule,
} from "@/lib/dal/courseEditor";
import { extractText } from "@/lib/courseEditor/extract";
import { formatFromSource, refineDraft } from "@/lib/courseEditor/format";
import { loadCourse } from "@/lib/content/courses/live";

export interface EditorFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const COURSE_ID = courses[0].id;

async function guard(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

function revalidateCourse(lessonId?: string): void {
  revalidatePath("/admin/course");
  revalidatePath("/learn");
  revalidatePath(`/learn/${COURSE_ID}`);
  revalidatePath(`/courses/${COURSE_ID}`);
  if (lessonId) {
    revalidatePath(`/admin/course/${lessonId}`);
    revalidatePath(`/admin/course/preview/${lessonId}`);
    revalidatePath(`/learn/${COURSE_ID}/${lessonId}`);
  }
}

async function uniqueLessonId(title: string): Promise<string> {
  const base = slugify(title) || "lesson";
  let id = base;
  let n = 2;
  while (getLesson(COURSE_ID, id) || (await lessonIdExists(id))) id = `${base}-${n++}`;
  return id;
}

/* Upload material → extract text → format with AI → save as a draft. */
export async function createLessonFromUpload(
  _prev: EditorFormState,
  formData: FormData
): Promise<EditorFormState> {
  await guard();

  const moduleId = formData.get("moduleId")?.toString() ?? "";
  const notes = formData.get("notes")?.toString().trim() ?? "";
  const pasted = formData.get("pastedText")?.toString().trim() ?? "";
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  const course = await loadCourse(COURSE_ID, { includeDrafts: true });
  const module = course?.modules.find((m) => m.id === moduleId);
  if (!module) return { status: "error", message: "Please choose which module this lesson belongs to." };

  const sources: { name: string; text: string }[] = [];
  try {
    for (const file of files) sources.push(await extractText(file));
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "That file could not be read." };
  }
  if (pasted) sources.push({ name: "Pasted text", text: pasted });
  if (sources.length === 0) {
    return { status: "error", message: "Upload at least one document, or paste the text in." };
  }

  let draft;
  try {
    draft = await formatFromSource({ sources, moduleTitle: module.title, notes: notes || undefined });
  } catch (error) {
    console.error("Lesson formatting failed:", error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? `Formatting did not complete: ${error.message}`
          : "Formatting did not complete. Please try again.",
    };
  }

  const id = await uniqueLessonId(draft.title);
  const existing = await listEditorLessons(COURSE_ID);
  const sortOrder = Math.max(100, ...existing.filter((l) => l.moduleId === moduleId).map((l) => l.sortOrder + 10));

  await upsertEditorLesson({
    id,
    courseId: COURSE_ID,
    moduleId,
    title: draft.title,
    summary: draft.summary,
    estimatedMinutes: draft.estimatedMinutes,
    blocks: draft.blocks,
    status: "draft",
    sortOrder,
    sourceText: sources.map((s) => `# ${s.name}\n\n${s.text}`).join("\n\n"),
    sourceFiles: sources.map((s) => s.name),
    notes: notes || null,
  });

  revalidateCourse(id);
  redirect(`/admin/course/${id}?created=1`);
}

/* Ask the AI for a change to an existing draft. */
export async function refineLesson(
  _prev: EditorFormState,
  formData: FormData
): Promise<EditorFormState> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  const instruction = formData.get("instruction")?.toString().trim() ?? "";
  if (!instruction) return { status: "error", message: "Tell the editor what you would like changed." };

  const lesson = await getEditorLesson(lessonId);
  if (!lesson) return { status: "error", message: "That lesson no longer exists." };

  try {
    const draft = await refineDraft({
      current: {
        title: lesson.title,
        summary: lesson.summary,
        estimatedMinutes: lesson.estimatedMinutes,
        blocks: lesson.blocks,
      },
      instruction,
      sourceText: lesson.sourceText,
    });
    await updateEditorLessonFields(lessonId, {
      title: draft.title,
      summary: draft.summary,
      estimatedMinutes: draft.estimatedMinutes,
      blocks: draft.blocks,
    });
  } catch (error) {
    console.error("Lesson refinement failed:", error);
    return {
      status: "error",
      message: error instanceof Error ? `That change did not complete: ${error.message}` : "That change did not complete.",
    };
  }

  revalidateCourse(lessonId);
  return { status: "success", message: "Done — the preview below shows the updated lesson." };
}

/* Title, summary, module, minutes, position. */
export async function saveLessonDetails(
  _prev: EditorFormState,
  formData: FormData
): Promise<EditorFormState> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  const title = formData.get("title")?.toString().trim() ?? "";
  const summary = formData.get("summary")?.toString().trim() ?? "";
  const moduleId = formData.get("moduleId")?.toString() ?? "";
  const estimatedMinutes = Number(formData.get("estimatedMinutes"));
  const sortOrder = Number(formData.get("sortOrder"));
  if (!title) return { status: "error", message: "Please give the lesson a title." };
  if (!moduleId) return { status: "error", message: "Please choose a module." };

  await updateEditorLessonFields(lessonId, {
    title,
    summary,
    moduleId,
    estimatedMinutes: Number.isFinite(estimatedMinutes) && estimatedMinutes > 0 ? Math.round(estimatedMinutes) : 20,
    sortOrder: Number.isFinite(sortOrder) ? Math.round(sortOrder) : 100,
  });
  revalidateCourse(lessonId);
  return { status: "success", message: "Saved." };
}

/* The block list from the editor (reordered, deleted, edited in place). */
export async function saveLessonBlocks(
  _prev: EditorFormState,
  formData: FormData
): Promise<EditorFormState> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  let parsed: unknown;
  try {
    parsed = JSON.parse(formData.get("blocks")?.toString() ?? "[]");
  } catch {
    return { status: "error", message: "The sections could not be read — please check the JSON." };
  }
  const blocks: LessonBlock[] = normaliseBlocks(parsed);
  if (blocks.length === 0) return { status: "error", message: "A lesson needs at least one section." };
  await updateEditorLessonFields(lessonId, { blocks });
  revalidateCourse(lessonId);
  return { status: "success", message: "Sections saved." };
}

export async function setLessonStatus(formData: FormData): Promise<void> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  const status = formData.get("status")?.toString() === "published" ? "published" : "draft";
  await updateEditorLessonFields(lessonId, { status });
  revalidateCourse(lessonId);
}

export async function removeLesson(formData: FormData): Promise<void> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  await deleteEditorLesson(lessonId);
  revalidateCourse(lessonId);
  redirect("/admin/course");
}

/* Copies a built-in lesson into the editor so it can be changed. The copy
   keeps the same id, so it replaces the built-in one wherever it appears
   and members' saved answers carry across. */
export async function editBuiltInLesson(formData: FormData): Promise<void> {
  await guard();
  const lessonId = formData.get("lessonId")?.toString() ?? "";
  const entry = getLesson(COURSE_ID, lessonId);
  if (!entry) redirect("/admin/course");
  if (!(await lessonIdExists(lessonId))) {
    await upsertEditorLesson({
      id: lessonId,
      courseId: COURSE_ID,
      moduleId: entry.module.id,
      title: entry.lesson.title,
      summary: entry.lesson.summary,
      estimatedMinutes: entry.lesson.estimatedMinutes,
      blocks: entry.lesson.blocks,
      status: "published",
      sortOrder: 100,
      sourceText: null,
      sourceFiles: [],
      notes: null,
    });
  }
  revalidateCourse(lessonId);
  redirect(`/admin/course/${lessonId}`);
}

export async function saveModule(
  _prev: EditorFormState,
  formData: FormData
): Promise<EditorFormState> {
  await guard();
  const existingId = formData.get("moduleId")?.toString() ?? "";
  const title = formData.get("title")?.toString().trim() ?? "";
  const lede = formData.get("lede")?.toString().trim() ?? "";
  const essence = formData.get("essence")?.toString().trim() ?? "";
  const number = Number(formData.get("number"));
  if (!title) return { status: "error", message: "Please give the module a title." };
  if (!Number.isFinite(number) || number < 0) return { status: "error", message: "Please give the module a number." };

  const id = existingId || slugify(title) || `module-${Date.now()}`;
  await upsertEditorModule({
    id,
    courseId: COURSE_ID,
    number: Math.round(number),
    title,
    lede,
    essence,
    sortOrder: Math.round(number) * 10,
  });
  revalidateCourse();
  return { status: "success", message: existingId ? "Module updated." : "Module added." };
}

export async function removeModule(formData: FormData): Promise<void> {
  await guard();
  const moduleId = formData.get("moduleId")?.toString() ?? "";
  const lessons = await listEditorLessons(COURSE_ID);
  if (lessons.some((l) => l.moduleId === moduleId)) return;
  await deleteEditorModule(moduleId);
  revalidateCourse();
}
