/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile-sm": '380px',
        mobile: '480px',
        xmd: '900px',
        xlg: '1080px'
      },
      backgroundImage: {
        'background-texture': "url('/images/background-texture.png')",
        'background-texture-dark': "url('/images/background-texture-dark.png')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // basic colors
        white: '#F8F8F8',
        black: '#0B0B0B',
        'gray-1': '#333333',
        'gray-2': '#626161',
        'gray-3': '#828282',
        'gray-4': '#BDBDBD',
        'gray-5': '#D1CDC9',
        'gray-6': '#F2F2F2',
        success: '#20CD69',
        process: '#F59641',
        error: '#F14848',

        // accent colors (one accent for one key feature)
        'tools-green': '#05DFA0',
        'res-bot-blue': '#5CB1FF',
        'academy-gold': '#E5C764',
        'university-velvet': '#8A67F3',
        'calendar-red': '#FD4A55',
        'prime-pink': '#F076E4',

        // linear gradients
        corral: '#FF6275',
        purple: '#CC5DA7'
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

