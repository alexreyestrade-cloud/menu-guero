import Image from 'next/image'
import type { MenuItem } from '@/lib/menu'

interface Props {
  item: MenuItem
  categoryEmoji: string
}

function CocaColaPlaceholder() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-hidden bg-[#E61A27]">
      {/* Wave top */}
      <div className="absolute -top-6 left-0 right-0 h-12 bg-white/10 rounded-[100%]" />
      {/* Wave bottom */}
      <div className="absolute -bottom-6 left-0 right-0 h-12 bg-black/20 rounded-[100%]" />
      {/* Ribbon diagonal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20" />

      {/* Logo text */}
      <span className="relative font-display italic font-bold text-white text-2xl tracking-tight drop-shadow-lg z-10">
        Coca-Cola
      </span>
      <span className="relative font-heading text-white/60 text-[9px] tracking-[0.3em] uppercase z-10 mt-1">
        Refresco clásico
      </span>
    </div>
  )
}

function ManzanitaPlaceholder() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #E8820C 0%, #F7B731 50%, #4A9E35 100%)' }}
    >
      {/* Sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
      {/* Circle glow */}
      <div className="absolute w-24 h-24 rounded-full bg-white/10 blur-xl" />

      <span className="relative text-4xl z-10 drop-shadow-lg">🍏</span>
      <span className="relative font-display italic font-bold text-white text-lg tracking-tight drop-shadow-lg z-10 mt-1 leading-tight text-center">
        Manzanita Sol
      </span>
    </div>
  )
}

function HorchataPlaceholder() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5EDD8 0%, #E8C97A 60%, #C9922A 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #8B5E2A 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <span className="relative text-4xl z-10 drop-shadow">🥛</span>
      <span className="relative font-display italic font-bold text-[#5C3010] text-xl tracking-tight z-10 mt-1 drop-shadow">
        Horchata
      </span>
      <span className="relative font-heading text-[#5C3010]/60 text-[9px] tracking-[0.25em] uppercase z-10 mt-0.5">
        Arroz · canela · vainilla
      </span>
    </div>
  )
}

function JamaicaPlaceholder() {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #6D0B38 0%, #A8164F 55%, #C8195A 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
      <div className="absolute w-28 h-28 rounded-full bg-white/10 blur-2xl" />
      <span className="relative text-4xl z-10 drop-shadow-lg">🌺</span>
      <span className="relative font-display italic font-bold text-white text-xl tracking-tight z-10 mt-1 drop-shadow-lg">
        Jamaica
      </span>
      <span className="relative font-heading text-white/60 text-[9px] tracking-[0.25em] uppercase z-10 mt-0.5">
        Flor de jamaica
      </span>
    </div>
  )
}

function EmojiPlaceholder({ emoji }: { emoji: string }) {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{
        backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <span className="text-5xl opacity-50 select-none">{emoji}</span>
    </div>
  )
}

export default function ProductCard({ item, categoryEmoji }: Props) {
  return (
    <article className="card-gold-hover bg-guero-card rounded-xl overflow-hidden flex flex-col group">
      {/* ── Image / Placeholder ───────────────────────── */}
      <div className="relative h-[148px] shrink-0 bg-guero-surface overflow-hidden">
        {item.imagen ? (
          <Image
            src={item.imagen}
            alt={item.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <EmojiPlaceholder emoji={categoryEmoji} />
        )}

        {/* Gradient fade into card bg */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-guero-card to-transparent pointer-events-none" />

        {/* Unavailable overlay */}
        {!item.disponible && (
          <div className="absolute inset-0 bg-guero-bg/80 flex items-center justify-center">
            <span className="font-heading text-xs uppercase tracking-widest text-guero-cream/50 border border-guero-cream/20 px-3 py-1 rounded">
              No disponible
            </span>
          </div>
        )}
      </div>

      {/* ── Info ──────────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
        <h3 className="font-display text-guero-cream text-[17px] leading-snug">
          {item.nombre}
        </h3>
        <div className="h-px w-10 bg-gradient-to-r from-gold-dark to-transparent" />

        {/* Variantes */}
        {item.variantes && item.variantes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.variantes.map((v) => (
              <span
                key={v}
                className="font-heading text-[10px] tracking-widest uppercase text-gold-dark border border-gold-dark/30 bg-gold-dark/5 px-2 py-0.5 rounded-full"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          {item.precios && item.precios.length > 0 ? (
            <div className="flex items-center gap-3">
              {item.precios.map(({ label, valor }) => (
                <div key={label} className="flex flex-col leading-none">
                  <span className="font-heading text-gold-shimmer text-lg tracking-wide">
                    ${valor}
                  </span>
                  <span className="font-heading text-guero-cream/35 text-[10px] tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : item.precio !== null ? (
            <span className="font-heading text-gold-shimmer text-xl tracking-wide">
              ${item.precio}
              <span className="text-guero-cream/30 text-xs ml-1">MXN</span>
            </span>
          ) : (
            <span className="font-heading text-guero-cream/30 text-sm italic">
              Precio a confirmar
            </span>
          )}
          <span className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-gold-dark/40" />
            ))}
          </span>
        </div>
      </div>
    </article>
  )
}
