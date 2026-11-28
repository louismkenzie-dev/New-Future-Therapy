import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import ClaimAccessForm from "@/components/testers/ClaimAccessForm";
import FeedbackForm from "@/components/testers/FeedbackForm";
import { isValidTesterKey, testerCap, testerPlacesUsed } from "@/lib/testers";

/* Private, unlisted invitation page for trusted testers. Reached only by
   the secret link Laura and Esther hand out (see the team area's Testers
   tab); any other key is a plain 404. Hidden from search engines and never
   sends its address to other sites. Copy follows the founders' letter. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "A Private Invitation: Growing Together",
  description: "A private invitation from Laura and Esther to try Growing Together, our online relationship programme for couples.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

const AREAS = [
  { title: "Attachment", body: "How our earliest relationships shape the way we connect, and what each of us needs to feel secure." },
  { title: "Communication", body: "Listening and speaking in ways that help you both feel heard, especially when it matters most." },
  { title: "Conflict", body: "Understanding the patterns behind disagreements, and finding your way back to each other." },
  { title: "Intimacy", body: "Emotional and physical closeness, and how to talk openly about what you each need." },
  { title: "Boundaries", body: "Privacy, secrecy and the limits that help a relationship feel safe for everyone in it." },
  { title: "Trust", body: "How trust is built, how it can be repaired, and how to protect it together." },
];

const eyebrow = "font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-4";
const pillPrimary =
  "inline-flex items-center gap-2 min-h-[48px] font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200";
const pillSecondary =
  "inline-flex items-center gap-2 min-h-[48px] font-body text-sm border border-sage text-sage-dark px-8 py-4 rounded-full hover:bg-white transition-colors duration-200";

export default async function ProgrammePreviewPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!(await isValidTesterKey(key))) notFound();

  const [cap, used] = await Promise.all([testerCap(), testerPlacesUsed()]);
  const placesLeft = Math.max(0, cap - used);

  return (
    <>
      {/* Opening band */}
      <section className="relative bg-sage-pale pt-20 pb-20 md:pt-24 md:pb-24 px-6 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sage-light/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-sage-light/30 blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className={eyebrow}>A Private Invitation</p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-charcoal leading-tight">Growing Together</h1>
          <p className="font-body text-lg text-muted leading-relaxed max-w-xl mx-auto mt-6">
            Our new online relationship programme for couples, and an invitation for you and your
            partner to experience it completely free of charge.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <a href="#free-access" className={pillPrimary}>
              Claim Your Free Access <ArrowRight size={16} />
            </a>
            <a href="#collaborate" className={pillSecondary}>
              The Referral Partnership
            </a>
          </div>
        </div>
      </section>

      {/* The letter */}
      <section className="bg-cream py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/photos/twins-laptop.jpg"
                alt="Laura and Esther smiling as they look at the programme on a laptop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={eyebrow}>From Laura &amp; Esther</p>
            <div className="font-body text-lg text-muted leading-[1.9] space-y-5">
              <p>Hello,</p>
              <p>
                We might have mentioned this to you, but over the past six months we have been busy
                developing an online relationship programme for couples.
              </p>
              <p>
                Our programme explores areas including attachment, communication, conflict,
                intimacy, boundaries and trust. It combines educational videos with practical
                activities, reflections and exercises that people can work through at their own pace.
              </p>
              <p>
                As someone whose professional perspective we massively value, we would love your
                honest feedback. We also hope you will find the programme interesting and
                informative, both personally and professionally.
              </p>
            </div>
            <p className="font-heading italic text-2xl text-charcoal mt-8">Laura &amp; Esther</p>
          </Reveal>
        </div>
      </section>

      {/* What it explores */}
      <section className="bg-sage-pale py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <p className={eyebrow}>Inside the Programme</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight">What We Explore Together</h2>
            <p className="font-body text-base text-muted leading-relaxed mt-5">
              Short educational videos, practical activities, private reflections and exercises to
              share with your partner. There is no timetable and no pressure: you move through it at
              whatever pace feels right for you both.
            </p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <StaggerItem key={area.title}>
                <div className="h-full bg-white rounded-2xl border border-grey-light shadow-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-sage-light">
                  <span aria-hidden="true" className="block w-8 h-0.5 bg-sage mb-5" />
                  <h3 className="font-heading text-2xl font-normal text-charcoal mb-3">{area.title}</h3>
                  <p className="font-body text-base text-muted leading-relaxed">{area.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Free access */}
      <section id="free-access" className="bg-cream py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <p className={eyebrow}>Your Free Access</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
              Experience It Together, With Our Compliments
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-8">
              We are pleased to invite you and your partner to experience the programme completely
              free of charge. There is nothing to pay and no card details to give.
            </p>
            <ol className="space-y-5">
              {[
                "Tell us who you are, and add your partner if you would like to take part together.",
                "We will email each of you a private link to choose a password.",
                "Begin whenever you are ready, and share your thoughts with us as you go.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-sage-pale border border-sage-light font-body text-sm text-sage-dark">
                    {i + 1}
                  </span>
                  <span className="font-body text-base text-muted leading-relaxed pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-10">
              {placesLeft > 0 ? (
                <ClaimAccessForm testerKey={key} />
              ) : (
                <div className="text-center py-8">
                  <h3 className="font-heading text-3xl font-light text-charcoal mb-3">All Free Places Have Been Taken</h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    Thank you so much for your interest. Please get in touch with Laura or Esther
                    directly and they will be glad to help.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Referral partnership */}
      <section id="collaborate" className="relative bg-sage-dark py-24 px-6 overflow-hidden scroll-mt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-sage/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-body text-sm text-sage-light uppercase tracking-[0.25em] mb-4">An Opportunity to Collaborate</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-cream leading-tight">A Simple Referral Partnership</h2>
            <p className="font-body text-lg text-cream/85 leading-relaxed mt-5">
              If you enjoy the programme and feel it is something that could genuinely benefit your
              clients or people within your wider network, we would love to explore working together.
            </p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { figure: "10%", label: "Commission for You", body: "On every programme purchased through your referral." },
              {
                figure: "10%",
                label: "Discount for Your Clients",
                body: "On the list price, for your clients or contacts using your own unique referral code.",
              },
            ].map((card) => (
              <StaggerItem key={card.label}>
                <div className="h-full rounded-2xl border border-sage-light/30 bg-white/5 p-8 md:p-10 text-center">
                  <p className="font-heading text-7xl font-light text-cream leading-none">{card.figure}</p>
                  <p className="font-body text-sm text-sage-light uppercase tracking-[0.2em] mt-5 mb-3">{card.label}</p>
                  <p className="font-body text-base text-cream/85 leading-relaxed">{card.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="text-center mt-12">
            <a
              href="#feedback"
              className="inline-flex items-center gap-2 min-h-[48px] font-body text-sm bg-cream text-sage-dark px-8 py-4 rounded-full hover:bg-white transition-colors duration-200"
            >
              Tell Us You Are Interested <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Feedback */}
      <section id="feedback" className="bg-sage-pale py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <Reveal className="lg:col-span-2">
            <p className={eyebrow}>Your Honest Feedback</p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
              Let Us Know Your Thoughts
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-5">
              Your professional perspective is exactly what we need before the programme opens to
              everyone. Share as much or as little as you like, whenever you like. You can come back
              and send more at any point.
            </p>
            <p className="font-body text-base text-muted leading-relaxed">
              If you are interested in the referral partnership, simply tick the box and we will be
              in touch.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 md:p-10">
              <FeedbackForm testerKey={key} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sign-off */}
      <section className="bg-cream py-24 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="font-heading italic text-3xl md:text-4xl font-light text-charcoal leading-snug">
            &ldquo;Let us know your thoughts. We would love to hear from you.&rdquo;
          </p>
          <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mt-8">Laura &amp; Esther · NewFuture Therapy</p>
        </Reveal>
      </section>
    </>
  );
}
