/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wellness: {
          hero: '#D1E2D3', // Soft Sage
          'hero-light': '#E8EFE9', // Lighter variant for subtle gradients
          background: '#F9F8F3', // Warm Cream
          text: '#2D3A3A', // Charcoal Green
          'text-light': '#4A5B5B', // Lighter variant for secondary text
          primary: '#7BA388', // Muted Forest
          'primary-hover': '#64886E', // Darker variant for hover states
          'primary-light': '#9AC0A6', // Lighter variant for accents
        }
      }
    },
  },
  plugins: [],
}

