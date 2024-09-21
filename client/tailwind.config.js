/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", /** The double asterisks match any directory level under src. This means it will recursively search through all folders and subfolders. So, the whole pattern means: "Search in the src folder and all its subfolders for any files that have one of the specified extensions (.js, .ts, .jsx, or .tsx)." */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

