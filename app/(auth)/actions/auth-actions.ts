'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete('vokid_role');
  cookieStore.delete('vokid_email');
  cookieStore.delete('vokid_grade');

  redirect('/login');
}
