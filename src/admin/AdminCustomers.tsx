import { useEffect, useState } from 'react'
import { getAllProfiles } from '../lib/api'
import type { Profile } from '../types'

export default function AdminCustomers() {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => { getAllProfiles().then(setProfiles) }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3a2e]">Gestionar Clientes</h2>

      {profiles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#e0d6d5] p-10 text-center">
          <p className="text-gray-400">No hay clientes registrados todavía</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#e0d6d5] overflow-hidden admin-table-wrap">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#faf6f5] text-left text-[#8d6e63] font-medium">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Telefono</th>
                  <th className="px-4 py-3">Rol</th>
                  <th className="px-4 py-3">Registrado</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? '' : 'bg-[#faf6f5]/50'}>
                    <td className="px-4 py-3 font-medium text-[#1a3a2e]" data-label="Nombre">{p.name ?? '-'}</td>
                    <td className="px-4 py-3 text-[#8d6e63]" data-label="Email">{p.email}</td>
                    <td className="px-4 py-3 text-[#8d6e63]" data-label="Telefono">{p.phone ?? '-'}</td>
                    <td className="px-4 py-3" data-label="Rol">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${p.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                        {p.role === 'admin' ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8d6e63]" data-label="Registrado">{new Date(p.created_at).toLocaleDateString('es-AR')}</td>
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
