<template>
  <div class="crt noise-overlay min-h-screen relative overflow-hidden" style="background:#000;">

    <!-- Blood vignette overlay (shows when HP is low) -->
    <Transition name="vignette-fade">
      <div
        v-if="hp < 30"
        class="fixed inset-0 z-[9990] pointer-events-none blood-vignette"
        :style="{ opacity: (30 - hp) / 30 * 0.7 }"
      ></div>
    </Transition>

    <!-- HUD Top Bar -->
    <header class="fixed top-0 left-0 w-full z-50 pointer-events-none" style="padding: 6px 8px;">
      <div class="flex justify-between items-start gap-3">

        <!-- Health / Armor status -->
        <div class="flex flex-col gap-1 pointer-events-auto">
          <!-- HP -->
          <div
            class="flex items-center gap-2 px-3 py-1.5 relative"
            style="background:#000; border: 1px solid rgba(255,255,255,0.3); clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);"
            :style="hp < 30 ? { borderColor: 'rgba(255,0,0,0.7)', boxShadow: '0 0 10px rgba(255,0,0,0.4)' } : {}"
          >
            <!-- double-border inner accent -->
            <div class="absolute inset-[3px] border border-red-900/30 pointer-events-none" style="clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);"></div>

            <div
              class="font-display leading-none transition-colors duration-200 tabular-nums"
              style="font-size: 2rem; min-width: 3ch; text-align: right;"
              :style="{ color: hp < 30 ? '#ff2222' : '#ff0000', textShadow: `0 0 12px ${hp < 30 ? '#ff0000' : '#cc000060'}` }"
            >{{ Math.ceil(hp) }}</div>

            <div class="flex flex-col gap-0.5">
              <span style="font-size:9px; letter-spacing:0.3em; color:#fff; font-family:'VCR OSD Mono',monospace;">HP</span>
              <!-- Segmented HP bar -->
              <div class="flex gap-px" style="width:120px; height:8px;">
                <div
                  v-for="i in 20" :key="i"
                  style="flex:1; border: 1px solid rgba(255,255,255,0.1); transition: background 0.2s, box-shadow 0.2s;"
                  :style="i <= Math.ceil(hp / 5)
                    ? { background: hp < 30 ? '#ff2222' : '#cc0000', boxShadow: `0 0 3px ${hp < 30 ? '#ff2222' : '#cc0000'}` }
                    : { background: 'rgba(80,0,0,0.3)' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- ARMOR -->
          <div
            class="flex items-center gap-2 px-3 py-1.5 relative"
            style="background:#000; border: 1px solid rgba(0,200,255,0.25); clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);"
          >
            <div class="absolute inset-[3px] border pointer-events-none" style="border-color:rgba(0,255,255,0.08); clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);"></div>

            <div class="font-display leading-none tabular-nums" style="font-size:2rem; min-width:3ch; text-align:right; color:#00ccff; text-shadow: 0 0 10px #00ccff60;">{{ Math.ceil(armor) }}</div>
            <div class="flex flex-col gap-0.5">
              <span style="font-size:9px; letter-spacing:0.3em; color:#fff; font-family:'VCR OSD Mono',monospace;">ARMOR</span>
              <div class="flex gap-px" style="width:120px; height:8px;">
                <div
                  v-for="i in 20" :key="i"
                  style="flex:1; border: 1px solid rgba(255,255,255,0.06); transition: background 0.2s;"
                  :style="i <= Math.ceil(armor / 5)
                    ? { background: '#00aacc', boxShadow: '0 0 3px #00ccff' }
                    : { background: 'rgba(0,30,40,0.4)' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="pointer-events-auto">
          <ul class="flex gap-0">
            <li v-for="(link, i) in navLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="block px-5 py-2 relative font-display transition-all duration-100"
                style="font-size:1rem; letter-spacing:0.12em; text-transform:uppercase; background:#000;"
                :style="activeSection === link.id
                  ? { color: '#fff', borderBottom: '2px solid #ff0000', borderTop: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 0 12px rgba(255,0,0,0.3)', background: 'rgba(120,0,0,0.15)' }
                  : { color: 'rgba(255,255,255,0.55)', borderBottom: '2px solid transparent', borderTop: '1px solid rgba(255,255,255,0.08)' }"
              >
                <span style="font-size:9px; font-family:'VCR OSD Mono',monospace; opacity:0.4; margin-right:4px;">0{{ i + 1 }}</span>{{ link.label }}
                <!-- Active bottom bar -->
                <span
                  v-if="activeSection === link.id"
                  class="absolute bottom-0 left-0 w-full"
                  style="height:2px; background:#ff0000; box-shadow: 0 0 6px #ff0000;"
                ></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Kill Feed (top-right, below nav) -->
    <KillFeed />

    <!-- Section Flash -->
    <SectionFlash />

    <!-- Main Content -->
    <main class="relative z-10 pt-28 pb-20">
      <slot />
    </main>

    <!-- Custom cursor -->
    <Cursor />

    <!-- Style Meter (bottom-right) -->
    <div class="fixed bottom-6 right-6 z-50 pointer-events-none">
      <StyleMeter />
    </div>

    <!-- Background Grid — fine red tinted grid -->
    <div class="fixed inset-0 z-0 pointer-events-none" style="opacity:0.07;">
      <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.4) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%);"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { id: 'about',    label: 'ABOUT'    },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact',  label: 'CONTACT'  },
]

const activeSection = ref('')
let sectionObserver = null

const setupObserver = () => {
  const options = { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) activeSection.value = entry.target.id })
  }, options)
  navLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  })
}

const hp    = ref(100)
const armor = ref(100)

let hpRegenInterval    = null
let armorRegenInterval = null
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const delta = Math.abs(window.scrollY - (handleScroll._lastY || 0))
      handleScroll._lastY = window.scrollY
      if (delta > 2) {
        const drain = Math.min(delta * 0.04, 0.8)
        if (armor.value > 0) armor.value = Math.max(0, armor.value - drain)
        else hp.value = Math.max(1, hp.value - drain * 0.5)
      }
      ticking = false
    })
    ticking = true
  }
}

const handleMouseOver = (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    hp.value = Math.min(125, hp.value + 1.5)
  }
}

onMounted(() => {
  setupObserver()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('mouseover', handleMouseOver)
  hpRegenInterval    = setInterval(() => { if (hp.value    < 100) hp.value    = Math.min(100, hp.value    + 0.2) }, 200)
  armorRegenInterval = setInterval(() => { if (armor.value < 100) armor.value = Math.min(100, armor.value + 0.5) }, 200)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mouseover', handleMouseOver)
  sectionObserver?.disconnect()
  clearInterval(hpRegenInterval)
  clearInterval(armorRegenInterval)
})
</script>

<style scoped>
.blood-vignette {
  background: radial-gradient(ellipse at center, transparent 35%, rgba(160, 0, 0, 0.9) 100%);
  animation: blood-pulse 1.5s ease-in-out infinite;
}
@keyframes blood-pulse {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; }
}
.vignette-fade-enter-active { transition: opacity 0.5s ease; }
.vignette-fade-leave-active { transition: opacity 0.5s ease; }
.vignette-fade-enter-from   { opacity: 0; }
.vignette-fade-leave-to     { opacity: 0; }
</style>
