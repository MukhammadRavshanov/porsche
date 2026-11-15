/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porsche: {
          red: '#d5001c',
          'red-dark': '#b00017',
          black: '#010203',
          dark: '#0e1114',
          card: '#16191d',
          border: '#2a2f35',
          platinum: '#e2e5e8',
          grey: '#707478',
          light: '#f7f8f9'
        }
      },
      fontFamily: {
        sans: ['"Porsche Next"', 'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        porsche: '0.15em',
        widest: '0.2em'
      }
    },
  },
  plugins: [],
}
