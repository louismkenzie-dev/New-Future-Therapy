/* Single source of truth for membership plans: pricing cards, checkout,
   webhook sync and MRR maths all read from here.

   NOTE: display amounts below are placeholders until the owners confirm
   pricing — they must match the Stripe Prices referenced by the
   STRIPE_PRICE_* environment variables. */

export type PlanKey =
  | "individual_monthly"
  | "individual_annual"
  | "couples_monthly"
  | "couples_annual";

export type PlanName = "individual" | "couples";
export type BillingInterval = "month" | "year";

export interface PlanInfo {
  key: PlanKey;
  plan: PlanName;
  interval: BillingInterval;
  amountPence: number;
  label: string;
}

export const PLAN_INFO: Record<PlanKey, PlanInfo> = {
  individual_monthly: {
    key: "individual_monthly",
    plan: "individual",
    interval: "month",
    amountPence: 2400,
    label: "Individual · Monthly",
  },
  individual_annual: {
    key: "individual_annual",
    plan: "individual",
    interval: "year",
    amountPence: 19_000,
    label: "Individual · Annual",
  },
  couples_monthly: {
    key: "couples_monthly",
    plan: "couples",
    interval: "month",
    amountPence: 3800,
    label: "Joint Couples · Monthly",
  },
  couples_annual: {
    key: "couples_annual",
    plan: "couples",
    interval: "year",
    amountPence: 29_000,
    label: "Joint Couples · Annual",
  },
};

export const PLAN_KEYS = Object.keys(PLAN_INFO) as PlanKey[];

export function isPlanKey(value: string): value is PlanKey {
  return value in PLAN_INFO;
}

export function formatPence(amountPence: number): string {
  const pounds = amountPence / 100;
  return Number.isInteger(pounds) ? `£${pounds}` : `£${pounds.toFixed(2)}`;
}

/* ---- server-side helpers (read env) ---- */

const PRICE_ENV: Record<PlanKey, string | undefined> = {
  individual_monthly: process.env.STRIPE_PRICE_INDIVIDUAL_MONTHLY,
  individual_annual: process.env.STRIPE_PRICE_INDIVIDUAL_ANNUAL,
  couples_monthly: process.env.STRIPE_PRICE_COUPLES_MONTHLY,
  couples_annual: process.env.STRIPE_PRICE_COUPLES_ANNUAL,
};

export function stripePriceIdFor(key: PlanKey): string {
  const id = PRICE_ENV[key];
  if (!id) {
    throw new Error(
      `Stripe price id for ${key} is not configured (STRIPE_PRICE_* env vars)`
    );
  }
  return id;
}

export function planInfoByPriceId(priceId: string): PlanInfo | undefined {
  const key = PLAN_KEYS.find((k) => PRICE_ENV[k] === priceId);
  return key ? PLAN_INFO[key] : undefined;
}
