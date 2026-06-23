<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status?: string
}>()

const tone = computed(() => {
  const status = props.status?.toLowerCase()
  if (['active', 'success', 'completed'].includes(status || '')) return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (['inactive', 'disabled', 'failed'].includes(status || '')) return 'bg-red-50 text-red-700 ring-red-200'
  return 'bg-amber-50 text-amber-700 ring-amber-200'
})
</script>

<template>
  <span class="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium capitalize ring-1" :class="tone">
    {{ status || 'unknown' }}
  </span>
</template>
