import { getSupabaseClient } from "./supabase";
import type { CommunityPost } from "@/data/community";

export type CommunitySubmission = {
  title: string;
  author: string;
  category: CommunityPost["category"];
};

// The submission form only collects title/author/category — there's no
// real photo/video upload wired up yet (same "simulation for now" spirit
// as the SMS order flow), so every submission gets a placeholder image
// until that's built.
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=700&q=80&auto=format&fit=crop";

export async function submitCommunityPost(submission: CommunitySubmission): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("community_submissions").insert([
    {
      title: submission.title,
      author: submission.author,
      category: submission.category,
      image_url: PLACEHOLDER_IMAGE,
    },
  ]);

  if (error) throw error;
}

// The admin-review safeguard: community_submissions' RLS policy only lets
// anon SELECT rows where approved = true (see README's table SQL) — a new
// submission is invisible to everyone until an admin flips that flag from
// the Supabase dashboard/SQL editor.
export async function fetchApprovedSubmissions(): Promise<CommunityPost[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("community_submissions")
    .select("id, title, author, category, image_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[community] Failed to fetch approved submissions:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    author: row.author,
    category: row.category,
    image: row.image_url,
    approved: true,
  }));
}
