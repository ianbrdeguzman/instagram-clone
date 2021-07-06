module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen',
            ],
        },
        extend: {
            backgroundImage: (theme) => ({
                hero: "url('/images/login-background.png')",
            }),
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
