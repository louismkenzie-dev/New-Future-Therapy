import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileDown,
} from "lucide-react";
import LessonVideoPlayer from "@/components/course/LessonVideoPlayer";
import JournalExercise, {
  type ReceivedReaction,
} from "@/components/course/exercises/JournalExercise";
import QuizExercise from "@/components/course/exercises/QuizExercise";
import CheckinExercise from "@/components/course/exercises/CheckinExercise";
import { getLesson, type LessonBlock } from "@/lib/content/courses";
import { getPlaybackTokens } from "@/lib/mux";
import { getUser, type SessionUser } from "@/lib/auth/session";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getProgressMap, type LessonProgressEntry } from "@/lib/dal/progress";
import {
  getOwnResponse,
  getOwnResponsesForLesson,
  type ResponseRecord,
} from "@/lib/dal/responses";
import { getActivePartner } from "@/lib/dal/couples";
import { getReactionsForResponses } from "@/lib/dal/reactions";
import { setLessonComplete } from "@/app/actions/progress";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}): Promise<Metadata> {
  const { courseId, lessonId } = await params;
  const entry = getLesson(courseId, lessonId);
  return {
    title: entry ? entry.lesson.title : "Lesson",
    robots: { index: false },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const entry = getLesson(courseId, lessonId);
  if (!entry) notFound();
  const { lesson, module, course, prev, next } = entry;
  const path = `/learn/${courseId}/${lessonId}`;

  // Free-preview lessons render for anyone; everything else is entitled-only.
  let user: SessionUser | null = null;
  if (lesson.preview) {
    user = await getUser();
  } else {
    ({ user } = await requireEntitlement(path));
  }
  const interactive = Boolean(user);

  let responses = new Map<string, ResponseRecord>();
  let progress: LessonProgressEntry | undefined;
  let partner: { id: string; name: string } | null = null;
  let reactionsByResponse = new Map<string, ReceivedReaction[]>();
  let baselineCompare: Record<string, number> | undefined;

  if (user) {
    const [responsesMap, progressMap, activePartner] = await Promise.all([
      getOwnResponsesForLesson(user.id, courseId, lessonId),
      getProgressMap(courseId),
      getActivePartner(user.id),
    ]);
    responses = responsesMap;
    progress = progressMap.get(lessonId);
    partner = activePartner;

    const sharedResponseIds = [...responses.values()]
      .filter((r) => r.kind === "shared_journal")
      .map((r) => r.id);
    if (sharedResponseIds.length && partner) {
      const reactions = await getReactionsForResponses(sharedResponseIds);
      reactionsByResponse = new Map(
        [...reactions.entries()].map(([responseId, list]) => [
          responseId,
          list
            .filter((r) => r.reactorId !== user!.id)
            .map((r) => ({
              reactionType: r.reactionType,
              replyText: r.replyText,
              reactorName: partner!.name,
            })),
        ])
      );
    }

    // The Module 10 retake shows the Module 1 baseline alongside.
    if (lessonId === "looking-back-at-the-path") {
      const baseline = await getOwnResponse(user.id, courseId, "baseline-checkin");
      baselineCompare = baseline?.data.scales;
    }
  }

  const completed = progress?.status === "completed";

  return (
    <>
      {/* Lesson header */}
      <section className="bg-sage-pale pt-12 pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">
            Module {module.number} · {module.title}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 mt-5">
            <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted">
              <Clock size={15} />
              About {lesson.estimatedMinutes} minutes
            </span>
            {completed && (
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark">
                <CheckCircle2 size={15} />
                Completed
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-12">
          {lesson.blocks.map((block, index) => (
            <Block
              key={index}
              block={block}
              courseId={courseId}
              lessonId={lessonId}
              interactive={interactive}
              responses={responses}
              partnerName={partner?.name ?? null}
              reactionsByResponse={reactionsByResponse}
              startTime={progress?.videoPositionSeconds ?? undefined}
              baselineCompare={baselineCompare}
            />
          ))}

          {/* Completion + navigation */}
          <div className="border-t border-grey-light pt-10">
            {interactive && (
              <form action={setLessonComplete} className="mb-10 text-center">
                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="lessonId" value={lessonId} />
                <input
                  type="hidden"
                  name="completed"
                  value={completed ? "false" : "true"}
                />
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 font-body text-sm px-8 py-4 rounded-full transition-colors duration-200 ${
                    completed
                      ? "border border-grey-light text-muted hover:border-sage-light hover:text-sage-dark"
                      : "bg-sage-dark text-cream hover:bg-charcoal"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {completed ? "Mark as Not Yet Finished" : "Mark Lesson Complete"}
                </button>
              </form>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prev ? (
                <Link
                  href={`/learn/${courseId}/${prev.lesson.id}`}
                  className="group flex-1 border border-grey-light rounded-2xl p-5 hover:border-sage-light transition-colors duration-200"
                >
                  <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted uppercase tracking-widest mb-2">
                    <ArrowLeft size={13} />
                    Previous
                  </span>
                  <span className="block font-body text-sm text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                    {prev.lesson.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link
                  href={`/learn/${courseId}/${next.lesson.id}`}
                  className="group flex-1 border border-grey-light rounded-2xl p-5 text-right hover:border-sage-light transition-colors duration-200"
                >
                  <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted uppercase tracking-widest mb-2">
                    Next
                    <ArrowRight size={13} />
                  </span>
                  <span className="block font-body text-sm text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                    {next.lesson.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/learn/${courseId}/certificate`}
                  className="group flex-1 border border-sage-light bg-sage-pale rounded-2xl p-5 text-right transition-colors duration-200"
                >
                  <span className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark uppercase tracking-widest mb-2">
                    Finish
                    <ArrowRight size={13} />
                  </span>
                  <span className="block font-body text-sm text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                    Your Certificate
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

async function Block({
  block,
  courseId,
  lessonId,
  interactive,
  responses,
  partnerName,
  reactionsByResponse,
  startTime,
  baselineCompare,
}: {
  block: LessonBlock;
  courseId: string;
  lessonId: string;
  interactive: boolean;
  responses: Map<string, ResponseRecord>;
  partnerName: string | null;
  reactionsByResponse: Map<string, ReceivedReaction[]>;
  startTime?: number;
  baselineCompare?: Record<string, number>;
}) {
  switch (block.kind) {
    case "video":
    case "audio": {
      const tokens = await getPlaybackTokens(block.playbackId);
      return (
        <div>
          {block.title && (
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">
              {block.kind === "audio" ? "Audio Practice" : "Watch"} ·{" "}
              {block.title}
            </p>
          )}
          <LessonVideoPlayer
            playbackId={block.playbackId}
            tokens={tokens}
            title={block.title ?? ""}
            courseId={courseId}
            lessonId={lessonId}
            startTime={block.kind === "video" ? startTime : undefined}
            canTrack={interactive && block.kind === "video"}
            audioOnly={block.kind === "audio"}
          />
        </div>
      );
    }

    case "prose":
      return (
        <div>
          {block.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="font-body text-lg text-muted leading-[1.9] mb-6 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote className="text-center py-4">
          <span className="block w-8 h-0.5 bg-sage mx-auto mb-6" aria-hidden="true" />
          <p className="font-heading text-2xl md:text-3xl font-light italic text-sage-dark leading-snug max-w-2xl mx-auto">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="block font-body text-sm text-muted not-italic mt-4">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "journal":
    case "sharedJournal": {
      const saved = responses.get(block.exerciseId);
      return (
        <JournalExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          kind={block.kind}
          title={block.title}
          intro={block.intro}
          prompts={block.prompts}
          saved={
            saved
              ? {
                  responseId: saved.id,
                  answers: saved.data.answers ?? [],
                  isShared: saved.isShared,
                }
              : undefined
          }
          partnerName={block.kind === "sharedJournal" ? partnerName : null}
          interactive={interactive}
          reactions={saved ? (reactionsByResponse.get(saved.id) ?? []) : []}
        />
      );
    }

    case "quiz": {
      const saved = responses.get(block.exerciseId);
      return (
        <QuizExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          questions={block.questions}
          profiles={block.profiles}
          saved={
            saved?.data.selections
              ? { selections: saved.data.selections }
              : undefined
          }
          interactive={interactive}
        />
      );
    }

    case "checkin": {
      const saved = responses.get(block.exerciseId);
      return (
        <CheckinExercise
          courseId={courseId}
          lessonId={lessonId}
          exerciseId={block.exerciseId}
          title={block.title}
          intro={block.intro}
          fields={block.fields}
          cadence={block.cadence}
          saved={
            saved
              ? {
                  scales: saved.data.scales ?? {},
                  texts: saved.data.texts ?? {},
                  choices: saved.data.choices ?? {},
                }
              : undefined
          }
          compare={
            baselineCompare
              ? { label: "When you began", scales: baselineCompare }
              : undefined
          }
          interactive={interactive}
        />
      );
    }

    case "download":
      return (
        <div className="bg-sage-pale rounded-2xl border border-sage-light/50 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <FileDown size={32} className="text-sage-dark shrink-0" strokeWidth={1.5} />
          <div className="flex-1">
            <h3 className="font-body text-lg font-medium text-charcoal mb-1">
              {block.title}
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              {block.description}
            </p>
          </div>
          {interactive ? (
            <a
              href={`/api/downloads/${block.blobPath}`}
              className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 shrink-0"
            >
              {block.fileLabel}
              <FileDown size={15} />
            </a>
          ) : (
            <Link
              href={`/signup?next=${encodeURIComponent(`/learn/${courseId}/${lessonId}`)}`}
              className="inline-flex items-center gap-2 font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-white transition-colors duration-200 shrink-0"
            >
              Sign Up to Download
            </Link>
          )}
        </div>
      );

    default:
      return null;
  }
}
