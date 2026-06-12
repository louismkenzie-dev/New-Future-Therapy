import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
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
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-cream">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <ellipse cx="500" cy="300" rx="350" ry="400" fill="#C4D9C6" />
            <ellipse cx="400" cy="600" rx="200" ry="250" fill="#6B8C6F" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute bottom-12 left-8 opacity-15 pointer-events-none" aria-hidden="true">
          <svg width="180" height="220" viewBox="0 0 180 220" fill="none">
            <path d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z" fill="#3A5A40" />
            <line x1="90" y1="200" x2="90" y2="20" stroke="#F5F3EF" strokeWidth="1.5" />
            <line x1="90" y1="120" x2="50" y2="80" stroke="#F5F3EF" strokeWidth="1" />
            <line x1="90" y1="140" x2="130" y2="100" stroke="#F5F3EF" strokeWidth="1" />
            <line x1="90" y1="160" x2="55" y2="130" stroke="#F5F3EF" strokeWidth="1" />
            <line x1="90" y1="100" x2="125" y2="70" stroke="#F5F3EF" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-6">
              Wakefield &amp; Online
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-tight mb-8">
              A compassionate space for growth and healing
            </h1>
            <p className="font-body text-base md:text-lg text-muted leading-relaxed mb-10 max-w-lg">
              We are Esther and Laura — twin sisters and qualified therapists
              offering professional, inclusive therapy for individuals and
              couples. We believe meaningful change begins when people feel
              truly safe to explore their experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
              >
                Book a Free Consultation
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 font-body text-sm border border-sage text-sage-dark px-8 py-4 rounded-full hover:bg-sage-pale transition-colors duration-200"
              >
                Meet Esther &amp; Laura
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <PhotoPlaceholder
              className="w-full aspect-[4/5] rounded-2xl shadow-lg"
              src="/photos/twins-laptop.jpg"
              alt="Esther and Laura working together"
              position="center 30%"
            />
          </div>
        </div>
      </section>

      {/* Ethos pull-quote */}
      <section className="bg-sage-dark text-cream py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Quote size={32} className="text-sage-light mx-auto mb-6 opacity-60" />
          <blockquote className="font-heading text-3xl md:text-4xl font-light italic leading-snug mb-6">
            &ldquo;At NewFuture Therapy, we believe that growth begins with
            understanding.&rdquo;
          </blockquote>
          <p className="font-body text-sm text-sage-light tracking-wide uppercase mb-8">
            Our Approach
          </p>
          <Link
            href="/our-approach"
            className="inline-flex items-center gap-2 font-body text-sm border border-sage-light text-sage-light px-6 py-3 rounded-full hover:bg-sage-light hover:text-sage-dark transition-colors duration-200"
          >
            Read our ethos
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Meet the therapists */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              About Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Meet Esther &amp; Laura
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {(["Esther", "Laura"] as const).map((name) => (
              <div
                key={name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-grey-light"
              >
                <PhotoPlaceholder
                  className="w-full h-64"
                  src={
                    name === "Esther"
                      ? "/photos/therapist-green-portrait.jpg"
                      : "/photos/therapist-white-armchair.jpg"
                  }
                  alt={`Photo of ${name}`}
                  position={name === "Esther" ? "35% 25%" : "center 25%"}
                />
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
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-sage-dark border-b border-sage pb-0.5 hover:text-charcoal hover:border-charcoal transition-colors duration-200"
            >
              Read our full story
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Areas teaser */}
      <section className="py-24 px-6 bg-sage-pale">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {helpAreas.slice(0, 4).map((area) => (
              <div
                key={area.id}
                className="bg-white rounded-xl p-6 border border-grey-light hover:border-sage-light hover:shadow-sm transition-all duration-200"
              >
                <div className="w-8 h-0.5 bg-sage mb-4" />
                <h3 className="font-heading text-xl font-medium text-charcoal mb-2 leading-snug">
                  {area.title}
                </h3>
                <p className="font-body text-xs text-muted leading-relaxed">
                  {area.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/how-we-can-help"
              className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
            >
              See all areas we support
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-3">
              Client Experiences
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              What People Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-sage-pale rounded-2xl p-8 border border-sage-light/50">
                <Quote size={24} className="text-sage mb-4 opacity-60" />
                <blockquote className="font-heading text-xl font-light italic text-charcoal leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="font-body text-xs text-muted uppercase tracking-widest">
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 bg-sage relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 800 300" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="700" cy="150" rx="400" ry="300" fill="#F5F3EF" />
            <ellipse cx="100" cy="200" rx="200" ry="200" fill="#F5F3EF" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
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
        </div>
      </section>
    </>
  );
}
