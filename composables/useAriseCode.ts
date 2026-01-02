import { ref, onMounted, onUnmounted } from 'vue'

// Secret word: "arise"
const ARISE_CODE = ['KeyA', 'KeyR', 'KeyI', 'KeyS', 'KeyE']

export const useAriseCode = () => {
  const activated = ref(false)
  const progress = ref(0)
  let inputSequence: string[] = []
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const resetSequence = () => {
    inputSequence = []
    progress.value = 0
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    // Ignore if user is typing in an input field
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return
    }

    // Reset timeout on each keypress
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(resetSequence, 3000)

    inputSequence.push(event.code)

    // Keep only the last N keys (where N = ARISE_CODE length)
    if (inputSequence.length > ARISE_CODE.length) {
      inputSequence.shift()
    }

    // Update progress
    let matchCount = 0
    for (let i = 0; i < inputSequence.length; i++) {
      if (inputSequence[i] === ARISE_CODE[i]) {
        matchCount++
      } else {
        break
      }
    }
    progress.value = matchCount

    // Check for complete match
    if (inputSequence.length === ARISE_CODE.length) {
      const isMatch = inputSequence.every((key, index) => key === ARISE_CODE[index])
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
    totalKeys: ARISE_CODE.length
  }
}
