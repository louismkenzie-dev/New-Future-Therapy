import { type NextRequest } from "next/server";
import { getPublishedResource } from "@/lib/dal/resources";

/* Serves an uploaded resource PDF from Vercel Blob under a friendly URL.
   ?download=1 switches from inline viewing to a file download. Only
   published resources resolve — the anon client enforces that via RLS. */

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await ctx.params;
  const resource = await getPublishedResource(slug);
  if (!resource?.fileUrl) return new Response("Not found", { status: 404 });

  const file = await fetch(resource.fileUrl);
  if (!file.ok || !file.body) {
    return new Response("This resource is temporarily unavailable.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const download = request.nextUrl.searchParams.get("download") === "1";
  const filename = `${resource.slug}.pdf`;
  return new Response(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
