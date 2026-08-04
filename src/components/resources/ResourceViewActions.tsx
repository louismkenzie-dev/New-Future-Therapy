"use client";

import { Download, Printer } from "lucide-react";

/* Download + print controls for a single resource. Written resources print
   the page itself (print CSS strips the site chrome); uploaded PDFs print
   through the embedded viewer, falling back to a new tab. */

export default function ResourceViewActions({
  slug,
  hasFile,
}: {
  slug: string;
  hasFile: boolean;
}) {
  const downloadHref = hasFile
    ? `/api/resources/${slug}/file?download=1`
    : `/api/resources/${slug}/pdf`;

  const handlePrint = () => {
    if (!hasFile) {
      window.print();
      return;
    }
    const frame = document.getElementById(
      "resource-pdf-frame"
    ) as HTMLIFrameElement | null;
    try {
      frame?.contentWindow?.focus();
      frame?.contentWindow?.print();
    } catch {
      window.open(`/api/resources/${slug}/file`, "_blank", "noopener");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <a
        href={downloadHref}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
      >
        <Download size={15} />
        Download as PDF
      </a>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
      >
        <Printer size={15} />
        Print
      </button>
    </div>
  );
}
