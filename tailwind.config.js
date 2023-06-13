/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-hot': '#00C4FF',
        'green-light': '#B8F3B8',
        'yellow-hot': '#FFE7A0',
        'yellow-light': '#FFF5B8',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
