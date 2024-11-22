<script setup lang="ts">
import { Direction, Station, type Record } from '@types'

const isTimerRunning = ref<boolean>(false)
const isTimerPaused = ref<boolean>(true)
const timeElapsed = ref<number>(0)
let interval: ReturnType<typeof setInterval>
const selectedDirection = ref<Direction>(Direction.up)
const selectedStation = ref<Station>(Station.top)

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

function saveRecord() {
    const newRecord: Record = {
        direction: selectedDirection.value,
        seconds: timeElapsed.value,
        date: new Date(),
        station: selectedStation.value,
    }

    console.log(newRecord)
}
</script>
<template>
    <div class="h-full flex justify-center">
        <div class="w-[75vw] my-auto pb-24">
            <TheTimer :seconds="timeElapsed" />
            <div class="flex flex-row">
                <BaseButton @click="handleTimer">
                    <span v-if="isTimerPaused">Start</span>
                    <span v-else>Stop</span>
                </BaseButton>
                <BaseButton v-if="isTimerRunning" @click="stopTimer">
                    Reset
                </BaseButton>
            </div>
            <div class="flex flex-row">
                <BaseSelect
                    id="direction-select"
                    v-model="selectedDirection"
                    :enum-values="Direction" />
                <BaseSelect
                    id="station-select"
                    v-model="selectedStation"
                    :enum-values="Station" />
            </div>
            <div class="flex flex-row">
                <BaseButton @click="saveRecord"> Save </BaseButton>
            </div>
        </div>
    </div>
</template>
