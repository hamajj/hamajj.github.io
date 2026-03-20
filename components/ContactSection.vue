<template>
  <section id="contact" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-2xl w-full border-2 border-white bg-black/90 p-8 relative overflow-hidden">

      <!-- Decorative corner brackets -->
      <div class="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
      <div class="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
      <div class="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
      <div class="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>

      <!-- Header -->
      <div class="border-b-2 border-white pb-4 mb-8 flex justify-between items-end">
        <h2 class="text-4xl font-black italic text-white">
          <span class="text-blue-400">03 //</span> TRANSMISSION
        </h2>
        <div class="flex items-center gap-2 text-xs font-mono text-green-400">
          <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
          STATUS: ONLINE
        </div>
      </div>

      <!-- Terminal window -->
      <div class="font-mono text-sm bg-black border border-gray-800 p-4 mb-6">
        <!-- Typewriter lines -->
        <div v-for="(line, i) in displayedLines" :key="i" class="mb-1">
          <span class="text-green-500 mr-2">&gt;</span>
          <span :class="line.color || 'text-gray-300'">{{ line.text }}</span>
          <!-- Blinking cursor on last line while typing -->
          <span v-if="i === displayedLines.length - 1 && typing" class="blink-cursor text-white">_</span>
        </div>
        <!-- Idle cursor after done -->
        <div v-if="!typing && allDone" class="mt-2">
          <span class="text-green-500 mr-2">&gt;</span>
          <span class="blink-cursor text-gray-600">_</span>
        </div>
      </div>

      <!-- Links (revealed after typing completes) -->
      <Transition name="links-reveal">
        <div v-if="allDone" class="grid gap-4">
          <a
            href="mailto:mehmethamzaakca@tutamail.com"
            class="group flex items-center justify-between border border-gray-700 p-4 hover:border-blue-400 hover:bg-blue-900/20 transition-all duration-200 cursor-pointer relative overflow-hidden"
          >
            <span class="absolute left-0 top-0 h-full w-0.5 bg-blue-400 group-hover:opacity-100 opacity-0 transition-opacity"></span>
            <span class="font-bold text-white group-hover:text-blue-400 font-mono tracking-widest transition-colors">
              <span class="text-blue-400/50 mr-1">&gt;&gt;</span> EMAIL_UPLINK
            </span>
            <span class="text-xs text-gray-500 group-hover:text-blue-300 transition-colors">[SEND]</span>
          </a>

          <a
            href="https://github.com/hamajj"
            target="_blank"
            class="group flex items-center justify-between border border-gray-700 p-4 hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-200 cursor-pointer relative overflow-hidden"
          >
            <span class="absolute left-0 top-0 h-full w-0.5 bg-purple-400 group-hover:opacity-100 opacity-0 transition-opacity"></span>
            <span class="font-bold text-white group-hover:text-purple-400 font-mono tracking-widest transition-colors">
              <span class="text-purple-400/50 mr-1">&gt;&gt;</span> GITHUB
            </span>
            <span class="text-xs text-gray-500 group-hover:text-purple-300 transition-colors">[ACCESS]</span>
          </a>
        </div>
      </Transition>

      <!-- Footer metadata -->
      <div class="mt-8 pt-4 border-t border-gray-800 flex justify-between text-xs text-gray-600 font-mono">
        <span>ID: V1-PORTFOLIO-7734</span>
        <span>ENCRYPTION: <span class="text-red-600/70">NONE</span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const displayedLines = ref([])
const typing = ref(false)
const allDone = ref(false)

const terminalScript = [
  { text: 'INITIALIZING TRANSMISSION UPLINK...', color: 'text-yellow-400', delay: 400 },
  { text: 'ROUTING THROUGH ENCRYPTED CHANNEL...', color: 'text-yellow-400', delay: 600 },
  { text: 'TARGET ACQUIRED: DEVELOPER NODE', color: 'text-green-400', delay: 500 },
  { text: 'ESTABLISH CONNECTION WITH DEVELOPER?', color: 'text-white', delay: 800 },
  { text: 'AWAITING INPUT...', color: 'text-gray-500', delay: 300 },
]

const typewriterLine = (line, charDelay = 28) => {
  return new Promise(resolve => {
    const lineRef = { text: '', color: line.color }
    displayedLines.value.push(lineRef)
    let i = 0
    const interval = setInterval(() => {
      lineRef.text += line.text[i]
      // Force reactivity
      displayedLines.value = [...displayedLines.value]
      i++
      if (i >= line.text.length) {
        clearInterval(interval)
        resolve()
      }
    }, charDelay)
  })
}

onMounted(async () => {
  // Small initial delay
  await new Promise(r => setTimeout(r, 600))

  for (const line of terminalScript) {
    typing.value = true
    await new Promise(r => setTimeout(r, line.delay))
    await typewriterLine(line)
    typing.value = false
    await new Promise(r => setTimeout(r, 120))
  }

  allDone.value = true
})
</script>

<style scoped>
.blink-cursor {
  animation: blink 0.7s step-start infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

.links-reveal-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.links-reveal-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
</style>
