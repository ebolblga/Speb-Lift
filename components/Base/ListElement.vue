<script setup lang="ts">
import { Direction, Station, type Record } from '@types'

const props = defineProps<{
    record: Record
}>()

const emit = defineEmits<{
    (e: 'update:record' | 'delete:record', updatedRecord: Record): void
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

const handleDelete = () => {
    emit('delete:record', props.record)
}
</script>

<template>
    <div
        class="w-full bg-background2 flex flex-row items-center justify-evenly text-xs border-b-[1px] border-background">
        <p class="min-w-[60px]">{{ record.seconds }} sec</p>
        <div class="flex flex-row w-[200px]">
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
        </div>
        <p>{{ record.date }}</p>
        <button
            class="flex items-center justify-center bg-red rounded-lg w-[24px] h-[24px] hover:bg-background2 hover:border-red hover:border-2"
            @click="handleDelete">
            <Icon name="iconoir:cancel" size="24" />
        </button>
    </div>
</template>
