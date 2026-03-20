<template>
  <div class="fixed top-20 right-3 z-40 flex flex-col items-end gap-1 pointer-events-none" style="max-width:260px;">
    <TransitionGroup name="killfeed">
      <div
        v-for="entry in feed"
        :key="entry.id"
        class="killfeed-entry relative"
        style="background:#000; padding: 3px 10px; font-family:'VCR OSD Mono',monospace; font-size:10px; letter-spacing:0.15em; white-space:nowrap;"
        :style="{
          border: `1px solid ${entry.color}`,
          color: entry.color,
          boxShadow: `0 0 8px ${entry.color}35`,
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)',
        }"
      >
        <span style="opacity:0.5; margin-right:4px;">{{ entry.prefix }}</span>{{ entry.text }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const feed = ref([])
let idCounter = 0

const COLORS = {
  scroll:      '#555555',
  interaction: '#ff4400',
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

let scrollAccum = 0
let scrollTimer = null

const handleScroll = () => {
  scrollAccum++
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    if (scrollAccum >= 3) push(`+SCROLL ×${scrollAccum}`, '>>', COLORS.scroll)
    scrollAccum = 0
  }, 300)
}

const handleMouseOver = (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    push('+INTERACTION', '>>', COLORS.interaction, 2000)
  }
}

onMounted(() => {
  window.addEventListener('scroll',    handleScroll)
  window.addEventListener('mouseover', handleMouseOver)
  window.addEventListener('uk-rankup',    (e) => push(`RANK UP: ${e.detail}`, '!!', COLORS.rankup,    3000))
  window.addEventListener('uk-milestone', (e) => push(e.detail,               '**', COLORS.milestone, 3500))
  window.addEventListener('uk-easter',    (e) => push(e.detail,               '##', COLORS.easter,    4000))
  setTimeout(() => push('SYSTEMS ONLINE', '>>', '#22ff44', 3000), 800)
})

onUnmounted(() => {
  window.removeEventListener('scroll',    handleScroll)
  window.removeEventListener('mouseover', handleMouseOver)
})
</script>

<style scoped>
.killfeed-enter-active { transition: all 0.15s ease-out; }
.killfeed-leave-active { transition: all 0.35s ease-in; }
.killfeed-enter-from   { opacity: 0; transform: translateX(30px); }
.killfeed-leave-to     { opacity: 0; transform: translateX(30px); }
.killfeed-move         { transition: transform 0.25s ease; }
</style>
