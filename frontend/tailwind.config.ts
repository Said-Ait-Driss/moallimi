import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3BCF41",
        darkPrimary:"#32C238",
        lightPrimary:"#EFF8ED",
        secondary: "#FF7171",
        
        primaryText:"#252B42",
        lightPrimaryText:"#FFFFFF",

        secondText:"#737373",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
export default config;
