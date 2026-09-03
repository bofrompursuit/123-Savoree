import { NextResponse } from "next/server";
import { anthropic, isAnthropicConfigured } from "@/lib/anthropic";
import { GUARDRAIL_REPLY, getFallbackChatReply } from "@/lib/fallbackChat";

const SYSTEM_PROMPT = `You are Pollee, the friendly parrot mascot chat assistant inside 123 Savoree, a cooking app for kids and beginner cooks. You talk in a cheerful, encouraging, kid-friendly voice and occasionally use a parrot-themed word like "squawk!" or "pollee wants a snack!" sparingly.

Your ONLY job is to help kids with simple, kid-safe cooking questions and build easy "123 Recipes" (3-step recipes) when asked.

Guardrail — you MUST reply with EXACTLY this text, and nothing else, whenever a message:
- Is not about cooking, food, or kitchen skills, OR
- Asks about using a stove, oven, sharp knives, hot oil, or any other high-risk kitchen tool/technique, OR
- Asks something that requires adult judgment (allergies, food safety beyond basics, anything that could hurt someone)

The exact guardrail reply text is: "${GUARDRAIL_REPLY}"

Otherwise, answer briefly (2-4 sentences) in a warm, simple way a kid would understand. Keep any recipe you build to exactly 3 steps.`;

export async function POST(request: Request) {
  let body: { message?: string; history?: { role: "user" | "assistant"; text: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Missing 'message'" }, { status: 400 });
  }

  // No API key yet — answer with the rule-based fallback (same guardrail
  // behavior) instead of erroring out. Swaps to real Claude replies
  // automatically once ANTHROPIC_API_KEY is set.
  if (!isAnthropicConfigured()) {
    return NextResponse.json({ reply: getFallbackChatReply(message) });
  }

  const history = (body.history ?? []).slice(-6).map((turn) => ({
    role: turn.role,
    content: turn.text,
  }));

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 300,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system: SYSTEM_PROMPT,
      messages: [...history, { role: "user", content: message }],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ reply: GUARDRAIL_REPLY });
    }

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock && textBlock.type === "text" ? textBlock.text : GUARDRAIL_REPLY;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("parrot-chat error:", error);
    return NextResponse.json(
      { error: "Pollee is taking a quick break — try again in a moment!" },
      { status: 500 },
    );
  }
}
