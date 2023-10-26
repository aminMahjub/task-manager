/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx}"],
  theme: {
    extend: {
      colors: {
        "main-dark": "#000",
        "pure-white": "#fff",
        "low-priority-txt": "#ABABAB",
        "badge-bg-1": "#2F80ED",
        "badge-bg-2": "#27AE60",
        "badge-bg-3": "#F2994A",
        "badge-bg-4": "#EB5757",
        "badge-bg-5": "#9B51E0",
        "checkbox-border": "#EB5757",
        "input-bg": "#E1DEDE",
      },
    },
  },
  plugins: [],
};
