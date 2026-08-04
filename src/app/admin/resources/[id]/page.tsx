import { redirect, notFound } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { getResourceById, listAllCategories } from "@/lib/dal/resources";
import AdminTabs from "@/components/admin/AdminTabs";
import ResourceForm from "@/components/admin/resources/ResourceForm";

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    notFound();
  }
  const [resource, folders] = await Promise.all([
    getResourceById(id),
    listAllCategories(),
  ]);
  if (!resource) notFound();

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
          Client Resources
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-12">
          Edit Resource
        </h1>
        <AdminTabs />
        <ResourceForm resource={resource} folders={folders} />
      </div>
    </section>
  );
}
