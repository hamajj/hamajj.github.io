<template>
  <section id="about" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-4xl w-full border-2 border-white bg-black/80 p-8 relative">
      <!-- Decorative Corner Brackets -->
      <div class="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-red-600"></div>
      <div class="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-red-600"></div>
      <div class="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-red-600"></div>
      <div class="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-red-600"></div>

      <div class="flex flex-col md:flex-row gap-8 items-center">
        <!-- Profile Image / Avatar -->
        <div class="w-48 h-48 border-4 border-white bg-gray-900 flex items-center justify-center overflow-hidden relative group">
           <div class="absolute inset-0 bg-red-600/20 mix-blend-overlay"></div>
           <img 
             v-if="profileData?.profile?.avatar" 
             :src="profileData.profile.avatar" 
             alt="Avatar" 
             class="w-full h-full object-cover"
           />
           <span v-else class="text-6xl text-gray-700 font-bold">?</span>
           <div class="absolute bottom-0 left-0 w-full bg-red-600 text-white text-xs text-center py-1">
             {{profileData?.profile?.login ?? 'UNKNOWN' }}
           </div>
        </div>

        <!-- Text Content -->
        <div class="flex-1">
          <h2 class="text-4xl md:text-6xl font-black italic mb-6 text-white border-b-4 border-white inline-block pr-12">
            <span class="text-red-600">01 //</span> DATA LOG
          </h2>
          
          <div class="font-mono text-lg md:text-xl text-gray-300 space-y-4">
            <p>
              <span class="text-yellow-400">>></span> SUBJECT: {{ profileData?.profile?.name ?? profileData?.profile?.login ?? 'UNKNOWN' }}
            </p>
            <p>
              <span class="text-yellow-400">>></span> CLASS: Hobbyist Web & Systems-Level Developer
            </p>
            <p>
              <span class="text-yellow-400">>></span> MISSION: Design efficient structures from browser to bare metal.
            </p>
            <p class="mt-4 border-l-4 border-red-600 pl-4 italic opacity-80">
              “Not a professional — just someone who loves to build.”
            </p>
          </div>
        </div>
      </div>

      <!-- Stats / Skills Grid -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="skill in skills" :key="skill.name" class="border border-gray-600 p-2 bg-gray-900/50">
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>{{ skill.name }}</span>
            <span>{{ skill.level }}%</span>
          </div>
          <div class="w-full h-2 bg-gray-800">
            <div class="h-full bg-blue-400" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: profileData, pending, error } = await useFetch('/api/profile')

const skills = [
  { name: 'VUE.JS', level: 70 },
  { name: 'NUXT', level: 70 },
  { name: 'PYTHON', level: 100 },
  { name: 'C++', level: 80 },
  { name: 'C', level: 85 },
  { name: 'JAVASCRIPT', level: 75 },
  { name: 'TYPESCRIPT', level: 75 },
  { name: 'BASH', level: 100 },
]
</script>
