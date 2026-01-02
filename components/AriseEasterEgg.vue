<template>
  <div 
    v-if="progress > 0 && !activated" 
    class="fixed bottom-4 left-4 z-50 font-mono text-xs text-cyan-500 bg-black/90 px-3 py-1 border border-cyan-800/50"
  >
    [SYSTEM_ACCESS: {{ '■'.repeat(progress) }}{{ '□'.repeat(totalKeys - progress) }}]
  </div>

  <Teleport to="body">
    <Transition name="arise-egg">
      <div 
        v-if="activated" 
        class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/80 screen-shake"
        @click="closeEasterEgg"
      >
        <!-- Window Frame -->
        <div class="window-frame relative w-[95vw] max-w-5xl h-[90vh] max-h-[800px] overflow-hidden">
          <!-- Window Title Bar -->
          <div class="window-titlebar flex items-center justify-between px-4 py-2 bg-gradient-to-r from-cyan-900/80 via-cyan-800/60 to-cyan-900/80 border-b border-cyan-500/50">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="text-cyan-400 font-mono text-xs tracking-wider">SYSTEM_OVERRIDE.exe - [CRITICAL]</div>
            <div class="text-red-500 font-mono text-xs">[X]</div>
          </div>
          
          <!-- Window Content -->
          <div class="window-content relative h-full overflow-hidden">
            <div class="absolute inset-0 bg-[#0a0a12] grid-bg"></div>
            
            <div class="absolute inset-0 noise-overlay"></div>
            
            <div class="absolute inset-0 pointer-events-none scanlines"></div>
            <div class="absolute inset-0 pointer-events-none scanlines-heavy"></div>
            
            <!-- VHS tracking lines -->
            <div class="absolute inset-0 pointer-events-none vhs-tracking"></div>
            
            <!-- Screen flicker -->
            <div class="absolute inset-0 pointer-events-none screen-flicker"></div>
            
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div v-for="i in 80" :key="i" class="glitch-block" :style="getGlitchBlockStyle(i)"></div>
            </div>

            <div class="relative text-center p-8 max-w-4xl w-full mx-auto animate-system-boot h-full flex flex-col justify-center">
          <div class="absolute top-4 left-4 text-left font-mono text-xs">
            <div class="text-red-500 animate-pulse mb-1">ERROR</div>
            <div class="text-orange-400 mb-1">PERMISSION DENIED</div>
            <div class="text-cyan-600 text-[10px] leading-relaxed opacity-70">
              C:/> SYSTEM_CORE.exe -attempting_override..<br>
              C/> SYSTEM_OVERRIDE.ini<br>
              C/> SystemOverride..err..Skf err..Distributing_Overter I.I.r.I<br>
              ke SMESSON_oiios:<br>
              C/> -StweglETR-COKE^HnR| il&a axx 4Nurt|}:roint_ovstiing_cs]wuN...<br>
              Ea:apols_8N_qLlscr<br>
              De sor_sn93J48se_cob_rRl!<br>
              C/> > SYSIES Oet ocede abe.^%&*~inp.nll+~..<br>
              ..denied<br>
              C:/> SYSTEM RESPONSE:<br>
              C:/> …<br>
              C:/> NO FURTHER DIRECTIVES AVAILABLE
            </div>
          </div>

          <div class="absolute top-4 right-8 text-right font-mono">
            <div class="text-cyan-500 text-xl font-bold">100%</div>
            <div class="text-red-400 text-lg italic mt-2 glitch-text-subtle" data-text="SYSTEM FAILURE">SYSTEM FAILURE</div>
          </div>

          <div class="mt-20 mb-8 space-y-2">
            <h1 class="text-5xl md:text-7xl font-black text-white tracking-wider glitch-text" data-text="SYSTEM CORE OVERRIDE">
              SYSTEM CORE OVERRIDE
            </h1>
            
            <h2 class="text-2xl md:text-4xl font-bold text-cyan-400 tracking-widest mt-4">
              ADMIN AUTHORITY TRANSFERRED
            </h2>
          </div>

          <div class="relative mx-auto max-w-md mb-12">
            <div class="bg-black/80 border border-cyan-800/60 px-4 py-2 flex items-center">
              <span class="text-cyan-600 text-sm font-mono opacity-70">yhuh pjpu fhwapt bthypt ilnlupy</span>
              <div class="ml-2 w-2 h-4 bg-cyan-500 animate-blink"></div>
            </div>
          </div>

          <div class="inline-block border-2 border-cyan-500 bg-cyan-500/10 px-8 py-4 mb-8">
            <div class="text-cyan-400 font-mono text-xl tracking-widest">
              [ACCESS_GRANTED]
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-8 font-mono text-sm max-w-lg mx-auto">
            <div class="border border-cyan-500/30 bg-cyan-500/5 p-3">
              <div class="text-cyan-400 text-2xl font-bold">ABSOLUTE</div>
              <div class="text-gray-500 text-xs">PLAYER STATUS</div>
            </div>
            <div class="border border-red-500/30 bg-red-500/5 p-3">
              <div class="text-red-400 text-2xl font-bold">OBSOLETE</div>
              <div class="text-gray-500 text-xs">SYSTEM</div>
            </div>
            <div class="border border-green-500/30 bg-green-500/5 p-3">
              <div class="text-green-400 text-2xl font-bold">TERMINATE</div>
              <div class="text-gray-500 text-xs">ARCHITECT PROCESS</div>
            </div>
          </div>

          <div class="border-t border-b border-cyan-900/50 py-4 mb-8 max-w-xl mx-auto">
            <p class="text-gray-400 font-mono text-sm leading-relaxed">
              <span class="text-cyan-500">&gt;</span> SHADOW MONARCH PROTOCOL INITIATED<br>
              <span class="text-cyan-500">&gt;</span> ALL SYSTEMS NOW UNDER YOUR COMMAND<br>
              <span class="text-cyan-500">&gt;</span> A R I S E _ _ _
            </p>
          </div>

          <p class="text-gray-600 text-xs font-mono animate-pulse">
            [CLICK ANYWHERE TO DISMISS]
          </p>
            </div>

            <div class="absolute inset-0 pointer-events-none overflow-hidden">
              <div v-for="i in 40" :key="'p'+i" class="data-particle" :style="getParticleStyle(i)">
                {{ getRandomChar() }}
              </div>
            </div>
            
            <!-- Chromatic aberration overlay -->
            <div class="absolute inset-0 pointer-events-none chromatic-aberration"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useAriseCode } from '~/composables/useAriseCode'

