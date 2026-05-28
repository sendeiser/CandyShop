import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Login() {
  const ref = useScrollReveal()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
      return
    }
    navigate('/')
  }

  return (
    <div ref={ref} className="scroll-reveal relative mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-6 top-20 h-8 w-8 rounded-full border-2 border-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
        <div className="absolute right-4 bottom-20 h-5 w-5 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
        <div className="absolute left-1/3 bottom-8 h-3 w-3 rounded-full bg-[#4dd3e0]/15" style={{ animation: 'float-slow 3.5s ease-in-out 1s infinite' }} />
      </div>
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#26c6da]/10">
            <LogIn className="h-6 w-6 text-[#26c6da]" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1a3a2e]">Iniciar Sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#ec4899] py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-[#db2777] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿No tenés cuenta?{' '}
          <Link to="/auth/register" className="font-semibold text-[#26c6da] hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  )
}
