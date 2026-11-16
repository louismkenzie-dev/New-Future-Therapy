/**
 * Branded video thumbnails (Direction A, "Quiet Emblem"), chosen by Laura and
 * Esther in November 2026. Each is a 1920×1080 JPG in public/thumbnails,
 * named by lesson id. A lesson without one falls back to the Mux still.
 */
const LESSONS_WITH_THUMBNAILS = new Set([
  "welcome-to-the-programme",
  "in-the-beginning",
  "building-our-relationship",
  "looking-at-us-today",
  "relationship-check-in",
  "understanding-your-nervous-system",
  "hierarchy-neuroception-co-regulation",
  "regulation-and-reconnection-plan",
  ...Array.from({ length: 8 }, (_, i) => `attachment-part-${i + 1}`),
  ...Array.from({ length: 7 }, (_, i) => `communication-part-${i + 1}`),
]);

/** The poster for a lesson's video, served as AVIF/WebP by the image optimiser. */
export function videoPosterFor(lessonId: string): string | undefined {
  if (!LESSONS_WITH_THUMBNAILS.has(lessonId)) return undefined;
  return `/_next/image?url=${encodeURIComponent(`/thumbnails/${lessonId}.jpg`)}&w=1920&q=75`;
}
