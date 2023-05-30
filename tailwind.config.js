/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-hot': '#609966',
        'green-light': '#B8F3B8',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
