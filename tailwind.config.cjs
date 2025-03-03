/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#00ff9d',
                background: '#121212',
                surface: '#1e1e1e',
                'text-secondary': '#b3b3b3'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
    daisyui: {
        themes: [{
            dark: {
                primary: '#00ff9d',
                'primary-content': '#000000',
                neutral: '#1e1e1e',
                'base-100': '#121212',
            }
        }],
        darkTheme: 'dark',
        base: true,
        styled: true,
        utils: true,
        logs: false,
    }
}