import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Award } from "lucide-react";
import Logo from "@/components/Logo";
import { requireEntitlement } from "@/lib/dal/entitlement";
import { getProgressMap } from "@/lib/dal/progress";
import { getActivePartner } from "@/lib/dal/couples";
import { supabaseAdmin } from "@/lib/supabase";
import { getCourse, countLessons } from "@/lib/content/courses";
import PrintButton from "@/components/course/PrintButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Certificate",
  robots: { index: false },
};

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const { user } = await requireEntitlement(`/learn/${courseId}/certificate`);
  const progress = await getProgressMap(courseId);
  const total = countLessons(course);
  const completed = [...progress.values()].filter(
    (p) => p.status === "completed"
  ).length;
  const finished = completed >= total;

  // If a linked partner has also finished, the certificate carries both names.
  let partnerFinishedName: string | null = null;
  const partner = await getActivePartner(user.id);
  if (finished && partner) {
    const { count } = await supabaseAdmin()
      .from("lesson_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", partner.id)
      .eq("course_id", courseId)
      .eq("status", "completed");
    if ((count ?? 0) >= total) partnerFinishedName = partner.name;
  }

  if (!finished) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-cream">
        <div className="max-w-md text-center">
          <Award size={44} className="text-sage mx-auto mb-6" strokeWidth={1.25} />
          <h1 className="font-heading text-4xl font-light text-charcoal mb-4">
            Nearly There
          </h1>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            You have completed {completed} of {total} lessons. Your certificate
            will be waiting here the moment you finish — at whatever pace is
            right for you.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            Continue the Course
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style
        // Print only the certificate itself — site chrome stays on screen.
        dangerouslySetInnerHTML={{
          __html: `@media print {
            header, footer, nav, .certificate-actions { display: none !important; }
            .certificate-band { padding: 0 !important; background: white !important; }
            .certificate-sheet { border: 1px solid #C4D9C6 !important; box-shadow: none !important; }
          }`,
        }}
      />
      <section className="certificate-band py-20 px-6 bg-sage-pale min-h-[80vh]">
        <div className="max-w-2xl mx-auto">
          <div className="certificate-sheet bg-white rounded-2xl border border-sage-light shadow-sm p-10 md:p-16 text-center">
            <div className="flex justify-center mb-10">
              <Logo />
            </div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.3em] mb-6">
              Certificate of Completion
            </p>
            <span className="block w-10 h-0.5 bg-sage mx-auto mb-10" aria-hidden="true" />

            <p className="font-body text-sm text-muted mb-4">
              This certifies that
            </p>
            <p className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight">
              {user.profile.displayName}
              {partnerFinishedName && (
                <>
                  <span className="block font-heading text-2xl italic text-sage-dark my-2">
                    together with
                  </span>
                  {partnerFinishedName}
                </>
              )}
            </p>

            <p className="font-body text-sm text-muted mt-8 leading-relaxed max-w-md mx-auto">
              has completed all ten modules and {total} lessons of
            </p>
            <p className="font-heading text-2xl font-medium text-sage-dark mt-2">
              {course.title}
            </p>
            <p className="font-heading text-base italic text-muted mt-1">
              A Course in Compassion, Curiosity and Connection
            </p>

            <span className="block w-10 h-0.5 bg-sage mx-auto my-10" aria-hidden="true" />

            <div className="flex justify-center gap-16">
              <div>
                <p className="font-heading text-xl italic text-charcoal">Esther &amp; Laura</p>
                <p className="font-body text-xs text-muted uppercase tracking-widest mt-1">
                  NewFuture Therapy · Registered with BACP
                </p>
              </div>
              <div>
                <p className="font-heading text-xl text-charcoal">{today}</p>
                <p className="font-body text-xs text-muted uppercase tracking-widest mt-1">
                  Date of Completion
                </p>
              </div>
            </div>
          </div>

          <div className="certificate-actions mt-10 text-center space-y-6">
            <PrintButton />
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 text-left">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
                A Thank You, From Us
              </p>
              <p className="font-body text-sm text-muted leading-relaxed">
                As a course graduate, we would like to offer you a discount on
                a first one-to-one session, should you ever want to take this
                work further. Mention the code{" "}
                <span className="font-medium text-sage-dark">GROWING15</span>{" "}
                when you{" "}
                <Link
                  href="/contact"
                  className="text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
                >
                  get in touch
                </Link>
                . And as always, our free fifteen-minute initial consultation
                is open to you — no pressure, ever.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
