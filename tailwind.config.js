/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#2563eb",
                    "secondary": "#4f46e5",
                    "accent": "#37cdbe",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    "base-200": "#d1d5db",
                    "base-300": "#9ca3af",
                    "base-content": "#1f2937",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                    "surface": "#ffffff",
                    "text-primary": "#1f2937",
                    "text-secondary": "#4b5563"
                },
                dark: {
                    "primary": "#60a5fa",
                    "secondary": "#818cf8",
                    "accent": "#37cdbe",
                    "neutral": "#2a2e37",
                    "base-100": "#1f2937",
                    "base-200": "#111827",
                    "base-300": "#0f172a",
                    "base-content": "#f3f4f6",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                    "surface": "#1f2937",
                    "text-primary": "#f3f4f6",
                    "text-secondary": "#9ca3af"
                }
            }
        ],
    }
};