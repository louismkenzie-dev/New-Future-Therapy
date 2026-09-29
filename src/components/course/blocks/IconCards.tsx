import BlockHeading from "./BlockHeading";
import { courseIcon } from "./courseIcons";

export default function IconCards({
  heading,
  intro,
  columns = 3,
  items,
}: {
  heading?: string;
  intro?: string;
  columns?: 2 | 3 | 4;
  items: { icon: string; title: string; body?: string }[];
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div>
      <BlockHeading heading={heading} intro={intro} />
      <div className={`grid grid-cols-1 ${cols} gap-5`}>
        {items.map((item) => {
          const Icon = courseIcon(item.icon);
          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-grey-light shadow-sm p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sage-light"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sage-pale text-sage-dark mb-4">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="font-body text-lg font-medium text-charcoal leading-snug text-balance mb-2">
                {item.title}
              </h3>
              {item.body && (
                <p className="font-body text-sm text-muted leading-relaxed">{item.body}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
