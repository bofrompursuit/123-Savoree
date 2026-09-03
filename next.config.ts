import type { NextConfig } from "next";

// Static export for GitHub Pages — this repo has no server (no API routes,
// no Server Actions), so `output: "export"` produces plain static HTML/JS
// that Pages can serve directly. GitHub Pages hosts project sites at
// https://<user>.github.io/<repo>/, so basePath/assetPrefix must match the
// repo name or every asset URL 404s in production.
const REPO_NAME = "123-Savoree";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${REPO_NAME}`,
  assetPrefix: `/${REPO_NAME}/`,
  trailingSlash: true,
  images: {
    // next/image's optimization API needs a server; static export can't
    // run it, so images are served as-is.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
