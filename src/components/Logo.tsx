/* Brand logo: line-veined leaf glyph beside the stacked "NewFuture / THERAPY"
   wordmark, per the design system (components/core/Logo.jsx). */

interface LogoProps {
  onDark?: boolean;
  scale?: number;
}

function Leaf({ height, fill, vein }: { height: string; fill: string; vein: string }) {
  return (
    <svg
      height={height}
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block shrink-0"
    >
      <path d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z" fill={fill} />
      <line x1="90" y1="200" x2="90" y2="20" stroke={vein} strokeWidth="3" />
      <line x1="90" y1="120" x2="50" y2="80" stroke={vein} strokeWidth="2.5" />
      <line x1="90" y1="140" x2="130" y2="100" stroke={vein} strokeWidth="2.5" />
      <line x1="90" y1="160" x2="55" y2="130" stroke={vein} strokeWidth="2.5" />
      <line x1="90" y1="100" x2="125" y2="70" stroke={vein} strokeWidth="2.5" />
    </svg>
  );
}

export default function Logo({ onDark = false, scale = 1 }: LogoProps) {
  const leafFill = onDark ? "#C4D9C6" : "#3A5A40";
  const leafVein = onDark ? "#2D2926" : "#F5F3EF";

  return (
    <span
      className="inline-flex items-center shrink-0 whitespace-nowrap"
      style={{ gap: `${0.625 * scale}rem` }}
    >
      <Leaf height={`${2.375 * scale}rem`} fill={leafFill} vein={leafVein} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading font-semibold tracking-wide ${
            onDark ? "text-cream" : "text-sage-dark"
          }`}
          style={{ fontSize: `${1.5 * scale}rem` }}
        >
          NewFuture
        </span>
        <span
          className={`font-body uppercase tracking-[0.2em] -mt-0.5 ${
            onDark ? "text-sage-light" : "text-muted"
          }`}
          style={{ fontSize: `${0.75 * scale}rem` }}
        >
          Therapy
        </span>
      </span>
    </span>
  );
}
