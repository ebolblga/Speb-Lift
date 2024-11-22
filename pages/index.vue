<script setup lang="ts">
const isTimerRunning = ref<boolean>(false)
const isTimerPaused = ref<boolean>(true)
const timeElapsed = ref<number>(0)
let interval: ReturnType<typeof setInterval>
const selectedDirection = ref()

const directionOptions = [
    {
        key: 'up',
        value: 'up',
    },
    {
        key: 'down',
        value: 'up',
    },
]

function handleTimer() {
    if (isTimerPaused.value) {
        interval = setInterval(() => {
            timeElapsed.value++
        }, 1000)

        isTimerRunning.value = true
        isTimerPaused.value = false
    } else {
        clearInterval(interval)
        isTimerPaused.value = true
    }
}

function stopTimer() {
    clearInterval(interval)
    isTimerRunning.value = false
    isTimerPaused.value = true
    timeElapsed.value = 0
}
</script>
<template>
    <div>
        <BaseSelect
            id="directions"
            v-model="selectedDirection"
            :options="directionOptions"
            >Direction</BaseSelect
        >
        <span>{{ timeElapsed }} sec</span>
        <BaseButton @click="handleTimer">
            <span v-if="isTimerPaused">Start</span>
            <span v-else>Stop</span>
        </BaseButton>
        <BaseButton v-if="isTimerRunning" @click="stopTimer">
            Reset
        </BaseButton>
    </div>
</template>
