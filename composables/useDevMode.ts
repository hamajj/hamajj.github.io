import { onMounted, onUnmounted } from 'vue'
import { useShell } from './useShell'
import { useMsgBox } from './useMsgBox'
import { jokes } from '~/data/site'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

let listening = false
let seq: string[] = []
let timer: ReturnType<typeof setTimeout> | null = null

const resetSequence = () => {
  seq = []
}

const handleKeyDown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  if (
    target &&
    (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
  ) {
    return
  }

  if (timer) clearTimeout(timer)
  timer = setTimeout(resetSequence, 2000)

  seq.push(event.code)
  if (seq.length > KONAMI.length) seq.shift()

  if (seq.length === KONAMI.length && seq.every((key, i) => key === KONAMI[i])) {
    resetSequence()
    activate()
  }
}

const activate = () => {
  const { devMode, enableDevMode } = useShell()
  const { msgBox } = useMsgBox()
  const firstTime = !devMode.value
  enableDevMode()
  if (firstTime) {
    msgBox({
      title: 'developer mode',
      icon: 'info',
      message: `${jokes.konami}\n\ndev mode is on. the terminal will now accept "godmode".`,
    })
  }
}

/**
 * Konami code → hidden developer mode (singleton listener).
 * Mount once (the desktop does).
 */
export const useDevMode = () => {
  const { devMode } = useShell()

  onMounted(() => {
    if (listening || typeof window === 'undefined') return
    listening = true
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    // singleton: the desktop owns the listener for the app's lifetime
  })

  return { devMode }
}
