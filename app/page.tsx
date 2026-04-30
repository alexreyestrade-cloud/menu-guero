import CartelHero from '@/components/CartelHero'
import CategoryTabs from '@/components/CategoryTabs'
import MenuSection from '@/components/MenuSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/Footer'
import { menuData } from '@/lib/menu'

export default function Home() {
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
