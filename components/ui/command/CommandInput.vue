<script setup lang="ts">
import { cn } from '~/lib/utils'

defineProps<{ class?: string; placeholder?: string }>()
const model = defineModel<string>()
</script>

<template>
  <div class="flex items-center border-b px-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input
      v-model="model"
      :class="cn('flex h-11 w-full bg-transparent py-3 text-sm font-mono outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', $props.class)"
      :placeholder="placeholder"
      type="text"
    />
  </div>
</template>
