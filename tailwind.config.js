const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "background-700": "#1d1e26",
        background: "#2b2b36",
        "background-300": "#353641",
        "primary-700": "#542ca7",
        primary: "#673ab7",
        "primary-300": "#9575cd",
        "secondary-700": "#028df1",
        secondary: "#039ff4",
        "secondary-300": "#4fbcf7",
        "error-700": "#c22525",
        error: "#ce3131",
        "error-300": "#dd6f6f",
        "warning-700": "#fab800",
        warning: "#fbc500",
        "warning-300": "#fcd64d",
        "success-700": "#0ea163",
        success: "#13b176",
        "success-300": "#5ac89f",
        overlay: "#232a3beb",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
