import { Ear, Heart, MessageCircle, Sparkles, type LucideIcon } from "lucide-react";

/* The four gentle reactions a partner can offer on a shared reflection. */
export const REACTION_META: Record<string, { label: string; icon: LucideIcon }> =
  {
    i_hear_you: { label: "I hear you", icon: Ear },
    thank_you: { label: "Thank you for sharing", icon: Heart },
    this_moved_me: { label: "This moved me", icon: Sparkles },
    lets_talk: { label: "I would love to talk about this", icon: MessageCircle },
  };

export const REACTION_TYPES = Object.keys(REACTION_META);
