import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ExternalLink, Eye, Sparkles } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { courses, getLesson, moduleLabel } from "@/lib/content/courses";
import { loadCourse } from "@/lib/content/courses/live";
import { getEditorLesson } from "@/lib/dal/courseEditor";
import LessonDetailsForm from "@/components/admin/course/LessonDetailsForm";
import RefineForm from "@/components/admin/course/RefineForm";
import BlocksEditor from "@/components/admin/course/BlocksEditor";
import LessonStatusButtons from "@/components/admin/course/LessonStatusButtons";

export const dynamic = "force-dynamic";
/* The formatter call can take a minute or two. */
export const maxDuration = 300;

export default async function EditLessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { lessonId } = await params;
  const { created } = await searchParams;

  const [lesson, course] = await Promise.all([
    getEditorLesson(lessonId),
    loadCourse(courses[0].id, { includeDrafts: true }),
  ]);
  if (!lesson || !course) notFound();

  const modules = course.modules.map((m) => ({ id: m.id, label: `${moduleLabel(m)} · ${m.title}` }));
  const replacesBuiltIn = Boolean(getLesson(courses[0].id, lessonId));

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/course"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={15} />
          Back to the course
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              {lesson.status === "published" ? "Published" : "Draft · not visible to members"}
              {replacesBuiltIn && " · replaces the built-in lesson"}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">{lesson.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/course/preview/${lesson.id}`}
              target="_blank"
              className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-charcoal px-6 py-3 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
            >
              <Eye size={15} />
              Open Preview
            </Link>
            {lesson.status === "published" && (
              <Link
                href={`/learn/${courses[0].id}/${lesson.id}`}
                target="_blank"
                className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-muted px-6 py-3 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
              >
                <ExternalLink size={15} />
                View Live
              </Link>
            )}
          </div>
        </div>

        {created && (
          <div className="mb-8 flex items-start gap-3 bg-sage-pale border border-sage-light/60 rounded-2xl p-5">
            <Sparkles size={18} className="text-sage-dark shrink-0 mt-0.5" />
            <p className="font-body text-sm text-sage-dark leading-relaxed">
              Your lesson has been formatted and saved as a draft. Have a look at the preview on the
              right, ask for any changes below, and publish when you are happy.
              {lesson.sourceFiles.length > 0 && ` Built from: ${lesson.sourceFiles.join(", ")}.`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 items-start">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">Ask for a Change</p>
              <RefineForm lessonId={lesson.id} />
            </div>

            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">Details</p>
              <LessonDetailsForm lesson={lesson} modules={modules} />
            </div>

            <div>
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">
                Sections · {lesson.blocks.length}
              </p>
              <BlocksEditor key={lesson.updatedAt} lessonId={lesson.id} initialBlocks={lesson.blocks} />
            </div>

            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-8">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">Visibility</p>
              <LessonStatusButtons lessonId={lesson.id} status={lesson.status} replacesBuiltIn={replacesBuiltIn} />
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Preview · as members will see it
            </p>
            <div className="rounded-[28px] border-[6px] border-charcoal bg-charcoal shadow-xl overflow-hidden mx-auto" style={{ width: 400, maxWidth: "100%" }}>
              <iframe
                key={lesson.updatedAt}
                src={`/admin/course/preview/${lesson.id}`}
                title="Lesson preview"
                className="block w-full bg-cream"
                style={{ height: 760 }}
              />
            </div>
            <p className="font-body text-xs text-muted text-center mt-3">
              Updates after each save. Tap through with Continue, just as a member would.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
