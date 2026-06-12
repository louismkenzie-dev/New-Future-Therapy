"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Logo from "@/components/Logo";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AuthCardProps {
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  footer?: { text: string; linkLabel: string; href: string };
}

export default function AuthCard({
  eyebrow,
  title,
  lede,
  children,
  footer,
}: AuthCardProps) {
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
            {eyebrow}
          </p>
          <h1 className="font-heading text-3xl font-light text-charcoal">
            {title}
          </h1>
          {lede && (
            <p className="font-body text-sm text-muted leading-relaxed mt-4">
              {lede}
            </p>
          )}
        </div>

        {children}

        {footer && (
          <p className="font-body text-sm text-muted text-center mt-8">
            {footer.text}{" "}
            <Link
              href={footer.href}
              className="text-sage-dark underline underline-offset-4 hover:text-charcoal transition-colors duration-200"
            >
              {footer.linkLabel}
            </Link>
          </p>
        )}
      </motion.div>
    </section>
  );
}
