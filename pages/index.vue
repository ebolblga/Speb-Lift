<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Direction, Station, type Record } from '@types'

useSeoMeta({
    title: 'Timer',
})

const isTimerRunning = ref<boolean>(false)
const isTimerPaused = ref<boolean>(true)
const timeElapsed = ref<number>(0)
let interval: ReturnType<typeof setInterval>
const selectedDirection = ref<Direction>(Direction.up)
const selectedStation = ref<Station>(Station.top)
const records = useLocalStorage<Record[]>('my-records', [])

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
    timerCleanup()
}

function timerCleanup() {
    clearInterval(interval)
    isTimerRunning.value = false
    isTimerPaused.value = true
    timeElapsed.value = 0
}

function getId(): number {
    if (records.value.length < 1) return 0
    else return records.value[records.value.length - 1].id + 1
}

function saveRecord() {
    if (timeElapsed.value === 0) {
        console.warn('Not enough time has passed')
        return
    }

    const newRecord: Record = {
        id: getId(),
        direction: selectedDirection.value,
        seconds: timeElapsed.value,
        date: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        station: selectedStation.value,
    }

    timerCleanup()

    records.value.push(newRecord)
}
</script>
<template>
    <div class="h-full flex justify-center">
        <div class="w-[85vw] max-w-[900px] my-auto pb-24">
            <TheTimer :seconds="timeElapsed" />
            <div class="flex flex-row">
                <BaseButton @click="handleTimer">
                    <div
                        v-if="isTimerPaused"
                        class="flex items-center justify-center">
                        <Icon name="mdi:play" size="19" />
                    </div>
                    <div v-else class="flex items-center justify-center">
                        <Icon name="material-symbols:pause" size="19" />
                    </div>
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
