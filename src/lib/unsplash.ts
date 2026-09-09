// Server-only. Fetches a real, verified photo for AI Recipe Helper results
// (fallback library + Nimble-scraped recipes, neither of which include an
// image) — this replaces guessing at Unsplash photo IDs by hand, which
// produced at least one 404'd image before. Never import from a Client
// Component — UNSPLASH_ACCESS_KEY must stay server-side.

const UNSPLASH_SEARCH_ENDPOINT = "https://api.unsplash.com/search/photos";

export function isUnsplashConfigured(): boolean {
  return Boolean(process.env.UNSPLASH_ACCESS_KEY);
}

export async function searchRecipeImage(query: string): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  const url = new URL(UNSPLASH_SEARCH_ENDPOINT);
  url.searchParams.set("query", `${query} food`);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!res.ok) return null;

  const json = await res.json();
  const photo = json?.results?.[0];
  const imageUrl: string | undefined = photo?.urls?.regular;
  const downloadLocation: string | undefined = photo?.links?.download_location;

  if (!imageUrl) return null;

  // Unsplash's API guidelines require pinging this endpoint whenever a
  // photo is used, for their photographer usage stats — fire-and-forget,
  // never block the image from showing on this.
  if (downloadLocation) {
    fetch(downloadLocation, { headers: { Authorization: `Client-ID ${accessKey}` } }).catch(() => {});
  }

  return imageUrl;
}
