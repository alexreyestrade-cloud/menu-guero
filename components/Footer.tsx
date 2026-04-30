import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-gold-dark/20 bg-guero-surface mt-8 px-4 py-10 text-center">
      {/* Logo */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-gold-dark/50 mx-auto mb-4">
        <Image
          src="/logo.jpeg"
          alt="Logo Taquería El Güero"
          fill
          className="object-cover"
        />
      </div>

      <p className="font-display text-gold-light text-base tracking-wide">
        Taquería El Güero
      </p>
      <p className="font-display italic text-gold-dark text-sm mt-0.5">
        El Arte del Sabor
      </p>

      <div className="flex items-center justify-center gap-3 my-4">
        <span className="h-px w-12 bg-gold-dark/40" />
        <span className="text-gold-dark text-[10px]">✦</span>
        <span className="h-px w-12 bg-gold-dark/40" />
      </div>

      <div className="font-heading text-guero-cream/50 text-sm space-y-1 tracking-wider">
        <p>🕖 Lun – Dom · 6:00 PM – 12:00 AM</p>
        <p>📞 916 100 85 79</p>
      </div>

      <p className="font-heading text-guero-cream/25 text-xs mt-6 tracking-widest uppercase">
        © 2026 Taquería El Güero
      </p>
    </footer>
  )
}
