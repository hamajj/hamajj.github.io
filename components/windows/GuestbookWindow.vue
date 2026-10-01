<script setup lang="ts">
import { site } from '~/data/site'
import { useMsgBox } from '~/composables/useMsgBox'

const { msgBox } = useMsgBox()

const sign = async () => {
  const result = await msgBox({
    title: 'guestbook.exe',
    icon: 'info',
    message:
      'This guestbook is a prop — there is no backend, so nothing would be saved or sent.\n\nWhen a real one exists, this button will open a form. For now, email works.',
    buttons: [
      { label: 'OK', value: 'ok' },
      { label: 'Email instead', value: 'email' },
    ],
  })
  if (result === 'email') {
    window.location.href = `mailto:${site.email}?subject=guestbook`
  }
}
</script>

<template>
  <div class="bg-win-gray p-4">
    <!-- under construction -->
    <div
      class="border-2 border-black px-2 py-1.5"
      style="
        background-image: repeating-linear-gradient(
          45deg,
          #000 0 8px,
          #ffe600 8px 16px
        );
      "
      aria-label="Under construction"
    >
      <p
        class="bg-black px-2 py-1 text-center font-pixel text-[8px] leading-relaxed text-acc-yellow"
      >
        ⚠ UNDER CONSTRUCTION ⚠
      </p>
    </div>

    <div class="bevel-in mt-4 bg-white p-5 text-center">
      <p class="font-ui text-[13px] font-bold text-black">
        the guestbook is being rebuilt.
      </p>
      <p class="mt-2 font-ui text-[12px] leading-relaxed text-win-mid">
        no entries yet — it will remember visitors again once it has somewhere to
        keep them.
      </p>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p class="font-ui text-[11px] italic text-win-mid">
        0 entries · architecture ready for a real backend later
      </p>
      <button type="button" class="win98-btn font-ui text-[13px]" @click="sign">
        ✍ Sign my guestbook
      </button>
    </div>
  </div>
</template>
