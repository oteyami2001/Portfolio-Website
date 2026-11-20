import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#050A14", 900: "#0B1220", 850: "#0F1A2E", 800: "#13213A", 700: "#1C2E4D" },
        azure: { 500: "#2F6BFF", 400: "#5B8CFF" },
        cyan: { 300: "#7FE3F5", 400: "#35C8E8", 500: "#1FB3D6" },
        amber: { 400: "#F3B65D" },
        mist: { 100: "#E8EEF8", 300: "#B6C2D9", 400: "#8A99B8" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "76rem" },
    },
  },
  plugins: [],
} satisfies Config;
