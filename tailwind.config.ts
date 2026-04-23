import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          DEFAULT: "#9E4822",
          light:   "#B85C35",
          dark:    "#7A3418",
          muted:   "#C49070",
        },
        anthracite: {
          DEFAULT: "#252220",
          light:   "#3A3734",
          lighter: "#5C5956",
          50:      "#F2F1F0",
        },
        cream: {
          DEFAULT: "#F6F3EE",
          dark:    "#EAE6DD",
        },
      },
      fontFamily: {
        serif: ["Old Standard TT", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
