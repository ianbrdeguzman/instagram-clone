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
        minHeight: {
            sc: 'calc(100vh - 56px)',
            screen: '100vh',
        },
        extend: {
            backgroundImage: (theme) => ({
                hero: "url('/images/login-background.png')",
            }),
            colors: {
                modal: 'rgba(0,0,0,0.5)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
