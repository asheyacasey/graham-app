/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand_white: {
          500: "#F6F7FB",
        },
        brand_yellow: {
          50: '#fff3cf',
          400: "#EEC200",
          500: "#FFC10E",
        },
        brand_blue: {
          50: "#FAFAFB",
          200: "#50B5FF",
          300: "#4493EF",
          500: "#00005B",
          600: "#0062FF",
          700: "#0064D2",
        },
        brand_gray: {
          50: "#696974",
          100: "#B5B5BE",
          200: "#92929D",
          300: "#959EAD",
          400: "#44444F",
          500: "#E2E2EA",
          600: "#F1F1F5",
          700: "#92929D",
          800: "#373737",
          900: "#E1E1E1",
        },
        brand_green: {
          50: "#D0E7DC",
          200: "#3DD598",
          300: "#369768",
          400: "#26A547",
          500: "#38E25D",
          600: "#86B817",
          700: "#20A779"
        },
        brand_red: {
          500: "#EB2424",
          600: "#FC5A5A",
          700: "#FF0000",
        },
        brand_pink: {
          500: "#CECECE",
        },
        brand_purple: {
          500: "#A228B6",
          50: "#ecd4f0",
          400: "#4F52FF"
        },
      },
      fontFamily: {
        sans: ["Montserrat"],
        Montserrat: ["Montserrat"],
        Roboto: ["Roboto"],
        Poppins: ["Poppins"],
      },
      borderRadius: {
        "20px": "20px",
        "10px": "10px",
        "14px": "14px",
      },
      fontSize: {
        "10px": "10px",
        "18px": "18px",
      },
      padding: {
        30: "30px",
      },
      width: {
        "18px": "18px",
      },
      height: {
        "18px": "18px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
