<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useShell } from '~/composables/useShell'
import { useWindowManager } from '~/composables/useWindowManager'
import { useMsgBox } from '~/composables/useMsgBox'
import { windowDefs } from '~/data/windows'
import { site } from '~/data/site'

const { runOpen, closeRun, devMode } = useShell()
const { open } = useWindowManager()
const { msgBox } = useMsgBox()

const input = ref<HTMLInputElement | null>(null)
const query = ref('')

const windowCommands = windowDefs.map((def) => ({
  id: def.id,
  label: def.startLabel ?? def.label,
}))

const placeholders = computed(() =>
  windowCommands
    .slice(0, 3)
    .map((c) => c.id)
    .join(', ')
)

watch(runOpen, async (isOpen) => {
  if (isOpen) {
    query.value = ''
    await nextTick()
    input.value?.focus()
  }
})

const run = () => {
  const raw = query.value.trim().toLowerCase()
  if (!raw) {
    closeRun()
    return
  }

  const windowHit = windowCommands.find(
    (c) => c.id === raw || c.label.toLowerCase() === raw
  )
  if (windowHit) {
    closeRun()
    open(windowHit.id)
    return
  }

  if (raw === 'github' || raw === 'hamajj') {
    closeRun()
    window.open(site.github, '_blank', 'noopener')
    return
  }

  if (raw === 'mail' || raw === 'email' || raw === 'contact') {
    closeRun()
    window.location.href = `mailto:${site.email}`
    return
  }

  if (raw === 'godmode') {
    closeRun()
    if (devMode.value) {
      msgBox({
        title: 'GOD MODE',
        icon: 'info',
        message:
          'GOD MODE ACTIVATED\n∞ health · 999 damage · max style\n\nyou already found the konami code. this is just the victory lap.',
      })
    } else {
      msgBox({
        title: 'Run',
        icon: 'error',
        message:
          "Cannot find the file 'godmode'.\n\n(it may exist for those who know the ancient sequence: ↑ ↑ ↓ ↓ ← → ← → B A)",
      })
    }
    return
  }

  closeRun()
  msgBox({
    title: 'Run',
    icon: 'error',
    message: `Cannot find the file '${raw}' (or one of its components). Make sure the path and filename are correct and that all required libraries are available.`,
  })
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    closeRun()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="runOpen"
      class="fixed inset-0 z-[9700] flex items-start justify-center bg-black/10 pt-[22vh]"
      @keydown="onKeydown"
    >
      <form
        class="animate-win-open w-[min(94vw,440px)] bg-win-gray bevel-out hard-shadow"
        @submit.prevent="run"
      >
        <div class="flex h-[22px] items-center gap-1.5 px-1 title-active">
          <PixelIcon name="run" class="h-3.5 w-3.5" />
          <h2 class="flex-1 font-ui text-[12px] font-bold text-white">Run</h2>
          <button type="button" class="title-btn" aria-label="Close" @click="closeRun">
            <span class="font-ui text-[10px] font-bold leading-none">✕</span>
          </button>
        </div>

        <div class="flex gap-4 px-4 pt-4">
          <PixelIcon name="run" class="mt-1 h-8 w-8 shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="mb-3 font-ui text-[13px] leading-relaxed text-black">
              Type the name of a window, or a secret, and this website will try its best.
            </p>
            <input
              ref="input"
              v-model="query"
              type="text"
              class="bevel-in-sm w-full bg-white px-2 py-1 font-ui text-[13px] text-black outline-none"
              :placeholder="placeholders"
              aria-label="Run command"
              autocomplete="off"
              spellcheck="false"
            />
            <p class="mt-2 font-ui text-[11px] text-win-mid">
              try: {{ placeholders }}, github, mail… or something that isn't there.
            </p>
          </div>
        </div>

        <div class="flex justify-end gap-3 px-4 py-4">
          <button type="submit" class="win98-btn min-w-[86px] font-bold">OK</button>
          <button type="button" class="win98-btn min-w-[86px]" @click="closeRun">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>
