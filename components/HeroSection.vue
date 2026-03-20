<template>
  <section class="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">

    <!-- Phase 1: Loading screen with red progress bar -->
    <div v-if="phase === 'loading'" class="relative z-10 w-full max-w-2xl px-8">
      <!-- V1 silhouette -->
      <div class="flex justify-center mb-8">
        <img
          src="/V1.png"
          alt="V1"
          class="h-32 object-contain v1-silhouette"
          style="filter: brightness(0) saturate(100%) invert(10%) sepia(100%) saturate(5000%) hue-rotate(0deg) brightness(0.8);"
        />
      </div>

      <div class="text-red-600 font-black text-2xl tracking-[0.5em] mb-6 uppercase glitch-subtle" data-text="ULTRAKILL">
        ULTRAKILL
      </div>

      <!-- Progress bar -->
      <div class="w-full h-3 bg-red-900/40 border border-red-900 overflow-hidden mb-2">
        <div
          class="h-full bg-red-600 transition-all duration-200 relative"
          :style="{ width: `${loadProgress}%`, boxShadow: '0 0 12px #ff0000' }"
        >
          <div class="absolute right-0 top-0 h-full w-3 bg-white/60 blur-sm"></div>
        </div>
      </div>
      <div class="text-xs text-red-600/70 font-mono tracking-widest">
        LOADING... {{ Math.floor(loadProgress) }}%
      </div>
    </div>

    <!-- Phase 2: Boot sequence terminal -->
    <div v-else-if="phase === 'boot'" class="relative z-10 p-8 border-4 border-white bg-black/50 backdrop-blur-sm max-w-4xl w-full">
      <div class="text-left font-mono text-sm md:text-base text-yellow-400 mb-2 h-64 overflow-hidden">
        <p v-for="(log, index) in logs" :key="index" class="mb-1 boot-log" :style="{ animationDelay: `${index * 0.05}s` }">
          <span class="text-green-500">[OK]</span> {{ log }}
          <span v-if="index === logs.length - 1 && !bootComplete" class="blink-cursor">_</span>
        </p>
      </div>
    </div>

    <!-- Phase 3: Main title -->
    <div v-else class="relative z-10 p-8 border-4 border-white bg-black/50 backdrop-blur-sm max-w-4xl w-full">
      <div class="animate-slide-in-left">
        <h1 class="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-2 glitch" data-text="MANKIND IS DEAD">
          MANKIND IS DEAD
        </h1>
        <h1 class="text-5xl md:text-8xl font-black italic tracking-tighter text-red-600 mb-2 glitch" data-text="BLOOD IS FUEL">
          BLOOD IS FUEL
        </h1>
        <h1 class="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-10 glitch" data-text="HELL IS FULL">
          HELL IS FULL
        </h1>

        <div class="flex flex-col items-center gap-4">
          <p class="text-lg md:text-2xl text-yellow-400 font-bold uppercase tracking-widest border-b-2 border-yellow-400 pb-1">
            Current Objective: Build High-Impact Websites
          </p>

          <button
            @click="scrollToContent"
            class="mt-6 px-12 py-4 bg-red-600 text-white text-xl font-black hover:bg-white hover:text-red-600 transition-all duration-100 border-4 border-white hover:border-red-600 uppercase tracking-widest relative group overflow-hidden"
          >
            <!-- Button shine sweep -->
            <span class="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300 skew-x-12"></span>
            <span class="relative">Press Start</span>
            <span class="absolute bottom-1 right-2 text-[10px] opacity-40">[ENTER]</span>
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const phase = ref('loading')
const loadProgress = ref(0)
const logs = ref([])
const bootComplete = ref(false)

const allLogs = [
  'MACHINE ID: V1-PORTFOLIO — AUTHENTICATED',
  'LOADING COMBAT MODULES...',
  'CALIBRATING VISUAL SENSORS...',
  'CONNECTING TO NEURAL NETWORK...',
  'RENDERING PIPELINE — OPTIMIZED',
  'INTEGRITY CHECK — PASSED',
  'HELL IS FULL. OVERFLOW DETECTED.',
  'SYSTEM READY.',
]

const scrollToContent = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Phase 1: progress bar fill (0 → 100 in ~1.5s)
  const startTime = Date.now()
  const duration = 1500
  const progressRAF = () => {
    const elapsed = Date.now() - startTime
    loadProgress.value = Math.min(100, (elapsed / duration) * 100)
    if (loadProgress.value < 100) {
      requestAnimationFrame(progressRAF)
    } else {
      // Transition to boot phase
      setTimeout(() => { phase.value = 'boot' }, 200)
      startBootSequence()
    }
  }
  requestAnimationFrame(progressRAF)
})

const startBootSequence = () => {
  let delay = 300
  allLogs.forEach((log, index) => {
    setTimeout(() => {
      logs.value.push(log)
      if (index === allLogs.length - 1) {
        bootComplete.value = true
        setTimeout(() => { phase.value = 'title' }, 600)
      }
    }, delay)
    delay += Math.random() * 200 + 80
  })
}
</script>

<style scoped>
.v1-silhouette {
  animation: v1-pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 20px #ff0000) brightness(0) saturate(100%) invert(10%) sepia(100%) saturate(5000%) hue-rotate(0deg);
}

@keyframes v1-pulse {
  0%, 100% { opacity: 0.7; transform: scale(1);    }
  50%       { opacity: 1;   transform: scale(1.03); }
}

.boot-log {
  animation: boot-line-in 0.2s ease-out both;
}
@keyframes boot-line-in {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0);    }
}

.blink-cursor {
  animation: blink 0.7s step-start infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

.glitch-subtle {
  position: relative;
}
.glitch-subtle::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 2px;
  color: #ff0000;
  opacity: 0.5;
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  animation: subtle-glitch 3s infinite;
}
@keyframes subtle-glitch {
  0%, 90%, 100% { transform: translateX(0); opacity: 0; }
  92%            { transform: translateX(-3px); opacity: 0.5; }
  94%            { transform: translateX(3px);  opacity: 0.5; }
  96%            { transform: translateX(0);    opacity: 0; }
}
</style>
