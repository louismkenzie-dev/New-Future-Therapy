"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Small transient confirmation toast, matched to the brand (charcoal pill that
   rises from the bottom centre). Used for copy-to-clipboard and download cues. */
export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 1700);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const toast = (
    <div
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-charcoal px-6 py-3 font-body text-sm text-cream shadow-lg transition-all duration-200 ${
        msg ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {msg}
    </div>
  );

  return { notify, toast };
}
