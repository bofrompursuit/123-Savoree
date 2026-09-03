import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic();

/**
 * True once a real ANTHROPIC_API_KEY is set. The scaffolded .env.local ships
 * with a placeholder value so the repo runs out of the box — callers should
 * check this before hitting the API and fall back to the local recipe/chat
 * libraries (see fallbackRecipes.ts / fallbackChat.ts) when it's false.
 */
export function isAnthropicConfigured(): boolean {
  const key = process.env.ANTHROPIC_API_KEY;
  return Boolean(key && key !== "sk-ant-your-key-here");
}
