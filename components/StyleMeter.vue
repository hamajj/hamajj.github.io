<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const stylePoints = ref(0)
const lastAction = ref('')
const currentRank = ref('D')
const rankChanged = ref(false)

let decayInterval: ReturnType<typeof setInterval>

const ranks = [
  { threshold: 0, label: 'D', color: 'text-gray-400' },
  { threshold: 100, label: 'C', color: 'text-pink-400' },
  { threshold: 300, label: 'B', color: 'text-fuchsia-400' },
  { threshold: 600, label: 'A', color: 'text-terminal-amber' },
  { threshold: 1000, label: 'S', color: 'text-rose-400' },
  { threshold: 1500, label: 'SS', color: 'text-red-400' },
  { threshold: 2000, label: 'SSS', color: 'text-ultra-red' },
  { threshold: 3000, label: 'ULTRAKILL', color: 'text-ultra-red' },
]

const currentRankInfo = computed(() => {
  return ranks.slice().reverse().find(r => stylePoints.value >= r.threshold) || ranks[0]
})

const progressPercent = computed(() => {
  const nextRank = ranks.find(r => r.threshold > stylePoints.value)
  if (!nextRank) return 100
  const prevRank = ranks[ranks.indexOf(nextRank) - 1]
  const range = nextRank.threshold - (prevRank?.threshold || 0)
  const progress = stylePoints.value - (prevRank?.threshold || 0)
  return Math.min((progress / range) * 100, 100)
})

const updateRank = () => {
  const newRank = currentRankInfo.value.label
  if (newRank !== currentRank.value) {
    currentRank.value = newRank
    rankChanged.value = true
    setTimeout(() => rankChanged.value = false, 500)
  }
}

const addStyle = (points: number, action: string) => {
  stylePoints.value += points
  lastAction.value = action.toUpperCase()
  updateRank()
}

const handleScroll = () => {
  addStyle(5, 'SCROLL')
}

const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'A' || target.tagName === 'BUTTON') {
    addStyle(50, 'INTERACTION')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mouseover', handleMouseOver)

  decayInterval = setInterval(() => {
    if (stylePoints.value > 0) {
      stylePoints.value = Math.max(0, stylePoints.value - 10)
      updateRank()
    }
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mouseover', handleMouseOver)
  if (decayInterval) clearInterval(decayInterval)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="stylePoints > 0"
      class="fixed top-20 right-4 z-40 flex flex-col items-end gap-2"
    >
      <!-- Rank -->
      <div class="relative">
        <span
          :class="currentRankInfo.color"
          class="text-5xl font-bold tracking-tighter"
          style="-webkit-text-stroke: 1px currentColor;"
        >
          {{ currentRank }}
        </span>
        <Transition name="ping">
          <span
            v-if="rankChanged"
            :class="currentRankInfo.color"
            class="absolute top-0 left-0 text-5xl font-bold animate-ping opacity-50"
          >
            {{ currentRank }}
          </span>
        </Transition>
      </div>

      <!-- Style box -->
      <div class="bg-background/90 backdrop-blur-sm border border-terminal-cyan/30 p-3 min-w-[140px]">
        <div class="text-xs text-muted-foreground font-mono uppercase mb-1">
          STYLE INDEX
        </div>
        <div class="w-full h-1 bg-muted overflow-hidden">
          <div
            class="h-full bg-terminal-cyan transition-all duration-200"
            :style="{ width: progressPercent + '%' }"
          />
        </div>
        <div class="text-right font-mono text-terminal-green text-sm mt-1">
          + {{ lastAction }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ping-enter-active,
.ping-leave-active {
  transition: opacity 0.5s ease;
}

.ping-enter-from,
.ping-leave-to {
  opacity: 0;
}
</style>
