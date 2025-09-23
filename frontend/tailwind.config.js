/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or "media" if you want system-based

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        secondary: "#2563eb",
        accent: "#38bdf8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },

  plugins: [],
};
