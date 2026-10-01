import { reactive, ref, computed, onMounted } from 'vue'
import { windowDefs, windowDefMap } from '~/data/windows'

export interface WinState {
  id: string
  open: boolean
  minimized: boolean
  maximized: boolean
  z: number
  x: number
  y: number
  w: number
  h: number
}

const TASKBAR_H = 40
const MIN_VISIBLE_TITLE = 120

const wins = reactive<Record<string, WinState>>({})
const order = reactive<string[]>([])
let zCounter = 20
let listenersReady = false

const activeId = ref<string | null>(null)
const isDesktop = ref(true)
const viewport = reactive({ w: 1280, h: 800 })

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const clampPos = (x: number, y: number, w: number, h: number) => {
  const maxX = Math.max(viewport.w - MIN_VISIBLE_TITLE, 0)
  const maxY = Math.max(viewport.h - TASKBAR_H - 30, 0)
  return {
    x: clamp(x, -(w - MIN_VISIBLE_TITLE), maxX),
    y: clamp(y, 0, maxY),
  }
}

const ensureWin = (id: string): WinState => {
  if (wins[id]) return wins[id]
  const def = windowDefMap[id]!
  const openCount = Object.values(wins).filter((w) => w.open).length
  const w = Math.min(def.w, Math.max(viewport.w - 40, 320))
  const h = Math.min(def.h, Math.max(viewport.h - TASKBAR_H - 60, 260))
  const cascaded = clampPos(def.x + openCount * 26, def.y + openCount * 26, w, h)
  // keep the whole window inside the workspace when first opened
  const x = Math.min(cascaded.x, Math.max(viewport.w - w - 8, 0))
  const y = Math.max(0, Math.min(cascaded.y, Math.max(viewport.h - TASKBAR_H - h - 8, 0)))
  wins[id] = {
    id,
    open: false,
    minimized: false,
    maximized: false,
    z: 0,
    x,
    y,
    w,
    h,
  }
  order.push(id)
  return wins[id]
}

const visibleList = computed(() =>
  order
    .map((id) => wins[id])
    .filter((win): win is WinState => Boolean(win && win.open && !win.minimized))
)

const topVisible = (): WinState | null => {
  const visible = visibleList.value
  if (!visible.length) return null
  return visible.reduce((a, b) => (a.z > b.z ? a : b))
}

const focus = (id: string) => {
  const win = ensureWin(id)
  win.open = true
  win.minimized = false
  win.z = ++zCounter
  activeId.value = id
}

const open = (id: string) => focus(id)

const close = (id: string) => {
  const win = wins[id]
  if (!win) return
  win.open = false
  win.minimized = false
  win.maximized = false
  if (activeId.value === id) {
    const top = topVisible()
    activeId.value = top ? top.id : null
    if (top) top.z = ++zCounter
  }
}

const minimize = (id: string) => {
  const win = wins[id]
  if (!win) return
  win.minimized = true
  if (activeId.value === id) {
    const top = topVisible()
    activeId.value = top ? top.id : null
    if (top) top.z = ++zCounter
  }
}

const toggleMaximize = (id: string) => {
  const win = ensureWin(id)
  win.maximized = !win.maximized
  focus(id)
}

/** Taskbar button behaviour: focus, or minimize when already active. */
const taskbarClick = (id: string) => {
  const win = wins[id]
  if (!win || !win.open) return
  if (activeId.value === id && !win.minimized) {
    minimize(id)
  } else {
    focus(id)
  }
}

const moveTo = (id: string, x: number, y: number) => {
  const win = wins[id]
  if (!win) return
  const pos = clampPos(x, y, win.w, win.h)
  win.x = pos.x
  win.y = pos.y
}

const isOpen = (id: string) => Boolean(wins[id]?.open)
const isMinimized = (id: string) => Boolean(wins[id]?.minimized)

/** Desktop icons / start menu: open if closed, focus if open. */
const launch = (id: string) => focus(id)

const syncViewport = () => {
  viewport.w = window.innerWidth
  viewport.h = window.innerHeight
}

const syncMode = () => {
  const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
  isDesktop.value = mq.matches
}

const ensureListeners = () => {
  if (listenersReady || typeof window === 'undefined') return
  listenersReady = true
  syncViewport()
  syncMode()
  window.addEventListener('resize', () => {
    syncViewport()
    syncMode()
    for (const id of Object.keys(wins)) {
      const w = wins[id]
      if (!w) continue
      const pos = clampPos(w.x, w.y, w.w, w.h)
      w.x = pos.x
      w.y = pos.y
    }
  })
  window.matchMedia('(min-width: 1024px) and (pointer: fine)').addEventListener('change', syncMode)
}

// Register every window up front so the prerendered HTML contains all content.
for (const def of windowDefs) {
  ensureWin(def.id)
}
// The homepage window starts open everywhere.
const welcome = ensureWin('welcome')
welcome.open = true
welcome.z = ++zCounter
activeId.value = 'welcome'

export const useWindowManager = () => {
  onMounted(ensureListeners)

  return {
    wins,
    order,
    activeId,
    isDesktop,
    visibleList,
    open,
    close,
    minimize,
    focus,
    launch,
    toggleMaximize,
    taskbarClick,
    moveTo,
    isOpen,
    isMinimized,
    defs: windowDefs,
  }
}
