<script setup lang="ts">
import { Direction, Station, type Record } from '@types' // Adjust import path as necessary

const props = defineProps<{
    record: Record
}>()

const emit = defineEmits<{
    (e: 'update:record', updatedRecord: Record): void
}>()

const handleDirectionChange = (value: string | number | null) => {
    if (value) {
        emit('update:record', {
            ...props.record,
            direction: value as Direction,
        })
    }
}

const handleStationChange = (value: string | number | null) => {
    if (value) {
        emit('update:record', { ...props.record, station: value as Station })
    }
}
</script>

<template>
    <div
        class="w-full rounded-md bg-background2 flex flex-row items-center justify-center">
        <p>{{ record.seconds }} sec</p>
        <BaseSelect
            :id="'direction_' + record.id"
            :enum-values="Direction"
            :model-value="record.direction"
            @update:model-value="handleDirectionChange" />
        <BaseSelect
            :id="'station_' + record.id"
            :enum-values="Station"
            :model-value="record.station"
            @update:model-value="handleStationChange" />
        <p>{{ record.date }}</p>
        <button
            class="flex items-center justify-center bg-red rounded-lg w-[24px] h-[24px]">
            <Icon name="iconoir:cancel" size="24" />
        </button>
    </div>
</template>
