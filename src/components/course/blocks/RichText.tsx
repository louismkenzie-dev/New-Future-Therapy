/* Shared paragraph / "- " list renderer for the prose-style bodies inside
   engagement blocks. Smaller type than the lesson prose. */
export default function RichText({
  body,
  className = "font-body text-base text-muted leading-relaxed",
}: {
  body: string;
  className?: string;
}) {
  return (
    <>
      {body.split("\n\n").map((para, i) => {
        const lines = para.split("\n");
        if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2 mb-4 last:mb-0">
              {lines.map((line) => (
                <li key={line} className={`flex gap-3 ${className}`}>
                  <span className="mt-3 shrink-0 w-5 h-0.5 bg-sage" aria-hidden="true" />
                  {line.slice(2)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className={`${className} mb-4 last:mb-0`}>
            {para}
          </p>
        );
      })}
    </>
  );
}
