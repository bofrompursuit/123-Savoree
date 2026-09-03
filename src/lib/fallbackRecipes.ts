// A small curated recipe library so "...more One Two Three Recipee" and
// Toquee still work with zero setup — no API key, no cost, no network call.
// Used automatically whenever ANTHROPIC_API_KEY isn't configured (see
// isAnthropicConfigured() in anthropic.ts). Once a real key is added, both
// features switch to Claude-generated recipes instead.

export type FallbackRecipe = {
  recipeName: string;
  groceryList: string[];
  steps: { title: string; instruction: string }[];
};

type LibraryEntry = { keywords: string[]; recipe: FallbackRecipe };

const LIBRARY: LibraryEntry[] = [
  {
    keywords: ["pizza"],
    recipe: {
      recipeName: "Mini English Muffin Pizzas",
      groceryList: ["English muffins", "Pizza sauce", "Shredded mozzarella", "Toppings you like"],
      steps: [
        { title: "Spread", instruction: "Split the muffins and spread a spoonful of sauce on each half." },
        { title: "Top", instruction: "Sprinkle on cheese and your favorite toppings." },
        { title: "Bake", instruction: "Ask a grown-up to bake at 400°F for 8-10 minutes until the cheese melts." },
      ],
    },
  },
  {
    keywords: ["taco"],
    recipe: {
      recipeName: "Build-Your-Own Tacos",
      groceryList: ["Soft or hard taco shells", "Cooked ground beef or beans", "Shredded cheese", "Lettuce and salsa"],
      steps: [
        { title: "Warm", instruction: "Ask a grown-up to warm the shells and the filling." },
        { title: "Fill", instruction: "Spoon the filling into each shell." },
        { title: "Top", instruction: "Add cheese, lettuce, and salsa, then fold and enjoy." },
      ],
    },
  },
  {
    keywords: ["spaghetti", "pasta", "noodle"],
    recipe: {
      recipeName: "Simple Spaghetti",
      groceryList: ["Spaghetti noodles", "Jarred pasta sauce", "Parmesan cheese", "Salt for the water"],
      steps: [
        { title: "Boil", instruction: "Ask a grown-up to boil the noodles in salted water until soft." },
        { title: "Warm Sauce", instruction: "Warm the pasta sauce in a small pot while the noodles cook." },
        { title: "Combine", instruction: "Drain the noodles, mix with the sauce, and top with cheese." },
      ],
    },
  },
  {
    keywords: ["grilled cheese"],
    recipe: {
      recipeName: "Golden Grilled Cheese",
      groceryList: ["Bread", "Cheese slices", "Butter"],
      steps: [
        { title: "Butter", instruction: "Spread butter on one side of each bread slice." },
        { title: "Stack", instruction: "Put cheese between the bread, butter-side out." },
        { title: "Grill", instruction: "Ask a grown-up to cook it in a pan 2-3 minutes per side until golden." },
      ],
    },
  },
  {
    keywords: ["pancake"],
    recipe: {
      recipeName: "Fluffy Pancakes",
      groceryList: ["Pancake mix", "Milk", "Egg", "Butter or oil for the pan"],
      steps: [
        { title: "Mix", instruction: "Stir the pancake mix, milk, and egg together in a bowl." },
        { title: "Pour", instruction: "Ask a grown-up to help pour small circles of batter onto a warm pan." },
        { title: "Flip", instruction: "Flip each pancake when bubbles form on top, then cook until golden." },
      ],
    },
  },
  {
    keywords: ["smoothie"],
    recipe: {
      recipeName: "Fruity Smoothie",
      groceryList: ["Frozen fruit", "Yogurt", "Milk or juice", "Honey (optional)"],
      steps: [
        { title: "Combine", instruction: "Add fruit, yogurt, and milk to a blender." },
        { title: "Blend", instruction: "Ask a grown-up to help blend until smooth." },
        { title: "Pour", instruction: "Pour into a glass and enjoy right away." },
      ],
    },
  },
  {
    keywords: ["quesadilla"],
    recipe: {
      recipeName: "Cheesy Quesadilla",
      groceryList: ["Flour tortillas", "Shredded cheese", "Butter"],
      steps: [
        { title: "Fill", instruction: "Sprinkle cheese over one tortilla." },
        { title: "Fold", instruction: "Top with a second tortilla and press together." },
        { title: "Cook", instruction: "Ask a grown-up to cook in a buttered pan until golden and melty, then slice." },
      ],
    },
  },
  {
    keywords: ["salad"],
    recipe: {
      recipeName: "Rainbow Salad",
      groceryList: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Your favorite dressing"],
      steps: [
        { title: "Wash", instruction: "Rinse the greens and vegetables well." },
        { title: "Chop", instruction: "Ask a grown-up to help chop the veggies into bite-size pieces." },
        { title: "Toss", instruction: "Combine everything in a bowl and drizzle with dressing." },
      ],
    },
  },
  {
    keywords: ["sandwich", "pb&j", "peanut butter"],
    recipe: {
      recipeName: "PB&J Sandwich",
      groceryList: ["Bread", "Peanut butter", "Jelly"],
      steps: [
        { title: "Spread", instruction: "Spread peanut butter on one slice and jelly on the other." },
        { title: "Stack", instruction: "Press the two slices together." },
        { title: "Slice", instruction: "Cut into triangles and enjoy." },
      ],
    },
  },
  {
    keywords: ["mac and cheese", "macaroni"],
    recipe: {
      recipeName: "Creamy Mac and Cheese",
      groceryList: ["Macaroni noodles", "Shredded cheese", "Milk", "Butter"],
      steps: [
        { title: "Boil", instruction: "Ask a grown-up to boil the noodles until soft, then drain." },
        { title: "Melt", instruction: "Stir in butter, milk, and cheese over low heat until melty." },
        { title: "Serve", instruction: "Mix well and dish it up warm." },
      ],
    },
  },
  {
    keywords: ["fried rice"],
    recipe: {
      recipeName: "Egg Fried Rice",
      groceryList: ["Cooked, cooled rice", "Eggs", "Frozen peas and carrots", "Soy sauce"],
      steps: [
        { title: "Scramble", instruction: "Ask a grown-up to scramble the eggs in a hot pan." },
        { title: "Stir-Fry", instruction: "Add the rice and veggies, stirring for a few minutes." },
        { title: "Combine", instruction: "Mix in the eggs and soy sauce, then serve warm." },
      ],
    },
  },
  {
    keywords: ["nacho"],
    recipe: {
      recipeName: "Cheesy Nachos",
      groceryList: ["Tortilla chips", "Shredded cheese", "Salsa"],
      steps: [
        { title: "Layer", instruction: "Spread chips on a baking sheet." },
        { title: "Top", instruction: "Sprinkle cheese evenly over the chips." },
        { title: "Melt", instruction: "Ask a grown-up to bake or microwave until the cheese melts, then add salsa." },
      ],
    },
  },
  {
    keywords: ["burrito"],
    recipe: {
      recipeName: "Simple Burrito",
      groceryList: ["Large tortilla", "Cooked rice or beans", "Cheese", "Salsa"],
      steps: [
        { title: "Fill", instruction: "Spoon rice, beans, and cheese into the middle of the tortilla." },
        { title: "Roll", instruction: "Fold in the sides, then roll it up tightly." },
        { title: "Warm", instruction: "Ask a grown-up to warm it in a pan for a minute on each side." },
      ],
    },
  },
  {
    keywords: ["waffle"],
    recipe: {
      recipeName: "Crispy Waffles",
      groceryList: ["Waffle mix", "Milk", "Egg", "Syrup for topping"],
      steps: [
        { title: "Mix", instruction: "Stir together the waffle mix, milk, and egg." },
        { title: "Cook", instruction: "Ask a grown-up to help pour batter into a hot waffle iron." },
        { title: "Top", instruction: "Add syrup or fruit and enjoy warm." },
      ],
    },
  },
  {
    keywords: ["oatmeal"],
    recipe: {
      recipeName: "Cozy Oatmeal",
      groceryList: ["Oats", "Milk or water", "Honey or fruit for topping"],
      steps: [
        { title: "Combine", instruction: "Add oats and milk or water to a bowl or pot." },
        { title: "Cook", instruction: "Ask a grown-up to microwave or stovetop-cook until thick and warm." },
        { title: "Top", instruction: "Add honey, fruit, or your favorite toppings." },
      ],
    },
  },
  {
    keywords: ["chicken nugget"],
    recipe: {
      recipeName: "Baked Chicken Nuggets",
      groceryList: ["Frozen chicken nuggets", "Dipping sauce"],
      steps: [
        { title: "Preheat", instruction: "Ask a grown-up to preheat the oven as the box directs." },
        { title: "Bake", instruction: "Spread nuggets on a tray and bake until golden and hot." },
        { title: "Dip", instruction: "Let them cool a bit, then serve with your favorite dipping sauce." },
      ],
    },
  },
  {
    keywords: ["scrambled egg", "eggs"],
    recipe: {
      recipeName: "Fluffy Scrambled Eggs",
      groceryList: ["Eggs", "Milk (splash)", "Butter", "Salt and pepper"],
      steps: [
        { title: "Whisk", instruction: "Crack the eggs into a bowl, add a splash of milk, and whisk together." },
        { title: "Cook", instruction: "Ask a grown-up to melt butter in a pan and pour in the eggs." },
        { title: "Stir", instruction: "Gently stir until fluffy and just set, then season and serve." },
      ],
    },
  },
  {
    keywords: ["popcorn"],
    recipe: {
      recipeName: "Movie-Night Popcorn",
      groceryList: ["Popcorn kernels or microwave popcorn", "Butter or oil", "Salt"],
      steps: [
        { title: "Pop", instruction: "Ask a grown-up to help pop the popcorn on the stove or in the microwave." },
        { title: "Season", instruction: "Drizzle with a little butter and sprinkle with salt." },
        { title: "Toss", instruction: "Toss it all together in a big bowl and enjoy." },
      ],
    },
  },
  {
    keywords: ["yogurt parfait", "parfait"],
    recipe: {
      recipeName: "Yogurt Parfait",
      groceryList: ["Yogurt", "Granola", "Berries or fruit"],
      steps: [
        { title: "Layer", instruction: "Spoon a layer of yogurt into a cup or bowl." },
        { title: "Add", instruction: "Add a layer of granola, then a layer of fruit." },
        { title: "Repeat", instruction: "Repeat the layers until the cup is full, then dig in." },
      ],
    },
  },
  {
    keywords: ["fruit salad"],
    recipe: {
      recipeName: "Colorful Fruit Salad",
      groceryList: ["A mix of your favorite fruits", "A squeeze of lemon juice (optional)"],
      steps: [
        { title: "Wash", instruction: "Rinse all the fruit well." },
        { title: "Chop", instruction: "Ask a grown-up to help chop the fruit into bite-size pieces." },
        { title: "Mix", instruction: "Toss everything together in a big bowl and serve chilled." },
      ],
    },
  },
];

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function genericFallback(query: string): FallbackRecipe {
  const name = query.trim();
  const titled = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    recipeName: `Easy ${titled}`,
    groceryList: [
      `The main ingredients for ${name}`,
      "Your favorite seasoning",
      "A little butter or oil",
    ],
    steps: [
      {
        title: "Prep",
        instruction: `Ask a grown-up to help gather and wash everything you need for ${name}.`,
      },
      {
        title: "Cook",
        instruction: `Cook or mix everything together — ask a grown-up for help with the stove or oven.`,
      },
      {
        title: "Serve",
        instruction: `Plate it up and enjoy your ${name}!`,
      },
    ],
  };
}

export function getFallbackRecipe(query: string): FallbackRecipe {
  const q = normalize(query);
  const match = LIBRARY.find((entry) => entry.keywords.some((k) => q.includes(k)));
  return match ? match.recipe : genericFallback(query);
}

export function findFallbackRecipeMention(text: string): FallbackRecipe | null {
  const q = normalize(text);
  const match = LIBRARY.find((entry) => entry.keywords.some((k) => q.includes(k)));
  return match ? match.recipe : null;
}
