import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { getAllOrders, updateOrderStatus } from '../lib/api'
import type { Order } from '../types'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}
const statusLabels: Record<string, string> = {
  pending: 'pendiente', confirmed: 'confirmado', shipped: 'enviado', delivered: 'entregado', cancelled: 'cancelado',
}

const nextStatus: Record<string, string> = {
  pending: 'confirmed',
  confirmed: 'shipped',
  shipped: 'delivered',
  delivered: 'delivered',
  cancelled: 'cancelled',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => { getAllOrders().then(setOrders) }, [])

  function toggleExpand(id: string) {
    setExpanded(expanded === id ? null : id)
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as Order['status'] } : o)))
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3a2e]">Gestionar Pedidos</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#e0d6d5] p-10 text-center">
          <p className="text-gray-400">No hay pedidos todavía</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#e0d6d5] overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#faf6f5] text-left text-[#8d6e63] font-medium">
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order.id}>
                    <td colSpan={7} className="p-0">
                      <table className="w-full">
                        <tbody>
                          <tr className={`cursor-pointer ${i % 2 === 0 ? '' : 'bg-[#faf6f5]/50'} hover:bg-[#faf6f5] transition-colors`}>
                            <td className="px-4 py-3 w-8" onClick={() => toggleExpand(order.id)}>
                              {expanded === order.id ? <ChevronDown size={16} className="text-[#8d6e63]" /> : <ChevronRight size={16} className="text-[#8d6e63]" />}
                            </td>
                            <td className="px-4 py-3 font-medium text-[#1a3a2e]">#{order.id.slice(0, 8)}</td>
                            <td className="px-4 py-3 text-[#8d6e63]">{order.items?.length ?? 0} producto(s)</td>
                            <td className="px-4 py-3 text-[#1a3a2e] font-medium">${order.total.toLocaleString('es-AR')}</td>
                            <td className="px-4 py-3 text-[#8d6e63]">{new Date(order.created_at).toLocaleDateString('es-AR')}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                                {statusLabels[order.status] ?? order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {order.status !== 'delivered' && order.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleStatusChange(order.id, nextStatus[order.status] ?? order.status)}
                                  className="text-xs text-[#26c6da] hover:underline font-medium"
                                >
                                  Marcar {statusLabels[nextStatus[order.status]]}
                                </button>
                              )}
                            </td>
                          </tr>
                          {expanded === order.id && (
                            <tr className={i % 2 === 0 ? 'bg-[#faf6f5]/30' : 'bg-white'}>
                              <td colSpan={7} className="px-4 py-3">
                                <div className="ml-8 space-y-2">
                                  <p className="text-xs font-medium text-[#8d6e63] uppercase tracking-wide">Detalle del pedido</p>
                                  <p className="text-xs text-gray-400">Dirección: {order.shipping_address?.name ?? '-'} — {order.shipping_address?.street ?? '-'}, {order.shipping_address?.city ?? '-'}</p>
                                  <div className="grid gap-1.5">
                                    {order.items?.map((item, j) => (
                                      <div key={j} className="flex items-center justify-between text-sm">
                                        <span className="text-[#1a3a2e]">{item.product_name} <span className="text-[#8d6e63]">({item.weight_label}) x{item.quantity}</span></span>
                                        <span className="font-medium text-[#1a3a2e]">${(item.unit_price * item.quantity).toLocaleString('es-AR')}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="pt-2 border-t border-[#e0d6d5] flex justify-between text-sm font-semibold text-[#1a3a2e]">
                                    <span>Total</span>
                                    <span>${order.total.toLocaleString('es-AR')}</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
