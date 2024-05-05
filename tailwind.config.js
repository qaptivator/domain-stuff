/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  // easy: {
  //  light: '#75F347',
  //  DEFAULT: '#75F347',
  //  dark: '#75F347',
  // },
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
      },
    },
  },
  plugins: [],
  //darkMode: "selector",
  safelist: [
    "font-outline-1",
    "font-outline-2",
    "font-outline-4",
    "bg-black",
    "bg-white",
  ],
};
