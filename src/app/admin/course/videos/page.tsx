import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Film } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { getPlaybackTokens } from "@/lib/mux";
import { listLibraryVideos, type LibraryVideo } from "@/lib/courseEditor/videoLibrary";
import DeleteVideoButton from "@/components/admin/course/DeleteVideoButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Video Library",
  robots: { index: false, follow: false },
};

/* The video account currently holds ten videos. */
const VIDEO_LIMIT = 10;

const RESULTS: Record<string, { ok: boolean; text: string }> = {
  deleted: {
    ok: true,
    text: "Video deleted. That space is free for a new upload. Any lesson that used it now shows “video coming soon” until you upload a replacement.",
  },
  processing: { ok: false, text: "That video is still being prepared. Try again in a few minutes." },
  error: { ok: false, text: "The video could not be deleted. Please try again." },
};

function formatDuration(seconds: number): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function thumbnailUrl(video: LibraryVideo): Promise<string | null> {
  if (!video.playbackId || video.status !== "ready") return null;
  const tokens = await getPlaybackTokens(video.playbackId);
  return tokens.thumbnail
    ? `https://image.mux.com/${video.playbackId}/thumbnail.jpg?token=${tokens.thumbnail}`
    : null;
}

export default async function VideoLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ result?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { result } = await searchParams;
  const notice = result ? RESULTS[result] : undefined;

  let videos: LibraryVideo[] = [];
  let loadError = false;
  try {
    videos = await listLibraryVideos();
  } catch (err) {
    console.error("Mux library failed:", err);
    loadError = true;
  }
  const thumbs = await Promise.all(videos.map(thumbnailUrl));
  const unused = videos.filter((v) => v.usedIn.length === 0).length;

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/course"
          className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200 mb-6"
        >
          <ArrowLeft size={15} />
          Back to the course
        </Link>
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">Course Editor</p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4">Video Library</h1>
        <p className="font-body text-base text-muted leading-relaxed max-w-2xl mb-8">
          Every video stored with the video service, and the lesson each one appears in. The library
          currently holds {VIDEO_LIMIT} videos, and earlier attempts or replaced recordings count
          towards that. Delete anything marked “Not used” to make room, or delete a video that is
          wrong and upload the right one in its lesson.
        </p>

        {!loadError && (
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center min-h-[44px] font-body text-sm bg-white border border-grey-light rounded-full px-5">
              {videos.length} of {VIDEO_LIMIT} spaces used
            </span>
            <span className="inline-flex items-center min-h-[44px] font-body text-sm bg-sage-pale border border-sage-light/50 text-sage-dark rounded-full px-5">
              {unused} not used in any lesson
            </span>
          </div>
        )}

        {notice && (
          <div
            className={`mb-8 flex items-start gap-3 rounded-2xl p-5 border ${
              notice.ok ? "bg-sage-pale border-sage-light/60 text-sage-dark" : "bg-white border-red-200 text-red-700"
            }`}
          >
            {notice.ok ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
            <p className="font-body text-sm leading-relaxed">{notice.text}</p>
          </div>
        )}

        {loadError ? (
          <p className="font-body text-sm text-red-700">The video list could not be loaded. Please refresh in a moment.</p>
        ) : videos.length === 0 ? (
          <p className="font-body text-sm text-muted">No videos have been uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={video.assetId}
                className="bg-white rounded-2xl border border-grey-light shadow-sm p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-5"
              >
                <div className="w-full sm:w-40 aspect-video rounded-xl bg-sage-pale overflow-hidden shrink-0 flex items-center justify-center">
                  {thumbs[index] ? (
                    <img src={thumbs[index]!} alt="" className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <Film size={24} className="text-sage" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {video.usedIn.length > 0 ? (
                    <p className="font-body text-xs text-sage-dark uppercase tracking-[0.2em] mb-1">In use</p>
                  ) : (
                    <p className="font-body text-xs text-muted uppercase tracking-[0.2em] mb-1">Not used</p>
                  )}
                  <p className="font-body text-base text-charcoal">
                    {video.usedIn.length > 0
                      ? video.usedIn.map((u) => u.lessonTitle).join(", ")
                      : "Not in any lesson"}
                  </p>
                  <p className="font-body text-sm text-muted mt-1">
                    Uploaded{" "}
                    {video.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    {video.durationSeconds > 0 && ` · ${formatDuration(video.durationSeconds)}`}
                    {video.status === "preparing" && " · still processing"}
                    {video.status === "errored" && " · could not be processed"}
                  </p>
                </div>
                {video.status !== "preparing" && (
                  <DeleteVideoButton
                    assetId={video.assetId}
                    usedIn={video.usedIn.map((u) => u.lessonTitle)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
