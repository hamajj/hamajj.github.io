<template>
  <section class="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">

    <!-- Phase 1: Loading screen -->
    <div v-if="phase === 'loading'" class="relative z-10 w-full max-w-xl px-8">
      <!-- V1 text silhouette -->
      <div class="flex justify-center mb-6">
        <div class="v1-silhouette font-display select-none" style="font-size:8rem; line-height:1; letter-spacing:-0.04em; color:#1a0000; text-shadow: 0 0 40px #ff0000, 0 0 80px #ff000040;">
          V1
        </div>
      </div>

      <div class="glitch-subtle font-display mb-8" data-text="ULTRAKILL"
           style="font-size:1.3rem; letter-spacing:0.6em; color:#cc0000;">
        ULTRAKILL
      </div>

      <!-- Segmented loading bar -->
      <div class="w-full mb-2" style="border: 1px solid rgba(255,0,0,0.3); padding: 2px;">
        <div class="flex gap-px" style="height:10px;">
          <div
            v-for="i in 40" :key="i"
            style="flex:1; transition: background 0.1s;"
            :style="i <= Math.ceil(loadProgress / 2.5)
              ? { background: '#cc0000', boxShadow: '0 0 4px #ff0000' }
              : { background: 'rgba(80,0,0,0.2)' }"
          ></div>
        </div>
      </div>
      <div style="font-size:10px; font-family:'VCR OSD Mono',monospace; letter-spacing:0.3em; color:rgba(200,0,0,0.6);">
        LOADING... {{ Math.floor(loadProgress) }}%
      </div>
    </div>

    <!-- Phase 2: Boot sequence terminal -->
    <div v-else-if="phase === 'boot'" class="relative z-10 w-full max-w-3xl px-4">
      <div
        style="background:#000; border: 1px solid rgba(255,255,255,0.15); padding: 1.5rem 2rem; clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));"
      >
        <!-- inner double border -->
        <div class="absolute inset-[4px] pointer-events-none" style="border: 1px solid rgba(255,0,0,0.15); clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));"></div>

        <!-- Title bar -->
        <div class="flex items-center justify-between mb-4" style="border-bottom: 1px solid rgba(255,0,0,0.3); padding-bottom: 8px;">
          <span class="font-display" style="font-size:0.85rem; letter-spacing:0.2em; color:#ff0000;">MACHINE TERMINAL v1.0</span>
          <div class="flex gap-1">
            <div style="width:8px;height:8px;background:#ff2222;"></div>
            <div style="width:8px;height:8px;background:#ff8800;"></div>
            <div style="width:8px;height:8px;background:#00ff44;"></div>
          </div>
        </div>

        <div class="text-left h-52 overflow-hidden" style="font-family:'VCR OSD Mono',monospace; font-size:0.8rem;">
          <p v-for="(log, index) in logs" :key="index" class="mb-1 boot-log" :style="{ animationDelay: `${index * 0.04}s` }">
            <span style="color:#22ff44;">[OK]</span>
            <span style="color:rgba(255,220,0,0.9);"> {{ log }}</span>
            <span v-if="index === logs.length - 1 && !bootComplete" class="blink-cursor" style="color:#fff;">_</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Phase 3: Main title -->
    <div v-else class="relative z-10 w-full max-w-4xl px-4">
      <div
        style="background:#000; border: 2px solid rgba(255,255,255,0.2); padding: 2.5rem 2rem; position:relative; clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));"
      >
        <!-- inner border -->
        <div class="absolute inset-[5px] pointer-events-none" style="border: 1px solid rgba(255,0,0,0.2); clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));"></div>

        <!-- Red corner brackets -->
        <div class="absolute top-0 left-0 w-6 h-6" style="border-top: 3px solid #ff0000; border-left: 3px solid #ff0000;"></div>
        <div class="absolute top-0 right-0 w-6 h-6" style="border-top: 3px solid #ff0000; border-right: 3px solid #ff0000;"></div>
        <div class="absolute bottom-0 left-0 w-6 h-6" style="border-bottom: 3px solid #ff0000; border-left: 3px solid #ff0000;"></div>
        <div class="absolute bottom-0 right-0 w-6 h-6" style="border-bottom: 3px solid #ff0000; border-right: 3px solid #ff0000;"></div>

        <div class="animate-slide-in-left relative z-10">
          <h1 class="glitch font-display" data-text="MANKIND IS DEAD"
              style="font-size: clamp(2.5rem, 8vw, 6rem); line-height:0.9; letter-spacing:-0.02em; color:#fff; margin-bottom:0.1em;">
            MANKIND IS DEAD
          </h1>
          <h1 class="glitch font-display" data-text="BLOOD IS FUEL"
              style="font-size: clamp(2.5rem, 8vw, 6rem); line-height:0.9; letter-spacing:-0.02em; color:#ff0000; text-shadow: 0 0 30px rgba(255,0,0,0.5); margin-bottom:0.1em;">
            BLOOD IS FUEL
          </h1>
          <h1 class="glitch font-display" data-text="HELL IS FULL"
              style="font-size: clamp(2.5rem, 8vw, 6rem); line-height:0.9; letter-spacing:-0.02em; color:#fff; margin-bottom:1.5rem;">
            HELL IS FULL
          </h1>

          <!-- Red separator -->
          <div style="height:2px; background: linear-gradient(90deg, #ff0000, #cc0000 60%, transparent); margin-bottom: 1.5rem;"></div>

          <p class="font-display" style="font-size:1.1rem; letter-spacing:0.15em; color:#ffdd00; margin-bottom:2rem;">
            CURRENT OBJECTIVE: BUILD HIGH-IMPACT WEBSITES
          </p>

          <button
            @click="scrollToContent"
            class="uk-btn uk-btn-red font-display glitch-hover"
            style="font-size:1.4rem; letter-spacing:0.2em; padding: 0.8rem 3rem;"
          >
            PRESS START
            <span style="position:absolute; bottom:4px; right:8px; font-size:9px; opacity:0.4; font-family:'VCR OSD Mono',monospace;">[ENTER]</span>
          </button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const phase        = ref('loading')
const loadProgress = ref(0)
const logs         = ref([])
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
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const startTime = Date.now()
  const duration  = 1500
  const progressRAF = () => {
    loadProgress.value = Math.min(100, ((Date.now() - startTime) / duration) * 100)
    if (loadProgress.value < 100) {
      requestAnimationFrame(progressRAF)
    } else {
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
  filter: drop-shadow(0 0 30px #ff0000);
}
@keyframes v1-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.03); }
}
</style>
