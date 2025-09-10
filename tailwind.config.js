// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <-- aquí activamos dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            bg: "var(--color-bg)",
            "bg-offset": "var(--color-bg-offset)",
            text: "var(--color-text)",
            "text-offset": "var(--color-text-offset)",
            border: "var(--color-border)",
            primary: "var(--color-primary)",
            "primary-offset": "var(--color-primary-offset)",
            "primary-hover": "var(--color-prymary-hover)",
            secondary: "var(--color-secondary)",
        },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};