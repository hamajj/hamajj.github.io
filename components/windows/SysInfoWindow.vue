<script setup lang="ts">
import { systemInfo } from '~/data/site'
</script>

<template>
  <div class="bg-win-gray p-4">
    <div class="mb-3 flex items-center gap-3">
      <PixelIcon name="chip" class="h-8 w-8 shrink-0" />
      <div>
        <p class="font-ui text-[13px] font-bold text-black">hamza's computer — properties</p>
        <p class="font-ui text-[11px] text-win-mid">a personality widget, not a benchmark</p>
      </div>
    </div>

    <dl class="bevel-in divide-y divide-win-mid bg-white">
      <div
        v-for="row in systemInfo"
        :key="row.label"
        class="grid grid-cols-[92px_1fr] gap-2 px-3 py-2"
      >
        <dt class="font-ui text-[12px] font-bold text-win-mid">{{ row.label }}:</dt>
        <dd class="font-vt text-[16px] leading-none text-black">{{ row.value }}</dd>
      </div>
    </dl>

    <div class="mt-3 flex justify-end gap-2">
      <span class="bevel-out-sm bg-acc-lime px-2 py-1 font-pixel text-[8px] text-black"
        >RUNS FINE</span
      >
      <span class="bevel-out-sm bg-acc-cyan px-2 py-1 font-pixel text-[8px] text-black"
        >FANS LOUD</span
      >
    </div>
  </div>
</template>
