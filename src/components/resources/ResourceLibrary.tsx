"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Download,
  Sparkles,
  FileText,
  BookOpen,
  SearchX,
} from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

/* Interactive client resource library: free-text search, folder tabs and a
   "Newest Resources" band. All filtering happens client-side — the library
   is small enough that shipping the full list keeps searching instant. */

export interface LibraryCategory {
  id: string;
  slug: string;
  name: string;
  count: number;
}

export interface LibraryResource {
  slug: string;
  title: string;
  description: string;
  typeLabel: string;
  hasFile: boolean;
  categoryIds: string[];
  createdAt: string;
}

const NEWEST_COUNT = 3;

function downloadHref(resource: LibraryResource): string {
  return resource.hasFile
    ? `/api/resources/${resource.slug}/file?download=1`
    : `/api/resources/${resource.slug}/pdf`;
}

function ResourceCard({
  resource,
  categoryNames,
  newest,
}: {
  resource: LibraryResource;
  categoryNames: string[];
  newest?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col h-full rounded-2xl p-8 border shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        newest
          ? "bg-sage-pale border-sage-light/50 hover:border-sage-light"
          : "bg-white border-grey-light hover:border-sage-light"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark uppercase tracking-[0.18em]">
          {resource.hasFile ? (
            <FileText size={13} strokeWidth={1.75} />
          ) : (
            <BookOpen size={13} strokeWidth={1.75} />
          )}
          {resource.typeLabel}
        </span>
        {newest && (
          <span className="inline-flex items-center gap-1 font-body text-xs text-sage-dark bg-white border border-sage-light/60 rounded-full px-2.5 py-0.5">
            <Sparkles size={11} strokeWidth={1.75} />
            New
          </span>
        )}
      </div>

      <h3 className="font-heading text-2xl font-light text-charcoal leading-snug mb-3 group-hover:text-sage-dark transition-colors duration-300">
        <Link
          href={`/resources/${resource.slug}`}
          className="focus:outline-none after:absolute after:inset-0"
        >
          {resource.title}
        </Link>
      </h3>
      <p className="font-body text-base text-muted leading-relaxed mb-5">
        {resource.description}
      </p>

      {categoryNames.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {categoryNames.map((name) => (
            <span
              key={name}
              className={`font-body text-xs text-sage-dark rounded-full px-2.5 py-0.5 border ${
                newest
                  ? "bg-white border-sage-light/60"
                  : "bg-sage-pale border-sage-light/60"
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark group-hover:gap-2.5 transition-all duration-300">
          View Resource
          <ArrowRight size={15} />
        </span>
        <a
          href={downloadHref(resource)}
          className="relative z-10 inline-flex items-center gap-1.5 font-body text-xs text-muted hover:text-sage-dark transition-colors duration-200 p-2 -m-2"
          aria-label={`Download ${resource.title} as a PDF`}
        >
          <Download size={15} strokeWidth={1.75} />
        </a>
      </div>
    </article>
  );
}

export default function ResourceLibrary({
  categories,
  resources,
}: {
  categories: LibraryCategory[];
  resources: LibraryResource[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const namesById = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const visibleCategories = useMemo(
    () => categories.filter((c) => c.count > 0),
    [categories]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (activeCategory && !resource.categoryIds.includes(activeCategory)) {
        return false;
      }
      if (q === "") return true;
      const haystack = [
        resource.title,
        resource.description,
        resource.typeLabel,
        ...resource.categoryIds.map((id) => namesById.get(id) ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [resources, query, activeCategory, namesById]);

  const browsing = query.trim() === "" && activeCategory === null;
  const newest = resources.slice(0, NEWEST_COUNT);
  const newestSlugs = new Set(newest.map((r) => r.slug));
  const rest = browsing
    ? resources.filter((r) => !newestSlugs.has(r.slug))
    : filtered;

  return (
    <div>
      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <label htmlFor="resource-search" className="sr-only">
          Search the resource library
        </label>
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.75}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a topic, e.g. grounding, boundaries, sleep…"
            className="w-full font-body text-base text-charcoal bg-white border border-grey-light rounded-full pl-13 pr-6 py-4 shadow-sm focus:outline-none focus:border-sage placeholder:text-muted/70"
          />
        </div>
      </div>

      {/* Folder tabs */}
      <div
        className="flex flex-wrap justify-center gap-2 mb-14"
        role="group"
        aria-label="Filter resources by topic"
      >
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={`font-body text-sm px-5 py-2.5 rounded-full border transition-colors duration-300 ${
            activeCategory === null
              ? "bg-sage-dark text-cream border-sage-dark"
              : "bg-white text-muted border-grey-light hover:border-sage-light hover:text-charcoal"
          }`}
        >
          All Resources
        </button>
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              setActiveCategory((current) =>
                current === category.id ? null : category.id
              )
            }
            aria-pressed={activeCategory === category.id}
            className={`font-body text-sm px-5 py-2.5 rounded-full border transition-colors duration-300 ${
              activeCategory === category.id
                ? "bg-sage-dark text-cream border-sage-dark"
                : "bg-white text-muted border-grey-light hover:border-sage-light hover:text-charcoal"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Newest band — only while browsing the full library */}
      {browsing && newest.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-0.5 bg-sage" aria-hidden="true" />
            <h2 className="font-heading text-3xl font-light text-charcoal">
              Newest Resources
            </h2>
          </div>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newest.map((resource) => (
              <StaggerItem key={resource.slug}>
                <ResourceCard
                  resource={resource}
                  categoryNames={resource.categoryIds
                    .map((id) => namesById.get(id))
                    .filter((name): name is string => Boolean(name))}
                  newest
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      )}

      {/* Main grid */}
      {browsing && rest.length > 0 && (
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-0.5 bg-sage" aria-hidden="true" />
          <h2 className="font-heading text-3xl font-light text-charcoal">
            The Full Library
          </h2>
        </div>
      )}
      {!browsing && (
        <p className="font-body text-sm text-muted mb-8" role="status">
          {rest.length === 1
            ? "1 resource found"
            : `${rest.length} resources found`}
          {activeCategory
            ? ` in ${namesById.get(activeCategory) ?? "this folder"}`
            : ""}
        </p>
      )}

      {rest.length === 0 && !browsing ? (
        <div className="bg-white rounded-2xl border border-grey-light p-16 text-center max-w-xl mx-auto">
          <SearchX
            size={40}
            strokeWidth={1.25}
            className="text-sage mx-auto mb-5"
          />
          <h2 className="font-heading text-2xl font-light text-charcoal mb-2">
            Nothing matched your search
          </h2>
          <p className="font-body text-sm text-muted">
            Try a different word, or browse the folders above. We add new
            resources regularly, so it is always worth looking back.
          </p>
        </div>
      ) : (
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((resource) => (
            <StaggerItem key={resource.slug}>
              <ResourceCard
                resource={resource}
                categoryNames={resource.categoryIds
                  .map((id) => namesById.get(id))
                  .filter((name): name is string => Boolean(name))}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
