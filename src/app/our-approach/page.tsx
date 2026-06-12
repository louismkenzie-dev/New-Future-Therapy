import type { Metadata } from "next";
import ApproachExperience from "@/components/approach/ApproachExperience";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "The NewFuture Therapy ethos: a compassionate, curious and connected approach to therapy rooted in understanding.",
};

export default function OurApproachPage() {
  return <ApproachExperience />;
}
