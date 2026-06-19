import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import FloatingLeaves from "@/components/FloatingLeaves";
import { ArrowRight, Clock } from "lucide-react";
import { sortedArticles } from "@/lib/content/articles";

const description =
  "Thoughtful articles on relationships, anxiety, starting therapy and growing through life's changes — from Esther and Laura at NewFuture Therapy. Wakefield & Online.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles | NewFuture Therapy",
    description,
    url: "/articles",
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlesPage() {
  const posts = sortedArticles();

  return (
    <>
      <PageHeader
        eyebrow="Reflections & Resources"
        title="Articles"
        lede="Gentle, practical writing on relationships, anxiety, starting therapy and the changes that shape a life. No jargon, no pressure — just thoughts we hope you find helpful."
      />

      <section className="py-20 px-6 bg-cream relative overflow-hidden">
        <FloatingLeaves className="opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/articles/${post.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl p-8 border border-grey-light shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-sage-light"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-body text-xs text-sage-dark uppercase tracking-[0.18em]">
                      {post.category}
                    </span>
                    <span className="text-grey-light" aria-hidden="true">
                      &bull;
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted">
                      <Clock size={13} strokeWidth={1.75} />
                      {post.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-charcoal leading-snug mb-3 group-hover:text-sage-dark transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="font-body text-base text-muted leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <time
                      dateTime={post.published}
                      className="font-body text-xs text-muted"
                    >
                      {formatDate(post.published)}
                    </time>
                    <span className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark group-hover:gap-2.5 transition-all duration-300">
                      Read article
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-16 px-6 bg-sage-pale border-t border-grey-light">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-charcoal mb-4">
            Ready to talk to someone?
          </h2>
          <p className="font-body text-base text-muted leading-relaxed mb-8">
            We offer a free 15-minute initial consultation so you can find out
            how we work and whether we might be a good fit for you. There is no
            pressure and no commitment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body text-sm bg-sage text-cream px-8 py-4 rounded-full hover:bg-sage-dark transition-colors duration-200"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
