import type { Recipe } from "./recipes";

// Toquee Travels' one fixed destination — kept separate from recipes.ts /
// moreRecipes.ts so those carousels' contents stay independently editable.
export const colombiaRecipe: Recipe = {
  id: "arepas-con-queso",
  title: "Arepas con Queso",
  country: "Colombia",
  flag: "🇨🇴",
  image:
    "https://images.unsplash.com/photo-1745376211713-04fa3ffa3722?w=800&q=80&auto=format&fit=crop",
  ingredients: [
    "1 cup arepa flour (masarepa)",
    "1 cup warm water",
    "1/2 tsp salt",
    "1/2 cup shredded mozzarella or queso fresco",
    "1 tbsp butter or oil for the pan",
  ],
  steps: [
    { title: "Mix", detail: "Stir the arepa flour, warm water, and salt together, then knead in the cheese until it forms a soft dough." },
    { title: "Shape", detail: "Roll the dough into balls and flatten each into a disc about 1/2-inch thick." },
    { title: "Cook", detail: "Ask a grown-up to cook the arepas in a buttered pan 4-5 minutes per side until golden with a crisp crust." },
  ],
};

export type ColombiaFact = {
  label: string;
  fact: string;
};

export const colombiaFacts: ColombiaFact[] = [
  {
    label: "Arepas 🫓",
    fact: "Arepas are grilled corn cakes Colombians eat with almost every meal — breakfast, lunch, and dinner!",
  },
  {
    label: "Bandeja Paisa 🍽️",
    fact: "Bandeja Paisa piles beans, rice, meat, egg, plantain, and avocado onto one giant plate — a whole feast!",
  },
  {
    label: "Colombian Coffee ☕",
    fact: "Colombia's mountain farms grow some of the world's most famous coffee, thanks to rich volcanic soil.",
  },
  {
    label: "Patacones 🍌",
    fact: "Patacones are green plantains smashed flat and fried twice, until they're crispy, salty, and golden.",
  },
  {
    label: "Tropical Fruit 🥭",
    fact: "Colombia grows an incredible variety of fruit — lulo, guanábana, and maracuyá you won't find everywhere!",
  },
  {
    label: "Buñuelos 🎄",
    fact: "Buñuelos are cheesy fried dough balls, a favorite treat during Colombian Christmas celebrations.",
  },
  {
    label: "Caribbean Coast 🏖️",
    fact: "Cartagena's colorful coastal streets are famous for fresh seafood, coconut rice, and ocean breezes.",
  },
  {
    label: "Cumbia Music 🎶",
    fact: "Cumbia is a lively Colombian music and dance style — perfect for a kitchen dance break while you cook!",
  },
];
