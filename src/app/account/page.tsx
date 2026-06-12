import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, LogOut } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ProfileForm from "@/components/account/ProfileForm";
import PartnerCard from "@/components/account/PartnerCard";
import { requireUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { getCoupleState } from "@/lib/dal/couples";
import { signOut } from "@/app/actions/auth";
import { openBillingPortal } from "@/app/actions/billing";
import { courses } from "@/lib/content/courses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false },
};

function planLabel(
  entitlement: Awaited<ReturnType<typeof getEntitlement>>
): string {
  if (!entitlement.active) return "No active plan";
  if (entitlement.source === "complimentary") return "Complimentary access";
  if (entitlement.source === "partner") return "Joint Couples — via your partner";
  return entitlement.plan === "couples" ? "Joint Couples" : "Individual";
}

export default async function AccountPage() {
  const user = await requireUser("/account");
  const [entitlement, couple] = await Promise.all([
    getEntitlement(user.id, user.profile.complimentaryAccess),
    getCoupleState(user.id),
  ]);
  const course = courses[0];

  return (
    <>
      <PageHeader
        eyebrow="Your Account"
        title="My Account"
        lede="Your details, your plan, and how you share with a partner — all in one calm place."
      />

      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Your Details
            </p>
            <h2 className="font-heading text-2xl font-light text-charcoal mb-6">
              Who You Are
            </h2>
            <ProfileForm
              defaultName={user.profile.displayName}
              defaultPronouns={user.profile.pronouns ?? ""}
              email={user.email}
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
                Your Plan
              </p>
              <h2 className="font-heading text-2xl font-light text-charcoal mb-4">
                {planLabel(entitlement)}
              </h2>
              {entitlement.active ? (
                <>
                  {entitlement.currentPeriodEnd && (
                    <p className="font-body text-sm text-muted leading-relaxed mb-2">
                      {entitlement.cancelAtPeriodEnd
                        ? "Your plan is set to end on "
                        : "Your plan renews on "}
                      {new Date(entitlement.currentPeriodEnd).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                      .
                    </p>
                  )}
                  {entitlement.status === "past_due" && (
                    <p className="font-body text-sm text-muted leading-relaxed mb-2">
                      We could not take your last payment — please update your
                      payment details below. Your access continues while we
                      retry.
                    </p>
                  )}
                  {entitlement.source === "partner" && (
                    <p className="font-body text-sm text-muted leading-relaxed mb-2">
                      Your access is covered by your partner&rsquo;s Joint
                      Couples plan.
                    </p>
                  )}
                  {entitlement.source === "own" && (
                    <form action={openBillingPortal} className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
                      >
                        <CreditCard size={16} />
                        Manage Billing
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <>
                  <p className="font-body text-sm text-muted leading-relaxed mb-6">
                    You do not have an active course membership. When you are
                    ready, our course is here — no pressure.
                  </p>
                  <Link
                    href={`/courses/${course.id}#pricing`}
                    className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
                  >
                    Explore the Course
                    <ArrowRight size={16} />
                  </Link>
                </>
              )}
            </div>

            <PartnerCard
              canInvitePartner={entitlement.canInvitePartner}
              couple={
                couple && couple.status !== "unlinked"
                  ? {
                      status: couple.status,
                      isOwner: couple.isOwner,
                      partnerName: couple.partnerName,
                    }
                  : null
              }
            />

            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
              <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
                Signed In
              </p>
              <h2 className="font-heading text-2xl font-light text-charcoal mb-4">
                Your Session
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                You are signed in as {user.email}. Signing out will not affect
                your progress or your saved reflections.
              </p>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 font-body text-sm border border-grey-light text-charcoal px-6 py-3 rounded-full hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
