import type { MetadataRoute } from "next";
import { BASE_PATH } from "@/lib/basePath";

// Required for `output: "export"` — manifest.ts is a route handler under the
// hood, and static export needs every route explicitly opted into static
// generation.
export const dynamic = "force-static";

// Manifest icon/start_url paths are emitted as-is into the static JSON file,
// so — unlike the icon.tsx/apple-icon.tsx file conventions Next.js resolves
// through its metadata pipeline — they need BASE_PATH applied by hand here.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "123 Savoree",
    short_name: "Savoree",
    description: "Delicious things come in 3's",
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#00c2ff",
    icons: [
      {
        src: `${BASE_PATH}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${BASE_PATH}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
