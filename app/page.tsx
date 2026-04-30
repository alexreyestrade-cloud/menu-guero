import CartelHero from '@/components/CartelHero'
import CategoryTabs from '@/components/CategoryTabs'
import MenuSection from '@/components/MenuSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/Footer'
import { getMenuData } from '@/lib/menu'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const menuData = await getMenuData()

  return (
    <main className="min-h-screen bg-guero-bg pb-24">
      <CartelHero />
      <CategoryTabs categories={menuData} />

      <div>
        {menuData.map((category, index) => (
          <MenuSection
            key={category.id}
            category={category}
            isLast={index === menuData.length - 1}
          />
        ))}
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
