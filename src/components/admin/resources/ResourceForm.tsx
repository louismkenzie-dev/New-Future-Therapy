"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import {
  FileUp,
  PenLine,
  AlertCircle,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { saveResource } from "@/app/actions/resources";
import type { Resource, ResourceCategory } from "@/lib/dal/resources";

/* Create/edit form for a library resource. PDFs upload from the browser
   straight to blob storage (via /admin/api/upload) before the metadata is
   saved, so large worksheets never pass through a server action. */

const inputClass =
  "w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage placeholder:text-muted/70";
const labelClass =
  "block font-body text-xs text-charcoal uppercase tracking-widest mb-2";

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function ResourceForm({
  resource,
  folders,
}: {
  resource: Resource | null;
  folders: ResourceCategory[];
}) {
  const [mode, setMode] = useState<"upload" | "write">(
    resource?.body && !resource.fileUrl ? "write" : "upload"
  );
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const busy = uploading || pending;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("contentMode", mode);

    if (mode === "upload") {
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        if (file.type !== "application/pdf") {
          setError("Please choose a PDF file.");
          return;
        }
        setUploading(true);
        try {
          const blob = await upload(`resources/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/admin/api/upload",
          });
          data.set("fileUrl", blob.url);
          data.set("filePath", blob.pathname);
          data.set("fileName", file.name);
          data.set("fileSize", String(file.size));
        } catch {
          setUploading(false);
          setError(
            "The upload did not complete. Please check your connection and try again."
          );
          return;
        }
        setUploading(false);
      } else if (resource?.fileUrl) {
        // No new file chosen — keep the existing one.
        data.set("fileUrl", resource.fileUrl);
        data.set("filePath", resource.filePath ?? "");
        data.set("fileName", resource.fileName ?? "");
        data.set("fileSize", String(resource.fileSize ?? ""));
      }
    }

    startTransition(async () => {
      const result = await saveResource(data);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {resource && <input type="hidden" name="id" value={resource.id} />}

      {/* Title & type */}
      <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8 space-y-6">
        <div>
          <label htmlFor="resource-title" className={labelClass}>
            Title <span className="text-sage">*</span>
          </label>
          <input
            id="resource-title"
            name="title"
            type="text"
            required
            defaultValue={resource?.title ?? ""}
            placeholder="e.g. Grounding Techniques for Anxious Moments"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="resource-description" className={labelClass}>
            Short Description <span className="text-sage">*</span>
          </label>
          <textarea
            id="resource-description"
            name="description"
            required
            rows={3}
            defaultValue={resource?.description ?? ""}
            placeholder="One or two sentences shown beneath the resource in the library."
            className={inputClass}
          />
        </div>

        <div>
          <span className={labelClass}>Resource Type</span>
          <div className="flex flex-wrap gap-3">
            {(
              [
                ["worksheet", "Worksheet"],
                ["factsheet", "Factsheet"],
                ["article", "Article"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="inline-flex items-center gap-2 font-body text-sm text-charcoal bg-cream border border-grey-light rounded-full px-4 py-2 cursor-pointer has-checked:bg-sage-pale has-checked:border-sage has-checked:text-sage-dark transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="resourceType"
                  value={value}
                  defaultChecked={
                    (resource?.resourceType ?? "worksheet") === value
                  }
                  className="accent-[#3A5A40]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Content: upload or write */}
      <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
        <span className={labelClass}>Content</span>
        <div className="inline-flex rounded-full border border-grey-light bg-cream p-1 mb-6">
          {(
            [
              ["upload", "Upload a PDF", FileUp],
              ["write", "Write it Here", PenLine],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`inline-flex items-center gap-2 font-body text-sm px-5 py-2 rounded-full transition-colors duration-300 ${
                mode === value
                  ? "bg-sage-dark text-cream"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {mode === "upload" ? (
          <div className="space-y-4">
            {resource?.fileUrl && (
              <p className="inline-flex items-center gap-2 font-body text-sm text-sage-dark bg-sage-pale border border-sage-light/60 rounded-full px-4 py-2">
                <FileText size={15} />
                Current file: {resource.fileName ?? "uploaded PDF"}
                {resource.fileSize ? ` (${formatSize(resource.fileSize)})` : ""}
              </p>
            )}
            <div>
              <label htmlFor="resource-file" className={labelClass}>
                {resource?.fileUrl ? "Replace PDF (Optional)" : "PDF File"}
                {!resource?.fileUrl && <span className="text-sage"> *</span>}
              </label>
              <input
                id="resource-file"
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="block w-full font-body text-sm text-muted file:mr-4 file:font-body file:text-sm file:bg-sage-pale file:text-sage-dark file:border file:border-sage-light file:rounded-full file:px-5 file:py-2.5 file:cursor-pointer hover:file:bg-sage-light/50 file:transition-colors file:duration-200"
              />
              <p className="font-body text-xs text-muted mt-2">
                PDF only, up to 30 MB. Uploading a new file replaces the
                current one everywhere it appears.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="resource-body" className={labelClass}>
              Resource Content <span className="text-sage">*</span>
            </label>
            <textarea
              id="resource-body"
              name="body"
              rows={16}
              defaultValue={resource?.body ?? ""}
              placeholder={
                "Write or paste the content here.\n\nLeave a blank line between paragraphs.\nStart a line with ## for a section heading.\nStart lines with - for bullet points."
              }
              className={`${inputClass} leading-relaxed`}
            />
            <p className="font-body text-xs text-muted mt-2">
              Blank line = new paragraph &middot; &ldquo;## &rdquo; starts a
              heading &middot; &ldquo;- &rdquo; starts a bullet point. Clients
              can read this online, download it as a styled PDF, or print it.
            </p>
          </div>
        )}
      </div>

      {/* Folders */}
      <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
        <span className={labelClass}>Folders</span>
        <p className="font-body text-sm text-muted mb-5">
          Choose every folder this resource belongs in — it can appear in more
          than one.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {folders.map((folder) => (
            <label
              key={folder.id}
              className="inline-flex items-center gap-3 font-body text-sm text-charcoal bg-cream border border-grey-light rounded-xl px-4 py-2.5 cursor-pointer has-checked:bg-sage-pale has-checked:border-sage has-checked:text-sage-dark transition-colors duration-200"
            >
              <input
                type="checkbox"
                name="categories"
                value={folder.id}
                defaultChecked={resource?.categoryIds.includes(folder.id)}
                className="accent-[#3A5A40]"
              />
              {folder.name}
            </label>
          ))}
        </div>
      </div>

      {/* Publish + actions */}
      <div className="bg-white rounded-2xl border border-grey-light shadow-sm p-8">
        <label className="inline-flex items-center gap-3 font-body text-sm text-charcoal cursor-pointer">
          <input
            type="checkbox"
            name="published"
            defaultChecked={resource?.published ?? true}
            className="accent-[#3A5A40] w-4 h-4"
          />
          Visible in the client library
        </label>
        <p className="font-body text-xs text-muted mt-2 ml-7">
          Untick to save as a draft only you can see in the back office.
        </p>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mt-6">
            <AlertCircle size={18} className="text-red-500 shrink-0" />
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-8 py-3 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60"
          >
            {uploading
              ? "Uploading PDF…"
              : pending
                ? "Saving…"
                : resource
                  ? "Save Changes"
                  : "Add to Library"}
          </button>
          <Link
            href="/admin/resources"
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-muted px-6 py-3 rounded-full hover:border-sage hover:text-sage-dark transition-colors duration-200"
          >
            <ArrowLeft size={15} />
            Back to Resources
          </Link>
        </div>
      </div>
    </form>
  );
}
