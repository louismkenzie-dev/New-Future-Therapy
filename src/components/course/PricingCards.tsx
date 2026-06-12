"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { startCheckout } from "@/app/actions/billing";
import {
  formatPence,
  type PlanInfo,
  type PlanKey,
} from "@/lib/billing/plans";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const individualFeatures = [
  "All ten modules and forty-four lessons",
  "Private, encrypted reflective journalling",
  "Every worksheet, audio practice and download",
  "Your personal learning path",
  "Completion certificate and therapy discount",
];

const couplesFeatures = [
  "Everything in the Individual plan — for both of you",
  "Two linked accounts, each fully private",
  "Share chosen reflections with each other",
  "Respond gently and build a shared learning path",
  "One subscription covers you both",
];

interface PricingCardsProps {
  plans: Record<PlanKey, PlanInfo>;
  courseId: string;
}

export default function PricingCards({ plans, courseId }: PricingCardsProps) {
  const [interval, setInterval] = useState<"month" | "year">("month");

  const individual =
    interval === "month" ? plans.individual_monthly : plans.individual_annual;
  const couples =
    interval === "month" ? plans.couples_monthly : plans.couples_annual;

  const annualSavingIndividual =
    plans.individual_monthly.amountPence * 12 - plans.individual_annual.amountPence;
  const annualSavingCouples =
    plans.couples_monthly.amountPence * 12 - plans.couples_annual.amountPence;

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div
          className="inline-flex rounded-full border border-grey-light bg-white p-1"
          role="group"
          aria-label="Billing interval"
        >
          {(["month", "year"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setInterval(value)}
              aria-pressed={interval === value}
              className={`font-body text-sm px-6 py-2.5 rounded-full transition-colors duration-300 ${
                interval === value
                  ? "bg-sage-dark text-cream"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {value === "month" ? "Monthly" : "Annual"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        <PlanCard
          name="Individual"
          tagline="For your own journey"
          plan={individual}
          interval={interval}
          saving={interval === "year" ? annualSavingIndividual : 0}
          features={individualFeatures}
          courseId={courseId}
          tinted={false}
        />
        <PlanCard
          name="Joint Couples"
          tagline="For partners learning side by side"
          plan={couples}
          interval={interval}
          saving={interval === "year" ? annualSavingCouples : 0}
          features={couplesFeatures}
          courseId={courseId}
          tinted
        />
      </div>

      <p className="font-body text-xs text-muted text-center mt-8 max-w-xl mx-auto leading-relaxed">
        Cancel at any time from your account page — you will keep access until
        the end of the period you have paid for. No pressure, ever.
      </p>
    </div>
  );
}

function PlanCard({
  name,
  tagline,
  plan,
  interval,
  saving,
  features,
  courseId,
  tinted,
}: {
  name: string;
  tagline: string;
  plan: PlanInfo;
  interval: "month" | "year";
  saving: number;
  features: string[];
  courseId: string;
  tinted: boolean;
}) {
  return (
    <motion.div
      className={`rounded-2xl border p-8 md:p-10 flex flex-col shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        tinted
          ? "bg-sage-pale border-sage-light/50"
          : "bg-white border-grey-light"
      }`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      <span className="block w-8 h-0.5 bg-sage mb-4" aria-hidden="true" />
      <h3 className="font-heading text-2xl font-medium text-charcoal">{name}</h3>
      <p className="font-body text-sm text-muted mt-1">{tagline}</p>

      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-heading text-5xl font-light text-charcoal">
          {formatPence(plan.amountPence)}
        </span>
        <span className="font-body text-sm text-muted">
          / {interval === "month" ? "month" : "year"}
        </span>
      </p>
      {saving > 0 && (
        <p className="font-body text-xs text-sage-dark mt-2">
          Save {formatPence(saving)} compared with paying monthly.
        </p>
      )}

      <ul className="mt-8 space-y-3 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={16} className="text-sage mt-1 shrink-0" />
            <span className="font-body text-sm text-muted leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <form action={startCheckout} className="mt-10">
        <input type="hidden" name="planKey" value={plan.key} />
        <input type="hidden" name="courseId" value={courseId} />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200"
        >
          Begin With {name}
          <ArrowRight size={16} />
        </button>
      </form>
    </motion.div>
  );
}
