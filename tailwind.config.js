/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "warm-white": "#FDFBF7",
        charcoal: "#1B1917",
        "maroon-deep": "#841818",
        "maroon-dark": "#5B1010",
        gold: "#C9A227",
        "gold-light": "#F0DFA8",
        "gold-dark": "#A8851E",
        muted: "#57534E",
        "border-light": "#E7E3DF",
        "border-mid": "#D6D1CC",
        danger: "#B3261E",
        "danger-light": "#FCE8E6",
        white: "#FFFFFF",
      },

      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },

      maxWidth: {
        container: "1280px",
      },

      borderRadius: {
        control: "0.5rem",
        card: "0.5rem",
      },

      boxShadow: {
        card: "0 4px 10px rgba(110, 15, 26, 0.04)",
        header: "0 1px 2px rgba(16, 8, 6, 0.06)",
      },
    },
  },

  plugins: [],
};