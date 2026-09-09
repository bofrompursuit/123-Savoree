import type { Recipe } from "./recipes";

// A second set of 8 quick 3-step recipes for the Recipe Templates section's
// bottom carousel row — kept in its own file so the top row's "recipes"
// array (and the "Tons of Recipes" heading count) stays independently
// editable.
export const moreRecipes: Recipe[] = [
  {
    id: "avocado-toast",
    title: "Avocado Toast",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1761027101409-fa96d88349c7?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 ripe avocado",
      "2 slices bread",
      "Squeeze of lemon juice",
      "Salt & pepper to taste",
      "Red pepper flakes (optional)",
    ],
    steps: [
      { title: "Toast", detail: "Toast the bread slices until golden and crisp." },
      { title: "Mash", detail: "Mash the avocado with lemon juice, salt, and pepper in a bowl." },
      { title: "Spread", detail: "Spread the mashed avocado onto the toast and sprinkle with red pepper flakes." },
    ],
  },
  {
    id: "french-bread-pizza",
    title: "French Bread Pizza",
    country: "France",
    flag: "🇫🇷",
    image:
      "https://images.unsplash.com/photo-1567995515299-d6c77c005109?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 loaf French bread, halved lengthwise",
      "1/2 cup pizza sauce",
      "1 cup shredded mozzarella",
      "Toppings you like (pepperoni, peppers, olives)",
    ],
    steps: [
      { title: "Spread", detail: "Spread pizza sauce evenly over each bread half." },
      { title: "Top", detail: "Sprinkle on cheese and your favorite toppings." },
      { title: "Bake", detail: "Ask a grown-up to bake at 400°F for 10-12 minutes until the cheese melts and bubbles." },
    ],
  },
  {
    id: "banana-pancakes",
    title: "Banana Pancakes",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1441850655526-e2881818c568?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 cup pancake mix",
      "1 ripe banana, mashed",
      "3/4 cup milk",
      "1 egg",
      "Butter or oil for the pan",
    ],
    steps: [
      { title: "Mix", detail: "Stir the pancake mix, mashed banana, milk, and egg together in a bowl." },
      { title: "Pour", detail: "Ask a grown-up to help pour small circles of batter onto a warm, buttered pan." },
      { title: "Flip", detail: "Flip each pancake when bubbles form on top, then cook until golden." },
    ],
  },
  {
    id: "berry-smoothie-bowl",
    title: "Berry Smoothie Bowl",
    country: "Brazil",
    flag: "🇧🇷",
    image:
      "https://images.unsplash.com/photo-1645839449196-62bde406052e?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 cup frozen mixed berries",
      "1/2 frozen banana",
      "1/4 cup yogurt or milk",
      "Granola, fresh fruit, and honey to top",
    ],
    steps: [
      { title: "Blend", detail: "Blend the frozen berries, banana, and yogurt until thick and smooth." },
      { title: "Pour", detail: "Pour the smoothie into a bowl." },
      { title: "Top", detail: "Add granola, fresh fruit, and a drizzle of honey on top." },
    ],
  },
  {
    id: "guacamole",
    title: "Guacamole",
    country: "Mexico",
    flag: "🇲🇽",
    image:
      "https://plus.unsplash.com/premium_photo-1681406689558-d760b5b5c453?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "2 ripe avocados",
      "1 lime, juiced",
      "2 tbsp diced onion",
      "2 tbsp chopped cilantro",
      "Salt to taste",
      "Tortilla chips for dipping",
    ],
    steps: [
      { title: "Mash", detail: "Mash the avocados in a bowl, leaving it a little chunky." },
      { title: "Mix", detail: "Stir in lime juice, onion, cilantro, and salt." },
      { title: "Serve", detail: "Serve right away with tortilla chips for dipping." },
    ],
  },
  {
    id: "hummus-bowl",
    title: "Hummus Bowl",
    country: "Lebanon",
    flag: "🇱🇧",
    image:
      "https://plus.unsplash.com/premium_photo-1666649675150-a50020a5d37f?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 cup hummus",
      "1 tbsp olive oil",
      "Cherry tomatoes, cucumber, and bell pepper, diced",
      "Pita bread, cut into triangles",
    ],
    steps: [
      { title: "Spread", detail: "Spread the hummus in a shallow bowl and drizzle with olive oil." },
      { title: "Top", detail: "Arrange the diced veggies on top of the hummus." },
      { title: "Dip", detail: "Serve with warm pita triangles for dipping." },
    ],
  },
  {
    id: "mini-quesadillas",
    title: "Mini Quesadillas",
    country: "Mexico",
    flag: "🇲🇽",
    image:
      "https://images.unsplash.com/photo-1628838233717-be047a0b54fb?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "4 small flour tortillas",
      "1 cup shredded cheese",
      "1 tbsp butter",
      "Salsa for dipping",
    ],
    steps: [
      { title: "Fill", detail: "Sprinkle cheese over half of each tortilla, then fold in half." },
      { title: "Cook", detail: "Ask a grown-up to cook each in a buttered pan 1-2 minutes per side until golden." },
      { title: "Cut", detail: "Slice into wedges and serve with salsa." },
    ],
  },
  {
    id: "parfait",
    title: "Parfait",
    country: "Greece",
    flag: "🇬🇷",
    image:
      "https://images.unsplash.com/photo-1567769541495-338ee7203e3c?w=800&q=80&auto=format&fit=crop",
    ingredients: [
      "1 cup yogurt",
      "1/2 cup granola",
      "1/2 cup mixed berries",
      "Honey to drizzle",
    ],
    steps: [
      { title: "Layer", detail: "Spoon a layer of yogurt into a cup or bowl." },
      { title: "Add", detail: "Add a layer of granola, then a layer of berries." },
      { title: "Repeat", detail: "Repeat the layers until the cup is full, drizzle with honey, and dig in." },
    ],
  },
];
