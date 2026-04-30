import { supabase } from './supabase'

export interface MenuItem {
  id: number
  nombre: string
  precio: number | null
  precios?: { label: string; valor: number }[]
  descripcion?: string
  imagen?: string
  variantes?: string[]
  disponible: boolean
}

export interface MenuCategory {
  id: string
  nombre: string
  emoji: string
  items: MenuItem[]
}

export async function getMenuData(): Promise<MenuCategory[]> {
  const [{ data: categories }, { data: items }, { data: prices }] = await Promise.all([
    supabase.from('menu_categories').select('*').order('orden'),
    supabase.from('menu_items').select('*').order('orden'),
    supabase.from('item_prices').select('*'),
  ])

  if (!categories || !items) return []

  return categories.map(cat => ({
    id: cat.id,
    nombre: cat.nombre,
    emoji: cat.emoji,
    items: items
      .filter(item => item.category_id === cat.id && item.disponible)
      .map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion ?? undefined,
        imagen: item.imagen ?? undefined,
        variantes: item.variantes ?? [],
        disponible: item.disponible,
        precios: prices
          ?.filter(p => p.item_id === item.id)
          .map(p => ({ label: p.label, valor: p.valor })) ?? [],
      })),
  })).filter(cat => cat.items.length > 0)
}
