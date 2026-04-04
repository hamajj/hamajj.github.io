<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string; heading?: string }>()
</script>

<template>
  <div :class="cn('overflow-hidden p-1 text-foreground', $props.class)">
    <div v-if="heading" class="px-2 py-1.5 text-xs font-mono font-medium text-muted-foreground">
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
