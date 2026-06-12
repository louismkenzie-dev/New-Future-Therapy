import {
  HeartHandshake,
  Wind,
  Sprout,
  Sparkles,
  Sunrise,
  Waves,
  Compass,
  Brain,
  type LucideIcon,
} from "lucide-react";

/* One lucide icon per help area — calm, organic metaphors only. */
export const areaIcons: Record<string, LucideIcon> = {
  relationships: HeartHandshake,
  anxiety: Wind,
  trauma: Sprout,
  "self-esteem": Sparkles,
  depression: Sunrise,
  "emotional-regulation": Waves,
  "family-transitions": Compass,
  neurodiversity: Brain,
};
