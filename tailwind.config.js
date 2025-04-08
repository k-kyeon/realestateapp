/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        MontserratBold: ["Montserrat-Bold", "sans-serif"],
        MontserratLight: ["Montserrat-Light", "sans-serif"],
        MontserratMedium: ["Montserrat-Medium", "sans-serif"],
        MontserratRegular: ["Montserrat-Regular", "sans-serif"],
        MontserratSemiBold: ["Montserrat-SemiBold", "sans-serif"],
        MontserratThin: ["Montserrat-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
