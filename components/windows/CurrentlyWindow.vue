<script setup lang="ts">
import { currentlyWorkingOn, type CurrentStatus } from '~/data/site'

const statusStyle: Record<CurrentStatus, { bar: string; chip: string; animate?: boolean }> = {
  Experimenting: { bar: 'progress-stripes', chip: 'bg-acc-orange text-black', animate: true },
  'In Development': { bar: 'progress-chunks', chip: 'bg-acc-lime text-black' },
  'On Hold': { bar: 'progress-chunks opacity-50', chip: 'bg-acc-yellow text-black' },
  'Probably Never Finished': { bar: 'progress-chunks opacity-25', chip: 'bg-acc-pink text-black' },
}
</script>

<template>
  <div class="bg-win-gray p-4">
    <div class="mb-4">
      <p class="font-vt text-[17px] leading-none text-black">
        C:\HAMZA\INPROGRESS\ — setup.exe, running since forever
      </p>
      <p class="mt-1 font-ui text-[11px] italic text-win-mid">
        these bars are decorative. nobody knows the percentages — least of all me.
      </p>
    </div>

    <ol class="space-y-4">
      <li v-for="entry in currentlyWorkingOn" :key="entry.name" class="bevel-out bg-win-gray p-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="font-ui text-[13px] font-bold text-black">
            <a
              v-if="entry.url"
              :href="entry.url"
              target="_blank"
              rel="noopener"
              class="text-title-blue underline-offset-2 hover:underline"
              >{{ entry.name }} ↗</a
            >
            <template v-else>{{ entry.name }}</template>
          </p>
          <span
            class="px-2 py-[2px] font-pixel text-[8px] leading-none"
            :class="statusStyle[entry.status].chip"
            >{{ entry.status }}</span
          >
        </div>

        <p class="mb-2 font-ui text-[12px] leading-relaxed text-black">
          {{ entry.note }}
        </p>

        <div class="progress-track">
          <div
            class="h-full w-full"
            :class="statusStyle[entry.status].bar"
            :style="statusStyle[entry.status].animate ? undefined : { width: '100%' }"
          />
        </div>
      </li>
    </ol>

    <p class="mt-4 font-ui text-[11px] text-win-mid">
      kept in <code class="bg-white px-1">data/site.ts</code> — edit it whenever reality changes.
    </p>
  </div>
</template>
