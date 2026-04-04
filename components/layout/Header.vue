<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  openCommandPalette: []
}>()

const scrolled = ref(false)
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

let timeInterval: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  clearInterval(timeInterval)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      scrolled
        ? 'bg-background/80 backdrop-blur-md border-border'
        : 'bg-transparent border-transparent'
    ]"
  >
    <div class="container mx-auto px-4 h-14 flex items-center justify-between">
      <!-- Left: Logo -->
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-terminal-cyan">
          <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
        </svg>
        <span class="font-vcr text-sm text-terminal-cyan tracking-wider">$hamajj</span>
      </div>

      <!-- Center: Clock -->
      <div class="hidden md:flex items-center gap-1 text-xs text-muted-foreground font-mono">
        <span class="text-terminal-cyan">[</span>
        <span>{{ currentTime }}</span>
        <span class="text-terminal-cyan">]</span>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-1 px-2 py-1 text-xs font-mono text-muted-foreground border border-border hover:border-terminal-cyan hover:text-terminal-cyan transition-colors"
          @click="emit('openCommandPalette')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
          <span>K</span>
        </button>

        <a
          href="https://github.com/hamajj"
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted-foreground hover:text-terminal-cyan transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>

        <a
          href="mailto:mehmethamzaakca@tutamail.com"
          class="text-muted-foreground hover:text-terminal-cyan transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>
  </header>
</template>
