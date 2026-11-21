import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { REFUND_POLICY_UPDATED } from "@/lib/legal";

const description =
  "How cancellations and refunds work for NewFuture Therapy's online programmes, including your 14-day cancellation right and our subscriptions.";

export const metadata: Metadata = {
  title: "Refund Policy",
  description,
  alternates: { canonical: "/refund-policy" },
  openGraph: {
    title: "Refund Policy | NewFuture Therapy",
    description,
    url: "/refund-policy",
  },
};

/* The Refund Policy that section 11 of the Terms refers to. Drafted in
   November 2026 to sit alongside the practice's own Terms wording and the
   UK Consumer Contracts Regulations 2013 and Consumer Rights Act 2015 —
   the founders should sign it off before checkout opens. Bump
   REFUND_POLICY_UPDATED (src/lib/legal.ts) whenever the wording changes;
   checkout records it against each purchase. */

const linkClass =
  "text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200";

function Section({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12">
      <h2 className="font-heading text-3xl font-light text-charcoal mb-5">
        <span className="text-sage-dark mr-3">{String(num).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="space-y-4 font-body text-base text-muted leading-[1.8]">
        {children}
      </div>
    </Reveal>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[0.7em] shrink-0 w-6 h-px bg-sage" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Online Programmes"
        title="Refund Policy"
        lede={`Last updated: ${REFUND_POLICY_UPDATED}. This policy covers our online programmes and memberships only. Face-to-face, telephone and video call counselling sessions are covered by their own contract.`}
      />

      <article className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <p className="font-body text-base text-charcoal leading-[1.8] bg-sage-pale rounded-2xl border border-sage-light/60 p-6">
              In short: you can cancel your membership at any time from your
              account page and keep access until the end of the period you
              have paid for. Because our programmes are digital content that
              you can begin straight away, the usual 14-day cancellation
              right ends once your access begins, and we ask you to confirm
              this before you pay. If something we provide is faulty or not
              as described, you are always entitled to a remedy. None of
              this affects your statutory rights.
            </p>
          </Reveal>

          <Section num={1} title="About This Policy">
            <p>
              This Refund Policy forms part of our{" "}
              <Link href="/terms" className={linkClass}>
                Terms &amp; Conditions
              </Link>{" "}
              and explains when you can cancel and when a refund is
              available. Throughout, &lsquo;we&rsquo;, &lsquo;us&rsquo; and
              &lsquo;our&rsquo; refer to NewFuture Therapy, and
              &lsquo;you&rsquo; refers to the person who buys a membership.
            </p>
          </Section>

          <Section num={2} title="Your 14-Day Right to Cancel">
            <p>
              When you buy online in the UK, you normally have 14 days to
              change your mind under the Consumer Contracts (Information,
              Cancellation and Additional Charges) Regulations 2013.
            </p>
            <p>
              Our programmes are digital content. When you choose a plan, we
              ask you to confirm that you would like access to begin
              immediately and that you understand you will lose your right
              to cancel once it does. Your access begins as soon as your
              payment is confirmed, so from that moment the 14-day right to
              cancel no longer applies.
            </p>
            <p>
              We keep a record of your confirmation, and the date of this
              policy, with your purchase, and we repeat it in the order
              confirmation email we send you.
            </p>
          </Section>

          <Section num={3} title="Cancelling Your Membership">
            <p>
              Memberships renew automatically, monthly or annually, until you
              cancel. You can cancel at any time from your{" "}
              <Link href="/account" className={linkClass}>
                account page
              </Link>
              . There is no cancellation fee and no notice period.
            </p>
            <Bullets
              items={[
                "When you cancel, your membership will not renew again.",
                "You keep full access until the end of the period you have already paid for.",
                "We do not refund part of a period that has already begun, including the remainder of an annual plan.",
                "Your journal entries and reflections remain in your account until you ask us to delete them, as described in our Privacy Policy.",
              ]}
            />
          </Section>

          <Section num={4} title="If You Forget to Cancel">
            <p>
              We understand that renewals can be missed. If your membership
              renews and you contact us within 7 days of the renewal date,
              and you have not used the programme since it renewed, we will
              cancel your membership and refund that renewal in full.
            </p>
          </Section>

          <Section num={5} title="Joint Couples Memberships">
            <p>
              A Joint Couples membership is one subscription that covers two
              linked accounts. It is managed, cancelled and refunded through
              the account of the person who paid for it. When it ends, both
              partners lose access to the paid programme at the same time.
              Each partner keeps their own private reflections.
            </p>
          </Section>

          <Section num={6} title="Faulty or Misdescribed Content">
            <p>
              Under the Consumer Rights Act 2015, digital content must be of
              satisfactory quality, fit for purpose and as described. If
              something is not, please tell us. We will first try to put it
              right. If we cannot do that within a reasonable time, you are
              entitled to a price reduction, which may be a full refund of
              the period affected.
            </p>
            <p>
              A refund is not available simply because a programme was not
              the right fit, or did not produce a particular outcome. As our
              Terms explain, our programmes are educational and results
              cannot be guaranteed.
            </p>
          </Section>

          <Section num={7} title="If We End or Change Your Access">
            <Bullets
              items={[
                "If we withdraw a programme you have paid for, we will refund the unused part of your current period.",
                "If we suspend or end your access because our Terms have been breached, no refund is due for the current period.",
                "If the platform is unavailable for an extended time through our fault, please contact us and we will consider a fair refund for that time.",
              ]}
            />
          </Section>

          <Section num={8} title="How to Ask for a Refund">
            <p>
              Please get in touch through our{" "}
              <Link href="/contact" className={linkClass}>
                contact page
              </Link>{" "}
              with the email address on your account and a short note about
              what has happened. We aim to reply within 2 working days.
            </p>
            <p>
              Approved refunds are made to the card or payment method you
              used, within 14 days of our agreeing the refund. Your bank may
              take a few more days to show it.
            </p>
          </Section>

          <Section num={9} title="Your Statutory Rights">
            <p>
              Nothing in this policy affects your statutory consumer rights.
              For independent advice, you can contact{" "}
              <a
                href="https://www.citizensadvice.org.uk/consumer/"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                Citizens Advice
              </a>
              .
            </p>
          </Section>

          <Section num={10} title="Contact">
            <p>
              NewFuture Therapy
              <br />
              Address: NewFuture Therapy HQ Wakefield, The Courtyard, 225
              Denby Dale Road, Wakefield WF2 7AJ
            </p>
          </Section>
        </div>
      </article>
    </>
  );
}
