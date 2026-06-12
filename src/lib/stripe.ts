import "server-only";
import Stripe from "stripe";

let singleton: Stripe | null = null;

export function stripe(): Stripe {
  if (!singleton) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    singleton = new Stripe(key);
  }
  return singleton;
}
