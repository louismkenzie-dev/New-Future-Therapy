import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import LessonStepper, { type LessonStep } from "@/components/course/LessonStepper";
import {
  Block,
  stepLabel,
  type ReceivedReaction,
} from "@/components/course/LessonBlockRenderer";
import { moduleLabel } from "@/lib/content/courses";
import { getLessonLive } from "@/lib/content/courses/live";
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
  const entry = await getLessonLive(courseId, lessonId);
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
  const entry = await getLessonLive(courseId, lessonId);
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
      <section className="bg-sage-pale pt-8 pb-7 md:pt-12 md:pb-10 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3 md:mb-4">
            {moduleLabel(module)} · {module.title}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
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

      {/* One snippet at a time */}
      <section className="py-8 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <LessonStepper
            lessonId={lessonId}
            steps={lesson.blocks.map(
              (block, index): LessonStep => ({
                label: stepLabel(block, index),
                node: (
                  <Block
                    key={index}
                    block={block}
                    courseId={courseId}
                    lessonId={lessonId}
                    interactive={interactive}
                    viewer={user ? { id: user.id, name: user.profile.displayName } : null}
                    responses={responses}
                    partner={partner}
                    reactionsByResponse={reactionsByResponse}
                    startTime={progress?.videoPositionSeconds ?? undefined}
                    baselineCompare={baselineCompare}
                  />
                ),
              })
            )}
            finish={
              <div>
                <div className="text-center mb-12">
                  <span className="block w-8 h-0.5 bg-sage mx-auto mb-6" aria-hidden="true" />
                  <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal leading-tight mb-4">
                    {completed ? "Lesson Complete" : "You Have Reached the End of This Lesson"}
                  </h2>
                  <p className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto">
                    {completed
                      ? "Well done. Everything you wrote is saved to your account — come back to it whenever you like."
                      : "Take a breath. When you are ready, mark it complete and carry on — or come back another day. There is no pace to keep."}
                  </p>
                </div>

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
                      className="group flex-1 border border-sage-light bg-sage-pale rounded-2xl p-5 text-right transition-colors duration-200"
                    >
                      <span className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark uppercase tracking-widest mb-2">
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
            }
          />
        </div>
      </section>
    </>
  );
}
