import { NextResponse, type NextRequest } from "next/server";
import { courses } from "@/lib/content/courses";
import { REFERRAL_COOKIE, activePartnerByCode, normaliseCode } from "@/lib/referrals";

/* A referral partner's share link, e.g. /r/SARAH10. Remembers the code for
   30 days so checkout applies the 10% discount automatically, then sends
   the visitor to the programme page. Unknown or paused codes still land on
   the programme page, just without a discount. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = normaliseCode(decodeURIComponent(raw));
  const partner = await activePartnerByCode(code);

  const url = request.nextUrl.clone();
  url.pathname = `/courses/${courses[0].id}`;
  url.search = "";
  const response = NextResponse.redirect(url);
  if (partner) {
    response.cookies.set(REFERRAL_COOKIE, code, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
  return response;
}
