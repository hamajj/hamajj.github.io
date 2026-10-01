import { existsSync } from 'node:fs'
import { join } from 'node:path'

// The sync script saves the GitHub avatar as favicon.png / favicon.jpg
// (format depends on what GitHub serves); fall back to the classic icon.
const publicDir = join(process.cwd(), 'public')
const icon = existsSync(join(publicDir, 'favicon.png'))
  ? { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  : existsSync(join(publicDir, 'favicon.jpg'))
    ? { rel: 'icon', type: 'image/jpeg', href: '/favicon.jpg' }
    : { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: ['composables'],
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  app: {
    head: {
      title: "hamza's little corner of the internet",
      meta: [
        {
          name: 'description',
          content:
            "hi! i'm hamza — a developer who likes making computers do things they probably shouldn't. rust, c, systems programming & weird little tools.",
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#008080' },
      ],
      link: [
        icon,
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap',
        },
      ],
    },
  },
})
