/* "How did you hear about us?" options on the contact form — Laura's list,
   matching the practice's client records. Order is alphabetical with
   "Other" last. LEGACY_REFERRAL_LABELS keeps older enquiries readable. */

export const REFERRAL_SOURCES = [
  { value: "chatgpt", label: "ChatGPT or AI chat" },
  { value: "counselling-directory", label: "Counselling Directory" },
  { value: "counsellor-recommendation", label: "Counsellor recommendation" },
  { value: "facebook", label: "Facebook" },
  { value: "friend-recommendation", label: "Friend recommendation" },
  { value: "google-search", label: "Google search" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "psychology-today", label: "Psychology Today" },
  { value: "social-media", label: "Other social media" },
  { value: "therapy-directory", label: "Therapy directory" },
  { value: "therapy-rooms", label: "Therapy rooms" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
  { value: "youtube", label: "YouTube" },
  { value: "other", label: "Other" },
] as const;

const LEGACY_REFERRAL_LABELS: Record<string, string> = {
  google: "Google search",
  social: "Social media",
  recommendation: "Personal recommendation",
  directory: "Therapy directory",
};

export function referralLabel(value: string): string {
  return (
    REFERRAL_SOURCES.find((s) => s.value === value)?.label ??
    LEGACY_REFERRAL_LABELS[value] ??
    value
  );
}

export function isReferralSource(value: string): boolean {
  return REFERRAL_SOURCES.some((s) => s.value === value);
}
