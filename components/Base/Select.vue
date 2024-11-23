<script setup lang="ts">
const props = defineProps<{
    id: string
    enumValues: Record<string, string | number>
    modelValue: string | number | null
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
}>()

const options = computed(() => Object.values(props.enumValues))

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const selectedValue = target.value as string | number
    emit('update:modelValue', selectedValue)
}
</script>
<template>
    <select
        id="id"
        :value="modelValue"
        class="w-full bg-background2 border border-primary rounded-md p-1 m-2"
        @change="handleChange">
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>
