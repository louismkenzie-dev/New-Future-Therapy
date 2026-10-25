import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import LessonFinish from "@/components/course/LessonFinish";
import { isAdmin } from "@/lib/adminAuth";
import { courses, moduleLabel } from "@/lib/content/courses";
import { getLessonLive } from "@/lib/content/courses/live";
import AppShell from "@/components/course/AppShell";
import LessonStepper, { type LessonStep } from "@/components/course/LessonStepper";
import { Block, stepLabel } from "@/components/course/LessonBlockRenderer";
import type { ResponseRecord } from "@/lib/dal/responses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lesson Preview",
  robots: { index: false, follow: false },
};

/* The lesson exactly as a member sees it — same renderer, same stepper —
   but nothing interactive is saved and drafts are included. Opened full
   page it carries a way back to the editor; embedded (?embed=1) in the
   editor's phone frame it does not, since that link would load inside the
   frame. */
export default async function LessonPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { lessonId } = await params;
  const embedded = (await searchParams).embed === "1";
  const editorHref = `/admin/course/${lessonId}`;
  const entry = await getLessonLive(courses[0].id, lessonId, { includeDrafts: true });
  if (!entry) notFound();
  const { lesson, module, course, prev, next } = entry;
  const responses = new Map<string, ResponseRecord>();

  return (
    <>
      <AppShell />
      {embedded ? (
        <div className="bg-charcoal text-cream/80 text-center font-body text-xs uppercase tracking-[0.25em] py-2 px-4">
          Preview · exercises are shown but nothing is saved
        </div>
      ) : (
        <div className="bg-charcoal px-4 py-2">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <Link
              href={editorHref}
              className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm text-sage-light hover:text-cream transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Back to Editor
            </Link>
            <p className="font-body text-xs text-cream/70 uppercase tracking-[0.25em]">
              Preview · nothing is saved
            </p>
          </div>
        </div>
      )}
      <section className="bg-sage-pale pt-8 pb-7 md:pt-12 md:pb-10 px-5 md:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3 md:mb-4">
            {moduleLabel(module)} · {module.title}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
            {lesson.title}
          </h1>
          <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted mt-5">
            <Clock size={15} />
            About {lesson.estimatedMinutes} minutes
          </span>
        </div>
      </section>
      <section className="py-8 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <LessonStepper
            lessonId={`preview-${lesson.id}`}
            steps={lesson.blocks.map(
              (block, index): LessonStep => ({
                label: stepLabel(block, index),
                node: (
                  <Block
                    key={index}
                    block={block}
                    courseId={course.id}
                    lessonId={lesson.id}
                    interactive={false}
                    viewer={null}
                    responses={responses}
                    partner={null}
                    reactionsByResponse={new Map()}
                  />
                ),
              })
            )}
            finish={
              <LessonFinish
                courseId={course.id}
                lessonId={lesson.id}
                module={module}
                prev={prev}
                next={next}
                completed={false}
                interactive={false}
                preview={{ embedded }}
              />
            }
          />
        </div>
      </section>
    </>
  );
}
