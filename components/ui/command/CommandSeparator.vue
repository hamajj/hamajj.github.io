<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('-mx-1 h-px bg-border', $props.class)" />
</template>
