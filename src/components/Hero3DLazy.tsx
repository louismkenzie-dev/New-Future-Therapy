"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/* Decides whether the WebGL orbs should run BEFORE their code is fetched:
   three.js is about 235 KB compressed, so phones, small screens and
   reduced-motion visitors never download it. */
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

export default function Hero3DLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    if (!reduced && !small) setEnabled(true);
  }, []);

  return enabled ? <Hero3D /> : null;
}
