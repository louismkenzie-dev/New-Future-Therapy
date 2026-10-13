import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { requireUser } from "@/lib/auth/session";
import { hasAcceptedAgreement } from "@/lib/dal/agreement";
import {
  AGREEMENT_CONFIRMATIONS,
  AGREEMENT_SECTIONS,
  AGREEMENT_UPDATED,
} from "@/lib/content/participationAgreement";
import AgreementForm from "@/components/agreement/AgreementForm";
import { safeNext } from "@/lib/safeRedirect";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Participation Agreement",
  robots: { index: false },
};

export default async function AgreementPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await requireUser("/learn/agreement");
  const { next } = await searchParams;
  const accepted = await hasAcceptedAgreement(user.id);

  return (
    <>
      <section className="bg-sage-pale pt-10 pb-8 md:pt-16 md:pb-12 px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-4">
            Before You Begin · Last updated {AGREEMENT_UPDATED}
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight">
            Couples Participation Agreement
          </h1>
          {accepted ? (
            <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark mt-6">
              <CheckCircle2 size={16} />
              You agreed to this on{" "}
              {new Date(accepted).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          ) : (
            <p className="font-body text-base text-muted leading-relaxed mt-6 max-w-xl mx-auto">
              Please read this carefully. Each partner agrees to it separately, in their own
              account, before starting the programme.
            </p>
          )}
        </div>
      </section>

      <section className="py-10 md:py-16 px-5 md:px-6 bg-cream">
        <div className="max-w-3xl mx-auto space-y-10">
          {AGREEMENT_SECTIONS.map((section) => (
            <div key={section.heading}>
              <span className="block w-8 h-0.5 bg-sage mb-4" aria-hidden="true" />
              <h2 className="font-heading text-2xl md:text-3xl font-light text-charcoal leading-tight mb-4">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="font-body text-base text-muted leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5 my-4">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 font-body text-base text-muted leading-relaxed">
                      <span className="mt-3 shrink-0 w-5 h-0.5 bg-sage" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.afterBullets?.map((p) => (
                <p key={p} className="font-body text-base text-muted leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-10">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">Agreement</p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-charcoal leading-tight mb-4">
              By participating, you confirm that:
            </h2>
            <ul className="space-y-2.5 mb-8">
              {AGREEMENT_CONFIRMATIONS.map((c) => (
                <li key={c} className="flex gap-3 font-body text-base text-charcoal leading-relaxed">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-sage" />
                  {c}
                </li>
              ))}
            </ul>
            {accepted ? (
              <p className="font-body text-sm text-muted">
                Thank you — this is already recorded against your account.
              </p>
            ) : (
              <AgreementForm next={safeNext(next, "/learn")} name={user.profile.displayName} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
