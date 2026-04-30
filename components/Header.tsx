import Image from 'next/image'

export default function Header() {
  return (
    <header className="relative bg-guero-bg border-b border-gold-dark/30 sticky top-0 z-50">
      {/* Corner ornaments */}
      <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-gold-dark/60 pointer-events-none" />
      <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-gold-dark/60 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-gold-dark/60 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-gold-dark/60 pointer-events-none" />

      <div className="flex items-center gap-4 px-4 py-3 max-w-5xl mx-auto animate-fade-down">
        {/* Logo */}
        <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-2 ring-gold-dark/70 animate-pulse-glow">
          <Image
            src="/logo.jpeg"
            alt="Logo Taquería El Güero"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title block */}
        <div className="min-w-0">
          <h1 className="font-display text-gold-shimmer text-lg sm:text-xl leading-tight tracking-wide">
            Taquería El Güero
          </h1>
          <p className="font-display italic text-gold-dark text-xs sm:text-sm leading-none mt-0.5">
            El Arte del Sabor
          </p>
          <p className="font-heading text-guero-cream/50 text-[11px] mt-1 tracking-widest uppercase">
            🕖 7:00 PM – 11:00 PM
          </p>
        </div>
      </div>
    </header>
  )
}
