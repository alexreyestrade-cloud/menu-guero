import Image from 'next/image'

export default function CartelHero() {
  return (
    <section className="bg-guero-bg">
      {/* ── Cartel image ─────────────────────────────── */}
      <div className="flex justify-center px-4 pt-6 pb-2">
        <div className="cartel-glow rounded-2xl overflow-hidden w-full max-w-2xl">
          {/* Ken Burns wrapper */}
          <div className="relative animate-ken-burns">
            <Image
              src="/cartel.jpeg"
              alt="Taquería El Güero — El Arte del Sabor"
              width={1200}
              height={600}
              className="w-full h-auto block"
              priority
            />
            <div className="hero-vignette absolute inset-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-guero-bg/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Info bar ─────────────────────────────────── */}
      <div
        className="grid grid-cols-2 items-center gap-px border-b border-gold-dark/20 animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        {/* ── Izquierda: Redes sociales ── */}
        <div className="flex flex-col gap-2 px-4 py-4 border-r border-gold-dark/20">
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-guero-cream/35">
            Redes sociales
          </p>
          <a
            href="https://www.facebook.com/share/1ApuBqYftf/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 w-fit"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-guero-surface border border-gold-dark/40 group-hover:border-gold-light transition-colors shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-dark group-hover:text-gold-light transition-colors" fill="currentColor" aria-hidden>
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </span>
            <div className="leading-tight min-w-0">
              <p className="font-heading text-[10px] tracking-widest uppercase text-guero-cream/40">Facebook</p>
              <p className="font-display text-sm text-gold-light group-hover:text-gold-shimmer transition-colors truncate">
                Taquería El Güero
              </p>
            </div>
          </a>
        </div>

        {/* ── Derecha: Contacto ── */}
        <div className="flex flex-col gap-2 px-4 py-4">
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-guero-cream/35">
            Contacto
          </p>

          {/* Teléfono */}
          <a href="tel:+529161008579" className="group flex items-center gap-2 w-fit">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gold-dark shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span className="font-heading text-sm text-gold-light tracking-wide group-hover:text-gold-shimmer transition-colors">
              916 100 85 79
            </span>
          </a>

          {/* Domicilio */}
          <p className="font-heading text-[10px] tracking-wider uppercase text-guero-red/75">
            🛵 Domicilio · costo extra
          </p>

          {/* Dirección */}
          <p className="font-heading text-[10px] text-guero-cream/35 leading-relaxed">
            Blvd. Bonampak, Col. Maya Lacanhá<br />Palenque, Chiapas
          </p>
        </div>
      </div>
    </section>
  )
}
