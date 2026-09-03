import { findFallbackRecipeMention } from "./fallbackRecipes";

// Shared with the real Claude-backed route so the guardrail reply is
// identical whether or not an API key is configured.
export const GUARDRAIL_REPLY = "Be sure to ask Mom or Dad for help with that! 🦜";

const NO_BRAIN_REPLY =
  "Squawk! My big AI brain isn't connected yet (no API key), but I can still help with simple foods — try asking about pizza, tacos, pasta, or a smoothie!";

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
 * Rule-based stand-in for Pollee when no ANTHROPIC_API_KEY is configured.
 * Keeps the guardrail behavior identical to the real Claude-backed replies,
 * and can still answer common food questions using the fallback recipe
 * library — no network call, no cost, works immediately.
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
    return `Squawk! Here's a simple idea for ${recipe.recipeName}: ${steps} Want the full grocery list? Try the box above!`;
  }

  if (COOKING_HINTS.some((hint) => m.includes(hint))) {
    return "Squawk! I love talking about cooking! Tell me a specific food you want to make and I'll help.";
  }

  return NO_BRAIN_REPLY;
}
