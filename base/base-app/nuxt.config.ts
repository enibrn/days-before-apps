export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baasType: 'dummy',
      baasEndpointUrl: process.env.NUXT_BAAS_ENDPOINT_URL,
      baasProjectKey: process.env.NUXT_BAAS_PROJECT_KEY,
    },
  },
})
