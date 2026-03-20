<template>
  <section id="contact" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div
      class="max-w-2xl w-full relative"
      style="background:#000; border: 2px solid rgba(255,255,255,0.18); clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));"
    >
      <!-- Inner border -->
      <div class="absolute inset-[5px] pointer-events-none" style="border: 1px solid rgba(255,0,0,0.15); clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));"></div>

      <!-- Red corners -->
      <div class="absolute top-0 left-0 w-7 h-7" style="border-top:3px solid #ff0000; border-left:3px solid #ff0000;"></div>
      <div class="absolute top-0 right-0 w-7 h-7" style="border-top:3px solid #ff0000; border-right:3px solid #ff0000;"></div>
      <div class="absolute bottom-0 left-0 w-7 h-7" style="border-bottom:3px solid #ff0000; border-left:3px solid #ff0000;"></div>
      <div class="absolute bottom-0 right-0 w-7 h-7" style="border-bottom:3px solid #ff0000; border-right:3px solid #ff0000;"></div>

      <div class="p-8 relative z-10">
        <!-- Header -->
        <div class="flex justify-between items-end mb-8" style="border-bottom: 2px solid rgba(255,0,0,0.4); padding-bottom:1rem;">
          <h2 class="section-title glitch-hover" style="line-height:1;">
            <span class="section-number" style="font-size:0.55em; font-family:'VCR OSD Mono',monospace;">03 //&nbsp;</span>TRANSMISSION
          </h2>
          <div class="flex items-center gap-2" style="font-family:'VCR OSD Mono',monospace; font-size:10px; color:#00ff44; letter-spacing:0.2em;">
            <span style="width:7px;height:7px;background:#00ff44;border-radius:0; display:inline-block; animation: blink-status 1.5s step-start infinite;"></span>
            STATUS: ONLINE
          </div>
        </div>

        <!-- Terminal window -->
        <div
          style="background:#000; border: 1px solid rgba(255,255,255,0.1); padding: 1rem 1.2rem; margin-bottom: 1.5rem; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);"
        >
          <!-- Terminal title bar -->
          <div class="flex items-center justify-between mb-3" style="border-bottom:1px solid rgba(255,0,0,0.2); padding-bottom:6px;">
            <span style="font-family:'VCR OSD Mono',monospace; font-size:9px; letter-spacing:0.2em; color:rgba(255,0,0,0.6);">ROOT@V1-PORTFOLIO:~$</span>
            <div class="flex gap-1">
              <div style="width:6px;height:6px;background:#ff2222;"></div>
              <div style="width:6px;height:6px;background:#ff8800;"></div>
              <div style="width:6px;height:6px;background:#00ff44;"></div>
            </div>
          </div>

          <div v-for="(line, i) in displayedLines" :key="i" style="margin-bottom:4px; font-family:'VCR OSD Mono',monospace; font-size:12px;">
            <span style="color:#22ff44; margin-right:8px;">&gt;</span>
            <span :class="line.color || 'text-gray-300'" :style="line.style || {}">{{ line.text }}</span>
            <span v-if="i === displayedLines.length - 1 && typing" class="blink-cursor" style="color:#fff;">_</span>
          </div>
          <div v-if="!typing && allDone" style="margin-top:8px; font-family:'VCR OSD Mono',monospace; font-size:12px;">
            <span style="color:#22ff44; margin-right:8px;">&gt;</span>
            <span class="blink-cursor" style="color:rgba(255,255,255,0.3);">_</span>
          </div>
        </div>

        <!-- Links -->
        <Transition name="links-reveal">
          <div v-if="allDone" class="flex flex-col gap-3">
            <a
              href="mailto:mehmethamzaakca@tutamail.com"
              class="group relative flex items-center justify-between transition-all duration-100"
              style="border: 1px solid rgba(255,255,255,0.15); padding: 1rem 1.2rem; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); background: #000;"
              @mouseenter="e => e.currentTarget.style.cssText += 'border-color:#ff0000; background:rgba(120,0,0,0.15); box-shadow:0 0 12px rgba(255,0,0,0.25);'"
              @mouseleave="e => e.currentTarget.style.cssText = 'border: 1px solid rgba(255,255,255,0.15); padding: 1rem 1.2rem; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); background: #000;'"
            >
              <span class="font-display" style="font-size:1.05rem; letter-spacing:0.15em; color:#fff;">
                <span style="color:rgba(255,0,0,0.5); margin-right:6px;">&gt;&gt;</span>EMAIL_UPLINK
              </span>
              <span style="font-family:'VCR OSD Mono',monospace; font-size:10px; color:rgba(255,255,255,0.35); letter-spacing:0.15em;">[SEND]</span>
            </a>

            <a
              href="https://github.com/hamajj"
              target="_blank"
              class="group relative flex items-center justify-between transition-all duration-100"
              style="border: 1px solid rgba(255,255,255,0.15); padding: 1rem 1.2rem; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); background: #000;"
              @mouseenter="e => e.currentTarget.style.cssText += 'border-color:#ff0000; background:rgba(120,0,0,0.15); box-shadow:0 0 12px rgba(255,0,0,0.25);'"
              @mouseleave="e => e.currentTarget.style.cssText = 'border: 1px solid rgba(255,255,255,0.15); padding: 1rem 1.2rem; clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px)); background: #000;'"
            >
              <span class="font-display" style="font-size:1.05rem; letter-spacing:0.15em; color:#fff;">
                <span style="color:rgba(255,0,0,0.5); margin-right:6px;">&gt;&gt;</span>GITHUB
              </span>
              <span style="font-family:'VCR OSD Mono',monospace; font-size:10px; color:rgba(255,255,255,0.35); letter-spacing:0.15em;">[ACCESS]</span>
            </a>
          </div>
        </Transition>

        <!-- Footer metadata -->
        <div class="flex justify-between" style="margin-top:1.5rem; padding-top:1rem; border-top: 1px solid rgba(255,255,255,0.08); font-family:'VCR OSD Mono',monospace; font-size:9px; color:rgba(255,255,255,0.2); letter-spacing:0.15em;">
          <span>ID: V1-PORTFOLIO-7734</span>
          <span>ENCRYPTION: <span style="color:rgba(200,0,0,0.5);">NONE</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const displayedLines = ref([])
