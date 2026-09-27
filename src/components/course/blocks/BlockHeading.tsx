/* Serif heading + optional intro used above every engagement block. */
export default function BlockHeading({
  heading,
  intro,
  align = "left",
}: {
  heading?: string;
  intro?: string;
  align?: "left" | "center";
}) {
  if (!heading && !intro) return null;
  return (
    <div className={`mb-8 ${align === "center" ? "text-center" : ""}`}>
      {heading && (
        <>
          <span
            className={`block w-8 h-0.5 bg-sage mb-4 ${align === "center" ? "mx-auto" : ""}`}
            aria-hidden="true"
          />
          <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal leading-tight">
            {heading}
          </h2>
        </>
      )}
      {intro && (
        <p
          className={`font-body text-base text-muted leading-relaxed mt-3 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
