import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import FloatingLeaves from "@/components/FloatingLeaves";
import ResourceLibrary, {
  type LibraryCategory,
  type LibraryResource,
} from "@/components/resources/ResourceLibrary";
import {
  listPublicCategories,
  listPublishedResources,
  RESOURCE_TYPE_LABELS,
} from "@/lib/dal/resources";

export const dynamic = "force-dynamic";

const description =
  "Free worksheets, factsheets and articles from Esther and Laura at NewFuture Therapy — practical resources on anxiety, relationships, boundaries, self-esteem and more. View online, download as a PDF or print. Wakefield & Online.";

export const metadata: Metadata = {
  title: "Client Resources",
  description,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Client Resources | NewFuture Therapy",
    description,
    url: "/resources",
  },
};

export default async function ResourcesPage() {
  const [categories, resources] = await Promise.all([
    listPublicCategories(),
    listPublishedResources(),
  ]);

  const libraryCategories: LibraryCategory[] = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    count: c.resourceCount,
  }));

  const libraryResources: LibraryResource[] = resources.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    typeLabel: RESOURCE_TYPE_LABELS[r.resourceType],
    hasFile: Boolean(r.fileUrl),
    categoryIds: r.categoryIds,
    createdAt: r.createdAt,
  }));

  return (
    <>
      <PageHeader
        eyebrow="For Our Clients"
        title="Client Resources"
        lede="A growing library of worksheets, factsheets and articles to support you between sessions. Every resource is free to read online, download as a PDF or print — take whatever is helpful, at your own pace."
      />

      <section className="py-20 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          {libraryResources.length === 0 ? (
            <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-grey-light shadow-sm p-16">
              <h2 className="font-heading text-3xl font-light text-charcoal mb-4">
                New resources are on their way
              </h2>
              <p className="font-body text-base text-muted leading-relaxed">
                We are preparing worksheets, factsheets and articles for this
                library. Please check back soon — and if there is a topic you
                would find helpful, do let us know.
              </p>
            </div>
          ) : (
            <ResourceLibrary
              categories={libraryCategories}
              resources={libraryResources}
            />
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
            Would a conversation help more?
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            Resources are a helpful companion, but they are not a substitute
            for being heard. We offer a free 15-minute initial consultation —
            no pressure, no commitment, face to face in Wakefield or online.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
