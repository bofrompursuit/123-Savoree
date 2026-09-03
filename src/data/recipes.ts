export type RecipeStep = {
  title: string;
  detail: string;
};

export type Recipe = {
  id: string;
  title: string;
  country: string;
  flag: string;
  image: string;
  ingredients: string[];
  steps: [RecipeStep, RecipeStep, RecipeStep];
};

export const recipes: Recipe[] = [
  {
    id: "quesadillas",
    title: "Quesadillas",
    country: "Mexico",
    flag: "🇲🇽",
    image:
      "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "2 flour tortillas",
      "1 cup shredded cheddar or Mexican-blend cheese",
      "1/4 cup cooked chicken or black beans (optional)",
      "1 tbsp butter",
      "Salsa & sour cream for dipping",
    ],
    steps: [
      { title: "Fill", detail: "Sprinkle cheese (and chicken or beans) evenly over one tortilla." },
      { title: "Fold & Crisp", detail: "Top with the second tortilla, then cook in a buttered pan 2-3 minutes per side until golden and the cheese melts." },
      { title: "Slice", detail: "Slide onto a cutting board, slice into wedges, and serve with salsa." },
    ],
  },
  {
    id: "caprese-salad",
    title: "Caprese Salad",
    country: "Italy",
    flag: "🇮🇹",
    image:
      "https://images.unsplash.com/photo-1595587870672-c79b47875c6a?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "2 large tomatoes",
      "8 oz fresh mozzarella",
      "1 handful fresh basil leaves",
      "2 tbsp olive oil",
      "Salt & pepper to taste",
    ],
    steps: [
      { title: "Slice", detail: "Slice the tomatoes and mozzarella into rounds about the same thickness." },
      { title: "Arrange", detail: "Layer tomato, mozzarella, and a basil leaf in a circle on a plate, alternating pieces." },
      { title: "Season", detail: "Drizzle with olive oil and a pinch of salt and pepper right before serving." },
    ],
  },
  {
    id: "egg-fried-rice",
    title: "Egg Fried Rice",
    country: "China",
    flag: "🇨🇳",
    image:
      "https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "2 cups cooked, cooled rice",
      "2 eggs, beaten",
      "1/2 cup frozen peas & carrots",
      "2 tbsp soy sauce",
      "1 tbsp vegetable oil",
      "1 green onion, sliced",
    ],
    steps: [
      { title: "Scramble", detail: "Heat oil in a large pan and scramble the eggs, then push to one side." },
      { title: "Stir-Fry", detail: "Add rice and peas & carrots to the pan and stir-fry for 3-4 minutes until hot." },
      { title: "Combine", detail: "Mix in the eggs and soy sauce, toss everything together, and top with green onion." },
    ],
  },
  {
    id: "chicken-teriyaki-skewers",
    title: "Chicken Teriyaki Skewers",
    country: "Japan",
    flag: "🇯🇵",
    image:
      "https://images.unsplash.com/photo-1783788357923-649e29b7b006?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 lb chicken breast, cubed",
      "1/2 cup teriyaki sauce",
      "1 bell pepper, chunked",
      "Wooden skewers (soaked in water)",
      "Sesame seeds to garnish",
    ],
    steps: [
      { title: "Marinate", detail: "Toss chicken cubes in teriyaki sauce and let sit for at least 20 minutes." },
      { title: "Thread", detail: "Thread chicken and pepper chunks onto skewers, alternating pieces." },
      { title: "Cook", detail: "Grill or pan-cook 4-5 minutes per side until chicken is fully cooked, then sprinkle with sesame seeds." },
    ],
  },
  {
    id: "greek-tzatziki-dip",
    title: "Greek Tzatziki Dip",
    country: "Greece",
    flag: "🇬🇷",
    image:
      "https://images.unsplash.com/photo-1591120583691-49d2741e55da?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 cup Greek yogurt",
      "1/2 cucumber, grated & squeezed dry",
      "1 clove garlic, minced",
      "1 tbsp olive oil",
      "1 tsp lemon juice",
      "Pinch of salt",
    ],
    steps: [
      { title: "Prep", detail: "Grate the cucumber and squeeze out the extra water with a clean towel." },
      { title: "Mix", detail: "Stir together yogurt, cucumber, garlic, olive oil, lemon juice, and salt in a bowl." },
      { title: "Chill", detail: "Cover and refrigerate for at least 30 minutes so the flavors blend, then serve with pita." },
    ],
  },
  {
    id: "lumpia-shanghai",
    title: "Lumpia Shanghai",
    country: "Philippines",
    flag: "🇵🇭",
    image:
      "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 lb ground pork",
      "1/4 cup minced carrots",
      "1/4 cup minced green onion",
      "20 lumpia (spring roll) wrappers",
      "1 tsp soy sauce",
      "Oil for frying",
    ],
    steps: [
      { title: "Mix", detail: "Combine pork, carrots, green onion, and soy sauce in a bowl until well mixed." },
      { title: "Roll", detail: "Spoon filling onto a wrapper and roll tightly into a thin cylinder, sealing the edge with water." },
      { title: "Fry", detail: "Fry in hot oil, turning often, until golden brown and crispy — about 5 minutes." },
    ],
  },
  {
    id: "shakshuka",
    title: "Shakshuka",
    country: "North Africa / Middle East",
    flag: "🌍",
    image:
      "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 can crushed tomatoes",
      "1/2 onion, diced",
      "1 bell pepper, diced",
      "4 eggs",
      "1 tsp cumin & paprika",
      "Fresh parsley to garnish",
    ],
    steps: [
      { title: "Simmer", detail: "Sauté onion and pepper, then add tomatoes and spices and simmer 10 minutes." },
      { title: "Crack", detail: "Make small wells in the sauce and crack an egg into each one." },
      { title: "Cover", detail: "Cover the pan and cook 5-6 minutes until the egg whites are set, then top with parsley." },
    ],
  },
  {
    id: "mango-lassi",
    title: "Mango Lassi",
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 ripe mango, peeled & chopped (or 1 cup frozen mango)",
      "1 cup plain yogurt",
      "1/2 cup milk",
      "1 tbsp honey",
      "Pinch of ground cardamom",
    ],
    steps: [
      { title: "Combine", detail: "Add mango, yogurt, milk, honey, and cardamom to a blender." },
      { title: "Blend", detail: "Blend until smooth and creamy, about 30-45 seconds." },
      { title: "Serve", detail: "Pour into glasses over ice and enjoy right away." },
    ],
  },
];
