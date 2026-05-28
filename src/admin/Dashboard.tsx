import { useEffect, useState } from 'react'
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react'
import { getAllOrders, getAllProducts, getAllProfiles } from '../lib/api'
import type { Order, Product, Profile } from '../types'

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    getAllProducts().then(setProducts)
    getAllOrders().then(setOrders)
    getAllProfiles().then(setProfiles)
  }, [])

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { label: 'Total Productos', value: String(products.length), icon: Package },
    { label: 'Pedidos Pendientes', value: String(pendingOrders), icon: ShoppingCart },
    { label: 'Ventas Totales', value: `$${totalSales.toLocaleString('es-AR')}`, icon: DollarSign },
    { label: 'Clientes', value: String(profiles.length), icon: Users },
  ]

  const recentOrders = orders.slice(0, 5)
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-chocolate">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-bubblegum flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-candy/10 flex items-center justify-center shrink-0">
                <Icon className="text-candy" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-chocolate">{stat.value}</p>
                <p className="text-sm text-[#8d6e63]">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-bubblegum p-5">
        <h3 className="text-lg font-semibold text-chocolate mb-4">Pedidos Recientes</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">No hay pedidos todavía</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bubblegum text-left text-[#8d6e63] font-medium">
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Total</th>
                  <th className="pb-3 pr-4">Fecha</th>
                  <th className="pb-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className={i < recentOrders.length - 1 ? 'border-b border-bubblegum' : ''}>
                    <td className="py-3 pr-4 font-medium text-chocolate">#{order.id.slice(0, 8)}</td>
                    <td className="py-3 pr-4 text-chocolate font-medium">${order.total.toLocaleString('es-AR')}</td>
                    <td className="py-3 pr-4 text-[#8d6e63]">{new Date(order.created_at).toLocaleDateString('es-AR')}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        {statusLabels[order.status] ?? order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
