<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground', $props.class)">
    <slot />
  </div>
</template>
