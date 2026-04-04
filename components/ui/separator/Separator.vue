<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{
  orientation?: 'horizontal' | 'vertical'
  class?: string
}>()
</script>

<template>
  <div
    role="separator"
    :class="cn(
      'shrink-0 bg-border',
      orientation === 'vertical' ? 'h-full w-[1px]' : 'h-[1px] w-full',
      $props.class
    )"
  />
</template>
