<script setup lang="ts">
const modelValue = defineModel()
const { options } = defineProps<{
    options: {
        key: string
        value: string
    }[]
}>()
</script>
<template>
    <div>
        <label :for="$attrs.id" class="text-black">
            <slot />
        </label>
        <select
            v-bind="$attrs"
            v-model="modelValue"
            class="w-full p-4 rounded-lg border border-gray mb-3">
            <option
                v-for="option in options"
                :value="option.key || option.value"
                @change="$emit('update:modelValue', option.value)">
                {{ option.value }}
            </option>
        </select>
    </div>
</template>
