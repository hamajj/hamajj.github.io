<template>
  <div
    class="group relative flex flex-col h-full transition-all duration-200"
    style="background:#000; position:relative;"
    :style="{
      border: `2px solid ${hovered ? rankColor : 'rgba(255,255,255,0.1)'}`,
      boxShadow: hovered ? `0 0 20px ${rankColor}55, inset 0 0 16px ${rankColor}08` : 'none',
      clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Inner accent border -->
    <div
      class="absolute inset-[4px] pointer-events-none transition-opacity duration-200"
      :style="{
        border: `1px solid ${rankColor}25`,
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        opacity: hovered ? 1 : 0,
      }"
    ></div>

    <!-- Rank stamp (top-right) -->
    <div class="absolute top-0 right-0 z-10" style="padding:8px 10px;">
      <span class="font-display transition-all duration-200" :style="rankLetterStyle" style="line-height:1;">{{ rank }}</span>
    </div>

    <!-- Preview area -->
    <div
      class="relative overflow-hidden"
      style="height:140px; border-bottom: 1px solid rgba(255,255,255,0.08);"
      :style="{ background: `radial-gradient(ellipse at center, ${rankColor}0a 0%, #000 100%)`, borderBottomColor: hovered ? rankColor + '40' : 'rgba(255,255,255,0.08)' }"
    >
      <!-- NO SIGNAL text -->
      <div
        class="absolute inset-0 flex items-center justify-center transition-colors duration-200"
        style="font-family:'VCR OSD Mono',monospace; font-size:10px; letter-spacing:0.25em;"
        :style="{ color: hovered ? rankColor + '70' : 'rgba(255,255,255,0.1)' }"
      >[NO SIGNAL]</div>

      <!-- Scanlines -->
      <div class="absolute inset-0 pointer-events-none" style="background: repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px);"></div>

      <!-- Bottom fill bar (animates on hover) -->
      <div class="absolute bottom-0 left-0 w-full" style="height:2px; background:#111;">
        <div
          class="h-full transition-all duration-500"
          :style="{ width: hovered ? '100%' : '0%', background: rankColor, boxShadow: `0 0 6px ${rankColor}` }"
        ></div>
      </div>

      <!-- Difficulty pips (top-left) -->
      <div class="absolute top-2 left-2 flex gap-1">
        <span
          v-for="n in 5" :key="n"
          style="display:inline-block; width:7px; height:7px; transition: background 0.2s, box-shadow 0.2s;"
          :style="{
            background: n <= rankDifficulty ? rankColor : 'transparent',
            border: `1px solid ${rankColor}`,
            boxShadow: n <= rankDifficulty ? `0 0 4px ${rankColor}` : 'none',
          }"
        ></span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-grow" style="padding:1rem 1rem 1rem;">
      <!-- Title -->
      <h3
        class="font-display transition-colors duration-200 mb-2"
        style="font-size:1.25rem; letter-spacing:0.08em; line-height:1.1;"
        :style="{ color: hovered ? rankColor : '#fff' }"
      >{{ title }}</h3>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in tags" :key="tag"
          style="font-size:9px; font-family:'VCR OSD Mono',monospace; padding: 2px 8px; letter-spacing:0.15em; transition: border-color 0.2s, color 0.2s;"
          :style="hovered
            ? { border: `1px solid ${rankColor}`, color: rankColor }
            : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }"
        >{{ tag }}</span>
      </div>

      <!-- Description -->
      <p style="font-family:'VCR OSD Mono',monospace; font-size:11px; line-height:1.7; color:rgba(255,255,255,0.45); flex-grow:1; margin-bottom:1rem;">
        {{ desc }}
      </p>

      <!-- EQUIP button -->
      <a
        :href="url"
        target="_blank"
        class="font-display text-center transition-all duration-100 relative overflow-hidden"
        style="display:block; padding: 0.55rem 1rem; font-size:1rem; letter-spacing:0.2em; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px)); border: 2px solid;"
        :style="hovered
          ? { borderColor: rankColor, background: rankColor, color: '#000', boxShadow: `0 0 16px ${rankColor}80` }
          : { borderColor: 'rgba(255,255,255,0.25)', background: 'transparent', color: '#fff' }"
      >
        EQUIP
        <span style="position:absolute; bottom:2px; right:6px; font-size:8px; opacity:0.5; font-family:'VCR OSD Mono',monospace;">[ENTER]</span>
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
  'D':         { color: '#888888', size: '2rem',   difficulty: 1 },
  'C':         { color: '#4488ff', size: '2rem',   difficulty: 2 },
  'B':         { color: '#44ff88', size: '2.2rem', difficulty: 2 },
  'A':         { color: '#ff8800', size: '2.4rem', difficulty: 3 },
  'S':         { color: '#ff2222', size: '2.6rem', difficulty: 4 },
  'SS':        { color: '#cc0000', size: '2.4rem', difficulty: 4 },
  'SSS':       { color: '#ffd700', size: '2.4rem', difficulty: 5 },
  'ULTRAKILL': { color: '#ff0000', size: '1.2rem', difficulty: 5 },
}

const rankData       = computed(() => rankMap[props.rank] || rankMap['C'])
const rankColor      = computed(() => rankData.value.color)
const rankDifficulty = computed(() => rankData.value.difficulty)

const rankLetterStyle = computed(() => {
  if (props.rank === 'SSS') {
    return {
      fontSize: rankData.value.size,
      background: 'linear-gradient(180deg, #ffd700 0%, #ff8800 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: 'drop-shadow(0 0 6px #ffd700)',
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
