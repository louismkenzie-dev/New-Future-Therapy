/* Routes that make up the programme's "app": the member area and sign-in.
   Used to switch off site chrome (footer, brand intro, smooth scrolling)
   and to pin the viewport so the course feels like an app on a phone. */
export const MEMBER_PREFIXES = [
  "/learn",
  "/account",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/invite",
  "/auth",
  "/admin",
];

/* The app shell proper — where the footer goes and the viewport is pinned. */
export const APP_PREFIXES = ["/learn", "/account", "/admin/course/preview"];

function matches(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export function isMemberRoute(path: string): boolean {
  return matches(path, MEMBER_PREFIXES);
}

export function isAppRoute(path: string): boolean {
  return matches(path, APP_PREFIXES);
}
