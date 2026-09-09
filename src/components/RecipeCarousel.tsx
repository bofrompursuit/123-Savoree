"use client";

import { useState } from "react";
import { recipes } from "@/data/recipes";
import { moreRecipes } from "@/data/moreRecipes";
import type { Recipe } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

// Hoisted out of the component so these doubled-up loops (for the seamless
// marquee effect) aren't rebuilt on every render — recipes/moreRecipes are
// static imports that never change.
const topLoop = [...recipes, ...recipes];
const bottomLoop = [...moreRecipes, ...moreRecipes];

function MarqueeRow({
  items,
  direction,
  onSelect,
}: {
  items: Recipe[];
  direction: "left" | "right";
  onSelect: (recipe: Recipe) => void;
}) {
  const animationClass =
    direction === "left" ? "animate-savoree-marquee" : "animate-savoree-marquee-reverse";

  return (
    <div className={`flex w-max gap-5 hover:[animation-play-state:paused] ${animationClass}`}>
      {items.map((recipe, index) => (
        <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function RecipeCarousel() {
  const [selected, setSelected] = useState<Recipe | null>(null);

  return (
    <section id="recipes" className="bg-savoree-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-sm font-bold uppercase tracking-wide text-savoree-navy">
            Recipe Templates
          </span>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tons of Recipes, 3 Steps Each
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-savoree-ink/70">
            Tap a card to see the ingredients and steps. Hover to pause and
            browse at your own pace.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-savoree-cream to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-savoree-cream to-transparent sm:w-24" />
          <MarqueeRow items={topLoop} direction="left" onSelect={setSelected} />
        </div>

        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-savoree-cream to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-savoree-cream to-transparent sm:w-24" />
          <MarqueeRow items={bottomLoop} direction="right" onSelect={setSelected} />
        </div>
      </div>

      <RecipeModal recipe={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
