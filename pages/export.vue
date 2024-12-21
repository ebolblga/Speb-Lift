<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import type { Record } from '@types'

useSeoMeta({
    title: 'SL: export',
})

const records = useLocalStorage<Record[]>('my-records', [])

function handleUpdateRecord(updatedRecord: Record) {
    const index = records.value.findIndex(
        (record) => record.id === updatedRecord.id
    )
    if (index !== -1) {
        records.value[index] = updatedRecord
    }
}

function handleDeleteRecord(record: Record) {
    const index = records.value.findIndex((r) => r.id === record.id)
    if (index !== -1) {
        records.value.splice(index, 1)
    }
}

function exportData() {
    const data = JSON.stringify(records.value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'records.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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
        <div class="flex flex-row mt-3 justify-center">
            <BaseButton class="w-[85vw] max-w-[900px]" @click="exportData">
                <div class="flex items-center justify-center">
                    Export JSON<Icon
                        name="mdi:code-json"
                        size="19"
                        class="ml-3" />
                </div>
            </BaseButton>
        </div>
    </div>
</template>
