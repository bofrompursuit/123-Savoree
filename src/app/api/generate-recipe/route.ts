import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";

const RECIPE_SCHEMA = {
  type: "object",
  properties: {
    recipeName: { type: "string" },
    groceryList: {
      type: "array",
      items: { type: "string" },
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          instruction: { type: "string" },
        },
        required: ["title", "instruction"],
        additionalProperties: false,
      },
      minItems: 3,
      maxItems: 3,
    },
  },
  required: ["recipeName", "groceryList", "steps"],
  additionalProperties: false,
} as const;

const SYSTEM_PROMPT = `You are the "One Two Three Recipee" helper inside 123 Savoree, a cooking app for kids and beginner cooks.
Given a food a kid wants to make, respond with:
- recipeName: a short, friendly recipe title
- groceryList: 4-8 simple ingredients a family could buy at a regular grocery store
- steps: EXACTLY 3 steps (not more, not fewer), each with a short title (1-3 words) and a kid-safe instruction

Keep instructions simple, encouraging, and safe for a beginner. Call out when a grown-up should help (stove, oven, sharp knives).`;

export async function POST(request: Request) {
  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json({ error: "Missing 'query'" }, { status: 400 });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      thinking: { type: "disabled" },
      output_config: {
        effort: "low",
        format: { type: "json_schema", schema: RECIPE_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `I want to make: ${query}` }],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json(
        { error: "I can't help with that recipe idea — try something else!" },
        { status: 422 },
      );
    }

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json({ error: "No recipe generated" }, { status: 502 });
    }

    const recipe = JSON.parse(textBlock.text);
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("generate-recipe error:", error);
    return NextResponse.json(
      { error: "Something went wrong generating that recipe." },
      { status: 500 },
    );
  }
}
