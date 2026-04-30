'use client'

import { useEffect, useState } from 'react'

export default function HorarioBadge() {
  const [status, setStatus] = useState<'abierto' | 'cerrado' | null>(null)
  const [minutosParaCerrar, setMinutosParaCerrar] = useState<number | null>(null)

  useEffect(() => {
    function check() {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes()
      const open = h >= 18 && h <= 23

      setStatus(open ? 'abierto' : 'cerrado')

      if (open) {
        const minutosRestantes = (23 - h) * 60 + (60 - m)
        setMinutosParaCerrar(minutosRestantes <= 60 ? minutosRestantes : null)
      } else {
        setMinutosParaCerrar(null)
      }
    }
    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  if (status === 'abierto') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 font-heading text-[10px] tracking-widest uppercase text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        {minutosParaCerrar ? `Cierra en ${minutosParaCerrar} min` : 'Abierto ahora'}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-guero-red/10 border border-guero-red/25 font-heading text-[10px] tracking-widest uppercase text-guero-red/70">
      <span className="w-1.5 h-1.5 rounded-full bg-guero-red/60" />
      Cerrado · Abre 6 PM
    </span>
  )
}
