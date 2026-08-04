import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileText, BookOpen } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import ResourceViewActions from "@/components/resources/ResourceViewActions";
import {
  getPublishedResource,
  listPublicCategories,
  RESOURCE_TYPE_LABELS,
} from "@/lib/dal/resources";
import { parseArticleBody } from "@/lib/resources/articleBody";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getPublishedResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: {
      title: `${resource.title} | NewFuture Therapy`,
      description: resource.description,
      url: `/resources/${resource.slug}`,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [resource, categories] = await Promise.all([
    getPublishedResource(slug),
    listPublicCategories(),
  ]);
  if (!resource) notFound();

  const folderNames = categories
    .filter((c) => resource.categoryIds.includes(c.id))
    .map((c) => c.name);
  const hasFile = Boolean(resource.fileUrl);
  const blocks = resource.body ? parseArticleBody(resource.body) : [];

  return (
    <>
      {/* Header band */}
      <section className="bg-sage-pale pt-16 pb-12 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark hover:text-charcoal transition-colors duration-200 mb-8 print:hidden"
          >
            <ArrowLeft size={15} />
            All Resources
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark uppercase tracking-[0.2em]">
              {hasFile ? (
                <FileText size={14} strokeWidth={1.75} />
              ) : (
                <BookOpen size={14} strokeWidth={1.75} />
              )}
              {RESOURCE_TYPE_LABELS[resource.resourceType]}
            </span>
            <span className="text-sage-light" aria-hidden="true">
              &bull;
            </span>
            <time
              dateTime={resource.createdAt}
              className="font-body text-sm text-muted"
            >
              Added {formatDate(resource.createdAt)}
            </time>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight mb-5">
            {resource.title}
          </h1>
          {resource.description !== "" && (
            <p className="font-body text-base text-muted leading-relaxed max-w-2xl mb-6">
              {resource.description}
            </p>
          )}
          {folderNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 print:hidden">
              {folderNames.map((name) => (
                <span
                  key={name}
                  className="font-body text-xs text-sage-dark bg-white border border-sage-light/60 rounded-full px-3 py-1"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
          <ResourceViewActions slug={resource.slug} hasFile={hasFile} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-cream">
        <div className={hasFile ? "max-w-4xl mx-auto" : "max-w-3xl mx-auto"}>
          {hasFile ? (
            <Reveal>
              <div className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden print:hidden">
                <iframe
                  id="resource-pdf-frame"
                  src={`/api/resources/${resource.slug}/file`}
                  title={resource.title}
                  className="w-full h-[75vh] min-h-[480px]"
                />
              </div>
              <p className="font-body text-sm text-muted text-center mt-6 print:hidden">
                If the preview does not load on your device, you can{" "}
                <a
                  href={`/api/resources/${resource.slug}/file?download=1`}
                  className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors duration-200"
                >
                  download the PDF
                </a>{" "}
                instead.
              </p>
            </Reveal>
          ) : (
            <article>
              {blocks.map((block, i) => {
                if (block.kind === "heading") {
                  return (
                    <Reveal key={i} className="mt-12 first:mt-0">
                      <h2 className="font-heading text-3xl font-light text-charcoal mb-5 leading-snug">
                        {block.text}
                      </h2>
                    </Reveal>
                  );
                }
                if (block.kind === "bullets") {
                  return (
                    <Reveal key={i}>
                      <ul className="space-y-3 mb-6">
                        {block.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-3 font-body text-lg text-muted leading-[1.7]"
                          >
                            <span
                              className="mt-3.5 shrink-0 w-8 h-0.5 bg-sage"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={i}>
                    <p className="font-body text-lg text-muted leading-[1.9] mb-5">
                      {block.text}
                    </p>
                  </Reveal>
                );
              })}
            </article>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light print:hidden">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-light text-charcoal mb-4">
            Take it at your own pace
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            If anything in this resource stirs something you would like to talk
            through, we offer a free 15-minute initial consultation — a relaxed
            conversation with no pressure and no commitment.
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
