import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import HomeHero from "@/components/home/HomeHero";
import EthosQuote from "@/components/home/EthosQuote";
import StatsBand from "@/components/home/StatsBand";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import FloatingLeaves from "@/components/FloatingLeaves";
import { helpAreas } from "@/lib/content/helpAreas";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with Esther gave me a safe space to finally understand patterns I had been repeating for years. I feel genuinely different — lighter, clearer.",
    author: "Individual client",
  },
  {
    quote:
      "We came as a couple feeling disconnected and honestly a bit hopeless. Laura helped us really hear each other for the first time in years.",
    author: "Couples client",
  },
  {
    quote:
      "I was nervous about starting therapy but the warmth and non-judgement I experienced from the very first session made all the difference.",
    author: "Individual client",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <EthosQuote />

      <StatsBand />

      {/* Meet the therapists */}
      <section className="py-24 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              About Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Meet Esther &amp; Laura
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {(["Esther", "Laura"] as const).map((name) => (
              <StaggerItem key={name}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-grey-light transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-sage-light group">
                  <div className="overflow-hidden">
                    <PhotoPlaceholder
                      className="w-full h-64 transition-transform duration-700 group-hover:scale-105"
                      src={
                        name === "Esther"
                          ? "/photos/therapist-green-portrait.jpg"
                          : "/photos/therapist-white-armchair.jpg"
                      }
                      alt={`Photo of ${name}`}
                      position={name === "Esther" ? "35% 25%" : "center 25%"}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-heading text-3xl font-medium text-charcoal mb-1">
                      {name}
                    </h3>
                    <p className="font-body text-xs text-sage uppercase tracking-widest mb-4">
                      Therapist &amp; Co-founder
                    </p>
                    <p className="font-body text-sm text-muted leading-relaxed">
                      {name === "Esther"
                        ? "Specialising in trauma, anxiety, self-esteem and relationships. Currently taking tennis lessons when not in session."
                        : "Specialising in couples therapy, depression, attachment and neurodiversity. Recently discovered an obsession with padel."}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-sage-dark border-b border-sage pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors duration-200"
            >
              Read our full story
              <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Areas teaser */}
      <section className="py-24 px-6 bg-sage-pale relative overflow-hidden">
        <Parallax
          speed={0.3}
          className="absolute -top-20 -right-32 w-96 h-96 pointer-events-none"
        >
          <div className="w-full h-full rounded-full bg-sage-light/30 blur-3xl" aria-hidden="true" />
        </Parallax>

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              What We Offer
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4">
              Areas We Can Support You With
            </h2>
            <p className="font-body text-base text-muted max-w-xl mx-auto">
              We offer compassionate support across a wide range of concerns.
              You do not need a diagnosis or a clear sense of what is wrong —
              simply a wish to feel better.
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {helpAreas.slice(0, 4).map((area) => (
              <StaggerItem key={area.id}>
                <div className="bg-white rounded-xl p-6 border border-grey-light h-full transition-all duration-500 hover:border-sage-light hover:shadow-lg hover:-translate-y-1.5">
                  <div className="w-8 h-0.5 bg-sage mb-4" />
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-2 leading-snug">
                    {area.title}
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed">
                    {area.summary}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="text-center">
            <Link
              href="/how-we-can-help"
              className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
            >
              See all areas we support
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              Client Experiences
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              What People Say
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-sage-pale rounded-2xl p-8 border border-sage-light/50 h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1.5">
                  <Quote size={24} className="text-sage mb-4 opacity-60" />
                  <blockquote className="font-heading text-xl font-light italic text-charcoal leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="font-body text-xs text-muted uppercase tracking-widest">
                    {t.author}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 bg-sage relative overflow-hidden">
        <Parallax speed={-0.2} className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full opacity-10" aria-hidden="true">
            <svg viewBox="0 0 800 300" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <ellipse cx="700" cy="150" rx="400" ry="300" fill="#F5F3EF" />
              <ellipse cx="100" cy="200" rx="200" ry="200" fill="#F5F3EF" />
            </svg>
          </div>
        </Parallax>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-cream mb-6">
              Ready to take the first step?
            </h2>
            <p className="font-body text-base text-cream/80 leading-relaxed mb-10 max-w-lg mx-auto">
              We offer a free 15-minute initial consultation so you can find out
              more about how we work and whether we might be a good fit for you.
              There is no pressure and no commitment.
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
