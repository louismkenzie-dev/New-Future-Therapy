import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/* Content-Security-Policy. Header-based rather than nonce-based so the
   marketing pages can stay statically rendered ('unsafe-inline' covers
   Next's own inline bootstrap scripts). Every third-party origin below is
   one the site genuinely uses:
     Mux       — course video (stream/image/*.mux.com) and its analytics (litix.io)
     Supabase  — sign-in status in the browser
     Vercel    — Blob uploads in the admin, the Vercel preview toolbar
     Stripe    — checkout redirects
     Google    — fonts on the admin brand page only
   Anything blocked is reported to /api/csp-report and appears in the
   Vercel logs. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://image.mux.com https://*.litix.io https://*.blob.vercel-storage.com https://vercel.live https://vercel.com",
  "font-src 'self' data: https://fonts.gstatic.com https://vercel.live",
  "media-src 'self' blob: https://*.mux.com",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.mux.com https://*.litix.io https://vercel.com https://*.blob.vercel-storage.com https://storage.googleapis.com https://vercel.live wss://ws-us3.pusher.com",
  "worker-src 'self' blob:",
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com https://billing.stripe.com",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
  "report-uri /api/csp-report",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), fullscreen=(self)",
  },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework.
  poweredByHeader: false,
  // Never ship readable source to browsers.
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: {
      /* Course-editor uploads (Word documents and PDFs) travel through a
         server action. */
      bodySizeLimit: "25mb",
    },
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Member, account and admin pages hold personal data: never cache them.
      {
        source: "/(learn|account|admin|invite)/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
};

export default nextConfig;
