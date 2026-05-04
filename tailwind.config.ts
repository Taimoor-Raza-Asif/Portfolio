/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080b14',
        surface: '#0d1520',
        border: {
          DEFAULT: '#1e2a3a',
          hover: 'rgba(34,211,238,0.4)',
        },
        cyan: {
          accent: '#22d3ee',
          DEFAULT: '#22d3ee',
          50: 'rgba(34,211,238,0.05)',
          100: 'rgba(34,211,238,0.1)',
          200: 'rgba(34,211,238,0.2)',
          400: '#22d3ee',
        },
        purple: {
          accent: '#818cf8',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typewriter': 'typewriter 2s steps(20) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(34,211,238,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(34,211,238,0.8)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.1) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      maxWidth: {
        'content': '1100px',
      },
    },
  },
  plugins: [],
}
