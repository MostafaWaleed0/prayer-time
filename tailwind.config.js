/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
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
      },

      container: {
        center: true
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: 'min(100% - 2rem, 70rem)'
        }
      });
    },
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
};
