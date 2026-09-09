import type { NextConfig } from "next";

// Deployed to Vercel — real Server Actions/route handlers run here (needed
// for Toquee's live Nimble recipe scraping), so this is a normal server
// build, not a static export. No basePath: Vercel serves the app at the
// domain root, unlike GitHub Pages' project-site subpath.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
