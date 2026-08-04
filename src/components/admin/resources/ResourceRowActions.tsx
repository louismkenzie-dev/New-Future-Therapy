"use client";

import { useTransition } from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { removeResource, togglePublished } from "@/app/actions/resources";

/* Publish toggle + delete (with confirmation) for a row in the admin
   resource list. */

export default function ResourceRowActions({
  id,
  title,
  published,
}: {
  id: string;
  title: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const data = new FormData();
    data.set("id", id);
    data.set("publish", String(!published));
    startTransition(() => togglePublished(data));
  };

  const remove = () => {
    if (
      !window.confirm(
        `Delete “${title}” from the library? This also removes its uploaded file and cannot be undone.`
      )
    ) {
      return;
    }
    const data = new FormData();
    data.set("id", id);
    startTransition(() => removeResource(data));
  };

  return (
    <div
      className={`flex items-center gap-2 transition-opacity ${
        pending ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className={`inline-flex items-center gap-1.5 font-body text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 ${
          published
            ? "bg-sage-pale text-sage-dark border-sage-light hover:bg-cream"
            : "bg-cream text-muted border-grey-light hover:border-sage hover:text-sage-dark"
        }`}
      >
        {published ? <Eye size={13} /> : <EyeOff size={13} />}
        {published ? "Live" : "Draft"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="p-2 rounded-full text-muted hover:text-red-600 hover:bg-cream transition-colors duration-200"
        aria-label={`Delete ${title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
