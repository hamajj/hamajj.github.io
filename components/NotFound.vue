<script setup lang="ts">
defineProps<{ status?: number }>()
defineEmits<{ home: [] }>()
</script>

<template>
  <div
    class="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-4 py-10"
  >
    <!-- the dialog -->
    <div
      role="alertdialog"
      aria-label="Page not found"
      class="animate-win-open w-[min(94vw,460px)] bg-win-gray bevel-out hard-shadow"
    >
      <div class="flex h-[22px] items-center gap-1.5 px-1 title-active">
        <span class="flex-1 font-ui text-[12px] font-bold text-white">
          {{ status ?? 404 }} — {{ status === 404 || !status ? 'Page not found' : 'Error' }}
        </span>
      </div>

      <div class="flex gap-4 px-5 py-6">
        <PixelIcon name="error" class="h-9 w-9 shrink-0" />
        <div>
          <p class="font-ui text-[13px] leading-relaxed text-black">
            Windows cannot find
            <code class="bg-white px-1 font-vt text-[15px]">C:\THIS\PAGE.TXT</code>.
          </p>
          <p class="mt-2 font-ui text-[13px] leading-relaxed text-black">
            Make sure you typed the name correctly, or that you didn't take a wrong turn
            somewhere in 1999.
          </p>
          <p class="mt-2 font-ui text-[11px] italic leading-relaxed text-win-mid">
            (the desktop pet swears it didn't eat it.)
          </p>
        </div>
      </div>

      <div class="flex justify-center gap-3 pb-5">
        <button type="button" class="win98-btn min-w-[140px] font-bold" @click="$emit('home')">
          Back to the homepage
        </button>
      </div>
    </div>

    <!-- decorative footer -->
    <p class="marquee w-[min(94vw,560px)] border-y-2 border-black bg-title-blue px-0 py-1">
      <span class="font-pixel text-[9px] text-white"
        >error 404 · file not found · were you looking for the guestbook? it lives on the
        desktop · try not to wander off the internet ~*~</span
      >
    </p>
  </div>
</template>
