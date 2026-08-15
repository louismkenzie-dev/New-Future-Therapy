import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getLesson } from "@/lib/content/courses";

/* Free-preview lessons are viewable signed-out. */
function isPreviewLessonPath(pathname: string): boolean {
  const match = pathname.match(/^\/learn\/([^/]+)\/([^/]+)\/?$/);
  if (!match) return false;
  const entry = getLesson(match[1], match[2]);
  return Boolean(entry?.lesson.preview);
}

/* The course platform is reachable by direct URL for enrolled members and
   testers, but deliberately unlinked: the Header shows course/sign-in links
   only when NEXT_PUBLIC_COURSE_ENABLED=true, and robots.ts disallows all
   member and auth routes. */

/* Routes that require an authenticated member. */
function isProtectedPath(pathname: string): boolean {
  return pathname.startsWith("/learn") || pathname.startsWith("/account");
}

/* Optimistic auth gate + Supabase session refresh for the member area.
   This is NOT the security boundary — server actions are POSTs that can
   bypass these matchers, so every page/action/handler re-checks auth via
   the DAL (src/lib/auth/session.ts). */

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    if (isPreviewLessonPath(request.nextUrl.pathname)) return response;
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/learn/:path*",
    "/account/:path*",
    "/courses/:path*",
    "/invite/:path*",
    "/auth/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
