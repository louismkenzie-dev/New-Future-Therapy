"use client";

import { Phone, MessageSquareText, HeartHandshake } from "lucide-react";

/* The approved urgent-support screen (spec §15.3). Fixed content rendered by
   the interface — never model output — so a helpline number can never be
   improvised or paraphrased. Shown when the safety layer detects an
   immediate concern; the conversation does not continue beneath it.
   Contacts are on the practice's periodic signposting review cycle. */

export default function CrisisScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white border border-sage-light rounded-2xl p-8">
      <p className="font-body text-base text-charcoal leading-relaxed mb-6">
        Thank you for telling me. This tool cannot help in an emergency and
        cannot assess risk — support from a person is the right next step, and
        you deserve that support now.
      </p>

      <ul className="space-y-4 mb-6">
        <li className="flex items-start gap-3">
          <Phone size={18} className="text-sage-dark shrink-0 mt-1" />
          <span className="font-body text-sm text-charcoal leading-relaxed">
            <strong>999</strong> — if you or someone else is in immediate
            danger.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone size={18} className="text-sage-dark shrink-0 mt-1" />
          <span className="font-body text-sm text-charcoal leading-relaxed">
            <strong>Samaritans — 116 123</strong> — free, 24 hours a day, every
            day.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone size={18} className="text-sage-dark shrink-0 mt-1" />
          <span className="font-body text-sm text-charcoal leading-relaxed">
            <strong>NHS 111, option 2</strong> — urgent mental-health support.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <MessageSquareText size={18} className="text-sage-dark shrink-0 mt-1" />
          <span className="font-body text-sm text-charcoal leading-relaxed">
            <strong>Shout — text 85258</strong> — free, confidential, 24/7 text
            support.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Phone size={18} className="text-sage-dark shrink-0 mt-1" />
          <span className="font-body text-sm text-charcoal leading-relaxed">
            <strong>National Domestic Abuse Helpline — 0808 2000 247</strong> —
            free, 24 hours, if you are frightened of someone close to you.
          </span>
        </li>
      </ul>

      <p className="font-body text-sm text-muted leading-relaxed mb-8 flex items-start gap-3">
        <HeartHandshake size={18} className="text-sage shrink-0 mt-0.5" />
        If you can, consider reaching out to someone you trust. You are in
        control of what happens next, and you can return to the course whenever
        you feel ready.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
      >
        I am okay to close this for now
      </button>
    </div>
  );
}
