"use client";

import { useState } from "react";
import { useSpeechToText } from "@/lib/useSpeechToText";
import { getFallbackRecipe } from "@/lib/fallbackRecipes";
import { BASE_PATH } from "@/lib/basePath";
import ParrotIcon from "./ParrotIcon";

// A short artificial delay so "Cooking it up..." reads as real work rather
// than an instant flash — the recipe lookup itself is synchronous.
const THINKING_DELAY_MS = 500;

type StepResult = { title: string; instruction: string };
type RecipeResult = {
  recipeName: string;
  groceryList: string[];
  steps: StepResult[];
};

export default function AIRecipeSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);
  const [guardianPhone, setGuardianPhone] = useState("");
  const [smsStatus, setSmsStatus] = useState<
    { sentTo: string; body: string } | null
  >(null);
  const {
    listening,
    toggle: toggleVoice,
    supported: speechSupported,
  } = useSpeechToText(setQuery);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setRecipe(null);
    setSmsStatus(null);

    await new Promise((resolve) => setTimeout(resolve, THINKING_DELAY_MS));
    setRecipe(getFallbackRecipe(query));
    setLoading(false);
  }

  async function handleOrderIngredients(e: React.FormEvent) {
    e.preventDefault();
    if (!guardianPhone.trim() || !recipe) return;

    // Simulation only — there's no real SMS provider wired up. See README.
    const itemCount = recipe.groceryList.length;
    setSmsStatus({
      sentTo: guardianPhone.trim(),
      body: `123 Savoree: Your kid wants help getting ingredients for "${recipe.recipeName}" (${itemCount} items). Reply YES to approve the order, or open the app to review the list.`,
    });
  }

  return (
    <section
      id="recipee-ai"
      className="relative overflow-hidden bg-savoree-sand/50 px-4 py-16 sm:px-6 sm:py-24"
    >
      <video
        src={`${BASE_PATH}/video/burger-fries.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-savoree-sand/70" />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <ParrotIcon className="animate-savoree-mascot-bob mx-auto mb-2 h-16 w-16" />
          <span className="text-sm font-bold uppercase tracking-wide text-savoree-navy">
            AI Recipe Helper
          </span>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            ...more One Two Three Recipee
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-savoree-ink/70">
            Type or say a food you want to make, and we&apos;ll build a
            grocery list and a simple 3-step recipe.
          </p>
        </div>

        <form
          onSubmit={handleGenerate}
          className="mt-8 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:p-3 sm:pl-5"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. spaghetti, tacos, chicken nuggets..."
            className="flex-1 bg-transparent py-2 text-base outline-none placeholder:text-savoree-ink/40"
          />
          <div className="flex gap-2">
            {speechSupported && (
              <button
                type="button"
                onClick={toggleVoice}
                aria-pressed={listening}
                aria-label={listening ? "Stop voice input" : "Start voice input"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg transition ${
                  listening
                    ? "animate-pulse bg-savoree-coral text-white"
                    : "bg-savoree-sand text-savoree-ink hover:bg-savoree-sand/70"
                }`}
              >
                🎙️
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex-1 rounded-full bg-savoree-neon px-6 py-3 text-sm font-bold text-savoree-ink shadow-md shadow-savoree-neon/30 transition hover:bg-savoree-neon-dark disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {loading ? "Cooking it up..." : "Generate Recipe"}
            </button>
          </div>
        </form>

        {recipe && (
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-md sm:p-8">
            <h3 className="font-display text-2xl font-semibold">
              {recipe.recipeName}
            </h3>

            <div className="mt-5">
              <h4 className="font-display text-lg font-semibold">
                🛒 Grocery List
              </h4>
              <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {recipe.groceryList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-savoree-ink/80"
                  >
                    <span className="mt-0.5 text-savoree-blue">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-display text-lg font-semibold">
                👩‍🍳 3 Steps
              </h4>
              <ol className="mt-3 flex flex-col gap-3">
                {recipe.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="flex gap-3 rounded-2xl bg-savoree-sand/60 p-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-savoree-blue font-display text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-savoree-ink">
                        Step {index + 1}: {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-savoree-ink/70">
                        {step.instruction}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-7 rounded-2xl border-2 border-dashed border-savoree-amber/50 bg-savoree-amber/10 p-4">
              {smsStatus ? (
                <div className="text-sm">
                  <p className="font-bold text-savoree-ink">
                    📱 Simulated text sent to {smsStatus.sentTo}
                  </p>
                  <p className="mt-1 text-savoree-ink/70">
                    &ldquo;{smsStatus.body}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-savoree-ink/50">
                    This is a simulation — no real message was sent.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleOrderIngredients}
                  className="flex flex-col gap-2.5"
                >
                  <p className="text-sm font-bold text-savoree-ink">
                    🔒 Order Ingredients (Parent Permission Required)
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="tel"
                      required
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      placeholder="Parent's phone number"
                      className="flex-1 rounded-full border-2 border-savoree-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-savoree-blue"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-savoree-amber px-5 py-2.5 text-sm font-bold text-savoree-ink transition hover:brightness-95"
                    >
                      Ask a Grown-Up
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
