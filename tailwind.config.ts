import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "float-slow": "floatSlow 15s ease-in-out infinite",
                "float-delayed": "floatDelayed 18s ease-in-out infinite 2s",
                "float-slower": "floatSlower 20s ease-in-out infinite 4s",
                "grid-flow": "gridFlow 30s linear infinite",
                "pulse-slow": "pulseSlow 8s ease-in-out infinite",
                "marquee": "marquee var(--duration, 40s) linear infinite",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                floatSlow: {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "25%": { transform: "translate(60px, -80px) scale(1.1)" },
                    "50%": { transform: "translate(-40px, -120px) scale(0.95)" },
                    "75%": { transform: "translate(-80px, 40px) scale(1.05)" },
                },
                floatDelayed: {
                    "0%, 100%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
                    "33%": { transform: "translate(-100px, 80px) scale(1.15) rotate(5deg)" },
                    "66%": { transform: "translate(80px, -60px) scale(0.9) rotate(-3deg)" },
                },
                floatSlower: {
                    "0%, 100%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
                    "30%": { transform: "translate(50px, -100px) rotate(8deg) scale(1.1)" },
                    "60%": { transform: "translate(-70px, 50px) rotate(-5deg) scale(0.95)" },
                },
                pulseSlow: {
                    "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
                    "50%": { opacity: "0.5", transform: "scale(1.2)" },
                },
                gridFlow: {
                    "0%": { backgroundPosition: "0 0" },
                    "100%": { backgroundPosition: "100px 100px" },
                },
                shimmer: {
                    "from": { backgroundPosition: "0 0" },
                    "to": { backgroundPosition: "-200% 0" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
