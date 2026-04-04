<script setup lang="ts">
import { computed } from 'vue'

const { data: repos, status } = useFetch('/api/repos')

const rankOverrides: Record<string, string> = {
  'TEDITOR': 'S',
  'PORTFOLIO': 'C',
  'SORTINGVISUALIZER': 'A',
  'HAMAJJ.GITHUB.IO': 'SS',
}

const hiddenTitles = ['UC.SILAHSORLER.AHH', 'TEMPORARY']

const rankColors: Record<string, string> = {
  'SS': 'text-red-400 border-red-400/50',
  'S': 'text-rose-400 border-rose-400/50',
  'A': 'text-terminal-amber border-terminal-amber/50',
  'B': 'text-fuchsia-400 border-fuchsia-400/50',
  'C': 'text-pink-400 border-pink-400/50',
  'D': 'text-gray-400 border-gray-400/50',
}

interface Repo {
  title: string
  desc: string
  rank: string
  tags: string[]
  url: string
}

const filteredRepos = computed(() => {
  if (!repos.value) return []
  return (repos.value as Repo[])
    .filter(repo => !hiddenTitles.includes(repo.title))
    .map(repo => ({
      ...repo,
      rank: rankOverrides[repo.title] || repo.rank,
    }))
})
</script>

<template>
  <section id="projects" class="relative z-10 py-20">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Terminal Header -->
      <div class="mb-10">
        <span class="text-terminal-green font-mono text-sm">$ </span>
        <span class="text-terminal-cyan font-mono text-sm">ls ~/projects/</span>
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="border border-border bg-card/50 p-6 space-y-3">
          <div class="h-4 w-20 bg-muted animate-pulse" />
          <div class="h-3 w-full bg-muted animate-pulse" />
          <div class="h-3 w-2/3 bg-muted animate-pulse" />
        </div>
      </div>

      <!-- Project Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="repo in filteredRepos"
          :key="repo.title"
          class="group border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-terminal-cyan/50 transition-all card-glow"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-sm font-vcr text-foreground tracking-wider">{{ repo.title }}</h3>
            <span
              :class="[
                'px-2 py-0.5 text-xs font-mono font-bold border',
                rankColors[repo.rank] || rankColors['D']
              ]"
            >
              {{ repo.rank }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-xs text-muted-foreground font-mono mb-4 line-clamp-2">{{ repo.desc }}</p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tag in repo.tags"
              :key="tag"
              class="px-1.5 py-0.5 text-[10px] font-mono border border-border text-muted-foreground"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Action -->
          <a
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-xs font-mono text-terminal-cyan hover:text-terminal-cyan/80 transition-colors"
          >
            EQUIP
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
