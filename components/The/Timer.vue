<script setup lang="ts">
const props = defineProps<{
    seconds: number
}>()

// Utility function to format seconds into MM:SS
function formatSecondsToMMSS(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const minutesStr = String(minutes).padStart(2, '0')
    const secondsStr = String(remainingSeconds).padStart(2, '0')
    return `${minutesStr}:${secondsStr}`
}

const formattedTime = computed(() => formatSecondsToMMSS(props.seconds))
</script>
<template>
    <p class="text-3xl text-center m-3">{{ formattedTime }}</p>
</template>
