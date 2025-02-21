<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, watch } from 'vue'
import { Station, stationColorMap } from '@types'
import type { Record, StationAverages, Direction } from '@types'

const PADDING = 48

const props = defineProps<{
    data: Record[]
    direction: Direction
    windowWidth: number
}>()

const chartRef = ref<HTMLElement | null>(null)

onMounted(() => {
    drawChart(props.windowWidth)
})

// Redraw if window size changes
watch(
    () => props.windowWidth,
    (newWidth) => {
        d3.select(chartRef.value).selectAll('*').remove()
        drawChart(newWidth)
    }
)

// Redraw if data changes
watch(
    () => props.data,
    () => {
        d3.select(chartRef.value).selectAll('*').remove()
        drawChart(props.windowWidth)
    }
)

const processData = () => {
    // Group data by hour and station
    const groupedData: { [key: string]: { [key in Station]: number[] } } = {}

    props.data.forEach((record) => {
        if (record.direction !== props.direction) return // Filter by direction

        const hour = new Date(record.date).getHours() - 3 // Extract hour with timezone correction since I'm an ape

        const key = `${hour}:00`

        if (!groupedData[key]) {
            groupedData[key] = {
                [Station.s33]: [],
                [Station.s32]: [],
                [Station.s28]: [],
            }
        }
        groupedData[key][record.station].push(record.seconds)
    })

    // Calculate averages for each hour and station
    const averages = Object.entries(groupedData).map(([hour, stations]) => {
        return {
            hour,
            [Station.s33]: d3.mean(stations[Station.s33]) || 0,
            [Station.s32]: d3.mean(stations[Station.s32]) || 0,
            [Station.s28]: d3.mean(stations[Station.s28]) || 0,
        } as StationAverages
    })

    // Sort by hours
    averages.sort((a, b) => {
        const [aHour, aMinute] = a.hour.split(':').map(Number)
        const [bHour, bMinute] = b.hour.split(':').map(Number)

        return aHour * 60 + aMinute - (bHour * 60 + bMinute)
    })

    return averages
}

function interpolateValues(
    data: StationAverages[],
    station: Station
): number[] {
    const n = data.length

    const values = data.map((d) => d[station])
    // If all values are missing, return the original values
    if (values.every((v) => v === 0)) return values.slice()

    // Helper: find the next valid index (cyclic)
    function findNextValid(index: number): number {
        let i = (index + 1) % n
        while (values[i] === 0 && i !== index) {
            i = (i + 1) % n
        }

        return i
    }

    // Make a copy to store the interpolated values
    const result = values.slice()

    let i = 0
    while (i < n) {
        if (result[i] !== 0) {
            i++
            continue
        }
        // We've hit a gap starting at index i
        // Find the previous valid index (cyclic)
        let prev = (i - 1 + n) % n
        while (values[prev] === 0 && prev !== i) {
            prev = (prev - 1 + n) % n
        }
        const startVal = values[prev]

        // Find the next valid index
        const next = findNextValid(i)
        const endVal = values[next]

        // Compute the total number of steps between the valid endpoints
        // Because data is cyclic, use modulo arithmetic
        const totalSteps = (next - prev + n) % n

        // Fill in all missing points between prev and next
        let step = 1
        let idx = (prev + 1) % n
        while (idx !== next) {
            // t ranges from 0 (at prev) to 1 (at next)
            const t = step / totalSteps
            result[idx] = startVal + t * (endVal - startVal)
            idx = (idx + 1) % n
            step++
        }
        // Continue scanning from the next valid index
        i = next
    }

    return result
}

const drawChart = (newWidth: number) => {
    const data = processData()

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const width = newWidth - PADDING - margin.left - margin.right
    const height = 256 - margin.top - margin.bottom

    const svg = d3
        .select(chartRef.value)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

    // X-axis
    const x = d3
        .scaleBand()
        .domain(data.map((d) => d.hour))
        .range([0, width])
        .padding(0.1)

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

    // Y-axis
    const y = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, (d) =>
                Math.max(d[Station.s33], d[Station.s32], d[Station.s28])
            ) || 0,
        ])
        .nice()
        .range([height, 0])

    svg.append('g').call(d3.axisLeft(y))

    // Draw bars
    const stations = [Station.s33, Station.s32, Station.s28]
    const barWidth = x.bandwidth() / stations.length

    stations.forEach((station, index) => {
        svg.selectAll(`.s${station}`)
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.hour)! + index * barWidth)
            .attr('y', (d) => y(d[station]))
            .attr('width', barWidth - 1)
            .attr('height', (d) => height - y(d[station]))
            .attr('fill', stationColorMap[station])
            .attr('fill-opacity', 0.25)

        const interpValues = interpolateValues(data, station)

        const lineData = data.map((d, i) => ({
            hour: d.hour,
            value: interpValues[i],
        }))

        // Create the line generator.
        const lineGenerator = d3
            .line<(typeof lineData)[0]>()
            // Center the line on each bar.
            .x((d) => x(d.hour)! + index + barWidth + (barWidth - 1) / 2)
            .y((d) => y(d.value))
            .curve(d3.curveBasis)

        svg.append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', stationColorMap[station])
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 1)
            .attr('d', lineGenerator)
    })
}
</script>

<template>
    <div class="w-full flex justify-center">
        <span>{{ props.direction }}</span>
        <div ref="chartRef" />
    </div>
</template>
