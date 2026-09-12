/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#070b14',
          card: '#0d1527',
          border: '#1e293b',
          neonCyan: '#06b6d4',
          neonCyanGlow: '#22d3ee',
          neonMagenta: '#ff00ff',
          neonPinkGlow: '#fb7185',
          neonAmber: '#f59e0b',
          neonEmerald: '#10b981',
          slateMuted: '#64748b'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.45), 0 0 30px rgba(6, 182, 212, 0.2)',
        'neon-pink': '0 0 15px rgba(244, 63, 94, 0.45), 0 0 30px rgba(244, 63, 94, 0.2)',
        'neon-emerald': '0 0 15px rgba(16, 185, 129, 0.45)',
        'kiosk-inset': 'inset 0 2px 10px rgba(0, 0, 0, 0.8), inset 0 0 15px rgba(6, 182, 212, 0.15)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glow: {
          'from': { opacity: '0.6' },
          'to': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
