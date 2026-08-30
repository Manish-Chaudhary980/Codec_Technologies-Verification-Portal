/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'codec-purple': '#6B21A8',
        'codec-blue': '#3B82F6',
        'codec-pink': '#EC4899',
      },
    },
  },
  plugins: [],
}
