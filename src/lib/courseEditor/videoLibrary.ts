import "server-only";
import Mux from "@mux/mux-node";
import { courses, getCourse } from "@/lib/content/courses";
import type { Course, LessonBlock } from "@/lib/content/courses";
import { loadCourse } from "@/lib/content/courses/live";
import { listEditorLessons, updateEditorLessonFields, upsertEditorLesson } from "@/lib/dal/courseEditor";

/* The Mux account behind the course videos. The account holds a limited
   number of videos, and abandoned or repeated uploads count towards that,
   so the editor lists every video with where it is used and lets the team
   delete any of them. Deleting a video that a lesson uses also takes it
   out of that lesson, which then shows the "being prepared" placeholder
   until a new recording is uploaded. */

export function muxClient(): Mux {
  if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
    throw new Error("Mux is not configured");
  }
  return new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });
}

export interface VideoUsage {
  lessonTitle: string;
  lessonId?: string;
}

function collect(course: Course | undefined, into: Map<string, VideoUsage[]>): void {
  if (!course) return;
  const add = (playbackId: string, usage: VideoUsage) => {
    if (!playbackId) return;
    const list = into.get(playbackId) ?? [];
    if (!list.some((u) => u.lessonId === usage.lessonId && u.lessonTitle === usage.lessonTitle)) list.push(usage);
    into.set(playbackId, list);
  };
  if (course.trailerPlaybackId) add(course.trailerPlaybackId, { lessonTitle: "Programme trailer" });
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      for (const block of lesson.blocks) {
        if (block.kind === "video" || block.kind === "audio") {
          add(block.playbackId, { lessonTitle: lesson.title, lessonId: lesson.id });
        }
      }
    }
  }
}

/* Every playback ID the course shows, drafts included. */
export async function videoUsage(): Promise<Map<string, VideoUsage[]>> {
  const usage = new Map<string, VideoUsage[]>();
  collect(await loadCourse(courses[0].id, { includeDrafts: true }), usage);
  return usage;
}

export interface LibraryVideo {
  assetId: string;
  playbackId: string | null;
  status: string;
  durationSeconds: number;
  createdAt: Date;
  usedIn: VideoUsage[];
}

export async function listLibraryVideos(): Promise<LibraryVideo[]> {
  const [usage, page] = await Promise.all([
    videoUsage(),
    muxClient().video.assets.list({ limit: 100 }),
  ]);
  return page.data
    .map((asset) => {
      const ids = (asset.playback_ids ?? []).map((p) => p.id);
      const usedIn = ids.flatMap((id) => usage.get(id) ?? []);
      return {
        assetId: asset.id,
        playbackId: asset.playback_ids?.find((p) => p.policy === "signed")?.id ?? ids[0] ?? null,
        status: asset.status,
        durationSeconds: asset.duration ? Math.round(asset.duration) : 0,
        createdAt: new Date(Number(asset.created_at) * 1000),
        usedIn,
      };
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

function clearVideos(blocks: LessonBlock[], playbackIds: Set<string>): LessonBlock[] | null {
  let changed = false;
  const next = blocks.map((block) => {
    if ((block.kind === "video" || block.kind === "audio") && playbackIds.has(block.playbackId)) {
      changed = true;
      return { ...block, playbackId: "" };
    }
    return block;
  });
  return changed ? next : null;
}

/* Takes the video out of every lesson that uses it, then deletes it from
   Mux. Editor lessons are updated in place; a built-in lesson gets an
   edited copy (the same mechanism as editing it in the course editor). */
export async function deleteVideo(assetId: string): Promise<"deleted" | "processing"> {
  const client = muxClient();
  const asset = await client.video.assets.retrieve(assetId);
  if (asset.status === "preparing") return "processing";
  const playbackIds = new Set((asset.playback_ids ?? []).map((p) => p.id));

  if (playbackIds.size > 0) {
    const courseId = courses[0].id;
    const editorLessons = await listEditorLessons(courseId);
    for (const lesson of editorLessons) {
      const blocks = clearVideos(lesson.blocks, playbackIds);
      if (blocks) await updateEditorLessonFields(lesson.id, { blocks });
    }
    const edited = new Set(editorLessons.map((l) => l.id));
    for (const module of getCourse(courseId)?.modules ?? []) {
      for (const lesson of module.lessons) {
        if (edited.has(lesson.id)) continue;
        const blocks = clearVideos(lesson.blocks, playbackIds);
        if (!blocks) continue;
        await upsertEditorLesson({
          id: lesson.id,
          courseId,
          moduleId: module.id,
          title: lesson.title,
          summary: lesson.summary,
          estimatedMinutes: lesson.estimatedMinutes,
          blocks,
          status: "published",
        });
      }
    }
  }

  await client.video.assets.delete(assetId);
  return "deleted";
}
