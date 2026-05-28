import { useEffect, useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { getAllProducts, getAllCategories, upsertProduct, uploadProductImage } from '../lib/api'
import type { Product, Category } from '../types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '', price: '', category_id: '', image_url: '', is_active: true })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getAllProducts().then(setProducts)
    getAllCategories().then(setCategories)
  }, [])

  function loadProducts() { getAllProducts().then(setProducts) }

  function openAdd() {
    setEditing(null)
    setForm({ name: '', slug: '', description: '', price: '', category_id: categories[0]?.id ?? '', image_url: '', is_active: true })
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setEditing(product)
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      price: String(product.price),
      category_id: product.category_id ?? '',
      image_url: product.image_url ?? '',
      is_active: product.is_active,
    })
    setModalOpen(true)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadProductImage(file)
      setForm((f) => ({ ...f, image_url: url }))
    } catch (err: any) {
      alert('Error al subir imagen: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    const price = Number(form.price)
    if (!form.name || !form.slug || !price) { alert('Nombre, slug y precio son obligatorios'); return }
    const payload: any = {
      name: form.name,
      slug: form.slug,
      description: form.description || null,
      price,
      category_id: form.category_id || null,
      image_url: form.image_url || null,
      is_active: form.is_active,
    }
    if (editing) payload.id = editing.id
    try {
      await upsertProduct(payload)
      setModalOpen(false)
      loadProducts()
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 admin-flex-header">
        <h2 className="text-2xl font-bold text-chocolate shrink-0">Gestionar Productos</h2>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-candy text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-candy-dark shrink-0">
          <Plus size={18} /> Agregar Producto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-bubblegum overflow-hidden admin-table-wrap">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-vanilla text-left text-[#8d6e63] font-medium">
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Destacado</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? '' : 'bg-vanilla/50'}>
                    <td className="px-4 py-3 font-medium text-chocolate" data-label="Nombre">{p.name}</td>
                    <td className="px-4 py-3 text-chocolate" data-label="Precio">${p.price.toLocaleString('es-AR')}</td>
                    <td className="px-4 py-3 text-[#8d6e63]" data-label="Categoria">{p.category?.name ?? '-'}</td>
                    <td className="px-4 py-3" data-label="Destacado">{p.is_featured ? <span className="text-candy">★</span> : '-'}</td>
                    <td className="px-4 py-3" data-label="Estado">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {p.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3" data-label="Acciones">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 rounded hover:bg-vanilla text-[#8d6e63] hover:text-candy transition-colors active:scale-95"><Pencil size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 modal-overlay" style={{ overscrollBehavior: 'contain' }}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto modal-content">
            <h3 className="text-lg font-semibold text-chocolate mb-4">{editing ? 'Editar Producto' : 'Agregar Producto'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#8d6e63] mb-1">Nombre</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8d6e63] mb-1">Slug</label>
                  <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Descripción</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#8d6e63] mb-1">Precio (en pesos)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8d6e63] mb-1">Categoría</label>
                  <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} className="w-full border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy">
                    <option value="">Sin categoría</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Imagen</label>
                <div className="flex gap-3 items-center">
                  <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="URL o subí una imagen" className="flex-1 border border-bubblegum rounded-lg px-3 py-2 text-sm text-chocolate focus:outline-none focus:border-candy" />
                  <label className="px-3 py-2 text-sm bg-vanilla rounded-lg cursor-pointer hover:bg-bubblegum transition-colors">
                    {uploading ? 'Subiendo...' : 'Subir'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-chocolate">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-candy" />
                  Activo
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-[#8d6e63] hover:text-chocolate transition-colors">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-candy text-white rounded-lg hover:bg-candy-dark transition-colors">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
