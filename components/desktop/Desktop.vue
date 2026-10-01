<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'
import { useShell } from '~/composables/useShell'
import { useDevMode } from '~/composables/useDevMode'
import { windowDefs } from '~/data/windows'

const { isDesktop, open } = useWindowManager()
const { runOpen, openRun, closeRun, jukeboxOpen, startMenuOpen, closeStartMenu } = useShell()

useDevMode()

const onKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  const inField =
    target &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable)

  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    if (runOpen.value) closeRun()
    else openRun()
    return
  }

  if (event.key === '/' && !inField) {
    event.preventDefault()
    openRun()
    return
  }

  if (event.key === 'Escape') {
    if (startMenuOpen.value) closeStartMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  open('welcome')
  if (isDesktop.value) {
    open('sysinfo')
    jukeboxOpen.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="relative flex h-[100dvh] w-full flex-col overflow-hidden">
    <!-- workspace (wallpaper comes from body) -->
    <main
      class="relative min-h-0 flex-1"
      :class="isDesktop ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'"
    >
      <!-- desktop icons -->
      <div
        v-if="isDesktop"
        class="absolute left-1 top-1 bottom-2 z-0 flex flex-col flex-wrap content-start gap-y-1"
        aria-label="Desktop icons"
      >
        <DesktopIcon
          v-for="def in windowDefs"
          :key="def.id"
          :id="def.id"
          :label="def.label"
          :icon="def.icon"
        />
      </div>

      <!-- mobile icon grid -->
      <div
        v-else
        class="grid grid-cols-4 gap-1 p-2 sm:grid-cols-6"
        aria-label="Apps"
      >
        <DesktopIcon
          v-for="def in windowDefs"
          :key="def.id"
          :id="def.id"
          :label="def.label"
          :icon="def.icon"
        />
      </div>

      <!-- windows: overlaid on desktop, stacked on mobile -->
      <div
        :class="
          isDesktop
            ? 'pointer-events-none absolute inset-0 z-10 overflow-hidden'
            : 'relative z-10 space-y-3 px-2 pb-6'
        "
      >
        <WinWindow id="welcome"><WelcomeWindow /></WinWindow>
        <WinWindow id="about"><AboutWindow /></WinWindow>
        <WinWindow id="projects"><ProjectsWindow /></WinWindow>
        <WinWindow id="currently"><CurrentlyWindow /></WinWindow>
        <WinWindow id="guestbook"><GuestbookWindow /></WinWindow>
        <WinWindow id="links"><LinksWindow /></WinWindow>
        <WinWindow id="sysinfo"><SysInfoWindow /></WinWindow>
        <WinWindow id="activity"><ActivityWindow /></WinWindow>
        <WinWindow id="terminal"><TerminalWindow /></WinWindow>
      </div>

      <!-- desktop-only companions -->
      <template v-if="isDesktop">
        <PixelPet />
        <MusicPlayer />
      </template>
    </main>

    <Taskbar class="relative z-[9600]" />
    <StartMenu />

    <RunDialog />
    <MsgBox />
    <ShutdownFlow />
  </div>
</template>
