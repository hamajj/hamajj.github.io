<script setup lang="ts">
import { computed, ref } from 'vue'
import contributionsData from '~/data/github-contributions.json'

interface ContributionDay {
  date: string
  count: number
  level: number
}

const contributions = contributionsData as ContributionDay[]

const total = computed(() => contributions.reduce((sum, day) => sum + day.count, 0))

const hoveredDay = ref<ContributionDay | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })
const cellSize = 11
const cellGap = 2
const columnPitch = cellSize + cellGap

const levelColors = ['#e0e0e0', '#a5e8a5', '#32cd32', '#ffe600', '#ff7a00']

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const weeks = computed(() => {
  const result: Array<Array<ContributionDay | null>> = []
  let currentWeek: Array<ContributionDay | null> = []

  for (const day of contributions) {
    const d = new Date(day.date)
    const dayOfWeek = d.getUTCDay()

    if (currentWeek.length === 0 && result.length === 0) {
      currentWeek.push(...Array.from({ length: dayOfWeek }, () => null))
    } else if (dayOfWeek === 0 && currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null)
      result.push(currentWeek)
      currentWeek = []
    }

    currentWeek.push(day)
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null)
    result.push(currentWeek)
  }

  return result
})

const monthLabels = computed(() => {
  const labels: { label: string; col: number }[] = []
  let lastMonth = -1
  for (let w = 0; w < weeks.value.length; w++) {
    const firstDay = weeks.value[w]?.find(Boolean)
    if (firstDay) {
      const month = new Date(firstDay.date).getUTCMonth()
      if (month !== lastMonth) {
        labels.push({ label: months[month] ?? '', col: w })
        lastMonth = month
      }
    }
  }
  return labels
})

const showTooltip = (day: ContributionDay, event: MouseEvent) => {
  hoveredDay.value = day
  tooltipPos.value = { x: event.clientX, y: event.clientY }
}
</script>

<template>
  <div class="bg-win-gray p-4">
    <div class="mb-3 flex flex-wrap items-baseline justify-between gap-2">
      <p class="font-vt text-[17px] leading-none text-black">$ git log --graph --all</p>
      <p class="font-ui text-[12px] text-black">
        <b>{{ total }}</b> contribution{{ total === 1 ? '' : 's' }} in the last year
      </p>
    </div>

    <div class="bevel-in overflow-x-auto bg-white p-3">
      <div class="min-w-[720px]">
        <!-- month labels -->
        <div class="relative mb-1 ml-7 h-4">
          <span
            v-for="label in monthLabels"
            :key="label.label + label.col"
            class="absolute font-ui text-[10px] text-win-mid"
            :style="{ marginLeft: label.col * columnPitch + 'px' }"
            >{{ label.label }}</span
          >
        </div>

        <div class="flex gap-0">
          <!-- day labels -->
          <div class="mr-1 flex flex-col gap-[2px]">
            <div
              v-for="label in dayLabels"
              :key="label"
              class="flex items-center font-ui text-[10px] text-win-mid"
              :style="{ height: `${cellSize}px` }"
            >
              {{ label }}
            </div>
          </div>

          <!-- weeks -->
          <div class="flex gap-[2px]">
            <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-[2px]">
              <div
                v-for="(day, di) in week"
                :key="day?.date ?? `empty-${wi}-${di}`"
                :class="day ? 'cursor-pointer' : 'pointer-events-none opacity-0'"
                :style="{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: day ? levelColors[day.level] || levelColors[0] : levelColors[0],
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)',
                }"
                @mouseenter="day && showTooltip(day, $event)"
                @mouseleave="hoveredDay = null"
              />
            </div>
          </div>
        </div>

        <!-- legend -->
        <div class="mt-3 flex items-center gap-1.5 font-ui text-[10px] text-win-mid">
          <span class="mr-1">Less</span>
          <span
            v-for="(color, i) in levelColors"
            :key="i"
            class="inline-block h-[11px] w-[11px]"
            :style="{ backgroundColor: color, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)' }"
          />
          <span class="ml-1">More</span>
          <span class="ml-4 italic">refreshed on every deploy — straight from the github api</span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="hoveredDay"
        class="pointer-events-none fixed z-[10000] border border-black bg-[#ffffe1] px-2 py-1 font-ui text-[11px] text-black hard-shadow-sm"
        :style="{ left: tooltipPos.x + 12 + 'px', top: tooltipPos.y - 32 + 'px' }"
      >
        <b>{{ hoveredDay.count }}</b> contribution{{ hoveredDay.count === 1 ? '' : 's' }} on
        {{ hoveredDay.date }}
      </div>
    </Teleport>
  </div>
</template>
