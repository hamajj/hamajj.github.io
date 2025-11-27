<template>
  <div
    ref="cursor"
    class="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
  >
    <div class="relative w-12 h-12 -left-6 -top-6">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-px bg-red-600"></div>
        <div class="absolute w-px h-full bg-red-600"></div>
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-1 h-1 rounded-full bg-red-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);
const cursor = ref(null);

const updateCursorPosition = (event) => {
  // Set the position to the current mouse coordinates
  x.value = event.clientX;
  y.value = event.clientY;
};

onMounted(() => {
  // Listen for mouse movement across the window
  window.addEventListener('mousemove', updateCursorPosition);
});

onUnmounted(() => {
  // Clean up the event listener when the component is destroyed
  window.removeEventListener('mousemove', updateCursorPosition);
});
</script>