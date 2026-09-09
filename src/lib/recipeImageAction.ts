"use server";

import { isUnsplashConfigured, searchRecipeImage } from "./unsplash";

// Called from AIRecipeSection after a recipe is generated/scraped, to add
// a real photo to results that otherwise have none. Returns null (no
// image shown) if Unsplash isn't configured or nothing matched.
export async function fetchRecipeImage(query: string): Promise<string | null> {
  if (!isUnsplashConfigured()) return null;
  return searchRecipeImage(query);
}
