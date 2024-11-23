<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import type { Record } from '@types'

const records = useLocalStorage<Record[]>('my-records', [])
const selectedRecord = ref<Record | null>(null)

const handleUpdateRecord = (updatedRecord: Record) => {
    const index = records.value.findIndex(
        (record) => record.id === updatedRecord.id
    )
    if (index !== -1) {
        records.value[index] = updatedRecord
    }
}
</script>
<template>
    <div class="max-h-[80vh] overflow-auto p-3 bg-background2 rounded-md">
        <ul>
            <li v-for="record in records" :key="record.id">
                <BaseListElement
                    :record="record"
                    @update:record="handleUpdateRecord" />
            </li>
        </ul>
    </div>
</template>
