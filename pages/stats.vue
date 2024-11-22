<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import type { Record } from '@types'

const records = useLocalStorage<Record[]>('my-records', [])
</script>
<template>
    <pre>{{ JSON.stringify(records, null, 2) }}</pre>
</template>
