/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "20px",
                sm: "40px",
                lg: "60px",
                xl: "80px",
                "2xl": "100px",
            },
        },
    },
    plugins: [],
};
