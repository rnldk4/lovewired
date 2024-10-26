/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins"],
                sarabun: ["Sarabun"],
                sansation: ["Sansation Light Italic"],
                outfit: ["Outfit"],
                unbounded: ["Unbounded"],
            },
        },
    },
    plugins: [],
};
