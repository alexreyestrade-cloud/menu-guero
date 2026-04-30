'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function saveItem(fd: FormData, isNew: boolean) {
  const variantesRaw = (fd.get('nombre') as string) // sanity
  void variantesRaw

  const nombre    = fd.get('nombre') as string
  const catId     = fd.get('category_id') as string
  const precioRaw = fd.get('precio') as string
  const precio    = precioRaw ? parseFloat(precioRaw) : null
  const imagen    = (fd.get('imagen') as string) || null
  const varStr    = (fd.get('variantes') as string) || ''
  const variantes = varStr ? varStr.split(',').map(s => s.trim()).filter(Boolean) : []
  const orden     = parseInt(fd.get('orden') as string) || 0
  const disponible = fd.get('disponible') === 'on'
  const preciosRaw = (fd.get('precios') as string) || ''

  const payload = { nombre, category_id: catId, precio, imagen, variantes, orden, disponible }

  if (isNew) {
    const { data } = await supabaseAdmin.from('menu_items').insert(payload).select('id').single()
    if (data && preciosRaw) {
      await savePrices(data.id, preciosRaw)
    }
  } else {
    const id = parseInt(fd.get('id') as string)
    await supabaseAdmin.from('menu_items').update(payload).eq('id', id)
    await supabaseAdmin.from('item_prices').delete().eq('item_id', id)
    if (preciosRaw) await savePrices(id, preciosRaw)
  }
}

async function savePrices(itemId: number, raw: string) {
  const entries = raw.split(',').map(s => {
    const [label, valor] = s.split(':')
    return { item_id: itemId, label: label.trim(), valor: parseFloat(valor) }
  }).filter(e => e.label && !isNaN(e.valor))
  if (entries.length) {
    await supabaseAdmin.from('item_prices').insert(entries)
  }
}

export async function deleteItem(id: number) {
  await supabaseAdmin.from('menu_items').delete().eq('id', id)
}

export async function saveCategory(fd: FormData, isNew: boolean) {
  const nombre = fd.get('nombre') as string
  const emoji  = fd.get('emoji') as string
  const orden  = parseInt(fd.get('orden') as string) || 0

  if (isNew) {
    const id = fd.get('id_nuevo') as string
    await supabaseAdmin.from('menu_categories').insert({ id, nombre, emoji, orden })
  } else {
    const id = fd.get('id') as string
    await supabaseAdmin.from('menu_categories').update({ nombre, emoji, orden }).eq('id', id)
  }
}

export async function deleteCategory(id: string) {
  await supabaseAdmin.from('menu_categories').delete().eq('id', id)
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
}
