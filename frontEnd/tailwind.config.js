/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: "#071327",
        green: "#BFCF59",
        red: "#ED6656",
      },
    },
  },
  plugins: [],
};
