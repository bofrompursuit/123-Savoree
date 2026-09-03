import { findFallbackRecipeMention } from "./fallbackRecipes";

export const GUARDRAIL_REPLY = "Be sure to ask Mom or Dad for help with that! 🦄";

const NO_BRAIN_REPLY =
  "Squeak! I can help with simple foods — try asking about pizza, tacos, pasta, or a smoothie!";

const RISK_KEYWORDS = [
  "knife",
  "knives",
  "stove",
  "oven",
  "hot oil",
  "fire",
  "grill",
  "boil",
  "fry",
  "frying",
  "allerg",
  "burn",
  "sharp",
  "blender",
  "microwave",
  "matches",
  "lighter",
];

const COOKING_HINTS = [
  "cook",
  "recipe",
  "make",
  "food",
  "eat",
  "snack",
  "meal",
  "bake",
  "kitchen",
  "ingredient",
  "hungry",
  "dinner",
  "lunch",
  "breakfast",
];

/**
 * Rule-based logic for Pollee's chat — runs entirely client-side (no
 * server, no API key), matching common food questions against the recipe
 * library and applying a keyword-based safety guardrail for everything else.
 */
export function getFallbackChatReply(message: string): string {
  const m = message.toLowerCase();

  if (RISK_KEYWORDS.some((keyword) => m.includes(keyword))) {
    return GUARDRAIL_REPLY;
  }

  const recipe = findFallbackRecipeMention(message);
  if (recipe) {
    const steps = recipe.steps
      .map((step, i) => `${i + 1}) ${step.instruction}`)
      .join(" ");
    return `Squeak! Here's a simple idea for ${recipe.recipeName}: ${steps} Want the full grocery list? Try the box above!`;
  }

  if (COOKING_HINTS.some((hint) => m.includes(hint))) {
    return "Squeak! I love talking about cooking! Tell me a specific food you want to make and I'll help.";
  }

  return NO_BRAIN_REPLY;
}
