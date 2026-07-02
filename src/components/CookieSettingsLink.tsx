"use client";

import { openCookieSettings } from "@/lib/consent";

/* Footer link that reopens the cookie consent banner (a PECR requirement:
   consent must be as easy to withdraw as to give). */

export default function CookieSettingsLink({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie Settings
    </button>
  );
}
