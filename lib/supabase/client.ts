"use client";

import { createBrowserClient } from "@supabase/ssr";

// Single browser-side Supabase client. Safe to import in client components.
// Reads `NEXT_PUBLIC_*` vars so they're inlined at build time.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
