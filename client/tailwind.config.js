/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FDF8EC',
          100: '#F9EFCC',
          200: '#F2DC97',
          300: '#EACB64',
          400: '#DFBA3B',
          500: '#C9A84C',
          600: '#A88820',
          700: '#7E6618',
          800: '#52420F',
          900: '#292108',
        },
        apex: {
          black: '#0D0D0D',
          dark:  '#1A1A1A',
          gray:  '#4A4A4A',
          muted: '#888888',
          light: '#F8F7F4',
          border:'#E5E2DC',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        accent:  ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}
