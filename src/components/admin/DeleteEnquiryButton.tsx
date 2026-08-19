"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteEnquiry } from "@/app/actions/admin";

/* Permanent enquiry deletion with confirmation — used once an enquiry has
   been read and dealt with. */

export default function DeleteEnquiryButton({
  dbId,
  name,
}: {
  dbId: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  const remove = () => {
    if (
      !window.confirm(
        `Delete the enquiry from ${name}? This permanently removes it and cannot be undone.`
      )
    ) {
      return;
    }
    const data = new FormData();
    data.set("dbId", dbId);
    startTransition(() => deleteEnquiry(data));
  };

  return (
    <button
      type="button"
      onClick={remove}
      disabled={pending}
      className="inline-flex items-center justify-center min-h-[36px] p-2 rounded-full border border-grey-light text-muted hover:text-red-600 hover:border-red-200 transition-colors duration-200 disabled:opacity-50"
      aria-label={`Delete enquiry from ${name}`}
      title="Delete this enquiry"
    >
      <Trash2 size={15} />
    </button>
  );
}
