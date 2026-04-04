<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none"
    :style="{ zIndex: -1, opacity: opacity }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// Props
interface Props {
  speed?: number        // Boru hızı (piksel/frame)
  pipeCount?: number    // Aynı anda ekranda olacak boru sayısı
  opacity?: number      // Canvas opaklığı (0-1)
  turnProbability?: number  // Dönüş olasılığı (0-1)
  resetProbability?: number // Sıfırlama olasılığı (0-1)
}

const props = withDefaults(defineProps<Props>(), {
  speed: 3,
  pipeCount: 6,
  opacity: 1,
  turnProbability: 0.05,
  resetProbability: 0.002
})

// Ultrakill palette - koyu tonlar
const PIPE_COLORS = [
  '#8a0f1c', // Koyu kırmızı
  '#8a1a4a', // Koyu pink
  '#5a0a12', // Daha koyu kırmızı
  '#6b2170', // Koyu purple
  '#6a0e18', // Orta koyu kırmızı
  '#4a1a5f', // Derin purple
]

// Yönler: 0=yukarı, 1=sağ, 2=aşağı, 3=sol
const DIRECTIONS = [
  { dx: 0, dy: -1 },  // Yukarı
  { dx: 1, dy: 0 },   // Sağ
  { dx: 0, dy: 1 },   // Aşağı
  { dx: -1, dy: 0 },  // Sol
]

interface Pipe {
  x: number
  y: number
  direction: number // 0-3
  color: string
  length: number // Toplam çizilen uzunluk
  segmentStart: { x: number; y: number } // Segment başlangıcı
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let pipes: Pipe[] = []

// Rastgele pozisyonda yeni boru oluştur
function createPipe(): Pipe {
  const canvas = canvasRef.value!
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    direction: Math.floor(Math.random() * 4),
    color: PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)],
    length: 0,
    segmentStart: { x: 0, y: 0 } // initPipe'da set edilecek
  }
}

// Boru başlangıç noktasını ayarla
function initPipe(pipe: Pipe): void {
  pipe.segmentStart = { x: pipe.x, y: pipe.y }
}

// 90 derece dönüş yap (saat yönünde veya tersine)
function turnPipe(pipe: Pipe): void {
  // Mevcut segmenti çiz
  drawSegment(pipe)
  
  // Yeni yön (sağa veya sola dön)
  const turnDirection = Math.random() > 0.5 ? 1 : -1
  pipe.direction = (pipe.direction + turnDirection + 4) % 4
  
  // Yeni segment başlat
  pipe.segmentStart = { x: pipe.x, y: pipe.y }
}

// Segment çiz
function drawSegment(pipe: Pipe): void {
  if (!ctx) return
  
  ctx.strokeStyle = pipe.color
  ctx.lineWidth = 3
  ctx.lineCap = 'square'
  ctx.lineJoin = 'miter'
  
  ctx.beginPath()
  ctx.moveTo(pipe.segmentStart.x, pipe.segmentStart.y)
  ctx.lineTo(pipe.x, pipe.y)
  ctx.stroke()
}

// Boruyu hareket ettir
function updatePipe(pipe: Pipe): boolean {
  const canvas = canvasRef.value!
  const dir = DIRECTIONS[pipe.direction]
  
  // Hareket et
  pipe.x += dir.dx * props.speed
  pipe.y += dir.dy * props.speed
  pipe.length += props.speed
  
  // Segment çiz (her frame)
  drawSegment(pipe)
  pipe.segmentStart = { x: pipe.x, y: pipe.y }
  
  // Ekran dışına çıktı mı kontrol et
  const outOfBounds = 
    pipe.x < -50 || pipe.x > canvas.width + 50 ||
    pipe.y < -50 || pipe.y > canvas.height + 50
  
  // Rastgele reset veya ekran dışı
  if (outOfBounds || Math.random() < props.resetProbability) {
    return false // Yeniden oluştur
  }
  
  // Rastgele dönüş
  if (Math.random() < props.turnProbability) {
    turnPipe(pipe)
  }
  
  return true // Devam et
}

// Ana animasyon döngüsü
function animate(): void {
  if (!ctx || !canvasRef.value) return
  
  // Borları güncelle
  pipes.forEach((pipe, index) => {
    const alive = updatePipe(pipe)
    if (!alive) {
      // Yeni boru oluştur
      pipes[index] = createPipe()
      initPipe(pipes[index])
    }
  })
  
  // Eski çizimleri hafifçe karart (trail efekti)
  ctx.fillStyle = 'rgba(5, 4, 5, 0.01)' // ultra-black
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  
  animationId = requestAnimationFrame(animate)
}

// Canvas boyutunu ayarla
function resizeCanvas(): void {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const dpr = window.devicePixelRatio || 1
  
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  
  ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
    // Canvas temizle ve yeniden başlat
    ctx.fillStyle = 'rgba(5, 4, 5, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

// Boruları başlat
function initPipes(): void {
  pipes = []
  for (let i = 0; i < props.pipeCount; i++) {
    const pipe = createPipe()
    initPipe(pipe)
    pipes.push(pipe)
  }
}

// Lifecycle hooks
onMounted(() => {
  resizeCanvas()
  initPipes()
  animate()
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  window.removeEventListener('resize', handleResize)
})

function handleResize(): void {
  resizeCanvas()
  initPipes()
}

watch(() => props.pipeCount, () => {
  initPipes()
})
</script>
