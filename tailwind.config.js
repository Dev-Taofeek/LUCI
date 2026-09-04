/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "warm-white": "#FDFBF7",
        charcoal: "#000000",
        "maroon-deep": "#841818",
        muted: "#6B6B6B",
        white: "#FAFAFA",
      },

      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },

      maxWidth: {
        container: "1280px",
      },
    },
  },

  plugins: [],
};