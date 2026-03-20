<template>
  <div class="crt min-h-screen relative overflow-hidden">

    <!-- Blood vignette overlay (shows when HP is low) -->
    <Transition name="vignette-fade">
      <div
        v-if="hp < 30"
        class="fixed inset-0 z-[9990] pointer-events-none blood-vignette"
        :style="{ opacity: (30 - hp) / 30 * 0.7 }"
      ></div>
    </Transition>

    <!-- HUD Top Bar -->
    <header class="fixed top-0 left-0 w-full z-50 p-3 pointer-events-none">
      <div class="flex justify-between items-start gap-4">

        <!-- Health / Armor status -->
        <div class="flex flex-col gap-1 pointer-events-auto">
          <!-- HP -->
          <div class="flex items-center gap-2 bg-black/90 px-3 py-1.5 border-2 border-white relative overflow-hidden"
               :class="{ 'border-red-600': hp < 30, 'animate-pulse': hp < 20 }">
            <div
              class="text-3xl font-black leading-none transition-colors duration-300"
              :class="hp < 30 ? 'text-red-500' : 'text-red-600'"
            >{{ Math.ceil(hp) }}</div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[10px] text-white tracking-widest">HP</span>
              <!-- Bar: red portion + yellow overheal -->
              <div class="flex w-32 h-2 bg-red-900/40 overflow-hidden">
                <div
                  class="h-full bg-red-600 transition-all duration-300"
                  :style="{ width: `${Math.min(100, hp)}%`, boxShadow: hp < 30 ? '0 0 6px #ff0000' : 'none' }"
                ></div>
                <!-- Yellow overheal segment (if hp > 100) -->
                <div
                  v-if="hp > 100"
                  class="h-full bg-yellow-400 transition-all duration-300"
                  :style="{ width: `${Math.min(32, (hp - 100) * 0.32)}px` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- ARMOR -->
          <div class="flex items-center gap-2 bg-black/90 px-3 py-1.5 border-2 border-blue-400/60">
            <div class="text-3xl font-black text-blue-400 leading-none">{{ Math.ceil(armor) }}</div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[10px] text-white tracking-widest">ARMOR</span>
              <div class="w-32 h-2 bg-blue-900/40 overflow-hidden">
                <div
                  class="h-full bg-blue-400 transition-all duration-300"
                  :style="{ width: `${armor}%`, boxShadow: '0 0 4px #00ffff' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="pointer-events-auto">
          <ul class="flex gap-1">
            <li v-for="(link, i) in navLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                class="block bg-black/90 border px-4 py-2 transition-all duration-150 relative group font-mono text-sm tracking-widest uppercase"
                :class="activeSection === link.id
                  ? 'border-red-600 text-red-500 bg-red-900/20'
                  : 'border-white/40 text-white/80 hover:border-white hover:text-white'"
              >
                <!-- Active indicator bar -->
                <span
                  v-if="activeSection === link.id"
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                ></span>
                <span class="text-[10px] opacity-50 mr-1">0{{ i + 1 }}</span>{{ link.label }}
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
    <div class="fixed bottom-8 right-8 z-50 pointer-events-none">
      <StyleMeter />
    </div>

    <!-- Background Grid -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-20">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── Navigation ────────────────────────────────────────────────
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
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  navLinks.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) sectionObserver.observe(el)
  })
}

// ── HP / ARMOR dynamics ───────────────────────────────────────
const hp    = ref(100)
const armor = ref(100)

let hpRegenInterval = null
let armorRegenInterval = null
let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY

      // Drain armor on scroll, HP when armor empty
      if (delta > 2) {
        const drain = Math.min(delta * 0.04, 0.8)
        if (armor.value > 0) {
          armor.value = Math.max(0, armor.value - drain)
        } else {
          hp.value = Math.max(1, hp.value - drain * 0.5)
        }
      }
      ticking = false
    })
    ticking = true
  }
}

const handleMouseOver = (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    // Hovering interactive elements gives a tiny HP regen (blood is fuel)
    hp.value = Math.min(125, hp.value + 1.5)
  }
}

onMounted(() => {
  setupObserver()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('mouseover', handleMouseOver)

  // Slow HP regen
  hpRegenInterval = setInterval(() => {
    if (hp.value < 100) hp.value = Math.min(100, hp.value + 0.2)
  }, 200)

  // Armor regens faster than HP
  armorRegenInterval = setInterval(() => {
    if (armor.value < 100) armor.value = Math.min(100, armor.value + 0.5)
  }, 200)
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
  background: radial-gradient(ellipse at center, transparent 40%, rgba(180, 0, 0, 0.85) 100%);
  animation: blood-pulse 1.5s ease-in-out infinite;
}

@keyframes blood-pulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1;   }
}

.vignette-fade-enter-active { transition: opacity 0.5s ease; }
.vignette-fade-leave-active { transition: opacity 0.5s ease; }
.vignette-fade-enter-from   { opacity: 0; }
.vignette-fade-leave-to     { opacity: 0; }
</style>
