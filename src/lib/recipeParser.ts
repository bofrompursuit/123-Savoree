import type { FallbackRecipe } from "./fallbackRecipes";

// Turns a scraped recipe page's markdown into 123 Savoree's grocery-list +
// 3-step shape. Most recipe sites (and the markdown Nimble returns from
// them) follow the same convention: a heading like "Ingredients" or
// "Instructions" followed by a list — so section-by-heading + list-item
// matching covers the common case without needing full HTML/schema parsing.

function extractListSection(markdown: string, headingPattern: RegExp): string[] {
  const items: string[] = [];
  let capturing = false;

  for (const line of markdown.split("\n")) {
    if (/^#{1,6}\s/.test(line)) {
      if (capturing) break;
      if (headingPattern.test(line)) capturing = true;
      continue;
    }
    if (!capturing) continue;
    const listItem = line.match(/^\s*(?:[-*]|\d+[.)])\s+(.*)/);
    if (listItem) items.push(listItem[1].trim());
  }

  return items;
}

const STEP_TITLES = ["Prep", "Cook", "Serve"];

// Real instruction lists are rarely exactly 3 items, so uneven counts get
// grouped into 3 buckets rather than truncated or left as a long list —
// matching "...more One Two Three Recipee"'s always-3-steps format.
function toThreeSteps(lines: string[]): FallbackRecipe["steps"] {
  if (lines.length === 0) {
    return [{ title: "Cook", instruction: "Follow the instructions on the original recipe page." }];
  }
  if (lines.length <= 3) {
    return lines.map((instruction, i) => ({ title: STEP_TITLES[i], instruction }));
  }

  const groupSize = Math.ceil(lines.length / 3);
  return [0, 1, 2]
    .map((i) => ({
      title: STEP_TITLES[i],
      instruction: lines.slice(i * groupSize, (i + 1) * groupSize).join(" Then, "),
    }))
    .filter((step) => step.instruction.length > 0);
}

export function parseRecipeMarkdown(markdown: string, sourceUrl: string): FallbackRecipe {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const recipeName = titleMatch
    ? titleMatch[1].trim()
    : new URL(sourceUrl).hostname.replace(/^www\./, "");

  const groceryList = extractListSection(markdown, /ingredient/i);
  const instructionLines = extractListSection(markdown, /instruction|direction|method|steps?/i);

  return {
    recipeName,
    groceryList: groceryList.length > 0 ? groceryList : ["See the original page for ingredients"],
    steps: toThreeSteps(instructionLines),
  };
}
