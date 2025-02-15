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
      boxShadow: {
        "1": "0 0 21px 5px rgba(254, 218, 17, 0.58)",
        "2": "0 5px 10px 5px rgba(254, 218, 17, 0.67)",
        "3": "0 4px 8px 3px rgba(254, 218, 17, 0.67)"
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
        "50": "12.5rem",
        "54": "13.5rem",
        "58": "14.5rem",
        "62": "15.5rem",
        "66": "16.5rem",
        "70": "17.5rem",
        "74": "18.5rem",
        "78": "19.5rem",
        "82": "20.5rem",
        "86": "21.5rem",
        "90": "22.5rem",
        "94": "23.5rem",
        "98": "24.5rem",
        "102": "25.5rem",
        "106": "26.5rem",
        "110": "27.5rem",
        "xs": "28rem",
        "sm": "32rem",
        "md": "36rem",
        "ml": "40rem",
        "mxg": "44rem",
        "mlg": "48rem",
        "lg": "52rem",
        "xl": "60rem",
        "2xl": "72rem",
        "3xl": "80rem",
        "4xl": "96rem",
      },
      borderWidth: {
        "3": "3px",
        "5": "5px",
        "6": "6px",
        "7": "7px",
        "8": "8px",
      },
      fontSize: {
        md: ".9375rem",
        "2.5xl": "1.75rem",
        "3.5xl": "2rem",
        "4.5xl": "2.5rem",
        "5.5xl": "3.5rem",
        "6.5xl": ["4rem", "1.10"],
        "7.5xl": "5rem",
      },
      screens: {
        "mv": "360px",
        // => @media (min-width: 480px) { ... }
        "xs": "480px",
        // => @media (min-width: 480px) { ... }
        "sm": "640px",
        // => @media (min-width: 640px) { ... }
        "md": "768px",
        // => @media (min-width: 768px) { ... }
        "ml": "992px", // Medium Large
        // => @media (min-width: 992px) { ... }
        "lg": "1024px",
        // => @media (min-width: 1024px) { ... }
        "sl": "1199px",
        // => @media (min-width: 1024px) { ... }
        "xl": "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1920px",
        // => @media (min-width: 1920px) { ... }
        "wrapper":"1547px",
        // => @media (min-width: 1547px) { ... }
        // it provides container width 1515px with adding px-4
      }, 
    },
  },
  plugins: [],
} satisfies Config;
