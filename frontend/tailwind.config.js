/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Palette: ink sidebar, teal for income, coral for expenses
        ink: { 900: '#14202e', 800: '#1c2b3d', 700: '#2a3d54' },
        income: { DEFAULT: '#0f766e', soft: '#ccfbf1' },
        expense: { DEFAULT: '#e5484d', soft: '#ffe4e6' },
      },
    },
  },
  plugins: [],
};
