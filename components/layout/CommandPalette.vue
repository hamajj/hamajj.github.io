<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const emit = defineEmits<{
  navigate: [section: string]
  triggerEasterEgg: []
}>()

const isOpen = ref(false)
const searchQuery = ref('')

const commands = [
  { id: 'about', label: 'About', shortcut: '', icon: 'user', group: 'Navigation' },
  { id: 'projects', label: 'Projects', shortcut: '', icon: 'folder', group: 'Navigation' },
  { id: 'github-grid', label: 'GitHub Activity', shortcut: '', icon: 'git', group: 'Navigation' },
  { id: 'contact', label: 'Contact', shortcut: '', icon: 'mail', group: 'Navigation' },
  { id: 'github-external', label: 'Open GitHub', shortcut: '', icon: 'external', group: 'Links' },
  { id: 'now-playing', label: 'Now Playing', shortcut: '', icon: 'music', group: 'Features' },
  { id: 'scroll-top', label: 'Scroll to Top', shortcut: '', icon: 'arrow-up', group: 'Actions' },
  { id: 'sudo-godmode', label: 'sudo godmode', shortcut: '', icon: 'terminal', group: 'Secret' },
]

const filteredCommands = computed(() => {
  if (!searchQuery.value) return commands.filter(c => c.group !== 'Secret')
  const q = searchQuery.value.toLowerCase()
  return commands.filter(c => c.label.toLowerCase().includes(q) || c.id.includes(q))
})

const groupedCommands = computed(() => {
  const groups: Record<string, typeof commands> = {}
  for (const cmd of filteredCommands.value) {
    if (!groups[cmd.group]) groups[cmd.group] = []
    groups[cmd.group].push(cmd)
  }
  return groups
})

const executeCommand = (id: string) => {
  isOpen.value = false
  searchQuery.value = ''

  switch (id) {
    case 'github-external':
      window.open('https://github.com/hamajj', '_blank')
      break
    case 'scroll-top':
      window.scrollTo({ top: 0, behavior: 'smooth' })
      break
    case 'sudo-godmode':
      emit('triggerEasterEgg')
      break
    default:
      emit('navigate', id)
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
  if (e.key === '/' && !isOpen.value) {
    const target = e.target as HTMLElement
    if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      isOpen.value = true
    }
  }
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

const open = () => {
  isOpen.value = true
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

watch(isOpen, (val) => {
  if (!val) searchQuery.value = ''
})

defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        @click.self="isOpen = false"
      >
        <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
          <div class="border border-border bg-background shadow-2xl shadow-terminal-cyan/5 overflow-hidden">
            <!-- Input -->
            <div class="flex items-center border-b border-border px-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 shrink-0 text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                v-model="searchQuery"
                class="flex h-12 w-full bg-transparent py-3 text-sm font-mono text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Type a command or search..."
                autofocus
                @keydown.enter="filteredCommands.length && executeCommand(filteredCommands[0].id)"
              />
            </div>

            <!-- Commands -->
            <div class="max-h-[300px] overflow-y-auto p-2">
              <template v-if="filteredCommands.length">
                <div v-for="(cmds, group) in groupedCommands" :key="group" class="mb-2">
                  <div class="px-2 py-1 text-xs font-mono text-muted-foreground uppercase">{{ group }}</div>
                  <button
                    v-for="cmd in cmds"
                    :key="cmd.id"
                    class="w-full flex items-center gap-3 px-3 py-2 text-sm font-mono text-foreground hover:bg-terminal-cyan/10 hover:text-terminal-cyan transition-colors cursor-pointer"
                    @click="executeCommand(cmd.id)"
                  >
                    <span class="text-terminal-cyan text-xs">></span>
                    <span>{{ cmd.label }}</span>
                  </button>
                </div>
              </template>
              <div v-else class="py-6 text-center text-sm font-mono text-muted-foreground">
                No commands found.
              </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>ESC to close</span>
              <span class="text-terminal-cyan/50">hamajj terminal v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
