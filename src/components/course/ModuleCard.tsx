import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, Circle, Clock, Play, PlayCircle } from "lucide-react";
import ModuleEmblem from "@/components/course/ModuleEmblem";
import { moduleLabel } from "@/lib/content/courses";
import { lessonThumbnailSrc } from "@/lib/content/courses/thumbnails";
import type { CourseModule } from "@/lib/content/courses/types";

export type LessonStatus = "completed" | "started" | undefined;

interface ModuleCardProps {
  module: CourseModule;
  courseId: string;
  statusOf: (lessonId: string) => LessonStatus;
  /** Show each lesson's video thumbnail in front of its title. */
  lessonThumbnails?: boolean;
}

/* A module on the Course Overview: its emblem, title and progress, then the
   list of lessons. */
export default function ModuleCard({
  module,
  courseId,
  statusOf,
  lessonThumbnails = false,
}: ModuleCardProps) {
  const done = module.lessons.filter((l) => statusOf(l.id) === "completed").length;

  return (
    <div
      id={module.id}
      className="scroll-mt-28 bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden"
    >
      {/* Phones: emblem beside the title, description full width below.
          Wider screens: emblem in its own column beside everything. */}
      <div className="p-6 md:p-8 grid grid-cols-[auto_1fr] items-center md:items-start gap-x-4 md:gap-x-6">
        <span className="flex md:row-span-2">
          <ModuleEmblem moduleId={module.id} />
        </span>
        <div className="min-w-0 md:pt-1">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-1.5">
            {moduleLabel(module)}
          </p>
          <h2 className="font-heading text-xl md:text-2xl font-medium text-charcoal">
            {module.title}
          </h2>
        </div>
        <div className="col-span-2 md:col-span-1 md:col-start-2 min-w-0">
          <p className="font-body text-sm text-muted mt-3 md:mt-2 leading-relaxed">
            {module.lede}
          </p>
          <p className="font-body text-xs text-grey-mid mt-3 uppercase tracking-widest">
            {done} of {module.lessons.length} lessons complete
          </p>
        </div>
      </div>
      <ul className="border-t border-grey-light divide-y divide-grey-light">
        {module.lessons.map((lesson) => {
          const status = statusOf(lesson.id);
          const href = `/learn/${courseId}/${lesson.id}`;
          if (!lessonThumbnails) {
            return (
              <li key={lesson.id}>
                <Link
                  href={href}
                  className="px-6 md:px-8 py-4 flex items-center gap-4 group hover:bg-sage-pale/40 transition-colors duration-200"
                >
                  {status === "completed" ? (
                    <CheckCircle2 size={18} className="text-sage shrink-0" aria-label="Completed" />
                  ) : status === "started" ? (
                    <PlayCircle size={18} className="text-sage-dark shrink-0" aria-label="In progress" />
                  ) : (
                    <Circle size={18} className="text-grey-light shrink-0" aria-label="Not started" />
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
          }

          const thumb = lessonThumbnailSrc(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={href}
                className="px-6 md:px-8 py-3.5 flex items-center gap-4 md:gap-5 group hover:bg-sage-pale/40 transition-colors duration-200"
              >
                <span className="relative shrink-0 w-24 md:w-32 aspect-video rounded-lg overflow-hidden border border-grey-light bg-sage-pale">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt=""
                      width={256}
                      height={144}
                      sizes="(min-width: 768px) 128px, 96px"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-sage/40">
                      <Play size={20} strokeWidth={1.5} />
                    </span>
                  )}
                  {status === "completed" && (
                    <span className="absolute bottom-1 right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sage-dark text-cream shadow-sm">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-body text-sm text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                    {lesson.title}
                  </span>
                  <span className="mt-1 flex items-center gap-3 font-body text-xs text-grey-mid">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} />
                      {lesson.estimatedMinutes}m
                    </span>
                    {status === "completed" ? (
                      <span className="text-sage-dark">Completed</span>
                    ) : status === "started" ? (
                      <span className="text-sage-dark">In progress</span>
                    ) : (
                      <span className="sr-only">Not started</span>
                    )}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
