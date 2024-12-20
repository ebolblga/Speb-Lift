<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Direction, Station, type Record } from '@types'

useSeoMeta({
    title: 'Stats',
})

const records = useLocalStorage<Record[]>('my-records', [])
const displayStats = ref<string>('')

const loadDefaultData = async () => {
    if (!records.value.length) {
        try {
            const response = await fetch('/default-data.json')
            if (!response.ok) {
                throw new Error(
                    `Failed to load default data: ${response.statusText}`
                )
            }
            const defaultData: Record[] = await response.json()
            records.value = defaultData
        } catch (error) {
            console.error('Error loading default data:', error)
        }
    }
}

onMounted(async () => {
    await loadDefaultData()
    displayStats.value = recalculateStats()
})

function handleUpdateRecord(updatedRecord: Record) {
    const index = records.value.findIndex(
        (record) => record.id === updatedRecord.id
    )
    if (index !== -1) {
        records.value[index] = updatedRecord
    }

    displayStats.value = recalculateStats()
}

function handleDeleteRecord(record: Record) {
    const index = records.value.findIndex((r) => r.id === record.id)
    if (index !== -1) {
        records.value.splice(index, 1)
    }

    displayStats.value = recalculateStats()
}

function recalculateStats(): string {
    let outputStr: string = ''
    const totalSum = records.value.reduce((accumulator, value) => {
        return accumulator + value.seconds
    }, 0)
    outputStr += `Average: ${Math.round(totalSum / records.value.length)} sec\n`

    const arrayUpBottom = records.value.filter((element) => {
        return (
            element.direction === Direction.up &&
            element.station === Station.s28
        )
    })
    const average2 =
        arrayUpBottom.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayUpBottom.length
    outputStr += `Average ↑ through 28: ${Math.round(average2)} sec\n`

    const arrayUpTop = records.value.filter((element) => {
        return (
            element.direction === Direction.up &&
            element.station === Station.s32
        )
    })
    const average3 =
        arrayUpTop.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayUpTop.length
    outputStr += `Average ↑ through 32: ${Math.round(average3)} sec\n`

    const arrayDownBottom = records.value.filter((element) => {
        return (
            element.direction === Direction.down &&
            element.station === Station.s28
        )
    })
    const average4 =
        arrayDownBottom.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayDownBottom.length
    outputStr += `Average ↓ through 28: ${Math.round(average4)} sec\n`

    const arrayDownTop = records.value.filter((element) => {
        return (
            element.direction === Direction.down &&
            element.station === Station.s32
        )
    })
    const average5 =
        arrayDownTop.reduce((accumulator, value) => {
            return accumulator + value.seconds
        }, 0) / arrayDownTop.length
    outputStr += `Average ↓ through 32: ${Math.round(average5)} sec\n`

    return outputStr
}
</script>

<template>
    <div class="flex justify-center flex-col">
        <div
            class="max-h-[75vh] w-[85vw] max-w-[900px] min-w-[370px] overflow-auto p-3 bg-background2 rounded-md mx-auto">
            <ClientOnly fallback-tag="span" fallback="Loading stats...">
                <ul>
                    <li v-for="record in records" :key="record.id">
                        <BaseListElement
                            :record="record"
                            @update:record="handleUpdateRecord"
                            @delete:record="handleDeleteRecord" />
                    </li>
                </ul>
            </ClientOnly>
        </div>
        <div class="mx-auto">
            <pre>{{ displayStats }}</pre>
        </div>
    </div>
</template>
