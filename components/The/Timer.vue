<script setup lang="ts">
import { formatSecondsToMMSS } from '../../composables/datetime'

const props = defineProps<{
    seconds: number
}>()

const formattedTime = computed(() => formatSecondsToMMSS(props.seconds))
</script>
<template>
    <p class="text-7xl text-center m-3">{{ formattedTime }}</p>
</template>
