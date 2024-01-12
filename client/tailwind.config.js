module.exports = {
  content: ["./src/**/*.{html,tsx,jsx,}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCFCFB", // White-like background
        secondary: "#030303", // Black-like text
        accent: "#CA0000", // Red-like elements
        neutral: "#F3F4F6", // Light grey for neutral areas
        "base-100": "#FFFFFF", // White background
      },
    },
  },
  daisyui: {
    themes: [
      {
        gymbuddy: {
          primary: "#FCFCFB",
          secondary: "#030303",
          accent: "#CA0000",
          neutral: "#F3F4F6",
          "base-100": "#FFFFFF",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        main: {
          primary: "#FCFCFB",

          secondary: "#030303",

          accent: "#CA0000",

          neutral: "#F3F4F6",

          "base-100": "#FFFFFF",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
};
