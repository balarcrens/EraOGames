import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sketch: {
          bg: "#fdfbf7",
          text: "#2d2d2d",
          muted: "#e5e0d8",
          red: "#ff4d4d",
          blue: "#2d5da1",
        },
      },
      fontFamily: {
        sans: ['"Patrick Hand"', "cursive"],
        display: ['"Kalam"', "cursive"],
        hand: ['"Patrick Hand"', "cursive"],
        doodle: ['"Kalam"', "cursive"],
      },
      boxShadow: {
        sketch: "4px 4px 0px var(--shadow-color, #2d2d2d)",
        "sketch-hover": "2px 2px 0px var(--shadow-color, #2d2d2d)",
        "sketch-sm": "3px 3px 0px var(--shadow-color, #2d2d2d)",
      },
      animation: {
        "wobble": "wobble 0.5s ease-in-out",
        "sketch-in": "sketch-in 0.5s ease-out",
        "float-slow": "float-slow 4s ease-in-out infinite",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        "sketch-in": {
          "0%": { transform: "translateY(10px) rotate(-2deg)", opacity: "0" },
          "100%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
