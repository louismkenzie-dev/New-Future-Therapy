import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";

const description =
  "How NewFuture Therapy collects, uses, stores and protects your personal information, in line with UK GDPR and the BACP Ethical Framework.";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy",
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy & Data Protection Policy | NewFuture Therapy",
    description,
    url: "/privacy-policy",
  },
};

/* The policy text is the practice's own legal wording (supplied July 2026,
   including the ICO complaints-handling addition) — do not reword without
   the founders' sign-off. */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mb-12">
      <h2 className="font-heading text-3xl font-light text-charcoal mb-5">
        {title}
      </h2>
      <div className="space-y-4 font-body text-base text-muted leading-[1.8]">
        {children}
      </div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Privacy Matters"
        title="Privacy & Data Protection Policy"
        lede="How we collect, use, store and protect your personal information — in line with UK GDPR and the ethical standards of the BACP."
      />

      <article className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Section title="Who We Are">
            <p>
              NewFuture Therapy provides relationship education,
              psychoeducational resources, online programmes and counselling
              services. For the purpose of UK data protection law, NewFuture
              Therapy is the Data Controller responsible for your personal
              information.
            </p>
          </Section>

          <Section title="Your Privacy and Data Protection">
            <p>
              At NewFuture Therapy we are committed to protecting your privacy
              and handling your personal information responsibly. This Privacy
              Policy explains how we collect, use, store and protect your
              information in line with the General Data Protection Regulation
              (GDPR) and the ethical standards of the British Association for
              Counselling and Psychotherapy (BACP).
            </p>
            <p>
              We will ask you to tick a box to confirm that we have your
              permission to process your information. We will only process
              your information if you tick that box.
            </p>
            <p>
              <strong className="text-charcoal">Couples accounts</strong> —
              some programmes are specifically for couples. Information
              entered by one partner will remain private unless specifically
              shared through platform features designed for educational and
              personal development, or therapeutic purposes. Each partner
              remains responsible for deciding what information they choose to
              share.
            </p>
          </Section>

          <Section title="Data We May Collect">
            <p>We may collect the following information:</p>
            <Bullets
              items={[
                "Your name, address, phone number and email address.",
                "Emergency contact details.",
                "Billing information.",
                "Special category information such as your mental health, gender, gender identity, physical health, your racial or ethnic background, your sexuality or sex life.",
                "Course progress, completion progress, worksheet responses, journal entries, information shared through programme activities, marketing preferences, technical information such as IP address, browser type and website usage data, and feedback.",
                "Session notes, to document key themes for therapeutic purposes.",
                "Any information shared in our sessions that is relevant to the therapeutic process.",
              ]}
            />
          </Section>

          <Section title="Why We Collect Your Data">
            <p>Your personal data is collected for the following purposes:</p>
            <Bullets
              items={[
                "To provide access to appropriate programmes and resources and manage the therapeutic process.",
                "To provide you with counselling services.",
                "To manage your account and process payments.",
                "To respond to enquiries.",
                "To contact you regarding session appointments or cancellations.",
                "To ensure your safety in line with professional safeguarding responsibilities.",
                "For record-keeping required under legal, ethical or professional guidelines.",
              ]}
            />
          </Section>

          <Section title="Data Security">
            <p>
              We use reasonable technical, administrative and organisational
              measures to protect your information from loss, misuse,
              unauthorised access, disclosure or alteration.
            </p>
          </Section>

          <Section title="How Long Your Data Is Kept">
            <p>
              Personal data are kept for a maximum of 7 years after the end of
              therapy, as required by our professional insurance provider and
              the BACP Ethical Framework. After this period, all data will be
              securely destroyed.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>Under GDPR, you have the following rights:</p>
            <Bullets
              items={[
                "To access the data we hold about you.",
                "To request corrections to inaccurate data.",
                "To withdraw your consent to us holding your data at any time (although some legal or ethical requirements may override this in specific circumstances).",
                "To request the deletion of your data (subject to legal and ethical limitations).",
                "To lodge a complaint with the Information Commissioner's Office (ICO) if you feel your data is not being handled properly.",
              ]}
            />
          </Section>

          <Section title="Limits of Confidentiality">
            <p>
              Your personal data and anything discussed in sessions are
              confidential. However, there are legal and ethical circumstances
              in which confidentiality may need to be breached, including:
            </p>
            <Bullets
              items={[
                "If there is a risk of serious harm to you or others.",
                "If there is a legal requirement to disclose information (for example, court orders or safeguarding concerns).",
              ]}
            />
            <p>
              In these cases, we will aim to discuss this with you first,
              unless doing so would increase risk.
            </p>
          </Section>

          <Section title="Marketing Communication">
            <p>
              We will only send marketing communications where you have
              consented or where we have another lawful basis to do so. You
              may unsubscribe at any time.
            </p>
          </Section>

          <Section title="How to Contact Us">
            <p>
              NewFuture Therapy, The Courtyard, 225 Denby Dale Road, Wakefield
              WF2 7AJ. You can also reach us through our{" "}
              <Link
                href="/contact"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                contact page
              </Link>
              .
            </p>
          </Section>

          <Section title="Complaints About the Use of Your Personal Information">
            <p>
              If you have concerns about the use of your personal information,
              in the first instance you must lodge your complaint with
              NewFuture Therapy directly, using the contact methods above.
              Please note that this covers concerns about data handling only,
              not about the therapeutic relationship or professional conduct,
              which are dealt with separately. We will acknowledge your
              concern within 30 days and respond as promptly as possible. If
              you remain dissatisfied, you have the right to lodge a complaint
              with the ICO:
            </p>
            <div className="bg-white rounded-2xl border border-grey-light p-6">
              <p className="text-charcoal font-medium mb-2">
                Information Commissioner&rsquo;s Office
              </p>
              <p>
                Wycliffe House
                <br />
                Water Lane
                <br />
                Wilmslow
                <br />
                Cheshire SK9 5AF
              </p>
              <p className="mt-3">
                Helpline: 0303 123 1113
                <br />
                Website:{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
                >
                  ico.org.uk
                </a>
              </p>
            </div>
          </Section>

          <Reveal>
            <p className="font-body text-sm text-muted border-t border-grey-light pt-6">
              See also our{" "}
              <Link
                href="/cookie-policy"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </article>
    </>
  );
}
