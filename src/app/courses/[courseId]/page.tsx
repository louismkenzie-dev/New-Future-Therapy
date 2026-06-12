import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  FileDown,
  Headphones,
  PenLine,
  PlayCircle,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Accordion from "@/components/Accordion";
import FloatingLeaves from "@/components/FloatingLeaves";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import CourseModulesAccordion, {
  type ModuleSummary,
} from "@/components/course/CourseModulesAccordion";
import PricingCards from "@/components/course/PricingCards";
import TrailerPlayer from "@/components/course/TrailerPlayer";
import { courses, getCourse, countLessons } from "@/lib/content/courses";
import { PLAN_INFO } from "@/lib/billing/plans";

const valueAddIcons: Record<string, LucideIcon> = {
  video: Video,
  "pen-line": PenLine,
  users: Users,
  "file-down": FileDown,
  headphones: Headphones,
  award: Award,
};

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) return {};
  return {
    title: `${course.title} — An Online Course`,
    description: course.strapline,
  };
}

export default async function CourseSalesPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const lessonCount = countLessons(course);
  const totalMinutes = course.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
    0
  );
  const previewLesson = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.preview);

  const moduleSummaries: ModuleSummary[] = course.modules.map((m) => ({
    id: m.id,
    number: m.number,
    title: m.title,
    lede: m.lede,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      summary: l.summary,
      estimatedMinutes: l.estimatedMinutes,
      hasVideo: l.blocks.some((b) => b.kind === "video" || b.kind === "audio"),
      hasExercise: l.blocks.some(
        (b) =>
          b.kind === "journal" ||
          b.kind === "sharedJournal" ||
          b.kind === "quiz" ||
          b.kind === "checkin"
      ),
      hasDownload: l.blocks.some((b) => b.kind === "download"),
      preview: l.preview,
    })),
  }));

  return (
    <>
      <PageHeader
        eyebrow="An Online Course from NewFuture Therapy"
        title={course.title}
        lede={course.strapline}
      />

      {/* Introduction */}
      <section className="py-24 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves />
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              About the Course
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-6">
              A Course for Every Kind of Love
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-4">
              {course.description}
            </p>
            <p className="font-body text-base text-muted leading-relaxed">
              {course.audience}
            </p>
            <div className="flex flex-wrap gap-8 mt-8">
              <Stat value={`${course.modules.length}`} label="Modules" />
              <Stat value={`${lessonCount}`} label="Lessons" />
              <Stat
                value={`${Math.round(totalMinutes / 60)}+`}
                label="Hours of guided work"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {course.trailerPlaybackId ? (
              <TrailerPlayer
                playbackId={course.trailerPlaybackId}
                title={`${course.title} — Course Trailer`}
              />
            ) : (
              <div className="rounded-2xl border border-grey-light shadow-sm bg-sage-pale aspect-video flex flex-col items-center justify-center gap-3 text-sage-dark">
                <PlayCircle size={48} strokeWidth={1.5} />
                <p className="font-body text-sm">Course trailer coming soon</p>
              </div>
            )}
            {previewLesson && (
              <p className="font-body text-sm text-muted text-center mt-4">
                Or begin with the free preview lesson —{" "}
                <Link
                  href={`/learn/${course.id}/${previewLesson.id}`}
                  className="text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
                >
                  {previewLesson.title}
                </Link>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* What is included */}
      <section className="py-24 px-6 bg-sage-pale relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              What Is Included
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Everything You Need to Grow
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.valueAdds.map((item) => {
              const Icon = valueAddIcons[item.icon] ?? PenLine;
              return (
                <StaggerItem key={item.title}>
                  <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-sage-light">
                    <Icon size={24} className="text-sage-dark mb-4" />
                    <h3 className="font-body text-xl font-medium text-charcoal mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Module breakdown */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              The Journey
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4">
              Ten Modules, One Path
            </h2>
            <p className="font-body text-base text-muted max-w-xl mx-auto">
              Each module builds on the last — from understanding yourself, to
              communicating and repairing, to designing the relationship you
              want to live in.
            </p>
          </Reveal>
          <CourseModulesAccordion modules={moduleSummaries} />
        </div>
      </section>

      {/* Everyone is welcome */}
      <section className="py-24 px-6 bg-sage-dark relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="font-body text-sm text-sage-light uppercase tracking-[0.25em] mb-6">
              Everyone Is Welcome Here
            </p>
            <p className="font-heading text-3xl md:text-4xl font-light italic text-cream leading-snug">
              Whatever shape your love takes, and whatever season of life you
              are in — this course was written with you in mind.
            </p>
            <p className="font-body text-base text-sage-light leading-relaxed mt-8 max-w-2xl mx-auto">
              We affirm people of all sexual orientations and gender
              identities, and we treat monogamous, non-monogamous and
              polyamorous relationships with equal care throughout. The course
              serves adults of all ages, from early adulthood to later life.
              Inclusion here is not a footnote — it is in every lesson.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-cream scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              Membership
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4">
              Choose Your Plan
            </h2>
            <p className="font-body text-base text-muted max-w-xl mx-auto">
              One subscription, full access to everything — on your own, or
              side by side with a partner.
            </p>
          </Reveal>
          <PricingCards plans={PLAN_INFO} courseId={course.id} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-sage-pale">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              Questions, Answered
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Before You Begin
            </h2>
          </Reveal>
          <Accordion
            items={course.faqs.map((faq, i) => ({
              id: `faq-${i}`,
              title: faq.question,
              summary: "",
              body: faq.answer,
            }))}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-charcoal relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-6">
              Growth Begins With Understanding
            </h2>
            <p className="font-body text-base text-sage-light leading-relaxed mb-10 max-w-xl mx-auto">
              Begin today, at your own pace, with no pressure — and with
              everything you write held privately and securely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-light hover:text-charcoal transition-colors duration-200"
              >
                Choose Your Plan
                <ArrowRight size={16} />
              </Link>
              {previewLesson && (
                <Link
                  href={`/learn/${course.id}/${previewLesson.id}`}
                  className="inline-flex items-center justify-center gap-2 font-body text-sm border border-sage-light text-sage-light px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
                >
                  Try the Free Preview
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-4xl font-light text-sage-dark">{value}</p>
      <p className="font-body text-xs text-muted uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}
