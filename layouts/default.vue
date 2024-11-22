<script setup lang="ts">
useHead({
    htmlAttrs: {
        lang: 'ru',
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'Sbep Lift', content: 'Author: ebolblga' },
    ],
    link: [
        {
            rel: 'prefetch',
            href: '/Montserrat-Regular.ttf',
            as: 'font',
            type: 'font/woff2',
            crossorigin: 'anonymous',
        },
        {
            rel: 'icon',
            href: '/favicon.ico',
            crossorigin: 'anonymous',
        },
    ],
})
</script>
<template>
    <div class="m-0 p-3 bg-background h-screen text-text">
        <slot />
    </div>
</template>
<style>
body {
    font-size: 14px;
    font-family: Montserrat;
}

@font-face {
    font-family: 'Montserrat';
    src: url('/Montserrat-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>
