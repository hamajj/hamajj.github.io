<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useShell } from '~/composables/useShell'
import { useWindowManager } from '~/composables/useWindowManager'
import { windowDefs } from '~/data/windows'

const {
  startMenuOpen,
  closeStartMenu,
  openRun,
  shutDownSite,
} = useShell()
const { open } = useWindowManager()

const root = ref<HTMLElement | null>(null)

const items = windowDefs.filter((def) => def.start)

const activate = (id: string) => {
  closeStartMenu()
  open(id)
}

const onDocPointerDown = (event: PointerEvent) => {
  if (!startMenuOpen.value) return
  const target = event.target as HTMLElement
  if (target.closest('[data-start-menu]') || target.closest('[data-start-trigger]')) return
  closeStartMenu()
}

const onKeydown = (event: KeyboardEvent) => {
  if (!startMenuOpen.value) return
  if (event.key === 'Escape') {
    event.stopPropagation()
    closeStartMenu()
    document.querySelector<HTMLElement>('[data-start-trigger]')?.focus()
  }
}

watch(startMenuOpen, async (open) => {
  if (open) {
    await nextTick()
    root.value?.querySelector<HTMLElement>('button')?.focus()
  }
})

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
  document.addEventListener('keydown', onKeydown, true)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
  document.removeEventListener('keydown', onKeydown, true)
})
</script>

<template>
  <div
    v-show="startMenuOpen"
    ref="root"
    data-start-menu
    role="menu"
    aria-label="Start menu"
    class="animate-menu-up absolute bottom-[40px] left-1 z-[9500] flex w-[268px] bg-win-gray bevel-out hard-shadow"
  >
    <!-- vertical banner -->
    <div
      class="title-active flex w-7 shrink-0 items-end justify-center pb-3"
      aria-hidden="true"
    >
      <span
        class="font-pixel text-[10px] leading-none text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]"
        >HAMZA&nbsp;98</span
      >
    </div>

    <div class="flex-1 p-1">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2.5 px-2 py-[7px] text-left font-ui text-[13px] text-black hover:bg-title-blue hover:text-white"
        @click="activate(item.id)"
      >
        <PixelIcon :name="item.icon" class="h-4 w-4" />
        <span>{{ item.startLabel ?? item.label }}</span>
      </button>

      <div class="dotted-sep my-1" role="separator" />

      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2.5 px-2 py-[7px] text-left font-ui text-[13px] text-black hover:bg-title-blue hover:text-white"
        @click="
          () => {
            closeStartMenu()
            openRun()
          }
        "
      >
        <PixelIcon name="run" class="h-4 w-4" />
        <span>Run...</span>
      </button>

      <div class="dotted-sep my-1" role="separator" />

      <button
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2.5 px-2 py-[7px] text-left font-ui text-[13px] text-black hover:bg-title-blue hover:text-white"
        @click="
          () => {
            shutDownSite()
          }
        "
      >
        <PixelIcon name="power" class="h-4 w-4" />
        <span>Shut Down...</span>
      </button>
    </div>
  </div>
</template>
