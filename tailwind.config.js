/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFAF3",
        sand: "#F6EBDA",
        espresso: "#302018",
        orange: "#F47721",
        ember: "#B5470A", // darker orange for small text on ivory (AA contrast)
        gold: "#FFC857",
        olive: "#556B42",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Georgia", "Cambria", "serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(48,32,24,.06), 0 8px 24px -12px rgba(48,32,24,.18)",
        lift: "0 2px 4px rgba(48,32,24,.08), 0 24px 48px -20px rgba(48,32,24,.35)",
      },
    },
  },
  plugins: [],
};
