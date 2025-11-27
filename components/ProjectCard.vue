<template>
  <div class="group relative bg-black border-2 border-gray-700 hover:border-red-600 transition-all duration-300 flex flex-col h-full overflow-hidden">
    <!-- Rank Stamp -->
    <div class="absolute top-0 right-0 p-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
      <span class="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600" style="-webkit-text-stroke: 1px #fff;">
        {{ rank }}
      </span>
    </div>

    <!-- Image Placeholder / Preview -->
    <div class="h-48 bg-gray-900 border-b-2 border-gray-700 group-hover:border-red-600 relative overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-sm">
        [NO SIGNAL]
      </div>
      <!-- Scanline overlay -->
      <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-2xl font-bold text-white group-hover:text-red-500 transition-colors mb-2 uppercase tracking-wider">
        {{ title }}
      </h3>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in tags" :key="tag" class="text-xs border border-gray-600 px-2 py-0.5 text-gray-400 group-hover:border-red-600 group-hover:text-red-400">
          {{ tag }}
        </span>
      </div>

      <p class="text-gray-400 text-sm mb-6 flex-grow font-mono leading-relaxed">
        {{ desc }}
      </p>

      <button class="w-full border-2 border-white text-white py-2 font-bold hover:bg-white hover:text-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2 group-hover:border-red-600 group-hover:text-red-500 group-hover:hover:bg-red-600 group-hover:hover:text-white">
        <span>EQUIP</span>
        <span class="text-xs opacity-50">[ENTER]</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  rank: {
    type: String,
    default: 'C'
  },
  image: String,
  tags: {
    type: Array,
    default: () => []
  }
})
</script>
