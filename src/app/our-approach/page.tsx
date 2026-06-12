import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import FloatingLeaves from "@/components/FloatingLeaves";
import { ArrowRight, Heart, Lightbulb, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "The NewFuture Therapy ethos: a compassionate, curious and connected approach to therapy rooted in understanding.",
};

const principles = [
  {
    icon: Heart,
    title: "Compassion",
    body: "We recognise that people do the best they can with the knowledge, resources and experiences available to them at the time. Rather than focusing on blame or judgement, we approach every person with warmth and genuine care.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    body: "We encourage a deeper understanding of ourselves, our experiences and our patterns of thinking, feeling and behaving. We explore with open minds — never assuming, always asking.",
  },
  {
    icon: Users,
    title: "Connection",
    body: "Meaningful change happens when people feel safe enough to explore their experiences honestly. We create the conditions for that safety — a genuinely non-judgemental, inclusive and connected therapeutic relationship.",
  },
];

export default function OurApproachPage() {
  return (
    <>
      <PageHeader eyebrow="How We Work" title="The NewFuture Therapy Ethos" />

      {/* Opening statement */}
      <section className="bg-sage-dark py-20 px-6 relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <Reveal className="max-w-3xl mx-auto text-center relative z-10">
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-light italic text-cream leading-relaxed">
            &ldquo;At NewFuture Therapy, we believe that growth begins with
            understanding.&rdquo;
          </p>
        </Reveal>
      </section>

      {/* Main ethos content */}
      <section className="py-20 px-6 bg-cream">
        <Reveal className="max-w-3xl mx-auto">
          <div className="space-y-6 font-body text-base md:text-lg text-muted leading-loose">
            <p>
              Every person has a unique story shaped by their experiences,
              relationships, challenges and strengths. These experiences
              influence how we see ourselves, how we relate to others and how
              we navigate the world around us.
            </p>
            <p>
              Our approach is rooted in compassion, curiosity and connection.
              We recognise that people do the best they can with the knowledge,
              resources and experiences available to them at the time. Rather
              than focusing on blame, judgement or finding fault, we encourage
              a deeper understanding of ourselves, our experiences and our
              patterns of thinking, feeling and behaving.
            </p>
            <p>
              We believe that meaningful change happens when people feel safe
              enough to explore their experiences honestly and compassionately.
              Through greater self-awareness we can recognise patterns that no
              longer serve us, build on our strengths, develop healthier ways
              of coping and create more fulfilling relationships with ourselves
              and those around us.
            </p>
            <p>
              Whether you come to Esther or Laura, as an individual or a
              couple, we provide a safe, compassionate and non-judgemental
              space to explore your experiences, deepen understanding and move
              towards a healthier and more connected future.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Three principles */}
      <section className="py-20 px-6 bg-sage-pale">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Our Core Principles
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="bg-white rounded-2xl p-8 border border-grey-light shadow-sm text-center h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-sage-light group">
                  <div className="w-12 h-12 rounded-full bg-sage-pale flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-sage group-hover:scale-110">
                    <Icon size={22} className="text-sage transition-colors duration-500 group-hover:text-cream" />
                  </div>
                  <h3 className="font-heading text-3xl font-medium text-charcoal mb-4">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* What this means in practice */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-8">
              What This Means in Practice
            </h2>
          </Reveal>
          <StaggerGroup className="space-y-5">
            {[
              "Sessions are tailored entirely to you — there is no one-size-fits-all approach.",
              "You set the pace. We will never push you further or faster than feels right for you.",
              "We draw on a range of evidence-informed approaches, including person-centred therapy, attachment theory, CBT and trauma-informed practice.",
              "We work collaboratively with you — therapy is something we do together, not something done to you.",
              "We welcome and affirm people of all backgrounds, identities, relationship structures and lived experiences.",
            ].map((point, i) => (
              <StaggerItem key={i}>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-sage mt-2.5 shrink-0" />
                  <p className="font-body text-base text-muted leading-relaxed">{point}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-light text-charcoal mb-4">
            Ready to explore how we can support you?
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed mb-8">
            Take a look at the areas we work with, or reach out directly to
            arrange your free initial consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/how-we-can-help"
              className="inline-flex items-center justify-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
            >
              How We Can Help
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-body text-sm border border-sage text-sage-dark px-8 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
