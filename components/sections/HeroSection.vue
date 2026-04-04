<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TerminalLine {
  prompt: string
  typedPrompt: string
  response: string
  visible: boolean
  html?: boolean
  promptDone?: boolean
  responseDone?: boolean
}

const lines = ref<TerminalLine[]>([])
const showActions = ref(false)
const showBadges = ref(false)
const booting = ref(true)

const skills = [
  { name: 'Vue.js', icon: 'devicon-vuejs-plain' },
  { name: 'Nuxt', icon: 'devicon-nuxtjs-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'C++', icon: 'devicon-cplusplus-plain' },
  { name: 'C', icon: 'devicon-c-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Bash', icon: 'devicon-bash-plain' },
]

const skillsHtml = skills
  .map(s => `<i class="${s.icon}" style="font-size:1em"></i> ${s.name}`)
  .join(' | ')

const bootSequence = [
  { prompt: '$ whoami', response: 'hamajj — Hobbyist Web & Systems-Level Developer' },
  { prompt: '$ cat mission.txt', response: 'Design efficient structures from browser to bare metal' },
  { prompt: '$ skills --list', response: skills.map(s => s.name).join(' | ') },
]

const typeText = (text: string, setter: (val: string) => void, speed: number): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0
    let current = ''
    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i]
        setter(current)
        i++
      } else {
        clearInterval(interval)
        resolve()
      }
    }, speed)
  })
}

onMounted(async () => {
  for (let idx = 0; idx < bootSequence.length; idx++) {
    const item = bootSequence[idx]
    lines.value.push({
      prompt: item.prompt,
      typedPrompt: '',
      response: '',
      visible: true,
      html: false,
      promptDone: false,
      responseDone: false,
    })

    const lineIdx = lines.value.length - 1

    // Type the prompt (15ms per char)
    await typeText(item.prompt, (v) => { lines.value[lineIdx].typedPrompt = v }, 15)
    lines.value[lineIdx].promptDone = true

    // Small pause before response appears
    await new Promise(r => setTimeout(r, 100))

    // Type the response (12ms per char)
    await typeText(item.response, (v) => { lines.value[lineIdx].response = v }, 12)
    lines.value[lineIdx].responseDone = true

    // Swap in devicon HTML for skills line
    if (idx === 2) {
      lines.value[lineIdx].response = skillsHtml
      lines.value[lineIdx].html = true
    }

    // Brief pause between commands
    await new Promise(r => setTimeout(r, 150))
  }

  booting.value = false
  showActions.value = true
  await new Promise(r => setTimeout(r, 200))
  showBadges.value = true
})

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center pt-14">
    <div class="container mx-auto px-4 py-20 max-w-3xl">
      <!-- Terminal Window -->
      <div class="border border-border bg-background/60 backdrop-blur-sm">
        <!-- Title Bar -->
        <div class="flex items-center gap-2 px-4 py-2 border-b border-border">
          <div class="w-3 h-3 rounded-full bg-ultra-red/80" />
          <div class="w-3 h-3 rounded-full bg-terminal-amber/80" />
          <div class="w-3 h-3 rounded-full bg-terminal-green/80" />
          <span class="ml-2 text-xs text-muted-foreground font-mono">hamajj@portfolio ~ </span>
        </div>

        <!-- Terminal Content -->
        <div class="p-6 space-y-4 font-mono text-sm">
          <div v-for="(line, index) in lines" :key="index" class="space-y-1">
            <!-- Prompt with typing -->
            <div class="text-terminal-green">
              {{ line.typedPrompt }}<span v-if="!line.promptDone" class="terminal-cursor" />
            </div>
            <!-- Response -->
            <template v-if="line.promptDone">
              <div v-if="line.html && line.responseDone" class="text-foreground/90 pl-2" v-html="line.response" />
              <div v-else-if="line.response" class="text-foreground/90 pl-2">
                {{ line.response }}<span v-if="!line.responseDone" class="terminal-cursor" />
              </div>
            </template>
          </div>

          <!-- Initial cursor before anything types -->
          <div v-if="lines.length === 0" class="text-terminal-green">
            <span class="terminal-cursor" />
          </div>

          <!-- Blinking cursor at the end when done -->
          <div v-if="!booting && lines.length > 0" class="text-terminal-green">
            $ <span class="terminal-cursor" />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <Transition name="slide-up">
        <div v-if="showActions" class="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            class="px-6 py-2 border border-terminal-cyan text-terminal-cyan font-mono text-sm hover:bg-terminal-cyan/10 transition-colors"
            @click="scrollToSection('about')"
          >
            EXPLORE MORE
          </button>
          <a
            href="https://github.com/hamajj"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-2 border border-border text-muted-foreground font-mono text-sm hover:border-terminal-cyan hover:text-terminal-cyan transition-colors"
          >
            GITHUB
          </a>
          <button
            class="px-6 py-2 border border-border text-muted-foreground font-mono text-sm hover:border-terminal-cyan hover:text-terminal-cyan transition-colors"
            @click="scrollToSection('contact')"
          >
            CONTACT
          </button>
        </div>
      </Transition>

      <!-- Status Badges -->
      <Transition name="slide-up">
        <div v-if="showBadges" class="mt-6 flex flex-wrap gap-3 justify-center">
          <span class="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono border border-terminal-green/50 text-terminal-green bg-terminal-green/5">
            <span class="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
            Available for Projects
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono border border-terminal-cyan/50 text-terminal-cyan bg-terminal-cyan/5">
            Open Source Contributor
          </span>
        </div>
      </Transition>

      <!-- Scroll Indicator -->
      <div v-if="showActions" class="mt-16 flex justify-center animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-up-enter-active {
  transition: all 0.5s ease-out;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
