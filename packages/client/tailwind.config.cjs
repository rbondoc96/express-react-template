const colors = require('tailwindcss/colors');
const {fontSizes} = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      black: 'rgb(9, 9, 20)',
      dark: 'hsl(200, 3%, 21%)',
      light: 'hsl(0, 0%, 95%)',
      white: 'rgb(243, 243, 243)',
      orange: 'rgb(222, 150, 80)',
      blue: {
        DEFAULT: 'rgb(90, 180, 231)',
      },
      gray: {
        DEFAULT: colors.gray['300'],
      },
      overlay: {
        DEFAULT: 'rgba(20, 20, 20, 0.5)',
      },
      primary: {
        DEFAULT: 'hsl(347, 67.8%, 47.5%)',
      },
      secondary: {
        DEFAULT: 'hsl(185, 90.2%, 48.2%)',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      xl: 'clamp(1rem, 2.5vw, 1.25rem)',
      '5xl': 'clamp(1.8rem, 6.5vw, 3rem)',
      '7xl': 'clamp(3rem, 10vw, 4.5rem)',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
};
