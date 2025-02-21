<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Direction, Station, type Record } from '@types'

useSeoMeta({
    title: 'SL: timer',
})

const isTimerRunning = ref<boolean>(false)
const isTimerPaused = ref<boolean>(true)
const timeElapsed = ref<number>(0)
let interval: ReturnType<typeof setInterval>
const startTime = useLocalStorage<number>('start-time', 0)
const pausedTime = useLocalStorage<number>('paused-time', 0)

const selectedDirection = useLocalStorage<Direction>('selected-direction', Direction.up)
const selectedStation = useLocalStorage<Station>('selected-station', Station.s32)
const records = useLocalStorage<Record[]>('my-records', [])

onMounted(() => {
    if (startTime.value !== 0) {
        restartTimer()
        return
    }

    // Select default direction opposite of last record
    if (records.value.length === 0) return

    // TODO: put best path prediction logic here
    // if (records.value[records.value.length - 1].direction === Direction.up) {
    //     selectedDirection.value = Direction.down
    // } else {
    //     selectedDirection.value = Direction.up
    // }
})

const updateElapsedTime = () => {
    const now = Date.now()
    timeElapsed.value = Math.floor((now - startTime.value) / 1000)
}

function handleTimer() {
    if (isTimerPaused.value) {
        if (!isTimerRunning.value) {
            startTime.value = Date.now()
        } else {
            startTime.value += Date.now() - pausedTime.value
        }

        updateElapsedTime()
        interval = setInterval(updateElapsedTime, 1000)
        isTimerRunning.value = true
        isTimerPaused.value = false
        pausedTime.value = 0
    } else {
        clearInterval(interval)
        pausedTime.value = Date.now()
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
    startTime.value = 0
    pausedTime.value = 0
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

// Starts timer again if website was reloaded
function restartTimer() {
    if (pausedTime.value > 0) {
        timeElapsed.value = Math.floor(
            (pausedTime.value - startTime.value) / 1000
        )
        isTimerRunning.value = true
        isTimerPaused.value = true
    } else {
        updateElapsedTime()
        interval = setInterval(updateElapsedTime, 1000)
        isTimerRunning.value = true
        isTimerPaused.value = false
    }
}
</script>
<template>
    <div class="h-full flex justify-center">
        <div class="w-[85vw] max-w-[900px] my-auto pb-24">
            <NuxtImg
                src="/icon-512x512.png"
                class="mx-auto max-w-[20%] mb-11" />
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
