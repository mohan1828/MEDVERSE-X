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
        space: {
          bg: '#0B1220',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(0, 229, 255, 0.15)',
          hover: 'rgba(0, 229, 255, 0.25)',
        },
        cyan: {
          glow: '#00E5FF',
        },
        mint: {
          glow: '#00FFB2',
        },
        purple: {
          glow: '#7C3AED',
        },
        danger: {
          glow: '#FF3366',
        },
        warning: {
          glow: '#FFB800',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 229, 255, 0.4)',
        'mint-glow': '0 0 25px rgba(0, 255, 178, 0.4)',
        'purple-glow': '0 0 25px rgba(124, 58, 237, 0.4)',
        'danger-glow': '0 0 35px rgba(255, 51, 102, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.12)' },
          '35%': { transform: 'scale(1.04)' },
          '45%': { transform: 'scale(1.18)' },
        }
      }
    },
  },
  plugins: [],
}
