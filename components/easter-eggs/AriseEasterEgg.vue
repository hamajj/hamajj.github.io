<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAriseCode } from '~/composables/useAriseCode'

const { activated, progress, reset, totalKeys } = useAriseCode()
const showOverlay = ref(false)
const shaking = ref(false)
const dataParticles = ref<{ x: number; y: number; char: string; speed: number; delay: number }[]>([])

const kanjiChars = ['\u5f71', '\u95c7', '\u6b7b', '\u9b42', '\u738b', '\u529b', '\u7834', '\u6ec5', '\u8840', '\u5263']
const binaryChars = ['0', '1', '0', '1', '0', '1']

watch(activated, (val) => {
  if (val) {
    showOverlay.value = true
    shaking.value = true
    generateDataParticles()

    setTimeout(() => shaking.value = false, 1000)
    setTimeout(() => {
      showOverlay.value = false
      reset()
    }, 6000)
  }
})

const generateDataParticles = () => {
  dataParticles.value = Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    char: i % 2 === 0
      ? kanjiChars[Math.floor(Math.random() * kanjiChars.length)]
      : binaryChars[Math.floor(Math.random() * binaryChars.length)],
    speed: 1 + Math.random() * 3,
    delay: Math.random() * 2,
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
          i <= progress ? 'bg-purple-500' : 'bg-muted'
        ]"
      />
    </div>
    <span class="text-[10px] font-mono text-muted-foreground">ARISE</span>
  </div>

  <!-- SYSTEM CORE OVERRIDE -->
  <Teleport to="body">
    <Transition name="arise">
      <div
        v-if="showOverlay"
        :class="[
          'fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden',
          shaking ? 'screen-shake' : ''
        ]"
      >
        <!-- VHS effect -->
        <div class="absolute inset-0 pointer-events-none vhs-effect" />

        <!-- Scanlines -->
        <div class="absolute inset-0 crt pointer-events-none" />

        <!-- Background -->
        <div class="absolute inset-0 bg-black/97" />

        <!-- Data particles -->
        <div
          v-for="(p, i) in dataParticles"
          :key="i"
          class="absolute text-purple-500/30 font-mono text-sm pointer-events-none"
          :style="{
            left: p.x + '%',
            top: p.y + '%',
            animation: `data-fall ${p.speed}s linear ${p.delay}s infinite`,
          }"
        >
          {{ p.char }}
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center space-y-8 max-w-lg mx-auto px-4">
          <!-- Window frame -->
          <div class="border border-purple-500/50 bg-black/90 p-8">
            <div class="flex items-center gap-2 mb-6 pb-4 border-b border-purple-500/30">
              <div class="w-2 h-2 bg-purple-500" />
              <span class="text-xs font-mono text-purple-500/70">SYSTEM_CORE_OVERRIDE.exe</span>
            </div>

            <div class="glitch" data-text="ARISE">
              <h1 class="text-5xl md:text-7xl font-vcr text-purple-400 tracking-[0.3em]">
                ARISE
              </h1>
            </div>

            <p class="text-sm font-mono text-purple-300/60 mt-4 tracking-wider">
              SHADOW MONARCH PROTOCOL INITIATED
            </p>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="border border-purple-500/20 p-3">
                <div class="text-purple-400 text-lg font-vcr">ABSOLUTE</div>
                <div class="text-[10px] text-purple-500/50 font-mono">POWER</div>
              </div>
              <div class="border border-purple-500/20 p-3">
                <div class="text-purple-400 text-lg font-vcr">OBSOLETE</div>
                <div class="text-[10px] text-purple-500/50 font-mono">LIMITS</div>
              </div>
              <div class="border border-purple-500/20 p-3">
                <div class="text-purple-400 text-lg font-vcr">TERMINATE</div>
                <div class="text-[10px] text-purple-500/50 font-mono">WEAKNESS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.arise-enter-active {
  transition: opacity 0.5s ease;
}
.arise-leave-active {
  transition: opacity 1.5s ease;
}
.arise-enter-from,
.arise-leave-to {
  opacity: 0;
}

.screen-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translate(0); }
  10% { transform: translate(-5px, -3px); }
  20% { transform: translate(5px, 3px); }
  30% { transform: translate(-3px, 5px); }
  40% { transform: translate(3px, -5px); }
  50% { transform: translate(-5px, 3px); }
  60% { transform: translate(5px, -3px); }
  70% { transform: translate(-3px, -5px); }
  80% { transform: translate(3px, 5px); }
  90% { transform: translate(-5px, -3px); }
}

@keyframes data-fall {
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.vhs-effect {
  background: repeating-linear-gradient(
    0deg,
    rgba(128, 0, 255, 0.03) 0px,
    transparent 1px,
    transparent 2px
  );
}
</style>
