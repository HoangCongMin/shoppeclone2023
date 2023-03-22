/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        bgorange: 'rgb(255 247 237)'
      },
      boxShadow: {
        '3xl': '0 0.0625rem 20px 0 rgb(0 0 0 / 5%)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
