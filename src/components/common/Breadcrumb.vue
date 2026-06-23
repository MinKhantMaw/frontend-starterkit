<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const crumbs = computed(() =>
  route.matched
    .filter((record) => record.meta.title)
    .map((record) => ({ title: String(record.meta.title), path: record.path })),
)
</script>

<template>
  <nav class="hidden items-center gap-2 text-xs text-slate-500 md:flex">
    <RouterLink to="/dashboard" class="hover:text-slate-900 dark:hover:text-white">Home</RouterLink>
    <template v-for="crumb in crumbs" :key="crumb.path">
      <i class="pi pi-angle-right text-[10px]" />
      <span class="text-slate-700 dark:text-slate-200">{{ crumb.title }}</span>
    </template>
  </nav>
</template>
