/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        app: "#fff",
        "main-text": "#000",
        btn: "#00B2FF",
        "red-rose": "#FF0000",
        "prioty-text-1": "#0B6E4F",
        "prioty-bg-1": "#21D375",
        "prioty-text-2": "#F58216",
        "prioty-bg-2": "#F7BE6D",
        "prioty-text-3": "#545454",
        "prioty-bg-3": "#D4D4D4",
        error: "#FF4C00",
        "error-shade": "#ff7b7b",
        warning: "#FFB700",
        "drop-box-bg": "rgba(148, 163, 184, 0.3)",
        "warning-shade": "#ff7b7b",
        success: "#58b55b",
        "success-shade": "",
      },

      boxShadow: {
        header: "0px 5px 35px 0px rgba(18, 14, 66, 0.05)",
        task: "0px 4px 24px 0px rgba(0, 0, 0, 0.10)",
        dropdown: "0px 4px 34px 0px rgba(0, 0, 0, 0.05)",
      },

      fontFamily: {
        "roboto-regular": ["roboto-regular", "Arial"],
        "roboto-bold": ["roboto-bold", "Arial"],
        "roboto-medium": ["roboto-medium", "Arial"],
      },

      gridTemplateColumns: {
        task: "repeat(auto-fill, minmax(155px, 255px))",
      },

      animation: {
        toast: "toast 1s ease-in-out forwards",
      },

      keyframes: {
        toast: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(20px)" },
          "100%": { transform: "translateX(-200%)" },
        },
      },
    },
  },

  safelist: [
    "text-error",
    "text-success",
    "text-warning",
    "border-error",
    "border-success",
    "border-warning",
    "bg-success-shade",
    "bg-error-shade",
    "bg-warning-shade",
  ],
  plugins: [],
};
