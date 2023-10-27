// this file is here for intellisense

import type { Config } from "tailwindcss";
const config: Partial<Config> = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      main: "#10101E",
      background: "#E1E1EF",
      primary: "#513668",
      secondary: "#ECDAEB",
      accent: "#A555A2",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      xs: "12px",
      s: "14px",
      m: "18px",
      l: "20px",
      xl: "32px",
      xxl: [
        "100px",
        {
          lineHeight: "104px",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      borderRadius: {
        l: "25px",
        m: "15px",
        s: "10px",
      },
    },
  },
};

export default config;
