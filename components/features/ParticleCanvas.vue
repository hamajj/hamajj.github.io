<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number
let particles: Particle[] = []
let mouse = { x: -9999, y: -9999 }

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

const PARTICLE_COUNT = 100
const CONNECTION_DISTANCE = 150
const MOUSE_RADIUS = 200

const createParticle = (w: number, h: number): Particle => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  size: Math.random() * 2 + 1,
})

const animate = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  // Trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, w, h)

  // Mouse glow
  if (mouse.x > 0 && mouse.y > 0) {
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS)
    gradient.addColorStop(0, 'rgba(255, 105, 180, 0.03)')
    gradient.addColorStop(1, 'rgba(255, 105, 180, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
  }

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Mouse repulsion
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
      p.vx += (dx / dist) * force * 0.5
      p.vy += (dy / dist) * force * 0.5
    }

    // Damping
    p.vx *= 0.99
    p.vy *= 0.99

    // Movement
    p.x += p.vx
    p.y += p.vy

    // Wrap around
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0

    // Draw particle
    ctx.fillStyle = 'rgba(255, 105, 180, 0.6)'
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)

    // Connection lines
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const cdx = p.x - p2.x
      const cdy = p.y - p2.y
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
      if (cdist < CONNECTION_DISTANCE) {
        const alpha = (1 - cdist / CONNECTION_DISTANCE) * 0.15
        ctx.strokeStyle = `rgba(255, 105, 180, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(() => animate(ctx, w, h))
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const handleMouseLeave = () => {
  mouse.x = -9999
  mouse.y = -9999
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  particles = Array.from({ length: PARTICLE_COUNT }, () =>
    createParticle(canvas.width, canvas.height)
  )

  animate(ctx, canvas.width, canvas.height)
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 z-0 pointer-events-none"
    style="pointer-events: auto;"
  />
</template>
