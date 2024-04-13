/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: colors.transparent,
      accent: 'rgb(var(--color-accent) / <alpha-value>)',
      bgBlack: 'rgb(var(--color-bg) / <alpha-value>)',
      primary: 'rgb(var(--color-text) / <alpha-value>)',
      secondary: 'rgb(var(--color-text-muted) / <alpha-value>)',
    },
  },
  plugins: [],
};
