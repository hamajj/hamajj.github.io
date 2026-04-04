<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TrackData {
  isPlaying: boolean
  title?: string
  artist?: string
  albumArt?: string
  albumName?: string
}

const track = ref<TrackData | null>(null)
const loading = ref(true)
const error = ref(false)
const expanded = ref(false)

let refreshInterval: ReturnType<typeof setInterval>

const fetchNowPlaying = async () => {
  try {
    const data = await $fetch<TrackData>('/api/spotify/now-playing')
    track.value = data
    error.value = false
  } catch {
    error.value = true
    track.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNowPlaying()
  refreshInterval = setInterval(fetchNowPlaying, 30000)
})

onUnmounted(() => {
  clearInterval(refreshInterval)
})
</script>

<template>
  <div
    v-if="!error && !loading"
    class="fixed bottom-4 right-4 z-40"
  >
    <!-- Collapsed: Small indicator -->
    <button
      v-if="!expanded"
      class="flex items-center gap-2 px-3 py-2 bg-background/90 backdrop-blur-sm border border-border hover:border-terminal-cyan/50 transition-colors text-xs font-mono"
      @click="expanded = true"
    >
      <span v-if="track?.isPlaying" class="flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
        <span class="text-muted-foreground">NOW PLAYING</span>
      </span>
      <span v-else class="flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        <span class="text-muted-foreground">PAUSED</span>
      </span>
    </button>

    <!-- Expanded: Full widget -->
    <Transition name="slide-up">
      <div
        v-if="expanded && track"
        class="bg-background/90 backdrop-blur-sm border border-border p-4 max-w-[280px]"
      >
        <button
          class="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          @click="expanded = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="flex items-center gap-3">
          <img
            v-if="track.albumArt"
            :src="track.albumArt"
            :alt="track.albumName"
            class="w-12 h-12 border border-border"
          />
          <div class="w-12 h-12 bg-muted border border-border flex items-center justify-center" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>

          <div class="min-w-0 flex-1">
            <p class="text-sm font-mono text-foreground truncate">{{ track.title || 'Unknown' }}</p>
            <p class="text-xs text-muted-foreground font-mono truncate">{{ track.artist || 'Unknown' }}</p>
            <div class="flex items-center gap-1 mt-1">
              <span
                :class="[
                  'w-1.5 h-1.5 rounded-full',
                  track.isPlaying ? 'bg-terminal-green animate-pulse' : 'bg-muted-foreground'
                ]"
              />
              <span class="text-[10px] text-muted-foreground font-mono">
                {{ track.isPlaying ? 'PLAYING' : 'PAUSED' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
