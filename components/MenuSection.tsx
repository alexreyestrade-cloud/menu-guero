'use client'

import { useEffect, useRef } from 'react'
import type { MenuCategory } from '@/lib/menu'
import ProductCard from './ProductCard'
import Divider from './Divider'

interface Props {
  category: MenuCategory
  isLast: boolean
}

export default function MenuSection({ category, isLast }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  // Fade-in on scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        id={category.id}
        ref={sectionRef}
        className="fade-in-section scroll-mt-16 px-4 py-10 max-w-5xl mx-auto"
      >
        {/* Section title */}
        <div className="relative flex flex-col items-center mb-10">
          {/* Horizontal rule behind the badge */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-gold-dark/20" />

          {/* Badge */}
          <div className="relative bg-guero-bg px-6 flex flex-col items-center gap-1">
            <span className="text-4xl leading-none mb-1">{category.emoji}</span>
            <h2 className="font-display text-3xl sm:text-4xl text-gold-shimmer tracking-wider text-center uppercase">
              {category.nombre}
            </h2>
          </div>

          {/* Ornament below */}
          <div className="relative flex items-center gap-2 mt-3">
            <span className="h-px w-6 bg-gold-dark/50" />
            <span className="text-gold-dark text-[10px]">✦</span>
            <span className="h-px w-6 bg-gold-dark/50" />
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              categoryEmoji={category.emoji}
            />
          ))}
        </div>
      </section>

      {/* Ornamental divider between sections */}
      {!isLast && (
        <div className="px-4">
          <Divider />
        </div>
      )}
    </>
  )
}
