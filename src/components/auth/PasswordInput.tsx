"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { inputClass } from "@/components/auth/FormParts";

/* Password field with a show / hide toggle so people can check what they
   have typed — a 44px target sitting inside the field on the right. */
export default function PasswordInput({
  id,
  name = "password",
  autoComplete,
  minLength,
  required = true,
  autoFocus,
  placeholder,
  className,
}: {
  id: string;
  name?: string;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  /** Overrides the field class (the admin login carries a leading icon). */
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        className={`${className ?? inputClass} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full text-grey-mid hover:text-sage-dark transition-colors duration-200"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
