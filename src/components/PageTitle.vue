<script setup lang="ts">
import Button from 'primevue/button'
defineProps<{ title: string; description?: string; actionLabel?: string; actionTo?: string }>()
</script>
<template>
  <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
    <div><h1 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h1><p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p></div>
    <RouterLink v-if="actionTo" :to="actionTo"><Button icon="pi pi-plus" :label="actionLabel" /></RouterLink>
  </div>
</template>
