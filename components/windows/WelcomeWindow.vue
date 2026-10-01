<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { site, techBadges, tips, jokes } from '~/data/site'
import { useWindowManager } from '~/composables/useWindowManager'
import { useMsgBox } from '~/composables/useMsgBox'
import profileData from '~/data/github-profile.json'

const profile = profileData.profile
const { open } = useWindowManager()
const { msgBox } = useMsgBox()

const visitorCount = ref('000001')
const tipIdx = ref(0)
let tipTimer: ReturnType<typeof setInterval> | null = null

const quickLinks = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Currently', id: 'currently' },
  { label: 'Guestbook', id: 'guestbook' },
  { label: 'Terminal', id: 'terminal' },
]

onMounted(() => {
  try {
    const KEY = 'hc_visitor_count'
    const SESSION_KEY = 'hc_visitor_counted'
    let n = Number(localStorage.getItem(KEY) || '0')
    if (Number.isNaN(n)) n = 0
    if (!sessionStorage.getItem(SESSION_KEY)) {
      n += 1
      localStorage.setItem(KEY, String(n))
      sessionStorage.setItem(SESSION_KEY, '1')
    }
    visitorCount.value = String(n).padStart(6, '0')
  } catch {
    visitorCount.value = '000001'
  }

  tipTimer = setInterval(() => {
    tipIdx.value = (tipIdx.value + 1) % tips.length
  }, 9000)
})

onUnmounted(() => {
  if (tipTimer) clearInterval(tipTimer)
})

const dontClick = () => {
  msgBox({
    title: 'hey!',
    icon: 'warn',
    message: `${jokes.dontClick}\n\nnothing exploded. i'm honestly a little disappointed.`,
  })
}
</script>

<template>
  <div class="bg-win-gray">
    <!-- old-school marquee -->
    <div class="border-b-2 border-black bg-title-blue px-0 py-1 text-white">
      <div class="marquee">
        <span class="font-pixel text-[9px] tracking-wide">{{ site.marquee }}</span>
      </div>
    </div>

    <div class="space-y-4 p-4">
      <!-- greeting -->
      <div class="flex flex-col gap-4 sm:flex-row">
        <div class="shrink-0">
          <img
            :src="profile.avatar"
            :alt="`${profile.name}'s avatar`"
            width="96"
            height="96"
            class="bevel-in bg-white p-1 [image-rendering:auto]"
            loading="eager"
          />
          <p class="mt-1 text-center font-ui text-[11px] text-win-mid">
            {{ profile.login }}.exe
          </p>
        </div>

        <div class="min-w-0">
          <h1
            class="font-pixel text-[13px] leading-[1.7] text-black sm:text-[16px]"
          >
            {{ site.title }}
          </h1>
          <p class="mt-3 font-ui text-[14px] font-bold text-title-blue">
            {{ site.greeting }}
          </p>
          <p class="mt-1 font-ui text-[13px] leading-relaxed text-black">
            {{ site.intro }}
          </p>
          <p class="mt-1 font-ui text-[13px] leading-relaxed text-black">
            {{ site.interests }}
          </p>

          <!-- tech badges -->
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="badge in techBadges"
              :key="badge.name"
              class="bevel-out-sm px-2 py-1 font-pixel text-[9px] leading-none"
              :class="badge.color"
              >{{ badge.name }}</span
            >
          </div>
        </div>
      </div>

      <!-- quick links -->
      <nav aria-label="Quick links" class="flex flex-wrap gap-2">
        <button
          v-for="link in quickLinks"
          :key="link.id"
          type="button"
          class="win98-btn font-ui text-[13px]"
          @click="open(link.id)"
        >
          {{ link.label }}
        </button>
        <a
          :href="site.github"
          target="_blank"
          rel="noopener"
          class="win98-btn font-ui text-[13px] no-underline"
          >GitHub ↗</a
        >
      </nav>

      <!-- counter + decorations -->
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="bevel-in bg-win-gray p-2.5">
          <p class="font-pixel text-[8px] text-black">YOU ARE VISITOR</p>
          <div class="mt-2 flex gap-[3px]">
            <span
              v-for="(digit, i) in visitorCount.split('')"
              :key="i"
              class="bevel-in-sm bg-[#0a1f0a] px-1.5 py-1 font-vt text-[22px] leading-none text-acc-lime"
              >{{ digit }}</span
            >
          </div>
          <p class="mt-2 font-ui text-[11px] italic text-win-mid">
            (it only counts you. the counter is shy.)
          </p>
        </div>

        <div class="flex flex-col gap-2">
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
            <p class="bg-black px-2 py-1 text-center font-pixel text-[8px] leading-relaxed text-acc-yellow">
              ⚠ UNDER CONSTRUCTION ⚠
            </p>
          </div>
          <p class="font-ui text-[11px] text-black">
            best viewed at 800×600 · made with nuxt · hand-coded, hand-broken, hand-fixed
          </p>
        </div>
      </div>

      <!-- tip + easter egg button -->
      <div class="dotted-sep" />
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="flex min-w-0 flex-1 items-start gap-2">
          <PixelIcon name="info" class="mt-[2px] h-4 w-4 shrink-0" />
          <p class="font-ui text-[12px] leading-relaxed text-black">
            <b>Tip of the day:</b>
            <span :key="tipIdx" class="animate-tip-in inline">{{ tips[tipIdx] }}</span>
          </p>
        </div>
        <button
          type="button"
          class="win98-btn shrink-0 self-start font-ui text-[12px] italic"
          data-tip="seriously. don't."
          @click="dontClick"
        >
          don't click this
        </button>
      </div>
    </div>
  </div>
</template>
