<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface ContributionDay {
  date: string
  count: number
  level: number
}

const contributions = ref<ContributionDay[]>([])
const loading = ref(true)
const hoveredDay = ref<ContributionDay | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })

const levelColors = [
  'bg-muted',
  'bg-terminal-cyan/20',
  'bg-terminal-cyan/40',
  'bg-terminal-cyan/60',
  'bg-terminal-cyan/80',
  'bg-terminal-cyan',
]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const weeks = computed(() => {
  const result: ContributionDay[][] = []
  let currentWeek: ContributionDay[] = []

  for (const day of contributions.value) {
    const d = new Date(day.date)
    if (d.getDay() === 0 && currentWeek.length > 0) {
      result.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(day)
  }
  if (currentWeek.length > 0) result.push(currentWeek)

  return result
})

const monthLabels = computed(() => {
  const labels: { label: string; col: number }[] = []
  let lastMonth = -1
  for (let w = 0; w < weeks.value.length; w++) {
    const firstDay = weeks.value[w][0]
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth()
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

onMounted(async () => {
  try {
    const data = await $fetch<{ contributions: ContributionDay[] }>('/api/github-events')
    contributions.value = data.contributions
  } catch {
    // Generate empty grid as fallback
    const days: ContributionDay[] = []
    const now = new Date()
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      days.push({ date: d.toISOString().split('T')[0], count: 0, level: 0 })
    }
    contributions.value = days
  } finally {
    loading.value = false
  }
})
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
          <div class="flex gap-[3px] mb-1 ml-8 text-[10px] font-mono text-muted-foreground">
            <div
              v-for="label in monthLabels"
              :key="label.label + label.col"
              class="absolute"
              :style="{ marginLeft: (label.col * 14) + 'px' }"
            >
              {{ label.label }}
            </div>
          </div>

          <div class="flex gap-0 mt-6">
            <!-- Day Labels -->
            <div class="flex flex-col gap-[3px] mr-2 text-[10px] font-mono text-muted-foreground">
              <div v-for="label in dayLabels" :key="label" class="h-[11px] flex items-center">
                {{ label }}
              </div>
            </div>

            <!-- Weeks -->
            <div class="flex gap-[3px]">
              <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-[3px]">
                <div
                  v-for="day in week"
                  :key="day.date"
                  :class="[
                    'w-[11px] h-[11px] cursor-pointer transition-colors',
                    levelColors[day.level] || levelColors[0]
                  ]"
                  @mouseenter="showTooltip(day, $event)"
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
              :class="['w-[11px] h-[11px]', color]"
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
