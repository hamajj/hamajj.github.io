/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./error.vue",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        vt: ['VT323', 'monospace'],
        ui: ['Tahoma', '"MS Sans Serif"', '"Segoe UI"', 'Verdana', 'sans-serif'],
      },
      colors: {
        desktop: {
          DEFAULT: '#008080',
          dark: '#006666',
          deep: '#004d4d',
        },
        win: {
          gray: '#c0c0c0',
          light: '#dfdfdf',
          mid: '#808080',
          dark: '#000000',
          white: '#ffffff',
        },
        title: {
          blue: '#000080',
          sky: '#1084d0',
          inactive: '#808080',
        },
        acc: {
          lime: '#32cd32',
          pink: '#ff69b4',
          cyan: '#00e5ff',
          yellow: '#ffe600',
          orange: '#ff7a00',
          purple: '#a020f0',
          red: '#e02020',
        },
      },
      keyframes: {
        'win-open': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'menu-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        stripes: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '28px 0' },
        },
        'pet-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-3px, 1px)' },
          '40%': { transform: 'translate(3px, -1px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
        },
        'flash': {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'tip-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'win-open': 'win-open 0.14s ease-out',
        'menu-up': 'menu-up 0.12s ease-out',
        blink: 'blink 1s step-end infinite',
        stripes: 'stripes 0.6s linear infinite',
        'pet-bounce': 'pet-bounce 0.5s ease-in-out infinite',
        shake: 'shake 0.3s linear 3',
        flash: 'flash 0.4s ease-out',
        'tip-in': 'tip-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
