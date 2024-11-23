// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@vite-pwa/nuxt',
    ],
    tailwindcss: {
        cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
        configPath: 'tailwind.config',
        exposeConfig: {
            level: 2,
        },
        config: {},
        viewer: true,
    },
    alias: {
        '@types': resolve(__dirname, './types/types.ts'),
    },
    pwa: {
        manifest: {
            name: 'Sbep Lift',
            short_name: 'SL',
            theme_color: '#282828',
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
        },
    },
})