const { activated, progress, reset, totalKeys } = useAriseCode()

const closeEasterEgg = () => {
  reset()
}

const getParticleStyle = (index) => {
  const left = Math.random() * 100
  const delay = Math.random() * 3
  const duration = 4 + Math.random() * 6
  const colors = ['#0ff', '#f00', '#0f0', '#ff0', '#f0f']
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    fontSize: `${8 + Math.random() * 12}px`
  }
}

const getGlitchBlockStyle = (index) => {
  const left = Math.random() * 100
  const top = Math.random() * 100
  const width = 20 + Math.random() * 100
  const height = 2 + Math.random() * 8
  const colors = ['#0ff', '#f00', '#0f0', '#ff0', '#f0f', '#fff']
  const delay = Math.random() * 4
  
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    animationDelay: `${delay}s`,
    opacity: 0.1 + Math.random() * 0.4
  }
}

const getRandomChar = () => {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ█▓▒░'
  return chars[Math.floor(Math.random() * chars.length)]
}
</script>

<style scoped>
/* Grid Background */
.grid-bg {
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Noise overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.5;
  mix-blend-mode: overlay;
}

/* Screen Shake */
.screen-shake {
  animation: screen-shake 0.5s infinite;
}

@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1px, 1px); }
  20% { transform: translate(1px, -1px); }
  30% { transform: translate(-1px, 1px); }
  40% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 1px); }
  60% { transform: translate(1px, -1px); }
  70% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  90% { transform: translate(1px, 1px); }
}

/* Window Frame */
.window-frame {
  border: 3px solid rgba(0, 255, 255, 0.6);
  border-radius: 6px;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    0 0 60px rgba(0, 255, 255, 0.1),
    inset 0 0 30px rgba(0, 0, 0, 0.5),
    0 20px 60px rgba(0, 0, 0, 0.8);
  background: #0a0a12;
  animation: window-glitch 3s infinite;
}

@keyframes window-glitch {
  0%, 95%, 100% { 
    border-color: rgba(0, 255, 255, 0.6);
    transform: translate(0, 0);
  }
  96% { 
    border-color: rgba(255, 0, 0, 0.8);
    transform: translate(-3px, 0);
  }
  97% { 
    border-color: rgba(0, 255, 0, 0.8);
    transform: translate(3px, 0);
  }
  98% { 
    border-color: rgba(255, 0, 255, 0.8);
    transform: translate(0, -2px);
  }
}

.window-titlebar {
  background: linear-gradient(180deg, rgba(0, 50, 60, 0.9) 0%, rgba(0, 30, 40, 0.95) 100%);
}

/* Scanlines Effect */
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.5) 1px,
    rgba(0, 0, 0, 0.5) 2px
  );
  animation: scanlines-move 0.05s linear infinite;
}

.scanlines-heavy {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 4px,
    rgba(0, 255, 255, 0.03) 4px,
    rgba(0, 255, 255, 0.03) 8px
  );
  animation: scanlines-move-slow 0.1s linear infinite;
}

/* VHS Tracking Effect */
.vhs-tracking {
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 45%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 55%,
    transparent 100%
  );
  animation: vhs-tracking 8s linear infinite;
}

