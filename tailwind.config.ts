import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F0B429',
          dark: '#C9922A',
        },
        guero: {
          red: '#CC1F1F',
          cream: '#F5EDD8',
          bg: '#0D0D0D',
          surface: '#161616',
          card: '#1C1C1C',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-oswald)', 'Impact', 'sans-serif'],
      },
      animation: {
        'ken-burns': 'kenBurns 9s ease-out forwards',
        'fade-up':   'fadeSlideUp 0.65s ease-out both',
        'fade-down': 'fadeDown 0.5s ease-out both',
        'gold-shimmer': 'goldShimmer 4s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        kenBurns: {
          from: { transform: 'scale(1.05)' },
          to:   { transform: 'scale(1)' },
        },
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,146,42,0.3)' },
          '50%':      { boxShadow: '0 0 28px rgba(240,180,41,0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
