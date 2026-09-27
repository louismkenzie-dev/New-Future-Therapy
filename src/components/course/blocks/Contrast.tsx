import BlockHeading from "./BlockHeading";
import RichText from "./RichText";
import { courseIcon } from "./courseIcons";

type Column = {
  label: string;
  icon?: string;
  items: string[];
  tone?: "muted" | "sage";
};

export default function Contrast({
  heading,
  intro,
  columns,
  note,
}: {
  heading?: string;
  intro?: string;
  columns: [Column, Column];
  note?: string;
}) {
  return (
    <div>
      <BlockHeading heading={heading} intro={intro} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {columns.map((column) => {
          const Icon = courseIcon(column.icon);
          const sage = column.tone === "sage";
          return (
            <div
              key={column.label}
              className={`rounded-2xl p-5 sm:p-7 border ${
                sage
                  ? "bg-sage-pale border-sage-light/50"
                  : "bg-white border-grey-light shadow-sm"
              }`}
            >
              <p
                className={`inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.25em] mb-5 ${
                  sage ? "text-sage-dark" : "text-muted"
                }`}
              >
                <Icon size={15} />
                {column.label}
              </p>
              <ul className="space-y-4">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className={`font-heading text-xl md:text-2xl font-light leading-snug ${
                      sage ? "text-charcoal" : "text-muted italic"
                    }`}
                  >
                    &ldquo;{item}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {note && (
        <div className="mt-6 max-w-2xl">
          <RichText body={note} className="font-body text-sm text-muted leading-relaxed" />
        </div>
      )}
    </div>
  );
}
