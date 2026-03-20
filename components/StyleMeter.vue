<template>
  <div class="flex flex-col items-end gap-1 select-none">
    <!-- STYLE! Burst -->
    <Transition name="style-burst">
      <div v-if="showBurst" class="style-burst font-black italic text-white text-2xl tracking-widest mb-1">
        STYLE!
      </div>
    </Transition>

    <!-- Rank Letter -->
    <div class="relative" v-show="stylePoints > 0">
      <span
        class="text-6xl font-black italic leading-none"
        :style="rankLetterStyle"
      >{{ currentRank }}</span>
      <!-- White flash on rank-up -->
      <span
        v-if="rankChanged"
        class="absolute top-0 left-0 text-6xl font-black italic leading-none text-white rank-flash pointer-events-none"
      >{{ currentRank }}</span>
    </div>

    <!-- Meter Box -->
    <Transition name="meter-fade">
      <div
        v-show="stylePoints > 0"
        class="bg-black/90 border-2 p-2 flex flex-col items-end min-w-[170px] transition-colors duration-500"
        :style="{ borderColor: rankColor }"
      >
        <div class="text-xs text-gray-400 font-mono uppercase mb-1 tracking-widest">STYLE INDEX</div>

        <!-- Meter bar -->
        <div class="w-full h-2 bg-gray-900 mb-1 relative overflow-hidden">
          <div
            class="h-full transition-all duration-150 relative"
            :style="{ width: `${meterPercent}%`, background: rankColor, boxShadow: `0 0 6px ${rankColor}` }"
          ></div>
        </div>

        <div class="text-right font-mono text-xs tracking-widest" :style="{ color: rankColor }">
          + {{ lastAction }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const stylePoints = ref(0)
const lastAction = ref('SCROLL')
const currentRank = ref('D')
const rankChanged = ref(false)
const showBurst = ref(false)

let decayInterval

const ranks = [
  { threshold: 0,    label: 'D',         color: '#888888' },
  { threshold: 100,  label: 'C',         color: '#4488ff' },
  { threshold: 300,  label: 'B',         color: '#44ff88' },
  { threshold: 600,  label: 'A',         color: '#ff8800' },
  { threshold: 1000, label: 'S',         color: '#ff2222' },
  { threshold: 1500, label: 'SS',        color: '#cc0000' },
  { threshold: 2000, label: 'SSS',       color: '#ffd700' },
  { threshold: 3000, label: 'ULTRAKILL', color: 'rainbow' },
]

const rankData = computed(() =>
  ranks.slice().reverse().find(r => stylePoints.value >= r.threshold) || ranks[0]
)

const rankColor = computed(() =>
  rankData.value.color === 'rainbow' ? '#ff0000' : rankData.value.color
)

const rankLetterStyle = computed(() => {
  if (rankData.value.color === 'rainbow') {
    return {
      background: 'linear-gradient(90deg,#ff0000,#ff7700,#ffff00,#00ff88,#00ffff,#ff00ff,#ff0000)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'rainbow-shift 1s linear infinite',
      filter: 'drop-shadow(0 0 8px #ff0000)',
      fontSize: '2.5rem',
    }
  }
  return {
    color: rankData.value.color,
    filter: `drop-shadow(0 0 8px ${rankData.value.color})`,
    textShadow: `0 0 20px ${rankData.value.color}`,
  }
})

const nextThreshold = computed(() => {
  const idx = ranks.findIndex(r => r.label === rankData.value.label)
  return idx < ranks.length - 1 ? ranks[idx + 1].threshold : ranks[ranks.length - 1].threshold + 1000
})

const meterPercent = computed(() => {
  const current = rankData.value.threshold
  const next = nextThreshold.value
  return Math.min(100, ((stylePoints.value - current) / (next - current)) * 100)
})

const updateRank = () => {
  const newRank = rankData.value.label
  if (newRank !== currentRank.value) {
    const isUpgrade = ranks.findIndex(r => r.label === newRank) > ranks.findIndex(r => r.label === currentRank.value)
    currentRank.value = newRank
    rankChanged.value = true
    showBurst.value = true
    if (isUpgrade) {
      window.dispatchEvent(new CustomEvent('uk-rankup', { detail: newRank }))
    }
    setTimeout(() => { rankChanged.value = false }, 600)
    setTimeout(() => { showBurst.value = false }, 800)
  }
}

const addStyle = (points, action) => {
  stylePoints.value = Math.min(4000, stylePoints.value + points)
  lastAction.value = action.toUpperCase()
  updateRank()
}

const handleScroll = () => addStyle(5, 'SCROLL')

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
      stylePoints.value = Math.max(0, stylePoints.value - 8)
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

<style scoped>
.style-burst {
  text-shadow: 0 0 20px #fff, 2px 0 #ff0000, -2px 0 #00ffff;
  animation: burst-in 0.15s ease-out forwards;
}

.style-burst-enter-active { animation: burst-in 0.15s ease-out forwards; }
.style-burst-leave-active { animation: burst-out 0.5s ease-in forwards; }

@keyframes burst-in {
  from { transform: scale(1.8); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
@keyframes burst-out {
  from { transform: translateY(0); opacity: 1; }
  to   { transform: translateY(-24px); opacity: 0; }
}

.rank-flash {
  animation: rank-flash-anim 0.6s ease-out forwards;
}
@keyframes rank-flash-anim {
  0%   { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0; transform: scale(2);   }
}

.meter-fade-enter-active { transition: opacity 0.3s, transform 0.3s; }
.meter-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.meter-fade-enter-from   { opacity: 0; transform: translateX(20px); }
.meter-fade-leave-to     { opacity: 0; transform: translateX(20px); }
</style>
