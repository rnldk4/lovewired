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
            animation: {
                modalpop: "modalpop 0.2s cubic-bezier(0.34, 1.2, 0.64, 1)",
            },
            keyframes: {
                modalpop: {
                    "0%": {
                        transform: "scale(0.8)",
                        opacity: "0",
                    },
                    "80%": {
                        transform: "scale(1.05)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                },
            },
        },
    },
    plugins: [],
};
