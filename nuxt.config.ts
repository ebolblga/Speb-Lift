// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
    tailwindcss: {
        cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
        configPath: 'tailwind.config',
        exposeConfig: {
            level: 2,
        },
        config: {},
        viewer: true,
    },
})
