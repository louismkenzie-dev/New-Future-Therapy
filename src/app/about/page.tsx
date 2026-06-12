import type { Metadata } from "next";
import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { ArrowRight, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Esther and Laura — identical twin sisters, therapists, and co-founders of NewFuture Therapy. Read their journey from recruitment to qualified therapists.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-sage-pale pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-4">
            Our Story
          </p>
          <h1 className="font-heading text-5xl md:text-6xl font-light text-charcoal leading-tight">
            Our Journey So Far
          </h1>
        </div>
      </section>

      {/* Main story */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Quote size={36} className="text-sage mb-6 opacity-50" />
              <p className="font-heading text-2xl md:text-3xl font-light italic text-charcoal leading-relaxed mb-8">
                &ldquo;One thing that has remained constant throughout our lives
                is our love of learning.&rdquo;
              </p>

              <div className="space-y-6 font-body text-base text-muted leading-relaxed">
                <p>
                  We are Esther and Laura, identical twin sisters born and
                  raised in Leicester. Now in our 50s, we have shared an
                  incredibly close relationship throughout our lives and have
                  often found ourselves following similar paths, both personally
                  and professionally.
                </p>
                <p>
                  Our first venture together was in recruitment, even then, we
                  were passionate about helping people reach their potential and
                  create positive change in their lives.
                </p>
                <p>
                  After taking career breaks to raise our young families, our
                  interests increasingly turned towards the health, wellbeing
                  and fitness space. We loved supporting people to improve not
                  only their physical health but also their confidence,
                  self-esteem and overall quality of life.
                </p>
                <p>
                  Inspired by this growing passion, we made the decision to
                  retrain once again. Over the next five years we studied,
                  trained and qualified as therapists before continuing our
                  professional development to specialise in trauma, anxiety,
                  depression, attachment, relationships and couples therapy.
                  Today, much of our work focuses on helping individuals and
                  couples build stronger, healthier and more fulfilling
                  relationships.
                </p>
                <p>
                  One thing that has remained constant throughout our lives is
                  our love of learning. We both enjoy challenging ourselves and
                  stepping outside our comfort zones. Esther is currently
                  learning to play tennis while Laura has discovered a passion
                  (more of an obsession) for padel. We believe growth happens
                  when we stay curious, remain open to new experiences and
                  continue learning throughout life.
                </p>
                <p>
                  That same belief sits at the heart of everything we do today.
                  Through NewFuture Therapy, we combine our shared experiences,
                  professional training and passion for helping others to
                  support people in creating healthier relationships, greater
                  self-understanding and meaningful change.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <PhotoPlaceholder
                className="w-full aspect-[3/4] rounded-2xl shadow-sm"
                label="Esther & Laura"
              />
              <div className="bg-sage-pale rounded-xl p-6 border border-sage-light/50">
                <p className="font-body text-sm text-muted leading-relaxed">
                  <span className="font-semibold text-sage-dark">
                    Registered with BACP
                  </span>{" "}
                  &bull; Based in Leicester &bull; Available online
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual bios */}
      <section className="py-20 px-6 bg-sage-pale">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Meet Us Individually
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Esther */}
            <div className="bg-white rounded-2xl overflow-hidden border border-grey-light shadow-sm">
              <PhotoPlaceholder className="w-full h-72" label="Photo of Esther" />
              <div className="p-8">
                <h3 className="font-heading text-4xl font-medium text-charcoal mb-1">
                  Esther
                </h3>
                <p className="font-body text-xs text-sage uppercase tracking-widest mb-5">
                  Therapist &amp; Co-founder
                </p>
                <div className="space-y-3 font-body text-sm text-muted leading-relaxed">
                  <p>
                    Esther works with individuals and couples, specialising in
                    trauma, anxiety, self-esteem and relationship difficulties.
                    She brings warmth, curiosity and a deep commitment to
                    creating a space where clients feel genuinely safe to
                    explore.
                  </p>
                  <p>
                    When she is not in the therapy room, she can be found on the
                    tennis court — learning something new and proving that it is
                    never too late to pick up a racquet.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-grey-light">
                  <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">
                    Specialisms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Trauma", "Anxiety", "Self-Esteem", "Relationships"].map(
                      (s) => (
                        <span
                          key={s}
                          className="font-body text-xs bg-sage-pale text-sage-dark px-3 py-1 rounded-full border border-sage-light/60"
                        >
                          {s}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Laura */}
            <div className="bg-white rounded-2xl overflow-hidden border border-grey-light shadow-sm">
              <PhotoPlaceholder className="w-full h-72" label="Photo of Laura" />
              <div className="p-8">
                <h3 className="font-heading text-4xl font-medium text-charcoal mb-1">
                  Laura
                </h3>
                <p className="font-body text-xs text-sage uppercase tracking-widest mb-5">
                  Therapist &amp; Co-founder
                </p>
                <div className="space-y-3 font-body text-sm text-muted leading-relaxed">
                  <p>
                    Laura works with individuals and couples, with particular
                    expertise in couples therapy, depression, attachment and
                    neurodiversity. She is passionate about helping people
                    understand themselves and one another more fully.
                  </p>
                  <p>
                    Outside of therapy, Laura has recently discovered what she
                    modestly describes as a passion for padel — though those who
                    know her might call it something closer to an obsession.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-grey-light">
                  <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">
                    Specialisms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Couples Therapy",
                      "Depression",
                      "Attachment",
                      "Neurodiversity",
                    ].map((s) => (
                      <span
                        key={s}
                        className="font-body text-xs bg-sage-pale text-sage-dark px-3 py-1 rounded-full border border-sage-light/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-cream border-t border-grey-light">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            Whether you come to Esther or Laura, you will find a warm,
            compassionate and non-judgemental space to begin your journey.
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
