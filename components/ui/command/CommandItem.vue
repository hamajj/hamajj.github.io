<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string; disabled?: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <div
    :class="cn(
      'relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm font-mono outline-none hover:bg-accent hover:text-accent-foreground',
      disabled && 'pointer-events-none opacity-50',
      $props.class
    )"
    @click="!disabled && $emit('select')"
  >
    <slot />
  </div>
</template>
