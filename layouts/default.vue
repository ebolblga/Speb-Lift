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
            href: '/FiraCode-VariableFont_wght.ttf',
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
        <TheNavbar />
    </div>
</template>
<style>
body {
    font-size: 14px;
    font-family: Fara Code;
}

@font-face {
    font-family: 'Fara Code';
    src: url('/FiraCode-VariableFont_wght.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    box-shadow: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 4px;
}

::-webkit-scrollbar-corner {
    background: transparent;
}
</style>
