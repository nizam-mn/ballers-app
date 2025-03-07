/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.js",
    "./index.js",
    "./screens/**/*.{js,jsx,ts,tsx}", // Make sure your screens are included
    "./components/**/*.{js,jsx,ts,tsx}", // Make sure your screens are included
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}