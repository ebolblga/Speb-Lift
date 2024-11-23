<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => route.path === path
</script>
<template>
    <div class="fixed bottom-0 left-0 w-full h-[8vh] bg-background2">
        <div
            class="mx-auto h-full lg:w-[40vw] md:w-[90vw] flex flex-row justify-around">
            <NuxtLink to="/" title="Timer" class="my-auto">
                <Icon
                    name="material-symbols:timer-outline"
                    size="40"
                    :class="{
                        'text-accent': isActive('/'),
                        'text-primary': !isActive('/'),
                    }" />
            </NuxtLink>
            <NuxtLink to="/stats" title="Statistics" class="my-auto">
                <Icon
                    name="bitcoin-icons:graph-filled"
                    size="48"
                    :class="{
                        'text-accent': isActive('/stats'),
                        'text-primary': !isActive('/stats'),
                    }" />
            </NuxtLink>
        </div>
    </div>
</template>
