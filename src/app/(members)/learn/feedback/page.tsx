import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeedbackForm from "@/components/testers/FeedbackForm";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  robots: { index: false },
};

export default async function MemberFeedbackPage() {
  const user = await requireUser("/learn/feedback");

  return (
    <>
      <PageHeader
        eyebrow="Your Feedback"
        title="Let Us Know Your Thoughts"
        lede="Your honest feedback helps us shape the programme before it opens to everyone. It goes straight to Laura and Esther, and you can send more whenever you like."
      />
      <section className="py-16 md:py-24 px-6 bg-cream">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-10">
          <FeedbackForm defaultName={user.profile.displayName} defaultEmail={user.email} />
        </div>
      </section>
    </>
  );
}
