<template>
  <div class="fixed inset-0 pointer-events-none z-[9999]">
    <!-- Trail dots -->
    <div
      v-for="(dot, i) in trail"
      :key="i"
      class="absolute rounded-full bg-red-600"
      :style="{
        left: `${dot.x}px`,
        top:  `${dot.y}px`,
        width:  `${dot.size}px`,
        height: `${dot.size}px`,
        opacity: dot.opacity,
        transform: 'translate(-50%, -50%)',
        boxShadow: `0 0 ${dot.size * 2}px #ff0000`,
        transition: 'opacity 0.1s linear',
      }"
    ></div>

    <!-- Main crosshair -->
    <div
      class="absolute"
      :style="{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }"
    >
      <!-- Outer ring (expands on hover) -->
      <div
        class="absolute rounded-full border border-red-600/60 transition-all duration-150"
        :style="{
          width:  `${outerSize}px`,
          height: `${outerSize}px`,
          top:    `${-outerSize / 2}px`,
          left:   `${-outerSize / 2}px`,
          boxShadow: '0 0 4px #ff000040',
        }"
      ></div>

      <!-- Crosshair arms -->
      <div class="relative w-0 h-0">
        <!-- Horizontal -->
        <div class="absolute bg-red-600" style="width: 20px; height: 1px; top: 0; left: -16px;"></div>
        <div class="absolute bg-red-600" style="width: 20px; height: 1px; top: 0; left: -4px;"></div>
        <!-- Vertical -->
        <div class="absolute bg-red-600" style="height: 20px; width: 1px; left: 0; top: -16px;"></div>
        <div class="absolute bg-red-600" style="height: 20px; width: 1px; left: 0; top: -4px;"></div>
        <!-- Center dot -->
        <div class="absolute bg-red-600 rounded-full" style="width: 3px; height: 3px; top: -1.5px; left: -1.5px; box-shadow: 0 0 6px #ff0000;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(-100)
const y = ref(-100)
const outerSize = ref(20)

const TRAIL_LENGTH = 8

const trail = ref(Array.from({ length: TRAIL_LENGTH }, (_, i) => ({
  x: -100, y: -100,
  size:    2 - i * 0.18,
  opacity: (1 - i / TRAIL_LENGTH) * 0.5,
})))

let positions = Array(TRAIL_LENGTH).fill({ x: -100, y: -100 })
let rafId = null
let isHovering = false

const onMove = (e) => {
  x.value = e.clientX
  y.value = e.clientY
  positions = [{ x: e.clientX, y: e.clientY }, ...positions.slice(0, TRAIL_LENGTH - 1)]
}

const onOver = (e) => {
  isHovering = e.target.tagName === 'A' || e.target.tagName === 'BUTTON'
  outerSize.value = isHovering ? 32 : 20
}

const animate = () => {
  trail.value = positions.map((pos, i) => ({
    x:       pos.x,
    y:       pos.y,
    size:    Math.max(0.5, 2.5 - i * 0.25),
    opacity: (1 - i / TRAIL_LENGTH) * (isHovering ? 0.7 : 0.4),
  }))
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  document.body.style.cursor = 'none'
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseover', onOver)
  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  document.body.style.cursor = ''
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(rafId)
})
</script>
