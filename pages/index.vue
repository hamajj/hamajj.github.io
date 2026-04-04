<script setup lang="ts">
import { ref } from 'vue'

const commandPaletteRef = ref<InstanceType<typeof CommandPalette> | null>(null)

const handleOpenCommandPalette = () => {
  commandPaletteRef.value?.open()
}

const handleNavigate = (section: string) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleTriggerEasterEgg = () => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]

  konamiCode.forEach((key, index) => {
    setTimeout(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: key }))
    }, index * 50)
  })
}
</script>

<template>
  <div class="relative min-h-screen bg-background text-foreground">
    <!-- Backgrounds -->
    <ParticleCanvas />
    <GenerativeHeader />

    <!-- Header -->
    <Header @open-command-palette="handleOpenCommandPalette" />

    <!-- Main Content -->
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <GitHubGrid />
      <ContactSection />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Fixed Widgets -->
    <NowPlaying />
    <StyleMeter />

    <!-- Command Palette -->
    <CommandPalette
      ref="commandPaletteRef"
      @navigate="handleNavigate"
      @trigger-easter-egg="handleTriggerEasterEgg"
    />

    <!-- Easter Eggs -->
    <KonamiEasterEgg />
    <AriseEasterEgg />
  </div>
</template>
