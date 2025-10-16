/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'wmg-bg': '#0a1f1a',
        'wmg-text': '#f5f5f0',
        'wmg-gold': '#d4af37',
      },
      fontFamily: {
        'heading': ['Cormorant Garamond', 'serif'],
        'body': ['Manrope', 'sans-serif'],
        'sans': ['Manrope', 'sans-serif'],
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'floatDelayed 10s ease-in-out infinite 2s',
        'float-slow': 'floatSlow 12s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)' },
          '33%': { transform: 'translateY(-20px) translateX(10px) scale(1.05)' },
          '66%': { transform: 'translateY(10px) translateX(-5px) scale(0.95)' },
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)' },
          '33%': { transform: 'translateY(15px) translateX(-10px) scale(0.95)' },
          '66%': { transform: 'translateY(-10px) translateX(5px) scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)' },
          '25%': { transform: 'translateY(-15px) translateX(8px) scale(1.02)' },
          '50%': { transform: 'translateY(-8px) translateX(-5px) scale(0.98)' },
          '75%': { transform: 'translateY(12px) translateX(3px) scale(1.01)' },
        },
      },
    },
  },
  plugins: [],
}
