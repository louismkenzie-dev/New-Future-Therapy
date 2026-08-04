import type { MetadataRoute } from "next";
import { helpAreas } from "@/lib/content/helpAreas";
import { sortedArticles } from "@/lib/content/articles";
import { listPublishedResources } from "@/lib/dal/resources";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

/* Public marketing pages only — the course platform and member/auth area are
   kept out of public view (and disallowed in robots.ts) until launch. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/our-approach`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/how-we-can-help`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/counselling-wakefield`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/resources`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const areaPages: MetadataRoute.Sitemap = helpAreas.map((area) => ({
    url: `${SITE_URL}/how-we-can-help/${area.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = sortedArticles().map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(`${a.updated ?? a.published}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /* Resource slugs come from the database; skip them quietly if it is
     unreachable (e.g. building without environment variables). */
  let resourcePages: MetadataRoute.Sitemap = [];
  try {
    resourcePages = (await listPublishedResources()).map((resource) => ({
      url: `${SITE_URL}/resources/${resource.slug}`,
      lastModified: new Date(resource.updatedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    /* ignore */
  }

  return [...staticPages, ...areaPages, ...articlePages, ...resourcePages];
}
