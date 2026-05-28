import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const candyIcons = ['🍬', '🍭', '🍫', '🍩', '🍪', '🧁', '🍦', '🍿']

export default function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center justify-center text-caramel">
          <span className="mb-4 text-6xl" aria-hidden="true">🍬</span>
          <p className="text-lg font-medium">Tu carrito está vacío</p>
          <Link
            to="/catalogo"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-candy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-candy-dark active:scale-95"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <ShoppingBag className="h-4 w-4" />
            Explorar productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-chocolate sm:text-4xl" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        Tu Carrito
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => {
            const lineTotal = item.weight.price * item.quantity
            const icon = candyIcons[idx % candyIcons.length]
            return (
              <div
                key={`${item.product.id}-${item.weight.grams}`}
                className="flex flex-col gap-4 rounded-2xl border border-bubblegum/40 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-candy/10 to-candy/5 text-2xl">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="h-full w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <span aria-hidden="true">{icon}</span>
                    )}
                  </div>
                  <div>
                    <Link
                      to={`/producto/${item.product.slug}`}
                      className="font-semibold text-chocolate hover:text-candy transition-colors"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-caramel">{item.weight.label}</p>
                    <p className="text-sm text-caramel">
                      ${item.weight.price.toLocaleString('es-AR')} c/u
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-bubblegum/60 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.weight.grams, Math.max(1, item.quantity - 1))}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-caramel transition-colors hover:bg-candy/10 hover:text-candy"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold text-chocolate">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.weight.grams, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-caramel transition-colors hover:bg-candy/10 hover:text-candy"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="min-w-[5rem] text-right text-base font-bold text-candy">
                    ${lineTotal.toLocaleString('es-AR')}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id, item.weight.grams)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-caramel/50 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-bubblegum/40 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-chocolate" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Resumen</h2>
          <div className="mt-4 space-y-3 border-b border-bubblegum/30 pb-4">
            <div className="flex justify-between text-sm text-caramel">
              <span>Productos ({totalItems})</span>
              <span>${totalPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-bold text-chocolate">Total</span>
            <span className="text-xl font-bold text-candy">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-candy py-3.5 text-base font-bold text-white shadow-lg shadow-candy/20 transition-colors hover:bg-candy-dark active:scale-95"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  )
}
