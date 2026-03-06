import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: '#f0a500',
          dark: '#b87800',
          mid: '#f5c842',
          bg: '#fff8e1',
          light: '#fffbf0',
        },
        ink: '#141008',
        dark: {
          DEFAULT: '#18140c',
          2: '#221e14',
          3: '#2c2618',
        },
        body: '#2e2820',
        muted: '#6b6258',
        sec: '#9e9488',
        off: '#fdfcf9',
        warm: '#f7f4ee',
        ll: '#e8e2d8',
        lm: '#d4ccc0',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      maxWidth: {
        inner: '1160px',
      },
    },
  },
  plugins: [],
}

export default config
