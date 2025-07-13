/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // already set correctly
  ],
  theme: {
    extend: {
      colors: {
        main1: "#1C4130",
        main2: "#C7882B",
        accent: "#C03F2A",
        light: "#FFF9ED",
        dark: "#181C19",
        grayish: "#F3EEE5",
      },
      fontFamily: {
      
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
