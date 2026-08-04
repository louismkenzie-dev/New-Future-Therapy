import { getPublishedResource } from "@/lib/dal/resources";
import { renderResourcePdf } from "@/lib/resources/pdf";

/* Generates a branded PDF for written resources so every item in the
   library can be downloaded, whatever form it was created in. Resources
   with an uploaded file are served by the sibling /file route instead. */

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await ctx.params;
  const resource = await getPublishedResource(slug);
  if (!resource || !resource.body) {
    return new Response("Not found", { status: 404 });
  }

  const pdf = await renderResourcePdf(resource);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resource.slug}.pdf"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
