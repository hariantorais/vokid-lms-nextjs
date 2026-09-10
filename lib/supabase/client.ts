import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return typed browser client with fallback for build/test environments
    return createBrowserClient<Database>(
      supabaseUrl ?? 'https://placeholder.supabase.co',
      supabaseAnonKey ?? 'placeholder-key'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
