<script setup lang="ts">
import { site } from '~/data/site'
import { useWindowManager } from '~/composables/useWindowManager'

const { open } = useWindowManager()

const links = [
  {
    icon: 'globe' as const,
    title: 'github.com/hamajj',
    note: 'the repos, the commits, the occasional abandoned idea',
    href: site.github,
  },
  {
    icon: 'mail' as const,
    title: site.email,
    note: 'email. it still works. it always will.',
    href: `mailto:${site.email}`,
  },
  {
    icon: 'floppy' as const,
    title: 'hamajj.github.io (source)',
    note: 'this very website, in all its hand-made glory',
    href: 'https://github.com/hamajj/hamajj.github.io',
  },
]

const internal = [
  { label: 'About Me', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Currently Working On', id: 'currently' },
  { label: 'Guestbook', id: 'guestbook' },
]
</script>

<template>
  <div class="bg-win-gray p-4">
    <p class="mb-3 font-vt text-[17px] leading-none text-black">places worth going:</p>

    <ul class="space-y-3">
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          rel="noopener"
          class="bevel-out flex items-center gap-3 bg-win-gray p-3 no-underline transition-transform hover:-translate-y-[2px]"
        >
          <PixelIcon :name="link.icon" class="h-7 w-7 shrink-0" />
          <span class="min-w-0">
            <span class="block truncate font-ui text-[13px] font-bold text-title-blue underline-offset-2 group-hover:underline">
              {{ link.title }}<template v-if="link.href.startsWith('http')"> ↗</template>
            </span>
            <span class="block font-ui text-[11px] leading-snug text-black">{{ link.note }}</span>
          </span>
        </a>
      </li>
    </ul>

    <div class="dotted-sep my-4" />

    <p class="mb-2 font-ui text-[12px] font-bold text-black">or wander around this site:</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in internal"
        :key="item.id"
        type="button"
        class="win98-btn text-[12px]"
        @click="open(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
