import { AlertCircle, CheckCircle2 } from "lucide-react";

export const inputClass =
  "w-full font-body text-sm text-charcoal bg-white border border-grey-light rounded-lg px-4 py-3 focus:outline-none focus:border-sage transition-colors duration-200";

export const labelClass =
  "block font-body text-xs text-muted uppercase tracking-widest mb-2";

export function RequiredMark() {
  return (
    <span className="text-sage" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle size={18} className="text-red-500 shrink-0" />
      <p className="font-body text-sm text-red-600">{message}</p>
    </div>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-3 p-4 bg-sage-pale border border-sage-light rounded-lg">
      <CheckCircle2 size={18} className="text-sage-dark shrink-0" />
      <p className="font-body text-sm text-sage-dark">{message}</p>
    </div>
  );
}

export function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 font-body text-sm bg-sage-dark text-cream px-8 py-4 rounded-full hover:bg-charcoal transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