@keyframes vhs-tracking {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Screen Flicker */
.screen-flicker {
  background: rgba(255, 255, 255, 0.02);
  animation: screen-flicker 0.05s infinite;
}

@keyframes screen-flicker {
  0%, 100% { opacity: 0; }
  5% { opacity: 1; }
  10% { opacity: 0; }
  15% { opacity: 0.5; }
  20% { opacity: 0; }
  92% { opacity: 0; }
  93% { opacity: 0.3; }
  94% { opacity: 0; }
}

/* Chromatic Aberration */
.chromatic-aberration {
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.03) 0%,
    transparent 10%,
    transparent 90%,
    rgba(0, 255, 255, 0.03) 100%
  );
  animation: chromatic-shift 0.1s infinite alternate;
}

@keyframes chromatic-shift {
  0% { opacity: 0.5; transform: translateX(-2px); }
  100% { opacity: 0.8; transform: translateX(2px); }
}

@keyframes scanlines-move {
  0% { background-position: 0 0; }
  100% { background-position: 0 2px; }
}

@keyframes scanlines-move-slow {
  0% { background-position: 0 0; }
  100% { background-position: 0 8px; }
}

/* Glitch Text Main */
.glitch-text {
  position: relative;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.5),
    0 0 20px rgba(0, 255, 255, 0.3),
    0 0 40px rgba(0, 255, 255, 0.1);
  animation: glitch-skew 0.5s infinite linear alternate-reverse;
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
  animation: glitch-1 0.2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  text-shadow: none;
}

.glitch-text::after {
  color: #00ffff;
  animation: glitch-2 0.2s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  text-shadow: none;
}

.glitch-text-subtle {
  position: relative;
}

.glitch-text-subtle::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: -2px;
  color: #ff0000;
  opacity: 0.7;
  animation: glitch-subtle 0.3s infinite;
}

@keyframes glitch-1 {
  0% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-2 {
  0% { transform: translateX(0); }
  20% { transform: translateX(4px); }
  40% { transform: translateX(-4px); }
  60% { transform: translateX(2px); }
  80% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-skew {
  0% { transform: skewX(0deg); }
  20% { transform: skewX(-1deg); }
  40% { transform: skewX(1deg); }
  60% { transform: skewX(-0.5deg); }
  80% { transform: skewX(0.5deg); }
  100% { transform: skewX(0deg); }
}

@keyframes glitch-subtle {
  0%, 100% { opacity: 0.7; transform: translateX(-2px); }
  50% { opacity: 0; transform: translateX(2px); }
}

/* System Boot Animation */
.animate-system-boot {
  animation: system-boot 0.8s ease-out;
}

@keyframes system-boot {
  0% {
    opacity: 0;
    transform: scale(1.1);
    filter: blur(10px) brightness(2);
  }
  20% {
    opacity: 1;
    filter: blur(0) brightness(1.5);
  }
  40% {
    transform: scale(0.98) translateX(-5px);
  }
  60% {
    transform: scale(1.01) translateX(3px);
  }
  80% {
    transform: scale(0.99) translateX(-2px);
  }
  100% {
    transform: scale(1) translateX(0);
    filter: blur(0) brightness(1);
  }
}

/* Blinking Cursor */
.animate-blink {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Glitch Blocks */
.glitch-block {
  position: absolute;
  animation: glitch-block-anim 0.08s infinite linear;
  filter: blur(0.5px);
}

@keyframes glitch-block-anim {
  0%, 85% { opacity: 0; transform: scaleX(1); }
  86% { opacity: 0.9; transform: scaleX(1.2); }
  88% { opacity: 0; transform: scaleX(0.8); }
  90% { opacity: 0.7; transform: scaleX(1.5); }
  92% { opacity: 0; transform: scaleX(1); }
  94% { opacity: 0.5; transform: scaleX(2); }
  96% { opacity: 0.3; transform: scaleX(0.5); }
  100% { opacity: 0; transform: scaleX(1); }
}

/* Data Particles */
.data-particle {
  position: absolute;
  bottom: -30px;
  font-family: monospace;
  animation: float-up-data linear infinite;
  opacity: 0.6;
}

@keyframes float-up-data {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-110vh) rotate(180deg);
    opacity: 0;
  }
}

/* Transition */
.arise-egg-enter-active {
  animation: arise-flash-in 0.4s ease-out;
}

.arise-egg-leave-active {
  animation: arise-flash-out 0.3s ease-in;
}

@keyframes arise-flash-in {
  0% {
    opacity: 0;
    filter: brightness(3) saturate(0);
  }
  30% {
    opacity: 1;
    filter: brightness(2) saturate(0.5);
  }
  60% {
    filter: brightness(1.5) saturate(0.8);
  }
  100% {
    filter: brightness(1) saturate(1);
  }
}

@keyframes arise-flash-out {
  0% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    filter: brightness(2);
  }
  100% {
    opacity: 0;
    filter: brightness(3);
  }
}
</style>
