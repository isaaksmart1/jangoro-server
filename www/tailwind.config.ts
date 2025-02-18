import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "jgo-white": "#ffffff",
        "jgo-black": "#000000",
        "jgo-accent": "#3bc1f6",
        "jgo-primary": "#4d195c",
        "jgo-secondary": "#3b82f6",
        "jgo-tertiary": "#3b1446",
      },
    },
  },
  plugins: [],
} satisfies Config;
