import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// This is a Supabase *publishable* key — Supabase's own docs mark this key
// type as safe to ship in client-side code (unlike a service-role key):
// access is governed by Row Level Security policies on the table, not by
// keeping this value secret. Baked in as the default so the GitHub Pages
// static build works without needing repo/CI secrets; NEXT_PUBLIC_* env
// vars (see .env.local.example) still override it for local dev against a
// different project.
const DEFAULT_SUPABASE_URL = "https://poulhwsduritdmjkxopv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_BTYR3kv03PRw4VSlGU0qZg_5kPeX9yJ";

let client: SupabaseClient | undefined;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  client = createClient(url, anonKey);
  return client;
}
