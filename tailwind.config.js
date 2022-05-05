module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        keep: "4px 4px 0 0",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
}
