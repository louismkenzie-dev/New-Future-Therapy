import type { Metadata } from "next";
import AboutExperience from "@/components/about/AboutExperience";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Esther and Laura — identical twin sisters, therapists, and co-founders of NewFuture Therapy. Walk their journey from recruitment to qualified therapists.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
