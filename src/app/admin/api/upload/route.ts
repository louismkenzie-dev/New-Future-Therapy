import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/adminAuth";

/* Issues short-lived client-upload tokens so resource PDFs go from the
   admin's browser straight to Vercel Blob, bypassing serverless body limits.
   Lives under /admin so the team session cookie (path=/admin) reaches it. */

const MAX_PDF_BYTES = 30 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["application/pdf"],
        addRandomSuffix: true,
        maximumSizeInBytes: MAX_PDF_BYTES,
      }),
      onUploadCompleted: async () => {
        /* Metadata is saved by the resource form's server action. */
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 400 }
    );
  }
}
