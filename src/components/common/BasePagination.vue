<script setup lang="ts">
import type { PaginationMeta } from '@/libs/types'

defineProps<{ meta: PaginationMeta | null }>()
const emit = defineEmits<{ change: [page: number] }>()
</script>

<template>
  <div v-if="meta && meta.total > meta.per_page" class="mt-4 flex justify-end">
    <el-pagination
      background
      layout="prev, pager, next, total"
      :current-page="meta.current_page"
      :page-size="meta.per_page"
      :total="meta.total"
      @current-change="emit('change', $event)"
    />
  </div>
</template>
