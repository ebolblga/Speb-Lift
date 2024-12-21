<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Direction, Station, type Record } from '@types'

useSeoMeta({
    title: 'SL: stats',
})

const records = useLocalStorage<Record[]>('my-records', [])
const displayStats = ref<string>('')

onMounted(async () => {
    displayStats.value = recalculateStats()
})

// TODO: rewrite this ugly function
function recalculateStats(): string {
    if (!records.value.length) return 'No data recorded yet.'

    let outputStr: string = ''
    const totalSum = records.value.reduce((accumulator, value) => {
        return accumulator + value.seconds
    }, 0)
    outputStr += `Average: ${Math.round(totalSum / records.value.length)} sec\n`

    const arrayUp28 = records.value.filter((element) => {
        return (
            element.direction === Direction.up &&
            element.station === Station.s28
        )
    })
    const average2 =
        arrayUp28.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayUp28.length
    outputStr += `Average ↑ through 28: ${Math.round(average2)} sec\n`

    const arrayUp32 = records.value.filter((element) => {
        return (
            element.direction === Direction.up &&
            element.station === Station.s32
        )
    })
    const average3 =
        arrayUp32.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayUp32.length
    outputStr += `Average ↑ through 32: ${Math.round(average3)} sec\n`

    const arrayUp33 = records.value.filter((element) => {
        return (
            element.direction === Direction.up &&
            element.station === Station.s33
        )
    })
    const average6 =
        arrayUp33.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayUp33.length
    outputStr += `Average ↑ through 33: ${Math.round(average6)} sec\n`

    const arrayDown28 = records.value.filter((element) => {
        return (
            element.direction === Direction.down &&
            element.station === Station.s28
        )
    })
    const average4 =
        arrayDown28.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayDown28.length
    outputStr += `Average ↓ through 28: ${Math.round(average4)} sec\n`

    const arrayDown32 = records.value.filter((element) => {
        return (
            element.direction === Direction.down &&
            element.station === Station.s32
        )
    })
    const average5 =
        arrayDown32.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayDown32.length
    outputStr += `Average ↓ through 32: ${Math.round(average5)} sec\n`

    const arrayDown33 = records.value.filter((element) => {
        return (
            element.direction === Direction.down &&
            element.station === Station.s33
        )
    })
    const average7 =
        arrayDown33.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayDown33.length
    outputStr += `Average ↓ through 33: ${Math.round(average7)} sec\n`

    return outputStr
}
</script>
<template>
    <div class="flex justify-center flex-col">
        <div class="mx-auto">
            <pre>{{ displayStats }}</pre>
        </div>
    </div>
</template>
