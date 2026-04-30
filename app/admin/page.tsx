import { supabaseAdmin } from '@/lib/supabase'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [{ data: categories }, { data: items }, { data: prices }] = await Promise.all([
    supabaseAdmin.from('menu_categories').select('*').order('orden'),
    supabaseAdmin.from('menu_items').select('*').order('orden'),
    supabaseAdmin.from('item_prices').select('*'),
  ])

  return (
    <AdminClient
      initialCategories={categories ?? []}
      initialItems={items ?? []}
      initialPrices={prices ?? []}
    />
  )
}
