import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createOrder } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Checkout() {
  const ref = useScrollReveal()
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    zip: '',
  })

  useEffect(() => {
    if (items.length === 0) {
      navigate('/carrito')
    }
  }, [items, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError('Debés iniciar sesión para comprar')
      return
    }
    setError('')
    setSubmitting(true)

    try {
      await createOrder({
        user_id: user.id,
        total: totalPrice,
        shipping_address: form,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          weight_label: item.weight.label,
          unit_price: item.weight.price,
        })),
      })
      clearCart()
      alert('¡Pedido confirmado! Te vamos a contactar para coordinar el pago y envío.')
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div ref={ref} className="scroll-reveal relative mx-auto max-w-7xl px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-4 top-16 h-6 w-6 rounded-full bg-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-12 bottom-24 h-4 w-4 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1s infinite' }} />
          <div className="absolute left-1/2 top-12 h-3 w-3 rounded-full bg-[#4dd3e0]/15" style={{ animation: 'float-slow 3.5s ease-in-out 2s infinite' }} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-[#1a3a2e] sm:text-4xl animate-fade-in-up">Finalizar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a3a2e]">Datos de Envío</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input type="text" name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
                <input type="tel" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
                <input type="text" name="street" placeholder="Dirección" value={form.street} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20 sm:col-span-2" />
                <input type="text" name="city" placeholder="Localidad" value={form.city} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
                <input type="text" name="province" placeholder="Provincia" value={form.province} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
                <input type="text" name="zip" placeholder="Código Postal" value={form.zip} onChange={handleChange} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-[#1a3a2e]">Resumen del Pedido</h2>
            {!user && (
              <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Necesitás <a href="/auth/login" className="font-semibold underline">iniciar sesión</a> para comprar
              </div>
            )}
            {error && (
              <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.weight.grams}`} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} <span className="text-gray-400">({item.weight.label})</span>
                    <span className="text-gray-400"> x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-800">${(item.weight.price * item.quantity).toLocaleString('es-AR')}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Productos ({totalItems})</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-bold text-[#1a3a2e]">Total</span>
                <span className="text-xl font-bold text-[#26c6da]">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || !user}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ec4899] py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-[#db2777] active:scale-95 disabled:opacity-50"
            >
              <ShoppingBag className="h-5 w-5" />
              {submitting ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
