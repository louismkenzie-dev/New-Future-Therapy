import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getProgressMap } from "@/lib/dal/progress";
import ModuleCard from "@/components/course/ModuleCard";
import { loadCourse } from "@/lib/content/courses/live";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Course Overview",
  robots: { index: false },
};

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await loadCourse(courseId);
  if (!course) notFound();

  await requireEntitlement(`/learn/${courseId}`);
  const progress = await getProgressMap(course.id);

  return (
    <>
      <PageHeader
        eyebrow="Course Overview"
        title={course.title}
        lede={course.strapline}
      />

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-4xl mx-auto space-y-8">
          {course.modules.map((module, index) => (
            <Reveal key={module.id} delay={Math.min(index * 0.05, 0.3)}>
              <ModuleCard
                module={module}
                courseId={course.id}
                statusOf={(id) => {
                  const entry = progress.get(id);
                  if (!entry) return undefined;
                  return entry.status === "completed" ? "completed" : "started";
                }}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
