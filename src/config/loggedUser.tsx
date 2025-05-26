import { useUser } from '@supabase/auth-helpers-react'
import type { User } from '@supabase/supabase-js';

export function findUser(): User | null {
  const user = useUser()
  return user;
}
