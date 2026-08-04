"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";
import {
  getStoredConsent,
  setStoredConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  type CookieConsent,
} from "@/lib/consent";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* UK GDPR / PECR consent banner. Shown until a choice is made; reopenable via
   the "Cookie Settings" footer link. Non-essential tracking (Mux video
   analytics) only loads after "Accept All". */

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: CookieConsent) => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-4 bottom-4 z-[110] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md print:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          role="region"
          aria-label="Cookie consent"
        >
          <div className="bg-white rounded-2xl border border-grey-light shadow-xl p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-sage-pale border border-sage-light shrink-0">
                <Cookie size={18} strokeWidth={1.5} className="text-sage-dark" />
              </span>
              <div>
                <h2 className="font-heading text-xl font-medium text-charcoal mb-2">
                  A gentle word about cookies
                </h2>
                <p className="font-body text-sm text-muted leading-relaxed">
                  We use essential cookies to keep the site working, and — only
                  with your permission — anonymous video analytics to understand
                  how our videos are watched. You can change your choice at any
                  time via Cookie Settings in the footer. Read more in our{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                type="button"
                onClick={() => choose("all")}
                className="inline-flex items-center justify-center min-h-[44px] font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => choose("essential")}
                className="inline-flex items-center justify-center min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
