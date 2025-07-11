/** @type {import('tailwindcss').Config} */
export default {
  // 🌙 Enable dark mode via .dark class
  darkMode: "class",

  // 📁 Files Tailwind will scan for class names and directives
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}", // ✅ added css for @apply support
  ],

  // 🎨 Theme Customizations
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",     // Dark blue
        secondary: "#2563eb",   // Medium blue
        accent: "#38bdf8",      // Light blue
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

  // 🔌 Optional plugins (add when needed)
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
