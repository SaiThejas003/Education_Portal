/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#FBF3F4',
          100: '#F9E8EB',
          200: '#F0CDD2',
          300: '#E4A8B0',
          400: '#D17B86',
          500: '#B8505E',
          600: '#9A2E40',
          700: '#8A1B2F',
          800: '#6E1626',
          900: '#530F1D',
        },
        rose: {
          50: '#FEF6F7',
          100: '#F9E8EB',
          200: '#F3D1D6',
          300: '#ECBAC2',
          400: '#E0A3AD',
          500: '#D17B86',
          600: '#B85967',
          700: '#993F4D',
          800: '#7A2F3B',
          900: '#5E222C',
        },
        mint: {
          50: '#F1FBF3',
          100: '#E8F5E9',
          200: '#C8E6C9',
          300: '#A5D6A7',
          400: '#81C784',
          500: '#66BB6A',
          600: '#4CAF50',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        ai: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#2E1065',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)',
        elevated: '0 4px 12px -2px rgba(0,0,0,0.06), 0 2px 6px -2px rgba(0,0,0,0.04)',
        deep: '0 12px 32px -8px rgba(138,27,47,0.18)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
