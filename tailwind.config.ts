import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#FAF7F2",
                foreground: "#1C1C1C",
                primary: {
                    DEFAULT: "#C1440E",
                    light: "#E8886A",
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#3B5249",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#8A8078",
                    foreground: "#FAF7F2",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#1C1C1C",
                },
                border: "#E8E2DA",
                input: "#E8E2DA",
                ring: "#C1440E",
                destructive: {
                    DEFAULT: "#ef4444",
                    foreground: "#FFFFFF",
                },
            },
            fontFamily: {
                display: ['"Playfair Display"', "serif"],
                body: ['"DM Sans"', "sans-serif"],
                mono: ['"JetBrains Mono"', "monospace"],
            },
            borderRadius: {
                lg: "0.75rem",
                md: "0.5rem",
                sm: "0.25rem",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
