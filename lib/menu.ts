import { supabaseAdmin as supabase } from './supabase'

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

const fallback: MenuCategory[] = [
  {
    id: 'tacos', nombre: 'Tacos', emoji: '🌮',
    items: [{ id: 1, nombre: 'Tacos', precio: 17, imagen: '/images/tacos.jpg', variantes: ['Asada','Adobada','Tripa','Buche','Nana','Combinada'], disponible: true }],
  },
  {
    id: 'tortas', nombre: 'Tortas', emoji: '🥪',
    items: [{ id: 2, nombre: 'Torta', precio: null, imagen: '/images/7-torta.jpg', variantes: ['Asada','Adobada','Tripa','Combinada'], disponible: true }],
  },
  {
    id: 'quesadillas', nombre: 'Quesadillas', emoji: '🫓',
    items: [{ id: 3, nombre: 'Quesadilla', precio: null, imagen: '/images/8-quesadilla.jpg', variantes: ['Asada','Adobada','Tripa','Combinada'], disponible: true }],
  },
  {
    id: 'bebidas', nombre: 'Aguas & Refrescos', emoji: '🥤',
    items: [
      { id: 4, nombre: 'Aguas', precio: null, imagen: '/images/aguas.png', variantes: ['Horchata','Jamaica'], disponible: true, precios: [{ label: 'Litro', valor: 45 }, { label: 'Medio', valor: 25 }] },
      { id: 5, nombre: 'Refrescos', precio: 30, imagen: '/images/manzana.png', variantes: ['Coca-Cola','Manzanita Sol'], disponible: true },
    ],
  },
]

export async function getMenuData(): Promise<MenuCategory[]> {
  try {
    const [{ data: categories, error: catErr }, { data: items, error: itemErr }, { data: prices }] = await Promise.all([
      supabase.from('menu_categories').select('*').order('orden'),
      supabase.from('menu_items').select('*').order('orden'),
      supabase.from('item_prices').select('*'),
    ])

    if (catErr || itemErr || !categories?.length || !items?.length) {
      return fallback
    }

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
  } catch {
    return fallback
  }
}
