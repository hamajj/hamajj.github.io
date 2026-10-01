<script setup lang="ts">
const props = defineProps<{
  error?: { statusCode?: number; statusMessage?: string }
}>()

const status = props.error?.statusCode ?? 500

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NotFound :status="status" @home="goHome" />
</template>
