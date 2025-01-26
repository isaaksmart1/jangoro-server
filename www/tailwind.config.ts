import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "oe-white": "#ffffff",
        "oe-black": "#000000",
        "oe-accent": "#3bc1f6",
        "oe-primary": "#4d195c",
        "oe-secondary": "#3b82f6",
        "oe-tertiary": "#3b1446",
      },
    },
  },
  plugins: [],
} satisfies Config;
