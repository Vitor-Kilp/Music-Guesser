/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          '950': '#000F33'
        },
        'main-background': '#1A1A1D',
        'primary': '#C3073F',
        'secondary': '#6F2232',
        'accent': '#950740',
        'text-primary': '#4E4E50'
      }
    },
  },
  plugins: [],
}

