<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useWindowManager, type WinState } from '~/composables/useWindowManager'
import { useShell } from '~/composables/useShell'
import { windowDefMap } from '~/data/windows'
import { trayMessages } from '~/data/site'

const { wins, order, activeId, taskbarClick } = useWindowManager()
const { startMenuOpen, toggleStartMenu, devMode, jukeboxOpen, toggleJukebox } = useShell()

const openWindows = computed(() =>
  order.map((id) => wins[id]).filter((win): win is WinState => Boolean(win?.open))
)

const clock = ref('--:--:--')
const today = ref('')
const messageIdx = ref(0)

const pad = (n: number) => String(n).padStart(2, '0')

let clockTimer: ReturnType<typeof setInterval> | null = null
let msgTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const tick = () => {
    const d = new Date()
    clock.value = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    today.value = d.toDateString()
  }
  tick()
  clockTimer = setInterval(tick, 1000)
  msgTimer = setInterval(() => {
    messageIdx.value = (messageIdx.value + 1) % trayMessages.length
  }, 7000)
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (msgTimer) clearInterval(msgTimer)
})
</script>

<template>
  <div
    class="flex h-[40px] w-full shrink-0 items-center gap-1.5 border-t-2 border-white bg-win-gray px-1.5"
  >
    <!-- Start -->
    <button
      type="button"
      data-start-trigger
      class="win98-btn flex items-center gap-1.5 pr-2.5"
      :data-pressed="startMenuOpen"
      :aria-expanded="startMenuOpen"
      aria-haspopup="menu"
      @click="toggleStartMenu"
    >
      <PixelIcon name="flag" class="h-4 w-4" />
      <span class="font-ui text-[13px] font-bold">Start</span>
    </button>

    <!-- Divider -->
    <span class="mx-0.5 h-6 w-[2px] border-l border-r border-win-mid" aria-hidden="true" />

    <!-- Open windows -->
    <div class="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
      <button
        v-for="win in openWindows"
        :key="win.id"
        type="button"
        class="win98-btn flex min-w-0 max-w-[168px] flex-1 items-center gap-1.5 px-1.5 text-left"
        :data-pressed="activeId === win.id && !win.minimized"
        :aria-label="`Switch to ${windowDefMap[win.id]?.title}`"
        @click="taskbarClick(win.id)"
      >
        <PixelIcon :name="windowDefMap[win.id]?.icon ?? 'computer'" class="h-3.5 w-3.5" />
        <span class="min-w-0 flex-1 truncate font-ui text-[11px]">{{
          windowDefMap[win.id]?.label
        }}</span>
      </button>
    </div>

    <!-- System tray -->
    <div
      class="flex shrink-0 items-center gap-2 border-t border-l border-white border-b border-r border-b-win-mid border-r-win-mid bg-win-gray px-2 py-1"
    >
      <span
        v-if="devMode"
        class="hidden font-pixel text-[8px] text-acc-lime sm:block"
        data-tip="developer mode is on. the terminal knows 'godmode'."
        tabindex="0"
        >DEV</span
      >
      <span
        class="hidden max-w-[220px] truncate font-ui text-[11px] text-black lg:block"
        aria-live="polite"
        >{{ trayMessages[messageIdx] }}</span
      >
      <button
        type="button"
        class="flex h-5 w-5 items-center justify-center"
        :data-pressed="jukeboxOpen"
        :aria-label="jukeboxOpen ? 'Close jukebox' : 'Open jukebox'"
        :data-tip="jukeboxOpen ? 'close the jukebox (it makes no noise either way)' : 'open the jukebox (decorative, no sound)'"
        @click="toggleJukebox"
      >
        <PixelIcon name="music" class="h-4 w-4" />
      </button>
      <time
        class="font-ui text-[12px] tabular-nums text-black"
        :data-tip="`local time · ${today}`"
        >{{ clock }}</time
      >
    </div>
  </div>
</template>
