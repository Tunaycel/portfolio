import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "void": "#000000",
        "carbon": "#08080c",
        "graphite": "#101018",
        "cyan-glow": "#00ffd5",
        "neon-green": "#39ff8a",
        "threat-red": "#ff2d55",
        "verified": "#00ffa3",
        "bone": "#e6e6f0",
        "ash": "#6f6f80"
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(0,255,213,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,213,0.06) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 1  0 0 0 0 0.84  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        flicker: {
          "0%,19%,21%,55%,57%,100%": { opacity: "1" },
          "20%,56%": { opacity: "0.4" }
        }
      },
      animation: {
        scan: "scan 4s linear infinite",
        flicker: "flicker 6s infinite"
      }
    }
  },
  plugins: []
};

export default config;
