<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { petLines } from '~/data/site'

const bubble = ref('')
const bouncing = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

const poke = () => {
  bubble.value = petLines[Math.floor(Math.random() * petLines.length)] ?? 'beep boop.'
  bouncing.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    bubble.value = ''
    bouncing.value = false
  }, 3400)
}

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <div class="absolute left-2 bottom-[48px] z-[9300] flex flex-col items-center gap-1">
    <!-- speech bubble -->
    <div
      v-if="bubble"
      class="animate-tip-in max-w-[200px] border border-black bg-[#ffffe1] px-2 py-1 font-ui text-[11px] leading-snug text-black hard-shadow-sm"
      role="status"
    >
      {{ bubble }}
    </div>

    <button
      type="button"
      class="on-dark flex h-12 w-12 items-center justify-center"
      aria-label="poke the desktop pet"
      data-tip="poke"
      @click="poke"
    >
      <svg
        viewBox="0 0 16 16"
        shape-rendering="crispEdges"
        class="h-11 w-11"
        :class="bouncing ? 'animate-pet-bounce' : ''"
        aria-hidden="true"
      >
        <!-- little ghost -->
        <rect x="4" y="1" width="8" height="1" fill="#000" />
        <rect x="3" y="2" width="10" height="1" fill="#000" />
        <rect x="2" y="3" width="12" height="10" fill="#000" />
        <rect x="3" y="13" width="3" height="2" fill="#000" />
        <rect x="7" y="13" width="2" height="2" fill="#000" />
        <rect x="10" y="13" width="3" height="2" fill="#000" />
        <rect x="4" y="2" width="8" height="1" fill="#ffffff" />
        <rect x="3" y="3" width="10" height="9" fill="#ffffff" />
        <rect x="4" y="13" width="2" height="1" fill="#ffffff" />
        <rect x="7" y="13" width="2" height="1" fill="#ffffff" />
        <rect x="10" y="13" width="2" height="1" fill="#ffffff" />
        <!-- eyes -->
        <rect x="5" y="5" width="2" height="3" fill="#000080" />
        <rect x="9" y="5" width="2" height="3" fill="#000080" />
        <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
        <rect x="9" y="5" width="1" height="1" fill="#ffffff" />
        <!-- mouth -->
        <rect x="7" y="9" width="2" height="1" fill="#ff69b4" />
        <!-- feet shadow -->
        <rect x="3" y="15" width="10" height="1" fill="rgba(0,0,0,0.35)" />
      </svg>
    </button>
  </div>
</template>
