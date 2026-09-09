"use server";

import { isNimbleConfigured, scrapeUrlAsMarkdown } from "./nimble";
import { parseRecipeMarkdown } from "./recipeParser";
import type { FallbackRecipe } from "./fallbackRecipes";

// Called directly from AIRecipeSection (a Client Component) when the query
// looks like a URL. Returns null if Nimble isn't configured or the scrape
// comes back empty — the caller falls back to the local recipe library.
export async function scrapeRecipeFromUrl(url: string): Promise<FallbackRecipe | null> {
  if (!isNimbleConfigured()) return null;

  const markdown = await scrapeUrlAsMarkdown(url);
  if (!markdown) return null;

  return parseRecipeMarkdown(markdown, url);
}
