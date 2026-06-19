import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { articles, getArticle } from "@/lib/content/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://newfuturetherapy.co.uk";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.metaTitle ?? article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: `${article.title} | NewFuture Therapy`,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${SITE_URL}/articles/${article.slug}`;

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated ?? article.published,
      inLanguage: "en-GB",
      keywords: article.keywords.join(", "),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: `${SITE_URL}/opengraph-image`,
      author: {
        "@type": "Organization",
        name: "NewFuture Therapy",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "NewFuture Therapy",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ];

  if (article.faqs && article.faqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header band */}
      <section className="bg-sage-pale pt-16 pb-12 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark hover:text-charcoal transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={15} />
            All Articles
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-body text-sm text-sage-dark uppercase tracking-[0.2em]">
              {article.category}
            </span>
            <span className="text-sage-light" aria-hidden="true">
              &bull;
            </span>
            <span className="inline-flex items-center gap-1.5 font-body text-sm text-muted">
              <Clock size={14} strokeWidth={1.75} />
              {article.readingMinutes} min read
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal leading-tight">
            {article.title}
          </h1>
          <time
            dateTime={article.published}
            className="block font-body text-sm text-muted mt-6"
          >
            {formatDate(article.published)}
          </time>
        </div>
      </section>

      {/* Body */}
      <article className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            {article.intro.map((para, i) => (
              <p
                key={i}
                className="font-body text-lg text-charcoal/90 leading-[1.9] mb-6 first:text-xl first:text-charcoal"
              >
                {para}
              </p>
            ))}
          </Reveal>

          {article.sections.map((section) => (
            <Reveal key={section.heading} className="mt-12">
              <h2 className="font-heading text-3xl font-light text-charcoal mb-5 leading-snug">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-lg text-muted leading-[1.9] mb-5"
                >
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((item, i) => (
                    <li key={i} className="flex gap-3 font-body text-lg text-muted leading-[1.7]">
                      <span className="mt-2.5 shrink-0 w-8 h-0.5 bg-sage" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <Reveal className="mt-16">
              <h2 className="font-heading text-3xl font-light text-charcoal mb-8">
                Common Questions
              </h2>
              <div className="space-y-6">
                {article.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-white rounded-2xl p-7 border border-grey-light shadow-sm"
                  >
                    <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                      {faq.question}
                    </h3>
                    <p className="font-body text-base text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </article>

      {/* Related + CTA */}
      <section className="py-20 px-6 bg-sage-pale border-t border-grey-light">
        <div className="max-w-3xl mx-auto">
          {article.related && article.related.length > 0 && (
            <Reveal className="mb-16">
              <h2 className="font-heading text-2xl font-light text-charcoal mb-6">
                Continue reading
              </h2>
              <ul className="space-y-3">
                {article.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 font-body text-base text-sage-dark hover:text-charcoal transition-colors duration-200"
                    >
                      <ArrowRight
                        size={16}
                        className="text-sage transition-transform duration-300 group-hover:translate-x-1"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal className="text-center bg-white rounded-2xl p-10 border border-grey-light shadow-sm">
            <h2 className="font-heading text-3xl font-light text-charcoal mb-4">
              Talk to us, no pressure
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-8 max-w-lg mx-auto">
              If anything here resonated, we offer a free 15-minute initial
              consultation. It is a relaxed conversation to see whether we might
              be a good fit — available face to face in Wakefield or online.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
            >
              Book a Free Consultation
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
