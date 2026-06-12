import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import { helpAreas } from "@/lib/content/helpAreas";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Can Help",
  description:
    "Explore the wide range of concerns we support at NewFuture Therapy, including relationships, anxiety, trauma, self-esteem, depression, and more.",
};

export default function HowWeCanHelpPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-sage-pale pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-4">
            What We Offer
          </p>
          <h1 className="font-heading text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
            Areas We Can Support You With
          </h1>
          <p className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto">
            You do not need a diagnosis or a clear sense of what is wrong —
            simply a wish to feel better and a willingness to explore. Click
            any area below to find out more.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Accordion items={helpAreas} />
        </div>
      </section>

      {/* Not sure section */}
      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
            Not sure if we can help?
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            If you are unsure whether what you are experiencing fits any of the
            areas above, please do get in touch. We are happy to have a brief
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
        </div>
      </section>
    </>
  );
}
