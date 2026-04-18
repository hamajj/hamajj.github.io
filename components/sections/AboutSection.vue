<script setup lang="ts">
import profileData from '~/data/github-profile.json'

const skills = [
  { name: 'Vue.js', level: 70 },
  { name: 'Nuxt', level: 70 },
  { name: 'Python', level: 100 },
  { name: 'C++', level: 80 },
  { name: 'C', level: 85 },
  { name: 'JavaScript', level: 75 },
  { name: 'TypeScript', level: 75 },
  { name: 'Bash', level: 100 },
]
const profile = profileData.profile
</script>

<template>
  <section id="about" class="relative z-10 py-20">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Terminal Header -->
      <div class="mb-10">
        <span class="text-terminal-green font-mono text-sm">$ </span>
        <span class="text-terminal-cyan font-mono text-sm">cat about.md</span>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Profile Card -->
        <div class="border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4">
          <div class="flex items-center gap-4">
            <img
              v-if="profile?.avatar"
              :src="profile.avatar"
              :alt="profile.name"
              class="w-16 h-16 border border-terminal-cyan/30"
            />
            <div class="w-16 h-16 bg-muted border border-border" v-else />
            <div>
              <h3 class="text-lg font-vcr text-foreground">
                {{ profile?.name || 'hamajj' }}
              </h3>
              <p class="text-sm text-terminal-cyan font-mono">
                @{{ profile?.login || 'hamajj' }}
              </p>
            </div>
          </div>

          <div class="space-y-3 text-sm font-mono">
            <div>
              <span class="text-muted-foreground">BIO: </span>
              <span class="text-foreground">{{ profile?.bio || 'Hobbyist Web & Systems-Level Developer' }}</span>
            </div>
            <div>
              <span class="text-muted-foreground">MISSION: </span>
              <span class="text-terminal-cyan">Design efficient structures from browser to bare metal</span>
            </div>
            <div class="border-t border-border pt-3 mt-3">
              <span class="text-muted-foreground italic">"Not a professional — just someone who loves to build"</span>
            </div>
          </div>
        </div>

        <!-- Skills Card -->
        <div class="border border-border bg-card/50 backdrop-blur-sm p-6">
          <h3 class="text-sm font-mono text-terminal-green mb-4">// SKILL_INDEX</h3>
          <div class="space-y-3">
            <div v-for="skill in skills" :key="skill.name" class="space-y-1">
              <div class="flex justify-between text-xs font-mono">
                <span class="text-foreground">{{ skill.name }}</span>
                <span class="text-muted-foreground">{{ skill.level }}%</span>
              </div>
              <div class="w-full h-1.5 bg-muted overflow-hidden">
                <div
                  class="h-full bg-terminal-cyan transition-all duration-1000 ease-out"
                  :style="{ width: skill.level + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
