<template>
  <div
    class="group relative bg-black border-2 flex flex-col h-full overflow-hidden transition-all duration-300"
    :style="{
      borderColor: hovered ? rankColor : '#374151',
      boxShadow: hovered ? `0 0 20px ${rankColor}60, inset 0 0 20px ${rankColor}10` : 'none'
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Rank Stamp (top-right) -->
    <div class="absolute top-0 right-0 p-2 z-10 transition-all duration-300" :class="hovered ? 'opacity-100' : 'opacity-40'">
      <span
        class="font-black italic leading-none transition-all duration-300"
        :style="rankLetterStyle"
      >{{ rank }}</span>
    </div>

    <!-- Corner brackets (top-left) colored by rank -->
    <div class="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300"
         :style="{ borderColor: hovered ? rankColor : '#4b5563' }"></div>
    <div class="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300"
         :style="{ borderColor: hovered ? rankColor : '#4b5563' }"></div>

    <!-- Image / Preview area -->
    <div
      class="h-44 border-b-2 relative overflow-hidden transition-colors duration-300"
      :style="{ borderColor: hovered ? rankColor : '#374151', background: `radial-gradient(ellipse at center, ${rankColor}08 0%, #000 100%)` }"
    >
      <div class="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest"
           :style="{ color: hovered ? rankColor + '80' : '#374151' }">
        [NO SIGNAL]
      </div>
      <!-- Rank difficulty bar (bottom of image) -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-gray-900">
        <div
          class="h-full transition-all duration-500"
          :style="{ width: hovered ? '100%' : '0%', background: rankColor, boxShadow: `0 0 6px ${rankColor}` }"
        ></div>
      </div>
      <!-- Scanline overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <!-- Rank badge inline with title -->
      <div class="flex items-start justify-between mb-2 gap-2">
        <h3
          class="text-xl font-black uppercase tracking-wider transition-colors duration-300"
          :style="{ color: hovered ? rankColor : '#ffffff' }"
        >{{ title }}</h3>

        <!-- Difficulty pips -->
        <div class="flex gap-0.5 mt-1 shrink-0">
          <span
            v-for="n in 5"
            :key="n"
            class="w-2 h-2 border transition-all duration-300"
            :style="{
              background: n <= rankDifficulty ? rankColor : 'transparent',
              borderColor: rankColor,
              boxShadow: n <= rankDifficulty ? `0 0 4px ${rankColor}` : 'none'
            }"
          ></span>
        </div>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-3">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-[10px] border px-2 py-0.5 font-mono tracking-widest transition-colors duration-300"
          :style="hovered
            ? { borderColor: rankColor, color: rankColor }
            : { borderColor: '#4b5563', color: '#9ca3af' }"
        >{{ tag }}</span>
      </div>

      <p class="text-gray-400 text-xs mb-5 flex-grow font-mono leading-relaxed">
        {{ desc }}
      </p>

      <a
        :href="url"
        target="_blank"
        class="w-full border-2 py-2 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-150 relative overflow-hidden group/btn"
        :style="hovered
          ? { borderColor: rankColor, color: '#000', background: rankColor, boxShadow: `0 0 16px ${rankColor}80` }
          : { borderColor: '#ffffff', color: '#ffffff', background: 'transparent' }"
      >
        <span>EQUIP</span>
        <span class="text-[10px] opacity-60">[ENTER]</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String,
  desc:  String,
  rank:  { type: String, default: 'C' },
  image: String,
  tags:  { type: Array, default: () => [] },
  url:   String,
})

const hovered = ref(false)

const rankMap = {
  'D':         { color: '#888888', size: '2rem', difficulty: 1 },
  'C':         { color: '#4488ff', size: '2rem', difficulty: 2 },
  'B':         { color: '#44ff88', size: '2.2rem', difficulty: 2 },
  'A':         { color: '#ff8800', size: '2.4rem', difficulty: 3 },
  'S':         { color: '#ff2222', size: '2.6rem', difficulty: 4 },
  'SS':        { color: '#cc0000', size: '2.4rem', difficulty: 4 },
  'SSS':       { color: '#ffd700', size: '2.4rem', difficulty: 5 },
  'ULTRAKILL': { color: '#ff0000', size: '1.2rem', difficulty: 5 },
}

const rankData = computed(() => rankMap[props.rank] || rankMap['C'])
const rankColor = computed(() => rankData.value.color)
const rankDifficulty = computed(() => rankData.value.difficulty)

const rankLetterStyle = computed(() => {
  if (props.rank === 'SSS') {
    return {
      fontSize: rankData.value.size,
      background: 'linear-gradient(180deg, #ffd700 0%, #ff8800 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: `drop-shadow(0 0 6px #ffd700)`,
    }
  }
  if (props.rank === 'ULTRAKILL') {
    return {
      fontSize: rankData.value.size,
      background: 'linear-gradient(90deg,#ff0000,#ff7700,#ffff00,#ff0000)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'rainbow-shift 1s linear infinite',
    }
  }
  return {
    fontSize: rankData.value.size,
    color: rankData.value.color,
    filter: `drop-shadow(0 0 6px ${rankData.value.color})`,
  }
})
</script>
