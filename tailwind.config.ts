// this file is here for intellisense

import type { Config } from "tailwindcss";
const config: Partial<Config> = {
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
    },
  },
};

export default config;
