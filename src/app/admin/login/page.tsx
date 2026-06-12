"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Lock, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { login, type LoginState } from "@/app/actions/admin";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-sage-pale">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl border border-grey-light shadow-sm p-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="text-center mb-8">
          <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
            Admin Area
          </p>
          <h1 className="font-heading text-3xl font-light text-charcoal">
            Team Sign In
          </h1>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block font-body text-xs text-muted uppercase tracking-widest mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-grey-mid"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                className="w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200"
                placeholder="Team password"
              />
            </div>
          </div>

          {state.error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="font-body text-sm text-red-600">{state.error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in…" : "Sign In"}
            {!isPending && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="font-body text-xs text-muted text-center mt-8">
          This area is for the NewFuture Therapy team only. All enquiry data is
          confidential and handled under GDPR.
        </p>
      </motion.div>
    </section>
  );
}
