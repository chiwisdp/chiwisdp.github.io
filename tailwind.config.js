module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#D5FF18",
        secondary: "#F5F8FA",
        accent: "#657786",
        background: "#0A0A0A",
        text: "#14171A",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
