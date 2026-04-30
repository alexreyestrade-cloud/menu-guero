export default function HeroBanner() {
  return (
    <section className="bg-guero-surface border-b border-gold-dark/20 px-4 py-8 text-center">
      {/* Main tagline */}
      <p className="font-display italic text-gold-light text-xl sm:text-2xl md:text-3xl leading-snug mb-6">
        &ldquo;Tacos que te van a hacer volver&rdquo;
      </p>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-dark/60" />
        <span className="text-gold-dark text-xs">✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-dark/60" />
      </div>

      {/* Icons row */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-heading tracking-widest text-guero-cream/80 uppercase">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">🔥</span>
          <span>Carne de calidad</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">❤️</span>
          <span>Hecho al momento</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">🥣</span>
          <span>Salsas que enamoran</span>
        </div>
      </div>
    </section>
  )
}