const typing  = ref(false)
const allDone = ref(false)

const terminalScript = [
  { text: 'INITIALIZING TRANSMISSION UPLINK...', style: { color: '#ffdd00' }, delay: 400 },
  { text: 'ROUTING THROUGH ENCRYPTED CHANNEL...', style: { color: '#ffdd00' }, delay: 600 },
  { text: 'TARGET ACQUIRED: DEVELOPER NODE', style: { color: '#22ff44' }, delay: 500 },
  { text: 'ESTABLISH CONNECTION WITH DEVELOPER?', style: { color: '#fff' }, delay: 800 },
  { text: 'AWAITING INPUT...', style: { color: 'rgba(255,255,255,0.35)' }, delay: 300 },
]

const typewriterLine = (line, charDelay = 26) => {
  return new Promise(resolve => {
    const lineRef = { text: '', style: line.style }
    displayedLines.value.push(lineRef)
    let i = 0
    const interval = setInterval(() => {
      lineRef.text += line.text[i]
      displayedLines.value = [...displayedLines.value]
      i++
      if (i >= line.text.length) { clearInterval(interval); resolve() }
    }, charDelay)
  })
}

onMounted(async () => {
  await new Promise(r => setTimeout(r, 600))
  for (const line of terminalScript) {
    typing.value = true
    await new Promise(r => setTimeout(r, line.delay))
    await typewriterLine(line)
    typing.value = false
    await new Promise(r => setTimeout(r, 100))
  }
  allDone.value = true
})
</script>

<style scoped>
@keyframes blink-status {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.links-reveal-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.links-reveal-enter-from   { opacity: 0; transform: translateY(10px); }
</style>
