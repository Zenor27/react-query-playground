/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      neutral200: "#D9DDE1",
      neutral100: "#EFF1F3",
      neutral50: "#F7F8F9",
      positive50: "#DDEEEB",
      neutral500: "#687787",
      neutral800: "#1A2A34",
    },
  },
  plugins: [],
};
