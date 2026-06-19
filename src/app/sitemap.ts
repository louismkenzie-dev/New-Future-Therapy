import type { MetadataRoute } from "next";
import { helpAreas } from "@/lib/content/helpAreas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

/* Public marketing pages only — the course platform and member/auth area are
   kept out of public view (and disallowed in robots.ts) until launch. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/our-approach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/how-we-can-help`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/brand`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const areaPages: MetadataRoute.Sitemap = helpAreas.map((area) => ({
    url: `${SITE_URL}/how-we-can-help/${area.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...areaPages];
}
