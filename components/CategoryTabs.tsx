'use client'

import { useEffect, useRef, useState } from 'react'
import type { MenuCategory } from '@/lib/menu'

interface Props {
  categories: MenuCategory[]
}

export default function CategoryTabs({ categories }: Props) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '')
  const tabsRef = useRef<HTMLDivElement>(null)

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(cat.id)
        },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [categories])

  // Scroll active tab into view inside the strip
  useEffect(() => {
    const strip = tabsRef.current
    if (!strip) return
    const activeBtn = strip.querySelector<HTMLElement>(`[data-id="${activeId}"]`)
    activeBtn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    // Offset: header (≈72px) + tabs (≈52px) + a little breathing room
    const offset = 132
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div
      ref={tabsRef}
      className="tabs-strip sticky top-0 z-40 flex gap-2 overflow-x-auto snap-x snap-mandatory px-4 py-3 bg-guero-bg border-b border-gold-dark/20"
    >
      {categories.map((cat, index) => {
        const isActive = activeId === cat.id
        return (
          <button
            key={cat.id}
            data-id={cat.id}
            onClick={() => scrollToSection(cat.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={[
              'animate-fade-up snap-start shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-heading tracking-wider uppercase transition-all duration-200',
              isActive
                ? 'bg-gold-dark text-guero-bg font-bold shadow-md shadow-gold-dark/30'
                : 'text-guero-cream/60 hover:text-gold-light border border-gold-dark/20 hover:border-gold-dark/50',
            ].join(' ')}
          >
            <span>{cat.emoji}</span>
            <span>{cat.nombre}</span>
          </button>
        )
      })}
    </div>
  )
}
