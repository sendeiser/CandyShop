import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Register() {
  const ref = useScrollReveal()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
      return
    }
    alert('Registro exitoso. Revisá tu email para confirmar la cuenta.')
    navigate('/auth/login')
  }

  return (
    <div ref={ref} className="scroll-reveal relative mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-6 top-20 h-8 w-8 rounded-full border-2 border-candy/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-4 bottom-20 h-5 w-5 rounded-lg bg-mint/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
          <div className="absolute left-2/3 top-12 h-3 w-3 rounded-full bg-cotton/15" style={{ animation: 'float-slow 3.5s ease-in-out 2s infinite' }} />
        </div>
      </div>
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm animate-fade-in-up">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-candy/10">
            <UserPlus className="h-6 w-6 text-candy" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-chocolate">Crear Cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <div>
            <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="reg-name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20"
            />
          </div>
          <div>
            <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <input
              id="reg-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20"
            />
          </div>
          <div>
            <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="reg-password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20"
            />
          </div>
          <div>
            <label htmlFor="reg-confirm" className="mb-1.5 block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              id="reg-confirm"
              type="password"
              placeholder="Repetí la contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-candy py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-candy-dark active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tenés cuenta?{' '}
          <Link to="/auth/login" className="font-semibold text-candy hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
