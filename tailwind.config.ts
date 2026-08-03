import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0A08",
        coal: "#14120F",
        seam: "#26231E",
        bone: "#EBE5DA",
        smoke: "#8A8478",
        ember: "#E5330C"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -8%)" },
          "30%": { transform: "translate(4%, -4%)" },
          "50%": { transform: "translate(-6%, 6%)" },
          "70%": { transform: "translate(7%, 2%)" },
          "90%": { transform: "translate(-3%, 8%)" }
        }
      },
      animation: {
        "spin-slow": "spinSlow 22s linear infinite",
        marquee: "marquee 28s linear infinite",
        grain: "grain 0.9s steps(6) infinite"
      }
    }
  },
  plugins: []
};

export default config;
