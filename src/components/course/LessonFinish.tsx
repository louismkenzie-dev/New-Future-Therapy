import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, LayoutGrid } from "lucide-react";
import { moduleLabel, type FlatLesson } from "@/lib/content/courses";
import type { CourseModule } from "@/lib/content/courses";
import { completeAndContinue, setLessonComplete } from "@/app/actions/progress";

/* The last step of every lesson. One clear way forward: a single
   "Complete and Continue" that saves progress and opens the next lesson.
   When the next lesson starts a new module, the step becomes a small
   threshold moment — what has been finished, and what comes next — so a
   couple always knows where they are in the programme.

   The editor preview renders the same screen, with links that move
   through the previews and nothing saved. */

export default function LessonFinish({
  courseId,
  lessonId,
  module,
  prev,
  next,
  completed,
  interactive,
  preview,
}: {
  courseId: string;
  lessonId: string;
  module: CourseModule;
  prev?: FlatLesson;
  next?: FlatLesson;
  completed: boolean;
  interactive: boolean;
  /** Editor preview: link between previews, never save. */
  preview?: { embedded: boolean };
}) {
  const crossesModule = Boolean(next && next.module.id !== module.id);
  const isLast = !next;
  const lessonHref = (id: string) =>
    preview ? `/admin/course/preview/${id}${preview.embedded ? "?embed=1" : ""}` : `/learn/${courseId}/${id}`;
  const nextHref = next ? lessonHref(next.lesson.id) : `/learn/${courseId}/certificate`;
  const overviewHref = preview ? "/admin/course" : `/learn/${courseId}`;

  const heading = isLast
    ? "You Have Completed the Programme"
    : crossesModule
      ? `${moduleLabel(module)} Complete`
      : completed
        ? "Lesson Complete"
        : "Well Done";
  const lede = isLast
    ? "Take a moment together to notice how far you have come. Your certificate is ready."
    : crossesModule
      ? "Take a breath before moving on. Everything you wrote is saved, and you can come back to it whenever you like."
      : "Everything you wrote is saved. Carry on when you are ready, or come back another day. There is no pace to keep.";

  const buttonLabel = isLast
    ? "View Your Certificate"
    : crossesModule
      ? `Start ${moduleLabel(next!.module)}`
      : "Continue to the Next Lesson";
  const primaryLabel = completed || !interactive || preview ? buttonLabel : isLast ? "Complete and Finish" : crossesModule ? `Complete and Start ${moduleLabel(next!.module)}` : "Complete and Continue";
  const primaryClass =
    "w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200";

  return (
    <div>
      <div className="text-center mb-8 md:mb-10">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-pale text-sage-dark mb-5">
          {isLast ? <Award size={26} strokeWidth={1.75} /> : <CheckCircle2 size={26} strokeWidth={1.75} />}
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal leading-tight mb-4">{heading}</h2>
        <p className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto">{lede}</p>
      </div>

      {/* What comes next */}
      {next && (
        <div
          className={`rounded-2xl border p-6 md:p-8 mb-8 ${
            crossesModule ? "bg-sage-dark border-sage-dark text-cream" : "bg-white border-grey-light shadow-sm"
          }`}
        >
          <p
            className={`font-body text-xs uppercase tracking-[0.25em] mb-3 ${
              crossesModule ? "text-sage-light" : "text-sage-dark"
            }`}
          >
            Up Next{crossesModule ? ` · ${moduleLabel(next.module)}` : ""}
          </p>
          <p className={`font-heading text-2xl md:text-3xl font-light leading-snug ${crossesModule ? "text-cream" : "text-charcoal"}`}>
            {crossesModule ? next.module.title : next.lesson.title}
          </p>
          {crossesModule ? (
            next.module.lede && (
              <p className="font-body text-sm text-cream/80 leading-relaxed mt-3">{next.module.lede}</p>
            )
          ) : (
            next.lesson.summary && (
              <p className="font-body text-sm text-muted leading-relaxed mt-3">{next.lesson.summary}</p>
            )
          )}
          {crossesModule && (
            <p className="font-body text-sm text-sage-light mt-4">
              Begins with “{next.lesson.title}” · about {next.lesson.estimatedMinutes} minutes
            </p>
          )}
        </div>
      )}

      {/* The one primary action */}
      <div className="flex flex-col items-center gap-4">
        {interactive && !preview && !completed ? (
          <form action={completeAndContinue} className="w-full sm:w-auto">
            <input type="hidden" name="courseId" value={courseId} />
            <input type="hidden" name="lessonId" value={lessonId} />
            <button type="submit" className={primaryClass}>
              {primaryLabel}
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <Link href={nextHref} className={primaryClass}>
            {primaryLabel}
            <ArrowRight size={16} />
          </Link>
        )}

        {preview && (
          <p className="font-body text-xs text-muted text-center">
            Preview: members see this screen, and their progress is saved when they press the button.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          {prev && (
            <Link
              href={lessonHref(prev.lesson.id)}
              className="inline-flex items-center gap-1.5 min-h-[44px] font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              Previous Lesson
            </Link>
          )}
          {!preview?.embedded && (
          <Link
            href={overviewHref}
            className="inline-flex items-center gap-1.5 min-h-[44px] font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200"
          >
            <LayoutGrid size={14} />
            {preview ? "Course Editor" : "All Modules"}
          </Link>
          )}
          {interactive && !preview && completed && (
            <form action={setLessonComplete}>
              <input type="hidden" name="courseId" value={courseId} />
              <input type="hidden" name="lessonId" value={lessonId} />
              <input type="hidden" name="completed" value="false" />
              <button
                type="submit"
                className="inline-flex items-center min-h-[44px] font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200"
              >
                Mark as Not Yet Finished
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
