import { redirect } from "next/navigation";
import { courses } from "@/lib/content/courses";

/* One flagship course today — send visitors straight to it. When a second
   course launches, replace this redirect with a course index page. */
export default function CoursesPage() {
  redirect(`/courses/${courses[0].id}`);
}
