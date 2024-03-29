// this file is here for intellisense

import type { Config } from "tailwindcss";
const config = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      s: "0.875rem",
      m: "1.125rem",
      l: "1.25rem",
      xl: "2rem",
    },
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        main: "#10101E",
        background: "#E1E1EF",
        primary: "#513668",
        secondary: "#ECDAEB",
        accent: "#A555A2",
      },
      boxShadow: {
        accent: "#a555a2 -7px 7px",
        accentHover: "#a555a2 -4px 4px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderRadius: {
        l: "25px",
        m: "15px",
        s: "10px",
      },
      animation: {
        zoombounce: "zoombounce 0.35s ease-in-out",
      },
      keyframes: {
        zoombounce: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.15)",
          },
        },
      },
    },
  },
} satisfies Config;

export default config;
