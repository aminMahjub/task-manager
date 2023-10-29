/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        app: "#fff",
        "main-text": "#000",
        "add-btn": "#00B2FF",
        "red-rose": "#FF0000",
        "prioty-text-1": "#0B6E4F",
        "prioty-bg-1": "#21D375",
        "prioty-text-2": "#F58216",
        "prioty-bg-2": "#F7BE6D",
        "prioty-text-3": "#545454",
        "prioty-bg-3": "#D4D4D4",
      },

      boxShadow: {
        header: "0px 5px 35px 0px rgba(18, 14, 66, 0.05)",
        todo: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
        dropdown: "0px 4px 34px 0px rgba(0, 0, 0, 0.05)",
      },

      fontFamily: {
        "roboto-regular": ["roboto-regular", "Arial"],
        "roboto-bold": ["roboto-bold", "Arial"],
        "roboto-medium": ["roboto-medium", "Arial"],
      },
    },
  },
  plugins: [],
};
