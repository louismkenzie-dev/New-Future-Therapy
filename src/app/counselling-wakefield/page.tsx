import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import FloatingLeaves from "@/components/FloatingLeaves";
import { ArrowRight, MessageCircle } from "lucide-react";
import { helpAreas } from "@/lib/content/helpAreas";
import { areaIcons } from "@/lib/areaIcons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

const description =
  "Compassionate counselling and couples therapy in Wakefield and online. Esther and Laura are BACP-registered therapists offering a free 15-minute consultation. Individuals and couples, all ages, LGBTQIA+ affirming.";

export const metadata: Metadata = {
  title: "Counselling in Wakefield & Online",
  description,
  alternates: { canonical: "/counselling-wakefield" },
  openGraph: {
    title: "Counselling in Wakefield & Online | NewFuture Therapy",
    description,
    url: "/counselling-wakefield",
  },
};

const faqs = [
  {
    question: "Where are you based in Wakefield?",
    answer:
      "We offer face-to-face counselling in Wakefield, and we will share the full location details with you when you book. If travelling is difficult, we also offer online sessions wherever you are.",
  },
  {
    question: "Do you offer online counselling?",
    answer:
      "Yes. We offer online therapy across the United Kingdom. For most people it is just as effective as meeting in person, and it can be much easier to fit around work, travel and caring responsibilities.",
  },
  {
    question: "Do I need a GP referral or a diagnosis?",
    answer:
      "No. You can contact us directly. You do not need a referral from your GP or a diagnosis to begin therapy with us.",
  },
  {
    question: "What kinds of counselling do you offer?",
    answer:
      "We work with both individuals and couples across a wide range of concerns, including relationships, anxiety, trauma, depression, self-esteem and life transitions. If you are not sure whether we can help, please do get in touch.",
  },
  {
    question: "How much does counselling cost?",
    answer:
      "We are happy to talk through our fees during your free 15-minute initial consultation, so you have all the information you need before deciding whether to go ahead.",
  },
  {
    question: "How do I book?",
    answer:
      "Start with a free 15-minute initial consultation. Get in touch through our contact page and we will arrange a time that suits you, with no pressure and no commitment.",
  },
];

const steps = [
  {
    title: "A free 15-minute consultation",
    body: "We begin with a relaxed, no-pressure conversation so you can ask questions and get a feel for how we work.",
  },
  {
    title: "Your first session",
    body: "A gentle first meeting, in Wakefield or online, where we get to know you and what you are hoping for. You set the pace.",
  },
  {
    title: "Ongoing support",
    body: "We work together at a rhythm that suits you, checking in regularly about what is helping and what you need.",
  },
];

export default function CounsellingWakefieldPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Counselling and psychotherapy",
      name: "Counselling in Wakefield & Online",
      description,
      provider: {
        "@type": "MedicalBusiness",
        name: "NewFuture Therapy",
        url: SITE_URL,
      },
      areaServed: [
        { "@type": "City", name: "Wakefield" },
        { "@type": "AdministrativeArea", name: "West Yorkshire" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      url: `${SITE_URL}/counselling-wakefield`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Counselling in Wakefield & Online",
          item: `${SITE_URL}/counselling-wakefield`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Wakefield & Online"
        title="Counselling & Therapy in Wakefield"
        lede="Compassionate, non-judgemental counselling for individuals and couples — face to face in Wakefield or online wherever you are. We offer a free 15-minute initial consultation, with no pressure and no commitment."
      />

      {/* Intro */}
      <section className="py-20 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal>
            <p className="font-body text-xl text-charcoal leading-[1.9] mb-6">
              NewFuture Therapy is a Wakefield-based counselling practice founded
              by Esther and Laura, identical twin sisters and qualified
              therapists registered with the British Association for Counselling
              and Psychotherapy (BACP).
            </p>
            <p className="font-body text-lg text-muted leading-[1.9] mb-6">
              We believe growth begins with understanding. Whether you are
              feeling stuck, anxious, low, or simply ready for something to
              change, we offer a warm and confidential space to explore what is
              happening and to move towards a healthier future — at your own
              pace, and without judgement.
            </p>
            <p className="font-body text-lg text-muted leading-[1.9]">
              We welcome adults of all ages, from early adulthood through to
              later life, and people of every background, identity and
              relationship structure. Our practice is actively LGBTQIA+
              affirming. Whoever you are, you are welcome here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we help with */}
      <section className="py-20 px-6 bg-sage-pale">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              How We Can Help
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              What We Support You With
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpAreas.map((area) => {
              const Icon = areaIcons[area.id];
              return (
                <StaggerItem key={area.id}>
                  <Link
                    href={`/how-we-can-help/${area.id}`}
                    className="group flex flex-col h-full bg-white rounded-xl p-6 border border-grey-light transition-all duration-500 hover:border-sage-light hover:shadow-lg hover:-translate-y-1.5"
                  >
                    <span className="w-12 h-12 rounded-full bg-sage-pale border border-sage-light flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-sage group-hover:scale-110">
                      {Icon && (
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-sage-dark transition-colors duration-500 group-hover:text-cream"
                        />
                      )}
                    </span>
                    <h3 className="font-heading text-lg font-medium text-charcoal leading-snug group-hover:text-sage-dark transition-colors duration-300">
                      {area.title}
                    </h3>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              Getting Started
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              How It Works
            </h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="h-full bg-white rounded-2xl p-8 border border-grey-light shadow-sm">
                  <span className="font-heading text-3xl font-light text-sage-dark">
                    0{i + 1}
                  </span>
                  <span className="block w-8 h-0.5 bg-sage my-4" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-sage-pale">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="font-body text-sm text-sage-dark uppercase tracking-[0.25em] mb-3">
              Good to Know
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <Reveal key={faq.question}>
                <div className="bg-white rounded-2xl p-7 border border-grey-light shadow-sm">
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-sage relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <MessageCircle
              size={32}
              strokeWidth={1.5}
              className="text-cream/80 mx-auto mb-6"
            />
            <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-6">
              Take the first step today
            </h2>
            <p className="font-body text-base text-cream/80 leading-relaxed mb-10 max-w-lg mx-auto">
              Book a free 15-minute initial consultation to find out how we work
              and whether we might be a good fit for you — in Wakefield or
              online. There is no pressure and no commitment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-sm bg-cream text-sage-dark px-10 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
