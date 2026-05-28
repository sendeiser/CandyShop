import { Link } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag, Smile } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hidden sm:block">
            <div className="absolute -left-4 top-20 h-6 w-6 rounded-full bg-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
            <div className="absolute right-8 bottom-20 h-4 w-4 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1s infinite' }} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-400">
          <Smile className="mb-4 h-16 w-16" />
          <p className="text-lg font-medium">Tu carrito está vacío</p>
          <Link
            to="/catalogo"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ec4899] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#db2777]"
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-4 top-20 h-6 w-6 rounded-full bg-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-8 top-16 h-4 w-4 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
          <div className="absolute left-1/3 bottom-12 h-5 w-5 rounded-full bg-[#4dd3e0]/12" style={{ animation: 'float-slow 6s ease-in-out 0.5s infinite' }} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-[#1a3a2e] sm:text-4xl animate-fade-in-up">Tu Carrito</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const lineTotal = item.weight.price * item.quantity
            return (
              <div
                key={`${item.product.id}-${item.weight.grams}`}
                className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#faf6f5]">
                    {item.product.image_url ? (
                      <img src={item.product.image_url} alt={item.product.name} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-white/50">
                        {item.product.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <Link
                      to={`/producto/${item.product.slug}`}
                      className="font-semibold text-gray-800 hover:text-[#26c6da] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.weight.label}</p>
                    <p className="text-sm text-gray-500">
                      ${item.weight.price.toLocaleString('es-AR')} c/u
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.weight.grams,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#26c6da]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.weight.grams, item.quantity + 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#26c6da]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="min-w-[5rem] text-right text-base font-bold text-[#26c6da]">
                    ${lineTotal.toLocaleString('es-AR')}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id, item.weight.grams)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#1a3a2e]">Resumen</h2>
          <div className="mt-4 space-y-3 border-b border-gray-100 pb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Productos ({totalItems})</span>
              <span>${totalPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-bold text-[#1a3a2e]">Total</span>
            <span className="text-xl font-bold text-[#26c6da]">
              ${totalPrice.toLocaleString('es-AR')}
            </span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ec4899] py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-[#db2777] active:scale-95"
          >
            Proceder al Pago
          </Link>
        </div>
      </div>
    </div>
  )
}
