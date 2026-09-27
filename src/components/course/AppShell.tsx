"use client";

import { useEffect } from "react";

/* Pins the viewport while the member area is mounted: the document itself
   no longer scrolls (no rubber-band, no address-bar jumps on phones); the
   <main> column scrolls instead, between the sticky header and the phone
   tab bar. See the html.member-app rules in globals.css. */
export default function AppShell() {
  useEffect(() => {
    document.documentElement.classList.add("member-app");
    return () => {
      document.documentElement.classList.remove("member-app");
    };
  }, []);
  return null;
}
