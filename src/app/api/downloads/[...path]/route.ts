import { NextResponse, type NextRequest } from "next/server";
import { head } from "@vercel/blob";
import { getUser } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/dal/entitlement";
import { courses } from "@/lib/content/courses";

/* Entitlement-gated worksheet downloads. Blob URLs never reach the client —
   the file is streamed through here after the membership check, and only
   paths that exist in course content are served. */

function knownDownload(path: string) {
  for (const course of courses) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        for (const block of lesson.blocks) {
          if (block.kind === "download" && block.blobPath === path) {
            return block;
          }
        }
      }
    }
  }
  return undefined;
}

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const { path } = await ctx.params;
  const blobPath = path.join("/");

  const block = knownDownload(blobPath);
  if (!block) return new Response("Not found", { status: 404 });

  const user = await getUser();
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const entitlement = await getEntitlement(
    user.id,
    user.profile.complimentaryAccess
  );
  if (!entitlement.active) {
    const url = request.nextUrl.clone();
    url.pathname = `/courses/${courses[0].id}`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  try {
    const blob = await head(blobPath);
    const file = await fetch(blob.url);
    if (!file.ok || !file.body) throw new Error(`Blob fetch ${file.status}`);

    const filename = blobPath.split("/").pop() ?? "download.pdf";
    return new Response(file.body, {
      headers: {
        "Content-Type": blob.contentType ?? "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new Response(
      "This worksheet is being prepared and will be available soon.",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
}
