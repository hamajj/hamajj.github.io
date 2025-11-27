<template>
  <div class="flex flex-col items-end gap-1 transition-opacity duration-500" :class="{ 'opacity-0': stylePoints === 0, 'opacity-100': stylePoints > 0 }">
    <!-- Rank Letter -->
    <div class="relative">
      <span class="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400" 
            style="-webkit-text-stroke: 2px #000; filter: drop-shadow(4px 4px 0px #000);">
        {{ currentRank }}
      </span>
      <span class="absolute top-0 left-0 text-6xl font-black italic text-white animate-ping opacity-50" v-if="rankChanged">
        {{ currentRank }}
      </span>
    </div>

    <!-- Style Info -->
    <div class="bg-black/80 border-2 border-white p-2 flex flex-col items-end min-w-[150px]">
      <div class="text-xs text-gray-400 font-mono uppercase mb-1">STYLE INDEX</div>
      <div class="w-full h-2 bg-gray-800 mb-1">
         <div class="h-full bg-white transition-all duration-200" :style="{ width: `${(stylePoints % 100)}%` }"></div>
      </div>
      <div class="text-right font-mono text-white text-sm">
        + {{ lastAction }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stylePoints = ref(0)
const lastAction = ref('')
const currentRank = ref('D')
const rankChanged = ref(false)

let decayInterval

const ranks = [
  { threshold: 0, label: 'D' },
  { threshold: 100, label: 'C' },
  { threshold: 300, label: 'B' },
  { threshold: 600, label: 'A' },
  { threshold: 1000, label: 'S' },
  { threshold: 1500, label: 'SS' },
  { threshold: 2000, label: 'SSS' },
  { threshold: 3000, label: 'ULTRAKILL' },
]

const updateRank = () => {
  const newRank = ranks.slice().reverse().find(r => stylePoints.value >= r.threshold)?.label || 'D'
  if (newRank !== currentRank.value) {
    currentRank.value = newRank
    rankChanged.value = true
    setTimeout(() => rankChanged.value = false, 500)
  }
}

const addStyle = (points, action) => {
  stylePoints.value += points
  lastAction.value = action.toUpperCase()
  updateRank()
}

const handleScroll = () => {
  addStyle(5, 'SCROLL')
}

const handleMouseOver = (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
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
  clearInterval(decayInterval)
})
</script>
