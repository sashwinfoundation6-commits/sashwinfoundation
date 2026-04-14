import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-void)",
        foreground: "var(--color-ivory)",
        void: "#080808",
        obsidian: "#0F0F0F",
        carbon: "#1A1A1A",
        ivory: {
          DEFAULT: "#F5F0E8",
          muted: "#B8B0A4",
        },
        gold: {
          DEEP: "#A07830",
          DEFAULT: "#C9A84C",
          BRIGHT: "#E8C96D",
          PALE: "#F0E0A0",
        },
        terra: {
          DEFAULT: "#8B4513",
          light: "#C47A3A",
        },
        forest: "#0D1A0D",
        copper: "#B87333",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        impact: ["var(--font-impact)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #A07830, #E8C96D, #A07830)",
        "gradient-hero": "linear-gradient(160deg, #080808 0%, #1A1208 60%, #0D0A05 100%)",
        "gradient-mishti": "linear-gradient(180deg, #0D1A0D 0%, #080808 100%)",
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(150%) skewX(-20deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { transform: 'translateY(110%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
