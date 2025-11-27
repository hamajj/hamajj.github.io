<template>
  <section class="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
    <div class="relative z-10 p-8 border-4 border-white bg-black/50 backdrop-blur-sm max-w-4xl w-full">
      <!-- Boot Sequence Text -->
      <div v-if="!bootComplete" class="text-left font-mono text-sm md:text-base text-yellow-400 mb-8 h-64 overflow-hidden">
        <p v-for="(log, index) in logs" :key="index" class="mb-1">
          <span class="text-green-500">[OK]</span> {{ log }}
        </p>
      </div>

      <!-- Main Title -->
      <div v-else class="animate-slide-in-left">
        <h1 class="text-6xl md:text-9xl font-black italic tracking-tighter text-white mb-2 glitch" data-text="MANKIND IS DEAD">
          MANKIND IS DEAD
        </h1>
        <h1 class="text-6xl md:text-9xl font-black italic tracking-tighter text-red-600 mb-2 glitch" data-text="BLOOD IS FUEL">
          BLOOD IS FUEL
        </h1>
        <h1 class="text-6xl md:text-9xl font-black italic tracking-tighter text-white mb-12 glitch" data-text="HELL IS FULL">
          HELL IS FULL
        </h1>

        <div class="flex flex-col items-center gap-4">
          <p class="text-xl md:text-2xl text-yellow-400 font-bold uppercase tracking-widest border-b-2 border-yellow-400 pb-1">
            Current Objective: Build High-Impact Websites
          </p>
          
          <button @click="scrollToContent" class="mt-8 px-12 py-4 bg-red-600 text-white text-2xl font-bold hover:bg-white hover:text-red-600 transition-all duration-100 border-4 border-white hover:border-red-600 uppercase tracking-widest animate-pulse">
            Press Start
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bootComplete = ref(false)
const logs = ref([])
const allLogs = [
  'INITIALIZING SYSTEMS...',
  'LOADING ASSETS...',
  'CONNECTING TO NEURAL NETWORK...',
  'CALIBRATING VISUAL SENSORS...',
  'OPTIMIZING RENDERING PIPELINE...',
  'CHECKING INTEGRITY...',
  'SYSTEM READY.'
]

const scrollToContent = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  let delay = 0
  allLogs.forEach((log, index) => {
    setTimeout(() => {
      logs.value.push(log)
      if (index === allLogs.length - 1) {
        setTimeout(() => {
          bootComplete.value = true
        }, 800)
      }
    }, delay)
    delay += Math.random() * 300 + 100
  })
})
</script>
