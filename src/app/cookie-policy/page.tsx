import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import CookieSettingsLink from "@/components/CookieSettingsLink";

const description =
  "Which cookies and similar technologies the NewFuture Therapy website uses, what they do, and how you can control them.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | NewFuture Therapy",
    description,
    url: "/cookie-policy",
  },
};

/* Kept deliberately accurate to what the site actually sets — if new
   tracking is ever added, update this table and the consent gating in
   src/lib/consent.ts. */

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

const ESSENTIAL = [
  {
    name: "nf_admin",
    kind: "Cookie",
    purpose:
      "Keeps NewFuture Therapy team members signed in to the private admin area. Set only when a team member signs in; expires after 8 hours.",
  },
  {
    name: "sb-* (Supabase)",
    kind: "Cookies",
    purpose:
      "Keep members signed in to their course account. Set only if you create an account and sign in to our online programmes.",
  },
  {
    name: "nft-cookie-consent",
    kind: "Local storage",
    purpose:
      "Remembers the cookie choice you make in the consent banner, so we do not ask you on every visit.",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cookies & Similar Technologies"
        title="Cookie Policy"
        lede="A plain-English explanation of the small pieces of information this website stores on your device, what each one does, and how you stay in control."
      />

      <article className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Section title="What Cookies Are">
            <p>
              Cookies are small text files placed on your device when you
              visit a website. Alongside cookies, websites can use similar
              technologies such as local storage and session storage. We use
              the word &ldquo;cookies&rdquo; in this policy to cover all of
              these.
            </p>
            <p>
              UK law (the Privacy and Electronic Communications Regulations,
              alongside UK GDPR) allows us to use cookies that are strictly
              necessary for the website to work without asking, and requires
              your consent for anything beyond that. That is exactly how this
              site behaves.
            </p>
          </Section>

          <Section title="Essential Cookies (Always On)">
            <p>
              These are required for the site to function and cannot be
              switched off. None of them are used for advertising or to track
              you across other websites.
            </p>
            <div className="space-y-4">
              {ESSENTIAL.map((c) => (
                <div
                  key={c.name}
                  className="bg-white rounded-2xl border border-grey-light p-6"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <code className="font-body text-sm text-sage-dark bg-sage-pale px-2.5 py-0.5 rounded-full border border-sage-light/60">
                      {c.name}
                    </code>
                    <span className="font-body text-xs text-muted uppercase tracking-widest">
                      {c.kind}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {c.purpose}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Optional Analytics (Only With Your Consent)">
            <div className="bg-white rounded-2xl border border-grey-light p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <code className="font-body text-sm text-sage-dark bg-sage-pale px-2.5 py-0.5 rounded-full border border-sage-light/60">
                  Mux Data
                </code>
                <span className="font-body text-xs text-muted uppercase tracking-widest">
                  Video analytics
                </span>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed">
                When you watch a video on this site (for example, Esther and
                Laura&rsquo;s introduction videos), our video provider Mux can
                collect anonymous playback analytics — such as how much of a
                video is watched, playback quality and general technical
                information — to help us understand which videos are helpful
                and keep them streaming smoothly. This only happens if you
                choose <strong className="text-charcoal">Accept All</strong>{" "}
                in the cookie banner. If you choose{" "}
                <strong className="text-charcoal">Essential Only</strong>,
                videos still play normally, with no analytics attached.
              </p>
            </div>
          </Section>

          <Section title="Changing Your Mind">
            <p>
              You can change your cookie choice at any time — withdrawing
              consent is as easy as giving it. Open{" "}
              <CookieSettingsLink className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200" />{" "}
              (also available in the footer of every page) and pick again.
              You can also clear cookies through your browser settings.
            </p>
          </Section>

          <Section title="More Information">
            <p>
              How we handle personal information more broadly is covered in
              our{" "}
              <Link
                href="/privacy-policy"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                Privacy &amp; Data Protection Policy
              </Link>
              . For independent guidance about cookies and your rights, visit
              the Information Commissioner&rsquo;s Office at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
              >
                ico.org.uk
              </a>
              .
            </p>
          </Section>
        </div>
      </article>
    </>
  );
}
