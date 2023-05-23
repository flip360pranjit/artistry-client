/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3c166d",
        secondary: "#cca300",
        "primary-hover": "#5a258d",
        "secondary-hover": "#ffd700",
      },
      fontFamily: {
        poppins: ["Poppins"],
        "great-vibes": ['"Great Vibes"'],
        montserrat: ["Montserrat"],
        "open-sans": ['"Open Sans"'],
        "playfair-display": ['"Playfair Display"'],
        lobster: ["Lobster"],
      },
    },
  },
  plugins: [],
};
