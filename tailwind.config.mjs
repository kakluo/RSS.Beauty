import { addDynamicIconSelectors } from '@iconify/tailwind'
import { palettes } from '@tailus/themer-plugins'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: palettes.oz,
    },
  },
  plugins: [addDynamicIconSelectors()],
}
