'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  saveItem, deleteItem, saveCategory, deleteCategory, logout,
} from './actions'

interface Category { id: string; nombre: string; emoji: string; orden: number }
interface Price { id: number; item_id: number; label: string; valor: number }
interface Item {
  id: number; category_id: string; nombre: string; precio: number | null
  descripcion: string | null; imagen: string | null; variantes: string[]
  disponible: boolean; orden: number
}

interface Props {
  initialCategories: Category[]
  initialItems: Item[]
  initialPrices: Price[]
}

const EMPTY_ITEM: Omit<Item, 'id'> = {
  category_id: '', nombre: '', precio: null,
  descripcion: null, imagen: null, variantes: [],
  disponible: true, orden: 0,
}

export default function AdminClient({ initialCategories, initialItems, initialPrices }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [activeTab, setActiveTab] = useState<'items' | 'categories'>('items')
  const [editingItem, setEditingItem] = useState<(Item & { prices?: Price[] }) | null>(null)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [isNew, setIsNew] = useState(false)

  const categories = initialCategories
  const items = initialItems
  const prices = initialPrices

  function openNewItem() {
    setIsNew(true)
    setEditingItem({ id: 0, ...EMPTY_ITEM, category_id: categories[0]?.id ?? '', prices: [] })
  }
  function openEditItem(item: Item) {
    setIsNew(false)
    setEditingItem({ ...item, prices: prices.filter(p => p.item_id === item.id) })
  }
  function openNewCat() {
    setIsNew(true)
    setEditingCat({ id: '', nombre: '', emoji: '', orden: 0 })
  }

  function handleSaveItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingItem) return
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await saveItem(fd, isNew)
      setEditingItem(null)
      router.refresh()
    })
  }

  function handleDeleteItem(id: number) {
    if (!confirm('¿Eliminar este producto?')) return
    startTransition(async () => {
      await deleteItem(id)
      setEditingItem(null)
      router.refresh()
    })
  }

  function handleSaveCat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingCat) return
    const fd = new FormData(e.currentTarget)
    startTransition(async () => {
      await saveCategory(fd, isNew)
      setEditingCat(null)
      router.refresh()
    })
  }

  function handleDeleteCat(id: string) {
    if (!confirm('¿Eliminar esta categoría? Se eliminarán sus productos también.')) return
    startTransition(async () => {
      await deleteCategory(id)
      setEditingCat(null)
      router.refresh()
    })
  }

  return (
    <div className="min-h-screen bg-guero-bg text-guero-cream">
      {/* Header */}
      <header className="border-b border-gold-dark/20 bg-guero-surface px-4 py-4 flex items-center justify-between">
        <div>
          <p className="font-display text-gold-light text-lg">Panel Admin</p>
          <p className="font-heading text-guero-cream/40 text-[10px] tracking-widest uppercase">Taquería El Güero</p>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank" className="px-3 py-2 border border-gold-dark/30 rounded-lg font-heading text-xs text-guero-cream/60 hover:text-gold-light transition-colors">
            Ver menú
          </a>
          <button
            onClick={() => { logout().then(() => router.push('/admin/login')) }}
            className="px-3 py-2 border border-guero-red/40 rounded-lg font-heading text-xs text-guero-red/70 hover:text-guero-red transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gold-dark/20">
        {(['items', 'categories'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-heading text-xs tracking-widest uppercase transition-colors ${
              activeTab === tab
                ? 'text-gold-light border-b-2 border-gold-light'
                : 'text-guero-cream/40 hover:text-guero-cream/70'
            }`}
          >
            {tab === 'items' ? 'Productos' : 'Categorías'}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* ── Productos ── */}
        {activeTab === 'items' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-heading text-guero-cream/50 text-xs tracking-widest uppercase">
                {items.length} productos
              </p>
              <button onClick={openNewItem} className="btn-gold text-sm px-4 py-2">
                + Nuevo producto
              </button>
            </div>

            {categories.map(cat => {
              const catItems = items.filter(i => i.category_id === cat.id)
              if (!catItems.length) return null
              return (
                <div key={cat.id}>
                  <p className="font-heading text-[10px] tracking-widest uppercase text-guero-cream/30 mt-4 mb-2">
                    {cat.emoji} {cat.nombre}
                  </p>
                  {catItems.map(item => (
                    <div
                      key={item.id}
                      onClick={() => openEditItem(item)}
                      className="flex items-center justify-between bg-guero-surface border border-gold-dark/15 rounded-xl px-4 py-3 cursor-pointer hover:border-gold-dark/40 transition-colors mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${item.disponible ? 'bg-green-500' : 'bg-guero-red'}`} />
                        <div>
                          <p className="font-heading text-sm text-guero-cream">{item.nombre}</p>
                          <p className="font-heading text-[10px] text-guero-cream/35">
                            {item.precio ? `$${item.precio}` : 'Precio variable'}
                            {item.variantes?.length ? ` · ${item.variantes.length} variantes` : ''}
                          </p>
                        </div>
                      </div>
                      <span className="text-gold-dark/50 text-xs">›</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Categorías ── */}
        {activeTab === 'categories' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-heading text-guero-cream/50 text-xs tracking-widest uppercase">
                {categories.length} categorías
              </p>
              <button onClick={openNewCat} className="btn-gold text-sm px-4 py-2">
                + Nueva categoría
              </button>
            </div>
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => { setIsNew(false); setEditingCat(cat) }}
                className="flex items-center justify-between bg-guero-surface border border-gold-dark/15 rounded-xl px-4 py-3 cursor-pointer hover:border-gold-dark/40 transition-colors"
              >
                <span className="font-heading text-sm text-guero-cream">{cat.emoji} {cat.nombre}</span>
                <span className="text-gold-dark/50 text-xs">›</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal: editar/crear producto ── */}
      {editingItem && (
        <Modal onClose={() => setEditingItem(null)}>
          <form onSubmit={handleSaveItem} className="space-y-4">
            <h2 className="font-display text-gold-light text-lg">
              {isNew ? 'Nuevo producto' : 'Editar producto'}
            </h2>

            <input type="hidden" name="id" value={editingItem.id} />

            <Field label="Nombre">
              <input name="nombre" defaultValue={editingItem.nombre} required className="input-field" />
            </Field>

            <Field label="Categoría">
              <select name="category_id" defaultValue={editingItem.category_id} className="input-field">
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.nombre}</option>
                ))}
              </select>
            </Field>

            <Field label="Precio (dejar vacío si tiene precios por tamaño)">
              <input name="precio" type="number" step="0.01" defaultValue={editingItem.precio ?? ''} className="input-field" placeholder="ej. 17" />
            </Field>

            <Field label="Precios por tamaño (formato: Litro:45,Medio:25)">
              <input
                name="precios"
                defaultValue={editingItem.prices?.map(p => `${p.label}:${p.valor}`).join(',') ?? ''}
                className="input-field"
                placeholder="Litro:45,Medio:25"
              />
            </Field>

            <Field label="Imagen (ruta: /images/nombre.jpg)">
              <input name="imagen" defaultValue={editingItem.imagen ?? ''} className="input-field" placeholder="/images/tacos.jpg" />
            </Field>

            <Field label="Variantes (separadas por coma)">
              <input name="variantes" defaultValue={editingItem.variantes?.join(',') ?? ''} className="input-field" placeholder="Asada,Adobada,Tripa" />
            </Field>

            <Field label="Orden">
              <input name="orden" type="number" defaultValue={editingItem.orden} className="input-field" />
            </Field>

            <div className="flex items-center gap-3">
              <input type="checkbox" name="disponible" id="disp" defaultChecked={editingItem.disponible} className="w-4 h-4 accent-gold-light" />
              <label htmlFor="disp" className="font-heading text-sm text-guero-cream/70">Disponible</label>
            </div>

            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={isPending} className="btn-gold flex-1 py-3">
                {isPending ? 'Guardando...' : 'Guardar'}
              </button>
              {!isNew && (
                <button type="button" onClick={() => handleDeleteItem(editingItem.id)} className="px-4 py-3 bg-guero-red/20 border border-guero-red/40 rounded-lg font-heading text-sm text-guero-red hover:bg-guero-red/30 transition-colors">
                  Eliminar
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}

      {/* ── Modal: editar/crear categoría ── */}
      {editingCat && (
        <Modal onClose={() => setEditingCat(null)}>
          <form onSubmit={handleSaveCat} className="space-y-4">
            <h2 className="font-display text-gold-light text-lg">
              {isNew ? 'Nueva categoría' : 'Editar categoría'}
            </h2>

            <input type="hidden" name="id" value={editingCat.id} />

            <Field label="ID (sin espacios, ej: tacos)">
              <input name="id_nuevo" defaultValue={editingCat.id} required className="input-field" disabled={!isNew} />
            </Field>

            <Field label="Nombre">
              <input name="nombre" defaultValue={editingCat.nombre} required className="input-field" />
            </Field>

            <Field label="Emoji">
              <input name="emoji" defaultValue={editingCat.emoji} required className="input-field" placeholder="🌮" />
            </Field>

            <Field label="Orden">
              <input name="orden" type="number" defaultValue={editingCat.orden} className="input-field" />
            </Field>

            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={isPending} className="btn-gold flex-1 py-3">
                {isPending ? 'Guardando...' : 'Guardar'}
              </button>
              {!isNew && (
                <button type="button" onClick={() => handleDeleteCat(editingCat.id)} className="px-4 py-3 bg-guero-red/20 border border-guero-red/40 rounded-lg font-heading text-sm text-guero-red hover:bg-guero-red/30 transition-colors">
                  Eliminar
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-guero-surface border border-gold-dark/25 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-guero-cream/30 hover:text-guero-cream/70 text-xl leading-none">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-heading text-[10px] tracking-widest uppercase text-guero-cream/40 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
