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
    dirs: ['composables', 'lib'],
  },
  
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  
  runtimeConfig: {
    // Spotify configuration (set these in your .env file)
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '',
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN || '',
    public: {
      enableNowPlaying: process.env.NUXT_PUBLIC_ENABLE_NOW_PLAYING !== 'false',
    },
  },
  
  app: {
    head: {
      title: 'hamajj | Developer Portfolio',
      meta: [
        { name: 'description', content: 'Personal portfolio of hamajj - Hobbyist Web & Systems-Level Developer' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
