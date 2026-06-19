import type { Metadata } from "next";
import AboutExperience from "@/components/about/AboutExperience";

const description =
  "Meet Esther and Laura — identical twin sisters, therapists, and co-founders of NewFuture Therapy. Walk their journey from recruitment to qualified therapists.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | NewFuture Therapy",
    description,
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutExperience />;
}
