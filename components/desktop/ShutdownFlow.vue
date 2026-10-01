<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useShell } from '~/composables/useShell'

const { shutDown, restartSite } = useShell()
const restartBtn = ref<HTMLButtonElement | null>(null)

watch(shutDown, async (isDown) => {
  if (isDown) {
    await nextTick()
    restartBtn.value?.focus()
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="shutDown"
      role="status"
      aria-live="assertive"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 bg-black px-6 text-center"
    >
      <div>
        <p class="font-vt text-[clamp(28px,6vw,52px)] leading-tight text-[#ffb000]">
          It is now safe to turn off your computer.
        </p>
        <p class="mt-4 font-vt text-[20px] text-[#5a5a5a]">
          (it's a website. nothing actually broke.)
          <span class="animate-blink ml-1 inline-block">█</span>
        </p>
      </div>

      <button
        ref="restartBtn"
        type="button"
        class="win98-btn text-[14px]"
        @click="restartSite"
      >
        <span class="font-bold">Restart hamza's website</span>
      </button>
    </div>
  </Teleport>
</template>
