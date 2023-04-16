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
  // screens: {
  //   '2xl': { min: '1535px' },
  //   // => @media (max-width: 1535px) { ... }

  //   xl: { min: '1279px' },
  //   // => @media (max-width: 1279px) { ... }

  //   lg: { min: '1080px' },
  //   // => @media (max-width: 1023px) { ... }

  //   md: { min: '767px' },
  //   // => @media (max-width: 767px) { ... }

  //   sm: { min: '639px' }
  //   // => @media (max-width: 639px) { ... }
  // },

  plugins: [require('@tailwindcss/line-clamp')]
}
