<template>
  <!-- Progress Indicator (subtle hint) -->
  <div 
    v-if="progress > 0 && !activated" 
    class="fixed bottom-4 right-4 z-50 font-mono text-xs text-gray-600 bg-black/80 px-3 py-1 border border-gray-800"
  >
    SEQUENCE: {{ '█'.repeat(progress) }}{{ '░'.repeat(totalKeys - progress) }}
  </div>

  <!-- Easter Egg Activation Overlay -->
  <Teleport to="body">
    <Transition name="easter-egg">
      <div 
        v-if="activated" 
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        @click="closeEasterEgg"
      >
        <!-- Scanlines -->
        <div class="absolute inset-0 pointer-events-none scanlines"></div>
        
        <!-- CRT Vignette -->
        <div class="absolute inset-0 pointer-events-none crt-vignette"></div>

        <!-- Main Content -->
        <div class="relative text-center p-8 max-w-3xl animate-glitch-in">
          <!-- Secret Message -->
          <div class="mb-8 space-y-4">
            <p class="text-green-500 font-mono text-sm animate-pulse">
              [CHEAT_CODE_ACCEPTED]
            </p>
            
            <h1 class="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 animate-rainbow">
              GOD MODE
            </h1>
            
            <h2 class="text-4xl md:text-6xl font-black italic text-white glitch-text" data-text="ACTIVATED">
              ACTIVATED
            </h2>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-8 font-mono text-sm">
            <div class="border border-yellow-500/50 bg-yellow-500/10 p-4">
              <div class="text-yellow-400 text-2xl font-bold">∞</div>
              <div class="text-gray-400 text-xs">HEALTH</div>
            </div>
            <div class="border border-red-500/50 bg-red-500/10 p-4">
              <div class="text-red-400 text-2xl font-bold">999</div>
              <div class="text-gray-400 text-xs">DAMAGE</div>
            </div>
            <div class="border border-purple-500/50 bg-purple-500/10 p-4">
              <div class="text-purple-400 text-2xl font-bold">MAX</div>
              <div class="text-gray-400 text-xs">STYLE</div>
            </div>
          </div>

          <!-- Secret Message -->
          <div class="border-t border-b border-gray-700 py-4 mb-8">
            <p class="text-gray-300 font-mono text-sm leading-relaxed">
              <span class="text-blue-400">&gt;</span> YOU FOUND THE SECRET CODE<br>
              <span class="text-blue-400">&gt;</span> YOU ARE NOW UNSTOPPABLE<br>
              <span class="text-blue-400">&gt;</span> GO FORTH AND CONQUER
            </p>
          </div>

          <!-- Close Hint -->
          <p class="text-gray-600 text-xs font-mono animate-pulse">
            [CLICK ANYWHERE TO CONTINUE]
          </p>
        </div>

        <!-- Floating Particles -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useKonamiCode } from '~/composables/useKonamiCode'

const { activated, progress, reset, totalKeys } = useKonamiCode()

const closeEasterEgg = () => {
  reset()
}

const getParticleStyle = (index) => {
  const left = Math.random() * 100
  const delay = Math.random() * 2
  const duration = 3 + Math.random() * 4
  const size = 2 + Math.random() * 4
  const hue = Math.random() * 60 + 10 // Gold to red range
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `hsl(${hue}, 100%, 50%)`
  }
}
</script>

<style scoped>
/* Scanlines Effect */
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.3) 2px,
    rgba(0, 0, 0, 0.3) 4px
  );
  animation: scanlines-move 0.1s linear infinite;
}

@keyframes scanlines-move {
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
}

/* CRT Vignette */
.crt-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

/* Glitch Text */
.glitch-text {
  position: relative;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #ff0000;
  animation: glitch-1 0.3s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-text::after {
  color: #00ffff;
  animation: glitch-2 0.3s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-2 {
  0% { transform: translateX(0); }
  20% { transform: translateX(3px); }
  40% { transform: translateX(-3px); }
  60% { transform: translateX(1px); }
  80% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-skew {
  0% { transform: skewX(0deg); }
  20% { transform: skewX(-0.5deg); }
  40% { transform: skewX(0.5deg); }
  60% { transform: skewX(-0.3deg); }
  80% { transform: skewX(0.3deg); }
  100% { transform: skewX(0deg); }
}

/* Rainbow Animation */
.animate-rainbow {
  animation: rainbow 2s linear infinite;
  background-size: 200% 200%;
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Glitch In Animation */
.animate-glitch-in {
  animation: glitch-in 0.5s ease-out;
}

@keyframes glitch-in {
  0% {
    opacity: 0;
    transform: scale(1.5) translateY(-20px);
    filter: blur(10px);
  }
  30% {
    opacity: 1;
    transform: scale(0.95) translateX(-5px);
  }
  50% {
    transform: scale(1.02) translateX(5px);
  }
  70% {
    transform: scale(0.98) translateX(-2px);
  }
  100% {
    transform: scale(1) translateX(0);
    filter: blur(0);
  }
}

/* Floating Particles */
.particle {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  animation: float-up linear infinite;
  box-shadow: 0 0 10px currentColor;
}

@keyframes float-up {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

/* Transition */
.easter-egg-enter-active {
  animation: flash-in 0.3s ease-out;
}

.easter-egg-leave-active {
  animation: flash-out 0.3s ease-in;
}

@keyframes flash-in {
  0% {
    opacity: 0;
    background-color: white;
  }
  30% {
    opacity: 1;
    background-color: white;
  }
  100% {
    background-color: black;
  }
}

@keyframes flash-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    background-color: white;
  }
}
</style>
