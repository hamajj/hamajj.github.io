<script setup lang="ts">
defineProps<{
  name:
    | 'computer'
    | 'folder'
    | 'floppy'
    | 'gear'
    | 'book'
    | 'globe'
    | 'chip'
    | 'chart'
    | 'terminal'
    | 'flag'
    | 'info'
    | 'warn'
    | 'error'
    | 'question'
    | 'music'
    | 'run'
    | 'power'
    | 'mail'
}>()
</script>

<template>
  <svg
    viewBox="0 0 16 16"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <!-- welcome / monitor -->
    <template v-if="name === 'computer'">
      <rect x="1" y="2" width="14" height="10" fill="#000" />
      <rect x="2" y="3" width="12" height="8" fill="#c0c0c0" />
      <rect x="3" y="4" width="10" height="6" fill="#008080" />
      <rect x="4" y="5" width="6" height="1" fill="#32cd32" />
      <rect x="4" y="7" width="4" height="1" fill="#32cd32" />
      <rect x="7" y="12" width="2" height="1" fill="#000" />
      <rect x="5" y="13" width="6" height="2" fill="#000" />
      <rect x="6" y="13" width="4" height="1" fill="#c0c0c0" />
    </template>

    <!-- about / folder -->
    <template v-else-if="name === 'folder'">
      <rect x="1" y="3" width="6" height="2" fill="#000" />
      <rect x="1" y="4" width="14" height="10" fill="#000" />
      <rect x="2" y="5" width="12" height="7" fill="#ffe600" />
      <rect x="2" y="5" width="12" height="1" fill="#fff7a0" />
    </template>

    <!-- projects / floppy disk -->
    <template v-else-if="name === 'floppy'">
      <rect x="2" y="2" width="12" height="12" fill="#000" />
      <rect x="3" y="3" width="10" height="10" fill="#a020f0" />
      <rect x="6" y="3" width="5" height="4" fill="#dfdfdf" />
      <rect x="9" y="4" width="1" height="2" fill="#808080" />
      <rect x="4" y="9" width="8" height="4" fill="#fff" />
      <rect x="5" y="10" width="6" height="1" fill="#808080" />
      <rect x="5" y="12" width="6" height="1" fill="#808080" />
    </template>

    <!-- currently / gear -->
    <template v-else-if="name === 'gear'">
      <rect x="6" y="1" width="4" height="3" fill="#000" />
      <rect x="6" y="12" width="4" height="3" fill="#000" />
      <rect x="1" y="6" width="3" height="4" fill="#000" />
      <rect x="12" y="6" width="3" height="4" fill="#000" />
      <rect x="3" y="3" width="10" height="10" fill="#000" />
      <rect x="7" y="2" width="2" height="1" fill="#ff7a00" />
      <rect x="7" y="13" width="2" height="1" fill="#ff7a00" />
      <rect x="2" y="7" width="1" height="2" fill="#ff7a00" />
      <rect x="13" y="7" width="1" height="2" fill="#ff7a00" />
      <rect x="4" y="4" width="8" height="8" fill="#ff7a00" />
      <rect x="6" y="6" width="4" height="4" fill="#000" />
      <rect x="7" y="7" width="2" height="2" fill="#c0c0c0" />
    </template>

    <!-- guestbook / book -->
    <template v-else-if="name === 'book'">
      <rect x="2" y="2" width="12" height="12" fill="#000" />
      <rect x="3" y="3" width="10" height="10" fill="#ff69b4" />
      <rect x="3" y="3" width="2" height="10" fill="#e02080" />
      <rect x="6" y="5" width="6" height="1" fill="#fff" />
      <rect x="6" y="7" width="6" height="1" fill="#fff" />
      <rect x="6" y="9" width="4" height="1" fill="#fff" />
    </template>

    <!-- links / globe -->
    <template v-else-if="name === 'globe'">
      <rect x="4" y="1" width="8" height="1" fill="#000" />
      <rect x="2" y="2" width="12" height="2" fill="#000" />
      <rect x="1" y="4" width="14" height="8" fill="#000" />
      <rect x="2" y="12" width="12" height="2" fill="#000" />
      <rect x="4" y="14" width="8" height="1" fill="#000" />
      <rect x="4" y="2" width="8" height="1" fill="#00e5ff" />
      <rect x="3" y="3" width="10" height="1" fill="#00e5ff" />
      <rect x="2" y="4" width="12" height="8" fill="#00e5ff" />
      <rect x="3" y="12" width="10" height="1" fill="#00e5ff" />
      <rect x="4" y="13" width="8" height="1" fill="#00e5ff" />
      <rect x="7" y="2" width="2" height="12" fill="#000" />
      <rect x="2" y="7" width="12" height="2" fill="#000" />
      <rect x="3" y="5" width="2" height="1" fill="#000" />
      <rect x="11" y="10" width="2" height="1" fill="#000" />
    </template>

    <!-- sysinfo / cpu chip -->
    <template v-else-if="name === 'chip'">
      <rect x="4" y="4" width="8" height="8" fill="#000" />
      <rect x="5" y="5" width="6" height="6" fill="#c0c0c0" />
      <rect x="7" y="7" width="2" height="2" fill="#008080" />
      <rect x="1" y="5" width="3" height="1" fill="#000" />
      <rect x="1" y="8" width="3" height="1" fill="#000" />
      <rect x="1" y="11" width="3" height="1" fill="#000" />
      <rect x="12" y="5" width="3" height="1" fill="#000" />
      <rect x="12" y="8" width="3" height="1" fill="#000" />
      <rect x="12" y="11" width="3" height="1" fill="#000" />
      <rect x="5" y="1" width="1" height="3" fill="#000" />
      <rect x="8" y="1" width="1" height="3" fill="#000" />
      <rect x="11" y="1" width="1" height="3" fill="#000" />
      <rect x="5" y="12" width="1" height="3" fill="#000" />
      <rect x="8" y="12" width="1" height="3" fill="#000" />
      <rect x="11" y="12" width="1" height="3" fill="#000" />
    </template>

    <!-- activity / bar chart -->
    <template v-else-if="name === 'chart'">
      <rect x="1" y="2" width="14" height="12" fill="#000" />
      <rect x="2" y="3" width="12" height="10" fill="#fff" />
      <rect x="3" y="8" width="2" height="4" fill="#000080" />
      <rect x="6" y="5" width="2" height="7" fill="#e02020" />
      <rect x="9" y="7" width="2" height="5" fill="#32cd32" />
      <rect x="12" y="4" width="1" height="8" fill="#ff7a00" />
      <rect x="2" y="12" width="12" height="1" fill="#000" />
    </template>

    <!-- terminal -->
    <template v-else-if="name === 'terminal'">
      <rect x="1" y="2" width="14" height="12" fill="#000" />
      <rect x="1" y="2" width="14" height="2" fill="#c0c0c0" />
      <rect x="2" y="2" width="1" height="2" fill="#000080" />
      <rect x="3" y="5" width="1" height="1" fill="#32cd32" />
      <rect x="4" y="6" width="1" height="1" fill="#32cd32" />
      <rect x="3" y="7" width="1" height="1" fill="#32cd32" />
      <rect x="5" y="7" width="4" height="1" fill="#32cd32" />
      <rect x="10" y="7" width="3" height="1" fill="#32cd32" />
    </template>

    <!-- start flag -->
    <template v-else-if="name === 'flag'">
      <rect x="1" y="4" width="6" height="3" fill="#e02020" />
      <rect x="8" y="3" width="6" height="3" fill="#32cd32" />
      <rect x="1" y="8" width="6" height="3" fill="#0060ff" />
      <rect x="8" y="7" width="6" height="3" fill="#ffe600" />
    </template>

    <!-- msgbox icons -->
    <template v-else-if="name === 'info'">
      <rect x="1" y="1" width="14" height="14" fill="#000" />
      <rect x="2" y="2" width="12" height="12" fill="#000080" />
      <rect x="7" y="4" width="2" height="2" fill="#fff" />
      <rect x="7" y="7" width="2" height="4" fill="#fff" />
    </template>
    <template v-else-if="name === 'warn'">
      <rect x="1" y="1" width="14" height="14" fill="#000" />
      <rect x="2" y="2" width="12" height="12" fill="#ffe600" />
      <rect x="7" y="4" width="2" height="5" fill="#000" />
      <rect x="7" y="10" width="2" height="2" fill="#000" />
    </template>
    <template v-else-if="name === 'error'">
      <rect x="1" y="1" width="14" height="14" fill="#000" />
      <rect x="2" y="2" width="12" height="12" fill="#e02020" />
      <rect x="5" y="5" width="2" height="2" fill="#fff" />
      <rect x="9" y="5" width="2" height="2" fill="#fff" />
      <rect x="7" y="7" width="2" height="2" fill="#fff" />
      <rect x="5" y="9" width="2" height="2" fill="#fff" />
      <rect x="9" y="9" width="2" height="2" fill="#fff" />
    </template>
    <template v-else-if="name === 'question'">
      <rect x="1" y="1" width="14" height="14" fill="#000" />
      <rect x="2" y="2" width="12" height="12" fill="#000080" />
      <rect x="5" y="4" width="6" height="2" fill="#fff" />
      <rect x="9" y="6" width="2" height="2" fill="#fff" />
      <rect x="7" y="8" width="2" height="2" fill="#fff" />
      <rect x="7" y="11" width="2" height="2" fill="#fff" />
    </template>

    <!-- jukebox -->
    <template v-else-if="name === 'music'">
      <rect x="9" y="2" width="2" height="9" fill="#000" />
      <rect x="4" y="2" width="7" height="2" fill="#000" />
      <rect x="4" y="4" width="2" height="5" fill="#000" />
      <rect x="2" y="8" width="5" height="4" fill="#000" />
      <rect x="3" y="9" width="3" height="2" fill="#a020f0" />
    </template>

    <!-- run dialog -->
    <template v-else-if="name === 'run'">
      <rect x="1" y="3" width="14" height="10" fill="#000" />
      <rect x="2" y="4" width="12" height="8" fill="#c0c0c0" />
      <rect x="2" y="4" width="12" height="2" fill="#000080" />
      <rect x="3" y="7" width="4" height="1" fill="#000" />
      <rect x="6" y="8" width="4" height="1" fill="#000" />
      <rect x="9" y="7" width="4" height="1" fill="#000" />
      <rect x="3" y="9" width="10" height="1" fill="#808080" />
      <rect x="7" y="10" width="6" height="1" fill="#32cd32" />
    </template>

    <!-- shut down -->
    <template v-else-if="name === 'power'">
      <rect x="6" y="1" width="4" height="1" fill="#000" />
      <rect x="4" y="2" width="3" height="1" fill="#000" />
      <rect x="9" y="2" width="3" height="1" fill="#000" />
      <rect x="3" y="3" width="2" height="3" fill="#000" />
      <rect x="11" y="3" width="2" height="3" fill="#000" />
      <rect x="3" y="10" width="2" height="3" fill="#000" />
      <rect x="11" y="10" width="2" height="3" fill="#000" />
      <rect x="4" y="12" width="3" height="2" fill="#000" />
      <rect x="9" y="12" width="3" height="2" fill="#000" />
      <rect x="6" y="13" width="4" height="2" fill="#000" />
      <rect x="7" y="4" width="2" height="9" fill="#e02020" />
      <rect x="5" y="5" width="6" height="2" fill="#e02020" />
      <rect x="6" y="6" width="4" height="4" fill="#c0c0c0" />
      <rect x="7" y="7" width="2" height="3" fill="#e02020" />
    </template>

    <!-- mail -->
    <template v-else-if="name === 'mail'">
      <rect x="1" y="3" width="14" height="10" fill="#000" />
      <rect x="2" y="4" width="12" height="8" fill="#fff" />
      <rect x="2" y="4" width="2" height="1" fill="#000" />
      <rect x="4" y="5" width="2" height="1" fill="#000" />
      <rect x="6" y="6" width="2" height="1" fill="#000" />
      <rect x="8" y="6" width="2" height="1" fill="#000" />
      <rect x="10" y="5" width="2" height="1" fill="#000" />
      <rect x="12" y="4" width="2" height="1" fill="#000" />
      <rect x="14" y="5" width="1" height="1" fill="#000" />
      <rect x="1" y="5" width="1" height="1" fill="#000" />
      <rect x="2" y="7" width="1" height="1" fill="#000" />
      <rect x="3" y="8" width="1" height="1" fill="#000" />
      <rect x="13" y="7" width="1" height="1" fill="#000" />
      <rect x="12" y="8" width="1" height="1" fill="#000" />
    </template>
  </svg>
</template>
