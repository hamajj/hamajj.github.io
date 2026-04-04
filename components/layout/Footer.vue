<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const uptime = ref('00:00:00')
let startTime: number
let uptimeInterval: ReturnType<typeof setInterval>

const formatUptime = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map(v => String(v).padStart(2, '0')).join(':')
}

onMounted(() => {
  startTime = Date.now()
  uptimeInterval = setInterval(() => {
    uptime.value = formatUptime(Date.now() - startTime)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(uptimeInterval)
})
</script>

<template>
  <footer class="relative z-10 border-t border-border py-8 mt-20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div class="flex items-center gap-2">
          <span class="text-terminal-green">UPTIME:</span>
          <span>{{ uptime }}</span>
        </div>

        <div>
          Made with <span class="text-ultra-red">&hearts;</span> using Nuxt + Tailwind
        </div>

        <div class="text-terminal-cyan/50">
          try typing a secret...
        </div>
      </div>
    </div>
  </footer>
</template>
