import { useEffect, useState } from 'react'
import { Pencil, Plus } from 'lucide-react'
import { getAllCategories, upsertCategory, uploadCategoryImage } from '../lib/api'
import type { Category } from '../types'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '', image_url: '' })
  const [uploading, setUploading] = useState(false)

  useEffect(() => { getAllCategories().then(setCategories) }, [])

  function loadCategories() { getAllCategories().then(setCategories) }

  function openAdd() {
    setEditing(null)
    setForm({ name: '', slug: '', description: '', image_url: '' })
    setModalOpen(true)
  }

  function openEdit(category: Category) {
    setEditing(category)
    setForm({ name: category.name, slug: category.slug, description: category.description ?? '', image_url: category.image_url ?? '' })
    setModalOpen(true)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadCategoryImage(file)
      setForm((f) => ({ ...f, image_url: url }))
    } catch (err: any) {
      alert('Error al subir imagen: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!form.name || !form.slug) { alert('Nombre y slug son obligatorios'); return }
    const payload: any = { name: form.name, slug: form.slug, description: form.description || null, image_url: form.image_url || null }
    if (editing) payload.id = editing.id
    try {
      await upsertCategory(payload)
      setModalOpen(false)
      loadCategories()
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3 admin-flex-header">
        <h2 className="text-2xl font-bold text-[#1a3a2e] shrink-0">Gestionar Categorias</h2>
        <button onClick={openAdd} className="flex items-center gap-1.5 bg-[#26c6da] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1aa3b3] transition-colors shrink-0">
          <Plus size={18} /> Agregar Categoria
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#e0d6d5] overflow-hidden admin-table-wrap">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#faf6f5] text-left text-[#8d6e63] font-medium">
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Descripcion</th>
                <th className="px-4 py-3">Orden</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? '' : 'bg-[#faf6f5]/50'}>
                  <td className="px-4 py-3 font-medium text-[#1a3a2e]" data-label="Nombre">{c.name}</td>
                  <td className="px-4 py-3 text-[#8d6e63]" data-label="Slug">{c.slug}</td>
                  <td className="px-4 py-3 text-[#8d6e63]" data-label="Descripcion">{c.description ?? '-'}</td>
                  <td className="px-4 py-3 text-[#8d6e63]" data-label="Orden">{c.sort_order}</td>
                  <td className="px-4 py-3" data-label="Acciones">
                    <button onClick={() => openEdit(c)} className="p-2 rounded hover:bg-[#faf6f5] text-[#8d6e63] hover:text-[#26c6da] transition-colors"><Pencil size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#1a3a2e] mb-4">{editing ? 'Editar Categoría' : 'Agregar Categoría'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Nombre</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-[#e0d6d5] rounded-lg px-3 py-2 text-sm text-[#1a3a2e] focus:outline-none focus:border-[#26c6da]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full border border-[#e0d6d5] rounded-lg px-3 py-2 text-sm text-[#1a3a2e] focus:outline-none focus:border-[#26c6da]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Descripción</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-[#e0d6d5] rounded-lg px-3 py-2 text-sm text-[#1a3a2e] focus:outline-none focus:border-[#26c6da]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8d6e63] mb-1">Imagen</label>
                <div className="flex gap-3 items-center">
                  <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="URL de la imagen" className="flex-1 border border-[#e0d6d5] rounded-lg px-3 py-2 text-sm text-[#1a3a2e] focus:outline-none focus:border-[#26c6da]" />
                  <label className="px-3 py-2 text-sm bg-[#faf6f5] rounded-lg cursor-pointer hover:bg-[#e0d6d5] transition-colors">
                    {uploading ? 'Subiendo...' : 'Subir'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-[#8d6e63] hover:text-[#1a3a2e] transition-colors">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#26c6da] text-white rounded-lg hover:bg-[#1aa3b3] transition-colors">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
