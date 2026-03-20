<template>
  <Transition name="screen-flash">
    <div
      v-if="flashing"
      class="fixed inset-0 z-[9995] pointer-events-none"
      :style="flashStyle"
    ></div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const flashing = ref(false)
const flashStyle = ref({})

let lastSection = -1
const sectionIds = ['about', 'projects', 'contact']

const triggerFlash = (color = '#ffffff', opacity = 0.15) => {
  flashStyle.value = { background: color, opacity }
  flashing.value = true
  setTimeout(() => { flashing.value = false }, 120)
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const vh = window.innerHeight

  sectionIds.forEach((id, i) => {
    const el = document.getElementById(id)
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Flash when a section enters the viewport from below
    if (rect.top > 0 && rect.top < vh * 0.3 && lastSection !== i) {
      lastSection = i
      triggerFlash('#ffffff', 0.12)
      window.dispatchEvent(new CustomEvent('uk-milestone', { detail: `ENTERING: ${id.toUpperCase()}` }))
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.screen-flash-enter-active { transition: opacity 0.05s ease-in; }
.screen-flash-leave-active { transition: opacity 0.1s ease-out; }
.screen-flash-enter-from   { opacity: 0 !important; }
.screen-flash-leave-to     { opacity: 0 !important; }
</style>
