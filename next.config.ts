import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      /* Course-editor uploads (Word documents and PDFs) travel through a
         server action. */
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
