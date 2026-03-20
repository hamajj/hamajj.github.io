<template>
  <div class="fixed top-20 right-4 z-40 flex flex-col items-end gap-1 pointer-events-none" style="max-width: 280px;">
    <TransitionGroup name="killfeed">
      <div
        v-for="entry in feed"
        :key="entry.id"
        class="bg-black/85 border px-3 py-1 font-mono text-xs tracking-widest whitespace-nowrap killfeed-entry"
        :style="{ borderColor: entry.color, color: entry.color, boxShadow: `0 0 8px ${entry.color}40` }"
      >
        <span class="opacity-60 mr-1">{{ entry.prefix }}</span>{{ entry.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const feed = ref([])
let idCounter = 0

const COLORS = {
  scroll:      '#888888',
  interaction: '#4488ff',
  rankup:      '#ff8800',
  easter:      '#ffd700',
  milestone:   '#ff2222',
}

const push = (text, prefix, color, duration = 2500) => {
  const id = ++idCounter
  feed.value.unshift({ id, text, prefix, color })
  if (feed.value.length > 6) feed.value.splice(6)
  setTimeout(() => {
    const idx = feed.value.findIndex(e => e.id === id)
    if (idx !== -1) feed.value.splice(idx, 1)
  }, duration)
}

// Scroll accumulation throttle
let lastScroll = 0
let scrollAccum = 0
let scrollTimer = null

const handleScroll = () => {
  scrollAccum++
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    if (scrollAccum >= 3) {
      push(`+SCROLL ×${scrollAccum}`, '>>', COLORS.scroll)
    }
    scrollAccum = 0
  }, 300)
}

// Interaction hover
const handleMouseOver = (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    const label = e.target.textContent?.trim().toUpperCase().slice(0, 16) || 'ELEMENT'
    push(`+INTERACTION`, '>>', COLORS.interaction, 2000)
  }
}

// Listen for rank changes from StyleMeter (custom event)
const handleRankUp = (e) => {
  push(`RANK UP: ${e.detail}`, '!!', COLORS.rankup, 3000)
}

const handleMilestone = (e) => {
  push(e.detail, '**', COLORS.milestone, 3500)
}

const handleEaster = (e) => {
  push(e.detail, '##', COLORS.easter, 4000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mouseover', handleMouseOver)
  window.addEventListener('uk-rankup', handleRankUp)
  window.addEventListener('uk-milestone', handleMilestone)
  window.addEventListener('uk-easter', handleEaster)

  // Welcome entry
  setTimeout(() => push('SYSTEMS ONLINE', '>>', '#00ff88', 3000), 800)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mouseover', handleMouseOver)
  window.removeEventListener('uk-rankup', handleRankUp)
  window.removeEventListener('uk-milestone', handleMilestone)
  window.removeEventListener('uk-easter', handleEaster)
})
</script>

<style scoped>
.killfeed-enter-active {
  transition: all 0.2s ease-out;
}
.killfeed-leave-active {
  transition: all 0.4s ease-in;
}
.killfeed-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.killfeed-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.killfeed-move {
  transition: transform 0.3s ease;
}
</style>
