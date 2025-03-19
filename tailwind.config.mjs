/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: [
          'NanumSquare',
          ...require('tailwindcss/defaultTheme').fontFamily.sans,
        ],
      },
    },
    screens: {
      xs: '320px',
      sm: '576px',
      // => @media (min-width: 576px) { ... }
      md: '860px',
      // => @media (min-width: 960px) { ... }
      lg: '1200px',
      // => @media (min-width: 1440px) { ... }
      xl: '1440px',

      xl2: '1920px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
