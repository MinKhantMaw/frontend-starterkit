<script setup lang="ts">
import Tag from 'primevue/tag'
import PageTitle from '@/components/PageTitle.vue'
import CmsDataTable from '@/components/CmsDataTable.vue'
import { useList } from './useList'

const { router, kind, resource, columns, load, remove } = useList()
</script>
<template>
  <PageTitle :title="kind === 'pages' ? 'Pages' : 'Posts'" :description="`Create, publish and maintain ${kind}.`" action-label="Create" :action-to="`/${kind}/create`" />
  <CmsDataTable :items="resource.items.value" :columns="columns" :loading="resource.loading.value" :total="resource.total.value" :rows="resource.perPage.value" :search="resource.search.value" @search="resource.search.value = $event; load()" @page="resource.page.value = $event.page + 1; load()" @view="router.push(`/${kind}/${$event.id}/edit`)" @edit="router.push(`/${kind}/${$event.id}/edit`)" @delete="remove">
    <template #cell-title="{ item }"><div><b>{{ item.title }}</b><div class="text-xs text-slate-500">/{{ item.slug }}</div></div></template>
    <template #cell-status="{ value }"><Tag :value="value" :severity="value === 'published' ? 'success' : value === 'draft' ? 'warn' : 'secondary'" /></template>
    <template #cell-created_at="{ value }">{{ value ? new Date(value).toLocaleDateString() : '—' }}</template>
  </CmsDataTable>
</template>
