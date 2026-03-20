<template>
  <section id="projects" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-6xl w-full">

      <!-- Section header -->
      <div class="flex items-end gap-4 mb-12">
        <h2 class="section-title glitch-hover" style="line-height:1;">
          <span class="section-number" style="font-size:0.55em; font-family:'VCR OSD Mono',monospace;">02 //&nbsp;</span>MISSION SELECT
        </h2>
        <div style="flex:1; height:3px; background: linear-gradient(90deg, #ff0000 0%, #cc0000 40%, transparent 100%);"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="(project, index) in visibleProjects"
          :key="index"
          :title="project.title"
          :desc="project.desc"
          :rank="project.rank"
          :image="project.image"
          :tags="project.tags"
          :url="project.url"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: profileData } = await useFetch('/api/profile')

const hiddenTitles = ["UC.SILAHSORLER.AHH", "TEMPORARY"]
const rankOverrides = {
  "TEDITOR":          "S",
  "PORTFOLIO":        "C",
  "SORTINGVISUALIZER":"A",
  "HAMAJJ.GITHUB.IO": "SS"
}

const visibleProjects = computed(() => {
  if (!profileData.value?.repositories) return []
  return profileData.value.repositories
    .filter(p => !hiddenTitles.includes(p.title))
    .map(p => rankOverrides[p.title] ? { ...p, rank: rankOverrides[p.title] } : p)
})
</script>
