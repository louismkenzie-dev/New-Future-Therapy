import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { listAllCategories } from "@/lib/dal/resources";
import AdminTabs from "@/components/admin/AdminTabs";
import ResourceForm from "@/components/admin/resources/ResourceForm";

export const dynamic = "force-dynamic";

export default async function NewResourcePage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const folders = await listAllCategories();

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
          Client Resources
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-12">
          Add a Resource
        </h1>
        <AdminTabs />
        <ResourceForm resource={null} folders={folders} />
      </div>
    </section>
  );
}
