import RichText from "./RichText";
import { courseIcon } from "./courseIcons";

export default function Callout({
  icon,
  title,
  body,
  tone = "sage",
}: {
  icon?: string;
  title: string;
  body: string;
  tone?: "sage" | "dark";
}) {
  const Icon = courseIcon(icon);
  const dark = tone === "dark";
  return (
    <div
      className={`rounded-2xl p-5 sm:p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-6 ${
        dark ? "bg-sage-dark text-cream" : "bg-sage-pale border border-sage-light/50"
      }`}
    >
      <span
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full shrink-0 ${
          dark ? "bg-cream/10 text-sage-light" : "bg-white text-sage-dark"
        }`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div>
        <h3
          className={`font-heading text-2xl font-light leading-snug mb-3 ${
            dark ? "text-cream" : "text-charcoal"
          }`}
        >
          {title}
        </h3>
        <RichText
          body={body}
          className={`font-body text-base leading-relaxed ${
            dark ? "text-cream/85" : "text-muted"
          }`}
        />
      </div>
    </div>
  );
}
