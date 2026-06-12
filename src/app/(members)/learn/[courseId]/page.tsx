import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Clock, PlayCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getProgressMap } from "@/lib/dal/progress";
import { getCourse } from "@/lib/content/courses";

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
  const course = getCourse(courseId);
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
          {course.modules.map((module, index) => {
            const done = module.lessons.filter(
              (l) => progress.get(l.id)?.status === "completed"
            ).length;
            return (
              <Reveal key={module.id} delay={Math.min(index * 0.05, 0.3)}>
                <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8 flex items-start gap-5">
                    <span className="font-heading text-3xl font-light text-sage shrink-0 w-10 text-center">
                      {module.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span
                        className="block w-8 h-0.5 bg-sage mb-3"
                        aria-hidden="true"
                      />
                      <h2 className="font-heading text-xl md:text-2xl font-medium text-charcoal">
                        {module.title}
                      </h2>
                      <p className="font-body text-sm text-muted mt-2 leading-relaxed">
                        {module.lede}
                      </p>
                      <p className="font-body text-xs text-grey-mid mt-3 uppercase tracking-widest">
                        {done} of {module.lessons.length} lessons complete
                      </p>
                    </div>
                  </div>
                  <ul className="border-t border-grey-light divide-y divide-grey-light">
                    {module.lessons.map((lesson) => {
                      const entry = progress.get(lesson.id);
                      const completed = entry?.status === "completed";
                      const started = entry && !completed;
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/learn/${course.id}/${lesson.id}`}
                            className="px-6 md:px-8 py-4 flex items-center gap-4 group hover:bg-sage-pale/40 transition-colors duration-200"
                          >
                            {completed ? (
                              <CheckCircle2
                                size={18}
                                className="text-sage shrink-0"
                                aria-label="Completed"
                              />
                            ) : started ? (
                              <PlayCircle
                                size={18}
                                className="text-sage-dark shrink-0"
                                aria-label="In progress"
                              />
                            ) : (
                              <Circle
                                size={18}
                                className="text-grey-light shrink-0"
                                aria-label="Not started"
                              />
                            )}
                            <span className="flex-1 font-body text-sm text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                              {lesson.title}
                            </span>
                            <span className="inline-flex items-center gap-1 font-body text-xs text-grey-mid shrink-0">
                              <Clock size={13} />
                              {lesson.estimatedMinutes}m
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
