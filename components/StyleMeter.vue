<template>
  <div class="flex flex-col items-end gap-1 select-none">
    <!-- STYLE! Burst -->
    <Transition name="style-burst">
      <div v-if="showBurst" class="style-burst font-display" style="font-size:1.6rem; letter-spacing:0.2em; color:#fff; text-shadow: 0 0 20px #fff, 2px 0 #ff0000, -2px 0 #00ffff;">
        STYLE!
      </div>
    </Transition>

    <!-- Rank Letter -->
    <div class="relative" v-show="stylePoints > 0">
      <span class="font-display leading-none" style="font-size:4rem;" :style="rankLetterStyle">{{ currentRank }}</span>
      <span
        v-if="rankChanged"
        class="absolute top-0 left-0 font-display leading-none rank-flash pointer-events-none"
        style="font-size:4rem; color:#fff;"
      >{{ currentRank }}</span>
    </div>

    <!-- Meter Box -->
    <Transition name="meter-fade">
      <div
        v-show="stylePoints > 0"
        class="relative"
        style="background:#000; padding: 8px 10px; min-width:160px; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%); transition: border-color 0.4s;"
        :style="{ border: `2px solid ${rankColor}` }"
      >
        <!-- Inner border -->
        <div class="absolute inset-[3px] pointer-events-none" style="clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);" :style="{ border: `1px solid ${rankColor}25` }"></div>

        <div class="text-right" style="font-family:'VCR OSD Mono',monospace; font-size:8px; letter-spacing:0.25em; color:rgba(255,255,255,0.35); margin-bottom:6px;">STYLE INDEX</div>

        <!-- Segmented meter bar -->
        <div class="flex gap-px" style="height:8px; margin-bottom:5px;">
          <div
            v-for="i in 16" :key="i"
            style="flex:1; transition: background 0.12s, box-shadow 0.12s; border: 1px solid rgba(255,255,255,0.06);"
            :style="i <= Math.ceil(meterPercent / 6.25)
              ? { background: rankColor, boxShadow: `0 0 3px ${rankColor}` }
              : { background: 'rgba(30,0,0,0.4)' }"
          ></div>
        </div>

        <div class="text-right font-display" style="font-size:0.75rem; letter-spacing:0.15em; transition: color 0.4s;" :style="{ color: rankColor }">
          + {{ lastAction }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const stylePoints = ref(0)
const lastAction  = ref('SCROLL')
const currentRank = ref('D')
const rankChanged = ref(false)
const showBurst   = ref(false)

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

const rankData  = computed(() => ranks.slice().reverse().find(r => stylePoints.value >= r.threshold) || ranks[0])
const rankColor = computed(() => rankData.value.color === 'rainbow' ? '#ff0000' : rankData.value.color)

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
    }
  }
  return {
    color: rankData.value.color,
    filter: `drop-shadow(0 0 10px ${rankData.value.color})`,
    textShadow: `0 0 24px ${rankData.value.color}80`,
  }
})

const nextThreshold = computed(() => {
  const idx = ranks.findIndex(r => r.label === rankData.value.label)
  return idx < ranks.length - 1 ? ranks[idx + 1].threshold : ranks[ranks.length - 1].threshold + 1000
})
const meterPercent = computed(() => {
  const cur  = rankData.value.threshold
  const next = nextThreshold.value
  return Math.min(100, ((stylePoints.value - cur) / (next - cur)) * 100)
})

const updateRank = () => {
  const newRank = rankData.value.label
  if (newRank !== currentRank.value) {
    const isUpgrade = ranks.findIndex(r => r.label === newRank) > ranks.findIndex(r => r.label === currentRank.value)
    currentRank.value = newRank
    rankChanged.value = true
    showBurst.value   = true
    if (isUpgrade) window.dispatchEvent(new CustomEvent('uk-rankup', { detail: newRank }))
    setTimeout(() => { rankChanged.value = false }, 600)
    setTimeout(() => { showBurst.value   = false }, 800)
  }
}

const addStyle = (points, action) => {
  stylePoints.value = Math.min(4000, stylePoints.value + points)
  lastAction.value  = action.toUpperCase()
  updateRank()
}

onMounted(() => {
  window.addEventListener('scroll',    () => addStyle(5, 'SCROLL'))
  window.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') addStyle(50, 'INTERACTION')
  })
  decayInterval = setInterval(() => {
    if (stylePoints.value > 0) { stylePoints.value = Math.max(0, stylePoints.value - 8); updateRank() }
  }, 100)
})
onUnmounted(() => { clearInterval(decayInterval) })
</script>

<style scoped>
.style-burst {
  animation: burst-in 0.15s ease-out forwards;
}
.style-burst-enter-active { animation: burst-in 0.15s ease-out forwards; }
.style-burst-leave-active { animation: burst-out 0.5s ease-in forwards; }

@keyframes burst-in  { from { transform: scale(1.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes burst-out { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-24px); opacity: 0; } }

.rank-flash { animation: rank-flash-anim 0.6s ease-out forwards; }
@keyframes rank-flash-anim {
  0%   { opacity: 1; transform: scale(1.3); }
  100% { opacity: 0; transform: scale(2.2); }
}

.meter-fade-enter-active { transition: opacity 0.3s, transform 0.3s; }
.meter-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.meter-fade-enter-from   { opacity: 0; transform: translateX(16px); }
.meter-fade-leave-to     { opacity: 0; transform: translateX(16px); }
</style>
