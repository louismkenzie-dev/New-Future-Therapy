import type { Metadata } from "next";
import ApproachExperience from "@/components/approach/ApproachExperience";

const description =
  "The NewFuture Therapy ethos: a compassionate, curious and connected approach to therapy rooted in understanding.";

export const metadata: Metadata = {
  title: "Our Approach",
  description,
  alternates: { canonical: "/our-approach" },
  openGraph: {
    title: "Our Approach | NewFuture Therapy",
    description,
    url: "/our-approach",
  },
};

export default function OurApproachPage() {
  return <ApproachExperience />;
}
