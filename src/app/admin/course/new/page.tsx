import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { courses, moduleLabel } from "@/lib/content/courses";
import { loadCourse } from "@/lib/content/courses/live";
import NewLessonForm from "@/components/admin/course/NewLessonForm";

export const dynamic = "force-dynamic";
/* The formatter call can take a minute or two. */
export const maxDuration = 300;

export default async function NewLessonPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { module } = await searchParams;
  const course = await loadCourse(courses[0].id, { includeDrafts: true });
  if (!course) redirect("/admin/course");

  const modules = course.modules.map((m) => ({
    id: m.id,
    label: `${moduleLabel(m)} · ${m.title}`,
  }));

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/course"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-sage-dark transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={15} />
          Back to the course
        </Link>
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">Course Editor</p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4">Add a Lesson</h1>
        <p className="font-body text-base text-muted leading-relaxed mb-10 max-w-2xl">
          Upload what you have — a video script, a question sheet, a worksheet — exactly as you
          wrote it. The editor keeps your words and arranges them into short steps: cards, journeys,
          tap-to-answer moments and the individual-then-together reflection. You check it before
          anyone else sees it.
        </p>
        <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
          <NewLessonForm modules={modules} defaultModuleId={module} />
        </div>
      </div>
    </section>
  );
}
