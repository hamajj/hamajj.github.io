import { ref, onMounted, onUnmounted } from 'vue'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

export const useKonamiCode = () => {
  const activated = ref(false)
  const progress = ref(0)
  let inputSequence: string[] = []
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const resetSequence = () => {
    inputSequence = []
    progress.value = 0
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    // Reset timeout on each keypress
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(resetSequence, 2000)

    inputSequence.push(event.code)

    // Keep only the last N keys (where N = KONAMI_CODE length)
    if (inputSequence.length > KONAMI_CODE.length) {
      inputSequence.shift()
    }

    // Update progress
    let matchCount = 0
    for (let i = 0; i < inputSequence.length; i++) {
      if (inputSequence[i] === KONAMI_CODE[i]) {
        matchCount++
      } else {
        break
      }
    }
    progress.value = matchCount

    // Check for complete match
    if (inputSequence.length === KONAMI_CODE.length) {
      const isMatch = inputSequence.every((key, index) => key === KONAMI_CODE[index])
      if (isMatch) {
        activated.value = true
        resetSequence()
      }
    }
  }

  const reset = () => {
    activated.value = false
    resetSequence()
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
    if (timeoutId) clearTimeout(timeoutId)
  })

  return {
    activated,
    progress,
    reset,
    totalKeys: KONAMI_CODE.length
  }
}
