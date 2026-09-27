import type { Course, CourseModule, Lesson } from "./types";
import { growingTogether } from "./growing-together";

export type {
  Course,
  CourseModule,
  Lesson,
  LessonBlock,
  PairedQuestion,
} from "./types";

export const courses: Course[] = [growingTogether];

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId);
}

export interface FlatLesson {
  lesson: Lesson;
  module: CourseModule;
  /** zero-based position across the whole course */
  index: number;
}

export function flattenLessons(course: Course): FlatLesson[] {
  const flat: FlatLesson[] = [];
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      flat.push({ lesson, module, index: flat.length });
    }
  }
  return flat;
}

export function getLesson(
  courseId: string,
  lessonId: string
): (FlatLesson & { course: Course; prev?: FlatLesson; next?: FlatLesson }) | undefined {
  const course = getCourse(courseId);
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

export function countLessons(course: Course): number {
  return course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

/** "Introduction" for the pre-module, otherwise "Module N". */
export function moduleLabel(module: Pick<CourseModule, "number">): string {
  return module.number === 0 ? "Introduction" : `Module ${module.number}`;
}

/** Short form for the numeral roundel: "Intro" or "N". */
export function moduleNumeral(module: Pick<CourseModule, "number">): string {
  return module.number === 0 ? "Intro" : String(module.number);
}

/** Exercise ids that live in a given course (used to validate saves). */
export function findExercise(courseId: string, lessonId: string, exerciseId: string) {
  const entry = getLesson(courseId, lessonId);
  if (!entry) return undefined;
  for (const block of entry.lesson.blocks) {
    if (
      (block.kind === "journal" ||
        block.kind === "sharedJournal" ||
        block.kind === "quiz" ||
        block.kind === "checkin" ||
        block.kind === "worksheet" ||
        block.kind === "pairedReflection") &&
      block.exerciseId === exerciseId
    ) {
      return block;
    }
  }
  return undefined;
}
