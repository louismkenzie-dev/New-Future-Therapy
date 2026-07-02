import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";

const description =
  "The terms and conditions governing NewFuture Therapy's online programmes, courses and digital resources.";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | NewFuture Therapy",
    description,
    url: "/terms",
  },
};

/* The terms text is the practice's own legal wording (supplied July 2026) —
   do not reword without the founders' sign-off. */

const LAST_UPDATED = "2 July 2026";

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

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Online Programmes"
        title="Terms & Conditions"
        lede={`Last updated: ${LAST_UPDATED}. These terms and conditions relate to online programmes only and do not relate to face-to-face, telephone and video call counselling services. A specific contract is applicable to those services.`}
      />

      <article className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-12">
            <p className="font-body text-base text-charcoal leading-[1.8] bg-sage-pale rounded-2xl border border-sage-light/60 p-6">
              Please read these terms carefully before using our website,
              programmes or services. By accessing or using any NewFuture
              Therapy website, programme, course, membership, workshop,
              resource or digital product, you agree to be bound by these
              Terms and Conditions.
            </p>
          </Reveal>

          <Section num={1} title="Who We Are">
            <p>
              NewFuture Therapy provides relationship education,
              psychoeducational programmes, self-development resources,
              workshops and related educational content.
            </p>
            <p>
              Throughout these Terms, &lsquo;we&rsquo;, &lsquo;us&rsquo; and
              &lsquo;our&rsquo; refer to NewFuture Therapy.
              &lsquo;You&rsquo; refers to the individual or couple accessing
              or using our services.
            </p>
          </Section>

          <Section num={2} title="Educational Purpose Only">
            <p>
              NewFuture Therapy programmes are designed for educational and
              personal development purposes.
            </p>
            <p>
              Our courses, worksheets, videos, journals, assessments,
              AI-generated reflections and other resources are not
              counselling, psychotherapy, mental health treatment, medical
              advice, diagnosis or crisis intervention.
            </p>
            <p>
              Participation in a programme does not create a therapist–client
              relationship between you and NewFuture Therapy or any member of
              our team.
            </p>
            <p>
              Information provided within our programmes should not be relied
              upon as a substitute for professional medical, psychological,
              psychiatric, legal or financial advice.
            </p>
          </Section>

          <Section num={3} title="Not Suitable for Crisis Support">
            <p>Our programmes are not monitored as a crisis service.</p>
            <p>
              If you are experiencing thoughts of suicide, self-harm, domestic
              abuse, serious mental health difficulties or are concerned about
              your immediate safety or the safety of another person, you
              should contact emergency services, your GP or an appropriate
              crisis support service immediately.
            </p>
          </Section>

          <Section num={4} title="Eligibility">
            <p>You must be at least 18 years of age to access our programmes.</p>
            <p>
              By using our services, you confirm that you are legally capable
              of entering into a binding agreement.
            </p>
          </Section>

          <Section num={5} title="Account Registration">
            <p>
              You may be required to create an account to access certain
              services.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              login details and for all activity that occurs under your
              account.
            </p>
            <p>
              You agree to provide accurate and up-to-date information when
              creating an account.
            </p>
          </Section>

          <Section num={6} title="Couples Programmes">
            <p>Some programmes may provide separate accounts for partners.</p>
            <p>
              Each participant is responsible for the information they choose
              to share within the platform. Where sharing features are
              available, information will only be visible to a partner if
              specifically shared through those features.
            </p>
            <p>
              NewFuture Therapy cannot guarantee how information disclosed
              between partners will be received, interpreted or used outside
              the platform. Participants remain responsible for maintaining
              respectful communication and personal boundaries throughout
              programme participation.
            </p>
          </Section>

          <Section num={7} title="AI-Generated Content">
            <p>
              Certain programme features may use artificial intelligence to
              provide summaries, reflective questions, learning prompts or
              educational insights.
            </p>
            <p>
              AI-generated responses are intended solely for educational and
              reflective purposes. AI content may occasionally be inaccurate,
              incomplete or unsuitable for your circumstances.
            </p>
            <p>
              Users should exercise their own judgement and should not rely
              upon AI-generated content as professional advice, diagnosis or
              treatment.
            </p>
          </Section>

          <Section num={8} title="Intellectual Property">
            <p>
              All programme materials, videos, worksheets, exercises,
              assessments, journals, graphics, branding, text, downloads and
              educational content remain the intellectual property of
              NewFuture Therapy unless otherwise stated. Materials are
              provided for personal use only.
            </p>
            <p>You may not:</p>
            <Bullets
              items={[
                "Copy, reproduce or distribute programme materials.",
                "Share login details with others.",
                "Upload content to third-party websites.",
                "Sell, sublicense or commercially exploit programme materials.",
                "Modify or create derivative works based on programme content.",
                "Use programme materials for training, teaching, coaching or therapeutic services without written permission.",
              ]}
            />
          </Section>

          <Section num={9} title="Acceptable Use">
            <p>You agree not to:</p>
            <Bullets
              items={[
                "Use the platform unlawfully.",
                "Harass, threaten or abuse other users.",
                "Upload harmful, offensive or discriminatory content.",
                "Attempt to gain unauthorised access to systems or accounts.",
                "Interfere with the operation or security of the platform.",
                "Use the platform in any way that may damage our reputation or services.",
              ]}
            />
            <p>
              We reserve the right to suspend or terminate access where these
              Terms are breached.
            </p>
          </Section>

          <Section num={10} title="Payments">
            <p>
              All prices are displayed in pounds sterling unless otherwise
              stated. Payment must be received before access to paid content
              is granted.
            </p>
            <p>
              We reserve the right to amend pricing at any time. Subscription
              services may automatically renew unless cancelled in accordance
              with the applicable subscription terms.
            </p>
          </Section>

          <Section num={11} title="Refunds">
            <p>
              Refunds are governed by our Refund Policy. Where digital content
              has been accessed, downloaded or consumed, statutory rights may
              be limited once access has been granted.
            </p>
            <p>
              Nothing within these Terms affects your statutory consumer
              rights.
            </p>
          </Section>

          <Section num={12} title="Disclaimer of Warranties">
            <p>
              We make reasonable efforts to ensure programme content is
              accurate and up to date. However, we make no guarantee that:
            </p>
            <Bullets
              items={[
                "The platform will always be available.",
                "Content will be error free.",
                "Results will be achieved through programme participation.",
                "The programme will meet every user's individual needs.",
              ]}
            />
            <p>Services are provided on an &lsquo;as available&rsquo; basis.</p>
          </Section>

          <Section num={13} title="Limitation of Liability">
            <p>
              To the fullest extent permitted by law, NewFuture Therapy shall
              not be liable for any indirect, incidental, consequential or
              special loss arising from the use of our website, programmes or
              services.
            </p>
            <p>
              Nothing in these Terms excludes liability for death or personal
              injury caused by negligence, fraud or any liability that cannot
              legally be excluded.
            </p>
          </Section>

          <Section num={14} title="Privacy">
            <p>
              Your use of our services is also governed by our{" "}
              <Link
                href="/privacy-policy"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                NewFuture Privacy and Data Protection Policy
              </Link>
              . By using our services, you acknowledge that you have read and
              understood our NewFuture Privacy and Data Protection Policy.
            </p>
          </Section>

          <Section num={15} title="Changes to Programmes">
            <p>
              We reserve the right to update, modify, replace or remove
              programme content, features or services where reasonably
              necessary. Such changes may occur without prior notice.
            </p>
          </Section>

          <Section num={16} title="Termination">
            <p>
              We reserve the right to suspend or terminate access to our
              services where:
            </p>
            <Bullets
              items={[
                "These Terms are breached.",
                "Fraudulent activity is suspected.",
                "The safety of users or the platform may be compromised.",
              ]}
            />
            <p>
              Termination does not affect any accrued rights or obligations.
            </p>
          </Section>

          <Section num={17} title="Governing Law">
            <p>
              These Terms and Conditions are governed by the laws of England
              and Wales. Any dispute arising from these Terms shall be subject
              to the exclusive jurisdiction of the courts of England and
              Wales.
            </p>
          </Section>

          <Section num={18} title="Contact">
            <p>
              NewFuture Therapy
              <br />
              Website:{" "}
              <a
                href="https://www.newfuturetherapy.co.uk"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                www.newfuturetherapy.co.uk
              </a>
              <br />
              Address: NewFuture Therapy HQ Wakefield, The Courtyard, 225
              Denby Dale Road, Wakefield WF2 7AJ
            </p>
            <p>
              You can reach us through our{" "}
              <Link
                href="/contact"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                contact page
              </Link>
              .
            </p>
          </Section>
        </div>
      </article>
    </>
  );
}
