/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#FEC200'
        },
        green: {
          700: '#185D4E',
          800: '#0E5344'
        }
      }
    }
  }
};
