import type { Config } from "tailwindcss";

// Tokens copied from design/design-spec.md and the "Styles and components" frame.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#264E43", hover: "#3C6157", soft: "#4F7167" },
        sage: "#9DBFAF",
        cream: "#F7F4EC",
        charcoal: { DEFAULT: "#263238", soft: "#4A555B", muted: "#5B666C" },
        mist: "#E8ECE9",
        gold: "#D9B76E",
        error: "#B91C1C",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: { input: "8px", card: "12px", form: "16px" },
      boxShadow: {
        card: "0 1px 2px rgba(38,50,56,0.12)",
        form: "0 4px 12px rgba(38,50,56,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
