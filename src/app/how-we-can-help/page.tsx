import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import AreaGrid from "@/components/areas/AreaGrid";
import FloatingLeaves from "@/components/FloatingLeaves";
import { ArrowRight } from "lucide-react";

const description =
  "Explore the wide range of concerns we support at NewFuture Therapy, including relationships, anxiety, trauma, self-esteem, depression, and more.";

export const metadata: Metadata = {
  title: "How We Can Help",
  description,
  alternates: { canonical: "/how-we-can-help" },
  openGraph: {
    title: "How We Can Help | NewFuture Therapy",
    description,
    url: "/how-we-can-help",
  },
};

export default function HowWeCanHelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Offer"
        title="Areas We Can Support You With"
        lede="You do not need a diagnosis or all the answers before reaching out. Sometimes simply recognising that something does not feel quite right is enough to begin."
      />

      {/* Icon grid launcher */}
      <section className="py-20 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <AreaGrid />
        </div>
      </section>

      {/* Not sure section */}
      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
            Not sure if we can help?
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            If what you are experiencing does not seem to fit any of these
            areas, please do get in touch. We are happy to have a brief
            conversation to help you decide whether therapy with us might be
            right for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
