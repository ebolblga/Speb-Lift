<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => route.path === path
</script>
<template>
    <div class="fixed bottom-0 left-0 w-full h-[8vh] bg-background2">
        <div
            class="mx-auto h-full lg:w-[40vw] md:w-[90vw] flex flex-row justify-around">
            <NuxtLink to="/stats" title="Statistics" class="my-auto">
                <Icon
                    name="bitcoin-icons:graph-filled"
                    size="48"
                    :class="{
                        'text-accent': isActive('/stats'),
                        'text-primary': !isActive('/stats'),
                    }" />
            </NuxtLink>
            <NuxtLink to="/" title="Timer" class="my-auto">
                <Icon
                    name="material-symbols:timer-outline"
                    size="40"
                    :class="{
                        'text-accent': isActive('/'),
                        'text-primary': !isActive('/'),
                    }" />
            </NuxtLink>
            <NuxtLink to="/export" title="Export" class="my-auto">
                <Icon
                    name="lets-icons:export"
                    size="48"
                    :class="{
                        'text-accent': isActive('/export'),
                        'text-primary': !isActive('/export'),
                    }" />
            </NuxtLink>
            <NuxtLink to="/calendar" title="Calendar" class="my-auto">
                <Icon
                    name="lets-icons:calendar"
                    size="42"
                    :class="{
                        'text-accent': isActive('/calendar'),
                        'text-primary': !isActive('/calendar'),
                    }" />
            </NuxtLink>
        </div>
    </div>
</template>
