<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useKonamiCode } from '~/composables/useKonamiCode'

const { activated, progress, reset, totalKeys } = useKonamiCode()
const showOverlay = ref(false)
const particles = ref<{ x: number; y: number; vx: number; vy: number; size: number }[]>([])

watch(activated, (val) => {
  if (val) {
    showOverlay.value = true
    generateParticles()
    setTimeout(() => {
      showOverlay.value = false
      reset()
    }, 5000)
  }
})

const generateParticles = () => {
  particles.value = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 4 + 2,
  }))
}
</script>

<template>
  <!-- Progress indicator -->
  <div
    v-if="progress > 0 && !showOverlay"
    class="fixed bottom-4 left-4 z-50 flex items-center gap-2"
  >
    <div class="flex gap-1">
      <div
        v-for="i in totalKeys"
        :key="i"
        :class="[
          'w-2 h-2 transition-colors',
          i <= progress ? 'bg-terminal-cyan' : 'bg-muted'
        ]"
      />
    </div>
    <span class="text-[10px] font-mono text-muted-foreground">KONAMI</span>
  </div>

  <!-- GOD MODE Overlay -->
  <Teleport to="body">
    <Transition name="godmode">
      <div
        v-if="showOverlay"
        class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      >
        <!-- Scanlines -->
        <div class="absolute inset-0 crt pointer-events-none" />

        <!-- Vignette -->
        <div
          class="absolute inset-0 pointer-events-none"
          style="background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.8) 100%)"
        />

        <!-- Background -->
        <div class="absolute inset-0 bg-black/95" />

        <!-- Floating particles -->
        <div
          v-for="(p, i) in particles"
          :key="i"
          class="absolute rounded-full bg-terminal-cyan/50"
          :style="{
            left: p.x + '%',
            top: p.y + '%',
            width: p.size + 'px',
            height: p.size + 'px',
            animation: `float ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
          }"
        />

        <!-- Content -->
        <div class="relative z-10 text-center space-y-8">
          <div class="glitch" data-text="GOD MODE">
            <h1 class="text-6xl md:text-8xl font-vcr text-terminal-cyan tracking-widest">
              GOD MODE
            </h1>
          </div>

          <p class="text-xl font-vcr text-ultra-red tracking-wider animate-pulse">
            ACTIVATED
          </p>

          <!-- Stats -->
          <div class="flex gap-8 justify-center text-sm font-mono">
            <div class="text-center">
              <div class="text-terminal-cyan text-2xl font-vcr">&infin;</div>
              <div class="text-muted-foreground">HEALTH</div>
            </div>
            <div class="text-center">
              <div class="text-ultra-red text-2xl font-vcr">999</div>
              <div class="text-muted-foreground">DAMAGE</div>
            </div>
            <div class="text-center">
              <div class="text-terminal-green text-2xl font-vcr">MAX</div>
              <div class="text-muted-foreground">STYLE</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.godmode-enter-active {
  transition: opacity 0.3s ease;
}
.godmode-leave-active {
  transition: opacity 1s ease;
}
.godmode-enter-from,
.godmode-leave-to {
  opacity: 0;
}

@keyframes float {
  from { transform: translateY(0) translateX(0); }
  to { transform: translateY(-20px) translateX(10px); }
}
</style>
