import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  FileText,
  PenLine,
  LogOut,
  Library,
  ExternalLink,
} from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { logout } from "@/app/actions/admin";
import {
  listAllCategories,
  listAllResources,
  RESOURCE_TYPE_LABELS,
} from "@/lib/dal/resources";
import AdminTabs from "@/components/admin/AdminTabs";
import FolderManager from "@/components/admin/resources/FolderManager";
import ResourceRowActions from "@/components/admin/resources/ResourceRowActions";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminResourcesPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [folders, resources] = await Promise.all([
    listAllCategories(),
    listAllResources(),
  ]);
  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Client Resources
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-sage text-sage-dark px-6 py-3 rounded-full hover:bg-sage-pale transition-colors duration-200"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </form>
        </div>

        <AdminTabs />

        {/* Actions row */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <Link
            href="/admin/resources/new"
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            <Plus size={16} />
            Add a Resource
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-muted px-6 py-3 rounded-full hover:border-sage hover:text-sage-dark transition-colors duration-200"
          >
            <ExternalLink size={15} />
            View the Public Library
          </Link>
        </div>

        {/* Folders */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-light text-charcoal mb-2">
            Folders
          </h2>
          <p className="font-body text-sm text-muted mb-6">
            Folders organise the library into topics. A resource can live in
            several folders at once, and you can add new topics whenever you
            need them.
          </p>
          <FolderManager folders={folders} />
        </div>

        {/* Resources */}
        <h2 className="font-heading text-2xl font-light text-charcoal mb-6">
          All Resources
        </h2>
        {resources.length === 0 ? (
          <div className="bg-white rounded-2xl border border-grey-light p-16 text-center">
            <Library
              size={40}
              strokeWidth={1.25}
              className="text-sage mx-auto mb-5"
            />
            <h3 className="font-heading text-2xl font-light text-charcoal mb-2">
              Nothing in the library yet
            </h3>
            <p className="font-body text-sm text-muted mb-8">
              Upload your first worksheet, factsheet or article and it will
              appear on the website straight away.
            </p>
            <Link
              href="/admin/resources/new"
              className="inline-flex items-center gap-2 font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
            >
              <Plus size={16} />
              Add a Resource
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <article
                key={resource.id}
                className={`bg-white rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
                  resource.published
                    ? "border-grey-light hover:border-sage-light"
                    : "border-grey-light opacity-70"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark uppercase tracking-widest">
                        {resource.fileUrl ? (
                          <FileText size={13} />
                        ) : (
                          <PenLine size={13} />
                        )}
                        {RESOURCE_TYPE_LABELS[resource.resourceType]}
                        {resource.fileUrl ? " · PDF" : " · Written"}
                      </span>
                      <span className="font-body text-xs text-muted">
                        Added {formatDate(resource.createdAt)}
                      </span>
                    </div>
                    <Link
                      href={`/admin/resources/${resource.id}`}
                      className="font-heading text-xl font-medium text-charcoal hover:text-sage-dark transition-colors duration-200"
                    >
                      {resource.title}
                    </Link>
                    <p className="font-body text-sm text-muted mt-1.5 line-clamp-2">
                      {resource.description}
                    </p>
                    {resource.categoryIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {resource.categoryIds.map((id) => (
                          <span
                            key={id}
                            className="font-body text-xs text-sage-dark bg-sage-pale border border-sage-light/60 rounded-full px-2.5 py-0.5"
                          >
                            {folderNames.get(id) ?? "Folder"}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/admin/resources/${resource.id}`}
                      className="inline-flex items-center font-body text-xs border border-grey-light text-muted px-4 py-1.5 rounded-full hover:border-sage hover:text-sage-dark transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <ResourceRowActions
                      id={resource.id}
                      title={resource.title}
                      published={resource.published}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
