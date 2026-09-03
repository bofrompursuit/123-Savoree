"use client";

import Image from "next/image";
import Modal from "./Modal";
import type { Recipe } from "@/data/recipes";

export default function RecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe | null;
  onClose: () => void;
}) {
  return (
    <Modal open={recipe !== null} onClose={onClose} labelledBy="recipe-modal-title">
      {recipe && (
        <>
          <div className="relative -mx-6 -mt-6 h-44 overflow-hidden rounded-t-3xl sm:-mx-8 sm:-mt-8 sm:h-56">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          </div>

          <div className="mt-5">
            <span className="text-sm font-bold text-savoree-navy">
              {recipe.flag} {recipe.country}
            </span>
            <h2
              id="recipe-modal-title"
              className="font-display text-2xl font-semibold sm:text-3xl"
            >
              {recipe.title}
            </h2>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold text-savoree-ink">
              Ingredients
            </h3>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-2 text-sm text-savoree-ink/80"
                >
                  <span className="mt-0.5 text-savoree-blue">●</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold text-savoree-ink">
              How to Make It
            </h3>
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
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </Modal>
  );
}
