'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Contraseña incorrecta')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-guero-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-gold-light text-2xl">Taquería El Güero</p>
          <p className="font-heading text-guero-cream/40 text-xs tracking-widest uppercase mt-1">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-guero-surface border border-gold-dark/20 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block font-heading text-xs tracking-widest uppercase text-guero-cream/50 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-guero-bg border border-gold-dark/30 rounded-lg px-4 py-3 text-guero-cream font-heading text-sm focus:outline-none focus:border-gold-light transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-guero-red text-sm font-heading text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-dark hover:bg-gold-light text-guero-bg font-heading font-bold text-sm tracking-widest uppercase py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
