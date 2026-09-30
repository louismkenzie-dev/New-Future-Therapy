import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Clock } from "lucide-react";
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
   but nothing interactive is saved and drafts are included. */
export default async function LessonPreviewPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { lessonId } = await params;
  const entry = await getLessonLive(courses[0].id, lessonId, { includeDrafts: true });
  if (!entry) notFound();
  const { lesson, module, course } = entry;
  const responses = new Map<string, ResponseRecord>();

  return (
    <>
      <AppShell />
      <div className="bg-charcoal text-cream/80 text-center font-body text-xs uppercase tracking-[0.25em] py-2 px-4">
        Preview · exercises are shown but nothing is saved
      </div>
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
              <div className="text-center py-8">
                <span className="block w-8 h-0.5 bg-sage mx-auto mb-6" aria-hidden="true" />
                <h2 className="font-heading text-3xl font-light text-charcoal mb-3">End of Preview</h2>
                <p className="font-body text-sm text-muted">
                  Members see “Mark Lesson Complete” and the next lesson here.
                </p>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
