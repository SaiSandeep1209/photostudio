/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0B0E',      // page background (black)
        panel: '#141210',     // cards, sections (warm-tinted black)
        accent: '#FF6A2C',    // orange signal — "click me / active"
        'accent-bright': '#FF875A',
        glow: '#FFB020',      // amber — hover/interaction only, never at rest
        ink: '#F3F3F5',       // text primary
        muted: '#94908A',     // text muted (warm grey)
      },
      fontFamily: {
        display: ['"Clash Display"', 'Space Grotesk', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 40px rgba(0,0,0,0.45)',
        'accent-glow': '0 0 0 1px rgba(255,106,44,0.5), 0 8px 30px rgba(255,106,44,0.38)',
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,0.61,0.36,1) both',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
    },
  },
  plugins: [],
}
