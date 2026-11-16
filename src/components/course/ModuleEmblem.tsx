import {
  Activity,
  Compass,
  Heart,
  HeartHandshake,
  Leaf,
  Link,
  MessagesSquare,
  Route,
  ScrollText,
  ShieldCheck,
  Sunrise,
  type LucideIcon,
} from "lucide-react";

/* One lucide symbol per module, in the same quiet roundel as the video
   thumbnails (Direction A). Modules added in the editor fall back to the
   leaf. */
const MODULE_ICONS: Record<string, LucideIcon> = {
  introduction: Leaf,
  "your-relationship-journey": Route,
  "nervous-system": Activity,
  attachment: Link,
  communication: MessagesSquare,
  "conflict-and-repair": HeartHandshake,
  "trust-and-boundaries": ShieldCheck,
  "intimacy-and-connection": Heart,
  "navigating-change": Compass,
  "relationship-agreements": ScrollText,
  "a-new-future": Sunrise,
};

export default function ModuleEmblem({ moduleId }: { moduleId: string }) {
  const Icon = MODULE_ICONS[moduleId] ?? Leaf;
  return (
    <span
      className="relative shrink-0 inline-flex items-center justify-center w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-sage-pale border border-sage-light/50 text-sage-dark"
      aria-hidden="true"
    >
      <span className="absolute inset-[5px] md:inset-[6px] rounded-full border border-dashed border-sage-light/70" />
      <Icon className="w-6 h-6 md:w-[30px] md:h-[30px]" strokeWidth={1.5} />
    </span>
  );
}
