<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import PermissionGuard from '@/components/common/PermissionGuard.vue'
import { useContentStore } from '@/stores/contents'

const route = useRoute()
const contents = useContentStore()

onMounted(() => contents.fetchContent(route.params.id as string))
</script>

<template>
  <PageHeader title="Content Detail">
    <template #actions>
      <PermissionGuard permission="content.update">
        <RouterLink :to="`/contents/${route.params.id}/edit`"><el-button type="primary">Edit content</el-button></RouterLink>
      </PermissionGuard>
    </template>
  </PageHeader>
  <LoadingSpinner v-if="contents.loading" />
  <article v-else-if="contents.current" class="overflow-hidden rounded border border-slate-200 bg-white">
    <img v-if="contents.current.featured_image" :src="contents.current.featured_image" class="h-72 w-full object-cover" alt="Featured image" />
    <div class="p-6">
      <div class="mb-3 flex flex-wrap items-center gap-3">
        <StatusBadge :status="contents.current.status" />
        <span class="text-sm text-slate-500">{{ contents.current.published_at || 'Not published' }}</span>
      </div>
      <h1 class="text-3xl font-semibold text-slate-950">{{ contents.current.title }}</h1>
      <p class="mt-2 text-sm text-slate-500">/{{ contents.current.slug }}</p>
      <p v-if="contents.current.excerpt" class="mt-5 text-lg text-slate-600">{{ contents.current.excerpt }}</p>
      <div class="prose mt-6 max-w-none whitespace-pre-line text-slate-700">{{ contents.current.body }}</div>
    </div>
  </article>
</template>
