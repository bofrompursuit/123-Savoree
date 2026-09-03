import Image from "next/image";
import type { Recipe } from "@/data/recipes";

export default function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(recipe)}
      className="group w-64 shrink-0 overflow-hidden rounded-3xl bg-white text-left shadow-md shadow-savoree-ink/5 transition hover:-translate-y-1 hover:shadow-xl sm:w-72"
    >
      <div className="relative h-40 w-full overflow-hidden sm:h-44">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 256px, 288px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg shadow">
          {recipe.flag}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-savoree-navy">
          {recipe.country}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-savoree-ink">
          {recipe.title}
        </h3>
      </div>
    </button>
  );
}
