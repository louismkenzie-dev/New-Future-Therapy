"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { isAppRoute } from "@/lib/memberRoutes";

/* The site footer belongs to the marketing site. Inside the programme it
   would only get in the way, so it is not rendered there. */
export default function SiteFooter() {
  const pathname = usePathname();
  if (isAppRoute(pathname)) return null;
  return <Footer />;
}
