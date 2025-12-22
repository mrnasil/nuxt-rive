export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtRive: {
    // devtools: true,
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    preset: 'cloudflare-pages'
  }
})
