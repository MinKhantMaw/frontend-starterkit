<script setup>
import ProgressSpinner from 'primevue/progressspinner'
import { useAppStore } from '@/stores/app'

const app = useAppStore()
</script>

<template>
  <div
    v-if="app.isLoading"
    class="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 backdrop-blur-sm"
  >
    <div class="panel grid place-items-center gap-3 px-6 py-5">
      <ProgressSpinner class="h-10 w-10" stroke-width="4" />
      <span class="text-sm font-medium text-slate-700 dark:text-slate-200">Loading</span>
    </div>
  </div>
</template>
