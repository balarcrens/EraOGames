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
        gaming: {
          bg: {
            light: "#f8fafc",
            dark: "#080b11",
          },
          card: {
            light: "#ffffff",
            dark: "#121824",
          },
          panel: {
            light: "#f1f5f9",
            dark: "#0f131f",
          },
          accent: {
            purple: "#8b5cf6",
            indigo: "#6366f1",
            fuchsia: "#d946ef",
            blue: "#3b82f6",
            pink: "#ec4899",
            orange: "#f97316",
          }
        },
        // Preserve legacy overrides to prevent breaking code references
        sketch: {
          bg: "#f8fafc",
          text: "#0f172a",
          muted: "#64748b",
          red: "#8b5cf6",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        // Outfit: ultra-clean, modern geometric sans-serif
        sans: ['"Outfit"', "sans-serif"],
        // Rajdhani: futuristic, condensed tech-gaming display font
        display: ['"Rajdhani"', "sans-serif"],
        // Preserve legacy overrides to prevent compilation crashes
        hand: ['"Outfit"', "sans-serif"],
        doodle: ['"Rajdhani"', "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -15px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "premium-hover": "0 20px 40px -15px rgba(124, 58, 237, 0.15), 0 8px 16px -6px rgba(124, 58, 237, 0.1)",
        glow: "0 0 15px 3px rgba(139, 92, 246, 0.2)",
        "glow-sm": "0 0 8px 2px rgba(139, 92, 246, 0.15)",
        // Preserve legacy mappings
        sketch: "0 4px 12px 0 rgba(0, 0, 0, 0.03)",
        "sketch-hover": "0 12px 24px 0 rgba(0, 0, 0, 0.08)",
        "sketch-sm": "0 2px 6px 0 rgba(0, 0, 0, 0.02)",
      },
      animation: {
        "float-slow": "float-slow 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 5s ease infinite",
        "wobble": "wobble 0.5s ease-in-out",
        "sketch-in": "sketch-in 0.5s ease-out",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(-0.5deg)" },
          "50%": { transform: "rotate(0.5deg)" },
        },
        "sketch-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
