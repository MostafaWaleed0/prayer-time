/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/[lang]/**/*.{ts,tsx}', './app/[lang]/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#FEC200'
        },
        green: {
          700: '#185D4E',
          800: '#0E5344'
        },
        fajr: '#2e689f',
        sunrise: '#fedfb1',
        dhuhr: '#FFCC33',
        asr: '#f5ad43',
        maghrib: '#fad6a5',
        isha: '#16165F'
      }
    }
  }
};
