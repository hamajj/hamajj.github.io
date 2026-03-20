export default {
    content: [
        "./components/**/*.{vue,js,ts}",
        "./pages/**/*.{vue,js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                vcr:      ['"VCR OSD Mono"', 'monospace'],
                display:  ['"Big Shoulders Display"', '"Bebas Neue"', 'Impact', 'sans-serif'],
                bebas:    ['"Bebas Neue"', 'Impact', 'sans-serif'],
                mono:     ['"VCR OSD Mono"', 'monospace'],
            },
            colors: {
                'uk-black':  '#000000',
                'uk-red':    '#ff0000',
                'uk-red2':   '#cc0000',
                'uk-white':  '#ffffff',
                'uk-grey':   '#1a1a1a',
                'uk-grey2':  '#2a2a2a',
                'uk-dim':    '#888888',
                'ultra-red': '#ff1b2d',
                'ultra-neon':'#7ef9ff',
            },
            clipPath: {
                'cut-br': 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                'cut-tr': 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                'cut-all':'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }
        }
    },
};
