<script setup lang="ts">
import { ref } from 'vue'
import { jukebox } from '~/data/site'
import { useShell } from '~/composables/useShell'

const { jukeboxOpen, toggleJukebox } = useShell()
const playing = ref(false)
</script>

<template>
  <aside
    v-show="jukeboxOpen"
    aria-label="Decorative jukebox"
    class="absolute right-2 bottom-[48px] z-[9400] w-[248px] bg-win-gray bevel-out hard-shadow"
  >
    <div class="flex h-[18px] items-center gap-1 px-1 title-active">
      <span class="flex-1 truncate font-ui text-[11px] font-bold text-white"
        >HAMZA-JUKEBOX</span
      >
      <button
        type="button"
        class="title-btn h-[14px] w-[16px]"
        aria-label="Close jukebox"
        @click="toggleJukebox"
      >
        <span class="font-ui text-[9px] font-bold leading-none">✕</span>
      </button>
    </div>

    <div class="p-2">
      <!-- LED display -->
      <div class="bevel-in mb-2 bg-[#0a1f0a] px-2 py-1.5">
        <div class="marquee">
          <span class="font-vt text-[15px] leading-none text-acc-lime"
            >♪ {{ jukebox.track }} — {{ jukebox.album }}</span
          >
        </div>
        <div class="mt-1 flex items-center justify-between">
          <span class="font-vt text-[13px] leading-none text-acc-lime/70">00:00</span>
          <span class="font-pixel text-[7px] leading-none text-acc-yellow"
            >{{ jukebox.note }}</span
          >
        </div>
      </div>

      <!-- static "visualizer" (never animates — there is no audio) -->
      <div class="mb-2 flex h-6 items-end gap-[3px] px-1" aria-hidden="true">
        <span
          v-for="(h, i) in [40, 75, 55, 90, 65, 100, 45, 80, 60, 35]"
          :key="i"
          class="w-full bg-title-blue"
          :style="{ height: `${h}%` }"
        />
      </div>

      <!-- controls -->
      <div class="flex items-center justify-center gap-1.5">
        <button
          type="button"
          class="win98-btn px-2 text-[12px]"
          data-tip="rewinds to before the tape was invented"
          aria-label="Previous track"
        >
          ⏮
        </button>
        <button
          type="button"
          class="win98-btn px-3 text-[12px]"
          :data-pressed="playing"
          :data-tip="
            playing
              ? 'paused. nothing was playing either way.'
              : 'there is no audio file. this is a picture of a music player.'
          "
          :aria-label="playing ? 'Pause demo' : 'Play demo'"
          @click="playing = !playing"
        >
          {{ playing ? '❚❚' : '▶' }}
        </button>
        <button
          type="button"
          class="win98-btn px-2 text-[12px]"
          data-tip="stops nothing, technically"
          aria-label="Stop"
          @click="playing = false"
        >
          ■
        </button>
        <button
          type="button"
          class="win98-btn px-2 text-[12px]"
          data-tip="the volume knob is purely decorative. brave of them."
          aria-label="Volume"
        >
          🔊
        </button>
      </div>

      <p class="mt-1.5 text-center font-ui text-[10px] leading-tight text-win-mid">
        decorative widget · no audio · {{ playing ? 'demo state: playing (visually)' : 'demo state: stopped' }}
      </p>
    </div>
  </aside>
</template>
