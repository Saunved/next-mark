/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Inter"',
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      typography: {
        neutral: {
          css: {
            "--tw-prose-body": colors.stone[900],
            "--tw-prose-headings": colors.zinc[900],
            "--tw-prose-lead": colors.zinc[600],
            "--tw-prose-links": colors.zinc[900],
            "--tw-prose-bold": colors.zinc[900],
            "--tw-prose-counters": colors.zinc[500],
            "--tw-prose-bullets": colors.zinc[500],
            "--tw-prose-hr": colors.zinc[200],
            "--tw-prose-quotes": colors.zinc[900],
            "--tw-prose-quote-borders": colors.zinc[200],
            "--tw-prose-captions": colors.zinc[500],
            "--tw-prose-code": colors.zinc[900],
            "--tw-prose-pre-code": colors.zinc[200],
            "--tw-prose-pre-bg": colors.zinc[800],
            "--tw-prose-th-borders": colors.zinc[300],
            "--tw-prose-td-borders": colors.zinc[200],
            "--tw-prose-invert-body": colors.zinc[300],
            "--tw-prose-invert-headings": colors.white,
            "--tw-prose-invert-lead": colors.zinc[400],
            "--tw-prose-invert-links": colors.white,
            "--tw-prose-invert-bold": colors.white,
            "--tw-prose-invert-counters": colors.zinc[400],
            "--tw-prose-invert-bullets": colors.zinc[600],
            "--tw-prose-invert-hr": colors.zinc[700],
            "--tw-prose-invert-quotes": colors.zinc[100],
            "--tw-prose-invert-quote-borders": colors.zinc[700],
            "--tw-prose-invert-captions": colors.zinc[400],
            "--tw-prose-invert-code": colors.white,
            "--tw-prose-invert-pre-code": colors.zinc[300],
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": colors.zinc[600],
            "--tw-prose-invert-td-borders": colors.zinc[700],
          },
        },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography")],
};
