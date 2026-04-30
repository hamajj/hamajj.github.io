<script setup lang="ts">
import { ref, computed } from 'vue'
import contributionsData from '~/data/github-contributions.json'

interface ContributionDay {
  date: string
  count: number
  level: number
}

const contributions = ref<ContributionDay[]>(contributionsData as ContributionDay[])
const loading = false
const hoveredDay = ref<ContributionDay | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })
const cellSize = 10
const cellGap = 2
const columnPitch = cellSize + cellGap

const levelColors = [
  'bg-[#1c1c22]',
  'bg-[#7a244f] shadow-[0_0_5px_rgba(255,105,180,0.22)]',
  'bg-[#b43a7b] shadow-[0_0_7px_rgba(255,105,180,0.35)]',
  'bg-[#e857a3] shadow-[0_0_9px_rgba(255,105,180,0.5)]',
  'bg-[#ff69b4] shadow-[0_0_12px_rgba(255,105,180,0.72)]',
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const weeks = computed(() => {
  const result: Array<Array<ContributionDay | null>> = []
  let currentWeek: Array<ContributionDay | null> = []

  for (const day of contributions.value) {
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
    const firstDay = weeks.value[w].find(Boolean)
    if (firstDay) {
      const month = new Date(firstDay.date).getUTCMonth()
      if (month !== lastMonth) {
        labels.push({ label: months[month], col: w })
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
  <section id="github-grid" class="relative z-10 py-20">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Terminal Header -->
      <div class="mb-10">
        <span class="text-terminal-green font-mono text-sm">$ </span>
        <span class="text-terminal-cyan font-mono text-sm">git log --graph</span>
      </div>

      <div class="border border-border bg-card/50 backdrop-blur-sm p-6 overflow-x-auto">
        <!-- Loading -->
        <div v-if="loading" class="space-y-2">
          <div v-for="i in 7" :key="i" class="flex gap-[3px]">
            <div v-for="j in 52" :key="j" class="w-[11px] h-[11px] bg-muted animate-pulse" />
          </div>
        </div>

        <!-- Grid -->
        <div v-else>
          <!-- Month Labels -->
          <div class="flex mb-1 ml-8 text-[10px] font-mono text-muted-foreground">
            <div
              v-for="label in monthLabels"
              :key="label.label + label.col"
              class="absolute"
              :style="{ marginLeft: (label.col * columnPitch) + 'px' }"
            >
              {{ label.label }}
            </div>
          </div>

          <div class="flex gap-0 mt-6">
            <!-- Day Labels -->
            <div class="flex flex-col mr-2 text-[10px] font-mono text-muted-foreground" :style="{ gap: `${cellGap}px` }">
              <div v-for="label in dayLabels" :key="label" class="flex items-center" :style="{ height: `${cellSize}px` }">
                {{ label }}
              </div>
            </div>

            <!-- Weeks -->
            <div class="flex" :style="{ gap: `${cellGap}px` }">
              <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col" :style="{ gap: `${cellGap}px` }">
                <div
                  v-for="(day, di) in week"
                  :key="day?.date ?? `empty-${wi}-${di}`"
                  :class="[
                    'transition-colors',
                    day ? 'cursor-pointer' : 'pointer-events-none opacity-0',
                    day ? (levelColors[day.level] || levelColors[0]) : levelColors[0]
                  ]"
                  :style="{ width: `${cellSize}px`, height: `${cellSize}px` }"
                  @mouseenter="day && showTooltip(day, $event)"
                  @mouseleave="hoveredDay = null"
                />
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex items-center gap-2 mt-4 text-[10px] font-mono text-muted-foreground">
            <span>Less</span>
            <div
              v-for="(color, i) in levelColors"
              :key="i"
              :class="['w-[10px] h-[10px]', color]"
            />
            <span>More</span>
          </div>
        </div>

        <!-- Tooltip -->
        <Teleport to="body">
          <div
            v-if="hoveredDay"
            class="fixed z-[100] px-3 py-1.5 bg-background border border-border text-xs font-mono pointer-events-none shadow-lg"
            :style="{ left: tooltipPos.x + 10 + 'px', top: tooltipPos.y - 30 + 'px' }"
          >
            <span class="text-terminal-cyan">{{ hoveredDay.count }}</span> contributions on
            <span class="text-foreground">{{ hoveredDay.date }}</span>
          </div>
        </Teleport>
      </div>
    </div>
  </section>
</template>
