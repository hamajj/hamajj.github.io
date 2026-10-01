<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'
import { windowDefMap } from '~/data/windows'

const props = defineProps<{ id: string }>()

const { wins, activeId, isDesktop, open, close, minimize, focus, moveTo, toggleMaximize } =
  useWindowManager()

const win = computed(() => wins[props.id])
const def = computed(() => windowDefMap[props.id])
const isActive = computed(() => activeId.value === props.id)

const shown = computed(() => win.value?.open && !win.value.minimized)

const rootEl = ref<HTMLElement | null>(null)

// Mobile stack: bring a window into view when it is opened or focused.
watch(
  [shown, () => isActive.value],
  async ([nowShown, active]) => {
    if (!nowShown || !active || isDesktop.value) return
    await nextTick()
    rootEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  },
  { flush: 'post' }
)

const positionStyle = computed(() => {
  const w = win.value
  if (!w) return {}
  if (!isDesktop.value) return {}
  if (w.maximized) {
    return { left: '0px', top: '0px', width: '100%', height: '100%', zIndex: w.z }
  }
  return {
    left: `${w.x}px`,
    top: `${w.y}px`,
    width: `${w.w}px`,
    height: `${w.h}px`,
    zIndex: w.z,
  }
})

const onPointerDown = (event: PointerEvent) => {
  focus(props.id)
  const w = win.value
  if (!w || !isDesktop.value || w.maximized) return
  const target = event.target as HTMLElement
  if (!target.closest('[data-titlebar]')) return
  if (target.closest('button, a, input, textarea, select')) return

  event.preventDefault()
  const startX = event.clientX
  const startY = event.clientY
  const originX = w.x
  const originY = w.y

  const move = (ev: PointerEvent) => {
    moveTo(props.id, originX + (ev.clientX - startX), originY + (ev.clientY - startY))
  }
  const up = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    document.body.style.userSelect = ''
  }
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}
</script>

<template>
  <section
    v-if="win && def"
    v-show="shown"
    ref="rootEl"
    role="dialog"
    :aria-label="def.title"
    :aria-modal="false"
    class="bg-win-gray bevel-out animate-win-open flex flex-col outline-none"
    :class="[
      isDesktop ? 'absolute' : 'relative w-full',
      'pointer-events-auto',
      isActive ? '' : 'saturate-[0.85]',
    ]"
    :style="positionStyle"
    @pointerdown="onPointerDown"
  >
    <!-- title bar -->
    <header
      data-titlebar
      class="flex h-[22px] shrink-0 items-center gap-1.5 px-1 select-none"
      :class="isActive ? 'title-active' : 'title-inactive'"
      @dblclick="isDesktop && toggleMaximize(props.id)"
    >
      <PixelIcon :name="def.icon" class="h-3.5 w-3.5" />
      <h2
        class="min-w-0 flex-1 truncate font-ui text-[12px] font-bold leading-none text-white"
      >
        {{ def.title }}
      </h2>
      <div class="flex items-center gap-[2px]">
        <button
          type="button"
          class="title-btn"
          :aria-label="`Minimize ${def.title}`"
          @click.stop="minimize(props.id)"
        >
          <span class="mt-[3px] block h-[2px] w-[7px] bg-black" />
        </button>
        <button
          v-if="isDesktop"
          type="button"
          class="title-btn"
          :aria-label="`${win.maximized ? 'Restore' : 'Maximize'} ${def.title}`"
          @click.stop="toggleMaximize(props.id)"
        >
          <span class="block h-[7px] w-[8px] border-[1px] border-t-[2px] border-black" />
        </button>
        <button
          type="button"
          class="title-btn"
          :aria-label="`Close ${def.title}`"
          @click.stop="close(props.id)"
        >
          <span class="font-ui text-[10px] font-bold leading-none">✕</span>
        </button>
      </div>
    </header>

    <!-- optional menu bar -->
    <slot name="menu" />

    <!-- client area -->
    <div class="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
      <slot />
    </div>
  </section>
</template>
