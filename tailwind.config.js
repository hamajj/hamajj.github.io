export default {
    content: [
        "./components/**/*.{vue,js,ts}",
        "./pages/**/*.{vue,js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                vcr: ['"VCR OSD Mono"', 'monospace']
            },
            colors: {
                'ultra-black': '#050405',
                'ultra-red': '#ff1b2d',
                'ultra-neon': '#7ef9ff',
                'hud-gray': '#a1a1a1'
            }
        }
    },

};
