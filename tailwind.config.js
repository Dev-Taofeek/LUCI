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
        charcoal: "#252525",
        "maroon-deep": "#5A1828",
        muted: "#6B6B6B",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },

      maxWidth: {
        container: "1280px",
      },
    },
  },

  plugins: [],
};