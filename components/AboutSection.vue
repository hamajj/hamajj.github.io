<template>
  <section id="about" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-4xl w-full relative" style="background:#000; border: 2px solid rgba(255,255,255,0.18); clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));">

      <!-- Inner accent border -->
      <div class="absolute inset-[5px] pointer-events-none" style="border: 1px solid rgba(255,0,0,0.18); clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));"></div>

      <!-- Red corner accents -->
      <div class="absolute top-0 left-0 w-8 h-8" style="border-top:3px solid #ff0000; border-left:3px solid #ff0000;"></div>
      <div class="absolute top-0 right-0 w-8 h-8" style="border-top:3px solid #ff0000; border-right:3px solid #ff0000;"></div>
      <div class="absolute bottom-0 left-0 w-8 h-8" style="border-bottom:3px solid #ff0000; border-left:3px solid #ff0000;"></div>
      <div class="absolute bottom-0 right-0 w-8 h-8" style="border-bottom:3px solid #ff0000; border-right:3px solid #ff0000;"></div>

      <div class="p-8 relative z-10">
        <!-- Section heading -->
        <div class="flex items-end gap-4 mb-8" style="border-bottom: 2px solid rgba(255,0,0,0.5); padding-bottom:1rem;">
          <h2 class="section-title glitch-hover" style="line-height:1;">
            <span class="section-number" style="font-size:0.55em; font-family:'VCR OSD Mono',monospace;">01 //&nbsp;</span>DATA LOG
          </h2>
          <div style="flex:1; height:2px; background: linear-gradient(90deg, rgba(255,0,0,0.6), transparent);"></div>
        </div>

        <div class="flex flex-col md:flex-row gap-8 items-start">
          <!-- Profile Image -->
          <div class="relative shrink-0" style="width:168px;">
            <div
              style="width:168px; height:168px; background:#0a0a0a; border: 2px solid rgba(255,255,255,0.2); position:relative; overflow:hidden; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);"
            >
              <div class="absolute inset-0" style="background:rgba(180,0,0,0.12); mix-blend-mode:overlay; z-index:1;"></div>
              <!-- Scanlines over avatar -->
              <div class="absolute inset-0 pointer-events-none z-10" style="background: repeating-linear-gradient(transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px);"></div>
              <img
                v-if="profileData?.profile?.avatar"
                :src="profileData.profile.avatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-6xl font-bold absolute inset-0 flex items-center justify-center" style="color:#333;">?</span>
              <div class="absolute bottom-0 left-0 w-full font-display text-center" style="background:#cc0000; font-size:0.75rem; letter-spacing:0.15em; padding:3px 0; z-index:2;">
                {{ profileData?.profile?.name ?? 'UNKNOWN' }}
              </div>
            </div>
            <!-- Frame accent under avatar -->
            <div style="margin-top:6px; height:2px; background: linear-gradient(90deg, #ff0000, transparent);"></div>
          </div>

          <!-- Text Content -->
          <div class="flex-1" style="font-family:'VCR OSD Mono',monospace; font-size:0.88rem; line-height:1.8;">
            <p style="color:#fff; margin-bottom:0.5rem;">
              <span style="color:#ffdd00;">&gt;&gt;</span>
              <span style="color:rgba(255,255,255,0.5);"> SUBJECT:</span>
              <span style="color:#fff;"> {{ profileData?.profile?.login ?? 'UNKNOWN' }}</span>
            </p>
            <p style="color:#fff; margin-bottom:0.5rem;">
              <span style="color:#ffdd00;">&gt;&gt;</span>
              <span style="color:rgba(255,255,255,0.5);"> CLASS:</span>
              <span style="color:#fff;"> Hobbyist Web &amp; Systems-Level Developer</span>
            </p>
            <p style="color:#fff; margin-bottom:0.5rem;">
              <span style="color:#ffdd00;">&gt;&gt;</span>
              <span style="color:rgba(255,255,255,0.5);"> MISSION:</span>
              <span style="color:#fff;"> Design efficient structures from browser to bare metal.</span>
            </p>
            <p style="border-left: 3px solid #ff0000; padding-left:1rem; color:rgba(255,255,255,0.55); font-style:italic; margin-top:1rem;">
              "Not a professional — just someone who loves to build."
            </p>
          </div>
        </div>

        <!-- Skills / Stats Grid -->
        <div style="margin-top:2.5rem; border-top: 1px solid rgba(255,0,0,0.25); padding-top:1.5rem;">
          <div class="font-display mb-4" style="font-size:0.9rem; letter-spacing:0.25em; color:rgba(255,255,255,0.4);">
            — COMBAT STATISTICS —
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="relative"
              style="background:#0a0a0a; border: 1px solid rgba(255,255,255,0.1); padding: 8px 10px; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);"
            >
              <!-- inner red border -->
              <div class="absolute inset-[2px] pointer-events-none" style="border: 1px solid rgba(255,0,0,0.1); clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);"></div>

              <div class="flex justify-between mb-2" style="font-family:'VCR OSD Mono',monospace; font-size:9px; letter-spacing:0.12em;">
                <span style="color:rgba(255,255,255,0.7);">{{ skill.name }}</span>
                <span style="color:#ff0000;">{{ skill.level }}%</span>
              </div>

              <!-- Segmented skill bar -->
              <div class="flex gap-px" style="height:6px;">
                <div
                  v-for="i in 10" :key="i"
                  style="flex:1; transition: background 0.2s;"
                  :style="i <= Math.ceil(skill.level / 10)
                    ? { background: skill.level >= 90 ? '#ff2222' : skill.level >= 70 ? '#ff6600' : '#cc4400', boxShadow: `0 0 3px ${skill.level >= 90 ? '#ff0000' : '#cc4400'}` }
                    : { background: 'rgba(50,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: profileData } = await useFetch('/api/profile')

const skills = [
  { name: 'VUE.JS',      level: 70  },
  { name: 'NUXT',        level: 70  },
  { name: 'PYTHON',      level: 100 },
  { name: 'C++',         level: 80  },
  { name: 'C',           level: 85  },
  { name: 'JAVASCRIPT',  level: 75  },
  { name: 'TYPESCRIPT',  level: 75  },
  { name: 'BASH',        level: 100 },
]
</script>
