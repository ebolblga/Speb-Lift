<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import type { DisabledDate } from '@types'

useSeoMeta({
    title: 'SL: calendar',
})

const startDate = new Date(2024, 9, 15)

const disabledDates: DisabledDate[] = [
    // Disable all before start date
    { start: null, end: startDate },
]

const attributes = [
    {
        key: 'today',
        highlight: 'red',
        dates: new Date(),
    },
    {
        key: 'office',
        dot: 'yellow',
        dates: [
            {
                start: new Date(2024, 9, 21),
                repeat: {
                    weekdays: [2, 3],
                },
            },
            {
                start: new Date(2025, 1, 19),
                repeat: {
                    every: [2, 'weeks'],
                    weekdays: 4,
                },
            },
        ],
    },
    {
        key: 'home',
        dot: 'blue',
        dates: [
            {
                start: new Date(2025, 1, 20),
                repeat: {
                    weekdays: [5, 6],
                },
            },
            {
                start: new Date(2025, 1, 26),
                repeat: {
                    every: [2, 'weeks'],
                    weekdays: 4,
                },
            },
        ],
    },
]
</script>
<template>
    <div class="h-full flex justify-center">
        <div class="w-[85vw] max-w-[900px] my-auto pb-24">
            <h1 class="text-3xl text-center mb-5">
                Don't mind this page, just debug info for me
            </h1>
            <DatePicker
                :attributes="attributes"
                :min-date="startDate"
                :disabled-dates="disabledDates"
                expanded
                :first-day-of-week="2"
                :color="'gray'"
                locale="ru"
                is-dark
                borderless
                title-position="left"
                class="rounded-lg" />
        </div>
    </div>
</template>
<style>
/* TODO Load them from tailwindcss */
.vc-container {
    background-color: #1d2021;
}

.vc-container .vc-weekday {
    color: #e6cf90;
}

.vc-container .vc-weekday-1 {
    color: #836117;
}

.vc-container .vc-weekday-7 {
    color: #836117;
}
</style>
