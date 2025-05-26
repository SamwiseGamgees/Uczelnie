import { useUser } from '@supabase/auth-helpers-react'

export function useIsLoggedIn(): boolean {
  const user = useUser()
  return Boolean(user)
}