import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#FED420",
          50: "#FFF9E0",
          100: "#FFF3C2",
          200: "#FFE885",
          300: "#FFDD47",
          400: "#FED420",
          500: "#E5BC00",
          600: "#BF9C00",
          700: "#997D00",
          800: "#735E00",
          900: "#4D3F00",
          950: "#332A00",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-rajdhani)", "Rajdhani", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-saffron":
          "radial-gradient(ellipse at 50% 0%, rgba(254, 212, 32, 0.15) 0%, transparent 60%)",
        "radial-saffron-strong":
          "radial-gradient(ellipse at 50% 30%, rgba(254, 212, 32, 0.25) 0%, transparent 55%)",
        "grid-blueprint":
          "linear-gradient(rgba(254, 212, 32, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(254, 212, 32, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-blueprint": "60px 60px",
      },
      boxShadow: {
        "saffron-sm": "0 0 15px rgba(254, 212, 32, 0.15)",
        "saffron-md": "0 0 30px rgba(254, 212, 32, 0.2)",
        "saffron-lg": "0 0 60px rgba(254, 212, 32, 0.25)",
        "saffron-glow": "0 0 40px rgba(254, 212, 32, 0.3), inset 0 0 40px rgba(254, 212, 32, 0.05)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "grid-scroll": "gridScroll 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gridScroll: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
