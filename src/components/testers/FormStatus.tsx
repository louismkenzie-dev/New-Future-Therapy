"use client";

import { motion } from "motion/react";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ReactNode } from "react";

export function FormErrorBox({ message }: { message?: string }) {
  return (
    <div role="alert" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle size={18} className="text-red-500 shrink-0" />
      <p className="font-body text-sm text-red-600">{message}</p>
    </div>
  );
}

export function FormSuccessPanel({ title, message, children }: { title: string; message?: string; children?: ReactNode }) {
  return (
    <motion.div
      role="status"
      className="flex flex-col items-start gap-4 p-8 md:p-10 bg-sage-pale rounded-2xl border border-sage-light"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <CheckCircle size={36} className="text-sage-dark" />
      <h3 className="font-heading text-3xl font-light text-charcoal">{title}</h3>
      {message && <p className="font-body text-base text-muted leading-relaxed">{message}</p>}
      {children}
    </motion.div>
  );
}
