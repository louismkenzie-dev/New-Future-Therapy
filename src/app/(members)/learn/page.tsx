import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, HeartHandshake, Route } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { requireUser } from "@/lib/auth/session";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { syncFromCheckoutSession } from "@/lib/dal/subscriptions";
import { getProgressMap } from "@/lib/dal/progress";
import { courses, flattenLessons } from "@/lib/content/courses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Course",
  robots: { index: false },
};

export default async function LearnDashboard({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; "already-covered"?: string }>;
}) {
  const params = await searchParams;

  // Returning from Stripe Checkout: sync immediately rather than racing the
  // webhook, then clean the URL.
  if (params.session_id) {
    const user = await requireUser("/learn");
    try {
      await syncFromCheckoutSession(params.session_id, user.id);
    } catch (error) {
      console.error("Checkout session sync failed:", error);
    }
    redirect("/learn");
  }

  const { user } = await requireEntitlement("/learn");
  const course = courses[0];
  const progress = await getProgressMap(course.id);
  const flat = flattenLessons(course);

  const completed = flat.filter(
    (f) => progress.get(f.lesson.id)?.status === "completed"
  ).length;
  const nextUp =
    flat.find((f) => progress.get(f.lesson.id)?.status !== "completed") ??
    flat[0];
  const percent = Math.round((completed / flat.length) * 100);
  const firstName = user.profile.displayName.split(" ")[0];

  return (
    <>
      <PageHeader
        eyebrow="Member Home"
        title={`Welcome Back, ${firstName}`}
        lede={
          completed === 0
            ? "Your course is ready whenever you are. There is no pace to keep — begin gently."
            : `You have completed ${completed} of ${flat.length} lessons. Pick up wherever feels right.`
        }
      />

      {params["already-covered"] && (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <p className="font-body text-sm text-sage-dark bg-sage-pale border border-sage-light rounded-lg p-4">
            Good news — your access is already covered, so there was nothing to
            pay. Welcome in.
          </p>
        </div>
      )}

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Continue */}
          <Reveal className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 md:p-10 h-full flex flex-col">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
                {completed === 0 ? "Begin Here" : "Continue Where You Left Off"}
              </p>
              <p className="font-body text-sm text-muted mb-1">
                Module {nextUp.module.number} · {nextUp.module.title}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
                {nextUp.lesson.title}
              </h2>
              <p className="font-body text-base text-muted leading-relaxed mb-8 max-w-xl">
                {nextUp.lesson.summary}
              </p>
              <div className="mt-auto">
                <Link
                  href={`/learn/${course.id}/${nextUp.lesson.id}`}
                  className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
                >
                  {completed === 0 ? "Begin the Course" : "Continue the Course"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Progress */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 h-full flex flex-col">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
                Your Progress
              </p>
              <p className="font-heading text-5xl font-light text-charcoal">
                {percent}%
              </p>
              <p className="font-body text-sm text-muted mt-1 mb-6">
                {completed} of {flat.length} lessons complete
              </p>
              <div
                className="h-2 rounded-full bg-sage-pale overflow-hidden"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-sage rounded-full transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <Link
                href={`/learn/${course.id}`}
                className="inline-flex items-center gap-2 font-body text-sm text-sage-dark mt-auto pt-8 hover:text-charcoal transition-colors duration-200"
              >
                <BookOpen size={16} />
                View all modules
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <Link
              href="/learn/path"
              className="block bg-sage-pale rounded-2xl border border-sage-light/50 p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <Route size={24} className="text-sage-dark mb-4" />
              <h3 className="font-body text-xl font-medium text-charcoal mb-2">
                Your Learning Path
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Your saved notes and the reflections you have gathered along
                the way — including anything your partner has shared that you
                chose to keep.
              </p>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/learn/shared"
              className="block bg-sage-pale rounded-2xl border border-sage-light/50 p-8 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <HeartHandshake size={24} className="text-sage-dark mb-4" />
              <h3 className="font-body text-xl font-medium text-charcoal mb-2">
                Shared With You
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Reflections your partner has chosen to share with you — read
                them gently, respond kindly, and keep what moves you.
              </p>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
