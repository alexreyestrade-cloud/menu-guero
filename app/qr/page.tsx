import QRDisplay from './QRDisplay'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Código QR — Taquería El Güero',
}

export default function QRPage() {
  return (
    <div className="min-h-screen bg-guero-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8 print:mb-4">
        <p className="font-display text-gold-light text-3xl tracking-wide">Taquería El Güero</p>
        <p className="font-display italic text-gold-dark text-lg mt-1">El Arte del Sabor</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/50">
        <QRDisplay url="https://menu-guero.vercel.app" />
      </div>

      <div className="mt-6 text-center print:mt-3">
        <p className="font-heading text-guero-cream/50 text-xs tracking-widest uppercase">
          Escanea para ver el menú completo
        </p>
        <p className="font-heading text-gold-dark/60 text-xs mt-1">
          menu-guero.vercel.app
        </p>
      </div>

      <div className="flex gap-3 mt-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="btn-gold px-6 py-3 text-sm"
        >
          Imprimir
        </button>
        <a
          href="/"
          className="px-6 py-3 border border-gold-dark/30 rounded-lg font-heading text-xs tracking-widest uppercase text-guero-cream/50 hover:text-gold-light transition-colors"
        >
          Ver menú
        </a>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}
