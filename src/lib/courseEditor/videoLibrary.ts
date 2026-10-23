import "server-only";
import Mux from "@mux/mux-node";
import { courses, getCourse } from "@/lib/content/courses";
import type { Course } from "@/lib/content/courses";
import { loadCourse } from "@/lib/content/courses/live";

/* The Mux account behind the course videos. Mux's free plan holds only
   ten videos, and abandoned or repeated uploads count towards that, so the
   editor lists every video with where it is used and lets the team delete
   the ones nothing points at. */

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

/* Every playback ID the course could show: the live course including
   drafts, plus the built-in content (which returns if an edited lesson is
   reverted). Deliberately generous — a video is only offered for deletion
   when nothing anywhere refers to it. */
export async function videoUsage(): Promise<Map<string, VideoUsage[]>> {
  const usage = new Map<string, VideoUsage[]>();
  const courseId = courses[0].id;
  collect(await loadCourse(courseId, { includeDrafts: true }), usage);
  collect(getCourse(courseId), usage);
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

export async function deleteUnusedVideo(assetId: string): Promise<"deleted" | "in-use" | "processing"> {
  const client = muxClient();
  const [asset, usage] = await Promise.all([client.video.assets.retrieve(assetId), videoUsage()]);
  if ((asset.playback_ids ?? []).some((p) => usage.has(p.id))) return "in-use";
  if (asset.status === "preparing") return "processing";
  await client.video.assets.delete(assetId);
  return "deleted";
}
