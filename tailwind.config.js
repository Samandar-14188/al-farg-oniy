/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981', // Primary Emerald
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          dark: '#0B132B',
          navy: '#1C2541',
          accent: '#3A506B',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
