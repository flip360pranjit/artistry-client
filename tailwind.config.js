/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "mobile-sm": "328px",
        "mobile-md1": "347px",
        "mobile-md2": "367px",
        "mobile-lg": "389px",
        mobile: "482px",
        "mobile-start": "580px",
      },
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
  plugins: [require("@tailwindcss/forms")],
};
