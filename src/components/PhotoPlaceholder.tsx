interface PhotoPlaceholderProps {
  className?: string;
  label?: string;
}

export default function PhotoPlaceholder({ className = "", label }: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-sage-light via-sage/30 to-sage-pale flex items-end justify-start ${className}`}
    >
      {/* Decorative organic shape */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <ellipse cx="200" cy="180" rx="180" ry="160" fill="#3A5A40" />
        <ellipse cx="280" cy="300" rx="120" ry="100" fill="#6B8C6F" />
        <ellipse cx="100" cy="320" rx="90" ry="80" fill="#C4D9C6" />
      </svg>

      {label && (
        <span className="relative z-10 m-4 font-body text-xs text-sage-dark/70 uppercase tracking-widest">
          {label}
        </span>
      )}
    </div>
  );
}
