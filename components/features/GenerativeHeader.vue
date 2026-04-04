<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number
let time = 0

// Simple noise function
const noise = (x: number, y: number, seed: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453
  return n - Math.floor(n)
}

const animate = (ctx: CanvasRenderingContext2D, w: number, h: number, seed: number) => {
  // Trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
  ctx.fillRect(0, 0, w, h)

  time += 0.005

  // Hexagonal grid
  const hexSize = 40
  for (let row = 0; row < h / (hexSize * 0.86) + 1; row++) {
    for (let col = 0; col < w / hexSize + 1; col++) {
      const x = col * hexSize + (row % 2 === 0 ? 0 : hexSize / 2)
      const y = row * hexSize * 0.86
      const n = noise(col * 0.1, row * 0.1, seed + time)

      if (n > 0.7) {
        ctx.strokeStyle = `rgba(192, 132, 252, ${(n - 0.7) * 0.15})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6
          const px = x + Math.cos(angle) * hexSize * 0.4
          const py = y + Math.sin(angle) * hexSize * 0.4
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  // Floating shapes
  const shapes = 5
  for (let i = 0; i < shapes; i++) {
    const phase = (time + i * 1.2) % (Math.PI * 2)
    const x = w * 0.2 + w * 0.6 * noise(i * 0.5, time * 0.2, seed)
    const y = h * 0.2 + h * 0.6 * noise(i * 0.7, time * 0.15, seed + 100)
    const size = 15 + noise(i, time * 0.1, seed) * 25
    const alpha = 0.05 + Math.sin(phase) * 0.03

    ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`
    ctx.lineWidth = 0.5

    if (i % 3 === 0) {
      // Triangle
      ctx.beginPath()
      for (let j = 0; j < 3; j++) {
        const angle = (Math.PI * 2 / 3) * j - Math.PI / 2 + time
        const px = x + Math.cos(angle) * size
        const py = y + Math.sin(angle) * size
        if (j === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
    } else if (i % 3 === 1) {
      // Square
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(time * 0.5)
      ctx.strokeRect(-size / 2, -size / 2, size, size)
      ctx.restore()
    } else {
      // Circle
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  // Wave lines
  for (let l = 0; l < 3; l++) {
    ctx.strokeStyle = `rgba(192, 132, 252, 0.03)`
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let x = 0; x < w; x += 5) {
      const y = h * (0.3 + l * 0.2) + Math.sin(x * 0.005 + time + l) * 50 + noise(x * 0.01, time, seed + l * 50) * 30
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  animationId = requestAnimationFrame(() => animate(ctx, w, h, seed))
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Time-seeded (changes hourly)
  const seed = Math.floor(Date.now() / 3600000)

  // Clear canvas initially
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  animate(ctx, canvas.width, canvas.height, seed)

  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 z-0 pointer-events-none opacity-50"
  />
</template>
