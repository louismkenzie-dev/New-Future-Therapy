import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

/* Allow the public marketing site; keep the (currently hidden) course
   platform, member area, auth and admin out of search results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/courses",
        "/learn",
        "/account",
        "/login",
        "/signup",
        "/forgot-password",
        "/reset-password",
        "/invite",
        "/auth",
        "/admin",
        "/api",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
