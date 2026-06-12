"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const initialState: ContactFormState = { status: "idle" };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <>
      {/* Page header */}
      <section className="bg-sage-pale pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-sm text-sage uppercase tracking-[0.25em] mb-4">
            Reach Out
          </p>
          <h1 className="font-heading text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="font-body text-base text-muted leading-relaxed max-w-xl mx-auto">
            We offer a free 15-minute initial consultation so you can find out
            more about how we work and whether we might be a good fit for you.
            There is no pressure and no commitment.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info column */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-3xl font-light text-charcoal mb-6">
              What to Expect
            </h2>
            <div className="space-y-6 font-body text-sm text-muted leading-relaxed">
              <div>
                <p className="font-semibold text-charcoal mb-1">Free initial consultation</p>
                <p>
                  A brief 15-minute call to hear a little about what brings you
                  to therapy and to give you the chance to ask any questions.
                </p>
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">No pressure</p>
                <p>
                  There is absolutely no obligation to proceed after an initial
                  consultation. We simply want you to feel informed and at ease.
                </p>
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">Confidential &amp; secure</p>
                <p>
                  Everything you share with us is confidential and handled in
                  line with GDPR and BACP ethical guidelines.
                </p>
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-1">Response time</p>
                <p>
                  We aim to respond to all enquiries within two working days.
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-sage-pale rounded-xl border border-sage-light/50">
              <p className="font-body text-xs text-sage uppercase tracking-widest mb-2">
                Based in
              </p>
              <p className="font-heading text-xl text-charcoal">
                Leicester &amp; Online
              </p>
              <p className="font-body text-sm text-muted mt-2">
                We offer sessions in person and via secure video call, so
                geography is never a barrier to getting support.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            {state.status === "success" ? (
              <div className="flex flex-col items-start gap-4 p-10 bg-sage-pale rounded-2xl border border-sage-light">
                <CheckCircle size={40} className="text-sage" />
                <h3 className="font-heading text-3xl font-light text-charcoal">
                  Message received
                </h3>
                <p className="font-body text-base text-muted leading-relaxed">
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-body text-xs text-muted uppercase tracking-widest mb-2">
                      Name <span className="text-sage">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-xs text-muted uppercase tracking-widest mb-2">
                      Email <span className="text-sage">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block font-body text-xs text-muted uppercase tracking-widest mb-2">
                    Phone <span className="text-grey-mid">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200"
                    placeholder="+44 7700 000000"
                  />
                </div>

                <div>
                  <label htmlFor="referral" className="block font-body text-xs text-muted uppercase tracking-widest mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    id="referral"
                    name="referral"
                    className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200"
                  >
                    <option value="">Please select…</option>
                    <option value="google">Google search</option>
                    <option value="social">Social media</option>
                    <option value="recommendation">Personal recommendation</option>
                    <option value="directory">Therapy directory</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-xs text-muted uppercase tracking-widest mb-2">
                    Message <span className="text-sage">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200 resize-none"
                    placeholder="Tell us a little about what brings you to therapy, or any questions you have…"
                  />
                </div>

                {state.status === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={18} className="text-red-500 shrink-0" />
                    <p className="font-body text-sm text-red-600">{state.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending…" : "Send Message"}
                  {!isPending && <ArrowRight size={16} />}
                </button>

                <p className="font-body text-xs text-muted">
                  By submitting this form you agree to us contacting you in
                  response to your enquiry. Your details will be handled in
                  accordance with our privacy policy and GDPR guidelines.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
