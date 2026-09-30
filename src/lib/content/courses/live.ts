import "server-only";
import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { getCourse, flattenLessons, type FlatLesson } from "./index";
import type { Course, CourseModule, Lesson, LessonBlock } from "./types";
import { normaliseBlocks } from "./validate";

/* The live course: built-in content (in code) merged with what the
   therapists have added or changed in the course editor (in the database).

   - A database lesson whose id matches a built-in lesson REPLACES it, in
     place. Otherwise it is appended to its module in sort order.
   - A database module whose id matches a built-in module updates its
     title/lede/essence; otherwise it is a new module, placed by number.
   - Members only ever see published lessons; the admin preview asks for
     drafts too.

   Reads are memoised per request with React cache. */

export type LessonSource = "built-in" | "editor";

export interface LiveLesson extends Lesson {
  source: LessonSource;
  status: "published" | "draft";
  moduleId: string;
}

interface ModuleRow {
  id: string;
  course_id: string;
  number: number;
  title: string;
  lede: string;
  essence: string;
  sort_order: number;
}

interface LessonRow {
  id: string;
  course_id: string;
  module_id: string;
  title: string;
  summary: string;
  estimated_minutes: number;
  blocks: unknown;
  status: "draft" | "published";
  sort_order: number;
}

const EMPTY = { modules: [] as ModuleRow[], lessons: [] as LessonRow[] };

/* Editor rows for a course. Falls back to nothing — i.e. the built-in
   content alone — when the database cannot be reached, including at build
   time when the sales page is prerendered without a service key. */
const fetchRows = cache(async (courseId: string) => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return EMPTY;
  try {
    const admin = supabaseAdmin();
    const [modules, lessons] = await Promise.all([
      admin.from("course_modules").select("id, course_id, number, title, lede, essence, sort_order").eq("course_id", courseId),
      admin
        .from("course_lessons")
        .select("id, course_id, module_id, title, summary, estimated_minutes, blocks, status, sort_order")
        .eq("course_id", courseId)
        .order("sort_order", { ascending: true }),
    ]);
    if (modules.error || lessons.error) {
      console.error("Course editor rows unavailable:", modules.error ?? lessons.error);
      return EMPTY;
    }
    return {
      modules: (modules.data ?? []) as ModuleRow[],
      lessons: (lessons.data ?? []) as LessonRow[],
    };
  } catch (error) {
    console.error("Course editor rows unavailable:", error);
    return EMPTY;
  }
});

function toLesson(row: LessonRow): LiveLesson {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    estimatedMinutes: row.estimated_minutes,
    blocks: normaliseBlocks(row.blocks) as LessonBlock[],
    source: "editor",
    status: row.status,
    moduleId: row.module_id,
  };
}

export async function loadCourse(
  courseId: string,
  options: { includeDrafts?: boolean } = {}
): Promise<Course | undefined> {
  const base = getCourse(courseId);
  if (!base) return undefined;
  const { modules: dbModules, lessons: dbLessons } = await fetchRows(courseId);

  const visible = dbLessons.filter((l) => options.includeDrafts || l.status === "published");
  const overrides = new Map(visible.map((l) => [l.id, l]));

  const modules: CourseModule[] = base.modules.map((m) => {
    const dbm = dbModules.find((x) => x.id === m.id);
    const lessons: Lesson[] = m.lessons.map((l) => {
      const o = overrides.get(l.id);
      if (!o) return l;
      overrides.delete(l.id);
      return { ...toLesson(o), preview: l.preview };
    });
    return {
      ...m,
      title: dbm?.title ?? m.title,
      lede: dbm?.lede ?? m.lede,
      essence: dbm?.essence ?? m.essence,
      lessons,
    };
  });

  for (const dbm of dbModules) {
    if (!modules.some((m) => m.id === dbm.id)) {
      modules.push({ id: dbm.id, number: dbm.number, title: dbm.title, lede: dbm.lede, essence: dbm.essence, lessons: [] });
    }
  }

  // Lessons that did not replace a built-in one: append to their module.
  for (const row of visible) {
    if (!overrides.has(row.id)) continue;
    const target = modules.find((m) => m.id === row.module_id);
    if (!target) continue;
    target.lessons.push(toLesson(row));
  }

  modules.sort((a, b) => a.number - b.number);
  return { ...base, modules };
}

export async function getLessonLive(
  courseId: string,
  lessonId: string,
  options: { includeDrafts?: boolean } = {}
): Promise<(FlatLesson & { course: Course; prev?: FlatLesson; next?: FlatLesson }) | undefined> {
  const course = await loadCourse(courseId, options);
  if (!course) return undefined;
  const flat = flattenLessons(course);
  const found = flat.find((f) => f.lesson.id === lessonId);
  if (!found) return undefined;
  return {
    ...found,
    course,
    prev: found.index > 0 ? flat[found.index - 1] : undefined,
    next: found.index < flat.length - 1 ? flat[found.index + 1] : undefined,
  };
}

/* Exercise lookup against the live course (validates saves). */
export async function findExerciseLive(courseId: string, lessonId: string, exerciseId: string) {
  const entry = await getLessonLive(courseId, lessonId, { includeDrafts: true });
  if (!entry) return undefined;
  for (const block of entry.lesson.blocks) {
    if (
      (block.kind === "journal" ||
        block.kind === "sharedJournal" ||
        block.kind === "quiz" ||
        block.kind === "checkin" ||
        block.kind === "worksheet" ||
        block.kind === "pairedReflection" ||
        block.kind === "tapChoice") &&
      block.exerciseId === exerciseId
    ) {
      return block;
    }
  }
  return undefined;
}
