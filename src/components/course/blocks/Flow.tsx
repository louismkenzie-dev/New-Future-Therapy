import BlockHeading from "./BlockHeading";
import { courseIcon } from "./courseIcons";

/* A numbered journey — reads left to right on desktop, top to bottom on a
   phone, joined by a thin sage line. */
export default function Flow({
  heading,
  intro,
  steps,
}: {
  heading?: string;
  intro?: string;
  steps: { icon: string; title: string; body?: string }[];
}) {
  return (
    <div>
      <BlockHeading heading={heading} intro={intro} />
      <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        <span
          className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-sage-light"
          aria-hidden="true"
        />
        {steps.map((step, i) => {
          const Icon = courseIcon(step.icon);
          return (
            <li key={step.title} className="relative flex md:flex-col md:items-center md:text-center gap-4">
              <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-dark text-cream shrink-0">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-1">
                  Step {i + 1}
                </p>
                <h3 className="font-body text-lg font-medium text-charcoal leading-snug mb-1.5">
                  {step.title}
                </h3>
                {step.body && (
                  <p className="font-body text-sm text-muted leading-relaxed max-w-xs md:mx-auto">
                    {step.body}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
