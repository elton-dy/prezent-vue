/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'royal-purple': '#5E17EB',
        'flame-orange': '#FF6E40',
        'pale-gray': '#D4D4D4',
        'soft-ivory': '#FFF8E1',
        'soft-green': '#A8D5BA',
        'mustard-yellow': '#FFC857'
      },
      backgroundImage: {
        'border-gradient': "linear-gradient(45deg, #5E17EB, #FF6E40, #5E17EB, #FF6E40)",
      },
    },
  },
  plugins: [],
}

