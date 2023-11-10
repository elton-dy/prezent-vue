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
      },

    },
  },
  plugins: [],
}

