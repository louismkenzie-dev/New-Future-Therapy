import "server-only";

/* Pulls plain text out of what the therapists upload: Word documents, PDFs,
   and plain text or Markdown. Text is what the formatter reads; the original
   file is not kept. */

const MAX_CHARS = 120_000;

export interface ExtractedFile {
  name: string;
  text: string;
}

export async function extractText(file: File): Promise<ExtractedFile> {
  const name = file.name || "upload";
  const lower = name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  let text = "";
  if (lower.endsWith(".docx") || file.type.includes("wordprocessingml")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else if (lower.endsWith(".pdf") || file.type === "application/pdf") {
    const { extractText: pdfText } = await import("unpdf");
    const result = await pdfText(new Uint8Array(buffer), { mergePages: true });
    text = Array.isArray(result.text) ? result.text.join("\n\n") : result.text;
  } else if (
    lower.endsWith(".txt") ||
    lower.endsWith(".md") ||
    lower.endsWith(".markdown") ||
    file.type.startsWith("text/")
  ) {
    text = buffer.toString("utf8");
  } else {
    throw new Error(
      `“${name}” is not a file type the editor can read. Please upload a Word document (.docx), a PDF, or plain text.`
    );
  }

  text = text.replace(/\r\n?/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text) throw new Error(`“${name}” appears to be empty, or is a scanned image without selectable text.`);
  return { name, text: text.slice(0, MAX_CHARS) };
}
