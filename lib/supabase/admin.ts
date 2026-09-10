import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Server-only Supabase client with Service Role privileges.
 * Bypasses Row Level Security (RLS) for trusted server operations,
 * background aggregations, and local development data hydration.
 *
 * CAUTION: Never expose this client or the service role key to the browser!
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const key = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createSupabaseClient<Database>(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
