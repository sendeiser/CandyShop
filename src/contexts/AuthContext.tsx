import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { getCurrentProfile } from '../lib/api'
import type { Profile } from '../types'

interface AuthContextType {
  user: Profile | null
  loading: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
  refresh: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async () => {
    const profile = await getCurrentProfile()
    setUser(profile)
    setLoading(false)
  }

  useEffect(() => {
    loadProfile()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadProfile()
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin: user?.role === 'admin', signOut, refresh: loadProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
