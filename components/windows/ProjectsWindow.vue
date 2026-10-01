<script setup lang="ts">
import { computed } from 'vue'
import reposData from '~/data/github-repos.json'
import { languageMeta, languageFallback } from '~/data/site'
import { useWindowManager } from '~/composables/useWindowManager'

interface Repo {
  title: string
  desc?: string
  tags?: string[]
  url: string
  topics?: string[]
  readme?: string
}

const repos = reposData as Repo[]

const metaFor = (lang: string) => languageMeta[lang] ?? languageFallback

const realDescription = (repo: Repo) => {
  const desc = repo.desc?.trim()
  if (desc && desc !== 'No description.') return { text: desc, fromReadme: false }
  if (repo.readme?.trim()) return { text: repo.readme.trim(), fromReadme: true }
  return { text: null, fromReadme: false }
}

const groups = computed(() => {
  const map = new Map<string, Repo[]>()
  for (const repo of repos) {
    const lang = repo.tags?.[0] || 'UNKNOWN'
    const list = map.get(lang) ?? []
    list.push(repo)
    map.set(lang, list)
  }
  return [...map.entries()]
    .map(([lang, items]) => ({ lang, items, meta: metaFor(lang) }))
    .sort((a, b) => {
      // repos without a detected language always sink to the bottom
      const aUnknown = a.lang === 'UNKNOWN'
      const bUnknown = b.lang === 'UNKNOWN'
      if (aUnknown !== bUnknown) return aUnknown ? 1 : -1
      // most used language first; ties keep the display order
      if (b.items.length !== a.items.length) return b.items.length - a.items.length
      return a.meta.order - b.meta.order
    })
})

const total = repos.length
const { open } = useWindowManager()
</script>

<template>
  <div class="bg-win-gray p-4">
    <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <p class="font-vt text-[17px] leading-none text-black">
        C:\HAMZA\PROJECTS\ — {{ total }} item{{ total === 1 ? '' : 's' }}, sorted by most
        used language
      </p>
      <div class="flex gap-2">
        <button type="button" class="win98-btn text-[12px]" @click="open('activity')">
          view activity
        </button>
        <a
          href="https://github.com/hamajj?tab=repositories"
          target="_blank"
          rel="noopener"
          class="win98-btn text-[12px] no-underline"
          >all repos ↗</a
        >
      </div>
    </div>

    <section v-for="group in groups" :key="group.lang" class="mb-5 last:mb-0">
      <header class="mb-2 flex items-center gap-2">
        <h3 class="font-pixel text-[10px] text-black">{{ group.meta.label }}</h3>
        <span class="h-[3px] flex-1" :class="group.meta.strip" />
        <span class="font-vt text-[15px] leading-none text-win-mid"
          >({{ group.items.length }})</span
        >
      </header>

      <div class="grid gap-3 md:grid-cols-2">
        <article
          v-for="repo in group.items"
          :key="repo.title"
          class="bevel-out flex flex-col bg-win-gray transition-transform hover:-translate-y-[2px]"
        >
          <div
            class="flex items-center gap-2 border-b-2 border-black px-2 py-1"
            :class="group.meta.strip"
          >
            <PixelIcon name="floppy" class="h-3.5 w-3.5" />
            <h4 class="min-w-0 flex-1 truncate font-ui text-[12px] font-bold text-black">
              {{ repo.title }}
            </h4>
          </div>

          <div class="flex flex-1 flex-col gap-2 p-2.5">
            <p v-if="realDescription(repo).text" class="font-ui text-[12px] leading-relaxed text-black">
              {{ realDescription(repo).text }}
              <span
                v-if="realDescription(repo).fromReadme"
                class="mt-1 block text-[11px] italic text-win-mid"
                >excerpt from the README</span
              >
            </p>
            <p v-else class="font-ui text-[12px] italic leading-relaxed text-win-mid">
              (no description on github — it is a mystery, like all good code)
            </p>

            <div v-if="repo.topics?.length" class="flex flex-wrap gap-1">
              <span
                v-for="topic in repo.topics.slice(0, 5)"
                :key="topic"
                class="border border-win-mid bg-white px-1.5 py-[1px] font-vt text-[13px] leading-tight text-title-blue"
                >{{ topic }}</span
              >
            </div>

            <div class="mt-auto flex items-center justify-between gap-2 pt-1">
              <span
                class="px-1.5 py-[2px] font-pixel text-[8px] leading-none"
                :class="group.meta.chip"
                >{{ group.meta.label }}</span
              >
              <a
                :href="repo.url"
                target="_blank"
                rel="noopener"
                class="font-ui text-[12px] font-bold text-title-blue underline-offset-2 hover:underline"
                >open ↗</a
              >
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
