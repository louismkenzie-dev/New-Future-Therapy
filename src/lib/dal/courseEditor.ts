import "server-only";
import { supabaseAdmin } from "@/lib/supabase";
import type { LessonBlock } from "@/lib/content/courses";
import { normaliseBlocks } from "@/lib/content/courses/validate";

/* Course editor data access — service-role only; every caller is guarded by
   isAdmin(). */

export interface EditorModule {
  id: string;
  courseId: string;
  number: number;
  title: string;
  lede: string;
  essence: string;
  sortOrder: number;
}

export interface EditorLesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  blocks: LessonBlock[];
  status: "draft" | "published";
  sortOrder: number;
  sourceText: string | null;
  sourceFiles: string[];
  notes: string | null;
  updatedAt: string;
}

const LESSON_COLUMNS =
  "id, course_id, module_id, title, summary, estimated_minutes, blocks, status, sort_order, source_text, source_files, notes, updated_at";

function mapLesson(row: Record<string, unknown>): EditorLesson {
  return {
    id: row.id as string,
    courseId: row.course_id as string,
    moduleId: row.module_id as string,
    title: row.title as string,
    summary: (row.summary as string) ?? "",
    estimatedMinutes: (row.estimated_minutes as number) ?? 20,
    blocks: normaliseBlocks(row.blocks),
    status: row.status as "draft" | "published",
    sortOrder: (row.sort_order as number) ?? 100,
    sourceText: (row.source_text as string | null) ?? null,
    sourceFiles: (row.source_files as string[] | null) ?? [],
    notes: (row.notes as string | null) ?? null,
    updatedAt: row.updated_at as string,
  };
}

export async function listEditorModules(courseId: string): Promise<EditorModule[]> {
  const { data, error } = await supabaseAdmin()
    .from("course_modules")
    .select("id, course_id, number, title, lede, essence, sort_order")
    .eq("course_id", courseId)
    .order("number");
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({
    id: r.id,
    courseId: r.course_id,
    number: r.number,
    title: r.title,
    lede: r.lede,
    essence: r.essence,
    sortOrder: r.sort_order,
  }));
}

export async function listEditorLessons(courseId: string): Promise<EditorLesson[]> {
  const { data, error } = await supabaseAdmin()
    .from("course_lessons")
    .select(LESSON_COLUMNS)
    .eq("course_id", courseId)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapLesson(r as Record<string, unknown>));
}

export async function getEditorLesson(lessonId: string): Promise<EditorLesson | null> {
  const { data, error } = await supabaseAdmin()
    .from("course_lessons")
    .select(LESSON_COLUMNS)
    .eq("id", lessonId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapLesson(data as Record<string, unknown>) : null;
}

export async function lessonIdExists(lessonId: string): Promise<boolean> {
  const { data } = await supabaseAdmin().from("course_lessons").select("id").eq("id", lessonId).maybeSingle();
  return Boolean(data);
}

export async function upsertEditorLesson(input: {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  blocks: LessonBlock[];
  status?: "draft" | "published";
  sortOrder?: number;
  sourceText?: string | null;
  sourceFiles?: string[];
  notes?: string | null;
}): Promise<void> {
  const row: Record<string, unknown> = {
    id: input.id,
    course_id: input.courseId,
    module_id: input.moduleId,
    title: input.title,
    summary: input.summary,
    estimated_minutes: input.estimatedMinutes,
    blocks: input.blocks,
  };
  if (input.status) row.status = input.status;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;
  if (input.sourceText !== undefined) row.source_text = input.sourceText;
  if (input.sourceFiles !== undefined) row.source_files = input.sourceFiles;
  if (input.notes !== undefined) row.notes = input.notes;

  const { error } = await supabaseAdmin().from("course_lessons").upsert(row, { onConflict: "id" });
  if (error) throw new Error(error.message);
}

export async function updateEditorLessonFields(
  lessonId: string,
  fields: Partial<{
    moduleId: string;
    title: string;
    summary: string;
    estimatedMinutes: number;
    blocks: LessonBlock[];
    status: "draft" | "published";
    sortOrder: number;
    notes: string | null;
  }>
): Promise<void> {
  const row: Record<string, unknown> = {};
  if (fields.moduleId !== undefined) row.module_id = fields.moduleId;
  if (fields.title !== undefined) row.title = fields.title;
  if (fields.summary !== undefined) row.summary = fields.summary;
  if (fields.estimatedMinutes !== undefined) row.estimated_minutes = fields.estimatedMinutes;
  if (fields.blocks !== undefined) row.blocks = fields.blocks;
  if (fields.status !== undefined) row.status = fields.status;
  if (fields.sortOrder !== undefined) row.sort_order = fields.sortOrder;
  if (fields.notes !== undefined) row.notes = fields.notes;
  const { error } = await supabaseAdmin().from("course_lessons").update(row).eq("id", lessonId);
  if (error) throw new Error(error.message);
}

export async function deleteEditorLesson(lessonId: string): Promise<void> {
  const { error } = await supabaseAdmin().from("course_lessons").delete().eq("id", lessonId);
  if (error) throw new Error(error.message);
}

export async function upsertEditorModule(input: EditorModule): Promise<void> {
  const { error } = await supabaseAdmin().from("course_modules").upsert(
    {
      id: input.id,
      course_id: input.courseId,
      number: input.number,
      title: input.title,
      lede: input.lede,
      essence: input.essence,
      sort_order: input.sortOrder,
    },
    { onConflict: "id" }
  );
  if (error) throw new Error(error.message);
}

export async function deleteEditorModule(moduleId: string): Promise<void> {
  const { error } = await supabaseAdmin().from("course_modules").delete().eq("id", moduleId);
  if (error) throw new Error(error.message);
}
