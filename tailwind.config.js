/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            colors: {
                customBlue: {
                    light: "text-red-300",
                    DEFAULT: "#1fb6ff",
                    dark: "text-red-500",
                },
            },
        },
    },
    plugins: [],
};
