import { findFallbackRecipeMention } from "./fallbackRecipes";

export const GUARDRAIL_REPLY = "Be sure to ask Mom or Dad for help with that! ✨";

const NO_BRAIN_REPLY =
  "✨ I can help with simple foods — try asking about pizza, tacos, pasta, or a smoothie!";

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

// Word-boundary so "which pizza" doesn't accidentally match "hi".
const GREETING_PATTERN = /\b(hi+|hey+|hello|hiya|howdy|yo|sup)\b/i;
const GREETING_PHRASES = ["good morning", "good afternoon", "good evening", "what's up"];

const GREETING_REPLIES = [
  "✨ Hi there! I'm Toquee, your kitchen buddy! Tell me a food you want to make, or paste a recipe link in the box above and I'll fetch the steps for you.",
  "👋 Hey hey! Ready to cook something fun? Ask me about pizza, tacos, or paste a recipe link up above!",
  "🎉 Hiya! Toquee here! Name a food and I'll help, or drop a recipe link above and I'll pull up the ingredients and steps.",
];

/**
 * Rule-based logic for Toquee's chat — runs entirely client-side (no
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
    return `✨ Here's a simple idea for ${recipe.recipeName}: ${steps} Want the full grocery list? Try the box above!`;
  }

  if (GREETING_PATTERN.test(m) || GREETING_PHRASES.some((phrase) => m.includes(phrase))) {
    return GREETING_REPLIES[Math.floor(Math.random() * GREETING_REPLIES.length)];
  }

  if (COOKING_HINTS.some((hint) => m.includes(hint))) {
    return "✨ I love talking about cooking! Tell me a specific food you want to make and I'll help.";
  }

  return NO_BRAIN_REPLY;
}
