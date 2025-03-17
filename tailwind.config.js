/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: { // Pastikan colors ada di dalam extend
      screens: {
        xs: '300px',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Menggunakan Inter sebagai default sans
      },
      colors: { 
        primary: "#AF2F33",
        yellowHm: "#F2A83B",
      },
    },
  },
  plugins: [],
};
