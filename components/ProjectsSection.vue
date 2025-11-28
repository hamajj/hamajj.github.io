<template>
  <section id="projects" class="py-24 px-6 flex flex-col justify-center items-center min-h-screen relative">
    <div class="max-w-6xl w-full">
      <div class="flex items-center gap-4 mb-12">
        <h2 class="text-4xl md:text-7xl font-black italic text-white tracking-tighter">
          <span class="text-red-600">02 //</span> MISSION SELECT
        </h2>
        <div class="flex-1 h-2 bg-red-600"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
const { data: profileData, pending, error } = await useFetch('/api/profile')

const hiddenTitles = ["UC.SILAHSORLER.AHH", "TEMPORARY"]

const rankOverrides = {
  "TEDITOR": "S",
  "PORTFOLIO": "C",
  "SORTINGVISUALIZER": "A",
  "HAMAJJ.GITHUB.IO": "SS"
}

const visibleProjects = computed(() => {
  if (!profileData.value?.repositories) return []

  return profileData.value.repositories
    .filter(p => !hiddenTitles.includes(p.title))
    .map(p => {
      if (rankOverrides[p.title]) {
        return {
          ...p,
          rank: rankOverrides[p.title]
        }
      }
      return p
    })
})
</script>
