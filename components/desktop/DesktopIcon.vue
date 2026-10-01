<script setup lang="ts">
import { useWindowManager } from '~/composables/useWindowManager'

const props = defineProps<{
  id: string
  label: string
  icon:
    | 'computer'
    | 'folder'
    | 'floppy'
    | 'gear'
    | 'book'
    | 'globe'
    | 'chip'
    | 'chart'
    | 'terminal'
}>()

const { launch } = useWindowManager()

const activate = () => launch(props.id)
</script>

<template>
  <button
    type="button"
    class="on-dark group flex w-[86px] flex-col items-center gap-1 rounded-[2px] p-1.5 text-center"
    :aria-label="`Open ${label}`"
    @click="activate"
  >
    <PixelIcon :name="icon" class="h-9 w-9 transition-transform group-active:translate-y-[1px]" />
    <span
      class="max-w-full rounded-[1px] px-1 font-ui text-[11px] leading-tight text-white [text-shadow:1px_1px_0_#000]"
      >{{ label }}</span
    >
  </button>
</template>
