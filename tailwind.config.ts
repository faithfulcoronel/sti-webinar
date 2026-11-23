import type { Config } from "tailwindcss";

// Palette matches the seminar deck (sage, forest, cream, gold).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: "#9DBFAF",
        forest: "#264E43",
        cream: "#F7F4EC",
        charcoal: "#263238",
        mist: "#E8ECE9",
        gold: "#D9B76E",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
