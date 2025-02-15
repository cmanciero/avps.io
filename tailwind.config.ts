import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "smoke-900": "rgba(0, 0, 0, 0.9)",
				"smoke-800": "rgba(0, 0, 0, 0.75)",
				"smoke-600": "rgba(0, 0, 0, 0.6)",
				smoke: "rgba(0, 0, 0, 0.5)",
				"smoke-400": "rgba(0, 0, 0, 0.4)",
				"smoke-200": "rgba(0, 0, 0, 0.25)",
				"smoke-100": "rgba(0, 0, 0, 0.1)",
        "color": {
          DEFAULT: "#004672", // text color
          "1": "#8500ba", // purple
          "2": "#354091", // dark blue
          "3": "#ff8789", // 0% elipse
          "4": "#fff6a6", // box yellow light
          "5": "#ffdb58", // elipse yellow
          "6": "#83deb2", // 100% elipse
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
