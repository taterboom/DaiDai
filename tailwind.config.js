module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        keep: "4px 4px 0 0",
        ios: "0 0 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -2px rgb(0 0 0 / 0.1)",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
}
