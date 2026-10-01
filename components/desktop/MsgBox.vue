<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useMsgBox } from '~/composables/useMsgBox'

const { current, settle, dismiss } = useMsgBox()
const root = ref<HTMLElement | null>(null)

watch(
  () => current.value,
  async (item) => {
    if (!item) return
    await nextTick()
    root.value?.querySelector<HTMLElement>('button:first-child')?.focus()
  }
)

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    dismiss()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="current"
      class="fixed inset-0 z-[9800] flex items-start justify-center bg-black/10 pt-[14vh]"
      @keydown="onKeydown"
    >
      <div
        ref="root"
        role="alertdialog"
        aria-modal="true"
        :aria-label="current.title"
        class="animate-win-open w-[min(92vw,420px)] bg-win-gray bevel-out hard-shadow"
      >
        <div class="flex h-[22px] items-center gap-1.5 px-1 title-active">
          <h2 class="flex-1 truncate font-ui text-[12px] font-bold text-white">
            {{ current.title }}
          </h2>
          <button
            type="button"
            class="title-btn"
            aria-label="Close"
            @click="dismiss"
          >
            <span class="font-ui text-[10px] font-bold leading-none">✕</span>
          </button>
        </div>

        <div class="flex gap-4 px-5 py-5">
          <PixelIcon :name="current.icon ?? 'info'" class="h-8 w-8 shrink-0" />
          <p class="whitespace-pre-line font-ui text-[13px] leading-relaxed text-black">
            {{ current.message }}
          </p>
        </div>

        <div class="flex justify-center gap-3 pb-4">
          <button
            v-for="(button, i) in current.buttons"
            :key="button.label"
            type="button"
            class="win98-btn min-w-[86px]"
            @click="settle(button.value)"
          >
            <span :class="i === 0 ? 'font-bold' : ''">{{ button.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
