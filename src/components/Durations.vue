<script setup lang="ts">
import { defineProps, computed } from 'vue';
import DurationLabel from '~/components/DurationLabel.vue'

export interface durationsLabels {
    diffYears: number
    diffMonths:  number
    diffDays: number
}

const props = defineProps<{
    durations?: durationsLabels
}>();
const defaultLabel = '--';

function computeLabel(num: number|undefined) : string {
    let result = String(defaultLabel);

    if (num || num === 0) {
        result = String(num)
    }

    return result
}

let yearLabel = computed(() => {
    return computeLabel(props.durations?.diffYears)
})
let monthLabel = computed(() => {
    return computeLabel(props.durations?.diffMonths)
})
let dayLabel = computed(() => {
    return computeLabel(props.durations?.diffDays)
})

function pluralizes(label: string, amount: number = 0) : string {
    return (amount > 1) ? label + 's' : label
}

</script>
<template>
    <div class="durations w-full lg:h-[342px]">
        <DurationLabel
            :value="yearLabel"
            :caption="pluralizes('year', durations?.diffYears || 0)"
        />
        <DurationLabel
            :value="monthLabel"
            :caption="pluralizes('month', durations?.diffMonths || 0)"
        />
        <DurationLabel
            :value="dayLabel"
            :caption="pluralizes('day', durations?.diffDays || 0)"
        />
    </div>
</template>