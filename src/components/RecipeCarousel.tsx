"use client";

import { useState } from "react";
import { recipes } from "@/data/recipes";
import type { Recipe } from "@/data/recipes";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

export default function RecipeCarousel() {
  const [selected, setSelected] = useState<Recipe | null>(null);
  const loop = [...recipes, ...recipes];

  return (
    <section id="recipes" className="bg-savoree-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-10">
          <span className="text-sm font-bold uppercase tracking-wide text-savoree-navy">
            Recipe Templates
          </span>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            8 Recipes, 3 Steps Each
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-savoree-ink/70">
            Tap a card to see the ingredients and steps. Hover to pause and
            browse at your own pace.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-savoree-cream to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-savoree-cream to-transparent sm:w-24" />

        <div className="flex w-max gap-5 hover:[animation-play-state:paused] animate-savoree-marquee">
          {loop.map((recipe, index) => (
            <RecipeCard
              key={`${recipe.id}-${index}`}
              recipe={recipe}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <RecipeModal recipe={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
