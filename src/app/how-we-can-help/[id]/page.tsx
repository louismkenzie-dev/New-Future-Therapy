import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { helpAreas } from "@/lib/content/helpAreas";
import AreaExperience from "@/components/areas/AreaExperience";

export function generateStaticParams() {
  return helpAreas.map((area) => ({ id: area.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const area = helpAreas.find((a) => a.id === id);
  if (!area) return {};
  return {
    title: area.title,
    description: area.summary,
    alternates: { canonical: `/how-we-can-help/${area.id}` },
    openGraph: {
      title: `${area.title} | NewFuture Therapy`,
      description: area.summary,
      url: `/how-we-can-help/${area.id}`,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = helpAreas.findIndex((a) => a.id === id);
  if (index === -1) notFound();

  const area = helpAreas[index];
  const prev = helpAreas[(index - 1 + helpAreas.length) % helpAreas.length];
  const next = helpAreas[(index + 1) % helpAreas.length];

  return <AreaExperience area={area} prev={prev} next={next} />;
}
