import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Plus,
  LogOut,
  PenLine,
  Eye,
  ExternalLink,
  Lock,
  Sparkles,
  Clock,
} from "lucide-react";
import { isAdmin } from "@/lib/adminAuth";
import { logout } from "@/app/actions/admin";
import { editBuiltInLesson, removeModule } from "@/app/actions/courseEditor";
import { courses, moduleLabel } from "@/lib/content/courses";
import { loadCourse } from "@/lib/content/courses/live";
import { listEditorLessons, listEditorModules } from "@/lib/dal/courseEditor";
import AdminTabs from "@/components/admin/AdminTabs";
import ModuleForm from "@/components/admin/course/ModuleForm";

export const dynamic = "force-dynamic";

export default async function AdminCoursePage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const courseId = courses[0].id;
  const [course, editorLessons, editorModules] = await Promise.all([
    loadCourse(courseId, { includeDrafts: true }),
    listEditorLessons(courseId),
    listEditorModules(courseId),
  ]);
  if (!course) redirect("/admin");

  const editorById = new Map(editorLessons.map((l) => [l.id, l]));
  const builtInModuleIds = new Set(courses[0].modules.map((m) => m.id));
  const nextNumber = Math.max(0, ...course.modules.map((m) => m.number)) + 1;

  return (
    <section className="min-h-[80vh] bg-cream px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-xs text-sage-dark uppercase tracking-[0.25em] mb-3">
              Admin Dashboard
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-charcoal">
              Course Editor
            </h1>
            <p className="font-body text-base text-muted leading-relaxed mt-4 max-w-2xl">
              Upload a script, a question sheet or a worksheet and the editor formats it into a
              lesson in the same style as the ones already here. Preview it, adjust it, then
              publish when you are happy. Nothing is visible to members until you publish.
            </p>
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

        <div className="flex flex-wrap items-center gap-4 mb-10">
          <Link
            href="/admin/course/new"
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm bg-sage-dark text-cream px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-200"
          >
            <Plus size={16} />
            Add a Lesson From Your Files
          </Link>
          <ModuleForm nextNumber={nextNumber} />
          <Link
            href={`/learn/${courseId}`}
            className="inline-flex items-center gap-2 min-h-[44px] font-body text-sm border border-grey-light text-muted px-6 py-3 rounded-full hover:border-sage hover:text-sage-dark transition-colors duration-200"
          >
            <ExternalLink size={15} />
            View as a Member
          </Link>
        </div>

        <div className="space-y-8">
          {course.modules.map((module) => {
            const editable = editorModules.find((m) => m.id === module.id);
            const deletable = !builtInModuleIds.has(module.id) && module.lessons.length === 0;
            return (
              <div key={module.id} className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 flex items-start gap-5">
                  <span className="font-heading text-2xl font-light text-sage shrink-0 w-12 text-center">
                    {module.number === 0 ? "Intro" : module.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block w-8 h-0.5 bg-sage mb-3" aria-hidden="true" />
                    <h2 className="font-heading text-xl md:text-2xl font-medium text-charcoal">
                      {module.title}
                    </h2>
                    <p className="font-body text-sm text-muted mt-2 leading-relaxed">{module.lede}</p>
                    <p className="font-body text-xs text-grey-mid mt-3 uppercase tracking-widest">
                      {moduleLabel(module)} · {module.lessons.length} lesson{module.lessons.length === 1 ? "" : "s"}
                      {!builtInModuleIds.has(module.id) && " · added in the editor"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Link
                      href={`/admin/course/new?module=${module.id}`}
                      className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark border border-sage-light rounded-full px-3 py-2 hover:bg-sage-pale transition-colors duration-200"
                    >
                      <Plus size={13} />
                      Add lesson here
                    </Link>
                    {deletable && (
                      <form action={removeModule}>
                        <input type="hidden" name="moduleId" value={module.id} />
                        <button type="submit" className="font-body text-xs text-muted hover:text-red-600 px-3 py-2">
                          Remove empty module
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {!builtInModuleIds.has(module.id) && editable && (
                  <div className="px-6 md:px-8 pb-6">
                    <ModuleForm module={editable} nextNumber={nextNumber} />
                  </div>
                )}

                <ul className="border-t border-grey-light divide-y divide-grey-light">
                  {module.lessons.map((lesson) => {
                    const editor = editorById.get(lesson.id);
                    return (
                      <li key={lesson.id} className="px-6 md:px-8 py-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-charcoal truncate">{lesson.title}</p>
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs text-muted mt-1">
                            <span className="inline-flex items-center gap-1">
                              <Clock size={12} /> {lesson.estimatedMinutes} min
                            </span>
                            <span>· {lesson.blocks.length} sections</span>
                            {editor ? (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 border ${
                                  editor.status === "published"
                                    ? "bg-sage-pale text-sage-dark border-sage-light/60"
                                    : "bg-cream text-muted border-grey-light"
                                }`}
                              >
                                <Sparkles size={11} />
                                {editor.status === "published" ? "Published · edited here" : "Draft · not visible to members"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 border border-grey-light text-muted">
                                <Lock size={11} /> Built in
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href={`/admin/course/preview/${lesson.id}`}
                            className="inline-flex items-center gap-1.5 font-body text-xs text-muted border border-grey-light rounded-full px-3 py-2 hover:border-sage-light hover:text-sage-dark transition-colors duration-200"
                          >
                            <Eye size={13} /> Preview
                          </Link>
                          {editor ? (
                            <Link
                              href={`/admin/course/${lesson.id}`}
                              className="inline-flex items-center gap-1.5 font-body text-xs bg-sage-dark text-cream rounded-full px-3 py-2 hover:bg-charcoal transition-colors duration-200"
                            >
                              <PenLine size={13} /> Edit
                            </Link>
                          ) : (
                            <form action={editBuiltInLesson}>
                              <input type="hidden" name="lessonId" value={lesson.id} />
                              <button
                                type="submit"
                                className="inline-flex items-center gap-1.5 font-body text-xs text-sage-dark border border-sage-light rounded-full px-3 py-2 hover:bg-sage-pale transition-colors duration-200"
                              >
                                <PenLine size={13} /> Edit a copy
                              </button>
                            </form>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  {module.lessons.length === 0 && (
                    <li className="px-6 md:px-8 py-6 font-body text-sm text-muted">
                      No lessons yet — add one from your files.
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
