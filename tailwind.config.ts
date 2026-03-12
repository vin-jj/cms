import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      0: "0px",
      px: "1px",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      7.5: "30px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      15: "60px",
      16: "64px",
      18: "72px",
      20: "80px",
      24: "96px",
      30: "120px",
    },
    extend: {
      colors: {
        fg: "#F2F3F5",
        "mute-fg": "#7D8187",
        "bg-content": "#1F1F1F",
        "bg-deep": "#191A1B",
        bg: "#08090A",
        border: "#2A2A2C",
        divider: "#454547",
        primary: "#DDDDDD",
        secondary: "#2E2E30",
        white: "#FFFFFF",
        point: "#FF892F",
        success: "#22C55E",
        warning: "#CA8A04",
        destructive: "#EF4444",
        special: "#C0E136",
        brand: "#2F94E5",
      },
      borderRadius: {
        thumb: "10px",
        box: "10px",
        button: "8px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      fontFamily: {
        sans: ["Pretendard Variable", "-apple-system", "Segoe UI", "sans-serif"],
        pretendard: ["Pretendard Variable", "-apple-system", "Segoe UI", "sans-serif"],
        "pretendard-ja": ["Pretendard JP", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
