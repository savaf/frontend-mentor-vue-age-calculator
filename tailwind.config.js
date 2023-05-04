/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#854DFF',
        'red-light': '#FF5959',
        white: '#FFFFFF',
        'grey-light': '#F0F0F0',
        'line': '#DCDCDC',
        'grey': '#716F6F',
        'black-off': '#151515'
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        base: '14px',
      },
      borderRadius: {
        convex: "24px 24px 100px 24px"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

