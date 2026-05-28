import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { createOrder } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  { num: 1, label: 'Carrito' },
  { num: 2, label: 'Envío' },
  { num: 3, label: 'Confirmar' },
]

export default function Checkout() {
  const ref = useScrollReveal()
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const currentStep = 2
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
    <div ref={ref} className="relative mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-chocolate sm:text-4xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Finalizar Compra
      </h1>

      <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  currentStep >= step.num
                    ? 'bg-candy text-white shadow-md shadow-candy/20'
                    : 'bg-gray-100 text-caramel'
                }`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {currentStep > step.num ? '✓' : step.num}
              </div>
              <span className={`mt-1 text-xs font-medium hidden sm:block ${currentStep >= step.num ? 'text-candy' : 'text-caramel'}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`step-connector w-16 sm:w-24 ${currentStep > step.num ? 'active' : ''}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-bubblegum/40 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-chocolate" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Datos de Envío</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Nombre completo</label>
                  <input id="checkout-name" type="text" name="name" placeholder="Juan Pérez" value={form.name} onChange={handleChange} required autoComplete="name" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Teléfono</label>
                  <input id="checkout-phone" type="tel" name="phone" placeholder="11 1234-5678" value={form.phone} onChange={handleChange} required autoComplete="tel" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="checkout-street" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Dirección</label>
                  <input id="checkout-street" type="text" name="street" placeholder="Calle y número" value={form.street} onChange={handleChange} required autoComplete="street-address" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
                <div>
                  <label htmlFor="checkout-city" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Localidad</label>
                  <input id="checkout-city" type="text" name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required autoComplete="address-level2" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
                <div>
                  <label htmlFor="checkout-province" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Provincia</label>
                  <input id="checkout-province" type="text" name="province" placeholder="Provincia" value={form.province} onChange={handleChange} required autoComplete="address-level1" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
                <div>
                  <label htmlFor="checkout-zip" className="mb-1.5 block text-sm font-medium text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>Código Postal</label>
                  <input id="checkout-zip" type="text" name="zip" placeholder="CP" value={form.zip} onChange={handleChange} required autoComplete="postal-code" className="w-full rounded-xl border border-bubblegum/60 px-4 py-3 text-sm text-chocolate placeholder-caramel/50 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" style={{ fontFamily: "'Sora', sans-serif" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-bubblegum/40 bg-white p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-chocolate" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Resumen del Pedido</h2>
            {!user && (
              <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700" style={{ fontFamily: "'Sora', sans-serif" }}>
                Necesitás <a href="/auth/login" className="font-semibold underline">iniciar sesión</a> para comprar
              </div>
            )}
            {error && (
              <div className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600" style={{ fontFamily: "'Sora', sans-serif" }}>{error}</div>
            )}
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.weight.grams}`} className="flex items-center justify-between text-sm">
                  <span className="text-caramel" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {item.product.name} <span className="text-caramel/60">({item.weight.label})</span>
                    <span className="text-caramel/60"> x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-chocolate">${(item.weight.price * item.quantity).toLocaleString('es-AR')}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-bubblegum/30 pt-4">
              <div className="flex justify-between text-sm text-caramel">
                <span>Productos ({totalItems})</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-bold text-chocolate">Total</span>
                <span className="text-xl font-bold text-candy">${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || !user}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-candy py-3.5 text-base font-bold text-white shadow-lg shadow-candy/20 transition-colors hover:bg-candy-dark active:scale-95 disabled:opacity-50"
              style={{ fontFamily: "'Sora', sans-serif" }}
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
