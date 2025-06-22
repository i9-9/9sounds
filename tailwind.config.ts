import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica': ['var(--font-helvetica-now-display)', 'sans-serif'],
        'ibm': ['var(--font-ibm-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config 