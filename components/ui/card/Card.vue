<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('border bg-card text-card-foreground', $props.class)">
    <slot />
  </div>
</template>
