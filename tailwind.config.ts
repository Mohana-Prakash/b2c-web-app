import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        raleway: ['"Raleway"', "sans-serif"],
        futura: ['"Futura Std"', "sans-serif"],
      },
      colors: {
        "orange-500": "#F68456",
        green: "#0EAA5D",
        "grey-500": "#333333", // for text
        "grey-300": "#A1A1A1", // placeholder color
        "grey-400": "#767676", // for text
        background: {
          DEFAULT: "var(--background)", // Light mode background
          dark: "var(--background-dark)", // Dark mode background
        },
        foreground: {
          DEFAULT: "var(--foreground)", // Light mode foreground
          dark: "var(--foreground-dark)", // Dark mode foreground
        },
      },

      //we can add here addiditional items like fonts, and other utilities here.
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
    },
  },

  // Add plugins (e.g., forms, typography, etc.)
  plugins: [],
};

export default config;
