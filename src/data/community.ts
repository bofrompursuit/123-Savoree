export type CommunityPost = {
  id: string;
  title: string;
  author: string;
  category: "Quick Recipe" | "15-Second Skill" | "Kitchen Safety" | "Food Challenge";
  image: string;
  approved: boolean;
};

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    title: "3-Ingredient Mug Brownie",
    author: "ChefMila_9",
    category: "Quick Recipe",
    image:
      "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-2",
    title: "How to Crack an Egg One-Handed",
    author: "KitchenKiddo",
    category: "15-Second Skill",
    image:
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-3",
    title: "Always Ask a Grown-Up Before Using the Stove",
    author: "SafetyFirstSam",
    category: "Kitchen Safety",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-4",
    title: "The Great Pancake Flip Challenge",
    author: "FlipMasterJo",
    category: "Food Challenge",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-5",
    title: "Rainbow Fruit Skewers in 3 Steps",
    author: "SnackQueenAva",
    category: "Quick Recipe",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-6",
    title: "How to Wash Your Hands Like a Chef",
    author: "CleanCookCarlos",
    category: "Kitchen Safety",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-7",
    title: "Perfect Toast Art in 15 Seconds",
    author: "ToastyTheo",
    category: "15-Second Skill",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
  {
    id: "post-8",
    title: "Guess-the-Spice Blindfold Challenge",
    author: "SpiceDetective",
    category: "Food Challenge",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=80&auto=format&fit=crop",
    approved: true,
  },
];

export const categoryColors: Record<CommunityPost["category"], string> = {
  "Quick Recipe": "bg-savoree-blue/10 text-savoree-navy",
  "15-Second Skill": "bg-savoree-amber/15 text-amber-700",
  "Kitchen Safety": "bg-savoree-coral/10 text-red-600",
  "Food Challenge": "bg-purple-100 text-purple-700",
};
